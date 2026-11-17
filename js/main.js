// Entry point: builds state, creates the map and wires the modules together.
(() => {
  const { toDay, toISO } = SC.util;

  SC.move.compile();
  SC.battles_ui.prepare();

  const state = {
    day: toDay('1781-01-17'),
    visible: new Set(SC.commanders.map((c) => c.id)),
    isolated: null,
    followId: null,
    selectedBattle: null,
    showFuture: false,
  };
  SC.state = state;

  // Restore from URL hash: #date=1781-01-17&isolate=morgan&battle=cowpens&layer=period
  const hash = new URLSearchParams(location.hash.slice(1));
  if (hash.get('date')) { const d = toDay(hash.get('date')); if (!Number.isNaN(d)) state.day = d; }
  if (hash.get('isolate') && SC.movements[hash.get('isolate')]) state.isolated = hash.get('isolate');

  const map = new maplibregl.Map({
    container: 'map',
    style: SC.layers.style(),
    center: [-80.2, 34.6], zoom: 6.4, pitch: 50, bearing: -12,
    maxPitch: 78, attributionControl: { compact: true },
  });
  map.addControl(new maplibregl.NavigationControl({ visualizePitch: true }), 'bottom-right');
  map.addControl(new maplibregl.ScaleControl({ unit: 'imperial' }), 'bottom-right');
  SC.map = map;

  if (window.innerWidth < 760) document.getElementById('sidebar').classList.add('collapsed');
  document.getElementById('toggle-sidebar').onclick = () => document.getElementById('sidebar').classList.toggle('collapsed');
  document.getElementById('close-info').onclick = () => SC.battles_ui.select(null);
  document.getElementById('future-toggle').addEventListener('change', (e) => { state.showFuture = e.target.checked; SC.emit('state:change'); });

  // Re-render everything on any state change (cheap: ~30 commanders, ~45 battles)
  let pending = false;
  function render() {
    if (pending) return;
    pending = true;
    requestAnimationFrame(() => {
      pending = false;
      const sel = SC.battles.find((b) => b.id === state.selectedBattle);
      SC.move.render(state.day, { ...state, dimExcept: sel && sel.participants.length ? new Set(sel.participants) : null });
      SC.battles_ui.refresh(state.day);
      SC.cmdPanel.refresh(state.day);
      SC.timeline.refresh(state.day);
      if (state.followId) follow();
      writeHash();
    });
  }

  function follow() {
    const pos = SC.move.positionAt(state.followId, state.day);
    if (pos) map.easeTo({ center: [pos.lon, pos.lat], duration: 300, essential: true });
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
      history.replaceState(null, '', `#${p}`);
    }, 250);
  }

  SC.on('state:change', render);
  SC.on('layer:change', render);
  SC.on('camera:follow', follow);
  SC.on('commander:isolate', (id) => {
    state.isolated = id;
    if (id) { state.visible.add(id); SC.cmdPanel.syncChecks(); fitRoute(id); }
    render();
  });
  SC.on('commander:focus', (id) => {
    const pos = SC.move.positionAt(id, state.day);
    if (pos) map.flyTo({ center: [pos.lon, pos.lat], zoom: Math.max(map.getZoom(), 9), pitch: 55, duration: 1500 });
    else fitRoute(id);
  });

  map.on('load', () => {
    SC.layers.init(map);
    SC.move.addLayers(map);
    SC.battles_ui.addLayers(map, state);
    SC.cmdPanel.build(state);
    SC.timeline.build(state);
    SC.validate();
    if (hash.get('layer')) SC.layers.setBase(hash.get('layer'));
    SC.timeline.set(state.day);
    if (hash.get('battle')) SC.battles_ui.select(hash.get('battle'), true);
    else if (state.isolated) fitRoute(state.isolated);
  });

  map.on('error', (e) => { if (e?.error?.status !== 404) console.warn('[map]', e.error?.message || e); });
})();
