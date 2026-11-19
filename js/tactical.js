// Battlefield ("tactical") view: a phase-by-phase reconstruction of a single battle, with units drawn
// as raised blocks on the 3D terrain, movement arrows, a pulse on units that are firing, and a battle clock.
// Battle data lives in data/tactical/<id>.js (see the header of cowpens.js for the format).
SC.tactics = (() => {
  const { esc } = SC.util;
  const TRANS_MS = 2600;   // time to animate from one phase to the next
  const HOLD_MS = 7000;    // how long playback holds on each phase before moving on
  const HEIGHT = { line: 12, skirmish: 5, cavalry: 16, artillery: 9 };
  const SIDE_COLOR = { allied: '#2563eb', crown: '#dc2626' };
  const CONF = {
    documented: ['Well documented', 'Events and positions agree across the main accounts.'],
    probable: ['Probable', 'The event is documented; the exact route or position is a reasoned reconstruction.'],
    disputed: ['Sources differ', 'Eyewitness accounts and historians disagree on how this unfolded.'],
  };
  const HM = /^\d{1,2}:\d{2}$/;
  // Battle-level confidence badge, shown on the battle card and in the battlefield bar
  const LEVEL = {
    detailed: ['Detailed reconstruction', 'Well-documented battle on identifiable ground: positions are anchored to the surviving landscape and the main studies.'],
    approximate: ['Approximate reconstruction', 'The course of the fight is documented, but positions on the ground are estimated from the accounts.'],
  };
  const MAP_LAYERS =['trails', 'trails-casing', 'routes-ahead', 'highlight', 'highlight-glow'];
  const $ = (id) => document.getElementById(id);

  const SEG = 30;          // blocks are split into pieces of at most this many metres (see blocks())
  const UNIT_LAYERS = ['tac-road', 'tac-works', 'tac-forts', 'tac-arrows', 'tac-heads', 'tac-units', 'tac-fire'];
  let map, data = null, frames = [], p = 0, anim = null, holdTimer = null, playing = false, pulseAnim = null;
  let saved = null, hasFire = false; // saved: camera and layer settings to restore on exit
  const labels = {}; const notes = [];

  // ---------- geometry ----------
  function toLL([x, y]) {
    const th = (data.facing * Math.PI) / 180;
    const east = x * Math.cos(th) + y * Math.sin(th);
    const north = -x * Math.sin(th) + y * Math.cos(th);
    const [lon0, lat0] = data.origin;
    return [lon0 + east / (111320 * Math.cos((lat0 * Math.PI) / 180)), lat0 + north / 110540];
  }
  function rect(x, y, w, d, rot) {
    const r = (rot * Math.PI) / 180, c = Math.cos(r), s = Math.sin(r);
    const pts = [[-w / 2, -d / 2], [w / 2, -d / 2], [w / 2, d / 2], [-w / 2, d / 2]]
      .map(([a, b]) => toLL([x + a * c - b * s, y + a * s + b * c]));
    return [[...pts, pts[0]]];
  }
  // MapLibre stands each extruded polygon on the terrain height at its centre, so one long block on
  // sloping ground is partly buried at one end and floats at the other. Splitting a unit into
  // pieces of at most SEG metres lets each piece sit on its own patch of ground.
  function blocks(st) {
    const nw = Math.max(1, Math.ceil(st.w / SEG)), nd = Math.max(1, Math.ceil(st.d / SEG));
    const pw = st.w / nw, pd = st.d / nd, r = (st.r * Math.PI) / 180, c = Math.cos(r), s = Math.sin(r);
    const out = [];
    for (let i = 0; i < nw; i++) for (let j = 0; j < nd; j++) {
      const a = -st.w / 2 + pw * (i + 0.5), b = -st.d / 2 + pd * (j + 0.5);
      out.push(rect(st.x + a * c - b * s, st.y + a * s + b * c, pw, pd, st.r));
    }
    return out;
  }

  // Colour each named officer in a caption by the kind of troops they led (tooltip gives the
  // full name). Tracked commanders use their map colour; others are listed in the battle's `people`.
  function colorNames(html) {
    const ppl = data.people || {};
    const keys = Object.keys(ppl).sort((a, b) => b.length - a.length);
    if (!keys.length) return html;
    return html.replace(new RegExp(`\\b(${keys.join('|')})\\b`, 'g'), (k) => {
      const v = ppl[k], c = v.id && SC.commanders.find((x) => x.id === v.id);
      const force = SC.FORCES[c ? c.force : v.force];
      const tip = c ? `${c.rank} ${c.name}` : v.full;
      return `<span class="who" style="--c:${force.color}" title="${esc(`${tip} · ${force.label}`)}">${k}</span>`;
    });
  }

  // Resolve each phase into a full set of unit states (units carry forward until they move again)
  function compile() {
    frames = [];
    let prev = {};
    for (const ph of data.phases) {
      const cur = { ...prev };
      for (const [id, v] of Object.entries(ph.at || {})) {
        const u = data.units[id];
        cur[id] = { x: v[0], y: v[1], s: v[2] || 'formed', r: v[3] ?? 0, w: v[4] ?? u.w, d: v[5] ?? u.d };
      }
      frames.push(cur);
      prev = cur;
    }
  }

  const ease = (k) => (k < 0.5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2);
  const mix = (hex, to, k) => {
    const n = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
    const a = n(hex), b = n(to);
    return `rgb(${a.map((v, i) => Math.round(v + (b[i] - v) * k)).join(',')})`;
  };
  function unitColor(u, s) {
    const base = SC.FORCES[u.force].color;
    if (s === 'captured') return '#8b8578';
    if (s === 'routed') return mix(base, '#ffffff', 0.62);
    if (s === 'broken') return mix(base, '#ffffff', 0.35);
    return base;
  }

  // Unit state at fractional phase p (eased between keyframes)
  function stateAt(id, pp) {
    pp = Math.max(0, Math.min(frames.length - 1, pp));
    const i = Math.floor(pp), k = ease(pp - i);
    const a = frames[i]?.[id], b = frames[Math.min(i + 1, frames.length - 1)]?.[id];
    if (!a && !b) return null;
    if (!a) return k > 0.5 ? b : null;
    if (!b || k === 0) return a;
    const lerp = (m, n) => m + (n - m) * k;
    return { x: lerp(a.x, b.x), y: lerp(a.y, b.y), r: lerp(a.r, b.r), w: lerp(a.w, b.w), d: lerp(a.d, b.d), s: k < 0.5 ? a.s : b.s };
  }

  // The phase whose caption and arrows are shown: during a transition, the one being moved into
  const shownPhase = () => Math.max(0, Math.min(frames.length - 1, Math.ceil(p - 1e-6)));

  // ---------- drawing ----------
  function draw() {
    const feats = [];
    let fire = false;
    for (const [id, u] of Object.entries(data.units)) {
      const st = stateAt(id, p);
      const lab = labels[id];
      if (!st) { if (lab) lab.getElement().hidden = true; continue; }
      const h = st.s === 'captured' ? 2 : st.s === 'routed' ? 4 : u.h ?? HEIGHT[u.type] ?? 10;
      const props = { color: unitColor(u, st.s), h, fire: st.s === 'firing' ? 1 : 0 };
      if (props.fire) fire = true;
      for (const poly of blocks(st)) feats.push({ type: 'Feature', properties: props, geometry: { type: 'Polygon', coordinates: poly } });
      if (lab) {
        const el = lab.getElement();
        el.hidden = false;
        el.classList.toggle('dim', st.s === 'captured' || st.s === 'routed');
        lab.setLngLat(toLL([st.x, st.y]));
        const tag = { firing: 'firing', broken: 'disordered', routed: 'routed', captured: 'captured' }[st.s];
        const info = [u.men && `~${u.men}`, tag].filter(Boolean).join(' · ');
        const html = `${esc(u.short || u.name)}${info ? `<small>${info}</small>` : ''}`;
        if (el._html !== html) { el.innerHTML = html; el._html = html; }
      }
    }
    map.getSource('tac-units').setData({ type: 'FeatureCollection', features: feats });
    hasFire = fire;

    // Arrows for the phase being shown
    const ph = data.phases[shownPhase()], shafts = [], heads = [];
    for (const a of ph.arrows || []) {
      const pts = a.path;
      const [x1, y1] = pts[pts.length - 2], [x2, y2] = pts[pts.length - 1];
      const len = Math.hypot(x2 - x1, y2 - y1) || 1, ux = (x2 - x1) / len, uy = (y2 - y1) / len;
      const HL = 34, HW = 22; // arrowhead length and half-width (m)
      const base = [x2 - ux * HL, y2 - uy * HL];
      const color = SIDE_COLOR[a.side];
      shafts.push({ type: 'Feature', properties: { color }, geometry: { type: 'LineString', coordinates: [...pts.slice(0, -1), base].map(toLL) } });
      heads.push({ type: 'Feature', properties: { color }, geometry: { type: 'Polygon', coordinates: [[
        toLL([x2, y2]), toLL([base[0] - uy * HW, base[1] + ux * HW]), toLL([base[0] + uy * HW, base[1] - ux * HW]), toLL([x2, y2])]] } });
    }
    // Earthworks (sieges): shown from phase `from` (default 0) up to phase `to` (default the end)
    const shown = shownPhase(), lines = [], forts = [];
    for (const w of data.works || []) {
      if (shown < (w.from ?? 0) || shown > (w.to ?? Infinity)) continue;
      const pts = w.pathLL || w.path.map(toLL), color = w.side ? SIDE_COLOR[w.side] : '#8a7a5c';
      if (w.kind === 'fort' || w.kind === 'redoubt') forts.push({ type: 'Feature', properties: { color, h: w.h ?? 4 }, geometry: { type: 'Polygon', coordinates: [[...pts, pts[0]]] } });
      else lines.push({ type: 'Feature', properties: { color }, geometry: { type: 'LineString', coordinates: pts } });
    }
    map.getSource('tac-works').setData({ type: 'FeatureCollection', features: lines });
    map.getSource('tac-forts').setData({ type: 'FeatureCollection', features: forts });
    map.getSource('tac-arrows').setData({ type: 'FeatureCollection', features: shafts });
    map.getSource('tac-heads').setData({ type: 'FeatureCollection', features: heads });
    drawBar();
  }

  function drawBar() {
    const i = shownPhase(), ph = data.phases[i];
    const pc = Math.max(0, Math.min(frames.length - 1, p));
    // Battle clock: interpolate between phase times
    // Battles use "HH:MM" times and the clock runs between them; sieges use free text ("9 Oct, dawn")
    if (data.phases.every((x) => HM.test(x.time))) {
      const mins = (t) => { const [h, m] = t.split(':').map(Number); return h * 60 + m; };
      const a = Math.floor(pc), b = Math.min(a + 1, frames.length - 1);
      const m = mins(data.phases[a].time) + (mins(data.phases[b].time) - mins(data.phases[a].time)) * (pc - a);
      const hh = Math.floor(m / 60), mm = Math.floor(m % 60);
      $('tac-clock').textContent = `${hh > 12 ? hh - 12 : hh}:${String(mm).padStart(2, '0')} ${hh >= 12 ? 'PM' : 'AM'}`;
    } else $('tac-clock').textContent = ph.time;
    if ($('tac-caption').dataset.i !== String(i)) {
      $('tac-caption').dataset.i = i;
      const [label, tip] = CONF[ph.conf] || CONF.probable;
      $('tac-caption').innerHTML = `<div class="tac-ph"><span class="tac-num">${i + 1}/${frames.length}</span> ${esc(ph.title)}
        <span class="tac-conf ${ph.conf}" title="${esc(tip)}">${label}</span></div><p>${colorNames(esc(ph.text))}</p>`;
      document.querySelectorAll('#tac-dots button').forEach((d, k) => d.classList.toggle('on', k === i));
    }
  }

  // Units that are firing pulse gently (they are drawn on their own layer so only they blink)
  function pulseLoop(ts) {
    if (hasFire && map.getLayer('tac-fire')) map.setPaintProperty('tac-fire', 'fill-extrusion-opacity', 0.72 + 0.23 * Math.sin(ts / 150));
    pulseAnim = requestAnimationFrame(pulseLoop);
  }

  // ---------- playback ----------
  function animateTo(target, then) {
    cancelAnimationFrame(anim);
    const from = p, dur = Math.min(2, Math.abs(target - from)) * TRANS_MS || 1;
    // Time from the first frame's own timestamp: a rAF timestamp can be slightly earlier than
    // performance.now() at the moment of the request, which made k (and p) negative and crashed draw()
    let t0 = null;
    const step = (now) => {
      t0 ??= now;
      const k = Math.max(0, Math.min(1, (now - t0) / dur));
      p = from + (target - from) * k;
      draw();
      if (k < 1) anim = requestAnimationFrame(step); else { p = target; draw(); then?.(); }
    };
    anim = requestAnimationFrame(step);
  }
  function goTo(i) { stop(); animateTo(Math.max(0, Math.min(frames.length - 1, i))); }
  function play() {
    if (Math.round(p) >= frames.length - 1) { p = 0; draw(); }
    playing = true; $('tac-play').textContent = '❚❚';
    const next = () => {
      if (!playing) return;
      const i = Math.round(p);
      if (i >= frames.length - 1) return stop();
      animateTo(i + 1, () => { holdTimer = setTimeout(next, HOLD_MS); });
    };
    next();
  }
  function stop() {
    playing = false; clearTimeout(holdTimer); cancelAnimationFrame(anim);
    if ($('tac-play')) $('tac-play').textContent = '▶';
  }

  // ---------- camera ----------
  // The camera's centre sits at sea level, so on raised terrain a tilted view lands short of its
  // target: the screen-centre ray meets ground of height h about h·tan(pitch) nearer the viewer.
  // Cowpens is ~300 m up (×1.6 terrain exaggeration), which put the view ~750 m off. So aim that
  // far beyond the target, along the view direction. (MapLibre 5.6's own `elevation` camera option
  // had no effect here.)
  function aimPoint(target, height, pitch, bearing) {
    const shift = height * Math.tan((pitch * Math.PI) / 180), b = (bearing * Math.PI) / 180;
    const [lon, lat] = target;
    return [lon + (shift * Math.sin(b)) / (111320 * Math.cos((lat * Math.PI) / 180)), lat + (shift * Math.cos(b)) / 110540];
  }
  function frameCamera(duration) {
    const c = data.camera, target = toLL(c.at);
    const pitch = map.getMaxPitch() > 0 ? c.pitch : 0;
    const exag = map.getTerrain()?.exaggeration ?? 0;
    // Prefer the battle file's known ground height: before the detailed terrain tiles load, a live
    // query can return a coarse or zero value
    const height = c.elev != null ? c.elev * exag : (map.queryTerrainElevation(target) ?? 0);
    map.easeTo({ center: aimPoint(target, height, pitch, c.bearing), zoom: c.zoom, pitch, bearing: c.bearing, duration, essential: true });
    // After arriving (terrain loaded by then), correct for the real ground height if it differs
    clearTimeout(frameCamera.t);
    frameCamera.t = setTimeout(() => {
      const h = map.queryTerrainElevation(target);
      if (data && h != null && Math.abs(h - height) > 15 && !map.isMoving()) map.easeTo({ center: aimPoint(target, h, pitch, c.bearing), duration: 500 });
    }, duration + 300);
  }

  // ---------- enter / exit ----------
  function ensureLayers() {
    if (map.getSource('tac-units')) return;
    const empty = { type: 'FeatureCollection', features: [] };
    for (const s of ['tac-units', 'tac-arrows', 'tac-heads', 'tac-road', 'tac-works', 'tac-forts']) map.addSource(s, { type: 'geojson', data: empty });
    // Siege works: trenches as lines tinted by side; forts and redoubts as low raised outlines
    map.addLayer({ id: 'tac-works', type: 'line', source: 'tac-works', layout: { 'line-cap': 'round', 'line-join': 'round' },
      paint: { 'line-color': ['get', 'color'], 'line-width': 4, 'line-opacity': 0.75 } });
    map.addLayer({ id: 'tac-forts', type: 'fill-extrusion', source: 'tac-forts',
      paint: { 'fill-extrusion-color': ['get', 'color'], 'fill-extrusion-height': ['get', 'h'], 'fill-extrusion-base': 0, 'fill-extrusion-opacity': 0.55 } });
    // The period road the battle was fought along, as a faint dashed track
    map.addLayer({ id: 'tac-road', type: 'line', source: 'tac-road', layout: { 'line-cap': 'round', 'line-join': 'round' },
      paint: { 'line-color': '#d9c49a', 'line-width': 3, 'line-opacity': 0.55, 'line-dasharray': [2, 2] } });
    map.addLayer({ id: 'tac-arrows', type: 'line', source: 'tac-arrows', layout: { 'line-cap': 'round', 'line-join': 'round' },
      paint: { 'line-color': ['get', 'color'], 'line-width': 7, 'line-opacity': 0.85 } });
    map.addLayer({ id: 'tac-heads', type: 'fill', source: 'tac-heads', paint: { 'fill-color': ['get', 'color'], 'fill-opacity': 0.85 } });
    const unitPaint = { 'fill-extrusion-color': ['get', 'color'], 'fill-extrusion-height': ['get', 'h'], 'fill-extrusion-base': 0, 'fill-extrusion-opacity': 0.95 };
    map.addLayer({ id: 'tac-units', type: 'fill-extrusion', source: 'tac-units', filter: ['!=', ['get', 'fire'], 1], paint: unitPaint });
    // Firing units get their own layer so pulseLoop can make just them blink
    map.addLayer({ id: 'tac-fire', type: 'fill-extrusion', source: 'tac-units', filter: ['==', ['get', 'fire'], 1], paint: unitPaint });
  }
  const setLayerVis = (ids, on) => ids.forEach((id) => map.getLayer(id) && map.setLayoutProperty(id, 'visibility', on ? 'visible' : 'none'));

  function enter(id) {
    if (!SC.tactical?.[id]) return;
    if (data) exit(false);
    data = SC.tactical[id];
    compile();
    SC.timeline.pause();
    SC.panel.close();
    const b = SC.battles.find((x) => x.id === id);
    if (b) SC.timeline.set(b.startDay, { instant: true });
    const tt = $('terrain-toggle');
    saved = { center: map.getCenter(), zoom: map.getZoom(), pitch: map.getPitch(), bearing: map.getBearing(),
      base: SC.layers.current(), terrain: tt.checked };
    // Battlefield view favours the 3D satellite imagery with terrain
    if (SC.layers.current() === 'period') SC.layers.setBase('satellite');
    if (!tt.checked) { tt.checked = true; tt.dispatchEvent(new Event('change')); }

    ensureLayers();
    setLayerVis(MAP_LAYERS, false);
    setLayerVis(UNIT_LAYERS, true);
    // roadLL: real-world [lon, lat] trace; road: points in the battle's local metres
    const road = data.roadLL || (data.road || []).map(toLL);
    map.getSource('tac-road').setData({ type: 'FeatureCollection', features: road.length ? [{ type: 'Feature', properties: {}, geometry: { type: 'LineString', coordinates: road } }] : [] });
    for (const [uid, u] of Object.entries(data.units)) {
      if (u.label === false) continue;
      const el = document.createElement('div');
      el.className = `tac-label ${u.side}`;
      labels[uid] = new maplibregl.Marker({ element: el, anchor: 'bottom', offset: [0, -14] }).setLngLat(toLL([0, 0])).addTo(map);
    }
    for (const n of data.notes || []) {
      const el = document.createElement('div');
      el.className = 'tac-note'; el.textContent = n.text;
      notes.push(new maplibregl.Marker({ element: el }).setLngLat(toLL(n.at)).addTo(map));
    }

    document.body.classList.add('tactical');
    const [lvl, lvlTip] = level(data.battle);
    $('tac-title').innerHTML = `${esc(data.title)} · ${esc(data.date)} <span class="tac-level ${data.level}" title="${esc(lvlTip)}">${esc(lvl)}</span>`;
    // Colour key for the officers named in the captions, then the sources
    const key = Object.entries(SC.FORCES).filter(([k]) => k !== 'french')
      .map(([, f]) => `<span class="key"><i style="background:${f.color}"></i>${esc(f.label)}</span>`).join('');
    $('tac-src').innerHTML = `<div class="tac-key">${key}</div>${esc(data.sources)}`;
    $('tac-dots').innerHTML = data.phases.map((ph, i) => `<button title="${esc(ph.time)} ${esc(ph.title)}" data-i="${i}"></button>`).join('');
    $('tac-bar').hidden = false;
    p = 0; $('tac-caption').dataset.i = '';
    draw();
    pulseAnim = requestAnimationFrame(pulseLoop);

    frameCamera(2600);
    SC.emit('state:change');
  }

  function exit(restore = true) {
    if (!data) return;
    stop(); cancelAnimationFrame(pulseAnim);
    for (const k of Object.keys(labels)) { labels[k].remove(); delete labels[k]; }
    notes.splice(0).forEach((n) => n.remove());
    setLayerVis(UNIT_LAYERS, false);
    setLayerVis(MAP_LAYERS, true);
    document.body.classList.remove('tactical');
    $('tac-bar').hidden = true;
    const battleId = data.battle;
    data = null;
    if (restore && saved) {
      if (saved.base !== SC.layers.current()) SC.layers.setBase(saved.base);
      const tt = $('terrain-toggle');
      if (tt.checked !== saved.terrain) { tt.checked = saved.terrain; tt.dispatchEvent(new Event('change')); }
      map.flyTo({ center: saved.center, zoom: saved.zoom, pitch: saved.pitch, bearing: saved.bearing, duration: 1800, essential: true });
      SC.battles_ui.select(battleId, false);
    }
    saved = null;
    SC.emit('state:change');
  }

  function init(m) {
    map = m;
    $('tac-exit').onclick = () => exit();
    $('tac-play').onclick = () => (playing ? stop() : play());
    $('tac-prev').onclick = () => goTo(Math.round(p) - 1);
    $('tac-next').onclick = () => goTo(Math.round(p) + 1);
    $('tac-first').onclick = () => goTo(0);
    $('tac-dots').addEventListener('click', (e) => { const b = e.target.closest('button'); if (b) goTo(+b.dataset.i); });
    $('tac-view').onclick = () => frameCamera(1200);
    // Keyboard: the battlefield view takes over the arrow keys, Space and Escape while it is open
    document.addEventListener('keydown', (e) => {
      if (!data || e.target.matches('input, select, textarea')) return;
      if (e.key === 'ArrowRight') { e.preventDefault(); e.stopImmediatePropagation(); goTo(Math.round(p) + 1); }
      else if (e.key === 'ArrowLeft') { e.preventDefault(); e.stopImmediatePropagation(); goTo(Math.round(p) - 1); }
      else if (e.key === ' ') { e.preventDefault(); e.stopImmediatePropagation(); if (!e.repeat) (playing ? stop() : play()); }
      else if (e.key === 'Escape') { e.stopImmediatePropagation(); exit(); }
    }, true);
  }

  // [label, explanation] of a reconstruction's battle-level confidence
  function level(id) { return LEVEL[SC.tactical?.[id]?.level] || LEVEL.approximate; }

  return { init, enter, exit, goTo, level, active: () => (data ? data.battle : null), has: (id) => !!SC.tactical?.[id] };
})();
