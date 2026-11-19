// Tactical reconstruction: Siege of Fort Watson, 15-23 April 1781. Format: see cowpens.js and yorktown.js.
//
// Placement: the stockade stood on top of the Santee Indian Mound beside Scott's Lake, now on the shore of
// Lake Marion (Santee National Wildlife Refuge, at the end of Fort Watson Road). origin is the mound,
// placed approximately; the stockade, the tower and the Patriot positions are drawn schematically.
//
// Main sources: Marion's and Lee's reports; Lee's Memoirs; NPS/USFWS site interpretation; Steven D. Smith,
// archaeology of Fort Watson.
window.SC = window.SC || {};
SC.tactical = SC.tactical || {};

SC.tactical.fort_watson = {
  battle: 'fort_watson',
  title: 'Siege of Fort Watson',
  date: '15–23 April 1781',
  level: 'approximate',
  origin: [-80.4350, 33.5370],
  facing: 90,
  camera: { at: [-60, 0], zoom: 16.4, pitch: 55, bearing: 70, elev: 30 },
  sources: "After Marion's and Lee's reports and Lee's Memoirs. Site placed approximately; works drawn schematically.",

  people: {
    Marion: { id: 'marion' },
    Lee: { id: 'lee' },
    Maham: { force: 'militia', full: 'Lt. Col. Hezekiah Maham, South Carolina militia' },
    McKay: { force: 'british', full: 'Lt. James McKay, commanding Fort Watson' },
  },

  units: {
    gar:   { name: 'Fort Watson garrison (British and Loyalists)', short: 'Fort Watson', side: 'crown', force: 'british', men: 120, type: 'line', w: 30, d: 30 },
    mar:   { name: "Marion's brigade", short: 'Marion', side: 'allied', force: 'militia', men: 300, type: 'skirmish', w: 140, d: 18 },
    lee:   { name: "Lee's Legion", short: "Lee's Legion", side: 'allied', force: 'continental', men: 200, type: 'line', w: 90, d: 24 },
    tower: { name: "Maham's tower riflemen", short: "Maham's tower", side: 'allied', force: 'militia', men: 30, type: 'artillery', w: 14, d: 14, h: 22 },
  },

  works: [
    { kind: 'fort', side: 'crown', h: 8, path: [[-22, -22], [22, -22], [22, 22], [-22, 22]], to: 4 },
    { kind: 'fort', side: 'allied', h: 8, path: [[-22, -22], [22, -22], [22, 22], [-22, 22]], from: 5 },
    { kind: 'trench', side: 'allied', from: 1, path: [[-200, 120], [-120, 80], [-90, 20]] },                  // cut-off from the lake
  ],

  notes: [
    { at: [0, 60], text: 'Santee Indian Mound' },
    { at: [-250, 200], text: "Scott's Lake (now Lake Marion)" },
  ],

  phases: [
    { time: '15 April', title: 'A fort on a mound', conf: 'documented',
      text: "Marion and Lee's Legion, newly joined, surround Fort Watson, a stockade built on top of an ancient Native American mound beside Scott's Lake, guarding the road from Charleston to Camden. Its garrison of about 120 refuses to surrender. The Patriots have no artillery.",
      at: { gar: [0, 0], mar: [-60, -170], lee: [120, -140] } },

    { time: '16–18 April', title: 'Cut off from water', conf: 'documented',
      text: "The Patriots cut the garrison off from the lake, but McKay's men dig a well inside the stockade and keep fighting. Fire from the mound top keeps the attackers at a distance.",
      at: { mar: [-130, -60, 'firing'], lee: [110, -100, 'firing'], gar: [0, 0, 'firing'] } },

    { time: '19–22 April', title: "Maham's tower", conf: 'documented',
      text: "Lieutenant Colonel Maham proposes a tower of notched logs taller than the mound. His men cut and prepare the timber out of sight, then raise the tower in a single night within rifle range of the fort.",
      at: { tower: [-80, -40], mar: [-150, -90], lee: [130, -100] } },

    { time: '23 April, dawn', title: 'Firing down into the fort', conf: 'documented',
      text: "At first light riflemen on the tower open fire down into the stockade, where no one can find cover, while a party works forward to pull down the abatis.",
      at: { tower: [-80, -40, 'firing'], mar: [-90, -60, 'firing'], lee: [70, -60, 'moving'], gar: [0, 0, 'broken'] },
      arrows: [{ side: 'allied', path: [[100, -90], [40, -40]] }] },

    { time: '23 April', title: 'Surrender', conf: 'documented',
      text: "McKay surrenders with about 120 men. It is the first British post to fall in Greene's campaign to clear the interior of South Carolina, and the Maham tower is copied at Ninety Six and Augusta.",
      at: { gar: [0, 0, 'captured'], lee: [40, -40], mar: [-60, -60] } },

    { time: '24 April', title: 'The road to Camden is cut', conf: 'documented',
      text: "With Fort Watson gone, the British supply line from Charleston to Rawdon at Camden was broken. Two days later Greene fought Rawdon at Hobkirk's Hill.",
      at: {} },
  ],
};
