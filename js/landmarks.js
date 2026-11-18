// Camps, posts and occupied towns: small markers that light up while in use.
SC.landmarks_ui = (() => {
  const { toDay, esc, fmtRange } = SC.util;
  const KIND = { camp: 'Field camp', post: 'Fortified post', city: 'Town / headquarters', muster: 'Muster ground' };
  let map, state;
  const markers = {};

  function prepare() {
    for (const l of SC.landmarks) {
      const p = Array.isArray(l.place) ? l.place : SC.places[l.place];
      if (!p) { console.warn(`[data] Landmark ${l.id}: unknown place ${l.place}`); continue; }
      l.lon = p[0]; l.lat = p[1];
      l.spans = l.periods.map(([a, b, desc, who]) => ({ from: toDay(a), to: toDay(b), desc, who }));
    }
  }

  function addMarkers(m, s) {
    map = m; state = s;
    for (const l of SC.landmarks) {
      if (l.lon == null) continue;
      const el = document.createElement('div');
      el.className = `lm-marker ${l.control}`;
      el.innerHTML = `<span class="lm-icon">${SC.icons.get(l.kind, 'camp')}</span><span class="lm-label">${esc(l.name)}</span>`;
      el.title = l.name;
      el.addEventListener('click', (e) => { e.stopPropagation(); open(l.id); });
      markers[l.id] = new maplibregl.Marker({ element: el, anchor: 'left', offset: [-11, 0] }).setLngLat([l.lon, l.lat]).addTo(map);
    }
  }

  const activeSpan = (l, day) => l.spans.find((s) => day >= s.from && day <= s.to);

  function refresh(day) {
    const show = document.getElementById('landmark-toggle').checked;
    for (const l of SC.landmarks) {
      const mk = markers[l.id]; if (!mk) continue;
      const el = mk.getElement();
      const span = activeSpan(l, day);
      const relevant = !state.isolated || l.spans.some((s) => s.who.includes(state.isolated));
      el.style.display = show && relevant && (span || state.showFuture) ? '' : 'none';
      el.classList.toggle('active', !!span);
    }
  }

  function open(id) {
    const l = SC.landmarks.find((x) => x.id === id);
    const periods = l.spans.map((s) => {
      const who = s.who.map((cid) => {
        const c = SC.commanders.find((x) => x.id === cid);
        return `<a href="#" data-cmd="${cid}" style="color:${c.color}">${esc(c.short)}</a>`;
      }).join(', ');
      return `<li><strong>${fmtRange(s.from, s.to)}</strong>: ${esc(s.desc)}${who ? `<br><small>Present: ${who}</small>` : ''}
        <br><a href="#" data-goto="${s.from}">Jump to this date</a></li>`;
    }).join('');
    const body = SC.panel.show('landmark', `
      <div class="kicker">${KIND[l.kind]} · ${l.control === 'crown' ? 'British-held' : 'American-held'}</div>
      <h2>${esc(l.name)}</h2>
      <p>${esc(l.summary)}</p>
      <ul class="periods">${periods}</ul>`);
    body.querySelectorAll('[data-cmd]').forEach((a) => a.addEventListener('click', (e) => { e.preventDefault(); SC.emit('commander:open', a.dataset.cmd); }));
    body.querySelectorAll('[data-goto]').forEach((a) => a.addEventListener('click', (e) => { e.preventDefault(); SC.emit('timeline:set', +a.dataset.goto); }));
    map.flyTo({ center: [l.lon, l.lat], zoom: Math.max(map.getZoom(), 9), duration: 1200 });
  }

  return { prepare, addMarkers, refresh, open };
})();
