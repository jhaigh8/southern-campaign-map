// Tactical reconstruction (approximate): Weitzel's Mill, 6 March 1781. Format: see cowpens.js.
// Placement: origin is the battle's map location at the mill ford on Reedy Fork (data/places.js). Williams's light
// corps crossed to the north bank and held the ford; the British came from the south. Positions schematic.
// Sources: Otho Williams's and Lee's accounts; Buchanan (1997).
window.SC = window.SC || {};
SC.tactical = SC.tactical || {};

SC.tactical.weitzels_mill = {
  battle: 'weitzels_mill', title: "Weitzel's Mill", date: '6 March 1781', level: 'approximate', site: 'approximate',
  origin: 'weitzels_mill', facing: 180,
  camera: { at: [0, 120], zoom: 15.4, pitch: 52, bearing: 0, elev: 230 },
  sources: "After Williams's and Lee's accounts and Buchanan (1997). Site approximate; positions schematic.",
  people: {
    Greene: { id: 'greene' },
    Williams: { id: 'owilliams' }, Lee: { id: 'lee' }, Washington: { id: 'wwashington' },
    Cornwallis: { id: 'cornwallis' }, Tarleton: { id: 'tarleton' },
    Webster: { force: 'british', full: 'Lt. Col. James Webster' },
    Campbell: { force: 'militia', full: 'Col. William Campbell, Virginia riflemen' },
  },
  units: {
    rif:  { name: "Campbell's riflemen and militia (rearguard)", short: 'Riflemen', side: 'allied', force: 'militia', men: 300, type: 'skirmish', w: 160, d: 16 },
    lc:   { name: "Williams's light corps", short: 'Light corps (Williams)', side: 'allied', force: 'continental', men: 400, type: 'line', w: 160, d: 26 },
    cav:  { name: "Lee's and Washington's cavalry", short: 'Lee & Washington', side: 'allied', force: 'continental', men: 200, type: 'cavalry', w: 70, d: 40 },
    web:  { name: "Webster's advance (23rd, Guards light infantry, jägers)", short: 'Webster', side: 'crown', force: 'british', men: 600, type: 'line', w: 160, d: 30 },
    leg:  { name: "Tarleton's Legion", short: 'Tarleton', side: 'crown', force: 'loyalist', men: 200, type: 'cavalry', w: 60, d: 50 },
  },
  notes: [{ at: [0, 60], text: 'Reedy Fork and the mill ford' }],
  phases: [
    { time: '11:00', title: 'A race to the ford', conf: 'documented',
      text: "Cornwallis tries to catch Williams's light corps, screening Greene's army, before it can cross Reedy Fork. Williams gets over first and leaves riflemen and militia at the ford as a rearguard.",
      at: { lc: [0, -300], cav: [150, -350], rif: [0, -40], web: [0, 450, 'moving'], leg: [200, 500, 'moving'] } },
    { time: '11:30', title: 'Forcing the crossing', conf: 'documented',
      text: "Webster leads his men into the stream under fire; a party of riflemen fire repeatedly at him from close range and miss. The British push across, and the militia rearguard falls back through the light corps.",
      at: { web: [0, 20, 'firing'], rif: [-60, -220, 'moving'], lc: [0, -300, 'firing'] },
      arrows: [{ side: 'crown', path: [[0, 400], [0, 40]] }] },
    { time: '12:00', title: 'Williams gets away', conf: 'documented',
      text: "With the light corps and cavalry covering, Williams withdraws in good order. Each side lost 20 to 30 men. Greene, now reinforced, chose to fight at Guilford Courthouse nine days later.",
      at: { lc: [0, -700, 'moving'], cav: [150, -650, 'moving'], rif: [-80, -800, 'moving'], web: [0, -150], leg: [200, 0] } },
  ],
};
