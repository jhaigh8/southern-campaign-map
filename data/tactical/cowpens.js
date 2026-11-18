// Tactical reconstruction: Battle of Cowpens, 17 January 1781.
//
// Coordinates are local metres in a frame anchored on the battlefield:
//   origin : centre of the Continental (main) line, on the Green River Road trace
//   facing : compass bearing the American line faced (toward Tarleton's approach)
//   x      : metres toward the American right flank;  y : metres toward the enemy
// Unit positions per phase: [x, y, state?, rotationDeg?, width?, depth?]
//   state : formed | firing | moving | broken | routed | captured   (default formed)
//   A unit missing from a phase keeps its last position; a unit not yet listed is hidden.
// Blocks are schematic: frontages and depths are exaggerated so units read clearly from the air.
//
// Main sources: Lawrence E. Babits, A Devil of a Whipping (1998); Babits & Howard;
// NPS Cowpens National Battlefield; Morgan's and Tarleton's own accounts.
window.SC = window.SC || {};
SC.tactical = SC.tactical || {};

SC.tactical.cowpens = {
  battle: 'cowpens',
  title: 'Battle of Cowpens',
  date: '17 January 1781',
  origin: [-81.81639, 35.13777],
  facing: 158,
  camera: { at: [20, 130], zoom: 15.2, pitch: 56, bearing: 150, elev: 290 },  // elev: ground height (m) at the battlefield
  sources: 'After Babits, A Devil of a Whipping (1998), and the National Park Service. Positions are approximate and frontages exaggerated.',

  units: {
    // ---- American ----
    sk_l:   { name: 'Riflemen (left)', short: 'Riflemen', side: 'allied', force: 'militia', men: 75, type: 'skirmish', w: 130, d: 12 },
    sk_r:   { name: 'Riflemen (right)', short: 'Riflemen', side: 'allied', force: 'militia', men: 75, type: 'skirmish', w: 130, d: 12 },
    mil_l:  { name: "Pickens's militia (left)", short: 'Militia', side: 'allied', force: 'militia', men: 150, type: 'line', w: 160, d: 22 },
    mil_r:  { name: "Pickens's militia (right)", short: 'Militia', side: 'allied', force: 'militia', men: 150, type: 'line', w: 160, d: 22 },
    va_l:   { name: 'Virginia & Georgia men (left)', short: 'Va. & Ga.', side: 'allied', force: 'militia', men: 120, type: 'line', w: 90, d: 24 },
    cont:   { name: "Howard's Maryland & Delaware Continentals", short: 'Howard', side: 'allied', force: 'continental', men: 280, type: 'line', w: 170, d: 26 },
    va_r:   { name: 'Virginia companies (right flank)', short: 'Va. companies', side: 'allied', force: 'militia', men: 120, type: 'line', w: 80, d: 24 },
    cav:    { name: "Washington's Continental dragoons", short: 'Washington', side: 'allied', force: 'continental', men: 82, type: 'cavalry', w: 50, d: 40 },
    mcall:  { name: "McCall's mounted militia", short: 'McCall', side: 'allied', force: 'militia', men: 45, type: 'cavalry', w: 40, d: 32 },

    // ---- British ----
    li:     { name: 'Light infantry companies', short: 'Light infantry', side: 'crown', force: 'british', men: 200, type: 'line', w: 120, d: 24 },
    gun1:   { name: '3-pounder', label: false, side: 'crown', force: 'british', men: 12, type: 'artillery', w: 16, d: 16 },
    legion: { name: 'British Legion infantry', short: 'Legion infantry', side: 'crown', force: 'loyalist', men: 200, type: 'line', w: 120, d: 24 },
    gun2:   { name: '3-pounder', label: false, side: 'crown', force: 'british', men: 12, type: 'artillery', w: 16, d: 16 },
    f7:     { name: '7th Foot (Royal Fusiliers)', short: '7th Foot', side: 'crown', force: 'british', men: 170, type: 'line', w: 110, d: 24 },
    dr_r:   { name: '17th Light Dragoons', short: '17th Dragoons', side: 'crown', force: 'british', men: 50, type: 'cavalry', w: 40, d: 34 },
    dr_l:   { name: 'Legion dragoons', short: 'Legion dragoons', side: 'crown', force: 'loyalist', men: 50, type: 'cavalry', w: 40, d: 34 },
    h71:    { name: '71st Highlanders (1st Bn)', short: '71st Highlanders', side: 'crown', force: 'british', men: 250, type: 'line', w: 120, d: 26 },
    rescav: { name: 'Legion cavalry reserve (Tarleton)', short: 'Tarleton', side: 'crown', force: 'loyalist', men: 200, type: 'cavalry', w: 70, d: 50 },
  },

  // Fixed map annotations
  road: [[0, -1300], [0, 1700]],
  notes: [
    { at: [0, -950], text: 'To the Broad River, ~6 miles' },
    { at: [-90, -560], text: "Morgan's camp and horse lines (swale)" },
    { at: [150, -430], text: 'Second rise: the cavalry waits out of sight' },
    { at: [360, -90], text: 'First rise: the main line' },
    { at: [0, 1580], text: 'Green River Road: Tarleton marched from Thicketty Creek' },
  ],

  phases: [
    { time: '06:30', title: "Morgan's three lines", conf: 'documented',
      text: 'Morgan waits on two gentle rises in an open pasture with the flooded Broad River behind him, so the militia cannot run far. Riflemen are out in front, then Pickens\'s militia, then Howard\'s Continentals on the first rise. Washington\'s cavalry is hidden behind the second rise. Tarleton\'s column, marching since 2 a.m., comes up the Green River Road.',
      at: {
        sk_l: [-150, 300], sk_r: [150, 300],
        mil_l: [-110, 150], mil_r: [110, 150],
        va_l: [-165, 0], cont: [0, 0], va_r: [140, 0],
        cav: [-60, -400], mcall: [-130, -410],
        dr_r: [-14, 1000, 'moving', 90], dr_l: [14, 1000, 'moving', 90],
        li: [0, 1110, 'moving', 90], gun1: [0, 1190, 'moving'], legion: [0, 1270, 'moving', 90],
        gun2: [0, 1350, 'moving'], f7: [0, 1430, 'moving', 90], h71: [0, 1580, 'moving', 90],
        rescav: [0, 1720, 'moving', 90],
      } },

    { time: '06:45', title: 'Tarleton deploys at once', conf: 'documented',
      text: 'Without waiting for his whole force to come up, Tarleton forms line about 400 yards from the riflemen: light infantry on his right, the Legion infantry in the centre and the 7th Foot on his left, with two small 3-pounders between them and 50 dragoons on each flank. The 71st Highlanders and about 200 Legion horse stay in reserve.',
      at: {
        li: [-200, 700], gun1: [-115, 700], legion: [-20, 700], gun2: [65, 700], f7: [150, 700],
        dr_r: [-320, 705], dr_l: [290, 705],
        h71: [250, 870], rescav: [-40, 900],
      },
      arrows: [{ side: 'crown', path: [[0, 1150], [0, 900], [-150, 760]] }, { side: 'crown', path: [[0, 1300], [80, 900], [150, 760]] }] },

    { time: '06:55', title: 'The riflemen empty saddles', conf: 'documented',
      text: 'Tarleton sends dragoons to drive in the skirmishers. Firing from behind trees, the riflemen aim for the horsemen and officers, and about 15 dragoons fall. The dragoons pull back.',
      at: { sk_l: [-150, 300, 'firing'], sk_r: [150, 300, 'firing'], dr_r: [-200, 390, 'moving'] },
      arrows: [{ side: 'crown', path: [[-320, 690], [-260, 520], [-210, 410]] }] },

    { time: '07:00', title: 'The British line advances', conf: 'documented',
      text: 'The British infantry advances with a shout, drums beating. The riflemen fall back, firing as they go, and join the militia line.',
      at: {
        sk_l: [-175, 175, 'moving'], sk_r: [175, 175, 'moving'],
        dr_r: [-340, 560, 'broken'],
        li: [-200, 360, 'moving'], gun1: [-115, 420, 'firing'], legion: [-20, 360, 'moving'], gun2: [65, 420, 'firing'], f7: [150, 360, 'moving'],
        dr_l: [290, 380, 'moving'],
      },
      arrows: [{ side: 'crown', path: [[-20, 680], [-20, 390]] }, { side: 'allied', path: [[-150, 290], [-170, 190]] }, { side: 'allied', path: [[150, 290], [170, 190]] }] },

    { time: '07:02', title: '"Two fires"', conf: 'documented',
      text: 'Morgan has asked the militia for only two volleys. At about 50 yards they fire, aiming at the epaulettes, and many British officers go down. They reload and fire again.',
      at: {
        mil_l: [-110, 150, 'firing'], mil_r: [110, 150, 'firing'], sk_l: [-175, 175, 'firing'], sk_r: [175, 175, 'firing'],
        li: [-200, 215, 'broken'], legion: [-20, 215, 'broken'], f7: [150, 215, 'broken'],
      } },

    { time: '07:05', title: 'The militia file off to the left', conf: 'probable',
      text: 'As planned, the militia break off and head for the rear around the left end of the Continental line. The British take it for a rout. The 17th Light Dragoons on Tarleton\'s right gallop after them and begin cutting men down.',
      at: {
        mil_l: [-330, -150, 'moving'], mil_r: [-230, -280, 'moving'],
        sk_l: [-380, -50, 'moving'], sk_r: [-280, -320, 'moving'],
        dr_r: [-300, 0, 'moving'],
        li: [-200, 160, 'moving'], legion: [-20, 160, 'moving'], f7: [150, 160, 'moving'],
      },
      arrows: [{ side: 'allied', path: [[0, 150], [-260, 90], [-320, -120]] }, { side: 'crown', path: [[-340, 540], [-330, 250], [-300, 30]] }] },

    { time: '07:08', title: "Washington's charge", conf: 'documented',
      text: 'Washington\'s dragoons and McCall\'s mounted militia come over the second rise and crash into the scattered British horsemen, who lose about 18 men and flee. The militia rally behind the hill.',
      at: {
        cav: [-290, 20, 'moving'], mcall: [-235, -30, 'moving'],
        dr_r: [-430, 470, 'routed'],
        mil_l: [-200, -360], mil_r: [-80, -390], sk_l: [-300, -360], sk_r: [20, -400],
      },
      arrows: [{ side: 'allied', path: [[-60, -390], [-260, -200], [-290, 0]] }] },

    { time: '07:12', title: 'The main lines meet', conf: 'documented',
      text: 'The British line reaches the Continentals on the first rise. Both sides exchange volleys at short range, and the British guns fire canister. Washington\'s cavalry falls back to re-form.',
      at: {
        va_l: [-165, 0, 'firing'], cont: [0, 0, 'firing'], va_r: [140, 0, 'firing'],
        li: [-200, 75, 'firing'], legion: [-20, 75, 'firing'], f7: [150, 75, 'firing'],
        gun1: [-115, 150, 'firing'], gun2: [65, 150, 'firing'],
        cav: [-300, -290], mcall: [-370, -300],
      } },

    { time: '07:18', title: 'Tarleton commits the Highlanders', conf: 'documented',
      text: 'To break the deadlock, Tarleton sends the 71st Highlanders around his left, with their pipes playing, to overlap the American right flank. The Legion dragoons move up beside them.',
      at: { h71: [300, 95, 'moving'], dr_l: [410, 160, 'moving'] },
      arrows: [{ side: 'crown', path: [[250, 850], [320, 450], [300, 120]] }] },

    { time: '07:22', title: 'A misunderstood order', conf: 'documented',
      text: 'Howard orders the right-flank company to turn and face the Highlanders. In the noise it is taken as an order to retreat, and the companies beside it follow. The whole line faces about and walks back in good order. The British think the Americans are breaking and rush forward, losing their formation.',
      at: {
        va_l: [-165, -100, 'moving'], cont: [0, -100, 'moving'], va_r: [150, -105, 'moving', -25],
        li: [-200, -10, 'broken'], legion: [-20, -15, 'broken'], f7: [150, -15, 'broken'], h71: [300, 0, 'broken'],
        gun1: [-115, 120], gun2: [65, 120],
      },
      arrows: [{ side: 'allied', path: [[0, -10], [0, -85]] }, { side: 'crown', path: [[-20, 70], [-20, 0]] }] },

    { time: '07:25', title: 'Face about and fire', conf: 'documented',
      text: 'Morgan rides up and points out where to halt. The Continentals stop, turn around and fire a volley into the charging British at 30 yards or less. The British line staggers.',
      at: {
        va_l: [-165, -100, 'firing'], cont: [0, -100, 'firing'], va_r: [150, -100, 'firing', 0],
        li: [-200, -40, 'broken'], legion: [-20, -45, 'broken'], f7: [150, -45, 'broken'], h71: [300, -30, 'broken'],
        rescav: [-40, 620, 'broken'],
      } },

    { time: '07:28', title: 'Bayonets and the double envelopment', conf: 'disputed',
      text: 'Howard\'s men charge with the bayonet. Washington\'s cavalry strikes the British right and rear, and Pickens\'s re-formed militia come back around the American right to hit the Highlanders\' flank. The British are surrounded. Accounts differ on the exact routes the cavalry and militia took; this follows Babits.',
      at: {
        va_l: [-165, -35, 'moving'], cont: [0, -40, 'moving'], va_r: [150, -40, 'moving'],
        li: [-200, -5, 'broken'], legion: [-20, -5, 'broken'], f7: [150, -5, 'broken'], h71: [310, 10, 'broken'],
        cav: [-270, 60, 'moving'], mcall: [-245, 125, 'moving'],
        mil_l: [370, -60, 'moving'], mil_r: [420, 40, 'moving'], sk_l: [330, -150, 'moving'], sk_r: [450, -60, 'moving'],
      },
      arrows: [
        { side: 'allied', path: [[-300, -280], [-390, -100], [-275, 50]] },
        { side: 'allied', path: [[-120, -380], [220, -330], [380, -80]] },
        { side: 'allied', path: [[0, -90], [0, -50]] },
      ] },

    { time: '07:35', title: 'Surrender and flight', conf: 'documented',
      text: 'The British infantry throw down their arms, and the gunners are cut down or captured beside their guns. Tarleton\'s 200-strong cavalry reserve refuses to charge and flees down the road. Tarleton fights a short sword duel with Washington and escapes with a handful of men.',
      at: {
        li: [-200, -5, 'captured'], legion: [-20, -5, 'captured'], f7: [150, -5, 'captured'], h71: [310, 10, 'captured'],
        gun1: [-115, 120, 'captured'], gun2: [65, 120, 'captured'],
        rescav: [-40, 1350, 'routed'], dr_l: [330, 1100, 'routed'],
        cav: [-120, 400, 'moving'], mcall: [-200, 200],
      },
      arrows: [{ side: 'crown', path: [[-40, 640], [-40, 1300]] }, { side: 'allied', path: [[-270, 70], [-130, 380]] }] },

    { time: '07:45', title: 'A complete victory', conf: 'documented',
      text: "In under an hour Tarleton lost about 110 killed, over 200 wounded and some 500 captured. By Babits's count Morgan lost about 25 killed and 124 wounded; Morgan himself reported 12 killed and 60 wounded. Expecting Cornwallis, Morgan marched the prisoners north across the Broad River that same day.",
      at: {} },
  ],
};
