// Base map styles and layer switching. Every tile source here is free and needs no API key.
SC.layers = (() => {
  const ESRI = 'https://server.arcgisonline.com/ArcGIS/rest/services';
  const TERRAIN = { source: 'dem', exaggeration: 1.6 };
  const isFile = location.protocol === 'file:';

  function style() {
    const sources = {
      satellite: { type: 'raster', tileSize: 256, maxzoom: 19,
        tiles: [`${ESRI}/World_Imagery/MapServer/tile/{z}/{y}/{x}`],
        attribution: 'Imagery © Esri, Maxar, Earthstar Geographics' },
      relief: { type: 'raster', tileSize: 256, maxzoom: 13,
        tiles: [`${ESRI}/World_Shaded_Relief/MapServer/tile/{z}/{y}/{x}`],
        attribution: 'Relief © Esri' },
      modern: { type: 'raster', tileSize: 256, maxzoom: 20,
        tiles: ['a', 'b', 'c', 'd'].map((s) => `https://${s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}@2x.png`),
        attribution: '© OpenStreetMap contributors © CARTO' },
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
      sources[h.id] = { type: 'image', url: isFile ? h.remoteSrc : h.src, coordinates: h.coordinates };
      layers.push({ id: h.id, type: 'raster', source: h.id, layout: { visibility: 'none' },
        paint: { 'raster-opacity': 0.85, 'raster-fade-duration': 0 } });
    }
    return { version: 8, sources, layers, sky: {
      'sky-color': '#9cc3e6', 'horizon-color': '#f2e6cf', 'fog-color': '#f2e6cf',
      'sky-horizon-blend': 0.6, 'horizon-fog-blend': 0.6, 'fog-ground-blend': 0.8 } };
  }

  let map, current = 'satellite';
  const setVis = (id, on) => map.getLayer(id) && map.setLayoutProperty(id, 'visibility', on ? 'visible' : 'none');

  function setBase(name) {
    current = name;
    setVis('satellite', name === 'satellite');
    setVis('relief', name === 'period');
    setVis('modern', name === 'modern');
    setVis('hillshade', name !== 'modern');
    for (const h of SC.historicMaps) setVis(h.id, name === 'period');
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
      for (const h of SC.historicMaps) map.setPaintProperty(h.id, 'raster-opacity', e.target.value / 100);
    });
  }

  return { style, init, setBase, current: () => current };
})();
