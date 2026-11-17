// Pop-up notifications that slide in during playback when a battle starts or a documented event happens.
SC.toasts = (() => {
  const { esc, fmtShort } = SC.util;
  const MAX = 4;
  const el = () => document.getElementById('toasts');

  function show({ html, kind = 'event', ms = 4500, onClick }) {
    const box = el();
    while (box.children.length >= MAX) box.firstElementChild.remove();
    const t = document.createElement('div');
    t.className = `toast ${kind}`;
    t.innerHTML = html;
    if (onClick) { t.classList.add('clickable'); t.addEventListener('click', () => { onClick(); dismiss(t); }); }
    box.appendChild(t);
    requestAnimationFrame(() => t.classList.add('in'));
    setTimeout(() => dismiss(t), ms);
  }
  function dismiss(t) {
    if (!t.isConnected) return;
    t.classList.remove('in'); t.classList.add('out');
    setTimeout(() => t.remove(), 350);
  }
  const clear = () => { el().innerHTML = ''; };

  const portrait = (c) => (c.portrait
    ? `<img src="${c.portrait}" alt="" style="border-color:${c.color}">`
    : `<span class="initials" style="background:${c.color}">${esc(c.initials)}</span>`);

  // Called by the timeline for each new day reached while playing
  function forDay(day, state, speed) {
    for (const b of SC.battles) {
      if (b.startDay !== day) continue;
      const outcome = { allied: 'American / Allied victory', crown: 'British / Loyalist victory', draw: 'Indecisive' }[b.outcome];
      show({
        kind: `battle ${b.outcome}`, ms: speed > 10 ? 3500 : 6500,
        html: `<div class="t-kicker">⚔ ${esc(b.kind)} · ${fmtShort(b.startDay)}</div>
               <div class="t-title">${esc(b.name)}</div>
               <div class="t-body">${esc(outcome)} · tap for details</div>`,
        onClick: () => SC.battles_ui.select(b.id, true),
      });
    }
    if (speed > 10) return; // too fast for individual movements; battles only
    const shown = new Set(state.isolated ? [state.isolated] : state.visible);
    let n = 0;
    for (const { id, w } of SC.move.eventsOn(day)) {
      if (!shown.has(id) || w.cert !== 'd' || n >= 2) continue;
      if (SC.battles.some((b) => b.startDay === day && b.participants.includes(id))) continue; // covered by battle toast
      const c = SC.commanders.find((x) => x.id === id);
      n++;
      show({
        kind: 'event', ms: 4000,
        html: `<div class="t-row">${portrait(c)}<div><div class="t-title small">${esc(c.short)} · ${esc(w.name)}</div><div class="t-body">${esc(w.note)}</div></div></div>`,
        onClick: () => SC.emit('commander:open', id),
      });
    }
  }

  return { show, clear, forDay };
})();
