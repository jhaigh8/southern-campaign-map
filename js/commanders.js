// Commander sidebar: show/hide, isolate a single commander, follow with the camera.
SC.cmdPanel = (() => {
  const { esc, fmtShort } = SC.util;
  const SIDES = [['american', 'Continental & Patriot'], ['french', 'French'], ['british', 'British'], ['loyalist', 'Loyalist']];
  let state, listEl;

  function build(s) {
    state = s;
    listEl = document.getElementById('commander-list');
    let html = '';
    for (const [side, label] of SIDES) {
      const cs = SC.commanders.filter((c) => c.side === side);
      if (!cs.length) continue;
      html += `<div class="side-group" data-side="${side}"><h3>${label}</h3>`;
      for (const c of cs) {
        const sp = SC.move.span(c.id);
        const range = sp ? `${fmtShort(sp[0])} – ${fmtShort(sp[1])}` : '';
        html += `<div class="cmd" data-id="${c.id}">
          <input type="checkbox" aria-label="Show ${esc(c.name)}" ${state.visible.has(c.id) ? 'checked' : ''}>
          <span class="swatch" style="background:${c.color}"></span>
          <span class="cmd-name" title="${esc(c.unit)}">${esc(c.name)}<small>${esc(range)}</small></span>
          <span class="cmd-actions">
            <button data-act="isolate" title="Show only this commander and their whole route">Isolate</button>
            <button data-act="follow" title="Keep the camera on this commander">Follow</button>
          </span></div>`;
      }
      html += '</div>';
    }
    listEl.innerHTML = html;

    listEl.addEventListener('change', (e) => {
      const row = e.target.closest('.cmd');
      if (!row) return;
      e.target.checked ? state.visible.add(row.dataset.id) : state.visible.delete(row.dataset.id);
      SC.emit('state:change');
    });
    listEl.addEventListener('click', (e) => {
      const row = e.target.closest('.cmd');
      if (!row) return;
      const id = row.dataset.id;
      const act = e.target.dataset.act;
      if (act === 'isolate') SC.emit('commander:isolate', state.isolated === id ? null : id);
      else if (act === 'follow') { state.followId = state.followId === id ? null : id; SC.emit('state:change'); if (state.followId) SC.emit('camera:follow'); }
      else if (e.target.closest('.cmd-name')) SC.emit('commander:focus', id);
    });
    document.getElementById('show-all').onclick = () => { SC.commanders.forEach((c) => state.visible.add(c.id)); syncChecks(); SC.emit('state:change'); };
    document.getElementById('show-none').onclick = () => { state.visible.clear(); syncChecks(); SC.emit('state:change'); };
    document.getElementById('clear-isolate').onclick = () => SC.emit('commander:isolate', null);
    document.getElementById('only-active').addEventListener('change', () => refresh(state.day));
  }

  function syncChecks() {
    listEl.querySelectorAll('.cmd').forEach((row) => { row.querySelector('input').checked = state.visible.has(row.dataset.id); });
  }

  function refresh(day) {
    const onlyActive = document.getElementById('only-active').checked;
    listEl.querySelectorAll('.cmd').forEach((row) => {
      const id = row.dataset.id;
      const active = SC.move.isActive(id, day);
      row.classList.toggle('inactive', !active);
      row.classList.toggle('isolated', state.isolated === id);
      row.hidden = onlyActive && !active && state.isolated !== id;
      row.querySelector('[data-act="isolate"]').classList.toggle('on', state.isolated === id);
      row.querySelector('[data-act="follow"]').classList.toggle('on', state.followId === id);
    });
    listEl.querySelectorAll('.side-group').forEach((g) => { g.hidden = ![...g.querySelectorAll('.cmd')].some((r) => !r.hidden); });
    const banner = document.getElementById('isolate-banner');
    banner.hidden = !state.isolated;
    if (state.isolated) document.getElementById('isolate-name').textContent = SC.commanders.find((c) => c.id === state.isolated).name;
  }

  return { build, refresh, syncChecks };
})();
