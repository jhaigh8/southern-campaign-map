// Tactical reconstruction: Siege of Charleston, 29 March - 12 May 1780. Format: see cowpens.js and yorktown.js.
//
// Placement:
//   - origin: the hornwork at the centre of the American lines across Charleston Neck, whose tabby remains
//     stand in Marion Square (~32.787 N, 79.937 W). The lines ran from the Ashley River to the Cooper River
//     roughly along today's Calhoun Street, with a canal (wet ditch) in front; the British approached down
//     the Neck from the north, so the American line faced ~350 degrees.
//   - Parallel distances follow the accounts (first ~800 yd, second ~450 yd, third at the canal); all
//     lines are drawn schematically over the modern city, hence "approximate".
//
// Main sources: Carl P. Borick, A Gallant Defense (2003); Clinton's and Lincoln's papers; Johann Ewald's diary.
window.SC = window.SC || {};
SC.tactical = SC.tactical || {};

SC.tactical.siege_charleston = {
  battle: 'siege_charleston',
  title: 'Siege of Charleston',
  date: '29 March – 12 May 1780',
  level: 'approximate',
  origin: [-79.9370, 32.7869],
  facing: 350,
  camera: { at: [-150, 380], zoom: 14.4, pitch: 50, bearing: 170, elev: 5 },
  sources: "After Borick, A Gallant Defense (2003), Clinton's and Lincoln's papers and Ewald's diary. Lines drawn schematically over the modern city.",

  people: {
    Lincoln: { id: 'lincoln' },
    Clinton: { id: 'clinton' },
    Cornwallis: { id: 'cornwallis' },
    Moultrie: { id: 'moultrie' },
    Tarleton: { id: 'tarleton' },
    Huger: { id: 'huger' },
    Arbuthnot: { force: 'british', full: 'Vice Adm. Marriot Arbuthnot, Royal Navy' },
    Rutledge: { force: 'militia', full: 'John Rutledge, Governor of South Carolina' },
  },

  units: {
    am_w:  { name: 'Continentals: North Carolina and Virginia brigades', short: 'Continentals (west)', side: 'allied', force: 'continental', men: 1500, type: 'line', w: 400, d: 40 },
    am_c:  { name: 'The hornwork: South Carolina Continentals and artillery', short: 'Hornwork', side: 'allied', force: 'continental', men: 800, type: 'line', w: 160, d: 60 },
    am_e:  { name: 'Continentals and militia (east)', short: 'Continentals (east)', side: 'allied', force: 'continental', men: 1200, type: 'line', w: 360, d: 40 },
    mil:   { name: 'Charleston and country militia', short: 'Militia', side: 'allied', force: 'militia', men: 2000, type: 'line', w: 300, d: 60 },
    br_w:  { name: 'Hessian grenadiers and jägers', short: 'Hessians', side: 'crown', force: 'british', men: 3000, type: 'line', w: 360, d: 60 },
    br_c:  { name: 'British grenadiers and light infantry', short: 'British grenadiers & light inf.', side: 'crown', force: 'british', men: 3000, type: 'line', w: 340, d: 60 },
    br_e:  { name: 'British line regiments and Provincials', short: 'Line regiments', side: 'crown', force: 'british', men: 3000, type: 'line', w: 360, d: 60 },
    sart:  { name: 'Royal Artillery siege batteries', short: 'Siege batteries', side: 'crown', force: 'british', men: 500, type: 'artillery', w: 80, d: 30 },
  },

  works: [
    { kind: 'trench', side: 'allied', path: [[-1350, 60], [-900, 20], [-400, 10], [-120, 30], [-60, 110], [60, 110], [120, 30], [400, 10], [850, 30], [1050, 60]] },  // American lines with the hornwork
    { kind: 'trench', side: 'allied', path: [[-1300, 120], [1000, 120]] },                                                         // canal (wet ditch)
    { kind: 'redoubt', side: 'allied', h: 5, path: [[-60, 20], [60, 20], [60, 110], [-60, 110]] },                               // hornwork
    { kind: 'trench', side: 'crown', from: 0, path: [[-900, 760], [-300, 730], [300, 730], [800, 760]] },                         // first parallel
    { kind: 'trench', side: 'crown', from: 2, path: [[-700, 430], [-200, 410], [300, 410], [700, 440]] },                         // second parallel
    { kind: 'trench', side: 'crown', from: 2, path: [[0, 730], [40, 620], [-30, 520], [20, 410]] },                               // approach
    { kind: 'trench', side: 'crown', from: 3, path: [[-400, 160], [-100, 150], [200, 150], [500, 170]] },                         // third parallel, at the canal
    { kind: 'trench', side: 'crown', from: 3, path: [[20, 410], [-40, 320], [30, 230], [-10, 150]] },
  ],

  notes: [
    { at: [-1500, 300], text: 'Ashley River' },
    { at: [1200, 300], text: 'Cooper River' },
    { at: [0, -900], text: 'Charleston' },
    { at: [0, 1500], text: 'Charleston Neck: the British advance' },
  ],

  phases: [
    { time: '29 March – 1 April', title: 'Clinton closes in', conf: 'documented',
      text: "After landing south of the city, Clinton's army of about 10,000 crosses the Ashley River above Charleston and marches down the Neck. On the night of 1 April it digs the first parallel about 800 yards from Lincoln's lines, which run across the Neck from river to river behind a canal, with a masonry-and-tabby hornwork at the centre.",
      at: {
        am_w: [-650, 0], am_c: [0, 60], am_e: [600, 0], mil: [0, -500],
        br_w: [-600, 900], br_c: [0, 950], br_e: [550, 900], sart: [0, 780, 'moving'],
      },
      arrows: [{ side: 'crown', path: [[-1200, 2000], [-600, 1500], [-500, 1000]] }] },

    { time: '10–13 April', title: 'Summons and bombardment', conf: 'documented',
      text: "Clinton and Admiral Arbuthnot, whose ships have run past Fort Moultrie into the harbour, summon Lincoln to surrender. He refuses, and on 13 April the British batteries open on the lines and the town. Governor Rutledge leaves the city to keep a government in the field.",
      at: { sart: [0, 760, 'firing'], am_c: [0, 60, 'firing'] } },

    { time: '19–20 April', title: 'The second parallel; the trap shut', conf: 'documented',
      text: "The British open a second parallel about 450 yards out. Behind Charleston, Tarleton's surprise of Huger's cavalry at Monck's Corner on 14 April, and Cornwallis's troops on the Cooper River, have cut the last road out. A council of war talks of evacuating the army, but the townspeople object and the chance passes.",
      at: {
        sart: [0, 440, 'firing'], br_w: [-500, 520], br_c: [0, 540], br_e: [450, 520],
      } },

    { time: '6–8 May', title: 'At the canal', conf: 'documented',
      text: "The third parallel reaches the canal itself, and the British drain the wet ditch. On 7 May Fort Moultrie, out on Sullivan's Island, surrenders without a fight. Clinton renews his summons; Lincoln asks for terms that would let the militia go home and the army march out with honours, and is refused.",
      at: {
        sart: [0, 190, 'firing'], br_w: [-450, 260], br_c: [0, 250], br_e: [400, 260],
        am_w: [-650, 0, 'broken'], am_c: [0, 60, 'firing'], am_e: [600, 0, 'broken'],
      } },

    { time: '9–11 May', title: 'The great bombardment', conf: 'documented',
      text: "On the night of 9 May both sides fire everything they have. British hot shot sets fires in the town. With the defenders exhausted, short of food and the enemy at the ditch, the townspeople and militia beg Lincoln to give up, and on 11 May he asks for terms.",
      at: { sart: [0, 190, 'firing'], am_c: [0, 60, 'firing'], mil: [0, -500, 'broken'] } },

    { time: '12 May', title: 'The surrender of Charleston', conf: 'documented',
      text: "Lincoln's army marches out and lays down its arms. About 5,000 Continentals, militia and armed citizens became prisoners, with hundreds of guns and the South's main port: the worst American defeat of the war. Within weeks British posts stretched across South Carolina, and Clinton sailed north, leaving Cornwallis in command.",
      at: {
        am_w: [-650, 250, 'captured'], am_c: [0, 280, 'captured'], am_e: [600, 250, 'captured'], mil: [0, -400, 'captured'],
        br_c: [0, 400], br_w: [-500, 420], br_e: [450, 420],
      },
      arrows: [{ side: 'allied', path: [[0, 40], [0, 260]] }] },
  ],
};
