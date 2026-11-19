// Tactical reconstruction (approximate): Capture of Savannah, 29 December 1778. Format: see cowpens.js.
// Placement: origin is the battle's map location south-east of the old town (data/places.js), known only
// approximately. Howe's line faced east-south-east across the road from Girardeau's landing, between
// swamps. Positions follow the accounts and are schematic.
// Sources: Campbell's journal; Howe's court-martial (1781); Charles C. Jones, History of Georgia (1883).
window.SC = window.SC || {};
SC.tactical = SC.tactical || {};

SC.tactical.savannah1778 = {
  battle: 'savannah1778', title: 'Capture of Savannah', date: '29 December 1778', level: 'approximate',
  origin: [-81.08, 32.06], facing: 110,
  camera: { at: [80, 150], zoom: 14.7, pitch: 52, bearing: 105, elev: 10 },
  sources: "After Campbell's journal and Howe's court-martial. Site approximate; positions schematic.",
  people: {
    Campbell: { id: 'campbell' },
    Howe: { force: 'continental', full: 'Maj. Gen. Robert Howe, Continental Army' },
    Huger: { id: 'huger' },
    Elbert: { force: 'continental', full: 'Col. Samuel Elbert, Georgia Continentals' },
    Baird: { force: 'british', full: 'Sir James Baird, light infantry' },
    'Quamino Dolly': { force: 'british', full: 'Quamino Dolly, an enslaved man who guided the British through the swamp' },
  },
  units: {
    ga:   { name: "Elbert's Georgia Continentals", short: 'Elbert (Ga.)', side: 'allied', force: 'continental', men: 350, type: 'line', w: 160, d: 24 },
    sc:   { name: "Huger's South Carolina Continentals", short: 'Huger (S.C.)', side: 'allied', force: 'continental', men: 350, type: 'line', w: 160, d: 24 },
    mil:  { name: 'Georgia militia', short: 'Ga. militia', side: 'allied', force: 'militia', men: 150, type: 'skirmish', w: 100, d: 14 },
    guns: { name: 'American artillery', short: 'Guns', side: 'allied', force: 'continental', men: 40, type: 'artillery', w: 24, d: 16 },
    h71:  { name: '71st Highlanders and Hessians (the frontal force)', short: '71st & Hessians', side: 'crown', force: 'british', men: 1500, type: 'line', w: 280, d: 30 },
    li:   { name: "Baird's light infantry and the New York Volunteers", short: 'Baird (flank march)', side: 'crown', force: 'british', men: 600, type: 'line', w: 90, d: 40 },
  },
  notes: [{ at: [380, 60], text: 'Swamp' }, { at: [-380, 60], text: 'Swamp' }, { at: [0, -900], text: 'Savannah' }],
  phases: [
    { time: '12:00', title: 'Howe waits for the British', conf: 'documented',
      text: "Campbell's 3,000 men have landed at Girardeau's plantation below Savannah. Howe, with about 850 Continentals and militia, forms across the road south-east of town with swamps on both flanks: Elbert's Georgians on the left, Huger's South Carolinians on the right.",
      at: { ga: [-120, 0], sc: [120, 0], mil: [270, -40], guns: [0, 15], h71: [0, 900, 'moving', 90], li: [60, 1000, 'moving', 90] } },
    { time: '14:00', title: 'A path through the swamp', conf: 'documented',
      text: "Campbell makes a show of deploying in front of Howe's line while Quamino Dolly, an enslaved man who knows the ground, leads Baird's light infantry along a hidden path through the swamp around the American right.",
      at: { h71: [0, 450, 'firing'], li: [420, 500, 'moving', 90] },
      arrows: [{ side: 'crown', path: [[60, 900], [420, 600], [480, 200], [420, -150]] }] },
    { time: '15:00', title: 'Struck from behind', conf: 'documented',
      text: "Baird's men burst out of the swamp behind the American right as the Highlanders and Hessians charge in front. Howe's line collapses. The Georgians on the left are cut off, and many drown or are captured trying to cross Musgrove Creek.",
      at: { li: [250, -250, 'firing'], h71: [0, 80, 'moving'], sc: [80, -300, 'routed'], ga: [-250, -250, 'routed'], mil: [300, -350, 'routed'], guns: [0, 15, 'captured'] },
      arrows: [{ side: 'crown', path: [[420, -150], [260, -230]] }, { side: 'allied', path: [[-120, -20], [-300, -300]] }] },
    { time: '16:00', title: 'Georgia falls', conf: 'documented',
      text: "The British lost fewer than 30 killed and wounded; the Americans about 80 killed and 450 captured. Savannah became a British base for three years, and Georgia the only rebel colony where royal government was restored.",
      at: {} },
  ],
};
