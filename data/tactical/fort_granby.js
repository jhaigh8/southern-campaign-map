// Tactical reconstruction: capture of Fort Granby, 15 May 1781. Format: see cowpens.js and yorktown.js.
//
// Placement: Fort Granby was James Cayce's fortified house on the Congaree River, in present Cayce, SC,
// placed approximately (33.95 N, 81.05 W). Positions and works are schematic.
//
// Main sources: Lee's Memoirs; Greene's and Sumter's correspondence.
window.SC = window.SC || {};
SC.tactical = SC.tactical || {};

SC.tactical.fort_granby = {
  battle: 'fort_granby',
  title: 'Capture of Fort Granby',
  date: '15 May 1781',
  level: 'approximate', site: 'approximate',
  origin: [-81.05, 33.95],
  facing: 90,
  camera: { at: [-60, 0], zoom: 16.2, pitch: 55, bearing: 0, elev: 50 },
  sources: "After Lee's Memoirs and Greene's and Sumter's correspondence. Site placed approximately; positions schematic.",

  people: {
    Greene: { id: 'greene' },
    Lee: { id: 'lee' },
    Sumter: { id: 'sumter' },
    Rawdon: { id: 'rawdon' },
    Maxwell: { force: 'loyalist', full: "Maj. Andrew Maxwell, Prince of Wales's American Regiment" },
  },

  units: {
    gar:  { name: "Fort Granby garrison (Prince of Wales's American Regiment and Loyalist militia)", short: 'Fort Granby', side: 'crown', force: 'loyalist', men: 350, type: 'line', w: 40, d: 40 },
    lee:  { name: "Lee's Legion", short: "Lee's Legion", side: 'allied', force: 'continental', men: 300, type: 'line', w: 90, d: 24 },
    gun:  { name: 'Six-pounder', short: '6-pounder', side: 'allied', force: 'continental', men: 20, type: 'artillery', w: 16, d: 14 },
  },

  works: [
    { kind: 'fort', side: 'crown', h: 6, path: [[-25, -25], [25, -25], [25, 25], [-25, 25]], to: 1 },
    { kind: 'fort', side: 'allied', h: 6, path: [[-25, -25], [25, -25], [25, 25], [-25, 25]], from: 2 },
  ],

  notes: [{ at: [80, 0], text: 'Congaree River' }],

  phases: [
    { time: '14 May, night', title: 'Lee arrives', conf: 'documented',
      text: "Fresh from Fort Motte, Lee's Legion reaches Fort Granby, a fortified house on the Congaree held by about 350 Loyalists under Major Maxwell. Sumter had tried and failed to take it. Under cover of fog, Lee plants a six-pounder within range.",
      at: { gar: [0, 0], lee: [-160, -60], gun: [-120, 0] } },

    { time: '15 May, morning', title: 'Guns in the fog', conf: 'documented',
      text: "When the fog lifts the gun opens fire and Lee's infantry move up. With Rawdon in retreat and no help in sight, Maxwell agrees to talk.",
      at: { gun: [-120, 0, 'firing'], lee: [-90, -40, 'moving'], gar: [0, 0, 'firing'] },
      arrows: [{ side: 'allied', path: [[-160, -60], [-90, -40]] }] },

    { time: '15 May', title: 'Generous terms', conf: 'documented',
      text: "Maxwell surrenders on terms that let his men keep their baggage, much of it plundered from local families, and go to Charleston as paroled prisoners. Lee hurried the deal because Rawdon was near; Sumter, who had besieged the post himself, was furious. Within three weeks almost every British post in the interior had fallen.",
      at: { gar: [0, 0, 'captured'], lee: [-50, -20] } },
  ],
};
