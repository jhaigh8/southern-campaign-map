// Tactical reconstruction: Battle of Cowpens, 17 January 1781.
//
// Coordinates are local metres in a frame anchored on the battlefield:
//   origin : centre of the Continental (main) line, astride the Green River Road
//   facing : compass bearing the American line faced (toward Tarleton's approach)
//   x      : metres toward the American right flank;  y : metres toward the enemy
// Unit positions per phase: [x, y, state?, rotationDeg?, width?, depth?]
//   state : formed | firing | moving | broken | routed | captured   (default formed)
//   A unit missing from a phase keeps its last position; a unit not yet listed is hidden.
// Blocks are schematic: frontages and depths are exaggerated so units read clearly from the air.
//
// Placement (checked Nov 2026):
//   - roadLL is the surviving trace of the Green River Road through the park (OpenStreetMap). The
//     road runs SE -> NW; the American line faced about 130 degrees, across it.
//   - The main line sits on the first knoll, ~70 m east of the 1856 Washington Light Infantry
//     monument. The terrain model along the road matches Bearss's description of the ground: a
//     barely perceptible slope for ~300 yd in front of the main line, then a steeper fall to a
//     shallow ravine ~700 yd out; a swale behind it and a slightly higher second knoll beyond.
//   - Militia line 150 yd ahead (near the bend in the road, as the NPS trail waysides say), skirmishers
//     150 yd beyond that (>300 yd ahead of the Continentals). British formed ~300 yd from the skirmishers.
//   - McCall's mounted militia: east of the road, 100 yd to the left of Washington's dragoons.
//   - The NPS "captured British cannons" wayside falls where this model has the guns taken.
//
// Main sources: Lawrence E. Babits, A Devil of a Whipping (1998); Edwin C. Bearss, The Battle of
// Cowpens: A Documented Narrative & Troop Movement Maps (NPS, 1967); NPS Cowpens National Battlefield.
window.SC = window.SC || {};
SC.tactical = SC.tactical || {};

SC.tactical.cowpens = {
  battle: 'cowpens',
  title: 'Battle of Cowpens',
  date: '17 January 1781',
  origin: [-81.81405, 35.13493],
  facing: 130,
  camera: { at: [-40, 0], zoom: 14.95, pitch: 56, bearing: 122, elev: 295 },  // elev: ground height (m) at the battlefield
  sources: 'After Babits, A Devil of a Whipping (1998); Bearss, The Battle of Cowpens (NPS, 1967); National Park Service. Road trace © OpenStreetMap contributors. Distances follow the sources; frontages are exaggerated.',

  // Officers named in the captions, coloured by the troops they led. `id` links a tracked commander.
  people: {
    Morgan: { id: 'morgan' },
    Tarleton: { id: 'tarleton' },
    Pickens: { id: 'pickens' },
    Washington: { id: 'wwashington' },
    Cornwallis: { id: 'cornwallis' },
    Howard: { force: 'continental', full: 'Lt. Col. John Eager Howard, Maryland & Delaware light infantry' },
    McCall: { force: 'militia', full: 'Lt. Col. James McCall, South Carolina State Troops (mounted)' },
    McDowell: { force: 'militia', full: 'Maj. Joseph McDowell, North Carolina militia' },
    Cunningham: { force: 'militia', full: 'Maj. John Cunningham, Georgia militia' },
    Tate: { force: 'militia', full: 'Capt. Edmund Tate, Augusta County (Virginia) riflemen' },
    Triplett: { force: 'militia', full: 'Maj. Francis Triplett, Virginia militia' },
    McArthur: { force: 'british', full: 'Maj. Archibald McArthur, 1st Battalion, 71st Highlanders' },
    Ogilvie: { force: 'british', full: 'Capt. David Ogilvie, 17th Light Dragoons' },
  },

  units: {
    // ---- American ----
    sk_l:   { name: "Cunningham's Georgia riflemen", short: 'Ga. riflemen', side: 'allied', force: 'militia', men: 60, type: 'skirmish', w: 130, d: 12 },
    sk_r:   { name: "McDowell's North Carolina riflemen", short: 'N.C. riflemen', side: 'allied', force: 'militia', men: 60, type: 'skirmish', w: 130, d: 12 },
    mil_l:  { name: "Pickens's militia (left): Hammond's S.C. & Georgians", short: 'Militia (S.C., Ga.)', side: 'allied', force: 'militia', men: 150, type: 'line', w: 160, d: 22 },
    mil_r:  { name: "Pickens's militia (right): N.C., Brandon's & Thomas's S.C.", short: 'Militia (N.C., S.C.)', side: 'allied', force: 'militia', men: 150, type: 'line', w: 160, d: 22 },
    va_l:   { name: "Tate's Augusta County (Va.) riflemen", short: 'Augusta riflemen', side: 'allied', force: 'militia', men: 100, type: 'line', w: 90, d: 24 },
    cont:   { name: "Howard's Maryland & Delaware Continentals", short: 'Howard', side: 'allied', force: 'continental', men: 280, type: 'line', w: 170, d: 26 },
    va_r:   { name: "Triplett's Virginians & Beaty's S.C. company", short: 'Va. & S.C. companies', side: 'allied', force: 'militia', men: 120, type: 'line', w: 80, d: 24 },
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

  // Surviving trace of the Green River Road through the park, NW (toward the Broad River) to SE
  // (toward Thicketty Creek). © OpenStreetMap contributors, ODbL.
  roadLL: [
    [-81.82069, 35.14241], [-81.82041, 35.14231], [-81.82006, 35.14204], [-81.81967, 35.14175], [-81.81938, 35.14150],
    [-81.81881, 35.14100], [-81.81839, 35.14042], [-81.81796, 35.13982], [-81.81773, 35.13947], [-81.81713, 35.13862],
    [-81.81645, 35.13767], [-81.81599, 35.13703], [-81.81562, 35.13651], [-81.81537, 35.13614], [-81.81513, 35.13584],
    [-81.81478, 35.13548], [-81.81438, 35.13513], [-81.81377, 35.13464], [-81.81357, 35.13449], [-81.81310, 35.13425],
    [-81.81274, 35.13407], [-81.81197, 35.13375], [-81.81108, 35.13335], [-81.81012, 35.13294], [-81.80965, 35.13276],
    [-81.80891, 35.13252], [-81.80828, 35.13233], [-81.80771, 35.13216], [-81.80699, 35.13197], [-81.80611, 35.13175],
    [-81.80547, 35.13159], [-81.80526, 35.13155], [-81.80482, 35.13150], [-81.80424, 35.13152], [-81.80378, 35.13154],
    [-81.80223, 35.13162], [-81.80166, 35.13166], [-81.80109, 35.13169], [-81.80011, 35.13175],
  ],
  notes: [
    { at: [-230, -880], text: 'Green River Road north to the Broad River, ~5 miles' },
    { at: [-200, -540], text: 'Militia horses picketed behind the cavalry' },
    { at: [120, -260], text: 'Second knoll: the cavalry waits out of sight' },
    { at: [300, -45], text: 'First knoll: the main line' },
    { at: [-330, 1270], text: 'Green River Road: Tarleton came up from Thicketty Creek' },
  ],

  phases: [
    { time: '06:30', title: "Morgan's three lines", conf: 'documented',
      text: "Morgan waits on two gentle knolls in an open, grazed wood with the flooded Broad River behind him, so the militia cannot run far. McDowell's and Cunningham's riflemen are out in front, then Pickens's militia 150 yards behind them, then Howard's Continentals and the Virginians on the first knoll another 150 yards back. Washington's dragoons and McCall's mounted militia wait out of sight behind the second knoll. Tarleton's column, marching since 2 a.m., comes up the Green River Road.",
      at: {
        sk_l: [-150, 275], sk_r: [150, 275],
        mil_l: [-110, 137], mil_r: [110, 137],
        va_l: [-165, 0], cont: [0, 0], va_r: [140, 0],
        cav: [-55, -400], mcall: [-150, -410],
        dr_r: [-178, 745, 'moving', 115], dr_l: [-200, 800, 'moving', 115],
        li: [-252, 880, 'moving', 132], gun1: [-314, 950, 'moving'], legion: [-367, 1010, 'moving', 132],
        gun2: [-422, 1070, 'moving'], f7: [-470, 1120, 'moving', 132], h71: [-550, 1200, 'moving', 132],
        rescav: [-630, 1282, 'moving', 132],
      } },

    { time: '06:45', title: 'Tarleton deploys at once', conf: 'documented',
      text: 'Without waiting for his whole force to come up, Tarleton forms line about 300 yards from the riflemen: light infantry on his right, the Legion infantry in the centre and the 7th Foot on his left, with two small 3-pounders between them and 50 dragoons on each flank. The 71st Highlanders and about 200 Legion horse stay in reserve.',
      at: {
        li: [-200, 560], gun1: [-115, 560], legion: [-20, 560], gun2: [65, 560], f7: [150, 560],
        dr_r: [-320, 565], dr_l: [290, 565],
        h71: [250, 700], rescav: [-110, 740],
      },
      arrows: [{ side: 'crown', path: [[-252, 880], [-210, 700], [-200, 595]] }, { side: 'crown', path: [[-367, 1010], [-80, 720], [150, 595]] }] },

    { time: '06:55', title: 'The riflemen empty saddles', conf: 'documented',
      text: 'Tarleton sends dragoons to drive in the skirmishers. Firing from behind trees, the riflemen aim for the horsemen and officers, and about 15 dragoons fall. The dragoons pull back.',
      at: { sk_l: [-150, 275, 'firing'], sk_r: [150, 275, 'firing'], dr_r: [-200, 350, 'moving'] },
      arrows: [{ side: 'crown', path: [[-320, 550], [-265, 430], [-210, 365]] }] },

    { time: '07:00', title: 'The British line advances', conf: 'documented',
      text: 'The British infantry advances with a shout, drums beating. The riflemen fall back, firing as they go, and take post on the flanks of the militia line.',
      at: {
        sk_l: [-255, 140, 'moving'], sk_r: [255, 140, 'moving'],
        dr_r: [-340, 470, 'broken'],
        li: [-200, 330, 'moving'], gun1: [-115, 400, 'firing'], legion: [-20, 330, 'moving'], gun2: [65, 400, 'firing'], f7: [150, 330, 'moving'],
        dr_l: [290, 340, 'moving'],
      },
      arrows: [{ side: 'crown', path: [[-20, 540], [-20, 360]] }, { side: 'allied', path: [[-150, 265], [-235, 165]] }, { side: 'allied', path: [[150, 265], [235, 165]] }] },

    { time: '07:02', title: '"Two fires"', conf: 'documented',
      text: 'Morgan has asked the militia for only two volleys. At about 50 yards they fire, aiming at the epaulettes, and many British officers go down. They reload and fire again.',
      at: {
        mil_l: [-110, 137, 'firing'], mil_r: [110, 137, 'firing'], sk_l: [-255, 140, 'firing'], sk_r: [255, 140, 'firing'],
        li: [-200, 190, 'broken'], legion: [-20, 190, 'broken'], f7: [150, 190, 'broken'],
      } },

    { time: '07:05', title: 'The militia file off to the left', conf: 'probable',
      text: "As planned, the militia break off and head for the rear around the left end of the Continental line. The British take it for a rout. The 17th Light Dragoons on Tarleton's right, under Ogilvie, gallop after them and begin cutting men down.",
      at: {
        mil_l: [-330, -150, 'moving'], mil_r: [-230, -280, 'moving'],
        sk_l: [-380, -50, 'moving'], sk_r: [-280, -320, 'moving'],
        dr_r: [-300, 0, 'moving'],
        li: [-200, 145, 'moving'], legion: [-20, 145, 'moving'], f7: [150, 145, 'moving'],
      },
      arrows: [{ side: 'allied', path: [[0, 137], [-260, 80], [-320, -120]] }, { side: 'crown', path: [[-340, 450], [-330, 250], [-300, 30]] }] },

    { time: '07:08', title: "Washington's charge", conf: 'documented',
      text: "Washington's dragoons and McCall's mounted militia come over the second knoll and crash into the scattered British horsemen, who lose about 18 men and flee. The militia rally behind the hill.",
      at: {
        cav: [-290, 20, 'moving'], mcall: [-235, -30, 'moving'],
        dr_r: [-430, 470, 'routed'],
        mil_l: [-200, -360], mil_r: [-80, -390], sk_l: [-300, -360], sk_r: [20, -400],
      },
      arrows: [{ side: 'allied', path: [[-60, -390], [-260, -200], [-290, 0]] }] },

    { time: '07:12', title: 'The main lines meet', conf: 'documented',
      text: "The British line reaches Howard's Continentals on the first knoll. Both sides exchange volleys at short range, and the British guns fire canister. Washington's cavalry falls back to re-form.",
      at: {
        va_l: [-165, 0, 'firing'], cont: [0, 0, 'firing'], va_r: [140, 0, 'firing'],
        li: [-200, 75, 'firing'], legion: [-20, 75, 'firing'], f7: [150, 75, 'firing'],
        gun1: [-115, 150, 'firing'], gun2: [65, 150, 'firing'],
        cav: [-300, -290], mcall: [-370, -300],
      } },

    { time: '07:18', title: 'Tarleton commits the Highlanders', conf: 'documented',
      text: "To break the deadlock, Tarleton sends McArthur's 71st Highlanders around his left, with their pipes playing, to overlap the American right flank. The Legion dragoons move up beside them.",
      at: { h71: [300, 95, 'moving'], dr_l: [410, 160, 'moving'] },
      arrows: [{ side: 'crown', path: [[250, 680], [320, 400], [300, 120]] }] },

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
        rescav: [-110, 600, 'broken'],
      } },

    { time: '07:28', title: 'Bayonets and the double envelopment', conf: 'disputed',
      text: "Howard's men charge with the bayonet. Washington's cavalry strikes the British right and rear, and Pickens's re-formed militia come back around the American right to hit the Highlanders' flank. The British are surrounded. Accounts differ on the exact routes the cavalry and militia took; this follows Babits.",
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
      text: "The British infantry throw down their arms, and the gunners are cut down or captured beside their guns. Tarleton's 200-strong cavalry reserve refuses to charge and flees down the road. Tarleton fights a short sword duel with Washington and escapes with a handful of men.",
      at: {
        li: [-200, -5, 'captured'], legion: [-20, -5, 'captured'], f7: [150, -5, 'captured'], h71: [310, 10, 'captured'],
        gun1: [-115, 120, 'captured'], gun2: [65, 120, 'captured'],
        rescav: [-411, 1060, 'routed', 132], dr_l: [150, 900, 'routed'],
        cav: [-110, 420, 'moving'], mcall: [-200, 200],
      },
      arrows: [{ side: 'crown', path: [[-110, 620], [-200, 780], [-390, 1030]] }, { side: 'allied', path: [[-270, 70], [-120, 400]] }] },

    { time: '07:45', title: 'A complete victory', conf: 'documented',
      text: "In under an hour Tarleton lost about 110 killed, over 200 wounded and some 500 captured. By Babits's count Morgan lost about 25 killed and 124 wounded; Morgan himself reported 12 killed and 60 wounded. Expecting Cornwallis, Morgan marched the prisoners north across the Broad River that same day.",
      at: {} },
  ],
};
