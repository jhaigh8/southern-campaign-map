// Tactical reconstruction (approximate): Cowan's Ford, 1 February 1781. Format: see cowpens.js.
// Placement: origin is the battle's map location on the Catawba (data/places.js; the ford now lies under Lake
// Norman). The British crossed from the west bank; the ford forked midstream. Positions schematic.
// Sources: Joseph Graham's account; Buchanan, The Road to Guilford Courthouse (1997).
window.SC = window.SC || {};
SC.tactical = SC.tactical || {};

SC.tactical.cowans_ford = {
  battle: 'cowans_ford', title: "Cowan's Ford", date: '1 February 1781', level: 'approximate',
  origin: 'cowans_ford', facing: 270,
  camera: { at: [0, 120], zoom: 15.5, pitch: 52, bearing: 265, elev: 230 },
  sources: "After Joseph Graham's account and Buchanan (1997). Site approximate (now under Lake Norman); positions schematic.",
  people: {
    Cornwallis: { id: 'cornwallis' }, Tarleton: { id: 'tarleton' },
    Davidson: { force: 'militia', full: 'Brig. Gen. William Lee Davidson, North Carolina militia (killed)' },
    "O'Hara": { force: 'british', full: "Brig. Gen. Charles O'Hara, Guards brigade" },
    Hall: { force: 'british', full: 'Lt. Col. Hall, Guards (killed)' },
  },
  units: {
    pick: { name: 'Militia picket at the ford', short: 'Picket', side: 'allied', force: 'militia', men: 100, type: 'skirmish', w: 90, d: 14 },
    dav:  { name: "Davidson's North Carolina militia", short: 'Davidson', side: 'allied', force: 'militia', men: 200, type: 'skirmish', w: 120, d: 16 },
    gds:  { name: "O'Hara's Guards, wading the river", short: 'Guards', side: 'crown', force: 'british', men: 500, type: 'line', w: 50, d: 160 },
    brit: { name: 'The rest of the British column', short: 'Cornwallis', side: 'crown', force: 'british', men: 1500, type: 'line', w: 60, d: 200 },
  },
  notes: [{ at: [0, 250], text: 'Catawba River (now Lake Norman)' }],
  phases: [
    { time: '06:00', title: 'Into the flood', conf: 'documented',
      text: "To get across the rain-swollen Catawba after Morgan and Greene, Cornwallis sends the Guards into Cowan's Ford before dawn: chest-deep, freezing, 500 yards across, and swift. On the far bank a militia picket waits; Davidson's main body is further back.",
      at: { pick: [0, 0], dav: [100, -250], gds: [0, 350, 'moving', 0], brit: [0, 650, 'moving'] },
      arrows: [{ side: 'crown', path: [[0, 520], [0, 200]] }] },
    { time: '06:30', title: 'Fire on the ford', conf: 'probable',
      text: "The picket opens fire on the waders. Men and horses are swept away; Cornwallis's own horse is hit and dies after reaching the bank. Their guide has taken the Guards along the wagon ford rather than the horse ford, and they land away from the main defence.",
      at: { pick: [0, 0, 'firing'], gds: [-60, 120, 'moving'], dav: [80, -120, 'moving'] } },
    { time: '07:00', title: 'Davidson killed', conf: 'documented',
      text: "The Guards form on the bank and drive the militia back. General Davidson is killed riding to rally his men, and the militia scatter. The way across the Catawba is open, and the race to the Dan begins.",
      at: { gds: [0, -60, 'firing'], pick: [-150, -300, 'routed'], dav: [100, -400, 'routed'], brit: [0, 200, 'moving'] } },
  ],
};
