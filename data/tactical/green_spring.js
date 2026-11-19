// Tactical reconstruction: Battle of Green Spring, 6 July 1781. Format: see cowpens.js.
//
// Placement:
//   - Cornwallis was crossing the James at the Jamestown ferry. Wayne came down from Green Spring
//     plantation (north) across a 400-yard causeway through the marshes, so the American line faced
//     south (~180 degrees). origin: the commonly given battlefield position (37.2350 N, 76.7850 W),
//     taken here as the front of Cornwallis's hidden line.
//   - Marsh sloping to the James lay on the British left (west) and marsh and ponds on their right.
//     The field has been altered and partly built over; positions follow the accounts, so "approximate".
//
// Main sources: Wayne's and Lafayette's letters; Cornwallis's report to Clinton; Tarleton's Campaigns
// (1787); Michael Cecere, "The Battle of Green Spring" (Journal of the American Revolution).
window.SC = window.SC || {};
SC.tactical = SC.tactical || {};

SC.tactical.green_spring = {
  battle: 'green_spring',
  title: 'Battle of Green Spring',
  date: '6 July 1781',
  level: 'approximate',
  origin: [-76.7850, 37.2350],
  facing: 180,
  camera: { at: [0, -250], zoom: 15.1, pitch: 55, bearing: 175, elev: 10 },
  sources: "After Wayne's and Lafayette's letters, Cornwallis's report, Tarleton (1787) and Cecere. Positions follow the accounts and are approximate; frontages exaggerated.",

  people: {
    Wayne: { id: 'wayne' },
    Lafayette: { id: 'lafayette' },
    Cornwallis: { id: 'cornwallis' },
    Tarleton: { id: 'tarleton' },
    Butler: { force: 'continental', full: 'Col. Richard Butler, Pennsylvania Line' },
    Humpton: { force: 'continental', full: 'Col. Richard Humpton, Pennsylvania Line' },
    Stewart: { force: 'continental', full: 'Col. Walter Stewart, Pennsylvania Line' },
    Mercer: { force: 'continental', full: 'Maj. John Francis Mercer, light infantry' },
    Call: { force: 'militia', full: 'Maj. Richard Call, Virginia riflemen' },
    Willis: { force: 'militia', full: 'Maj. John Willis, Virginia riflemen' },
  },

  units: {
    rifles: { name: "Willis's and Call's Virginia riflemen", short: 'Va. riflemen', side: 'allied', force: 'militia', men: 200, type: 'skirmish', w: 160, d: 14 },
    li:     { name: 'Continental light infantry (Mercer, Galvan, Wyllys)', short: 'Light infantry', side: 'allied', force: 'continental', men: 300, type: 'line', w: 140, d: 24 },
    pa_b:   { name: "Butler's Pennsylvania battalion", short: 'Butler (Pa.)', side: 'allied', force: 'continental', men: 200, type: 'line', w: 110, d: 24 },
    pa_h:   { name: "Humpton's Pennsylvania battalion", short: 'Humpton (Pa.)', side: 'allied', force: 'continental', men: 200, type: 'line', w: 110, d: 24 },
    pa_s:   { name: "Stewart's Pennsylvania battalion", short: 'Stewart (Pa.)', side: 'allied', force: 'continental', men: 150, type: 'line', w: 100, d: 24 },
    guns:   { name: 'Three field guns', short: 'Artillery', side: 'allied', force: 'continental', men: 40, type: 'artillery', w: 30, d: 18 },

    picket: { name: 'Jäger picket and Legion men posing as a rearguard', short: 'Picket', side: 'crown', force: 'british', men: 100, type: 'skirmish', w: 90, d: 14 },
    left:   { name: '76th and 80th Foot, part of the 43rd', short: '76th, 80th & 43rd', side: 'crown', force: 'british', men: 1100, type: 'line', w: 280, d: 30 },
    lil:    { name: 'Light infantry (left wing)', short: 'Light infantry', side: 'crown', force: 'british', men: 300, type: 'line', w: 110, d: 24 },
    guards: { name: 'Brigade of Guards', short: 'Guards', side: 'crown', force: 'british', men: 450, type: 'line', w: 160, d: 26 },
    germ:   { name: 'Hessian and Anspach regiments', short: 'Germans', side: 'crown', force: 'british', men: 800, type: 'line', w: 220, d: 28 },
    lir:    { name: 'Light infantry (right wing)', short: 'Light infantry', side: 'crown', force: 'british', men: 300, type: 'line', w: 110, d: 24 },
    legion: { name: "Tarleton's British Legion", short: 'Tarleton', side: 'crown', force: 'loyalist', men: 200, type: 'cavalry', w: 50, d: 50 },
  },

  notes: [
    { at: [0, -1250], text: 'Causeway north to Green Spring plantation' },
    { at: [560, 80], text: 'Marsh sloping to the James' },
    { at: [-560, 60], text: 'Marsh and ponds' },
    { at: [-150, 650], text: 'Jamestown ferry: the army "crossing"' },
  ],

  phases: [
    { time: '13:00', title: 'The bait', conf: 'documented',
      text: "Cornwallis is crossing the James at the Jamestown ferry, and deserters he has sent over tell Lafayette that most of the army is already across. Only a picket of jägers and Legion men is in sight. In fact nearly the whole British army, perhaps 5,000 men, lies hidden in two wings behind the woods. Wayne's advance, about 500 riflemen and light infantry, comes down the causeway.",
      at: {
        picket: [0, -260],
        left: [190, 20], lil: [420, 40], guards: [-110, 30], germ: [-320, 40], lir: [-520, 50], legion: [250, 200],
        rifles: [0, -900, 'moving', 90], li: [0, -1050, 'moving', 90],
      },
      arrows: [{ side: 'allied', path: [[0, -1250], [0, -950]] }] },

    { time: '15:00', title: 'A long skirmish', conf: 'documented',
      text: "For nearly two hours the riflemen skirmish with the picket in the marshy woods, picking off several British officers. The picket gives ground slowly, drawing them on. Lafayette, believing he faces only a rearguard, sends Butler's and Humpton's Pennsylvania battalions to join Wayne.",
      at: {
        rifles: [0, -330, 'firing'], li: [0, -480], picket: [0, -200, 'firing'],
        pa_b: [-80, -780, 'moving', 90], pa_h: [80, -880, 'moving', 90], guns: [0, -700, 'moving', 90],
      },
      arrows: [{ side: 'crown', path: [[0, -260], [0, -190]] }, { side: 'allied', path: [[0, -1100], [0, -800]] }] },

    { time: '17:00', title: 'The trap is sprung', conf: 'documented',
      text: "The Americans rush a British gun left in the road as bait. At once the hidden British lines rise and advance, overlapping Wayne at both ends, and their guns open with canister and grape. Wayne now has about 800 men against several thousand.",
      at: {
        rifles: [-60, -150, 'broken'], picket: [0, -80],
        li: [0, -260, 'firing'], pa_b: [-140, -280, 'firing'], pa_h: [140, -280, 'firing'], guns: [0, -330, 'firing'],
        left: [190, -120, 'moving'], lil: [400, -160, 'moving', -20], guards: [-110, -110, 'moving'], germ: [-320, -100, 'moving'], lir: [-500, -150, 'moving', 20],
      },
      arrows: [{ side: 'crown', path: [[420, 30], [380, -160]] }, { side: 'crown', path: [[-520, 40], [-480, -160]] }] },

    { time: '17:15', title: "Wayne's charge", conf: 'documented',
      text: "Retreat in the open would be fatal, so Wayne does the unexpected: he orders his little force to charge. The Pennsylvanians and light infantry fire a volley and go in with the bayonet, and the astonished British line checks long enough for Wayne to start pulling back. Lafayette, who has seen the trap from the riverbank, hurries forward troops to cover the retreat.",
      at: {
        li: [0, -170, 'firing'], pa_b: [-140, -190, 'firing'], pa_h: [140, -190, 'firing'], guns: [0, -240, 'firing'],
        left: [190, -90, 'broken'], guards: [-110, -80, 'broken'],
        pa_s: [0, -650, 'moving', 90],
      },
      arrows: [{ side: 'allied', path: [[0, -270], [0, -180]] }, { side: 'allied', path: [[-140, -290], [-140, -200]] }, { side: 'allied', path: [[140, -290], [140, -200]] }] },

    { time: '17:30', title: 'Back across the causeway', conf: 'documented',
      text: "Cornwallis leads a counter-charge himself and the American retreat starts to come apart. Two American guns are lost when their horses are shot, and Lafayette has a horse killed under him. But darkness is coming, and Cornwallis, wary of another trap, does not pursue across the causeway.",
      at: {
        guns: [0, -330, 'captured'],
        li: [0, -720, 'moving'], pa_b: [-90, -760, 'moving'], pa_h: [90, -800, 'moving'], rifles: [0, -900, 'routed'], pa_s: [0, -620],
        left: [180, -300, 'moving'], guards: [-100, -290, 'moving'], germ: [-300, -240], lil: [380, -260], lir: [-480, -250], legion: [220, -200, 'moving'],
      },
      arrows: [{ side: 'allied', path: [[0, -200], [0, -700]] }, { side: 'crown', path: [[150, -90], [170, -290]] }] },

    { time: '18:30', title: 'Escape', conf: 'documented',
      text: "Wayne's charge saved his command. The Americans lost about 28 killed and over 100 wounded; the British about 75 killed and wounded. Cornwallis finished crossing the James and marched for Portsmouth, and then, on Clinton's orders, to Yorktown.",
      at: {} },
  ],
};
