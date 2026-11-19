// Tactical reconstruction: Siege of Ninety Six, 22 May - 19 June 1781. Format: see cowpens.js and yorktown.js.
//
// Placement:
//   - The Star Fort is drawn from its surviving earthwork outline (Ninety Six National Historic Site,
//     OpenStreetMap); origin is its centre. The Americans approached it from the north-north-west, so
//     the frame faces ~160 degrees; x toward the Allied right runs west-south-west, toward the village.
//   - The stockaded village, the stockade fort (Fort Holmes) beyond the spring branch, and Kosciuszko's
//     parallels, saps and mine are drawn schematically from the NPS park map's layout, hence "approximate".
//
// Main sources: NPS Ninety Six NHS; Greene's reports; Henry Lee's Memoirs; Robert M. Dunkerly & Eric K.
// Williams, Old Ninety Six (2006).
window.SC = window.SC || {};
SC.tactical = SC.tactical || {};

SC.tactical.ninety_six = {
  battle: 'ninety_six',
  title: 'Siege of Ninety Six',
  date: '22 May – 19 June 1781',
  level: 'approximate',
  origin: [-82.01833, 34.14612],
  facing: 160,
  camera: { at: [170, -160], zoom: 15.55, pitch: 52, bearing: 150, elev: 160 },
  sources: "After the NPS (Ninety Six NHS), Greene's reports, Lee's Memoirs and Dunkerly & Williams (2006). Star Fort outline © OpenStreetMap contributors; the other works are drawn schematically.",

  people: {
    Greene: { id: 'greene' },
    Cruger: { id: 'cruger' },
    Lee: { id: 'lee' },
    Rawdon: { id: 'rawdon' },
    Kosciuszko: { force: 'continental', full: 'Col. Thaddeus Kosciuszko, Greene\'s chief engineer' },
    Duval: { force: 'continental', full: 'Lt. Isaac Duval, Maryland Line (forlorn hope)' },
    Selden: { force: 'continental', full: 'Lt. Samuel Selden, Virginia Line (forlorn hope)' },
    Kirkwood: { force: 'continental', full: 'Capt. Robert Kirkwood, Delaware Continentals' },
  },

  units: {
    nyv:   { name: "DeLancey's 1st Battalion (New York) in the Star Fort", short: 'Star Fort (DeLancey\'s)', side: 'crown', force: 'loyalist', men: 150, type: 'line', w: 40, d: 40 },
    njv:   { name: 'New Jersey Volunteers and militia in the village', short: 'Village garrison', side: 'crown', force: 'loyalist', men: 250, type: 'line', w: 90, d: 50 },
    stk:   { name: 'South Carolina Loyalists in the stockade fort', short: 'Stockade fort', side: 'crown', force: 'loyalist', men: 150, type: 'line', w: 30, d: 30 },
    md:    { name: 'Maryland and Delaware Continentals', short: 'Md. & Del. Continentals', side: 'allied', force: 'continental', men: 400, type: 'line', w: 120, d: 30 },
    va:    { name: 'Virginia Continentals', short: 'Va. Continentals', side: 'allied', force: 'continental', men: 300, type: 'line', w: 110, d: 30 },
    nc:    { name: 'North Carolina Continentals', short: 'N.C. Continentals', side: 'allied', force: 'continental', men: 250, type: 'line', w: 100, d: 30 },
    lee:   { name: "Lee's Legion and Kirkwood's Delawares", short: "Lee's Legion", side: 'allied', force: 'continental', men: 300, type: 'line', w: 90, d: 30 },
    hope:  { name: 'Forlorn hope: axemen and hook-men (Duval, Selden)', short: 'Forlorn hope', side: 'allied', force: 'continental', men: 50, type: 'skirmish', w: 40, d: 14 },
  },

  works: [
    // Star Fort: surviving outline
    { kind: 'fort', side: 'crown', h: 5, pathLL: [[-82.01834, 34.14648], [-82.01819, 34.14637], [-82.01799, 34.14635], [-82.01803, 34.14616], [-82.01791, 34.14603], [-82.01804, 34.14597], [-82.01808, 34.14582], [-82.01823, 34.14584], [-82.01835, 34.14575], [-82.01842, 34.14586], [-82.01844, 34.14592], [-82.01867, 34.14591], [-82.01868, 34.14606], [-82.01880, 34.14624], [-82.01865, 34.14628], [-82.01863, 34.14642], [-82.01840, 34.14640]] },
    { kind: 'trench', side: 'crown', path: [[90, -60], [310, -60], [310, 70], [90, 70], [90, -60]] },                 // village stockade
    { kind: 'trench', side: 'crown', path: [[60, 0], [90, 0]] },                                                      // covered way to the Star Fort
    { kind: 'redoubt', side: 'crown', h: 4, path: [[405, 5], [435, 5], [435, 35], [405, 35]], to: 2 },                // stockade fort (taken by Lee on 18 June)
    { kind: 'redoubt', side: 'crown', h: 4, path: [[405, 5], [435, 5], [435, 35], [405, 35]], from: 4 },
    { kind: 'redoubt', side: 'allied', h: 4, path: [[405, 5], [435, 5], [435, 35], [405, 35]], from: 3, to: 3 },
    // First approach (destroyed by Cruger's sortie the first night)
    { kind: 'trench', side: 'allied', to: 0, path: [[-60, -90], [60, -90]] },
    // Parallels and zig-zag saps toward the Star Fort, and the unfinished mine
    { kind: 'trench', side: 'allied', from: 1, path: [[-220, -260], [-60, -250], [100, -260], [220, -250]] },
    { kind: 'trench', side: 'allied', from: 1, path: [[0, -250], [-40, -200], [20, -160], [-30, -120], [10, -80]] },
    { kind: 'trench', side: 'allied', from: 2, path: [[-120, -90], [10, -80], [110, -95]] },
    { kind: 'trench', side: 'allied', from: 2, path: [[10, -80], [5, -40]] },
    { kind: 'trench', side: 'allied', from: 2, path: [[420, -220], [480, -120], [450, -40]] },                       // Lee's approach to the stockade fort
  ],

  notes: [
    { at: [-40, -120], text: "Kosciuszko's saps and mine" },
    { at: [200, 110], text: 'Stockaded village of Ninety Six' },
    { at: [360, 70], text: 'Spring branch: the garrison\'s water' },
    { at: [60, -320], text: 'Rifle tower' },
  ],

  phases: [
    { time: '22 May', title: 'Greene arrives', conf: 'documented',
      text: "Greene reaches Ninety Six with about 1,000 Continentals and militia. Its 550 Loyalists under Cruger hold the stockaded village, a stockade fort guarding their water supply, and a new eight-pointed earthen Star Fort. Kosciuszko starts the first approach only about 70 yards from the Star Fort, and that night Cruger's men sally out, kill the diggers and wreck the work.",
      at: {
        nyv: [0, 0], njv: [200, 0], stk: [420, 20],
        md: [-60, -450], va: [150, -470], nc: [-260, -430],
      },
      arrows: [{ side: 'crown', path: [[0, -20], [0, -80]] }] },

    { time: '1–3 June', title: 'Digging in', conf: 'documented',
      text: "Kosciuszko starts again further out with a proper parallel and zig-zag saps creeping toward the Star Fort. The Americans build a log tower so riflemen can fire down into the fort, and shoot burning arrows at the buildings; Cruger has the roofs pulled off. Greene summons Cruger to surrender and is refused.",
      at: {
        md: [-60, -300], va: [150, -310], nc: [-220, -290], nyv: [0, 0, 'firing'],
      } },

    { time: '8–17 June', title: 'The water supply', conf: 'documented',
      text: "Lee's Legion arrives from the capture of Augusta and opens approaches on the stockade fort that covers the spring. With the spring under fire, the garrison suffers badly for water; enslaved men carry it in by night, stripped naked so they cannot be seen in the dark. The saps reach the Star Fort's ditch and a mine is begun beneath it.",
      at: {
        lee: [470, -260], md: [-60, -150], va: [120, -140, 'firing'], stk: [420, 20, 'firing'],
      } },

    { time: '18 June', title: 'The assault', conf: 'documented',
      text: "Word comes that Rawdon is marching to the rescue with 2,000 men, and Greene gambles on an assault. The forlorn hope under Duval and Selden rushes the Star Fort with axes and hooks to pull down the sandbags, but Loyalists charge out into the ditch from both sides and a desperate bayonet fight follows; nearly all the attackers are killed or wounded. Lee's men take the stockade fort, but the Star Fort holds.",
      at: {
        hope: [0, -45, 'firing'], md: [-40, -110, 'firing'], va: [100, -110, 'firing'],
        nyv: [0, -10, 'firing'], lee: [450, -40, 'firing'], stk: [470, 140, 'routed'],
      },
      arrows: [{ side: 'allied', path: [[0, -160], [0, -55]] }, { side: 'crown', path: [[-30, 20], [-40, -30]] }, { side: 'allied', path: [[480, -200], [450, -60]] }] },

    { time: '19 June', title: 'Greene withdraws', conf: 'documented',
      text: "With Rawdon only a day or two away, Greene lifts the siege after 28 days and marches north, the costliest of his failures that summer: he lost about 150 men, the garrison about 85. But Rawdon could not hold the back country either: within weeks he abandoned Ninety Six and pulled the British back toward Charleston.",
      at: {
        hope: [0, -45, 'captured'], md: [-60, -650, 'moving'], va: [150, -680, 'moving'], nc: [-220, -640, 'moving'], lee: [440, -620, 'moving'],
        nyv: [0, 0], stk: [250, 40], njv: [200, 0],
      },
      arrows: [{ side: 'allied', path: [[0, -300], [0, -800]] }] },
  ],
};
