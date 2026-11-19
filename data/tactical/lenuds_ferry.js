// Tactical reconstruction (approximate): Lenud's Ferry, 6 May 1780. Format: see cowpens.js.
// Placement: origin is the battle's map location at the ferry over the Santee (data/places.js). Positions
// schematic. Sources: Tarleton's Campaigns (1787); Borick, A Gallant Defense (2003).
window.SC = window.SC || {};
SC.tactical = SC.tactical || {};

SC.tactical.lenuds_ferry = {
  battle: 'lenuds_ferry', title: "Lenud's Ferry", date: '6 May 1780', level: 'approximate',
  origin: 'lenuds_ferry', facing: 200,
  camera: { at: [0, 100], zoom: 15.4, pitch: 52, bearing: 200, elev: 5 },
  sources: "After Tarleton's Campaigns and Borick (2003). Site approximate; positions schematic.",
  people: {
    Tarleton: { id: 'tarleton' }, Washington: { id: 'wwashington' },
    White: { force: 'continental', full: 'Col. Anthony Walton White, Continental dragoons' },
  },
  units: {
    cav:  { name: "White's and Washington's Continental dragoons", short: 'White & Washington', side: 'allied', force: 'continental', men: 350, type: 'cavalry', w: 100, d: 50 },
    leg:  { name: "Tarleton's British Legion", short: 'Tarleton', side: 'crown', force: 'loyalist', men: 150, type: 'cavalry', w: 50, d: 60 },
  },
  notes: [{ at: [0, -250], text: 'Santee River' }],
  phases: [
    { time: '15:00', title: 'Resting at the ferry', conf: 'documented',
      text: "The rebuilt American cavalry under White and Washington have raided a British foraging party and fallen back to Lenud's Ferry on the Santee, waiting for boats to cross with their prisoners. Their horses are unsaddled.",
      at: { cav: [0, -100], leg: [0, 800, 'moving', 90] } },
    { time: '15:30', title: 'Tarleton again', conf: 'documented',
      text: "Tarleton's Legion, tipped off by a Loyalist, charges into the camp. The Americans are routed for the second time in three weeks; many swim the river, and some drown. About 40 were killed or wounded and 67 captured, and the British prisoners were freed.",
      at: { leg: [0, -60, 'moving'], cav: [150, -320, 'routed'] },
      arrows: [{ side: 'crown', path: [[0, 750], [0, 200], [0, -30]] }] },
  ],
};
