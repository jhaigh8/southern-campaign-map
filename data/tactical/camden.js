// Tactical reconstruction: Battle of Camden, 16 August 1780. Format: see cowpens.js.
//
// Placement:
//   - Both armies marched along the Great Wagon Road (Camden-Charlotte road); Flat Rock Road follows
//     its line through the battlefield (OpenStreetMap). The road runs NNW-SSE, so the American line,
//     facing south toward Camden, faced ~160 degrees, astride it.
//   - origin: the road beside the battlefield park and de Kalb monument site (34.3646 N, 80.6139 W), which
//     sits on the American right, where de Kalb fell. Battlefield archaeology (SC Battleground
//     Preservation Trust / USC) places the heart of the American line here.
//   - Line spacing and frontages follow the accounts (Smallwood's reserve ~200 yd behind the line);
//     the exact frontage between the flanking swamps is estimated, hence "approximate".
//
// Main sources: Jim Piecuch, The Battle of Camden: A Documentary History (2006); John Buchanan, The Road
// to Guilford Courthouse (1997); Otho Williams's "Narrative"; Cornwallis's and Tarleton's reports.
window.SC = window.SC || {};
SC.tactical = SC.tactical || {};

SC.tactical.camden = {
  battle: 'camden',
  title: 'Battle of Camden',
  date: '16 August 1780',
  level: 'approximate',
  origin: [-80.6124, 34.3645],
  facing: 160.6,
  camera: { at: [-60, 60], zoom: 14.9, pitch: 55, bearing: 150, elev: 80 },
  sources: 'After Piecuch (2006), Buchanan (1997), Otho Williams\'s Narrative and the British reports. Road line © OpenStreetMap contributors. Anchored on the Great Wagon Road and the de Kalb site; frontages estimated and exaggerated.',

  people: {
    Gates: { id: 'gates' },
    'de Kalb': { id: 'dekalb' },
    Cornwallis: { id: 'cornwallis' },
    Rawdon: { id: 'rawdon' },
    Tarleton: { id: 'tarleton' },
    Williams: { id: 'owilliams' },
    Webster: { force: 'british', full: 'Lt. Col. James Webster, commanding the British right' },
    Gist: { force: 'continental', full: 'Brig. Gen. Mordecai Gist, 2nd Maryland Brigade' },
    Smallwood: { force: 'continental', full: 'Brig. Gen. William Smallwood, 1st Maryland Brigade' },
    Caswell: { force: 'militia', full: 'Maj. Gen. Richard Caswell, North Carolina militia' },
    Stevens: { force: 'militia', full: 'Brig. Gen. Edward Stevens, Virginia militia' },
    Dixon: { force: 'militia', full: 'Lt. Col. Henry Dixon, North Carolina militia' },
    Armand: { force: 'continental', full: "Col. Charles Armand, Armand's Legion" },
  },

  units: {
    // ---- American ----
    dekalb: { name: "De Kalb's wing: Gist's 2nd Maryland Brigade & the Delaware Regiment", short: 'De Kalb (2nd Md. & Del.)', side: 'allied', force: 'continental', men: 600, type: 'line', w: 280, d: 26 },
    dixon:  { name: "Dixon's North Carolina regiment", short: 'Dixon (N.C.)', side: 'allied', force: 'militia', men: 300, type: 'line', w: 90, d: 22 },
    nc:     { name: "Caswell's North Carolina militia", short: 'N.C. militia (Caswell)', side: 'allied', force: 'militia', men: 1800, type: 'line', w: 330, d: 34 },
    va:     { name: "Stevens's Virginia militia", short: 'Va. militia (Stevens)', side: 'allied', force: 'militia', men: 700, type: 'line', w: 230, d: 26 },
    armand: { name: "Armand's Legion", short: 'Armand', side: 'allied', force: 'continental', men: 120, type: 'cavalry', w: 50, d: 40 },
    guns:   { name: 'American artillery (7 guns)', short: 'Artillery', side: 'allied', force: 'continental', men: 100, type: 'artillery', w: 40, d: 18 },
    md1:    { name: "Smallwood's 1st Maryland Brigade (reserve)", short: '1st Maryland (Smallwood)', side: 'allied', force: 'continental', men: 450, type: 'line', w: 200, d: 26 },

    // ---- British ----
    li:     { name: 'Light infantry', short: 'Light infantry', side: 'crown', force: 'british', men: 150, type: 'line', w: 90, d: 22 },
    f23:    { name: '23rd Foot (Royal Welch Fusiliers)', short: '23rd', side: 'crown', force: 'british', men: 290, type: 'line', w: 120, d: 24 },
    f33:    { name: '33rd Foot', short: '33rd', side: 'crown', force: 'british', men: 240, type: 'line', w: 120, d: 24 },
    art:    { name: 'Royal Artillery (4 guns)', short: 'Royal Artillery', side: 'crown', force: 'british', men: 60, type: 'artillery', w: 30, d: 18 },
    voi:    { name: 'Volunteers of Ireland', short: 'Volunteers of Ireland', side: 'crown', force: 'loyalist', men: 300, type: 'line', w: 120, d: 24 },
    leginf: { name: 'British Legion infantry', short: 'Legion infantry', side: 'crown', force: 'loyalist', men: 130, type: 'line', w: 80, d: 24 },
    rnc:    { name: "Hamilton's Royal North Carolina Regiment", short: 'Royal N.C. Regt', side: 'crown', force: 'loyalist', men: 270, type: 'line', w: 100, d: 24 },
    bryan:  { name: "Bryan's North Carolina Volunteers", short: "Bryan's N.C. Volunteers", side: 'crown', force: 'loyalist', men: 200, type: 'line', w: 100, d: 24 },
    h71:    { name: '71st Highlanders (two battalions, reserve)', short: '71st', side: 'crown', force: 'british', men: 250, type: 'line', w: 140, d: 26 },
    tarl:   { name: "Tarleton's British Legion cavalry", short: 'Tarleton', side: 'crown', force: 'loyalist', men: 180, type: 'cavalry', w: 50, d: 60 },
  },

  roadLL: [[-80.60221, 34.32796], [-80.60774, 34.35359], [-80.61624, 34.37366], [-80.62715, 34.38965]],
  notes: [
    { at: [560, 120], text: 'Swamp on the American right' },
    { at: [-760, 120], text: 'Swamp on the American left' },
    { at: [0, -1050], text: 'Great Wagon Road north to Rugeley\'s and Charlotte' },
    { at: [-90, 1150], text: 'Great Wagon Road south to Camden, ~5 miles' },
  ],

  phases: [
    { time: '02:30', title: 'Collision in the dark', conf: 'documented',
      text: "Gates and Cornwallis have each set out at night to surprise the other on the same road. Around 2:30 a.m. the advance guards run into each other: Armand's Legion is thrown back by Tarleton's horse and the British light troops, and both armies halt, form, and wait for daylight a few hundred yards apart. Gates's officers, many sick from bad rations, advise fighting.",
      at: {
        armand: [0, 140, 'firing', 90], guns: [0, -120, 'moving', 90], dekalb: [0, -280, 'moving', 90], md1: [0, -560, 'moving', 90],
        nc: [0, -880, 'moving', 90], va: [0, -1180, 'moving', 90], dixon: [0, -760, 'moving', 90],
        tarl: [0, 330, 'firing', 90], li: [10, 420, 'moving', 90], f23: [10, 560, 'moving', 90], f33: [10, 700, 'moving', 90],
        art: [10, 800, 'moving', 90], voi: [10, 900, 'moving', 90], leginf: [10, 1000, 'moving', 90], rnc: [10, 1100, 'moving', 90],
        bryan: [10, 1200, 'moving', 90], h71: [10, 1320, 'moving', 90],
      },
      arrows: [{ side: 'crown', path: [[0, 300], [0, 180]] }, { side: 'allied', path: [[0, 160], [0, 40]] }] },

    { time: '05:15', title: 'Lines of battle at dawn', conf: 'documented',
      text: "Gates puts his weakest troops against the best of the enemy: Stevens's Virginia militia on the left and Caswell's North Carolinians in the centre face Webster's regulars, while de Kalb's Maryland and Delaware Continentals hold the right. Smallwood's 1st Maryland stands in reserve 200 yards back. Opposite the Continentals, Rawdon commands the Volunteers of Ireland, the Legion infantry and the North Carolina Loyalists; the 71st and Tarleton wait in reserve.",
      at: {
        dekalb: [230, 0], dixon: [30, 0], nc: [-190, 0], va: [-480, 0], guns: [-5, 18], armand: [-470, -90],
        md1: [0, -200],
        li: [-560, 250], f23: [-430, 250], f33: [-290, 250], art: [-150, 260],
        voi: [20, 250], leginf: [130, 250], rnc: [240, 250], bryan: [355, 250],
        h71: [-80, 430], tarl: [60, 500],
      } },

    { time: '05:30', title: 'Webster charges the militia', conf: 'documented',
      text: "Gates orders Stevens's Virginians forward to strike the British while they seem to be still forming, but Webster's regulars attack first, cheering and coming on with the bayonet. Most of the Virginians throw down their loaded muskets and run without firing. The panic spreads to Caswell's North Carolinians; only Dixon's regiment, beside the Continentals, stands.",
      at: {
        va: [-480, -620, 'routed'], nc: [-220, -640, 'routed'], armand: [-420, -700, 'routed'],
        li: [-520, 70, 'moving'], f23: [-410, 60, 'moving'], f33: [-280, 60, 'moving'],
        dixon: [30, 0, 'firing'],
      },
      arrows: [{ side: 'crown', path: [[-430, 240], [-430, 80]] }, { side: 'allied', path: [[-470, -20], [-470, -560]] }, { side: 'allied', path: [[-200, -30], [-220, -580]] }] },

    { time: '05:45', title: 'The Continentals fight on', conf: 'documented',
      text: "On the right, Rawdon's men attack de Kalb's Continentals and are thrown back; the Marylanders and Delawares counter-attack and take prisoners. Smallwood's 1st Maryland comes up on their left to fill the gap left by the militia, but a space remains between the two brigades, and neither can see well through the smoke and the morning haze.",
      at: {
        dekalb: [230, 60, 'firing'], dixon: [30, 30, 'firing'], md1: [-180, -60, 'firing'],
        voi: [20, 130, 'broken'], leginf: [130, 140, 'broken'], rnc: [240, 140, 'firing'], bryan: [355, 150, 'broken'],
        h71: [-120, 220, 'moving'],
      },
      arrows: [{ side: 'allied', path: [[230, 0], [230, 50]] }, { side: 'allied', path: [[0, -190], [-170, -80]] }] },

    { time: '06:00', title: 'Webster turns on the Marylanders', conf: 'documented',
      text: "Instead of chasing the fleeing militia, Webster wheels his brigade to the left and falls on the flank of Smallwood's 1st Maryland, which is driven back, rallies and is driven back again. Cornwallis steadies Rawdon's line and sends in the 71st. The Continentals are now nearly surrounded: about 900 men against 2,000.",
      at: {
        f33: [-250, -40, 'firing', 30], f23: [-380, -80, 'firing', 45], li: [-460, -160, 'moving', 60],
        md1: [-150, -140, 'broken'], h71: [-60, 120, 'firing'],
        voi: [20, 110, 'firing'], leginf: [130, 110, 'firing'], bryan: [355, 120, 'firing'],
      },
      arrows: [{ side: 'crown', path: [[-410, 60], [-420, -40], [-280, -60]] }] },

    { time: '06:10', title: "Tarleton's charge; de Kalb falls", conf: 'documented',
      text: "Tarleton's cavalry sweeps round into the rear of the Continentals and the last resistance collapses. De Kalb, unhorsed and fighting on foot, falls with eleven wounds and dies as a prisoner three days later. A few small bodies of Marylanders and Delawares escape in order through the swamps.",
      at: {
        tarl: [120, -160, 'moving'],
        dekalb: [200, -40, 'broken'], dixon: [40, -60, 'broken'], md1: [-150, -220, 'routed'], guns: [-5, 18, 'captured'],
        voi: [40, 50, 'firing'], leginf: [140, 40, 'firing'], rnc: [240, 50, 'firing'], h71: [-40, 30, 'firing'],
      },
      arrows: [{ side: 'crown', path: [[60, 490], [420, 200], [380, -120], [150, -150]] }] },

    { time: '06:30', title: 'Rout and pursuit', conf: 'documented',
      text: "The American army dissolves. Tarleton's cavalry pursues for some 22 miles up the road, capturing men and wagons. Gates, swept away in the flight, reaches Charlotte, 60 miles off, that night. About 900 Americans were killed or wounded and about 1,000 captured; the British lost 68 killed, 245 wounded and 11 missing. It was one of the worst American defeats of the war.",
      at: {
        dekalb: [180, -260, 'captured'], dixon: [60, -700, 'routed'], md1: [-60, -760, 'routed'],
        tarl: [10, -900, 'moving', 90],
        li: [-420, -200], f23: [-330, -150], f33: [-220, -120], h71: [-40, -60],
      },
      arrows: [{ side: 'crown', path: [[60, -200], [10, -500], [0, -950]] }] },
  ],
};
