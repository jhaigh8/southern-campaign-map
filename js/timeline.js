// Timeline: date state, slider, day stepping, smooth playback, notifications and the daily event log.
//   state.day : the current whole day (drives panels, battles, the event log)
//   state.t   : continuous time in days (drives marker positions, so movement is smooth)
SC.timeline = (() => {
  const { toDay, toISO, fmtLong, fmtShort, esc } = SC.util;
  const START = toDay('1778-12-23');
  const END = toDay('1781-10-19');
  const TWEEN_MS = 450;
  let state, playing = false, rafId = null, lastTs = 0, stopAt = null, tween = null;
  const $ = (id) => document.getElementById(id);

  function build(s) {
    state = s;
    state.t = state.day;
    const slider = $('slider');
    slider.min = START; slider.max = END; slider.value = state.day;
    $('date-jump').min = toISO(START); $('date-jump').max = toISO(END);

    // Battle ticks and year labels
    const pct = (d) => ((d - START) / (END - START)) * 100;
    $('battle-ticks').innerHTML = SC.battles.map((b) =>
      `<span class="tick${b.kind === 'standoff' ? ' minor' : ''}" data-id="${b.id}" style="left:${pct(b.startDay)}%"></span>`).join('') +
      '<div id="tick-tip" hidden></div>';
    // Hover label for the battle ticks (native tooltips are slow and easy to miss on 3-px targets)
    const tip = $('tick-tip');
    $('battle-ticks').addEventListener('mouseover', (e) => {
      const t = e.target.closest('.tick'); if (!t) return;
      const b = SC.battles.find((x) => x.id === t.dataset.id);
      tip.innerHTML = `<strong>${esc(b.name)}</strong><span>${fmtShort(b.startDay)}</span>`;
      tip.style.left = t.style.left; tip.hidden = false; tip.classList.remove('edge-l', 'edge-r');
      const r = tip.getBoundingClientRect(), box = $('timeline').getBoundingClientRect();
      tip.classList.toggle('edge-l', r.left < box.left + 4);
      tip.classList.toggle('edge-r', r.right > box.right - 4);
    });
    $('battle-ticks').addEventListener('mouseout', (e) => { if (e.target.closest('.tick')) tip.hidden = true; });
    $('battle-ticks').addEventListener('click', (e) => {
      const t = e.target.closest('.tick'); if (!t) return;
      const b = SC.battles.find((x) => x.id === t.dataset.id);
      pause(); set(b.startDay); SC.battles_ui.select(b.id, true);
    });
    $('year-labels').innerHTML = [1779, 1780, 1781].map((y) => `<span style="left:${pct(toDay(`${y}-01-01`))}%">${y}</span>`).join('');

    slider.addEventListener('input', () => { pause(); set(+slider.value, { instant: true }); });
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
      else if (e.key === 'Escape') SC.panel.close();
    });

    SC.on('timeline:set', (d) => { pause(); set(d); });
    SC.on('timeline:playRange', (from, to) => { set(from, { instant: true }); play(to); });
  }

  function jumpBattle(dir) {
    pause();
    const b = dir > 0 ? SC.battles_ui.nextAfter(state.day) : SC.battles_ui.prevBefore(state.day);
    if (!b) return;
    set(b.startDay);
    SC.battles_ui.select(b.id, true);
  }

  function setDay(day) {
    state.day = Math.max(START, Math.min(END, Math.round(day)));
    $('slider').value = state.day;
    $('date-jump').value = toISO(state.day);
    $('date-label').textContent = fmtLong(state.day);
  }

  // Jump to a day. Markers glide there (eased) unless the jump is huge or `instant` is set.
  function set(day, { instant = false } = {}) {
    const from = state.t;
    setDay(day);
    const to = state.day;
    cancelAnimationFrame(tween);
    if (instant || Math.abs(to - from) > 120) { state.t = to; SC.emit('state:change'); return; }
    SC.emit('state:change');
    const t0 = performance.now();
    const step = (now) => {
      const k = Math.min(1, (now - t0) / TWEEN_MS);
      const e = 1 - Math.pow(1 - k, 3); // ease-out cubic
      state.t = from + (to - from) * e;
      SC.emit('frame');
      if (k < 1) tween = requestAnimationFrame(step);
    };
    tween = requestAnimationFrame(step);
  }

  // Camera saved when "Pause at battles" stops playback and zooms in; pressing play again
  // closes the battle card and flies back out to it.
  let preBattleView = null;
  function returnFromBattle() {
    if (!preBattleView) return;
    if (SC.panel.kind() === 'battle') SC.panel.close();
    SC.map.easeTo({ ...preBattleView, duration: 1400, essential: true });
    preBattleView = null;
  }

  function play(until) {
    if (until == null) returnFromBattle(); else preBattleView = null; // "Play this battle" keeps its own view
    stopAt = until ?? null;
    cancelAnimationFrame(tween);
    if (state.day >= END) set(START, { instant: true });
    state.t = state.day;
    playing = true; $('play').textContent = '❚❚'; lastTs = 0;
    rafId = requestAnimationFrame(tick);
  }
  function pause() {
    if (!playing) return;
    playing = false; stopAt = null; $('play').textContent = '▶';
    if (rafId) cancelAnimationFrame(rafId); rafId = null;
    state.t = state.day; SC.emit('frame');
  }

  // Continuous playback: t advances every frame; each new whole day refreshes panels and fires pop-ups
  function tick(ts) {
    if (!playing) return;
    const speed = +$('speed').value;
    if (lastTs) state.t += Math.min(0.1, (ts - lastTs) / 1000) * speed;
    lastTs = ts;
    const limit = stopAt ?? END;
    if (state.t >= limit) state.t = limit;
    const newDay = Math.floor(state.t);
    if (newDay > state.day) {
      for (let d = state.day + 1; d <= newDay; d++) {
        SC.toasts.forDay(d, state, speed);
        if ($('pause-battles').checked && SC.battles.some((b) => b.startDay === d)) {
          setDay(d); state.t = d; SC.emit('state:change'); pause();
          const m = SC.map;
          preBattleView = { center: m.getCenter(), zoom: m.getZoom(), pitch: m.getPitch(), bearing: m.getBearing() };
          const b = SC.battles.find((x) => x.startDay === d);
          SC.battles_ui.select(b.id, true);
          return;
        }
      }
      setDay(newDay);
      SC.emit('state:change');
    } else {
      SC.emit('frame');
    }
    if (state.t >= limit) { pause(); return; }
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
      items.push(`<li><a href="#" class="who" data-c="${id}" style="color:${c.color}">${esc(c.name)}</a> — ${esc(w.name)}: ${esc(w.note)} <span class="cert">${w.cert === 'd' ? 'documented' : 'approximate'}</span></li>`);
    }
    $('event-count').textContent = items.length ? `(${items.length})` : '';
    $('event-list').innerHTML = items.join('') || '<li style="list-style:none;color:var(--ink-soft)">No recorded events for the commanders shown. Positions between known dates are estimated.</li>';
    $('event-list').querySelectorAll('[data-b]').forEach((a) => a.addEventListener('click', (e) => { e.preventDefault(); SC.battles_ui.select(a.dataset.b, true); }));
    $('event-list').querySelectorAll('[data-c]').forEach((a) => a.addEventListener('click', (e) => { e.preventDefault(); SC.emit('commander:open', a.dataset.c); }));
  }

  return { build, set, refresh, START, END, pause, isPlaying: () => playing };
})();
