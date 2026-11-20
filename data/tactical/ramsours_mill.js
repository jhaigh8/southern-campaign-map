// Tactical reconstruction (approximate): Battle of Ramsour's Mill, 20 June 1780. Format: see cowpens.js.
// Placement: origin is the battle's map location at present Lincolnton, NC (data/places.js). The Loyalists
// camped on a ridge north of the mill pond; the Patriots came along the road from the east. Positions schematic.
// Sources: Joseph Graham's account; Lyman Draper; Buchanan, The Road to Guilford Courthouse (1997).
window.SC = window.SC || {};
SC.tactical = SC.tactical || {};

SC.tactical.ramsours_mill = {
  battle: 'ramsours_mill', title: "Battle of Ramsour's Mill", date: '20 June 1780', level: 'approximate',
  origin: 'ramsours_mill', facing: 270,
  camera: { at: [0, 150], zoom: 15.4, pitch: 52, bearing: 0, elev: 260 },
  sources: "After Joseph Graham's account, Draper and Buchanan (1997). Site approximate; positions schematic.",
  people: {
    Cornwallis: { id: 'cornwallis' },
    Locke: { force: 'militia', full: 'Col. Francis Locke, North Carolina militia' },
    Moore: { force: 'loyalist', full: 'Lt. Col. John Moore, Loyalist militia' },
  },
  units: {
    cav:  { name: 'Patriot mounted men (advance)', short: 'Mounted men', side: 'allied', force: 'militia', men: 60, type: 'cavalry', w: 50, d: 30 },
    pat:  { name: "Locke's Patriot militia", short: 'Locke', side: 'allied', force: 'militia', men: 340, type: 'skirmish', w: 220, d: 18 },
    loy:  { name: "Moore's Loyalist militia on the ridge", short: 'Loyalists (Moore)', side: 'crown', force: 'loyalist', men: 1300, type: 'line', w: 300, d: 40 },
  },
  notes: [{ at: [-150, 380], text: "Ramsour's mill pond" }],
  phases: [
    { time: '07:00', title: 'Neighbours at war', conf: 'documented',
      text: "About 1,300 Loyalists have gathered on a ridge near Ramsour's Mill, many unarmed, waiting to join Cornwallis. Without waiting for reinforcements, about 400 Patriot militia under Locke attack at dawn, a few mounted men leading.",
      at: { loy: [0, 250], cav: [0, -20, 'moving', 90], pat: [0, -200, 'moving'] } },
    { time: '07:15', title: 'A fight without uniforms', conf: 'documented',
      text: "The mounted men are driven back, but the Patriot foot spread out along the slope and fire uphill. Neither side wears uniforms, and men put green twigs or paper in their hats to tell friend from foe; neighbours and relatives fight one another.",
      at: { cav: [-60, -100, 'broken'], pat: [0, 120, 'firing'], loy: [0, 250, 'firing'] } },
    { time: '08:00', title: 'The Loyalists scatter', conf: 'documented',
      text: "The Loyalists are pushed off the ridge and fall back across the mill creek, then melt away. Each side lost about 70 killed and many more wounded. The rising of North Carolina's Loyalists that Cornwallis hoped for was crushed before it began.",
      at: { loy: [-80, 500, 'routed'], pat: [0, 250, 'firing'] },
      arrows: [{ side: 'allied', path: [[0, 100], [0, 230]] }] },
  ],
};
