// Tactical reconstruction: Siege of Fort Motte, 8-12 May 1781. Format: see cowpens.js and yorktown.js.
//
// Placement: Rebecca Motte's fortified mansion, near the junction of the Congaree and Wateree rivers
// (33.7608 N, 80.6697 W). The palisade, the Patriot trench and positions are drawn schematically.
//
// Main sources: Lee's Memoirs; Marion's reports; Steven D. Smith et al., archaeology at Fort Motte (2007).
window.SC = window.SC || {};
SC.tactical = SC.tactical || {};

SC.tactical.fort_motte = {
  battle: 'fort_motte',
  title: 'Siege of Fort Motte',
  date: '8–12 May 1781',
  level: 'approximate',
  origin: [-80.66972, 33.76083],
  facing: 180,
  camera: { at: [0, -60], zoom: 16.3, pitch: 55, bearing: 0, elev: 70 },
  sources: "After Lee's Memoirs, Marion's reports and the Fort Motte archaeology. Positions and works schematic.",

  people: {
    Marion: { id: 'marion' },
    Lee: { id: 'lee' },
    Rawdon: { id: 'rawdon' },
    McPherson: { force: 'british', full: 'Lt. Daniel McPherson, commanding Fort Motte' },
    'Rebecca Motte': { force: 'militia', full: 'Rebecca Motte, owner of the plantation' },
  },

  units: {
    gar:  { name: 'Fort Motte garrison (British, Hessian and Provincial)', short: 'Fort Motte', side: 'crown', force: 'british', men: 150, type: 'line', w: 40, d: 30 },
    mar:  { name: "Marion's brigade", short: 'Marion', side: 'allied', force: 'militia', men: 250, type: 'skirmish', w: 130, d: 18 },
    lee:  { name: "Lee's Legion", short: "Lee's Legion", side: 'allied', force: 'continental', men: 200, type: 'line', w: 90, d: 24 },
    gun:  { name: 'Six-pounder', short: '6-pounder', side: 'allied', force: 'continental', men: 20, type: 'artillery', w: 16, d: 14 },
  },

  works: [
    { kind: 'trench', side: 'crown', path: [[-50, -40], [50, -40], [50, 40], [-50, 40], [-50, -40]] },   // palisade and ditch around the mansion
    { kind: 'fort', side: 'crown', h: 10, path: [[-15, -10], [15, -10], [15, 10], [-15, 10]], to: 3 },  // the mansion
    { kind: 'fort', side: 'allied', h: 10, path: [[-15, -10], [15, -10], [15, 10], [-15, 10]], from: 4 },
    { kind: 'trench', side: 'allied', from: 1, path: [[-140, 120], [-60, 110], [0, 100], [60, 90]] },
  ],

  notes: [{ at: [0, -200], text: 'Rebecca Motte\'s mansion, fortified as a supply depot' }],

  phases: [
    { time: '8 May', title: 'The depot at Mount Joseph', conf: 'documented',
      text: "Marion and Lee surround Fort Motte, a supply depot made by fortifying Rebecca Motte's mansion with a palisade, ditch and abatis. Mrs. Motte has been moved to a nearby farmhouse. McPherson holds it with about 150 men.",
      at: { gar: [0, 0], mar: [-120, 200], lee: [120, 180], gun: [0, 230] } },

    { time: '10 May', title: 'Summons refused', conf: 'documented',
      text: "The Patriots dig toward the house and summon McPherson, who refuses: he knows Rawdon, retreating from Camden, is close enough that his campfires can be seen.",
      at: { mar: [-100, 120, 'firing'], lee: [80, 110, 'firing'], gun: [0, 130, 'firing'], gar: [0, 0, 'firing'] } },

    { time: '11 May', title: 'Rebecca Motte\'s arrows', conf: 'documented',
      text: "Time is short. Lee tells Mrs. Motte he must burn her house to take it, and she agrees, by tradition giving him a bow and fire arrows herself.",
      at: {} },

    { time: '12 May', title: 'Fire on the roof', conf: 'documented',
      text: "Burning arrows set the dry shingle roof alight. When the defenders climb up to put out the flames, the six-pounder sweeps the roof and drives them off.",
      at: { gun: [0, 110, 'firing'], mar: [-90, 100, 'firing'], gar: [0, 0, 'broken'] },
      arrows: [{ side: 'allied', path: [[-60, 110], [-20, 30], [-5, 5]] }] },

    { time: '12 May, 1 p.m.', title: 'Surrender', conf: 'documented',
      text: "McPherson surrenders. The Patriots help put out the fire, and Mrs. Motte gives dinner to the officers of both sides. The garrison was paroled; the Patriots lost only two wounded. Within days Fort Granby and other posts fell too.",
      at: { gar: [0, 0, 'captured'], lee: [40, 60], mar: [-60, 70] } },
  ],
};
