// "Visit today": parks, battlefields, historic sites and museums you can visit now, roadside markers,
// national park boundaries and the Overmountain Victory National Historic Trail. Independent of the
// timeline date. Data: data/visit-sites.js (curated) and data/visit-data.js (generated).
SC.visit = (() => {
  const { esc, distKm } = SC.util;
  const KIND = { park: 'Park', battlefield: 'Battlefield', historic: 'Historic site', museum: 'Museum / visitor center', grave: 'Grave or memorial', trail: 'Historic trail' };
  const STATUS = {
    on: ['On the battlefield', 'Preserved ground with interpretation: you can stand where the fighting happened.'],
    part: ['Part of the field', 'Some of the ground is preserved, reconstructed or open to visit.'],
    marker: ['Marker or memorial', 'A marker or memorial stands at or near the site; the ground itself is not interpreted.'],
    lost: ['Site lost', 'The ground is built over or under water. Markers or a memorial stand nearby.'],
  };
  const PROGRAM = { NC: 'North Carolina Highway Historical Marker', GA: 'Georgia historical marker', VA: 'Virginia highway marker' };
  const MARKER_LAYERS = ['visit-park-fill', 'visit-park-line', 'visit-trail', 'visit-offset', 'visit-markers'];
  let map, on = false;
  const els = {};
  const sites = () => SC.visitSites || [];
  const icon = (kind) => SC.icons.get(kind === 'battlefield' ? 'battle' : kind, 'historic');
  const data = () => SC.visitData || { markers: [], parks: { type: 'FeatureCollection', features: [] }, trail: { type: 'FeatureCollection', features: [] } };

  const directions = ([lon, lat]) => `https://www.google.com/maps/dir/?api=1&destination=${lat.toFixed(5)},${lon.toFixed(5)}`;
  const kmText = (km) => (km < 1 ? `${Math.round(km * 1000 / 10) * 10} m` : `${km.toFixed(km < 10 ? 1 : 0)} km`) + ` (${(km * 0.621).toFixed(km < 16 ? 1 : 0)} mi)`;

  function addLayers(m) {
    map = m;
    const d = data();
    map.addSource('visit-parks', { type: 'geojson', data: d.parks });
    map.addSource('visit-trail', { type: 'geojson', data: d.trail });
    map.addSource('visit-markers', { type: 'geojson', data: { type: 'FeatureCollection', features: d.markers.map((mk, i) => ({ type: 'Feature', id: i, properties: { i }, geometry: { type: 'Point', coordinates: mk.ll } })) } });
    // Dashed lines from a battle's site to where its marker or memorial actually stands, when they differ
    const offs = [];
    for (const s of sites()) {
      if (!['marker', 'lost'].includes(s.status)) continue;
      for (const id of s.battles || []) {
        const b = SC.battles.find((x) => x.id === id);
        if (b && distKm([b.lon, b.lat], s.ll) > 0.4) offs.push({ type: 'Feature', properties: {}, geometry: { type: 'LineString', coordinates: [[b.lon, b.lat], s.ll] } });
      }
    }
    map.addSource('visit-offset', { type: 'geojson', data: { type: 'FeatureCollection', features: offs } });
    const vis = { visibility: 'none' };
    map.addLayer({ id: 'visit-park-fill', type: 'fill', source: 'visit-parks', layout: vis, paint: { 'fill-color': '#5f9e4a', 'fill-opacity': 0.18 } });
    map.addLayer({ id: 'visit-park-line', type: 'line', source: 'visit-parks', layout: vis, paint: { 'line-color': '#8fd16f', 'line-width': 1.6, 'line-opacity': 0.9 } });
    map.addLayer({ id: 'visit-trail', type: 'line', source: 'visit-trail', layout: { ...vis, 'line-cap': 'round', 'line-join': 'round' },
      paint: { 'line-color': '#e7a948', 'line-width': ['interpolate', ['linear'], ['zoom'], 6, 1.5, 12, 3.5], 'line-dasharray': [2, 1.5], 'line-opacity': 0.9 } });
    map.addLayer({ id: 'visit-offset', type: 'line', source: 'visit-offset', layout: vis, paint: { 'line-color': '#f3e3b0', 'line-width': 1.4, 'line-dasharray': [1, 2] } });
    map.addLayer({ id: 'visit-markers', type: 'circle', source: 'visit-markers', layout: vis, minzoom: 6,
      paint: { 'circle-radius': ['interpolate', ['linear'], ['zoom'], 6, 2.5, 12, 5.5], 'circle-color': '#3a2f22',
        'circle-stroke-color': '#e5c46b', 'circle-stroke-width': ['interpolate', ['linear'], ['zoom'], 6, 1, 12, 2],
        'circle-opacity': ['case', ['boolean', ['feature-state', 'hover'], false], 1, 0.9] } });

    // Roadside markers: a small popup with the title and a link to the program's own page
    const popup = new maplibregl.Popup({ closeButton: true, maxWidth: '260px', className: 'visit-pop' });
    map.on('click', 'visit-markers', (e) => {
      const mk = data().markers[e.features[0].properties.i];
      popup.setLngLat(mk.ll).setHTML(`<div class="vp-kind">${SC.icons.get('marker')} ${esc(PROGRAM[mk.st])} ${esc(mk.no)}</div>
        <strong>${esc(mk.name)}</strong>${mk.note ? `<div class="vp-note">${esc(mk.note)}</div>` : ''}
        <div class="vp-links">${mk.url ? `<a href="${esc(mk.url)}" target="_blank" rel="noopener">Marker text</a>` : ''}<a href="${directions(mk.ll)}" target="_blank" rel="noopener">Directions</a></div>`).addTo(map);
    });
    map.on('mouseenter', 'visit-markers', () => { map.getCanvas().style.cursor = 'pointer'; });
    map.on('mouseleave', 'visit-markers', () => { map.getCanvas().style.cursor = ''; });

    for (const s of sites()) {
      const el = document.createElement('div');
      el.className = `visit-site kind-${s.kind}${s.status ? ` st-${s.status}` : ''}`;
      el.innerHTML = `<span class="vs-icon">${icon(s.kind)}</span><span class="vs-label">${esc(s.name)}</span>`;
      el.title = s.name;
      el.style.display = 'none';
      el.addEventListener('click', (e) => { e.stopPropagation(); open(s.id); });
      els[s.id] = new maplibregl.Marker({ element: el, anchor: 'left', offset: [-11, 0] }).setLngLat(s.ll).addTo(map);
    }
    const zoomCls = () => map.getContainer().classList.toggle('visit-labels', map.getZoom() >= 9);
    map.on('zoom', zoomCls); zoomCls();
  }

  function setOn(v) {
    on = v;
    for (const id of MARKER_LAYERS) if (map.getLayer(id)) map.setLayoutProperty(id, 'visibility', on ? 'visible' : 'none');
    for (const mk of Object.values(els)) mk.getElement().style.display = on ? '' : 'none';
    document.body.classList.toggle('visit-on', on);
  }

  // Places listed for a battle: its own sites first (best status first), then related places
  const ORDER = { on: 0, part: 1, marker: 2, lost: 3 };
  function forBattle(b) {
    const list = sites().filter((s) => (s.battles || []).includes(b.id))
      .map((s) => ({ s, km: distKm([b.lon, b.lat], s.ll) }))
      .sort((x, y) => (ORDER[x.s.status] ?? 5) - (ORDER[y.s.status] ?? 5) || x.km - y.km);
    const near = data().markers.filter((mk) => distKm([b.lon, b.lat], mk.ll) < 5).length;
    return { list, near };
  }

  // A "Visit today" block for the battle panel
  function battleSection(b) {
    const { list, near } = forBattle(b);
    if (!list.length && !near) return '';
    const items = list.map(({ s, km }) => `<li><a href="#" data-visit="${esc(s.id)}">${icon(s.kind)}<span>${esc(s.name)}</span></a>
      ${s.status ? `<em class="visit-status ${s.status}" title="${esc(STATUS[s.status][1])}">${esc(STATUS[s.status][0])}</em>` : ''}
      ${(s.status ? ['marker', 'lost'].includes(s.status) && km > 0.4 : km > 2) ? `<small>${kmText(km)} from the battle site</small>` : ''}</li>`).join('');
    return `<div class="visit-sec"><h4>Visit today</h4>${items ? `<ul>${items}</ul>` : ''}
      ${near ? `<div class="src">${near} roadside marker${near > 1 ? 's' : ''} within 5 km. <a href="#" data-visit-on="1">Show them on the map</a></div>` : ''}</div>`;
  }
  function wire(panel, b) {
    panel.querySelectorAll('[data-visit]').forEach((a) => a.addEventListener('click', (e) => { e.preventDefault(); toggle(true); open(a.dataset.visit); }));
    panel.querySelector('[data-visit-on]')?.addEventListener('click', (e) => {
      e.preventDefault(); toggle(true);
      map.flyTo({ center: [b.lon, b.lat], zoom: 11.5, pitch: 45, duration: 1500, essential: true });
    });
  }
  function toggle(v) {
    const cb = document.getElementById('visit-toggle');
    if (cb.checked !== v) { cb.checked = v; }
    setOn(v);
  }

  function open(id) {
    const s = sites().find((x) => x.id === id); if (!s) return;
    const bats = (s.battles || []).map((bid) => SC.battles.find((x) => x.id === bid)).filter(Boolean);
    const own = s.status && bats[0];
    const km = own ? distKm([bats[0].lon, bats[0].lat], s.ll) : 0;
    const body = SC.panel.show('visit', `
      <div class="kicker">${esc(KIND[s.kind] || 'Place')} · Visit today</div>
      <h2>${esc(s.name)}</h2>
      ${s.status ? `<span class="visit-status ${s.status}" title="${esc(STATUS[s.status][1])}">${esc(STATUS[s.status][0])}</span>
        <p class="src">${esc(STATUS[s.status][1])}${['marker', 'lost'].includes(s.status) && km > 0.4 ? ` About ${kmText(km)} from where the map places the battle.` : ''}</p>` : ''}
      ${s.note ? `<p>${esc(s.note)}</p>` : ''}
      ${bats.length ? `<div class="loc-line"><span class="k">${bats.length > 1 ? 'Battles' : 'Battle'}</span> ${bats.map((b) => `<a href="#" data-battle="${b.id}">${esc(b.name)}</a>`).join(', ')}</div>` : ''}
      <div class="info-actions">
        ${s.url ? `<a class="btn primary" href="${esc(s.url)}" target="_blank" rel="noopener">${s.src === 'lt' ? 'Liberty Trail page' : 'Official page'}</a>` : ''}
        <a class="btn" href="${directions(s.ll)}" target="_blank" rel="noopener">Directions</a>
      </div>
      <div class="src">Check opening hours, fees and access with the site before you go.${s.src === 'lt' ? ' Position and page: The Liberty Trail.' : ''}</div>`);
    body.querySelectorAll('[data-battle]').forEach((a) => a.addEventListener('click', (e) => { e.preventDefault(); SC.battles_ui.select(a.dataset.battle, true); }));
    map.flyTo({ center: s.ll, zoom: Math.max(map.getZoom(), 12), duration: 1200, essential: true });
  }

  return { addLayers, setOn, battleSection, wire, open, isOn: () => on };
})();
