// Tactical reconstruction: Siege of Savannah, 16 September - 18 October 1779, centred on the assault of
// 9 October. Format: see cowpens.js and yorktown.js.
//
// Placement:
//   - origin: the Spring Hill redoubt reconstruction in Battlefield Memorial Park (OpenStreetMap), at the
//     south-west corner of the British lines; archaeologists found the original redoubt's ditch close by
//     (Coastal Heritage Society, 2005). The assault columns came from the south-west through swampy
//     woods, so the frame faces ~50 degrees (x toward the Allied right runs south-east, along the lines).
//   - The British lines around the town and the Allied siege works south-east of it are drawn
//     schematically; the town is now built over, hence "approximate".
//
// Main sources: Alexander A. Lawrence, Storm over Savannah (1951); d'Estaing's and Prevost's reports;
// Coastal Heritage Society archaeology at Spring Hill.
window.SC = window.SC || {};
SC.tactical = SC.tactical || {};

SC.tactical.siege_savannah = {
  battle: 'siege_savannah',
  title: 'Siege of Savannah',
  date: '16 September – 18 October 1779',
  level: 'approximate',
  origin: [-81.0996, 32.0755],
  facing: 50,
  camera: { at: [150, -50], zoom: 15.0, pitch: 52, bearing: 0, elev: 10 },
  sources: "After Lawrence, Storm over Savannah (1951), d'Estaing's and Prevost's reports, and the Spring Hill archaeology. Redoubt site © OpenStreetMap contributors; lines drawn schematically over the modern city.",

  people: {
    "d'Estaing": { id: 'destaing' },
    Lincoln: { id: 'lincoln' },
    Prevost: { id: 'prevost' },
    Huger: { id: 'huger' },
    Pulaski: { force: 'continental', full: 'Brig. Gen. Casimir Pulaski, Pulaski\'s Legion (mortally wounded)' },
    Laurens: { force: 'continental', full: 'Lt. Col. John Laurens, light infantry' },
    Jasper: { force: 'continental', full: 'Sgt. William Jasper, 2nd South Carolina (killed)' },
    McIntosh: { force: 'continental', full: 'Brig. Gen. Lachlan McIntosh' },
    Maitland: { force: 'british', full: 'Lt. Col. John Maitland, 71st Highlanders' },
    Glazier: { force: 'british', full: 'Maj. Beamsley Glazier, grenadiers of the 60th' },
  },

  units: {
    sh:     { name: 'Spring Hill redoubt: South Carolina Royalists and Loyalist militia', short: 'Spring Hill', side: 'crown', force: 'loyalist', men: 150, type: 'line', w: 30, d: 30 },
    bat:    { name: 'Neighbouring battery and redoubt', short: 'Battery', side: 'crown', force: 'british', men: 100, type: 'artillery', w: 30, d: 24 },
    gren:   { name: "Glazier's grenadiers of the 60th and marines", short: 'Glazier', side: 'crown', force: 'british', men: 150, type: 'line', w: 50, d: 24 },
    h71:    { name: "Maitland's 71st Highlanders", short: '71st (Maitland)', side: 'crown', force: 'british', men: 800, type: 'line', w: 120, d: 40 },
    gar:    { name: "Prevost's main garrison", short: 'Garrison', side: 'crown', force: 'british', men: 1500, type: 'line', w: 200, d: 60 },
    fr:     { name: "French assault columns (d'Estaing)", short: "French columns (d'Estaing)", side: 'allied', force: 'french', men: 2500, type: 'line', w: 120, d: 80 },
    am:     { name: "Laurens's light infantry and the 2nd South Carolina", short: 'Laurens & 2nd S.C.', side: 'allied', force: 'continental', men: 600, type: 'line', w: 70, d: 60 },
    mci:    { name: "McIntosh's column", short: 'McIntosh', side: 'allied', force: 'continental', men: 500, type: 'line', w: 60, d: 60 },
    pul:    { name: "Pulaski's cavalry", short: 'Pulaski', side: 'allied', force: 'continental', men: 200, type: 'cavalry', w: 40, d: 50 },
    feint:  { name: "Huger's feint (Georgia and South Carolina militia)", short: 'Huger (feint)', side: 'allied', force: 'militia', men: 500, type: 'line', w: 120, d: 30 },
    sbat:   { name: 'Allied siege batteries', short: 'Siege batteries', side: 'allied', force: 'french', men: 500, type: 'artillery', w: 80, d: 30 },
  },

  works: [
    { kind: 'trench', side: 'crown', path: [[-560, 470], [-260, 220], [0, 0], [430, 250], [860, 500], [1250, 730]] },        // British lines (schematic)
    { kind: 'redoubt', side: 'crown', h: 5, path: [[-20, -20], [20, -20], [20, 20], [-20, 20]] },                           // Spring Hill
    { kind: 'redoubt', side: 'crown', path: [[-220, 170], [-185, 170], [-185, 205], [-220, 205]] },
    { kind: 'redoubt', side: 'crown', path: [[300, 165], [335, 165], [335, 200], [300, 200]] },
    { kind: 'trench', side: 'allied', from: 1, path: [[760, 120], [1000, 260], [1240, 410]] },                                // Allied siege works
  ],

  notes: [
    { at: [-450, -250], text: 'Swamp and woods: the assault columns\' approach' },
    { at: [700, 900], text: 'Savannah' },
    { at: [-700, 650], text: 'Savannah River' },
  ],

  phases: [
    { time: '16 September', title: 'A chance thrown away', conf: 'documented',
      text: "A French fleet and army under d'Estaing, joined by Lincoln's Americans, appear before Savannah. D'Estaing summons Prevost to surrender to the King of France; Prevost asks for 24 hours to consider, and in that time Maitland's 800 Highlanders slip in from Beaufort through the marshes. Prevost then refuses.",
      at: {
        sh: [0, 0], bat: [-200, 190], gren: [180, 230], gar: [750, 800], h71: [500, 600, 'moving'],
        fr: [500, -900], am: [900, -800], sbat: [700, -900, 'moving'],
      },
      arrows: [{ side: 'crown', path: [[-700, 900], [-200, 800], [450, 620]] }] },

    { time: '4–8 October', title: 'The bombardment', conf: 'documented',
      text: "The Allies dig siege works south-east of the town and bombard it for five days. Houses burn and civilians die, but the earthworks are hardly damaged. With the hurricane season on him and his fleet exposed, d'Estaing will not wait for a regular siege, and decides to storm the lines.",
      at: { sbat: [1000, 200, 'firing'], gar: [750, 800, 'broken'] } },

    { time: '9 October, before dawn', title: 'Columns in the swamp', conf: 'documented',
      text: "The assault columns form in the woods south-west of Spring Hill while militia under Huger make a feint against the far end of the lines. The plan has been betrayed by a deserter, and the columns are late, tangled in the swampy ground. Spring Hill's defenders are waiting, and grenadiers and marines are held ready behind it.",
      at: {
        fr: [-350, -420, 'moving', 30], am: [-80, -480, 'moving', 30], mci: [-520, -300, 'moving', 30], pul: [150, -560],
        feint: [1300, 300, 'firing'], gren: [130, 160],
      },
      arrows: [{ side: 'allied', path: [[300, -900], [-150, -800], [-380, -500]] }] },

    { time: '9 October, dawn', title: 'The assault on Spring Hill', conf: 'documented',
      text: "The French columns and Laurens's Americans charge into a storm of musketry and grapeshot from the redoubt and the batteries on either side. Men reach the ditch and the parapet; d'Estaing is wounded twice. Sergeant Jasper of the 2nd South Carolina is killed planting the regiment's colours on the redoubt, as he had at Fort Moultrie three years before.",
      at: {
        fr: [-80, -80, 'firing', 30, 120, 60], am: [40, -60, 'firing', 30], mci: [-380, -120, 'broken', 30],
        sh: [0, 0, 'firing'], bat: [-200, 190, 'firing'],
      },
      arrows: [{ side: 'allied', path: [[-350, -380], [-150, -170], [-60, -60]] }, { side: 'allied', path: [[-80, -440], [10, -200], [30, -50]] }] },

    { time: '9 October', title: 'Pulaski falls; the counter-attack', conf: 'documented',
      text: "Pulaski leads his cavalry in a charge to break through between the redoubts and is mortally wounded by grapeshot. Then Glazier's grenadiers and the marines charge out and sweep the attackers from the ditch with the bayonet. After about an hour the Allies fall back, leaving the ditch filled with dead.",
      at: {
        pul: [180, 60, 'routed'], gren: [20, -60, 'moving'],
        fr: [-320, -380, 'routed', 30], am: [-120, -420, 'broken', 30], mci: [-520, -300, 'broken', 30],
      },
      arrows: [{ side: 'allied', path: [[150, -500], [200, -200], [180, 40]] }, { side: 'crown', path: [[130, 160], [40, 40], [0, -60]] }] },

    { time: '18 October', title: 'The siege is lifted', conf: 'documented',
      text: "In one of the bloodiest hours of the war, the Allies lost about 800 killed and wounded, the defenders barely a hundred. D'Estaing re-embarked his army, Lincoln retreated to Charleston, and Georgia stayed in British hands. Emboldened, the British sailed south the following spring to besiege Charleston.",
      at: {
        fr: [-200, -1000, 'moving'], am: [100, -1050, 'moving'], mci: [-400, -950, 'moving'], pul: [250, -950], sbat: [1000, -300, 'moving'], feint: [1300, -200, 'moving'],
        sh: [0, 0], gren: [130, 160],
      } },
  ],
};
