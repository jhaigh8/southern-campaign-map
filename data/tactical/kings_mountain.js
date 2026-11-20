// Tactical reconstruction: Battle of Kings Mountain, 7 October 1780. Format: see cowpens.js.
//
// Placement:
//   - The frame runs along the battle ridge: x toward its north-east end (bearing ~54 degrees), y toward
//     its north-west side. origin is mid-ridge on the crest.
//   - The crest is anchored by the park's monuments (OpenStreetMap): the Centennial Monument near the
//     south-west end, the U.S. Monument on the crest toward the north-east, the Ferguson memorial and
//     cairn on the south-east slope near the north-east end, and the Chronicle and Hambright markers on
//     the north side where the left column attacked. A terrain sample shows the crest 20-40 m above
//     the ground on either side, falling away to the north-east.
//   - Exactly where each Patriot column stood is not recorded; their sectors follow the NPS account
//     (Shelby and Campbell at the south-west end, Sevier, McDowell and Winston on the south side,
//     Cleveland, Williams, Lacey, Hambright and Chronicle on the north).
//
// Main sources: NPS Kings Mountain National Military Park; Lyman C. Draper, King's Mountain and Its
// Heroes (1881); John Buchanan, The Road to Guilford Courthouse (1997); Robert M. Dunkerly, The Battle
// of Kings Mountain: Eyewitness Accounts (2007).
window.SC = window.SC || {};
SC.tactical = SC.tactical || {};

SC.tactical.kings_mountain = {
  battle: 'kings_mountain',
  title: 'Battle of Kings Mountain',
  date: '7 October 1780',
  level: 'detailed',
  origin: [-81.381785, 35.141525],
  facing: 324,
  camera: { at: [0, -20], zoom: 15.2, pitch: 50, bearing: 0, elev: 290 },
  sources: 'After the NPS (Kings Mountain NMP), Draper (1881), Buchanan (1997) and Dunkerly (2007). Park landmarks © OpenStreetMap contributors. The Patriot columns\' exact routes are not recorded; frontages exaggerated.',

  people: {
    Cornwallis: { id: 'cornwallis' },
    Ferguson: { id: 'ferguson' },
    Campbell: { force: 'militia', full: 'Col. William Campbell, Washington County, Virginia' },
    Shelby: { force: 'militia', full: 'Col. Isaac Shelby, Sullivan County, N.C. (now Tennessee)' },
    Sevier: { force: 'militia', full: 'Lt. Col. John Sevier, Washington County, N.C. (now Tennessee)' },
    Cleveland: { force: 'militia', full: 'Col. Benjamin Cleveland, Wilkes County, North Carolina' },
    McDowell: { force: 'militia', full: 'Maj. Joseph McDowell, Burke County, North Carolina' },
    Winston: { force: 'militia', full: 'Maj. Joseph Winston, Surry County, North Carolina' },
    Williams: { force: 'militia', full: 'Col. James Williams, South Carolina (mortally wounded)' },
    Lacey: { force: 'militia', full: 'Col. Edward Lacey, South Carolina' },
    Hambright: { force: 'militia', full: 'Lt. Col. Frederick Hambright, Lincoln County, North Carolina' },
    Chronicle: { force: 'militia', full: 'Maj. William Chronicle, Lincoln County, North Carolina (killed)' },
    DePeyster: { force: 'loyalist', full: "Capt. Abraham DePeyster, King's American Regiment, Ferguson's second-in-command" },
  },

  units: {
    // ---- Patriot militia (the "Overmountain Men" and their allies) ----
    shelby:   { name: "Shelby's Sullivan County men", short: 'Shelby', side: 'allied', force: 'militia', men: 120, type: 'skirmish', w: 110, d: 16 },
    campbell: { name: "Campbell's Virginians", short: 'Campbell', side: 'allied', force: 'militia', men: 200, type: 'skirmish', w: 130, d: 16 },
    sevier:   { name: "Sevier's Washington County men", short: 'Sevier', side: 'allied', force: 'militia', men: 120, type: 'skirmish', w: 110, d: 16 },
    mcdowell: { name: "McDowell's Burke County men", short: 'McDowell', side: 'allied', force: 'militia', men: 90, type: 'skirmish', w: 90, d: 16 },
    winston:  { name: "Winston's Surry County men", short: 'Winston', side: 'allied', force: 'militia', men: 60, type: 'skirmish', w: 80, d: 16 },
    cleveland:{ name: "Cleveland's Wilkes County men", short: 'Cleveland', side: 'allied', force: 'militia', men: 110, type: 'skirmish', w: 110, d: 16 },
    williams: { name: "Williams's and Lacey's South Carolinians", short: 'Williams & Lacey', side: 'allied', force: 'militia', men: 150, type: 'skirmish', w: 120, d: 16 },
    hambright:{ name: "Hambright's and Chronicle's Lincoln County men", short: 'Hambright & Chronicle', side: 'allied', force: 'militia', men: 50, type: 'skirmish', w: 70, d: 16 },

    // ---- Loyalists ----
    prov:   { name: 'American Volunteers (Provincial regulars)', short: 'American Volunteers', side: 'crown', force: 'loyalist', men: 100, type: 'line', w: 60, d: 20 },
    lm_sw:  { name: 'Loyalist militia (south-west end)', short: 'Loyalist militia', side: 'crown', force: 'loyalist', men: 300, type: 'line', w: 150, d: 30 },
    lm_c:   { name: 'Loyalist militia (centre)', short: 'Loyalist militia', side: 'crown', force: 'loyalist', men: 300, type: 'line', w: 150, d: 30 },
    lm_ne:  { name: 'Loyalist militia (north-east end, by the camp)', short: 'Loyalist militia', side: 'crown', force: 'loyalist', men: 300, type: 'line', w: 140, d: 40 },
  },

  notes: [
    { at: [247, -128], text: 'Ferguson falls here (his cairn)' },
    { at: [-470, 0], text: 'South-west end of the ridge' },
    { at: [330, 230], text: "North-east end: Ferguson's camp" },
  ],

  phases: [
    { time: '15:00', title: 'The ridge is surrounded', conf: 'probable',
      text: "After an all-night ride through rain, about 900 picked Patriot riflemen dismount below the ridge where Ferguson has camped with some 1,000 Loyalists, sure no one can drive him off it. The Patriots split up to surround the hill: Shelby and Campbell at the south-west end, Sevier, McDowell and Winston along the south side, and Cleveland, Williams, Lacey, Hambright and Chronicle along the north.",
      at: {
        lm_sw: [-170, 15], lm_c: [10, 20], lm_ne: [190, 20], prov: [60, 35],
        shelby: [-370, 110, 'moving', -40], campbell: [-370, -110, 'moving', 40],
        sevier: [-120, -210, 'moving'], mcdowell: [60, -220, 'moving'], winston: [260, -240, 'moving'],
        cleveland: [-40, 210, 'moving'], williams: [140, 220, 'moving'], hambright: [330, 170, 'moving'],
      },
      arrows: [
        { side: 'allied', path: [[-520, 40], [-420, 120], [-380, 115]] }, { side: 'allied', path: [[-520, -40], [-420, -120], [-380, -115]] },
        { side: 'allied', path: [[-480, -160], [-200, -240], [240, -250]] }, { side: 'allied', path: [[-480, 160], [-100, 240], [320, 190]] },
      ] },

    { time: '15:05', title: 'Shelby and Campbell open the attack', conf: 'documented',
      text: "Shelby's and Campbell's men climb the steep south-west end, firing from behind trees and rocks. Ferguson rallies his men with blasts on a silver whistle. Firing downhill, the Loyalists tend to shoot high.",
      at: {
        shelby: [-280, 75, 'firing', -40], campbell: [-280, -75, 'firing', 40], lm_sw: [-170, 15, 'firing'],
        sevier: [-110, -170, 'moving'], mcdowell: [60, -180, 'moving'], winston: [250, -190, 'moving'],
        cleveland: [-40, 170, 'moving'], williams: [140, 175, 'moving'], hambright: [330, 140, 'moving'],
      } },

    { time: '15:10', title: 'The first bayonet charge', conf: 'documented',
      text: "Ferguson sends his Provincial regulars, the American Volunteers, down the slope with the bayonet. Campbell's riflemen, who have no bayonets, are driven back down the hill, then turn and climb again as soon as the charge stops. Shelby's men keep firing into the flank.",
      at: {
        prov: [-220, -70, 'moving'], campbell: [-400, -170, 'broken', 40], shelby: [-270, 90, 'firing', -40],
      },
      arrows: [{ side: 'crown', path: [[60, 25], [-120, -20], [-220, -60]] }, { side: 'allied', path: [[-280, -80], [-390, -160]] }] },

    { time: '15:20', title: 'Fire from every side', conf: 'documented',
      text: "Now every column is engaged, and the Loyalists on the crest are under fire from all directions. The Provincials charge again and again, driving back first one column, then another, but each time the riflemen return. On the north slope Major Chronicle is killed and Lieutenant Colonel Hambright wounded leading the Lincoln County men.",
      at: {
        prov: [-150, 110, 'moving'], shelby: [-330, 140, 'broken', -40], campbell: [-280, -80, 'firing', 40],
        sevier: [-110, -110, 'firing'], mcdowell: [60, -120, 'firing'], winston: [240, -130, 'firing'],
        cleveland: [-40, 110, 'firing'], williams: [140, 115, 'firing'], hambright: [320, 85, 'firing'],
        lm_sw: [-170, 15, 'firing'], lm_c: [10, 20, 'firing'], lm_ne: [190, 20, 'firing'],
      },
      arrows: [{ side: 'crown', path: [[-220, -60], [-200, 40], [-160, 100]] }] },

    { time: '15:40', title: 'The Patriots gain the crest', conf: 'documented',
      text: "Campbell's and Shelby's men win the south-west end of the crest and fight their way along it. The Loyalists are pushed back toward their camp at the north-east end, and the circle around them tightens.",
      at: {
        campbell: [-190, -20, 'firing', 0], shelby: [-200, 60, 'firing', 0],
        lm_sw: [-40, 10, 'broken'], lm_c: [100, 20, 'broken'], lm_ne: [210, 20, 'firing'], prov: [110, -10, 'broken'],
        sevier: [-30, -80, 'firing'], mcdowell: [110, -110, 'firing'], winston: [270, -120, 'firing'],
        cleveland: [20, 90, 'firing'], williams: [170, 100, 'firing'], hambright: [330, 75, 'firing'],
      },
      arrows: [{ side: 'allied', path: [[-280, 0], [-200, 20], [-90, 20]] }] },

    { time: '15:55', title: "Ferguson's last ride", conf: 'documented',
      text: "With his men crowded together around the camp, Ferguson tries to cut his way out on horseback down the south-east slope. He is shot from the saddle by several riflemen at once and dies with a foot caught in his stirrup. Accounts differ on who fired the fatal shots.",
      at: {
        lm_sw: [130, 10, 'broken', 0, 110, 40], lm_c: [210, 25, 'broken', 0, 100, 40], lm_ne: [270, 0, 'broken', 0, 100, 40], prov: [190, -30, 'broken'],
        campbell: [40, -40, 'firing'], shelby: [40, 70, 'firing'],
        sevier: [150, -120, 'firing'], mcdowell: [250, -175, 'firing'], winston: [350, -110, 'firing'],
        cleveland: [180, 120, 'firing'], williams: [280, 110, 'firing'], hambright: [370, 40, 'firing'],
      },
      arrows: [{ side: 'crown', path: [[200, -10], [235, -60], [247, -105]] }] },

    { time: '16:00', title: 'Surrender, and "Tarleton\'s quarter"', conf: 'documented',
      text: "Captain DePeyster raises a white flag, but many Patriots keep shooting, some crying \"Buford!\" and \"Tarleton's quarter!\" in revenge for the Waxhaws. Campbell and Shelby finally stop the killing. The surviving Loyalists are made to sit down, surrounded, on the crest.",
      at: {
        lm_sw: [130, 10, 'captured', 0, 110, 40], lm_c: [210, 25, 'captured', 0, 100, 40], lm_ne: [270, 0, 'captured', 0, 100, 40], prov: [190, -30, 'captured'],
        campbell: [60, -30], shelby: [60, 60], sevier: [160, -100], mcdowell: [250, -150], winston: [340, -90],
        cleveland: [180, 100], williams: [280, 95], hambright: [360, 40],
      } },

    { time: '16:05', title: 'An army destroyed', conf: 'documented',
      text: "In about an hour Ferguson's whole force was gone: by the NPS count 225 killed, 163 wounded and 716 captured, against 28 Patriots killed and 62 wounded. Ferguson was the only regular British soldier in the battle; everyone else was American. The loss of Cornwallis's western flank forced him to abandon his first invasion of North Carolina and fall back to Winnsboro.",
      at: {} },
  ],
};
