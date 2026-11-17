// Shared helpers. All dates are handled as integer "day numbers" (days since 1970-01-01, UTC)
window.SC = window.SC || {};

SC.util = (() => {
  const DAY = 86400000;
  const toDay = (iso) => Math.round(Date.parse(iso + 'T00:00:00Z') / DAY);
  const toISO = (day) => new Date(day * DAY).toISOString().slice(0, 10);
  const fmtLong = (day) => new Date(day * DAY).toLocaleDateString('en-GB', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC'
  });
  const fmtShort = (day) => new Date(day * DAY).toLocaleDateString('en-GB', {
    day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC'
  });
  const fmtRange = (a, b) => (a === b ? fmtShort(a) : `${fmtShort(a)} – ${fmtShort(b)}`);
  const lerp = (a, b, t) => a + (b - a) * t;
  const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  // Great-circle distance in km
  const distKm = ([lon1, lat1], [lon2, lat2]) => {
    const r = Math.PI / 180, dLat = (lat2 - lat1) * r, dLon = (lon2 - lon1) * r;
    const a = Math.sin(dLat / 2) ** 2 + Math.cos(lat1 * r) * Math.cos(lat2 * r) * Math.sin(dLon / 2) ** 2;
    return 12742 * Math.asin(Math.sqrt(a));
  };
  return { DAY, toDay, toISO, fmtLong, fmtShort, fmtRange, lerp, esc, distKm };
})();

// Tiny event bus shared by the modules
(() => {
  const handlers = {};
  SC.on = (evt, fn) => { (handlers[evt] = handlers[evt] || []).push(fn); };
  SC.emit = (evt, ...args) => { (handlers[evt] || []).forEach((fn) => fn(...args)); };
})();

// Padding that keeps fitted routes clear of the floating panels
SC.util.mapPadding = () => (window.innerWidth < 760
  ? { top: 140, bottom: 230, left: 30, right: 30 }
  : { top: 110, bottom: 230, left: 330, right: 380 });

// The right-hand info panel is shared by battles, commanders and landmarks
SC.panel = (() => {
  let onClose = null, kind = null;
  const el = () => document.getElementById('info-panel');
  function show(k, html, closeFn) {
    if (onClose && kind !== k) { const f = onClose; onClose = null; f(); }
    kind = k; onClose = closeFn || null;
    document.getElementById('info-content').innerHTML = html;
    el().hidden = false;
    el().scrollTop = 0;
    return document.getElementById('info-content');
  }
  function close() {
    el().hidden = true;
    const f = onClose; onClose = null; kind = null;
    if (f) f();
  }
  return { show, close, kind: () => kind };
})();
