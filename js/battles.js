// Battle markers, info panel, and highlighting of approach and withdrawal routes.
SC.battles_ui = (() => {
  const { toDay, esc, fmtRange } = SC.util;
  const OUTCOME = { allied: ['american', 'American / Allied victory'], crown: ['british', 'British / Loyalist victory'], draw: ['draw', 'Indecisive'] };
  const outcomeLabel = (b) => (b.kind === 'standoff' ? 'No fighting' : OUTCOME[b.outcome][1]);
  let map, state;
  const markers = {};
  let dashStep = 0, animHandle = null;

  function prepare() {
    for (const b of SC.battles) {
      b.startDay = toDay(b.start); b.endDay = toDay(b.end);
      const p = Array.isArray(b.place) ? b.place : SC.places[b.place];
      if (!p) console.warn(`[data] Battle ${b.id}: unknown place ${b.place}`);
      b.lon = p[0]; b.lat = p[1];
      b.participants = [...b.allies, ...b.crown];
    }
    SC.battles.sort((a, b) => a.startDay - b.startDay);
  }

  function addLayers(m, s) {
    map = m; state = s;
    const empty = { type: 'FeatureCollection', features: [] };
    map.addSource('highlight', { type: 'geojson', data: empty });
    map.addLayer({ id: 'highlight-glow', type: 'line', source: 'highlight',
      layout: { 'line-cap': 'round', 'line-join': 'round' },
      paint: { 'line-color': '#fff3c4', 'line-width': 9, 'line-opacity': 0.35, 'line-blur': 3 } });
    map.addLayer({ id: 'highlight', type: 'line', source: 'highlight',
      layout: { 'line-cap': 'butt', 'line-join': 'round' },
      paint: { 'line-color': ['get', 'color'], 'line-width': 4.5, 'line-dasharray': [0, 4, 3] } });

    for (const b of SC.battles) {
      const el = document.createElement('div');
      el.className = `battle-marker kind-${b.kind}`;
      el.innerHTML = `${SC.icons.get(b.kind)}<div class="b-tip"><strong>${esc(b.name)}</strong>
        <span>${fmtRange(b.startDay, b.endDay)}</span>${b.location ? `<span class="loc">${esc(b.location)}</span>` : ''}</div>`;
      el.addEventListener('click', (e) => { e.stopPropagation(); select(b.id, true); });
      markers[b.id] = new maplibregl.Marker({ element: el }).setLngLat([b.lon, b.lat]).addTo(map);
    }
  }

  // Marching-ants animation for the highlighted routes
  const DASHES = [[0, 4, 3], [0.5, 4, 2.5], [1, 4, 2], [1.5, 4, 1.5], [2, 4, 1], [2.5, 4, 0.5], [3, 4, 0], [0, 0.5, 3, 3.5], [0, 1, 3, 3], [0, 1.5, 3, 2.5], [0, 2, 3, 2], [0, 2.5, 3, 1.5], [0, 3, 3, 1], [0, 3.5, 3, 0.5]];
  function animate(ts) {
    const step = Math.floor(ts / 70) % DASHES.length;
    if (step !== dashStep) { map.setPaintProperty('highlight', 'line-dasharray', DASHES[step]); dashStep = step; }
    animHandle = requestAnimationFrame(animate);
  }

  function refresh(day) {
    for (const b of SC.battles) {
      const el = markers[b.id].getElement();
      const isolatedHide = state.isolated && !b.participants.includes(state.isolated);
      el.classList.toggle('active', day >= b.startDay && day <= b.endDay);
      el.classList.toggle('past', day > b.endDay);
      el.classList.toggle('future', day < b.startDay);
      el.classList.toggle('show-future', state.showFuture || !!state.isolated);
      el.classList.toggle('selected', state.selectedBattle === b.id);
      el.style.display = isolatedHide ? 'none' : '';
    }
  }

  function highlight(b) {
    const feats = [];
    if (b) {
      const from = b.startDay - b.approach, to = b.endDay + b.withdrawal;
      for (const id of b.participants) {
        const c = SC.commanders.find((x) => x.id === id);
        for (const coords of SC.move.pathBetween(id, from, to))
          feats.push({ type: 'Feature', properties: { color: c.color }, geometry: { type: 'LineString', coordinates: coords } });
      }
    }
    map.getSource('highlight').setData({ type: 'FeatureCollection', features: feats });
    if (b && !animHandle) animHandle = requestAnimationFrame(animate);
    if (!b && animHandle) { cancelAnimationFrame(animHandle); animHandle = null; }
  }

  function nameList(ids) {
    return ids.map((id) => {
      const c = SC.commanders.find((x) => x.id === id);
      return `<li><a href="#" data-cmd="${id}" style="color:${c.color};font-weight:600">${esc(c.name)}</a></li>`;
    }).join('');
  }

  function select(id, fly) {
    const b = SC.battles.find((x) => x.id === id);
    if (!b) { if (SC.panel.kind() === 'battle') SC.panel.close(); else { state.selectedBattle = null; highlight(null); SC.emit('state:change'); } return; }

    const cls = OUTCOME[b.outcome][0], label = outcomeLabel(b);
    const panel = SC.panel.show('battle', `
      <div class="kicker">${esc(b.kind)}</div>
      <h2>${esc(b.name)}</h2>
      <div class="meta">${fmtRange(b.startDay, b.endDay)}</div>
      ${b.location ? `<div class="loc-line"><span class="k">Where</span> ${esc(b.location)}</div>` : ''}
      <span class="outcome ${cls}">${label}</span>
      <p>${esc(b.summary)}</p>
      <div class="sides">
        <div class="am"><h4>American / Allied</h4><ul>${nameList(b.allies)}</ul>
          <div>Strength: ${esc(b.strength[0])}</div><div>Losses: ${esc(b.casualties[0])}</div></div>
        <div class="br"><h4>British / Loyalist</h4><ul>${nameList(b.crown)}</ul>
          <div>Strength: ${esc(b.strength[1])}</div><div>Losses: ${esc(b.casualties[1])}</div></div>
      </div>
      ${b.others ? `<div class="src">Also present: ${esc(b.others)}</div>` : ''}
      ${b.participants.length ? `<div class="src">Highlighted: each commander's route from ${b.approach} days before to ${b.withdrawal} days after.</div>` : '<div class="src">No tracked commanders took part, so there are no routes to highlight.</div>'}
      ${SC.tactics.has(b.id) ? `<button class="btn tac-enter" data-act="tactical">${SC.icons.get('battle')}<span>Enter the battlefield<small>Phase-by-phase 3D reconstruction</small><em class="tac-level ${SC.tactical[b.id].level}" title="${esc(SC.tactics.level(b.id)[1])}">${esc(SC.tactics.level(b.id)[0])}</em>${SC.tactics.site(b.id)}</span></button>` : ''}
      <div class="info-actions">
        <button class="btn primary" data-act="play">▶ Play this battle</button>
        <button class="btn" data-act="goto">Jump to date</button>
        <button class="btn" data-act="zoom">Zoom to field</button>
      </div>
      ${SC.visit.battleSection(b)}
      <div class="src">Figures are approximate; sources differ.</div>`,
      () => { state.selectedBattle = null; highlight(null); SC.emit('state:change'); });
    state.selectedBattle = b.id;
    panel.querySelector('[data-act="play"]').onclick = () => SC.emit('timeline:playRange', b.startDay - b.approach, b.endDay + b.withdrawal);
    panel.querySelector('[data-act="goto"]').onclick = () => SC.emit('timeline:set', b.startDay);
    panel.querySelector('[data-act="zoom"]').onclick = () => flyTo(b);
    panel.querySelector('[data-act="tactical"]')?.addEventListener('click', () => SC.tactics.enter(b.id));
    SC.visit.wire(panel, b);
    panel.querySelectorAll('[data-cmd]').forEach((a) => a.addEventListener('click', (e) => { e.preventDefault(); SC.emit('commander:open', a.dataset.cmd); }));
    highlight(b);
    if (fly) flyToRoutes(b);
    SC.emit('state:change');
  }

  function flyTo(b) {
    map.flyTo({ center: [b.lon, b.lat], zoom: 12.5, pitch: 62, bearing: map.getBearing() || -20, duration: 2200, essential: true });
  }
  function flyToRoutes(b) {
    const pts = [[b.lon, b.lat]];
    for (const id of b.participants) for (const seg of SC.move.pathBetween(id, b.startDay - b.approach, b.endDay + b.withdrawal)) pts.push(...seg);
    if (pts.length < 2) return flyTo(b);
    const lons = pts.map((p) => p[0]), lats = pts.map((p) => p[1]);
    map.fitBounds([[Math.min(...lons), Math.min(...lats)], [Math.max(...lons), Math.max(...lats)]],
      { padding: SC.util.mapPadding(), pitch: 50, maxZoom: 11.5, duration: 2200 });
  }

  const nextAfter = (day) => SC.battles.find((b) => b.startDay > day);
  const prevBefore = (day) => [...SC.battles].reverse().find((b) => b.startDay < day);
  const activeOn = (day) => SC.battles.filter((b) => day >= b.startDay && day <= b.endDay);

  return { prepare, addLayers, refresh, select, nextAfter, prevBefore, activeOn, outcomeLabel };
})();
