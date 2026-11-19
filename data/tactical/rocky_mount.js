// Tactical reconstruction (approximate): Battle of Rocky Mount, 1 August 1780. Format: see cowpens.js.
// Placement: origin is the battle's map location by the Catawba (data/places.js). The post was three log
// buildings in a cleared area on a hill, with an abatis. Positions schematic.
// Sources: Sumter's and Turnbull's reports; Robert D. Bass, Gamecock (1961).
window.SC = window.SC || {};
SC.tactical = SC.tactical || {};

SC.tactical.rocky_mount = {
  battle: 'rocky_mount', title: 'Rocky Mount', date: '1 August 1780', level: 'approximate',
  origin: 'rocky_mount', facing: 90,
  camera: { at: [-60, 0], zoom: 15.9, pitch: 52, bearing: 80, elev: 150 },
  sources: "After Sumter's and Turnbull's reports and Bass (1961). Site approximate; positions schematic.",
  people: {
    Sumter: { id: 'sumter' },
    Turnbull: { force: 'loyalist', full: 'Lt. Col. George Turnbull, New York Volunteers' },
  },
  units: {
    nyv:  { name: "Turnbull's New York Volunteers and Loyalist militia", short: 'Turnbull', side: 'crown', force: 'loyalist', men: 300, type: 'line', w: 60, d: 50 },
    sum:  { name: "Sumter's South Carolina militia", short: 'Sumter', side: 'allied', force: 'militia', men: 600, type: 'skirmish', w: 240, d: 18 },
  },
  works: [
    { kind: 'fort', side: 'crown', h: 6, path: [[-20, -10], [0, -10], [0, 10], [-20, 10]] },
    { kind: 'fort', side: 'crown', h: 6, path: [[10, -30], [30, -30], [30, -10], [10, -10]] },
    { kind: 'fort', side: 'crown', h: 6, path: [[10, 15], [30, 15], [30, 35], [10, 35]] },
    { kind: 'trench', side: 'crown', path: [[-60, -60], [60, -60], [60, 60], [-60, 60], [-60, -60]] },
  ],
  phases: [
    { time: '10:00', title: 'An attack on log houses', conf: 'documented',
      text: "Sumter attacks the British outpost at Rocky Mount, three loopholed log buildings ringed by an abatis and held by Turnbull's New York Volunteers and Loyalist militia. His men drive in the outlying defenders but cannot break into the houses.",
      at: { nyv: [0, 0, 'firing'], sum: [0, -200, 'firing'] },
      arrows: [{ side: 'allied', path: [[0, -260], [0, -90]] }] },
    { time: '12:00', title: 'Fire, and rain', conf: 'documented',
      text: "The Patriots push a wagon of burning brush against a building, but a sudden downpour puts out the fire. After hours of fighting, without artillery, Sumter withdraws. Losses were light on both sides. Five days later he struck again at Hanging Rock.",
      at: { sum: [0, -400, 'moving'], nyv: [0, 0] } },
  ],
};
