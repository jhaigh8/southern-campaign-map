// Tactical reconstruction: Battle of Guilford Courthouse, 15 March 1781. Format: see cowpens.js.
//
// Placement:
//   - origin: the NPS "American First Line" marker where the line crossed the New Garden Road.
//     The British came from the west along that road; the American lines faced ~250 degrees.
//   - roadLL: New Garden Road. Inside the park this is the preserved historical trace
//     (OpenStreetMap, "New Garden Road (historical)"); to the west it follows the modern road
//     on roughly the old line toward Hoskins's farm.
//   - Second line ~250 m behind the first, in the woods (NPS Second Line Trail; sources give
//     300-350 yd). Third line ~550 yd beyond the second, north of the road on the rise west of the
//     courthouse, following newer NPS scholarship (Babits & Howard), which puts it further east
//     than the older monuments.
//   - The Stuart monument (where the 2nd Guards' commander fell) lies just in front of the third line,
//     and the "Expanding Battle" stop and Winston monument mark the separate fight on the American left.
//
// Main sources: Lawrence E. Babits & Joshua B. Howard, Long, Obstinate, and Bloody (2009);
// NPS Guilford Courthouse NMP Historic Resource Study; Greene's and Cornwallis's reports.
window.SC = window.SC || {};
SC.tactical = SC.tactical || {};

SC.tactical.guilford = {
  battle: 'guilford',
  title: 'Battle of Guilford Courthouse',
  date: '15 March 1781',
  level: 'detailed',
  origin: [-79.84690, 36.13181],
  facing: 250,
  camera: { at: [60, -380], zoom: 14.85, pitch: 55, bearing: 82, elev: 255 },
  sources: 'After Babits & Howard, Long, Obstinate, and Bloody (2009); NPS Guilford Courthouse NMP. Road trace and park landmarks © OpenStreetMap contributors. Positions approximate; frontages exaggerated.',

  people: {
    Greene: { id: 'greene' },
    Cornwallis: { id: 'cornwallis' },
    Washington: { id: 'wwashington' },
    Lee: { id: 'lee' },
    Huger: { id: 'huger' },
    Williams: { id: 'owilliams' },
    Tarleton: { id: 'tarleton' },
    Webster: { force: 'british', full: 'Lt. Col. James Webster, commanding the British left wing' },
    Leslie: { force: 'british', full: 'Maj. Gen. Alexander Leslie, commanding the British right wing' },
    "O'Hara": { force: 'british', full: "Brig. Gen. Charles O'Hara, Guards brigade" },
    Stuart: { force: 'british', full: 'Lt. Col. James Stuart, 2nd Battalion of Guards' },
    Campbell: { force: 'militia', full: 'Col. William Campbell, Virginia riflemen' },
    Kirkwood: { force: 'continental', full: 'Capt. Robert Kirkwood, Delaware Continentals' },
    Stevens: { force: 'militia', full: 'Brig. Gen. Edward Stevens, Virginia militia' },
    Lawson: { force: 'militia', full: 'Brig. Gen. Robert Lawson, Virginia militia' },
    Butler: { force: 'militia', full: 'Brig. Gen. John Butler, North Carolina militia' },
    Eaton: { force: 'militia', full: 'Brig. Gen. Pinketham Eaton, North Carolina militia' },
    Gunby: { force: 'continental', full: 'Col. John Gunby, 1st Maryland' },
    Singleton: { force: 'continental', full: 'Capt. Anthony Singleton, Continental artillery' },
  },

  units: {
    // ---- American ----
    nc_l:   { name: "Butler's North Carolina militia", short: 'N.C. militia (Butler)', side: 'allied', force: 'militia', men: 500, type: 'line', w: 300, d: 20 },
    nc_r:   { name: "Eaton's North Carolina militia", short: 'N.C. militia (Eaton)', side: 'allied', force: 'militia', men: 500, type: 'line', w: 300, d: 20 },
    guns:   { name: "Singleton's two 6-pounders", short: 'Singleton', side: 'allied', force: 'continental', men: 40, type: 'artillery', w: 22, d: 18 },
    lee:    { name: "Lee's Legion (horse and foot)", short: "Lee's Legion", side: 'allied', force: 'continental', men: 230, type: 'cavalry', w: 70, d: 40 },
    camp:   { name: "Campbell's Virginia riflemen", short: 'Campbell', side: 'allied', force: 'militia', men: 200, type: 'skirmish', w: 140, d: 14 },
    wash:   { name: "Washington's Continental dragoons", short: 'Washington', side: 'allied', force: 'continental', men: 86, type: 'cavalry', w: 50, d: 40 },
    kirk:   { name: "Kirkwood's Delawares & Lynch's riflemen", short: 'Kirkwood & Lynch', side: 'allied', force: 'continental', men: 260, type: 'skirmish', w: 140, d: 16 },
    va_l:   { name: "Stevens's Virginia militia", short: 'Va. militia (Stevens)', side: 'allied', force: 'militia', men: 600, type: 'line', w: 300, d: 22 },
    va_r:   { name: "Lawson's Virginia militia", short: 'Va. militia (Lawson)', side: 'allied', force: 'militia', men: 600, type: 'line', w: 300, d: 22 },
    md2:    { name: '2nd Maryland', short: '2nd Maryland', side: 'allied', force: 'continental', men: 330, type: 'line', w: 160, d: 24 },
    md1:    { name: '1st Maryland (Gunby)', short: '1st Maryland', side: 'allied', force: 'continental', men: 300, type: 'line', w: 150, d: 24 },
    va_c:   { name: "Huger's Virginia Continentals", short: 'Huger (Va. Continentals)', side: 'allied', force: 'continental', men: 780, type: 'line', w: 280, d: 26 },

    // ---- British ----
    bose:   { name: 'Regiment von Bose (Hessian)', short: 'von Bose', side: 'crown', force: 'british', men: 320, type: 'line', w: 150, d: 24 },
    h71:    { name: '71st Highlanders (2nd Bn)', short: '71st', side: 'crown', force: 'british', men: 210, type: 'line', w: 120, d: 24 },
    f23:    { name: '23rd Foot (Royal Welch Fusiliers)', short: '23rd', side: 'crown', force: 'british', men: 260, type: 'line', w: 130, d: 24 },
    f33:    { name: '33rd Foot', short: '33rd', side: 'crown', force: 'british', men: 320, type: 'line', w: 150, d: 24 },
    jag:    { name: 'Jägers & Guards light infantry', short: 'Jägers & light inf.', side: 'crown', force: 'british', men: 180, type: 'skirmish', w: 110, d: 16 },
    g1:     { name: '1st Battalion of Guards', short: '1st Guards', side: 'crown', force: 'british', men: 220, type: 'line', w: 120, d: 24 },
    g2:     { name: '2nd Battalion of Guards (Stuart)', short: '2nd Guards', side: 'crown', force: 'british', men: 230, type: 'line', w: 120, d: 24 },
    gren:   { name: 'Guards grenadiers', short: 'Grenadiers', side: 'crown', force: 'british', men: 100, type: 'line', w: 70, d: 24 },
    art:    { name: "MacLeod's 3-pounders", short: 'Royal Artillery', side: 'crown', force: 'british', men: 40, type: 'artillery', w: 26, d: 18 },
    tarl:   { name: "Tarleton's British Legion cavalry", short: 'Tarleton', side: 'crown', force: 'loyalist', men: 170, type: 'cavalry', w: 50, d: 60 },
  },

  roadLL: [
    [-79.85820, 36.12863], [-79.85535, 36.12971], [-79.85410, 36.13001], [-79.85257, 36.13037], [-79.84994, 36.13099],
    [-79.84798, 36.13144], [-79.84719, 36.13177], [-79.84664, 36.13192], [-79.84572, 36.13216], [-79.84486, 36.13258],
    [-79.84445, 36.13282], [-79.84346, 36.13336], [-79.84283, 36.13358], [-79.84241, 36.13356], [-79.84166, 36.13358],
    [-79.84118, 36.13354], [-79.84077, 36.13398], [-79.84023, 36.13434], [-79.83970, 36.13438], [-79.83827, 36.13441],
    [-79.83625, 36.13424], [-79.83459, 36.13420], [-79.83241, 36.13420],
  ],
  notes: [
    { at: [-260, 640], text: "Hoskins's farm fields: the British deploy" },
    { at: [-560, 120], text: 'First line: behind a rail fence at the wood edge' },
    { at: [-470, -260], text: 'Second line: in thick woods' },
    { at: [-112, -1083], text: 'Guilford Courthouse' },
    { at: [-460, -640], text: 'A separate fight on the American left' },
    { at: [900, -1320], text: 'Reedy Fork Road: the American retreat' },
  ],

  phases: [
    { time: '13:30', title: "Greene's three lines", conf: 'documented',
      text: "Greene copies Morgan's Cowpens plan on a larger scale. Butler's and Eaton's North Carolina militia hold a rail fence at the edge of the woods, asked for two volleys. About 300 yards behind them, Stevens's and Lawson's Virginians stand in thick woods. Some 550 yards further back, on the rise west of the courthouse, wait Huger's Virginia and Williams's Maryland Continentals. Lee and Campbell guard the left; Washington and Kirkwood the right. As Cornwallis's column comes up the New Garden Road, Singleton's two guns open an artillery duel.",
      at: {
        nc_l: [-230, 0], nc_r: [230, 0], guns: [12, 14, 'firing'],
        camp: [-470, 30], lee: [-570, -10], kirk: [470, 30], wash: [580, -20],
        va_l: [-200, -240], va_r: [200, -240],
        md2: [120, -740], md1: [290, -745], va_c: [530, -760],
        art: [10, 430, 'firing'], jag: [20, 520, 'moving', 90], f23: [30, 610, 'moving', 90], f33: [35, 700, 'moving', 90],
        h71: [40, 780, 'moving', 90], bose: [42, 870, 'moving', 90], g1: [40, 960, 'moving', 90], g2: [35, 1040, 'moving', 90],
        gren: [30, 1100, 'moving', 90], tarl: [20, 1170, 'moving', 90],
      } },

    { time: '13:45', title: 'Cornwallis deploys', conf: 'documented',
      text: "Cornwallis forms line in the fields of Hoskins's farm, about 400 yards from the fence. Leslie takes the right with the Hessian von Bose regiment and the 71st, backed by the 1st Guards. Webster takes the left with the 23rd and 33rd, with the jägers and Guards light infantry beyond. O'Hara holds the 2nd Guards and the grenadiers in support, and Tarleton's cavalry waits on the road.",
      at: {
        bose: [-400, 380], h71: [-190, 380], f23: [120, 380], f33: [320, 380], jag: [500, 400],
        g1: [-300, 480], g2: [150, 500], gren: [260, 520], art: [0, 420, 'firing'], tarl: [10, 700],
      },
      arrows: [{ side: 'crown', path: [[40, 800], [-150, 560], [-190, 420]] }, { side: 'crown', path: [[35, 700], [250, 520], [320, 420]] }] },

    { time: '14:00', title: 'The first line fires', conf: 'documented',
      text: "The British cross the open ground under fire. The North Carolinians fire at long range, then again as the British close. Webster's men halt, return a volley, and charge with the bayonet. On the flanks, Kirkwood's and Lynch's men and Campbell's riflemen pour fire into the advancing wings.",
      at: {
        nc_l: [-230, 0, 'firing'], nc_r: [230, 0, 'firing'], kirk: [470, 30, 'firing'], camp: [-470, 30, 'firing'],
        bose: [-400, 140, 'moving'], h71: [-190, 130, 'broken'], f23: [120, 130, 'broken'], f33: [320, 140, 'moving'], jag: [500, 160, 'moving'],
        g1: [-300, 260, 'moving'], g2: [150, 280, 'moving'], gren: [260, 300, 'moving'],
      },
      arrows: [{ side: 'crown', path: [[120, 370], [120, 170]] }, { side: 'crown', path: [[-190, 370], [-190, 170]] }] },

    { time: '14:10', title: 'The militia give way, and the battle splits', conf: 'probable',
      text: "Most of the North Carolina militia break and stream back through the woods. On the American left, Lee's Legion and Campbell's riflemen fall back south-east rather than toward the second line, and von Bose and the 1st Guards follow them: from here a separate battle is fought out of sight of the rest. On the right, Washington and Kirkwood fall back to the flank of the second line, and Singleton's guns withdraw to the third.",
      at: {
        nc_l: [-140, -560, 'routed'], nc_r: [260, -560, 'routed'], guns: [40, -720],
        camp: [-500, -200, 'firing'], lee: [-600, -230, 'moving'], bose: [-470, -60, 'moving'], g1: [-380, 0, 'moving'],
        wash: [480, -330], kirk: [460, -250],
        h71: [-170, 20, 'moving'], f23: [120, 10, 'moving'], f33: [330, 0, 'moving'], jag: [500, -20, 'moving'],
        g2: [150, 160, 'moving'], gren: [260, 180, 'moving'], art: [10, 150],
      },
      arrows: [{ side: 'allied', path: [[-470, 20], [-520, -100], [-520, -190]] }, { side: 'crown', path: [[-400, 120], [-450, 20], [-470, -40]] }] },

    { time: '14:25', title: 'The second line holds in the woods', conf: 'documented',
      text: "The Virginians fight hard among the trees, and the British regiments lose touch with one another. Stevens is shot through the thigh but keeps his brigade in action for a time. Kirkwood's and Lynch's men and Washington's horse keep up a galling fire from the American right.",
      at: {
        va_l: [-200, -240, 'firing'], va_r: [200, -240, 'firing'], kirk: [460, -250, 'firing'],
        h71: [-180, -170, 'firing'], f23: [100, -170, 'firing'], f33: [330, -190, 'firing'], jag: [490, -210, 'firing'],
        g2: [190, -60, 'moving'], gren: [300, -40, 'moving'], art: [10, -40],
      } },

    { time: '14:35', title: 'The second line gives way', conf: 'documented',
      text: "Lawson's brigade on the right is driven back first, then Stevens's men retire. The British push through the woods in fragments. Webster, with the 33rd, the jägers and the light infantry, swings north-east and is the first to reach the open ground in front of the Continentals. To the south, Campbell's riflemen and Lee's Legion fight on against von Bose and the 1st Guards.",
      at: {
        va_l: [-160, -520, 'broken'], va_r: [280, -600, 'routed'], kirk: [640, -640, 'moving'], wash: [700, -820],
        f33: [420, -480, 'moving'], jag: [580, -470, 'moving'], f23: [120, -390, 'broken'], h71: [-80, -390, 'broken'],
        g2: [130, -420, 'moving'], gren: [240, -430, 'moving'],
        bose: [-420, -420, 'firing'], g1: [-330, -380, 'firing'], lee: [-430, -560, 'firing'], camp: [-480, -520, 'firing'],
      },
      arrows: [{ side: 'crown', path: [[330, -200], [400, -350], [420, -460]] }, { side: 'crown', path: [[-400, -60], [-430, -250], [-420, -400]] }] },

    { time: '14:45', title: "Webster's attack is thrown back", conf: 'documented',
      text: "Webster sends the 33rd, the jägers and the light infantry across the open field and up the slope at the Continentals. The 1st Maryland and Huger's Virginians wait, then fire a crushing volley at close range and follow with a short bayonet charge. Webster's men fall back across the ravine; Webster himself is mortally wounded.",
      at: {
        md1: [290, -745, 'firing'], va_c: [530, -760, 'firing'],
        f33: [410, -560, 'broken'], jag: [590, -560, 'broken'],
      },
      arrows: [{ side: 'crown', path: [[420, -480], [410, -690]] }, { side: 'allied', path: [[290, -730], [330, -620]] }] },

    { time: '15:00', title: 'The Guards break the 2nd Maryland', conf: 'documented',
      text: "Stuart's 2nd Guards and the grenadiers come out of the woods near the road and strike the left of the Continental line. The 2nd Maryland, newly raised, breaks and runs, and the Guards take Singleton's two guns.",
      at: {
        g2: [140, -690, 'firing'], gren: [250, -680, 'firing'],
        md2: [130, -900, 'routed'], guns: [40, -720, 'captured'],
      },
      arrows: [{ side: 'crown', path: [[130, -420], [140, -660]] }, { side: 'crown', path: [[240, -430], [250, -650]] }] },

    { time: '15:05', title: 'The 1st Maryland and Washington counter-attack', conf: 'documented',
      text: "Gunby's 1st Maryland wheels to its left and charges the Guards with the bayonet, while Washington's dragoons ride straight through them from the flank. Stuart is killed in the hand-to-hand fighting and the Guards are cut up.",
      at: {
        md1: [210, -660, 'moving', -30], wash: [150, -620, 'moving'],
        g2: [130, -620, 'broken'], gren: [240, -620, 'broken'],
      },
      arrows: [{ side: 'allied', path: [[700, -820], [420, -640], [170, -630]] }, { side: 'allied', path: [[290, -735], [220, -680]] }] },

    { time: '15:10', title: 'Grapeshot into the mêlée?', conf: 'disputed',
      text: "The Guards fall back and the Americans return to their line. Henry Lee later wrote that Cornwallis ordered his guns to fire grapeshot into the struggling mass, hitting his own men to save the day. Several historians doubt the story; it is not in the British accounts. The 71st and 23rd come up and re-form near the road.",
      at: {
        art: [10, -470, 'firing'],
        g2: [110, -520, 'routed'], gren: [220, -520, 'broken'],
        md1: [290, -745], wash: [460, -820],
        h71: [0, -560], f23: [90, -540], f33: [400, -540],
      },
      arrows: [{ side: 'crown', path: [[10, -460], [100, -600]] }] },

    { time: '15:20', title: 'The fight on the left ends', conf: 'probable',
      text: "Out on the American left, von Bose and the 1st Guards finally drive Campbell's riflemen back after a long, confused fight in the woods. Lee's Legion withdraws without warning Campbell, a sore point between the two men afterward.",
      at: {
        bose: [-430, -640, 'moving'], g1: [-340, -600, 'moving'],
        camp: [-560, -820, 'routed'], lee: [-380, -860, 'moving'],
      },
      arrows: [{ side: 'allied', path: [[-430, -570], [-400, -830]] }, { side: 'crown', path: [[-420, -430], [-430, -610]] }] },

    { time: '15:30', title: 'Greene withdraws', conf: 'documented',
      text: "Rather than risk his army, Greene orders a retreat up the Reedy Fork Road, with Green's Virginia regiment covering it. Cornwallis's men are too exhausted to follow far; Tarleton's cavalry probes the rearguard and turns back. The British hold the field.",
      at: {
        va_c: [520, -900], md1: [760, -1160, 'moving'], md2: [860, -1260, 'moving'], wash: [680, -1060, 'moving'], kirk: [620, -1110, 'moving'],
        tarl: [330, -760, 'moving'],
        f33: [400, -700], jag: [560, -690], h71: [60, -720], f23: [180, -720], gren: [250, -700], g2: [120, -650],
      },
      arrows: [{ side: 'allied', path: [[300, -760], [600, -1050], [860, -1240]] }, { side: 'crown', path: [[10, 600], [200, -300], [320, -730]] }] },

    { time: '15:45', title: 'A costly victory', conf: 'documented',
      text: "Cornwallis won the field but lost 93 killed, 413 wounded and 26 missing, about a quarter of his army. American losses were 79 killed and 185 wounded among those who stayed, plus about a thousand militia missing who mostly went home. Cornwallis soon fell back to Wilmington, and Greene turned south into South Carolina. In London, Charles James Fox said another such victory would ruin the British army.",
      at: {} },
  ],
};
