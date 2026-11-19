// Tactical reconstruction (approximate): Pyle's Defeat, 25 February 1781. Format: see cowpens.js.
// Placement: origin is the battle's map location on the road near the Haw River (data/places.js). Positions
// schematic. Sources: Henry Lee's Memoirs; Pickens's account; archaeology at the site (2016).
window.SC = window.SC || {};
SC.tactical = SC.tactical || {};

SC.tactical.pyles = {
  battle: 'pyles', title: "Pyle's Defeat", date: '25 February 1781', level: 'approximate',
  origin: 'pyles', facing: 90,
  camera: { at: [0, 0], zoom: 15.6, pitch: 52, bearing: 0, elev: 180 },
  sources: "After Lee's Memoirs, Pickens's account and the site archaeology. Site approximate; positions schematic.",
  people: {
    Lee: { id: 'lee' }, Pickens: { id: 'pickens' }, Tarleton: { id: 'tarleton' },
    Pyle: { force: 'loyalist', full: 'Col. John Pyle, Loyalist militia (wounded)' },
  },
  units: {
    leg:  { name: "Lee's Legion cavalry", short: "Lee's Legion", side: 'allied', force: 'continental', men: 150, type: 'cavalry', w: 30, d: 220 },
    pick: { name: "Pickens's militia (following)", short: 'Pickens', side: 'allied', force: 'militia', men: 300, type: 'skirmish', w: 30, d: 200 },
    pyle: { name: "Pyle's Loyalists, lined up along the road", short: 'Pyle', side: 'crown', force: 'loyalist', men: 400, type: 'line', w: 30, d: 360 },
  },
  phases: [
    { time: '13:00', title: 'Mistaken identity', conf: 'documented',
      text: "Pyle's 400 Loyalists, riding to join Cornwallis, meet Lee's Legion, whose green jackets look like Tarleton's. Lee plays along and rides slowly past their column, meaning to get alongside and demand their surrender.",
      at: { pyle: [40, 0], leg: [-10, -280, 'moving'], pick: [-10, -560, 'moving'] },
      arrows: [{ side: 'allied', path: [[-10, -400], [-10, 150]] }] },
    { time: '13:10', title: 'Massacre on the road', conf: 'disputed',
      text: "Some of Pickens's militia at the rear of the column are recognised, and shots are fired. Lee's men turn and cut into the Loyalists, who still think there has been a mistake. About 90 are killed and many wounded in minutes; Lee loses none. Accounts differ on who fired first.",
      at: { leg: [-10, 0, 'moving'], pick: [-10, -220, 'firing'], pyle: [80, 0, 'routed'] } },
  ],
};
