// Timeline: date state, slider, day stepping, playback and the daily event log.
SC.timeline = (() => {
  const { toDay, toISO, fmtLong, fmtShort, esc } = SC.util;
  const START = toDay('1778-12-23');
  const END = toDay('1781-10-19');
  let state, playing = false, rafId = null, lastTs = 0, acc = 0, stopAt = null;
  const $ = (id) => document.getElementById(id);

  function build(s) {
    state = s;
    const slider = $('slider');
    slider.min = START; slider.max = END; slider.value = state.day;
    $('date-jump').min = toISO(START); $('date-jump').max = toISO(END);

    // Battle ticks and year labels
    const pct = (d) => ((d - START) / (END - START)) * 100;
    $('battle-ticks').innerHTML = SC.battles.map((b) =>
      `<span class="tick" data-id="${b.id}" style="left:${pct(b.startDay)}%" title="${esc(b.name)} — ${fmtShort(b.startDay)}"></span>`).join('');
    $('battle-ticks').addEventListener('click', (e) => {
      const t = e.target.closest('.tick'); if (!t) return;
      const b = SC.battles.find((x) => x.id === t.dataset.id);
      set(b.startDay); SC.battles_ui.select(b.id, true);
    });
    $('year-labels').innerHTML = [1779, 1780, 1781].map((y) => `<span style="left:${pct(toDay(`${y}-01-01`))}%">${y}</span>`).join('');

    slider.addEventListener('input', () => { pause(); set(+slider.value); });
    $('prev-day').onclick = () => { pause(); set(state.day - 1); };
    $('next-day').onclick = () => { pause(); set(state.day + 1); };
    $('play').onclick = () => (playing ? pause() : play());
    $('next-battle').onclick = () => jumpBattle(1);
    $('prev-battle').onclick = () => jumpBattle(-1);
    $('date-jump').addEventListener('change', (e) => { if (e.target.value) { pause(); set(toDay(e.target.value)); } });

    document.addEventListener('keydown', (e) => {
      if (e.target.matches('input[type="date"], select, textarea')) return;
      if (e.key === 'ArrowRight') { e.preventDefault(); e.shiftKey ? jumpBattle(1) : (pause(), set(state.day + 1)); }
      else if (e.key === 'ArrowLeft') { e.preventDefault(); e.shiftKey ? jumpBattle(-1) : (pause(), set(state.day - 1)); }
      else if (e.key === ' ') { e.preventDefault(); playing ? pause() : play(); }
      else if (e.key === 'Escape') SC.battles_ui.select(null);
    });

    SC.on('timeline:set', (d) => { pause(); set(d); });
    SC.on('timeline:playRange', (from, to) => { set(from); play(to); });
  }

  function jumpBattle(dir) {
    pause();
    const b = dir > 0 ? SC.battles_ui.nextAfter(state.day) : SC.battles_ui.prevBefore(state.day);
    if (!b) return;
    set(b.startDay);
    SC.battles_ui.select(b.id, true);
  }

  function set(day) {
    state.day = Math.max(START, Math.min(END, Math.round(day)));
    $('slider').value = state.day;
    $('date-jump').value = toISO(state.day);
    $('date-label').textContent = fmtLong(state.day);
    SC.emit('state:change');
  }

  function play(until) {
    stopAt = until ?? null;
    if (state.day >= END) set(START);
    playing = true; $('play').textContent = '❚❚'; lastTs = 0; acc = 0;
    rafId = requestAnimationFrame(tick);
  }
  function pause() {
    playing = false; stopAt = null; $('play').textContent = '▶';
    if (rafId) cancelAnimationFrame(rafId); rafId = null;
  }
  function tick(ts) {
    if (!playing) return;
    if (lastTs) acc += ((ts - lastTs) / 1000) * +$('speed').value;
    lastTs = ts;
    if (acc >= 1) {
      const steps = Math.floor(acc); acc -= steps;
      const limit = stopAt ?? END;
      set(Math.min(state.day + steps, limit));
      if (state.day >= limit) { pause(); return; }
    }
    rafId = requestAnimationFrame(tick);
  }

  // Subtitle + event log for the current day
  function refresh(day) {
    const active = SC.battles_ui.activeOn(day);
    const shownIds = new Set(state.isolated ? [state.isolated] : state.visible);
    const inField = SC.commanders.filter((c) => shownIds.has(c.id) && SC.move.isActive(c.id, day)).length;
    $('date-sub').textContent = [
      active.length ? `⚔ ${active.map((b) => b.name).join(' · ')}` : null,
      `${inField} commander${inField === 1 ? '' : 's'} in the field`,
    ].filter(Boolean).join('  —  ');

    const items = [];
    for (const b of SC.battles) {
      if (b.startDay === day) items.push(`<li><span class="who">⚔ ${esc(b.name)}</span> begins. <a href="#" data-b="${b.id}">Details</a></li>`);
      else if (b.endDay === day && b.endDay !== b.startDay) items.push(`<li><span class="who">⚔ ${esc(b.name)}</span> ends.</li>`);
    }
    for (const { id, w } of SC.move.eventsOn(day)) {
      if (!shownIds.has(id)) continue;
      const c = SC.commanders.find((x) => x.id === id);
      items.push(`<li><span class="who" style="color:${c.color}">${esc(c.name)}</span> — ${esc(w.name)}: ${esc(w.note)} <span class="cert">${w.cert === 'd' ? 'documented' : 'approximate'}</span></li>`);
    }
    $('event-count').textContent = items.length ? `(${items.length})` : '';
    $('event-list').innerHTML = items.join('') || '<li style="list-style:none;color:var(--ink-soft)">No recorded events for the commanders shown. Positions between known dates are estimated.</li>';
    $('event-list').querySelectorAll('[data-b]').forEach((a) => a.addEventListener('click', (e) => { e.preventDefault(); SC.battles_ui.select(a.dataset.b, true); }));
  }

  return { build, set, refresh, START, END, pause };
})();
