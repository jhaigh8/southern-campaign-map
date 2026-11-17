// Movement engine: resolves waypoints, interpolates positions (including fractional days for smooth
// animation), and draws trails and portrait markers.
SC.move = (() => {
  const { toDay, lerp, esc } = SC.util;
  const RECENT_DAYS = 30;
  const tracks = {}; // id -> [{day, lon, lat, name, troops, cert, note, gap}]

  function resolvePlace(p, ctx) {
    if (Array.isArray(p)) return { lon: p[0], lat: p[1], name: p[2] || '' };
    const g = SC.places[p];
    if (!g) { console.warn(`[data] Unknown place "${p}" in ${ctx}`); return null; }
    return { lon: g[0], lat: g[1], name: g[2] };
  }

  function compile() {
    for (const c of SC.commanders) {
      c.short = c.short || c.name.split(' ').pop();
      c.color = (SC.FORCES[c.force] || SC.FORCES.continental).color;
      c.initials = c.name.replace(/["“”].*?["“”]/g, '').split(/[\s,]+/).filter((w) => /^[A-Z]/.test(w) && !/^(Sir|Lord|Earl|Comte|Marquis)$/.test(w)).map((w) => w[0]).slice(0, 2).join('');
    }
    for (const [id, wps] of Object.entries(SC.movements)) {
      tracks[id] = wps.map(([date, place, troops, cert, note]) => {
        const day = toDay(date);
        if (place === null) return { day, gap: true };
        const p = resolvePlace(place, `${id} @ ${date}`);
        if (!p) return null;
        return { day, ...p, troops: troops ?? null, cert: cert || 'a', note: note || '' };
      }).filter(Boolean);
    }
  }

  // Ease-in-out between waypoints so armies accelerate away and slow into camp,
  // instead of gliding at a constant robotic speed.
  const ease = (f) => f * f * (3 - 2 * f);

  // Position of a commander at a (possibly fractional) day, or null if not in the field.
  function positionAt(id, day) {
    const t = tracks[id];
    if (!t || !t.length) return null;
    let i = -1;
    for (let k = 0; k < t.length; k++) { if (t[k].day <= day) i = k; else break; }
    if (i < 0) return null;
    const a = t[i];
    if (a.gap) return null;
    if (a.day === day) return { ...a, est: false, wp: a };
    const b = t[i + 1];
    if (!b) return Math.floor(day) === a.day ? { ...a, est: false, wp: a } : null; // through the last day
    if (b.gap) return { ...a, est: true, wp: null, note: '', holding: true };
    const f = ease((day - a.day) / (b.day - a.day));
    return {
      lon: lerp(a.lon, b.lon, f), lat: lerp(a.lat, b.lat, f),
      name: `Between ${a.name} and ${b.name}`, troops: a.troops ?? b.troops,
      cert: 'a', est: true, wp: null, note: '', from: a, to: b,
    };
  }

  // Polyline pieces (array of coordinate arrays) for [fromDay, toDay], split at gaps.
  function pathBetween(id, fromDay, toDayN) {
    const t = tracks[id];
    if (!t || fromDay > toDayN) return [];
    const pieces = [];
    let cur = [];
    const startPos = positionAt(id, fromDay);
    if (startPos) cur.push([startPos.lon, startPos.lat]);
    for (const w of t) {
      if (w.day <= fromDay || w.day >= toDayN) continue;
      if (w.gap) { if (cur.length > 1) pieces.push(cur); cur = []; continue; }
      cur.push([w.lon, w.lat]);
    }
    const endPos = positionAt(id, toDayN);
    if (endPos) cur.push([endPos.lon, endPos.lat]);
    if (cur.length > 1) pieces.push(cur);
    return pieces;
  }

  const span = (id) => {
    const t = (tracks[id] || []).filter((w) => !w.gap);
    return t.length ? [t[0].day, t[t.length - 1].day] : null;
  };
  const isActive = (id, day) => !!positionAt(id, day);
  const eventsOn = (day) => {
    const out = [];
    for (const [id, t] of Object.entries(tracks)) for (const w of t) if (w.day === day && !w.gap && w.note) out.push({ id, w });
    return out;
  };

  // ---------------- Rendering ----------------
  let map;
  const markers = {}; // id -> maplibregl.Marker

  function addLayers(m) {
    map = m;
    const empty = { type: 'FeatureCollection', features: [] };
    map.addSource('routes-ahead', { type: 'geojson', data: empty });
    map.addSource('trails', { type: 'geojson', data: empty });
    map.addLayer({ id: 'routes-ahead', type: 'line', source: 'routes-ahead',
      layout: { 'line-cap': 'round', 'line-join': 'round' },
      paint: { 'line-color': ['get', 'color'], 'line-width': 2, 'line-opacity': 0.6, 'line-dasharray': [1.5, 2] } });
    map.addLayer({ id: 'trails-casing', type: 'line', source: 'trails',
      layout: { 'line-cap': 'round', 'line-join': 'round' },
      paint: { 'line-color': '#000', 'line-width': ['case', ['get', 'recent'], 6, 4], 'line-opacity': ['*', ['get', 'op'], 0.35] } });
    map.addLayer({ id: 'trails', type: 'line', source: 'trails',
      layout: { 'line-cap': 'round', 'line-join': 'round' },
      paint: { 'line-color': ['get', 'color'], 'line-width': ['case', ['get', 'recent'], 3.5, 2], 'line-opacity': ['get', 'op'] } });
  }

  function markerFor(c) {
    if (markers[c.id]) return markers[c.id];
    const el = document.createElement('div');
    el.className = 'cmd-marker';
    const face = c.portrait
      ? `<img class="face" src="${c.portrait}" alt="" draggable="false">`
      : `<span class="face initials">${esc(c.initials)}</span>`;
    el.innerHTML = `<div class="ring" style="--force:${c.color}">${face}</div><div class="lbl"></div>`;
    el.addEventListener('click', (e) => { e.stopPropagation(); SC.emit('commander:open', c.id); });
    markers[c.id] = new maplibregl.Marker({ element: el, anchor: 'top', offset: [0, -20] });
    return markers[c.id];
  }

  // Draw positions and trails at time t (fractional day). `opts`: state + { dimExcept:Set|null }
  function render(t, opts) {
    const trailFeats = [], aheadFeats = [];
    const visibleIds = SC.commanders.filter((c) => (opts.isolated ? c.id === opts.isolated : opts.visible.has(c.id))).map((c) => c.id);

    // Fan out markers that share a spot (e.g. Morgan, Pickens & Washington at Cowpens)
    const groups = {};
    for (const id of visibleIds) {
      const pos = positionAt(id, t);
      if (pos) (groups[`${pos.lon.toFixed(2)},${pos.lat.toFixed(2)}`] ||= []).push(id);
    }
    const fan = {};
    for (const ids of Object.values(groups)) {
      if (ids.length < 2) continue;
      const r = 20 + ids.length * 5;
      ids.forEach((id, i) => { const a = (i / ids.length) * 2 * Math.PI - Math.PI / 2; fan[id] = [Math.cos(a) * r, Math.sin(a) * r]; });
    }

    for (const c of SC.commanders) {
      const shown = visibleIds.includes(c.id);
      const pos = shown ? positionAt(c.id, t) : null;
      const dim = opts.dimExcept && !opts.dimExcept.has(c.id);
      const baseOp = dim ? 0.15 : 1;

      if (shown) {
        const sp = span(c.id);
        if (sp) {
          const recentFrom = Math.max(sp[0], t - RECENT_DAYS);
          for (const coords of pathBetween(c.id, sp[0], recentFrom))
            trailFeats.push({ type: 'Feature', properties: { color: c.color, op: 0.45 * baseOp, recent: false }, geometry: { type: 'LineString', coordinates: coords } });
          for (const coords of pathBetween(c.id, recentFrom, Math.min(t, sp[1])))
            trailFeats.push({ type: 'Feature', properties: { color: c.color, op: 0.95 * baseOp, recent: true }, geometry: { type: 'LineString', coordinates: coords } });
          if (opts.showFuture || opts.isolated === c.id)
            for (const coords of pathBetween(c.id, Math.max(t, sp[0]), sp[1]))
              aheadFeats.push({ type: 'Feature', properties: { color: c.color }, geometry: { type: 'LineString', coordinates: coords } });
        }
      }

      const mk = markers[c.id];
      if (pos) {
        const m = markerFor(c);
        const el = m.getElement();
        el.classList.toggle('estimated', pos.est);
        el.classList.toggle('focus', opts.followId === c.id || opts.isolated === c.id || opts.openCommander === c.id);
        el.style.opacity = dim ? 0.35 : 1;
        const label = `${esc(c.short)}${pos.troops ? `<small>~${pos.troops.toLocaleString()}${c.id === 'degrasse' ? ' ships' : ''}</small>` : ''}`;
        const lbl = el.querySelector('.lbl');
        if (lbl.innerHTML !== label) lbl.innerHTML = label;
        el.title = `${c.name} — ${pos.name}${pos.est ? ' (estimated position)' : ''}`;
        const [dx, dy] = fan[c.id] || [0, 0];
        m.setLngLat([pos.lon, pos.lat]).setOffset([dx, dy - 20]);
        if (!m._added) { m.addTo(map); m._added = true; }
      } else if (mk && mk._added) { mk.remove(); mk._added = false; }
    }
    map.getSource('trails').setData({ type: 'FeatureCollection', features: trailFeats });
    map.getSource('routes-ahead').setData({ type: 'FeatureCollection', features: aheadFeats });
  }

  return { compile, positionAt, pathBetween, span, isActive, eventsOn, addLayers, render, tracks };
})();
