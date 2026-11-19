// Tactical reconstruction (approximate): Huck's Defeat (Williamson's Plantation), 12 July 1780. Format: see cowpens.js.
// Placement: origin is the battle's map location at Williamson's Plantation near Historic Brattonsville
// (data/places.js). Huck camped around the house and lane; the Patriots attacked at dawn from two sides.
// Positions schematic. Sources: Michael C. Scoggins, The Day It Rained Militia (2005); pension statements.
window.SC = window.SC || {};
SC.tactical = SC.tactical || {};

SC.tactical.hucks_defeat = {
  battle: 'hucks_defeat', title: "Huck's Defeat", date: '12 July 1780', level: 'approximate',
  origin: 'hucks_defeat', facing: 0,
  camera: { at: [0, 0], zoom: 15.8, pitch: 52, bearing: 0, elev: 200 },
  sources: "After Scoggins, The Day It Rained Militia (2005), and pension statements. Site approximate; positions schematic.",
  people: {
    Huck: { force: 'loyalist', full: 'Capt. Christian Huck, British Legion (killed)' },
    Bratton: { force: 'militia', full: 'Col. William Bratton, South Carolina militia' },
    McClure: { force: 'militia', full: 'Capt. John McClure, South Carolina militia' },
    Lacey: { force: 'militia', full: 'Col. Edward Lacey, South Carolina militia' },
    Neel: { force: 'militia', full: 'Col. Andrew Neel, South Carolina militia' },
  },
  units: {
    huck: { name: "Huck's Legion dragoons and Loyalist militia", short: 'Huck', side: 'crown', force: 'loyalist', men: 115, type: 'line', w: 80, d: 50 },
    p1:   { name: "Bratton's and McClure's men", short: 'Bratton & McClure', side: 'allied', force: 'militia', men: 130, type: 'skirmish', w: 120, d: 16 },
    p2:   { name: "Lacey's and Neel's men", short: 'Lacey & Neel', side: 'allied', force: 'militia', men: 120, type: 'skirmish', w: 120, d: 16 },
  },
  notes: [{ at: [60, 80], text: "Williamson's house and lane" }],
  phases: [
    { time: '05:00', title: 'Huck in camp', conf: 'documented',
      text: "Captain Huck, notorious for burning a Presbyterian meeting house and threatening its congregation, has spent the night at Williamson's plantation hunting local militia leaders. Patriot militia have gathered in the dark around his camp, split into two parties.",
      at: { huck: [0, 0], p1: [0, -300, 'moving'], p2: [0, 300, 'moving', 180] } },
    { time: '05:30', title: 'Dawn attack', conf: 'documented',
      text: "The Patriots open fire from behind the rail fences along the lane, catching Huck's men half asleep. Huck tries to rally his dragoons on horseback and is shot through the head.",
      at: { p1: [0, -90, 'firing'], p2: [0, 90, 'firing', 180], huck: [0, 0, 'broken'] },
      arrows: [{ side: 'allied', path: [[0, -280], [0, -110]] }, { side: 'allied', path: [[0, 280], [0, 110]] }] },
    { time: '06:00', title: 'Rout', conf: 'documented',
      text: "Huck's force breaks and scatters; perhaps 30 to 50 were killed or mortally wounded, against one Patriot killed. Coming soon after the fall of Charleston, the small victory brought hundreds of men out to join Sumter.",
      at: { huck: [-150, 0, 'routed'] } },
  ],
};
