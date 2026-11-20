// Tactical reconstruction (approximate): Battle of Stono Ferry, 20 June 1779. Format: see cowpens.js.
// Placement: origin is the battle's map location by the Stono River (data/places.js). Maitland's three
// redoubts and abatis covered the ferry; Lincoln attacked from the mainland side. Positions schematic.
// Sources: Lincoln's report; Moultrie's Memoirs; David K. Wilson, The Southern Strategy (2005).
window.SC = window.SC || {};
SC.tactical = SC.tactical || {};

SC.tactical.stono_ferry = {
  battle: 'stono_ferry', title: 'Battle of Stono Ferry', date: '20 June 1779', level: 'approximate', site: 'approximate',
  origin: 'stono_ferry', facing: 180,
  camera: { at: [0, -150], zoom: 15.2, pitch: 52, bearing: 0, elev: 5 },
  sources: "After Lincoln's report, Moultrie's Memoirs and Wilson (2005). Site approximate; positions and works schematic.",
  people: {
    Lincoln: { id: 'lincoln' }, Maitland: { force: 'british', full: 'Lt. Col. John Maitland, 71st Highlanders' },
  },
  units: {
    cont: { name: 'Continentals (right wing)', short: 'Continentals', side: 'allied', force: 'continental', men: 600, type: 'line', w: 240, d: 26 },
    mil:  { name: 'North and South Carolina militia (left wing)', short: 'Militia', side: 'allied', force: 'militia', men: 600, type: 'line', w: 240, d: 26 },
    h71:  { name: '71st Highlanders', short: '71st', side: 'crown', force: 'british', men: 400, type: 'line', w: 120, d: 24 },
    hess: { name: 'Hessian regiment von Trümbach', short: 'Hessians', side: 'crown', force: 'british', men: 300, type: 'line', w: 110, d: 24 },
    prov: { name: 'Provincials (North and South Carolina Loyalists)', short: 'Loyalists', side: 'crown', force: 'loyalist', men: 200, type: 'line', w: 100, d: 24 },
  },
  works: [
    { kind: 'redoubt', side: 'crown', path: [[-170, 10], [-130, 10], [-130, 50], [-170, 50]] },
    { kind: 'redoubt', side: 'crown', path: [[-20, 20], [20, 20], [20, 60], [-20, 60]] },
    { kind: 'redoubt', side: 'crown', path: [[130, 10], [170, 10], [170, 50], [130, 50]] },
    { kind: 'trench', side: 'crown', path: [[-260, -20], [260, -20]] },
  ],
  notes: [{ at: [0, 400], text: 'Stono River and the ferry to James Island' }],
  phases: [
    { time: '07:00', title: 'Lincoln attacks the bridgehead', conf: 'documented',
      text: "The British army is withdrawing from its raid on Charleston, and Maitland holds the Stono Ferry crossing with about 900 men in three redoubts behind an abatis. Lincoln attacks at dawn with about 1,200: Continentals on the right, militia on the left.",
      at: { h71: [0, 40], hess: [-150, 30], prov: [150, 30], cont: [150, -450, 'moving'], mil: [-150, -450, 'moving'] },
      arrows: [{ side: 'allied', path: [[150, -600], [150, -300]] }, { side: 'allied', path: [[-150, -600], [-150, -300]] }] },
    { time: '07:30', title: 'An hour of close fighting', conf: 'documented',
      text: "Instead of charging, the Americans halt and trade fire with the defenders. The Hessians on one flank give ground and a Highlander counter-attack is beaten off, but the redoubts hold.",
      at: { cont: [150, -100, 'firing'], mil: [-150, -100, 'firing'], h71: [0, 20, 'firing'], hess: [-150, 0, 'broken'], prov: [150, 20, 'firing'] } },
    { time: '08:30', title: 'Reinforcements; Lincoln withdraws', conf: 'documented',
      text: "British reinforcements start crossing from James Island, and Lincoln orders a retreat, covered by his cavalry. Each side lost roughly 150 killed and wounded. Days later the British abandoned the post anyway.",
      at: { cont: [150, -500, 'moving'], mil: [-150, -520, 'moving'], hess: [-150, 30], h71: [0, 40] },
      arrows: [{ side: 'allied', path: [[0, -150], [0, -550]] }] },
  ],
};
