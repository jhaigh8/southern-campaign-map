// Tactical reconstruction (approximate): Battle of Hanging Rock, 6 August 1780. Format: see cowpens.js.
// Placement: origin is the battle's map location by Hanging Rock Creek (data/places.js). The British camp was
// spread in three parts; Sumter came from the north-west. Positions schematic.
// Sources: William R. Davie's account; Bass, Gamecock (1961); Buchanan (1997).
window.SC = window.SC || {};
SC.tactical = SC.tactical || {};

SC.tactical.hanging_rock = {
  battle: 'hanging_rock', title: 'Battle of Hanging Rock', date: '6 August 1780', level: 'approximate',
  origin: 'hanging_rock', facing: 120,
  camera: { at: [0, 100], zoom: 15.3, pitch: 52, bearing: 0, elev: 150 },
  sources: "After Davie's account, Bass (1961) and Buchanan (1997). Site approximate; positions schematic.",
  people: {
    Bryan: { force: 'loyalist', full: 'Col. Samuel Bryan, North Carolina Loyalists' },
    Sumter: { id: 'sumter' },
    Davie: { force: 'militia', full: 'Maj. William R. Davie, North Carolina mounted troops' },
    'Andrew Jackson': { force: 'militia', full: 'Andrew Jackson, aged 13, a militia messenger' },
  },
  units: {
    sum:  { name: "Sumter's South Carolina militia", short: 'Sumter', side: 'allied', force: 'militia', men: 500, type: 'skirmish', w: 220, d: 18 },
    dav:  { name: "Davie's North Carolinians", short: 'Davie', side: 'allied', force: 'militia', men: 300, type: 'skirmish', w: 160, d: 18 },
    bry:  { name: "Bryan's North Carolina Loyalists", short: 'Bryan\'s Loyalists', side: 'crown', force: 'loyalist', men: 500, type: 'line', w: 160, d: 30 },
    pwa:  { name: "Prince of Wales's American Regiment", short: "Prince of Wales's Regt", side: 'crown', force: 'loyalist', men: 300, type: 'line', w: 120, d: 26 },
    leg:  { name: 'British Legion infantry', short: 'Legion infantry', side: 'crown', force: 'loyalist', men: 160, type: 'line', w: 80, d: 26 },
  },
  phases: [
    { time: '07:00', title: 'Sumter attacks', conf: 'documented',
      text: "Sumter and Davie, with about 800 men, attack the British post at Hanging Rock, held by about 1,400 Loyalists in three camps. Coming in on the wrong side after their guides lead them astray, they fall on Bryan's North Carolina Loyalists, who flee.",
      at: { bry: [-200, 250], pwa: [50, 300], leg: [250, 350], sum: [-100, -100, 'moving'], dav: [150, -80, 'moving'] },
      arrows: [{ side: 'allied', path: [[-100, -200], [-200, 200]] }] },
    { time: '07:30', title: 'The camp overrun', conf: 'documented',
      text: "The Prince of Wales's Regiment and the Legion infantry counter-attack and are shot down from the cover of the woods. The Patriots sweep through the camp. Among them is 13-year-old Andrew Jackson.",
      at: { bry: [-350, 450, 'routed'], pwa: [40, 280, 'broken'], leg: [240, 320, 'firing'], sum: [-80, 220, 'firing'], dav: [150, 200, 'firing'] } },
    { time: '09:00', title: 'Rum and a hollow square', conf: 'documented',
      text: "Victory slips away as Sumter's men loot the camp and its rum. The surviving British form a hollow square with two field guns that cannot be broken. In the heat, out of ammunition, Sumter pulls back. The Loyalists lost about 200 killed and wounded; the Patriots about 50.",
      at: { pwa: [150, 400, 'firing', 0, 70, 70], leg: [230, 420, 'firing', 0, 60, 60], sum: [-80, 100, 'broken'], dav: [150, 60, 'moving'] } },
  ],
};
