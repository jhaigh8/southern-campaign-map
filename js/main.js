// Entry point: builds state, creates the map and wires the modules together.
(() => {
  const { toDay, toISO } = SC.util;

  SC.move.compile();
  SC.battles_ui.prepare();
  SC.landmarks_ui.prepare();

  const state = {
    day: toDay('1781-01-17'),
    t: toDay('1781-01-17'),       // continuous time for smooth movement (see timeline.js)
    visible: new Set(SC.commanders.map((c) => c.id)),
    isolated: null,
    followId: null,
    openCommander: null,
    selectedBattle: null,
    showFuture: false,
  };
  SC.state = state;

  // Restore from URL hash: #date=1781-01-17&isolate=morgan&battle=cowpens&layer=period
  const hash = new URLSearchParams(location.hash.slice(1));
  if (hash.get('date')) { const d = toDay(hash.get('date')); if (!Number.isNaN(d)) state.day = state.t = d; }
  if (hash.get('isolate') && SC.movements[hash.get('isolate')]) state.isolated = hash.get('isolate');

  const map = new maplibregl.Map({
    container: 'map',
    style: SC.layers.style(),
    center: [-80.2, 34.6], zoom: 6.4, pitch: 50, bearing: -12,
    maxPitch: 78, attributionControl: { compact: true },
  });

  // "Reorient north" button: one click turns the map north-up; a second click also flattens it to top-down
  class NorthControl {
    onAdd(m) {
      this._c = document.createElement('div');
      this._c.className = 'maplibregl-ctrl maplibregl-ctrl-group north-ctrl';
      this._c.innerHTML = '<button type="button" title="Reorient north (click again for top-down view)" aria-label="Reorient north"><span>N</span>⬆</button>';
      this._c.querySelector('button').onclick = () => {
        const flat = Math.abs(m.getBearing()) < 0.5;
        m.easeTo({ bearing: 0, pitch: flat ? 0 : m.getPitch(), duration: 700 });
      };
      return this._c;
    }
    onRemove() { this._c.remove(); }
  }
  map.addControl(new NorthControl(), 'bottom-right');
  map.addControl(new maplibregl.NavigationControl({ visualizePitch: true }), 'bottom-right');
  map.addControl(new maplibregl.ScaleControl({ unit: 'imperial' }), 'bottom-right');
  SC.map = map;
  const zoomClass = () => map.getContainer().classList.toggle('zoomed-out', map.getZoom() < 7.5);
  map.on('zoom', zoomClass); zoomClass();

  if (window.innerWidth < 760) document.getElementById('sidebar').classList.add('collapsed');
  document.getElementById('toggle-sidebar').onclick = () => document.getElementById('sidebar').classList.toggle('collapsed');
  document.getElementById('close-info').onclick = () => SC.panel.close();
  document.getElementById('future-toggle').addEventListener('change', (e) => { state.showFuture = e.target.checked; SC.emit('state:change'); });
  document.getElementById('landmark-toggle').addEventListener('change', () => SC.emit('state:change'));

  // Map layer (positions/trails) can redraw every animation frame; panels only when the day changes
  function renderMap() {
    const sel = SC.battles.find((b) => b.id === state.selectedBattle);
    SC.move.render(state.t, { ...state, dimExcept: sel && sel.participants.length ? new Set(sel.participants) : null });
    if (state.followId) follow(false);
  }
  let pending = false;
  function render() {
    if (pending) return;
    pending = true;
    requestAnimationFrame(() => {
      pending = false;
      renderMap();
      SC.battles_ui.refresh(state.day);
      SC.landmarks_ui.refresh(state.day);
      SC.cmdPanel.refresh(state.day);
      SC.timeline.refresh(state.day);
      writeHash();
    });
  }

  function follow(animate = true) {
    const pos = SC.move.positionAt(state.followId, state.t);
    if (!pos) return;
    if (animate) map.easeTo({ center: [pos.lon, pos.lat], duration: 600, essential: true });
    else if (!map.isMoving()) map.jumpTo({ center: [pos.lon, pos.lat] });
  }

  function fitRoute(id) {
    const pts = [];
    for (const seg of SC.move.pathBetween(id, ...SC.move.span(id))) pts.push(...seg);
    if (pts.length < 2) return;
    const lons = pts.map((p) => p[0]), lats = pts.map((p) => p[1]);
    map.fitBounds([[Math.min(...lons), Math.min(...lats)], [Math.max(...lons), Math.max(...lats)]],
      { padding: SC.util.mapPadding(), pitch: 45, maxZoom: 10, duration: 1800 });
  }

  let hashTimer;
  function writeHash() {
    clearTimeout(hashTimer);
    hashTimer = setTimeout(() => {
      const p = new URLSearchParams({ date: toISO(state.day) });
      if (state.isolated) p.set('isolate', state.isolated);
      if (state.selectedBattle) p.set('battle', state.selectedBattle);
      if (SC.layers.current() !== 'satellite') p.set('layer', SC.layers.current());
      if (!document.getElementById('terrain-toggle').checked) p.set('terrain', '0');
      history.replaceState(null, '', `#${p}`);
    }, 250);
  }

  SC.on('state:change', render);
  SC.on('frame', renderMap);
  SC.on('layer:change', render);
  SC.on('camera:follow', () => follow(true));
  SC.on('commander:isolate', (id) => {
    state.isolated = id;
    if (id) { state.visible.add(id); SC.cmdPanel.syncChecks(); fitRoute(id); }
    render();
  });
  SC.on('commander:focus', (id) => {
    const pos = SC.move.positionAt(id, state.t);
    if (pos) map.flyTo({ center: [pos.lon, pos.lat], zoom: Math.max(map.getZoom(), 9), pitch: 55, duration: 1500 });
    else fitRoute(id);
  });

  // 'style.load' fires once the style is ready; unlike 'load' it doesn't wait for every tile
  map.once('style.load', () => {
    SC.layers.init(map);
    SC.move.addLayers(map);
    SC.battles_ui.addLayers(map, state);
    SC.landmarks_ui.addMarkers(map, state);
    SC.cmdPanel.build(state);
    SC.timeline.build(state);
    SC.validate();
    if (hash.get('layer')) SC.layers.setBase(hash.get('layer'));
    if (hash.get('terrain') === '0') { const tt = document.getElementById('terrain-toggle'); tt.checked = false; tt.dispatchEvent(new Event('change')); }
    SC.timeline.set(state.day, { instant: true });
    if (hash.get('battle')) SC.battles_ui.select(hash.get('battle'), true);
    else if (state.isolated) fitRoute(state.isolated);
  });

  SC.errors = [];
  map.on('error', (e) => {
    const msg = `${e.sourceId || ''} ${e.error?.status || ''} ${e.error?.message || e}`.trim();
    if (e?.error?.status !== 404) { console.warn('[map]', msg); if (SC.errors.length < 50) SC.errors.push(msg); }
  });
  window.addEventListener('error', (e) => SC.errors.push(`JS: ${e.message} @ ${e.filename}:${e.lineno}`));

  // ?debug writes map diagnostics into the page (readable by a headless browser via --dump-dom)
  if (new URLSearchParams(location.search).has('debug')) {
    // Test hooks for headless screenshots: ?debug&open=marion  ·  ?debug&toasts  ·  ?debug&cam=lon,lat,zoom
    const q = new URLSearchParams(location.search);
    if (q.get('cam')) { const [lon, lat, z] = q.get('cam').split(',').map(Number); map.jumpTo({ center: [lon, lat], zoom: z, pitch: 0, bearing: 0 }); }
    map.once('style.load', () => setTimeout(() => {
      if (q.get('open')) SC.emit('commander:open', q.get('open'));
      if (q.has('toasts')) SC.toasts.forDay(state.day, state, 1);
    }, 1500));
    setInterval(() => {
      let el = document.getElementById('debug-out');
      if (!el) { el = document.createElement('pre'); el.id = 'debug-out'; el.style.display = 'none'; document.body.appendChild(el); }
      const style = map.getStyle();
      el.textContent = JSON.stringify({
        loaded: map.loaded(), styleLoaded: map.isStyleLoaded(), layer: SC.layers.current(), day: state.day,
        visible: style ? style.layers.filter((l) => l.layout?.visibility !== 'none').map((l) => l.id) : [],
        sourcesLoaded: style ? Object.fromEntries(Object.keys(style.sources).filter((s) => map.getSource(s)).map((s) => [s, map.isSourceLoaded(s)])) : {},
        markers: document.querySelectorAll('.cmd-marker').length, landmarks: document.querySelectorAll('.lm-marker:not([style*="none"])').length,
        errors: SC.errors,
      });
    }, 1000);
  }
})();
