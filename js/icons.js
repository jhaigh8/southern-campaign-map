// Line-drawn map symbols in the spirit of 18th-century engraved maps (instead of emoji, which render
// differently on every system and look modern). All use currentColor, so CSS sets their colour.
SC.icons = (() => {
  const svg = (body, sw = 1.7) =>
    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${body}</svg>`;
  const I = {
    // Crossed sabres
    battle: svg('<path d="M6.5 17.5 19 5M17.5 17.5 5 5"/><path d="M4 15l5 5M15 20l5-5"/><path d="M6.5 17.5 4.5 19.5M17.5 17.5l2 2"/>'),
    // Bastioned fort trace, as on period siege plans
    siege: svg('<path d="M3.5 3.5 9 6h6l5.5-2.5L18 9v6l2.5 5.5L15 18H9l-5.5 2.5L6 15V9Z"/><path d="M10 10h4v4h-4z"/>'),
    // Torch flame
    raid: svg('<path d="M12 3c1.8 3.6 5.5 5.6 4 11-1 3.8-7 3.8-8 .2-.8-2.8.8-4.6 2-6.2.2 2.4 1.3 3.4 2 3.6.8-2.8.4-5.6 0-8.6Z"/><path d="M12 21v-2"/>'),
    // Line of march
    campaign: svg('<path d="M4 18c3-6.5 8-9.5 15-10"/><path d="M15 4.5 19 8l-3.8 3.8"/>'),
    // Anchor
    naval: svg('<circle cx="12" cy="4.5" r="1.7"/><path d="M12 6.2V20M8 9h8M5 13.5c0 4 3.5 6.5 7 6.5s7-2.5 7-6.5"/>'),
    // Two forces facing each other across a line
    standoff: svg('<path d="M3 12h6M6.5 9 9.5 12 6.5 15M21 12h-6M17.5 9 14.5 12l3 3"/><path d="M12 5v14" stroke-dasharray="2 2"/>'),
    // Ship under sail: a British evacuation by sea
    evacuation: svg('<path d="M3 16.5h18l-2.6 3.5H5.6Z"/><path d="M12 3v13.5"/><path d="M12 4.5 18.5 14H12"/><path d="M12 7 7 14h5"/>'),
    // Canvas tent
    camp: svg('<path d="M3 19.5 12 5l9 14.5"/><path d="M12 19.5V13l-3 6.5M12 5V3"/><path d="M2 19.5h20"/>'),
    // Stockade fort with flag
    post: svg('<path d="M4 20V11l2-1.5L8 11v-1l2-1.5L12 10l2-1.5L16 10v1l2-1.5L20 11v9Z"/><path d="M12 8.5V3l4 1.5L12 6"/>'),
    // Meetinghouse with steeple
    city: svg('<path d="M3.5 20v-7L8 9.5l4.5 3.5v7Z"/><path d="M12.5 20v-9h5v9M12.5 11l2.5-7 2.5 7"/><path d="M7 20v-3.5h2V20M2.5 20h17.5"/>'),
    // Swallow-tailed colour on a staff
    muster: svg('<path d="M6 21V3"/><path d="M6 4h12l-3 3.5 3 3.5H6"/>'),
    // "Visit today" kinds
    // Classical portico
    museum: svg('<path d="M3 9.5 12 4l9 5.5Z"/><path d="M5 10v8M9.5 10v8M14.5 10v8M19 10v8"/><path d="M3 20h18"/>'),
    // Gabled house
    historic: svg('<path d="M4 20v-9l8-6 8 6v9Z"/><path d="M10 20v-5h4v5"/>'),
    // Pine and flag: a park
    park: svg('<path d="M8 21v-4M8 4l-4.5 8h3L4 17h8l-2.5-5h3Z"/><path d="M17 21V6l4 1.5L17 9"/>'),
    // Obelisk
    grave: svg('<path d="M10 20 11 6l1-2 1 2 1 14Z"/><path d="M7.5 20h9"/>'),
    // Footpath
    trail: svg('<path d="M5 20c2-4 7-3 7-8s5-5 7-8"/><circle cx="5" cy="20" r=".6"/><circle cx="19" cy="4" r=".6"/>'),
    // Roadside marker on a post
    marker: svg('<path d="M5 4h14v9H5Z"/><path d="M12 13v8M8 21h8"/>'),
  };
  return { ...I, get: (k, fallback = 'battle') => I[k] || I[fallback] };
})();
