// Tactical reconstruction (approximate): Monck's Corner (Biggin's Bridge), 14 April 1780. Format: see cowpens.js.
// Placement: origin is the battle's map location (data/places.js); Huger's camp guarded Biggin's Bridge over
// the Cooper River headwaters. Tarleton came down the road from the north-west at night. Positions schematic.
// Sources: Tarleton's Campaigns (1787); Borick, A Gallant Defense (2003).
window.SC = window.SC || {};
SC.tactical = SC.tactical || {};

SC.tactical.monks_corner = {
  battle: 'monks_corner', title: "Monck's Corner", date: '14 April 1780', level: 'approximate',
  origin: 'monks_corner', facing: 300,
  camera: { at: [0, 100], zoom: 15.4, pitch: 52, bearing: 300, elev: 15 },
  sources: "After Tarleton's Campaigns and Borick (2003). Site approximate; positions schematic.",
  people: {
    Tarleton: { id: 'tarleton' }, Huger: { id: 'huger' }, Ferguson: { id: 'ferguson' },
    Washington: { id: 'wwashington' },
  },
  units: {
    cav:  { name: "Huger's Continental cavalry (Washington's, Bland's, Pulaski's)", short: 'Continental horse', side: 'allied', force: 'continental', men: 300, type: 'cavalry', w: 90, d: 50 },
    mil:  { name: 'Militia guarding the bridge', short: 'Militia', side: 'allied', force: 'militia', men: 150, type: 'skirmish', w: 80, d: 16 },
    leg:  { name: "Tarleton's British Legion", short: 'Tarleton', side: 'crown', force: 'loyalist', men: 300, type: 'cavalry', w: 60, d: 60 },
    ferg: { name: "Ferguson's American Volunteers", short: 'Ferguson', side: 'crown', force: 'loyalist', men: 150, type: 'line', w: 70, d: 24 },
  },
  notes: [{ at: [0, -200], text: "Biggin's Bridge: the last road out of Charleston" }],
  phases: [
    { time: '03:00', title: 'A night march', conf: 'documented',
      text: "Huger's cavalry guards Biggin's Bridge, keeping open the last route out of besieged Charleston. Tarleton and Ferguson march through the night. On the way they stop an enslaved man carrying a letter from the American camp; it reveals Huger's positions, and he guides them in.",
      at: { cav: [0, -100], mil: [0, 120], leg: [0, 900, 'moving', 90], ferg: [0, 1100, 'moving', 90] } },
    { time: '03:30', title: 'Surprise', conf: 'documented',
      text: "The Legion charges into the camp. Many Americans are asleep with their horses unsaddled; Huger, Washington and others escape into the swamps on foot. About 15 Americans were killed and over 60 captured, along with some 400 horses. The road to Charleston's rear was shut.",
      at: { leg: [0, -60, 'moving'], ferg: [0, 140, 'firing'], mil: [-150, -80, 'routed'], cav: [200, -300, 'routed'] },
      arrows: [{ side: 'crown', path: [[0, 850], [0, 300], [0, -20]] }] },
  ],
};
