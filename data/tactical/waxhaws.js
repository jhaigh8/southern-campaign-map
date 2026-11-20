// Tactical reconstruction (approximate): Waxhaws (Buford's defeat), 29 May 1780. Format: see cowpens.js.
// Placement: origin is the battle's map location by the old road near the NC line (data/places.js). Buford was
// marching north-east and turned to face Tarleton coming up behind him. Positions schematic.
// Sources: Tarleton's Campaigns (1787); Dr. Robert Brownfield's account; Jim Piecuch, "Massacre or Myth?" (2010).
window.SC = window.SC || {};
SC.tactical = SC.tactical || {};

SC.tactical.waxhaws = {
  battle: 'waxhaws', title: 'Waxhaws', date: '29 May 1780', level: 'approximate',
  origin: 'waxhaws', facing: 210,
  camera: { at: [0, 100], zoom: 15.6, pitch: 52, bearing: 0, elev: 180 },
  sources: "After Tarleton (1787), Brownfield's account and Piecuch (2010). Site approximate; positions schematic.",
  people: {
    Tarleton: { id: 'tarleton' },
    Buford: { force: 'continental', full: 'Col. Abraham Buford, 3rd Virginia Detachment' },
  },
  units: {
    va:   { name: "Buford's Virginia Continentals", short: 'Buford', side: 'allied', force: 'continental', men: 380, type: 'line', w: 260, d: 20 },
    bag:  { name: 'Baggage, wagons and guns', short: 'Wagons', side: 'allied', force: 'continental', men: 40, type: 'artillery', w: 60, d: 20 },
    c:    { name: 'Legion cavalry (centre)', short: 'Legion (centre)', side: 'crown', force: 'loyalist', men: 100, type: 'cavalry', w: 60, d: 40 },
    r:    { name: 'Legion cavalry (right)', short: 'Legion (right)', side: 'crown', force: 'loyalist', men: 60, type: 'cavalry', w: 50, d: 40 },
    l:    { name: 'Legion cavalry and 17th Dragoons (left)', short: 'Tarleton (left)', side: 'crown', force: 'loyalist', men: 80, type: 'cavalry', w: 50, d: 40 },
  },
  phases: [
    { time: '15:00', title: 'Overtaken', conf: 'documented',
      text: "Buford's 380 Virginians, too late to help Charleston, are retreating to North Carolina. Tarleton has ridden 100 miles in 54 hours to catch them. Buford rejects a summons to surrender and forms a single line in an open wood, sending his wagons and guns on.",
      at: { va: [0, 0], bag: [0, -300, 'moving', 30], c: [0, 400], r: [-180, 380], l: [200, 380] } },
    { time: '15:15', title: 'Fire held too long', conf: 'documented',
      text: "Buford orders his men to hold their fire until the cavalry is only about ten yards away. One volley is not enough to stop horses at the gallop, and Tarleton's three-pronged charge smashes through the line.",
      at: { c: [0, 30, 'moving'], r: [-200, 60, 'moving'], l: [220, 50, 'moving'], va: [0, 0, 'firing'] },
      arrows: [{ side: 'crown', path: [[0, 380], [0, 50]] }, { side: 'crown', path: [[-180, 360], [-200, 80]] }, { side: 'crown', path: [[200, 360], [220, 70]] }] },
    { time: '15:20', title: '"Tarleton\'s quarter"', conf: 'disputed',
      text: "What happened next is disputed. Americans said their men were cut down while trying to surrender. Tarleton wrote that his horse was shot from under him as the white flag went up, and his men, thinking him killed, attacked in a fury. Of Buford's men about 113 were killed and 150 badly wounded; Tarleton lost about 17. \"Tarleton's quarter\" became a Patriot rallying cry.",
      at: { va: [0, -40, 'captured'], c: [0, -60], r: [-180, -40], l: [200, -50] } },
  ],
};
