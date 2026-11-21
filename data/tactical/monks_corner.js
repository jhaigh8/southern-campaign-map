// Tactical reconstruction (approximate): Monck's Corner (Biggin's Bridge), 14 April 1780. Format: see cowpens.js.
// Placement: origin is Biggin Bridge (data/places.js, approximate), on the line of Biggin Creek west of the Biggin Church ruins;
// the upper creek was cut by the Tailrace Canal of Lake Moultrie, so the crossing is placed on the surviving channel's line.
// Huger posted his cavalry on the near (west) side of the bridge and the militia across it toward the church
// (American Battlefield Trust; Borick), so Tarleton, coming along the road from Monck's Corner, struck the horses first.
// Positions schematic.
// Sources: Tarleton's Campaigns (1787); Borick, A Gallant Defense (2003).
window.SC = window.SC || {};
SC.tactical = SC.tactical || {};

SC.tactical.monks_corner = {
  battle: 'monks_corner', title: "Monck's Corner", date: '14 April 1780', level: 'approximate', site: 'approximate',
  origin: 'biggin_bridge', facing: 300,
  camera: { at: [0, 100], zoom: 15.4, pitch: 52, bearing: 0, elev: 15 },
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
  notes: [{ at: [40, 0], text: "Biggin's Bridge: the last road out of Charleston" }],
  phases: [
    { time: '03:00', title: 'A night march', conf: 'documented',
      text: "Huger guards Biggin's Bridge, keeping open the last route out of besieged Charleston. His cavalry, under Washington, camps in front of the bridge; the militia are posted across it toward Biggin Church. Tarleton and Ferguson march through the night. On the way they stop an enslaved man carrying a letter from the American camp; it reveals Huger's positions, and he guides them in.",
      at: { cav: [0, 130], mil: [0, -120], leg: [0, 900, 'moving', 90], ferg: [0, 1100, 'moving', 90] } },
    { time: '03:30', title: 'Surprise', conf: 'documented',
      text: "The Legion charges into the camp. The cavalry camp is overrun first, many men asleep with their horses unsaddled; Ferguson's infantry then clears the bridge and the militia scatter. Huger, Washington and others escape into the swamps on foot. About 20 Americans were killed and over 60 captured, along with some 400 horses. The road to Charleston's rear was shut.",
      at: { leg: [0, 120, 'moving'], ferg: [0, 20, 'firing'], mil: [-160, -280, 'routed'], cav: [240, 60, 'routed'] },
      arrows: [{ side: 'crown', path: [[0, 850], [0, 400], [0, 170]] }] },
  ],
};
