// Tactical reconstruction: Battle of Hobkirk's Hill, 25 April 1781. Format: see cowpens.js.
//
// Placement:
//   - Greene camped on the ridge about 1.5 miles north of Camden astride the Great Waxhaw Road, which
//     Broad Street (US 521) follows (OpenStreetMap). origin: Broad Street on the crest (the Greene
//     Street / Kirkwood Lane neighbourhood, named for the battle).
//   - Rawdon marched out of Camden and swung east along the edge of the Pine Tree Creek swamp to come at
//     the hill from the south-east, so Greene's line faced ~160 degrees. American right = west of the road.
//   - The whole field is built over; positions follow the accounts' descriptions only, hence "approximate".
//   - The order of Rawdon's regiments is reconstructed from differing accounts.
//   - Greene's line, left to right: 2nd Maryland, 1st Maryland, Hawes's 2nd Virginia, Campbell's 1st Virginia
//     (American Battlefield Trust). Campbell's regiment on the far right gave way first, exposing Hawes.
//
// Main sources: Greene's and Rawdon's reports; Otho Williams; John Buchanan, The Road to Charleston (2019);
// the Gunby court of inquiry (1781).
window.SC = window.SC || {};
SC.tactical = SC.tactical || {};

SC.tactical.hobkirk = {
  battle: 'hobkirk',
  title: "Battle of Hobkirk's Hill",
  date: '25 April 1781',
  level: 'approximate',
  origin: [-80.6089, 34.2655],
  facing: 160,
  camera: { at: [-40, 150], zoom: 15.4, pitch: 55, bearing: 0, elev: 70 },
  sources: "After Greene's and Rawdon's reports, Otho Williams, Buchanan (2019) and the Gunby court of inquiry. Road © OpenStreetMap contributors. The field is built over; positions follow the accounts and are approximate.",

  people: {
    Sumter: { id: 'sumter' }, Lee: { id: 'lee' }, Marion: { id: 'marion' },
    Greene: { id: 'greene' },
    Rawdon: { id: 'rawdon' },
    Washington: { id: 'wwashington' },
    Huger: { id: 'huger' },
    Williams: { id: 'owilliams' },
    Kirkwood: { force: 'continental', full: 'Capt. Robert Kirkwood, Delaware Continentals' },
    Gunby: { force: 'continental', full: 'Col. John Gunby, 1st Maryland' },
    Ford: { force: 'continental', full: 'Lt. Col. Benjamin Ford, 2nd Maryland (mortally wounded)' },
    Beatty: { force: 'continental', full: 'Capt. William Beatty, 1st Maryland (killed)' },
    Hawes: { force: 'continental', full: 'Lt. Col. Samuel Hawes, Virginia Continentals' },
    Campbell: { force: 'continental', full: 'Lt. Col. Richard Campbell, Virginia Continentals' },
  },

  units: {
    md2:  { name: "2nd Maryland (Ford)", short: '2nd Maryland', side: 'allied', force: 'continental', men: 250, type: 'line', w: 120, d: 24 },
    md1:  { name: "1st Maryland (Gunby)", short: '1st Maryland', side: 'allied', force: 'continental', men: 300, type: 'line', w: 130, d: 24 },
    guns: { name: "Harrison's three 6-pounders", short: 'Artillery', side: 'allied', force: 'continental', men: 50, type: 'artillery', w: 30, d: 18 },
    va1:  { name: "Campbell's Virginia regiment", short: 'Campbell (Va.)', side: 'allied', force: 'continental', men: 250, type: 'line', w: 120, d: 24 },
    va2:  { name: "Hawes's Virginia regiment", short: 'Hawes (Va.)', side: 'allied', force: 'continental', men: 250, type: 'line', w: 120, d: 24 },
    kirk: { name: "Kirkwood's Delawares and the pickets", short: 'Kirkwood & pickets', side: 'allied', force: 'continental', men: 100, type: 'skirmish', w: 140, d: 14 },
    wash: { name: "Washington's Continental dragoons", short: 'Washington', side: 'allied', force: 'continental', men: 90, type: 'cavalry', w: 50, d: 40 },
    ncm:  { name: 'North Carolina militia (reserve)', short: 'N.C. militia', side: 'allied', force: 'militia', men: 250, type: 'line', w: 110, d: 22 },

    nyv:  { name: 'New York Volunteers', short: 'N.Y. Volunteers', side: 'crown', force: 'loyalist', men: 200, type: 'line', w: 100, d: 24 },
    f63:  { name: '63rd Foot', short: '63rd', side: 'crown', force: 'british', men: 250, type: 'line', w: 110, d: 24 },
    kar:  { name: "King's American Regiment", short: "King's American Regt", side: 'crown', force: 'loyalist', men: 200, type: 'line', w: 100, d: 24 },
    voi:  { name: 'Volunteers of Ireland', short: 'Volunteers of Ireland', side: 'crown', force: 'loyalist', men: 250, type: 'line', w: 110, d: 24 },
    drag: { name: 'Loyalist dragoons and mounted men', short: 'Dragoons', side: 'crown', force: 'loyalist', men: 60, type: 'cavalry', w: 40, d: 34 },
  },

  roadLL: [[-80.60712, 34.24640], [-80.60759, 34.25110], [-80.60792, 34.25471], [-80.60841, 34.25955], [-80.60882, 34.26332],
    [-80.60907, 34.26607], [-80.60926, 34.26807], [-80.60942, 34.26976], [-80.60943, 34.27202]],
  notes: [
    { at: [-80, 1250], text: 'Camden, 1.5 miles' },
    { at: [-640, 420], text: 'Pine Tree Creek swamp: Rawdon\'s approach' },
    { at: [330, -120], text: "Hobkirk's Hill: Greene's camp" },
  ],

  phases: [
    { time: '10:00', title: 'Rawdon sallies from Camden', conf: 'documented',
      text: "Greene is camped on Hobkirk's Hill, waiting for help to besiege Camden. Warned by a deserter that Greene's artillery has been sent away, Rawdon arms every man he can, about 900, and marches out. Rather than come straight up the road, he swings east along the edge of the swamp to strike from an unexpected side. Many of Greene's men are cooking or washing clothes.",
      at: {
        md2: [-240, -60, 'formed', 0, 80, 40], md1: [-90, -60, 'formed', 0, 80, 40], va2: [130, -60, 'formed', 0, 80, 40], va1: [280, -60, 'formed', 0, 80, 40],
        guns: [15, -200], wash: [60, -280], ncm: [-60, -320], kirk: [-40, 360],
        nyv: [-560, 820, 'moving', 120], f63: [-620, 740, 'moving', 120], kar: [-680, 660, 'moving', 120], voi: [-740, 580, 'moving', 120], drag: [-800, 500, 'moving', 120],
      },
      arrows: [{ side: 'crown', path: [[-100, 1250], [-450, 1000], [-650, 700]] }] },

    { time: '10:30', title: "Kirkwood's pickets hold them up", conf: 'documented',
      text: "Kirkwood's Delawares and the pickets meet the British in the woods at the foot of the hill and fight a stubborn delaying action, buying Greene time. Greene forms on the crest: Huger's Virginians on the right of the road, Williams's Marylanders on the left, with three 6-pounders, which had just come back, in the centre.",
      at: {
        kirk: [-60, 320, 'firing'],
        md2: [-240, 0], md1: [-90, 0], guns: [15, 15], va2: [130, 0], va1: [280, 0],
        nyv: [-130, 420, 'moving', 20], f63: [-20, 440, 'moving', 20], kar: [90, 460, 'moving', 20], voi: [-40, 560, 'moving'], drag: [80, 600],
      },
      arrows: [{ side: 'crown', path: [[-600, 720], [-300, 560], [-120, 460]] }] },

    { time: '10:45', title: 'Greene tries to envelop', conf: 'documented',
      text: "Seeing how narrow Rawdon's front is, Greene orders a double envelopment: the regiments on the wings swing round both British flanks while the centre charges with the bayonet and the guns fire canister. Washington's cavalry rides wide round the British right to fall on the rear. Rawdon answers by bringing up the Volunteers of Ireland to lengthen his line.",
      at: {
        kirk: [-200, 160], guns: [15, 15, 'firing'],
        md2: [-330, 140, 'moving', 35], md1: [-90, 110, 'moving'], va2: [120, 120, 'moving'], va1: [330, 160, 'moving', -35],
        nyv: [-130, 300, 'firing'], f63: [-20, 300, 'firing'], kar: [90, 300, 'firing'], voi: [-250, 320, 'moving'],
        wash: [-520, -40, 'moving'],
      },
      arrows: [{ side: 'allied', path: [[60, -280], [-500, -100], [-720, 300]] }, { side: 'allied', path: [[-240, 10], [-330, 120]] }, { side: 'allied', path: [[280, 10], [330, 140]] }] },

    { time: '11:00', title: 'The 1st Maryland falters', conf: 'documented',
      text: "In the centre, Captain Beatty is killed and his company of the 1st Maryland wavers. Gunby orders the regiment to fall back and re-form, but the move turns into a retreat. Ford of the 2nd Maryland is mortally wounded and his men give way; on the right, Campbell's 1st Virginia meets stiff resistance and falls back, leaving Hawes's 2nd Virginia under fire from the flank, and the Virginians are ordered back. The British take the crest. Gunby's order was argued over for years afterward.",
      at: {
        md1: [-60, -180, 'routed'], md2: [-280, -120, 'broken'], va2: [140, -130, 'broken'], va1: [320, -60, 'moving'],
        nyv: [-150, 60, 'moving'], f63: [-30, 70, 'moving'], kar: [90, 60, 'moving'], voi: [-280, 140, 'firing'],
      },
      arrows: [{ side: 'crown', path: [[-20, 290], [-20, 80]] }] },

    { time: '11:15', title: 'Saving the guns', conf: 'documented',
      text: "Washington's dragoons, having ridden into Rawdon's rear, have rounded up some 200 prisoners, many of them surgeons and stragglers. Hearing the retreat, he comes back in time to save Greene's guns, which Greene himself helps drag away. Greene retreats about two miles; Rawdon, too weak to pursue, returns to Camden.",
      at: {
        wash: [10, -150, 'moving'], guns: [20, -380, 'moving'],
        md1: [-40, -700, 'moving'], md2: [-200, -720, 'moving'], va2: [120, -720, 'moving'], va1: [280, -700, 'moving'], ncm: [-40, -900, 'moving'], kirk: [-100, -800, 'moving'],
        nyv: [-140, 0], f63: [-20, 10], kar: [100, 0], voi: [-260, 40], drag: [40, -40, 'moving'],
      },
      arrows: [{ side: 'allied', path: [[-560, 0], [-300, -120], [0, -150]] }, { side: 'allied', path: [[20, -60], [20, -360]] }] },

    { time: '12:00', title: 'A defeat that won the campaign', conf: 'documented',
      text: "Each side lost about 260 men killed, wounded and missing. Greene had lost the field again, but Rawdon could not hold Camden with his posts falling one by one to Marion, Lee and Sumter. On 10 May he burned what he could not carry and abandoned Camden for good.",
      at: {} },
  ],
};
