// Tactical reconstruction (approximate): Parker's Ferry, 30 August 1781. Format: see cowpens.js.
// Placement: origin is the battle's map location by the causeway to the Edisto ferry (data/places.js). Marion's
// men lay in the swamp beside the causeway. Positions schematic.
// Sources: Marion's report to Greene; Bass, Swamp Fox (1959).
window.SC = window.SC || {};
SC.tactical = SC.tactical || {};

SC.tactical.parkers_ferry = {
  battle: 'parkers_ferry', title: "Parker's Ferry", date: '30 August 1781', level: 'approximate',
  origin: 'parkers_ferry', facing: 90,
  camera: { at: [0, 0], zoom: 15.5, pitch: 52, bearing: 0, elev: 5 },
  sources: "After Marion's report and Bass, Swamp Fox (1959). Site approximate; positions schematic.",
  people: {
    Marion: { id: 'marion' },
    Fraser: { force: 'loyalist', full: 'Maj. Thomas Fraser, South Carolina Royalist dragoons' },
  },
  units: {
    mar:  { name: "Marion's men in the swamp", short: 'Marion', side: 'allied', force: 'militia', men: 400, type: 'skirmish', w: 30, d: 300 },
    lure: { name: 'Decoy party', short: 'Decoy', side: 'allied', force: 'militia', men: 30, type: 'cavalry', w: 30, d: 30 },
    fra:  { name: "Fraser's Loyalist dragoons", short: 'Fraser', side: 'crown', force: 'loyalist', men: 200, type: 'cavalry', w: 24, d: 220 },
    inf:  { name: 'British infantry following', short: 'Infantry', side: 'crown', force: 'british', men: 300, type: 'line', w: 30, d: 120 },
  },
  notes: [{ at: [-60, 0], text: 'Causeway through the swamp' }],
  phases: [
    { time: '17:00', title: 'The ambush is set', conf: 'documented',
      text: "Marion hides his men in the swamp along a causeway near Parker's Ferry on the Edisto and sends a few riders to draw the British on.",
      at: { mar: [60, 0], lure: [0, 400, 'moving'], fra: [0, 700, 'moving'], inf: [0, 1000, 'moving'] } },
    { time: '17:30', title: 'Down the causeway', conf: 'documented',
      text: "Fraser's dragoons gallop along the causeway after the decoys, straight past the hidden riflemen, who fire into the column at close range. Fraser charges through twice more under fire.",
      at: { fra: [0, 0, 'broken'], mar: [60, 0, 'firing'], lure: [0, -300, 'moving'] },
      arrows: [{ side: 'crown', path: [[0, 600], [0, -100]] }] },
    { time: '18:00', title: 'Out of powder', conf: 'documented',
      text: "When the British infantry and guns come up, Marion's men are nearly out of ammunition and withdraw. The British lost about 100 killed and wounded, most of them dragoons shot from the saddle; Marion lost very few. Days later, his men joined Greene at Eutaw Springs.",
      at: { mar: [300, 0, 'moving'], inf: [0, 300, 'firing'], fra: [0, 500, 'routed'] } },
  ],
};
