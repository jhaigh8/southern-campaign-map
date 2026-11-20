// Tactical reconstruction (approximate): Quinby Bridge, 17 July 1781. Format: see cowpens.js.
// Placement: origin is the battle's map location at the bridge over Quinby Creek (data/places.js); Shubrick's
// plantation lay just beyond it. Positions schematic.
// Sources: Henry Lee's Memoirs; Bass, Gamecock (1961) and Swamp Fox (1959).
window.SC = window.SC || {};
SC.tactical = SC.tactical || {};

SC.tactical.quinby = {
  battle: 'quinby', title: 'Quinby Bridge', date: '17 July 1781', level: 'approximate', site: 'approximate',
  origin: 'quinby', facing: 90,
  camera: { at: [80, 0], zoom: 15.4, pitch: 52, bearing: 0, elev: 10 },
  sources: "After Lee's Memoirs and Bass (1959, 1961). Site approximate; positions schematic.",
  people: {
    Greene: { id: 'greene' },
    Sumter: { id: 'sumter' }, Marion: { id: 'marion' }, Lee: { id: 'lee' },
    Coates: { force: 'british', full: 'Lt. Col. John Coates, 19th Foot' },
    Armstrong: { force: 'continental', full: "Capt. James Armstrong, Lee's Legion" },
  },
  units: {
    leg:  { name: "Lee's Legion cavalry", short: "Lee's Legion", side: 'allied', force: 'continental', men: 100, type: 'cavalry', w: 30, d: 60 },
    mar:  { name: "Marion's brigade", short: 'Marion', side: 'allied', force: 'militia', men: 300, type: 'skirmish', w: 120, d: 18 },
    sum:  { name: "Sumter's brigade", short: 'Sumter', side: 'allied', force: 'militia', men: 400, type: 'skirmish', w: 140, d: 18 },
    f19:  { name: "Coates's 19th Foot", short: '19th (Coates)', side: 'crown', force: 'british', men: 500, type: 'line', w: 120, d: 30 },
  },
  notes: [{ at: [0, 60], text: 'Quinby Creek bridge' }, { at: [400, 120], text: "Shubrick's plantation" }],
  phases: [
    { time: '12:00', title: 'The planks are pulled up', conf: 'documented',
      text: "Coates's 19th Foot, falling back toward Charleston, crosses Quinby Bridge and starts taking up its planks. Lee's cavalry and Marion's men, chasing, charge across the loosened bridge; a few dragoons get over before the gap widens, and fight hand to hand.",
      at: { f19: [80, 100], leg: [-20, 0, 'moving', 90], mar: [-250, 0, 'moving'], sum: [-500, 0, 'moving'] },
      arrows: [{ side: 'allied', path: [[-150, 0], [40, 60]] }] },
    { time: '13:00', title: "Shubrick's plantation", conf: 'documented',
      text: "Coates forms in and around the buildings of Shubrick's plantation. When the main force arrives, Sumter orders an attack across open ground over Lee's and Marion's objections.",
      at: { f19: [400, 120, 'formed'], leg: [150, 0], mar: [180, -150, 'moving'], sum: [180, 200, 'moving'] } },
    { time: '15:00', title: 'A costly failure', conf: 'documented',
      text: "Marion's men, attacking with little cover, take heavy losses while Sumter's men fire from behind outbuildings. Out of ammunition, the Patriots fall back. Marion's and Lee's men were bitter at Sumter, and Lee soon left to rejoin Greene.",
      at: { f19: [400, 120, 'firing'], mar: [250, -120, 'broken'], sum: [250, 230, 'firing'] },
      arrows: [{ side: 'allied', path: [[180, -150], [300, -40]] }] },
  ],
};
