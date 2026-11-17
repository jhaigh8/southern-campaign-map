// Base map styles and layer switching. Every tile source here is free and needs no API key.
SC.layers = (() => {
  const ESRI = 'https://server.arcgisonline.com/ArcGIS/rest/services';
  const TERRAIN = { source: 'dem', exaggeration: 1.6 };
  const isFile = location.protocol === 'file:';
  // One shared "toning" for every period map, so scans from different engravers read as one atlas
  const PERIOD_TONE = { 'raster-saturation': -0.25, 'raster-contrast': 0.08, 'raster-brightness-min': 0.04, 'raster-fade-duration': 0 };

  const periodLayerIds = (h) => h.tiles.map((_, i) => `${h.id}-${i}`);

  function style() {
    const sources = {
      satellite: { type: 'raster', tileSize: 256, maxzoom: 19,
        tiles: [`${ESRI}/World_Imagery/MapServer/tile/{z}/{y}/{x}`],
        attribution: 'Imagery © Esri, Maxar, Earthstar Geographics' },
      relief: { type: 'raster', tileSize: 256, maxzoom: 13,
        tiles: [`${ESRI}/World_Shaded_Relief/MapServer/tile/{z}/{y}/{x}`],
        attribution: 'Relief © Esri' },
      // Carto now requires an API key, so the modern layer uses Esri's keyless street map
      modern: { type: 'raster', tileSize: 256, maxzoom: 19,
        tiles: [`${ESRI}/World_Street_Map/MapServer/tile/{z}/{y}/{x}`],
        attribution: 'Map © Esri, HERE, Garmin, © OpenStreetMap contributors' },
      dem: { type: 'raster-dem', tileSize: 256, maxzoom: 14, encoding: 'terrarium',
        tiles: ['https://s3.amazonaws.com/elevation-tiles-prod/terrarium/{z}/{x}/{y}.png'],
        attribution: 'Elevation: Mapzen Terrain Tiles (AWS Open Data)' },
      'dem-hs': { type: 'raster-dem', tileSize: 256, maxzoom: 14, encoding: 'terrarium',
        tiles: ['https://s3.amazonaws.com/elevation-tiles-prod/terrarium/{z}/{x}/{y}.png'] },
    };
    const layers = [
      { id: 'bg', type: 'background', paint: { 'background-color': '#e9dcc0' } },
      { id: 'satellite', type: 'raster', source: 'satellite' },
      { id: 'relief', type: 'raster', source: 'relief', layout: { visibility: 'none' },
        paint: { 'raster-saturation': -0.6, 'raster-hue-rotate': 25, 'raster-contrast': -0.1, 'raster-brightness-min': 0.25, 'raster-opacity': 0.8 } },
      { id: 'modern', type: 'raster', source: 'modern', layout: { visibility: 'none' } },
      { id: 'hillshade', type: 'hillshade', source: 'dem-hs',
        paint: { 'hillshade-exaggeration': 0.35, 'hillshade-shadow-color': '#3b2a18', 'hillshade-highlight-color': '#fff6e0' } },
    ];
    for (const h of SC.historicMaps) {
      h.tiles.forEach((t, i) => {
        const url = isFile ? t.remoteSrc : `assets/historic/${t.src}`;
        if (!url) return; // local-only scans can't load from file:// — use Start Map.bat
        const id = `${h.id}-${i}`;
        sources[id] = { type: 'image', url, coordinates: t.coordinates };
        layers.push({ id, type: 'raster', source: id, layout: { visibility: 'none' }, paint: { ...PERIOD_TONE, 'raster-opacity': 0.85 } });
      });
    }
    return { version: 8, sources, layers, sky: {
      'sky-color': '#9cc3e6', 'horizon-color': '#f2e6cf', 'fog-color': '#f2e6cf',
      'sky-horizon-blend': 0.6, 'horizon-fog-blend': 0.6, 'fog-ground-blend': 0.8 } };
  }

  let map, current = 'satellite';
  const enabledMaps = new Set(SC.historicMaps.map((h) => h.id));
  const setVis = (id, on) => map.getLayer(id) && map.setLayoutProperty(id, 'visibility', on ? 'visible' : 'none');

  function applyPeriodVisibility() {
    for (const h of SC.historicMaps) for (const id of periodLayerIds(h)) setVis(id, current === 'period' && enabledMaps.has(h.id));
  }

  function setBase(name) {
    current = name;
    setVis('satellite', name === 'satellite');
    setVis('relief', name === 'period');
    setVis('modern', name === 'modern');
    setVis('hillshade', name !== 'modern');
    applyPeriodVisibility();
    map.setPaintProperty('bg', 'background-color', name === 'period' ? '#e9dcc0' : '#d9d4c7');
    document.querySelectorAll('#layer-panel .seg button').forEach((b) => b.classList.toggle('active', b.dataset.layer === name));
    document.getElementById('period-opacity-row').hidden = name !== 'period';
    SC.emit('layer:change', name);
  }

  function setTerrain(on) {
    map.setTerrain(on ? TERRAIN : null);
    if (on && map.getPitch() < 30) map.easeTo({ pitch: 55, duration: 800 });
    if (!on) map.easeTo({ pitch: 0, duration: 800 });
  }

  function init(m) {
    map = m;
    map.setTerrain(TERRAIN);
    document.querySelectorAll('#layer-panel .seg button').forEach((b) => b.addEventListener('click', () => setBase(b.dataset.layer)));
    document.getElementById('terrain-toggle').addEventListener('change', (e) => setTerrain(e.target.checked));
    document.getElementById('period-opacity').addEventListener('input', (e) => {
      for (const h of SC.historicMaps) for (const id of periodLayerIds(h)) if (map.getLayer(id)) map.setPaintProperty(id, 'raster-opacity', e.target.value / 100);
    });
    // One checkbox per period map
    const list = document.getElementById('period-map-list');
    list.innerHTML = [...SC.historicMaps].reverse().map((h) => `
      <label class="check-row small-row" title="${SC.util.esc(h.title)} — ${SC.util.esc(h.note)}">
        <input type="checkbox" data-map="${h.id}" checked> ${SC.util.esc(h.short)}
        <button class="link-btn" data-fly="${h.id}" title="Zoom to this map">↗</button>
      </label>`).join('');
    list.addEventListener('change', (e) => {
      const id = e.target.dataset.map; if (!id) return;
      e.target.checked ? enabledMaps.add(id) : enabledMaps.delete(id);
      applyPeriodVisibility();
    });
    list.addEventListener('click', (e) => {
      const id = e.target.dataset.fly; if (!id) return;
      e.preventDefault();
      const h = SC.historicMaps.find((x) => x.id === id);
      const pts = h.tiles.flatMap((t) => t.coordinates);
      const lons = pts.map((p) => p[0]), lats = pts.map((p) => p[1]);
      map.fitBounds([[Math.min(...lons), Math.min(...lats)], [Math.max(...lons), Math.max(...lats)]], { padding: SC.util.mapPadding(), duration: 1500 });
    });
  }

  return { style, init, setBase, current: () => current };
})();
