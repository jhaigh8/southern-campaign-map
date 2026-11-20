// Tactical reconstruction (approximate): Battle of Brier Creek, 3 March 1779. Format: see cowpens.js.
// Placement: origin is the battle's map location near the mouth of Brier Creek on the Savannah River
// (data/places.js). Ashe's camp lay between the creek and the river; Prevost came round from the west.
// Positions schematic. Sources: Ashe's court of inquiry; Prevost's report; LAMAR Institute archaeology (2018-20).
window.SC = window.SC || {};
SC.tactical = SC.tactical || {};

SC.tactical.brier_creek = {
  battle: 'brier_creek', title: 'Battle of Brier Creek', date: '3 March 1779', level: 'approximate', site: 'approximate',
  origin: 'brier_creek', facing: 270,
  camera: { at: [0, 150], zoom: 15.0, pitch: 52, bearing: 0, elev: 30 },
  sources: "After Ashe's court of inquiry, Prevost's report and the LAMAR Institute archaeology. Site approximate; positions schematic.",
  people: {
    Ashe: { force: 'militia', full: 'Brig. Gen. John Ashe, North Carolina militia' },
    Elbert: { force: 'continental', full: 'Col. Samuel Elbert, Georgia Continentals (captured)' },
    Prevost: { force: 'british', full: 'Lt. Col. Mark Prevost, brother of the British commander' },
  },
  units: {
    nc_l: { name: 'North Carolina militia (left)', short: 'N.C. militia', side: 'allied', force: 'militia', men: 500, type: 'line', w: 200, d: 24 },
    nc_r: { name: 'North Carolina militia (right)', short: 'N.C. militia', side: 'allied', force: 'militia', men: 500, type: 'line', w: 200, d: 24 },
    elb:  { name: "Elbert's Georgia Continentals", short: 'Elbert', side: 'allied', force: 'continental', men: 100, type: 'line', w: 70, d: 24 },
    br:   { name: "Prevost's column: 71st, light infantry, grenadiers", short: 'Prevost', side: 'crown', force: 'british', men: 900, type: 'line', w: 300, d: 30 },
    lc:   { name: 'Loyalist cavalry', short: 'Loyalist horse', side: 'crown', force: 'loyalist', men: 150, type: 'cavalry', w: 50, d: 40 },
    feint:{ name: 'Feint at the burned bridge', short: 'Feint', side: 'crown', force: 'british', men: 200, type: 'line', w: 80, d: 24 },
  },
  notes: [{ at: [-200, -500], text: 'Savannah River' }, { at: [700, 100], text: 'Brier Creek: bridge burned' }],
  phases: [
    { time: 'Morning', title: 'The camp at the creek mouth', conf: 'documented',
      text: "Ashe's 1,300 North Carolina militia and a few Georgia Continentals are camped between Brier Creek and the Savannah River, feeling safe behind the creek, whose bridge the British have burned. Meanwhile Mark Prevost has led 900 men on a 50-mile loop to come at them from inland.",
      at: { nc_l: [-150, -200], nc_r: [150, -200], elb: [0, -120], feint: [700, 0, 'firing'], br: [0, 900, 'moving', 90], lc: [300, 1000, 'moving', 90] },
      arrows: [{ side: 'crown', path: [[600, 1300], [200, 1100], [0, 900]] }] },
    { time: '15:00', title: 'Attack from the rear', conf: 'documented',
      text: "Ashe hurries his men into line, but they are short of cartridges. The British open with artillery and advance with the bayonet; the militia on the right break almost at once, and those on the left follow.",
      at: { br: [0, 150, 'firing'], lc: [380, 220, 'moving'], nc_l: [-180, -20, 'broken'], nc_r: [180, -20, 'routed'], elb: [0, 10, 'firing'] } },
    { time: '15:30', title: "Elbert's last stand", conf: 'documented',
      text: "Elbert's Georgians fight on until they are surrounded; Elbert is wounded and captured, saved, it is said, by a Masonic sign to a British officer. Militia fleeing into the swamps and the river drown in large numbers.",
      at: { elb: [0, 0, 'captured'], nc_l: [-300, -450, 'routed'], nc_r: [200, -500, 'routed'], br: [0, 30, 'moving'], lc: [200, -200, 'moving'] },
      arrows: [{ side: 'allied', path: [[0, -100], [-200, -450]] }] },
    { time: '16:00', title: 'A rout', conf: 'documented',
      text: "About 150 Americans were killed or drowned and over 200 captured; the British lost about 16. The defeat ended American hopes of retaking Georgia that spring.",
      at: {} },
  ],
};
