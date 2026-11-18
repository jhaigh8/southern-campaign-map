// Play-mode notifications.
//   Battle card : one compact card at the top-left; a new battle replaces it.
//   Dispatches  : a running log docked above the timeline. Every battle and commander movement
//                 reached during playback is added, newest on top; older lines fade. It stays put
//                 while paused, so it can be read at leisure, and scrolls when hovered.
SC.toasts = (() => {
  const { esc, fmtShort } = SC.util;
  const KEEP = 60; // lines kept in the log
  const $ = (id) => document.getElementById(id);
  let cardTimer = null, lastDay = null;
  // The log keeps recording when switched off, so turning it back on shows the history
  const syncVisible = () => {
    $('dispatches').hidden = !$('dispatch-toggle-on').checked || !$('dispatch-list').children.length;
  };

  // ---- Battle card (single slot) ----
  function showCard(html, ms, onClick) {
    const box = $('battle-card');
    clearTimeout(cardTimer);
    box.innerHTML = html;
    box.onclick = () => { onClick(); hideCard(); };
    box.hidden = false;
    requestAnimationFrame(() => box.classList.add('in'));
    cardTimer = setTimeout(hideCard, ms);
    box.onmouseenter = () => clearTimeout(cardTimer);
    box.onmouseleave = () => { cardTimer = setTimeout(hideCard, 2500); };
  }
  function hideCard() {
    const box = $('battle-card');
    box.classList.remove('in');
    setTimeout(() => { if (!box.classList.contains('in')) box.hidden = true; }, 300);
  }

  // ---- Dispatch log ----
  function addLine({ day, html, cls = '', onClick }) {
    const list = $('dispatch-list');
    const li = document.createElement('li');
    li.className = `${cls} new`;
    li.dataset.day = day;
    li.innerHTML = `<span class="d-date">${fmtShort(day).replace(/ \d{4}$/, '')}</span>${html}`;
    li.title = fmtShort(day);
    if (onClick) li.addEventListener('click', onClick);
    list.prepend(li);
    setTimeout(() => li.classList.remove('new'), 900);
    while (list.children.length > KEEP) list.lastElementChild.remove();
    syncVisible();
    $('dispatch-count').textContent = list.children.length;
    list.scrollTop = 0;
  }
  function clear() {
    $('dispatch-list').innerHTML = '';
    $('dispatch-count').textContent = '0';
    syncVisible();
    hideCard();
    lastDay = null;
  }

  const face = (c) => (c.portrait
    ? `<img class="d-face" src="${c.portrait}" alt="" style="border-color:${c.color}">`
    : `<span class="d-face initials" style="background:${c.color};border-color:${c.color}">${esc(c.initials)}</span>`);

  // How long the battle card stays up (ms); longer at slow speeds
  const holdMs = (speed) => (speed <= 1 ? 9000 : speed <= 4 ? 7000 : speed <= 10 ? 5000 : 3500);

  // Called by the timeline for each new day reached while playing
  function forDay(day, state, speed) {
    // Jumping back in time starts a fresh log, so it always reads in order
    if (lastDay !== null && day < lastDay) clear();
    lastDay = day;

    const shown = new Set(state.isolated ? [state.isolated] : state.visible);
    const evs = SC.move.eventsOn(day).filter(({ id }) => shown.has(id));

    for (const { id, w } of evs) {
      const c = SC.commanders.find((x) => x.id === id);
      addLine({
        day, cls: w.cert === 'd' ? '' : 'approx',
        html: `${face(c)}<span class="d-text"><b>${esc(c.short)}</b> ${esc(w.note)}</span>`,
        onClick: () => SC.emit('commander:open', id),
      });
    }
    // Battles go last so they sit above that day's movements
    for (const b of SC.battles) {
      if (b.startDay !== day) continue;
      const label = SC.battles_ui.outcomeLabel(b);
      addLine({
        day, cls: `battle ${b.outcome}`,
        html: `<span class="d-ico">${SC.icons.get(b.kind)}</span><span class="d-text"><b>${esc(b.name)}</b> · ${esc(label)}</span>`,
        onClick: () => SC.battles_ui.select(b.id, true),
      });
      const card = $('battle-card');
      card.className = `battle-card ${b.outcome}${card.classList.contains('in') ? ' in' : ''}`;
      showCard(`
        <div class="t-kicker"><span class="t-ico">${SC.icons.get(b.kind)}</span>${esc(b.kind)} · ${fmtShort(b.startDay)}</div>
        <div class="t-title">${esc(b.name)}</div>
        ${b.location ? `<div class="t-loc">${esc(b.location)}</div>` : ''}
        <div class="t-body">${esc(label)} · click for details</div>`,
      holdMs(speed), () => SC.battles_ui.select(b.id, true));
    }
  }

  function init() {
    const box = $('dispatches');
    let collapsed = false;
    try { collapsed = localStorage.getItem('sc.dispatchesCollapsed') === '1'; } catch (e) { /* storage blocked */ }
    box.classList.toggle('collapsed', collapsed);
    $('dispatch-toggle').onclick = () => {
      collapsed = box.classList.toggle('collapsed');
      try { localStorage.setItem('sc.dispatchesCollapsed', collapsed ? '1' : '0'); } catch (e) { /* ignore */ }
    };
    $('dispatch-clear').onclick = clear;
    const on = $('dispatch-toggle-on');
    try { on.checked = localStorage.getItem('sc.dispatchesOff') !== '1'; } catch (e) { /* storage blocked */ }
    on.addEventListener('change', () => {
      try { localStorage.setItem('sc.dispatchesOff', on.checked ? '0' : '1'); } catch (e) { /* ignore */ }
      syncVisible();
    });
    // Keep the log just above the timeline, whose height changes when "Events on this day" opens
    const tl = $('timeline');
    const sync = () => document.documentElement.style.setProperty('--tl-h', `${tl.offsetHeight}px`);
    new ResizeObserver(sync).observe(tl); sync();
  }

  return { forDay, clear, init, show: showCard };
})();
