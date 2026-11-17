// Commander sidebar (show/hide + click for a profile card) and the profile card itself.
SC.cmdPanel = (() => {
  const { esc, fmtShort, fmtRange } = SC.util;
  const ORDER = ['continental', 'militia', 'french', 'british', 'loyalist'];
  let state, listEl;

  const face = (c, cls = '') => (c.portrait
    ? `<img class="${cls}" src="${c.portrait}" alt="" style="border-color:${c.color}">`
    : `<span class="${cls} initials" style="background:${c.color};border-color:${c.color}">${esc(c.initials)}</span>`);

  function build(s) {
    state = s;
    listEl = document.getElementById('commander-list');
    let html = '';
    for (const force of ORDER) {
      const cs = SC.commanders.filter((c) => c.force === force);
      if (!cs.length) continue;
      const f = SC.FORCES[force];
      html += `<div class="side-group" data-force="${force}"><h3><span class="swatch" style="background:${f.color}"></span>${esc(f.label)}</h3>`;
      for (const c of cs) {
        const sp = SC.move.span(c.id);
        html += `<div class="cmd" data-id="${c.id}">
          <input type="checkbox" aria-label="Show ${esc(c.name)} on the map" ${state.visible.has(c.id) ? 'checked' : ''}>
          <button class="cmd-open" title="Profile, route and battles">
            ${face(c, 'thumb')}
            <span class="cmd-name">${esc(c.name)}<small>${sp ? `${fmtShort(sp[0])} – ${fmtShort(sp[1])}` : ''}</small></span>
          </button></div>`;
      }
      html += '</div>';
    }
    listEl.innerHTML = html;

    document.getElementById('legend').innerHTML = `<div class="legend-title">Map colours</div>` +
      ORDER.map((k) => `<span class="legend-item"><span class="swatch" style="background:${SC.FORCES[k].color}"></span>${esc(SC.FORCES[k].label)}</span>`).join('') +
      `<div class="legend-note">Dark = regulars, light = militia &amp; provincials. A dashed ring means the position that day is estimated.</div>`;

    listEl.addEventListener('change', (e) => {
      const row = e.target.closest('.cmd'); if (!row) return;
      e.target.checked ? state.visible.add(row.dataset.id) : state.visible.delete(row.dataset.id);
      SC.emit('state:change');
    });
    listEl.addEventListener('click', (e) => {
      const btn = e.target.closest('.cmd-open'); if (!btn) return;
      open(btn.closest('.cmd').dataset.id);
    });
    document.getElementById('show-all').onclick = () => { SC.commanders.forEach((c) => state.visible.add(c.id)); syncChecks(); SC.emit('state:change'); };
    document.getElementById('show-none').onclick = () => { state.visible.clear(); syncChecks(); SC.emit('state:change'); };
    document.getElementById('clear-isolate').onclick = () => SC.emit('commander:isolate', null);
    document.getElementById('only-active').addEventListener('change', () => refresh(state.day));
    SC.on('commander:open', open);
  }

  function syncChecks() {
    listEl.querySelectorAll('.cmd').forEach((row) => { row.querySelector('input').checked = state.visible.has(row.dataset.id); });
  }

  function statusLine(c) {
    const pos = SC.move.positionAt(c.id, state.day);
    if (!pos) {
      const sp = SC.move.span(c.id);
      return sp && state.day < sp[0] ? `Not yet in the field (enters ${fmtShort(sp[0])}).` : 'Not in the field on this date.';
    }
    const where = pos.est ? `on the move ${pos.from ? `from ${esc(pos.from.name)} toward ${esc(pos.to.name)}` : `near ${esc(pos.name)}`}` : `at ${esc(pos.name)}`;
    return `${fmtShort(state.day)}: ${where}${pos.troops ? `, about ${pos.troops.toLocaleString()} ${c.id === 'degrasse' ? 'ships' : 'men'}` : ''}${pos.note ? `. ${esc(pos.note)}` : '.'}
      <span class="cert">${pos.est ? 'estimated' : pos.cert === 'd' ? 'documented' : 'approximate'}</span>`;
  }

  function open(id) {
    const c = SC.commanders.find((x) => x.id === id);
    if (!c) return;
    state.openCommander = id;
    const battles = SC.battles.filter((b) => b.participants.includes(id));
    const sp = SC.move.span(id);
    const body = SC.panel.show('commander', `
      <div class="profile">
        ${face(c, 'portrait')}
        <div>
          <div class="kicker" style="color:${c.color}">${esc(SC.FORCES[c.force].label)}</div>
          <h2>${esc(c.name)}</h2>
          <div class="meta">${esc(c.rank)} · ${esc(c.unit)}</div>
        </div>
      </div>
      <p>${esc(c.bio)}</p>
      <div class="status">${statusLine(c)}</div>
      <div class="info-actions">
        <button class="btn ${state.isolated === id ? 'primary' : ''}" data-act="isolate">${state.isolated === id ? 'Show everyone' : 'Isolate route'}</button>
        <button class="btn ${state.followId === id ? 'primary' : ''}" data-act="follow">${state.followId === id ? 'Stop following' : 'Follow'}</button>
        <button class="btn" data-act="fly">Fly to</button>
      </div>
      ${battles.length ? `<h4 class="sub">Battles (${battles.length})</h4><ul class="battle-list">${battles.map((b) =>
        `<li><a href="#" data-b="${b.id}">${esc(b.name)}</a> <small>${fmtShort(b.startDay)}</small></li>`).join('')}</ul>` : ''}
      ${sp ? `<div class="src">On the map ${fmtRange(sp[0], sp[1])}.</div>` : ''}
      ${c.portrait ? '<div class="src">Portrait: public domain / free licence, via Wikimedia Commons.</div>' : '<div class="src">No free portrait of this commander is known.</div>'}`,
      () => { state.openCommander = null; SC.emit('state:change'); });

    body.querySelector('[data-act="isolate"]').onclick = () => { SC.emit('commander:isolate', state.isolated === id ? null : id); open(id); };
    body.querySelector('[data-act="follow"]').onclick = () => {
      state.followId = state.followId === id ? null : id;
      if (state.followId) SC.emit('camera:follow', true);
      SC.emit('state:change'); open(id);
    };
    body.querySelector('[data-act="fly"]').onclick = () => SC.emit('commander:focus', id);
    body.querySelectorAll('[data-b]').forEach((a) => a.addEventListener('click', (e) => {
      e.preventDefault();
      const b = SC.battles.find((x) => x.id === a.dataset.b);
      SC.emit('timeline:set', b.startDay);
      SC.battles_ui.select(b.id, true);
    }));
    SC.emit('state:change');
  }

  // Keep the open card's status line current as the date changes
  function refreshCard() {
    if (SC.panel.kind() !== 'commander' || !state.openCommander) return;
    const el = document.querySelector('#info-content .status');
    if (el) el.innerHTML = statusLine(SC.commanders.find((x) => x.id === state.openCommander));
  }

  function refresh(day) {
    const onlyActive = document.getElementById('only-active').checked;
    listEl.querySelectorAll('.cmd').forEach((row) => {
      const id = row.dataset.id;
      const active = SC.move.isActive(id, day);
      row.classList.toggle('inactive', !active);
      row.classList.toggle('isolated', state.isolated === id);
      row.classList.toggle('open', state.openCommander === id);
      row.hidden = onlyActive && !active && state.isolated !== id;
    });
    listEl.querySelectorAll('.side-group').forEach((g) => { g.hidden = ![...g.querySelectorAll('.cmd')].some((r) => !r.hidden); });
    const banner = document.getElementById('isolate-banner');
    banner.hidden = !state.isolated;
    if (state.isolated) document.getElementById('isolate-name').textContent = SC.commanders.find((c) => c.id === state.isolated).name;
    refreshCard();
  }

  return { build, refresh, syncChecks, open };
})();
