// Tactical reconstruction: Siege of Augusta, 22 May - 5 June 1781. Format: see cowpens.js and yorktown.js.
//
// Placement: Fort Cornwallis stood by St. Paul's Church on the Savannah River in Augusta (origin,
// ~33.4745 N, 81.9605 W); Fort Grierson about half a mile up the river to the west. The Patriot approaches
// came from the south. The town is built over; the forts and works are drawn schematically.
//
// Main sources: Lee's Memoirs; Pickens's and Brown's reports; Edward J. Cashin, The King's Ranger (1989).
window.SC = window.SC || {};
SC.tactical = SC.tactical || {};

SC.tactical.augusta1781 = {
  battle: 'augusta1781',
  title: 'Siege of Augusta',
  date: '22 May – 5 June 1781',
  level: 'approximate',
  origin: [-81.9605, 33.4745],
  facing: 10,
  camera: { at: [-350, -120], zoom: 15.2, pitch: 52, bearing: 0, elev: 40 },
  sources: "After Lee's Memoirs, Pickens's and Brown's reports and Cashin, The King's Ranger (1989). Sites placed approximately; works schematic.",

  people: {
    Greene: { id: 'greene' },
    Pickens: { id: 'pickens' },
    Clarke: { id: 'clarke' },
    Lee: { id: 'lee' },
    Brown: { id: 'brown' },
    Grierson: { force: 'loyalist', full: 'Col. James Grierson, Georgia Loyalist militia (killed after surrender)' },
  },

  units: {
    corn: { name: "Fort Cornwallis: Brown's King's Rangers and Loyalists", short: 'Fort Cornwallis (Brown)', side: 'crown', force: 'loyalist', men: 330, type: 'line', w: 50, d: 50 },
    grie: { name: "Fort Grierson: Grierson's Loyalist militia", short: 'Fort Grierson', side: 'crown', force: 'loyalist', men: 80, type: 'line', w: 30, d: 30 },
    pick: { name: "Pickens's South Carolina militia", short: 'Pickens', side: 'allied', force: 'militia', men: 500, type: 'skirmish', w: 140, d: 18 },
    clar: { name: "Clarke's Georgia militia", short: 'Clarke', side: 'allied', force: 'militia', men: 400, type: 'skirmish', w: 130, d: 18 },
    lee:  { name: "Lee's Legion", short: "Lee's Legion", side: 'allied', force: 'continental', men: 300, type: 'line', w: 90, d: 24 },
    tower:{ name: 'Siege tower with a six-pounder', short: 'Tower', side: 'allied', force: 'continental', men: 30, type: 'artillery', w: 16, d: 16, h: 18 },
  },

  works: [
    { kind: 'fort', side: 'crown', h: 5, path: [[-35, -35], [35, -35], [35, 35], [-35, 35]], to: 5 },
    { kind: 'fort', side: 'allied', h: 5, path: [[-35, -35], [35, -35], [35, 35], [-35, 35]], from: 6 },
    { kind: 'fort', side: 'crown', h: 4, path: [[-820, 20], [-780, 20], [-780, 60], [-820, 60]], to: 0 },
    { kind: 'fort', side: 'allied', h: 4, path: [[-820, 20], [-780, 20], [-780, 60], [-820, 60]], from: 1 },
    { kind: 'trench', side: 'allied', from: 2, path: [[-200, -260], [-100, -200], [-60, -130], [-40, -90]] },
  ],

  notes: [
    { at: [-300, 200], text: 'Savannah River' },
    { at: [0, 70], text: "St. Paul's Church" },
  ],

  phases: [
    { time: '22 May', title: 'Augusta surrounded', conf: 'documented',
      text: "Pickens's and Clarke's militia and Lee's Legion close in on Augusta, held by Thomas Brown in Fort Cornwallis by St. Paul's Church, with a smaller post, Fort Grierson, half a mile up the river.",
      at: { corn: [0, 0], grie: [-800, 40], pick: [-200, -420], clar: [-800, -300], lee: [-450, -360] } },

    { time: '24 May', title: 'Fort Grierson falls', conf: 'documented',
      text: "The Patriots storm Fort Grierson. Grierson's men try to escape along the river to Fort Cornwallis; many are killed or captured, and Grierson is shot dead after surrendering, by a Georgian bent on revenge. Brown's sortie to help them is driven back.",
      at: { grie: [-650, 120, 'captured'], clar: [-760, -40, 'firing'], lee: [-500, -80, 'firing'], corn: [-80, 20, 'firing'] },
      arrows: [{ side: 'allied', path: [[-800, -280], [-800, -10]] }, { side: 'crown', path: [[-780, 50], [-660, 120]] }] },

    { time: '25–31 May', title: 'Sorties and a tower', conf: 'documented',
      text: "Lee suggests the trick used at Fort Watson: a log tower tall enough to fire over the walls. Brown sallies out again and again to stop the work, and sends a fake deserter to burn the tower, but Lee has him watched.",
      at: { corn: [0, 0, 'firing'], lee: [-120, -260, 'firing'], pick: [-30, -300], tower: [-80, -170], clar: [-300, -250] } },

    { time: '1 June', title: 'The tower opens fire', conf: 'documented',
      text: "The tower now overtops the fort's walls, and a six-pounder mounted on it fires down into the works. That night Brown leads most of his garrison out in a hard fight before falling back.",
      at: { tower: [-80, -170, 'firing'], corn: [-20, -60, 'firing'], lee: [-120, -220, 'firing'] },
      arrows: [{ side: 'crown', path: [[0, -30], [-60, -140]] }] },

    { time: '3 June', title: 'A mined house', conf: 'documented',
      text: "Brown's men have dug a mine under a house near the fort which they expect the Patriots to occupy; it blows up before anyone moves in. The bombardment from the tower continues.",
      at: { corn: [0, 0, 'broken'], tower: [-80, -170, 'firing'] } },

    { time: '5 June', title: 'Brown offers terms', conf: 'documented',
      text: "With his men exposed and no relief coming, Brown offers to negotiate.",
      at: { pick: [-60, -150], lee: [60, -160] } },

    { time: '6 June', title: 'Augusta retaken', conf: 'documented',
      text: "Brown surrenders. Lee's men protect him from Georgians who want to kill him. About 330 Loyalists were captured and some 50 killed; the Patriots lost 16 killed and 35 wounded. Georgia's back country was back in Patriot hands; Lee and Pickens marched to join Greene at Ninety Six.",
      at: { corn: [0, 0, 'captured'], lee: [-40, -60], pick: [60, -80], clar: [-200, -120] } },
  ],
};
