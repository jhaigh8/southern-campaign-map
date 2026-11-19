// Tactical reconstruction: Battle of Eutaw Springs, 8 September 1781. Format: see cowpens.js.
//
// Placement:
//   - origin: the brick house site in the Eutaw Springs battlefield park (its waysides and Marjoribanks's
//     grave, OpenStreetMap). The British camp lay around the house with Eutaw Creek to the north.
//   - Greene approached from the west along the road from Burdell's plantation (SC 6, "Old Number Six
//     Highway", follows it), so the American lines faced east (~88 degrees). American left = north, by the creek.
//   - Distances between the lines are estimated from the accounts. Much of the field is built over, and
//     Lake Marion now covers the springs' lower course, hence "approximate".
//   - The order of Stewart's regiments from left to right is reconstructed (sources list them differently).
//
// Main sources: Greene's report to Congress (11 Sep 1781); Stewart's report; Otho Williams's and Henry Lee's
// accounts; Robert M. Dunkerly & Irene B. Boland, Eutaw Springs (2017).
window.SC = window.SC || {};
SC.tactical = SC.tactical || {};

SC.tactical.eutaw = {
  battle: 'eutaw',
  title: 'Battle of Eutaw Springs',
  date: '8 September 1781',
  level: 'approximate',
  origin: [-80.2986, 33.4074],
  facing: 88,
  camera: { at: [-20, -450], zoom: 15.0, pitch: 55, bearing: 70, elev: 30 },
  sources: 'After Greene\'s and Stewart\'s reports, Williams and Lee, and Dunkerly & Boland, Eutaw Springs (2017). Park landmarks and road © OpenStreetMap contributors. Distances between lines estimated; frontages exaggerated.',

  people: {
    Greene: { id: 'greene' },
    Marion: { id: 'marion' },
    Pickens: { id: 'pickens' },
    Lee: { id: 'lee' },
    Washington: { id: 'wwashington' },
    Williams: { id: 'owilliams' },
    Stewart: { id: 'stewart' },
    Cruger: { id: 'cruger' },
    Sumner: { force: 'continental', full: 'Brig. Gen. Jethro Sumner, North Carolina Continentals' },
    Campbell: { force: 'continental', full: 'Lt. Col. Richard Campbell, Virginia Continentals (mortally wounded)' },
    Henderson: { force: 'militia', full: 'Lt. Col. William Henderson, South Carolina State Troops' },
    Malmedy: { force: 'militia', full: 'Col. François de Malmedy, North Carolina militia' },
    Kirkwood: { force: 'continental', full: 'Capt. Robert Kirkwood, Delaware Continentals' },
    Marjoribanks: { force: 'british', full: 'Maj. John Marjoribanks, British flank battalion (mortally wounded)' },
    Sheridan: { force: 'loyalist', full: 'Maj. Henry Sheridan, New York Volunteers' },
    Coffin: { force: 'loyalist', full: 'Maj. John Coffin, Loyalist cavalry' },
  },

  units: {
    // ---- American ----
    mil_r:  { name: "Marion's South Carolina militia", short: 'Marion', side: 'allied', force: 'militia', men: 250, type: 'line', w: 170, d: 20 },
    mil_c:  { name: "Malmedy's North Carolina militia", short: 'N.C. militia (Malmedy)', side: 'allied', force: 'militia', men: 300, type: 'line', w: 160, d: 20 },
    mil_l:  { name: "Pickens's South Carolina militia", short: 'Pickens', side: 'allied', force: 'militia', men: 300, type: 'line', w: 170, d: 20 },
    lee:    { name: "Lee's Legion", short: "Lee's Legion", side: 'allied', force: 'continental', men: 260, type: 'cavalry', w: 70, d: 40 },
    hend:   { name: "Henderson's South Carolina State Troops", short: 'Henderson (S.C. State Troops)', side: 'allied', force: 'militia', men: 300, type: 'cavalry', w: 80, d: 40 },
    guns:   { name: 'American artillery', short: 'Artillery', side: 'allied', force: 'continental', men: 80, type: 'artillery', w: 30, d: 18 },
    nc:     { name: "Sumner's North Carolina Continentals", short: 'N.C. Continentals (Sumner)', side: 'allied', force: 'continental', men: 350, type: 'line', w: 200, d: 24 },
    va:     { name: "Campbell's Virginia Continentals", short: 'Virginians (Campbell)', side: 'allied', force: 'continental', men: 250, type: 'line', w: 160, d: 24 },
    md:     { name: "Williams's Maryland Continentals", short: 'Marylanders (Williams)', side: 'allied', force: 'continental', men: 250, type: 'line', w: 170, d: 24 },
    wash:   { name: "Washington's Continental dragoons", short: 'Washington', side: 'allied', force: 'continental', men: 100, type: 'cavalry', w: 50, d: 40 },
    kirk:   { name: "Kirkwood's Delawares", short: 'Kirkwood', side: 'allied', force: 'continental', men: 60, type: 'line', w: 50, d: 20 },

    // ---- British ----
    r6364:  { name: '63rd & 64th Foot', short: '63rd & 64th', side: 'crown', force: 'british', men: 450, type: 'line', w: 170, d: 24 },
    buffs:  { name: '3rd Foot (the Buffs)', short: '3rd Foot (Buffs)', side: 'crown', force: 'british', men: 400, type: 'line', w: 150, d: 24 },
    prov:   { name: "Cruger's Provincials (New York & New Jersey Volunteers, DeLancey's)", short: 'Cruger (Provincials)', side: 'crown', force: 'loyalist', men: 400, type: 'line', w: 160, d: 24 },
    marj:   { name: "Marjoribanks's flank battalion", short: 'Marjoribanks', side: 'crown', force: 'british', men: 300, type: 'line', w: 110, d: 30 },
    coffin: { name: "Coffin's Loyalist cavalry", short: 'Coffin', side: 'crown', force: 'loyalist', men: 150, type: 'cavalry', w: 50, d: 40 },
    house:  { name: "Sheridan's New York Volunteers in the brick house", short: 'Brick house (Sheridan)', side: 'crown', force: 'loyalist', men: 50, type: 'artillery', w: 26, d: 18 },
  },

  roadLL: [[-80.32965, 33.40019], [-80.32307, 33.40159], [-80.31559, 33.40324], [-80.31246, 33.40464], [-80.30745, 33.40696],
    [-80.30573, 33.40719], [-80.30235, 33.40685], [-80.30056, 33.40692], [-80.29866, 33.40710], [-80.29839, 33.40706],
    [-80.29767, 33.40681], [-80.29558, 33.40555], [-80.29367, 33.40437], [-80.28962, 33.40232]],
  notes: [
    { at: [-360, 40], text: 'Eutaw Creek and its thickets' },
    { at: [70, 90], text: 'British camp around the brick house' },
    { at: [60, -1300], text: "Road west to Burdell's plantation, 7 miles" },
  ],

  phases: [
    { time: '08:00', title: 'The rooting party', conf: 'documented',
      text: "Stewart, unaware Greene is near, has sent out a party of foragers to dig sweet potatoes. Greene's army has marched since 4 a.m. Coffin's cavalry, out scouting, runs into Lee's Legion and Henderson's State Troops a few miles west of the camp and is routed, and many of the foragers are captured. Stewart forms his line in front of his camp.",
      at: {
        coffin: [60, -900, 'routed'], lee: [80, -1080, 'moving'], hend: [-60, -1100, 'moving'],
        mil_r: [40, -1250, 'moving', 90], mil_c: [40, -1400, 'moving', 90], mil_l: [40, -1550, 'moving', 90],
        r6364: [170, -220], buffs: [20, -220], prov: [-150, -220], marj: [-300, -120, 'formed', 30], house: [0, 0],
      },
      arrows: [{ side: 'allied', path: [[60, -1150], [60, -950]] }, { side: 'crown', path: [[60, -880], [80, -500], [300, -120]] }] },

    { time: '09:00', title: 'Two lines against one', conf: 'probable',
      text: "Greene deploys in two lines. In front: militia, with Marion on the right, Malmedy's North Carolinians in the centre and Pickens on the left, flanked by Lee's Legion and Henderson's State Troops. Behind: Sumner's North Carolina Continentals, Campbell's Virginians and Williams's Marylanders. Washington's horse and Kirkwood's Delawares are in reserve. Stewart's line runs from the road up to Eutaw Creek, where Marjoribanks's flank battalion waits in a thicket.",
      at: {
        mil_r: [170, -620], mil_c: [0, -620], mil_l: [-175, -620], lee: [350, -610], hend: [-350, -610], guns: [40, -600, 'firing'],
        nc: [180, -830], va: [0, -830], md: [-190, -830], wash: [-60, -1030], kirk: [80, -1030],
        coffin: [340, -60],
      } },

    { time: '09:15', title: 'The militia fight like veterans', conf: 'documented',
      text: "The militia advance and fight far longer than anyone expects, firing as many as seventeen rounds a man before giving way. Greene later wrote that they fought with a firmness that would have graced veterans. As they finally fall back, the British line surges forward after them.",
      at: {
        mil_r: [170, -420, 'firing'], mil_c: [0, -420, 'firing'], mil_l: [-175, -420, 'firing'], guns: [40, -440, 'firing'],
        r6364: [170, -330, 'firing'], buffs: [20, -330, 'firing'], prov: [-150, -330, 'firing'],
      } },

    { time: '09:45', title: 'Sumner holds, then the British press on', conf: 'documented',
      text: "As the militia give way, Sumner's North Carolina Continentals, mostly new recruits, move up and halt the British advance. A British bayonet charge drives them back in turn, and Stewart's line comes on toward the Virginians and Marylanders.",
      at: {
        mil_r: [200, -800, 'broken'], mil_c: [40, -820, 'broken'], mil_l: [-160, -800, 'broken'],
        nc: [180, -560, 'broken'], va: [0, -700], md: [-190, -700],
        r6364: [170, -520, 'moving'], buffs: [20, -520, 'moving'], prov: [-150, -520, 'firing'],
      },
      arrows: [{ side: 'crown', path: [[100, -340], [100, -500]] }] },

    { time: '10:15', title: 'Trailed arms', conf: 'documented',
      text: "Greene orders Williams's Marylanders and Campbell's Virginians forward with trailed arms. They hold their fire, deliver a volley and charge with the bayonet. Campbell is mortally wounded. The British centre and left break and stream back through their camp, and Lee's Legion turns their flank.",
      at: {
        va: [0, -420, 'firing'], md: [-190, -420, 'firing'], nc: [180, -480, 'moving'], lee: [380, -400, 'moving'],
        r6364: [180, -120, 'routed'], buffs: [40, -80, 'routed'], prov: [-130, -150, 'broken'],
      },
      arrows: [{ side: 'allied', path: [[0, -680], [0, -440]] }, { side: 'allied', path: [[-190, -680], [-190, -440]] }, { side: 'crown', path: [[100, -500], [120, -120]] }] },

    { time: '10:30', title: 'Washington is taken', conf: 'documented',
      text: "Marjoribanks still holds the thicket by the creek, galling the American left. Washington leads his dragoons against it, but the horses cannot get through the blackjack scrub; most of his officers are shot down, and Washington, his horse killed, is bayoneted and captured. Kirkwood's Delawares and the State Troops come up and help push Marjoribanks back toward the house.",
      at: {
        wash: [-300, -250, 'routed'], kirk: [-260, -300, 'firing'], hend: [-360, -340, 'firing'],
        marj: [-250, -60, 'firing', 30],
      },
      arrows: [{ side: 'allied', path: [[-60, -1000], [-260, -600], [-300, -280]] }] },

    { time: '10:45', title: 'Plunder in the camp', conf: 'documented',
      text: "The victorious Americans burst into the British camp, full of food and rum. Many men stop to plunder, and their officers cannot get them back into order. Major Sheridan has packed New York Volunteers into the brick house, and they pour fire from its upper windows.",
      at: {
        va: [40, 60, 'broken'], md: [-120, 40, 'broken'], nc: [200, 40, 'broken'],
        house: [0, 0, 'firing'], marj: [-230, 10, 'firing', 30],
        r6364: [260, 260, 'broken'], buffs: [120, 300, 'broken'], prov: [-60, 230, 'broken'],
      },
      arrows: [{ side: 'allied', path: [[0, -400], [20, 30]] }] },

    { time: '11:30', title: "Marjoribanks's counter-attack", conf: 'documented',
      text: "Greene's guns are brought up close to batter the house, but their crews are shot down and the guns lost. Marjoribanks leaves his thicket and charges the disordered Americans in the camp, while Coffin's cavalry strikes their flank and a charge by Lee's horse fails. The Americans are driven out. Marjoribanks is mortally wounded in the fight.",
      at: {
        marj: [-90, -40, 'moving'], coffin: [200, -120, 'moving'], guns: [30, -60, 'captured'],
        va: [20, -330, 'broken'], md: [-140, -340, 'broken'], nc: [190, -350, 'broken'], lee: [330, -300, 'broken'],
        house: [0, 0, 'firing'], r6364: [190, 120], buffs: [60, 140], prov: [-80, 120],
      },
      arrows: [{ side: 'crown', path: [[-230, 10], [-140, -20], [-60, -60]] }, { side: 'crown', path: [[340, -60], [260, -100], [200, -120]] }] },

    { time: '13:00', title: 'Both sides claim it', conf: 'documented',
      text: "Greene re-forms and withdraws to Burdell's with his wounded, leaving the British in possession of the field. Stewart lost 85 killed, 297 wounded and several hundred captured or missing (counts differ), well over a third of his army; Greene lost 119 killed, 382 wounded and 78 missing. The next evening Stewart abandoned Eutaw and fell back toward Charleston. It was the last major battle in the Carolinas.",
      at: {
        va: [20, -900, 'moving'], md: [-160, -900, 'moving'], nc: [190, -900, 'moving'], lee: [340, -880, 'moving'],
        mil_r: [190, -1150], mil_c: [40, -1150], mil_l: [-150, -1150], hend: [-330, -1000], kirk: [-200, -980],
      },
      arrows: [{ side: 'allied', path: [[40, -400], [60, -1150]] }] },
  ],
};
