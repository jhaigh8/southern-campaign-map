// Tactical reconstruction (approximate): Battle of Musgrove Mill, 19 August 1780. Format: see cowpens.js.
// Placement: origin is the battle's map location near Musgrove Mill State Historic Site on the Enoree River
// (data/places.js). The Patriots' semicircular breastwork stood on a ridge north of the river and ford.
// Positions schematic. Sources: Shelby's account; Musgrove Mill SHS interpretation; Buchanan (1997).
window.SC = window.SC || {};
SC.tactical = SC.tactical || {};

SC.tactical.musgrove_mill = {
  battle: 'musgrove_mill', title: 'Battle of Musgrove Mill', date: '19 August 1780', level: 'approximate',
  origin: 'musgrove_mill', facing: 180,
  camera: { at: [0, 120], zoom: 15.6, pitch: 52, bearing: 180, elev: 150 },
  sources: "After Shelby's account, the state historic site and Buchanan (1997). Site approximate; positions schematic.",
  people: {
    Shelby: { force: 'militia', full: 'Col. Isaac Shelby' }, Clarke: { id: 'clarke' },
    Williams: { force: 'militia', full: 'Col. James Williams, South Carolina militia' },
    Inman: { force: 'militia', full: 'Capt. Shadrach Inman (killed)' },
    Innes: { force: 'loyalist', full: 'Col. Alexander Innes, South Carolina Royalists (wounded)' },
  },
  units: {
    sh:   { name: "Shelby's men", short: 'Shelby', side: 'allied', force: 'militia', men: 70, type: 'skirmish', w: 70, d: 16 },
    wi:   { name: "Williams's men", short: 'Williams', side: 'allied', force: 'militia', men: 70, type: 'skirmish', w: 70, d: 16 },
    cl:   { name: "Clarke's Georgians", short: 'Clarke', side: 'allied', force: 'militia', men: 60, type: 'skirmish', w: 70, d: 16 },
    inm:  { name: "Inman's decoy party", short: 'Inman', side: 'allied', force: 'militia', men: 25, type: 'cavalry', w: 30, d: 20 },
    inn:  { name: "Innes's Provincials and Loyalist militia", short: 'Innes', side: 'crown', force: 'loyalist', men: 500, type: 'line', w: 200, d: 30 },
  },
  works: [{ kind: 'trench', side: 'allied', path: [[-160, -30], [-90, 10], [0, 25], [90, 10], [160, -30]] }],
  notes: [{ at: [0, 420], text: 'Enoree River and the mill' }],
  phases: [
    { time: '07:00', title: 'A raid turns into a stand', conf: 'documented',
      text: "About 200 Patriots under Shelby, Clarke and Williams ride through the night to raid a Loyalist camp at Musgrove's Mill. They learn it has just been reinforced to about 500, including Provincial regulars. With their horses blown, they throw up a semicircular breastwork of brush and logs on a ridge.",
      at: { sh: [-110, 0], wi: [0, 15], cl: [110, 0], inm: [0, 250, 'moving'], inn: [0, 450] } },
    { time: '07:30', title: 'The decoy', conf: 'documented',
      text: "Captain Inman leads a small party across the river to fire on the Loyalists and then gallop back as if fleeing. Innes's men take the bait and come on in pursuit.",
      at: { inm: [0, 120, 'moving'], inn: [0, 250, 'moving'] },
      arrows: [{ side: 'allied', path: [[0, 300], [0, 120]] }, { side: 'crown', path: [[0, 430], [0, 280]] }] },
    { time: '07:45', title: 'Fire at 70 yards', conf: 'documented',
      text: "The Patriots hold their fire until the attackers are close, then fire from behind the breastwork. Innes is wounded and many of his officers fall; Inman is killed. The Patriots charge, and the Loyalists flee back across the river.",
      at: { sh: [-110, 0, 'firing'], wi: [0, 15, 'firing'], cl: [110, 0, 'firing'], inn: [0, 110, 'broken'] } },
    { time: '08:30', title: 'Away before the counter-stroke', conf: 'documented',
      text: "The Loyalists lost about 63 killed, 90 wounded and 70 captured; the Patriots about 4 killed. Planning to march on Ninety Six, the victors learned of Gates's disaster at Camden and slipped away north with their prisoners.",
      at: { inn: [0, 450, 'routed'], sh: [-110, 80, 'moving'], wi: [0, 90, 'moving'], cl: [110, 80, 'moving'] } },
  ],
};
