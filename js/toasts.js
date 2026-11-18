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
    // Hovering a card holds it on screen; it leaves 2 s after the pointer moves away
    let timer = setTimeout(() => dismiss(t), ms);
    t.addEventListener('mouseenter', () => clearTimeout(timer));
    t.addEventListener('mouseleave', () => { timer = setTimeout(() => dismiss(t), 2000); });
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
  // How long a card stays up, in ms: longer at slow speeds so there is time to read it
  const holdMs = (speed, base) => base * (speed <= 1 ? 1.4 : speed <= 4 ? 1.15 : speed <= 10 ? 0.85 : 0.6);

  function forDay(day, state, speed) {
    for (const b of SC.battles) {
      if (b.startDay !== day) continue;
      show({
        kind: `battle ${b.outcome}`, ms: holdMs(speed, 9000),
        html: `<div class="t-kicker"><span class="t-ico">${SC.icons.get(b.kind)}</span>${esc(b.kind)} · ${fmtShort(b.startDay)}</div>
               <div class="t-title">${esc(b.name)}</div>
               ${b.location ? `<div class="t-loc">${esc(b.location)}</div>` : ''}
               <div class="t-body">${esc(SC.battles_ui.outcomeLabel(b))} · tap for details</div>`,
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
        kind: 'event', ms: holdMs(speed, 7000),
        html: `<div class="t-row">${portrait(c)}<div><div class="t-kicker">${fmtShort(day)}</div><div class="t-title small">${esc(c.short)} · ${esc(w.name)}</div><div class="t-body">${esc(w.note)}</div></div></div>`,
        onClick: () => SC.emit('commander:open', id),
      });
    }
  }

  return { show, clear, forDay };
})();
