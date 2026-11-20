// Tactical reconstruction (approximate): Fishdam Ford, 9 November 1780. Format: see cowpens.js.
// Placement: origin is the battle's map location by the Broad River ford (data/places.js). Positions schematic.
// Sources: Bass, Gamecock (1961); Wemyss's and Sumter's accounts.
window.SC = window.SC || {};
SC.tactical = SC.tactical || {};

SC.tactical.fishdam_ford = {
  battle: 'fishdam_ford', title: 'Fishdam Ford', date: '9 November 1780', level: 'approximate',
  origin: 'fishdam_ford', facing: 90,
  camera: { at: [0, 0], zoom: 15.6, pitch: 52, bearing: 0, elev: 110 },
  sources: "After Bass (1961) and the participants' accounts. Site approximate; positions schematic.",
  people: {
    Sumter: { id: 'sumter' },
    Wemyss: { force: 'british', full: 'Maj. James Wemyss, 63rd Foot (wounded and captured)' },
  },
  units: {
    sum:  { name: "Sumter's militia in camp", short: 'Sumter', side: 'allied', force: 'militia', men: 450, type: 'skirmish', w: 200, d: 30 },
    wem:  { name: "Wemyss's mounted 63rd Foot and Legion dragoons", short: 'Wemyss', side: 'crown', force: 'british', men: 140, type: 'cavalry', w: 60, d: 50 },
  },
  notes: [{ at: [0, -300], text: 'Broad River' }],
  phases: [
    { time: '01:00', title: 'A raid in the dark', conf: 'documented',
      text: "Major Wemyss, hated for burning plantations, tries to surprise Sumter's camp at Fishdam Ford with a night attack. Sumter narrowly escapes from his tent.",
      at: { sum: [0, 0], wem: [0, 300, 'moving', 90] },
      arrows: [{ side: 'crown', path: [[0, 400], [0, 60]] }] },
    { time: '01:30', title: 'Silhouetted by the campfires', conf: 'documented',
      text: "Sumter's men, posted in the dark, fire on the attackers lit up by their own campfires. Wemyss is badly wounded early and his men are beaten off. He was left behind and captured, with a list in his pocket of houses he had burned; Sumter spared him.",
      at: { wem: [0, 250, 'routed'], sum: [0, 40, 'firing'] } },
  ],
};
