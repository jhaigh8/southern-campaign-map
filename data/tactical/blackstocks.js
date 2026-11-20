// Tactical reconstruction (approximate): Battle of Blackstock's Plantation, 20 November 1780. Format: see cowpens.js.
// Placement: origin is the battle's map location on the Tyger River (data/places.js). Sumter held a hill with
// log farm buildings; Tarleton came from the south-east. Positions schematic.
// Sources: Tarleton's Campaigns (1787); Bass, Gamecock (1961); Blackstock's battlefield interpretation.
window.SC = window.SC || {};
SC.tactical = SC.tactical || {};

SC.tactical.blackstocks = {
  battle: 'blackstocks', title: "Blackstock's Plantation", date: '20 November 1780', level: 'approximate',
  origin: 'blackstocks', facing: 140,
  camera: { at: [0, 80], zoom: 15.5, pitch: 52, bearing: 0, elev: 140 },
  sources: "After Tarleton (1787), Bass (1961) and the battlefield site. Site approximate; positions schematic.",
  people: {
    Sumter: { id: 'sumter' }, Tarleton: { id: 'tarleton' },
    Money: { force: 'british', full: 'Maj. John Money, 63rd Foot (mortally wounded)' },
  },
  units: {
    sum:  { name: "Sumter's militia around the buildings", short: 'Sumter', side: 'allied', force: 'militia', men: 600, type: 'skirmish', w: 220, d: 30 },
    f63:  { name: '63rd Foot (mounted infantry)', short: '63rd', side: 'crown', force: 'british', men: 200, type: 'line', w: 90, d: 26 },
    leg:  { name: 'British Legion dragoons', short: 'Tarleton', side: 'crown', force: 'loyalist', men: 170, type: 'cavalry', w: 60, d: 50 },
  },
  notes: [{ at: [0, -300], text: 'Tyger River' }],
  phases: [
    { time: '16:00', title: 'Sumter turns at bay', conf: 'documented',
      text: "Chased by Tarleton, Sumter stops at Blackstock's farm on a hill above the Tyger River, his men in and around the log buildings. Tarleton has outridden his infantry and guns and has only about 270 men with him.",
      at: { sum: [0, 0], f63: [-40, 400, 'moving'], leg: [100, 500, 'moving'] } },
    { time: '16:30', title: 'The 63rd shot down', conf: 'documented',
      text: "Tarleton attacks anyway. The dismounted 63rd go up the slope into a heavy fire; their commander, Major Money, falls mortally wounded. Tarleton's dragoons charge up the road toward the buildings and are shot from their saddles.",
      at: { f63: [-40, 150, 'broken'], leg: [100, 120, 'routed'], sum: [0, 0, 'firing'] },
      arrows: [{ side: 'crown', path: [[-40, 380], [-40, 170]] }, { side: 'crown', path: [[100, 480], [100, 140]] }] },
    { time: '17:30', title: 'Both claim victory', conf: 'disputed',
      text: "Tarleton draws off. Sumter, badly wounded in the shoulder, has his men carry him away across the river that night, so Tarleton claimed the field. British losses were about 50 by Tarleton's count, far more by the Americans'; the Patriots lost 3 killed and 4 wounded. It was the first time Tarleton had been beaten.",
      at: { f63: [-40, 450], leg: [100, 550], sum: [0, -400, 'moving'] } },
  ],
};
