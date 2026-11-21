// Data checks. Runs on every load and logs problems to the browser console.
// Add ?validate to the URL to also show the report on the page.
SC.validate = () => {
  const { toDay, distKm, fmtShort } = SC.util;
  const problems = [];
  const ids = new Set(SC.commanders.map((c) => c.id));
  const START = toDay('1778-12-01'), END = toDay('1782-12-31');

  for (const c of SC.commanders) if (!SC.movements[c.id]) problems.push(`Commander ${c.id} has no movements`);
  for (const [id, wps] of Object.entries(SC.movements)) {
    if (!ids.has(id)) problems.push(`Movements for unknown commander "${id}"`);
    let prev = -Infinity;
    for (const [date, place] of wps) {
      const d = toDay(date);
      if (Number.isNaN(d)) problems.push(`${id}: bad date ${date}`);
      if (d <= prev) problems.push(`${id}: ${date} is not after the previous waypoint`);
      if (d < START || d > END) problems.push(`${id}: ${date} outside campaign span`);
      prev = d;
      if (place === null) continue;
      const p = Array.isArray(place) ? place : SC.places[place];
      if (!p) { problems.push(`${id} @ ${date}: unknown place "${place}"`); continue; }
      if (p[0] < -86 || p[0] > -70 || p[1] < 30 || p[1] > 42.5) problems.push(`${id} @ ${date}: coordinates outside the eastern seaboard`);
    }
  }
  for (const b of SC.battles) {
    for (const id of [...b.allies, ...b.crown]) {
      if (!ids.has(id)) { problems.push(`Battle ${b.id}: unknown commander "${id}"`); continue; }
      if (b.kind === 'campaign' || b.kind === 'naval' || b.kind === 'evacuation') continue;
      // Each participant should be within ~10 km of the field on at least one day of the action
      let best = Infinity;
      for (let d = b.startDay; d <= b.endDay; d++) {
        const pos = SC.move.positionAt(id, d);
        if (pos) best = Math.min(best, distKm([pos.lon, pos.lat], [b.lon, b.lat]));
      }
      if (best > (b.radiusKm || 10)) problems.push(`Battle ${b.id} (${fmtShort(b.startDay)}): ${id} is ${best === Infinity ? 'not in the field' : `${best.toFixed(0)} km away`}`);
    }
  }

  if (problems.length) console.warn(`[validate] ${problems.length} data problem(s):\n` + problems.join('\n'));
  else console.info('[validate] All data checks passed.');

  if (new URLSearchParams(location.search).has('validate')) {
    const box = document.createElement('pre');
    box.style.cssText = 'position:absolute;z-index:50;top:80px;left:50%;transform:translateX(-50%);max-width:90vw;max-height:60vh;overflow:auto;background:#111;color:#bfb;padding:12px;border-radius:8px;font-size:12px';
    box.textContent = problems.length ? problems.join('\n') : 'All data checks passed.';
    box.onclick = () => box.remove();
    document.body.appendChild(box);
  }
  return problems;
};
