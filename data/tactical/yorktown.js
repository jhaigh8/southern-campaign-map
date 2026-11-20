// Tactical reconstruction: Siege of Yorktown, 28 September - 19 October 1781. Format: see cowpens.js;
// `works` draws the siege lines (see js/tactical.js).
//
// Placement (Colonial National Historical Park landmarks, OpenStreetMap):
//   - origin: the "British Inner Defense Line" marker south of the town; facing ~10 degrees, the direction
//     the Allied lines faced. x toward the Allied right (the Americans, east, by the York River below
//     town), y toward the British works.
//   - Redoubts 9 and 10, the French Grand Battery (on the first parallel), the Second Allied Siege Line,
//     Pigeon Hill (Pigeon Quarter) and the Fusiliers' Redoubt are placed at their marked positions.
//     The works between them are drawn schematically along those points.
//   - Garrison and camp blocks are schematic: they show where each army was, not formations.
//
// Main sources: NPS Colonial NHP; Jerome A. Greene, The Guns of Independence (2005); Washington's diary;
// Cornwallis's report; Johann Ewald's diary.
window.SC = window.SC || {};
SC.tactical = SC.tactical || {};

SC.tactical.yorktown = {
  battle: 'yorktown',
  title: 'Siege of Yorktown',
  date: '28 September – 19 October 1781',
  level: 'detailed',
  origin: [-76.5061, 37.2294],
  facing: 10,
  camera: { at: [80, -250], zoom: 14.4, pitch: 50, bearing: 0, elev: 15 },
  sources: "After the NPS (Colonial NHP), Greene, The Guns of Independence (2005), Washington's diary and Cornwallis's report. Earthwork sites © OpenStreetMap contributors; lines between them drawn schematically; troop blocks schematic.",

  people: {
    Dundas: { force: 'british', full: 'Lt. Col. Thomas Dundas, British surrender commissioner' },
    Washington: { id: 'gwashington' },
    Rochambeau: { id: 'rochambeau' },
    Lafayette: { id: 'lafayette' },
    Steuben: { id: 'steuben' },
    Lincoln: { id: 'lincoln' },
    Wayne: { id: 'wayne' },
    Cornwallis: { id: 'cornwallis' },
    "de Grasse": { id: 'degrasse' },
    Clinton: { id: 'clinton' },
    Tarleton: { id: 'tarleton' },
    Hamilton: { force: 'continental', full: 'Lt. Col. Alexander Hamilton, Continental light infantry' },
    Laurens: { force: 'continental', full: 'Lt. Col. John Laurens, Continental light infantry' },
    'Deux-Ponts': { force: 'french', full: 'Lt. Col. Guillaume, comte de Deux-Ponts, Royal Deux-Ponts regiment' },
    Abercromby: { force: 'british', full: 'Lt. Col. Robert Abercromby, Guards light infantry' },
    "O'Hara": { force: 'british', full: "Brig. Gen. Charles O'Hara, second-in-command" },
    Knox: { force: 'continental', full: 'Brig. Gen. Henry Knox, Continental artillery' },
  },

  units: {
    // ---- British garrison ----
    g_w:    { name: 'Garrison: western works (Germans and others)', short: 'Garrison (west)', side: 'crown', force: 'british', men: 2000, type: 'line', w: 240, d: 60 },
    g_c:    { name: 'Garrison: centre and hornwork', short: 'Garrison (centre)', side: 'crown', force: 'british', men: 2000, type: 'line', w: 260, d: 60 },
    g_e:    { name: 'Garrison: eastern works', short: 'Garrison (east)', side: 'crown', force: 'british', men: 1500, type: 'line', w: 220, d: 60 },
    r9g:    { name: 'Redoubt 9 garrison (British and Germans)', short: 'Redoubt 9', side: 'crown', force: 'british', men: 120, type: 'line', w: 30, d: 30 },
    r10g:   { name: 'Redoubt 10 garrison', short: 'Redoubt 10', side: 'crown', force: 'british', men: 70, type: 'line', w: 26, d: 26 },
    fus:    { name: "Fusiliers' Redoubt (23rd Foot and marines)", short: "Fusiliers' Redoubt", side: 'crown', force: 'british', men: 150, type: 'line', w: 40, d: 40 },
    sortie: { name: "Abercromby's sortie (Guards and light infantry)", short: 'Abercromby', side: 'crown', force: 'british', men: 350, type: 'line', w: 90, d: 24 },

    // ---- Allies ----
    fr_w:   { name: 'French infantry: Touraine, Agenais, Saintonge, Soissonnais', short: 'French (left)', side: 'allied', force: 'french', men: 4000, type: 'line', w: 360, d: 50 },
    fr_c:   { name: 'French infantry: Bourbonnais, Royal Deux-Ponts, Gâtinais', short: 'French (centre)', side: 'allied', force: 'french', men: 3500, type: 'line', w: 320, d: 50 },
    fr_art: { name: 'French siege artillery (Grand Battery)', short: 'French guns', side: 'allied', force: 'french', men: 600, type: 'artillery', w: 70, d: 26 },
    am_c:   { name: 'Continental brigades (Lincoln, Steuben)', short: 'Continentals', side: 'allied', force: 'continental', men: 3500, type: 'line', w: 320, d: 50 },
    am_li:  { name: "Lafayette's light infantry division", short: 'Light infantry (Lafayette)', side: 'allied', force: 'continental', men: 2000, type: 'line', w: 220, d: 40 },
    am_mil: { name: "Nelson's Virginia militia", short: 'Va. militia (Nelson)', side: 'allied', force: 'militia', men: 3000, type: 'line', w: 280, d: 50 },
    am_art: { name: "Knox's American siege batteries", short: 'American guns', side: 'allied', force: 'continental', men: 400, type: 'artillery', w: 60, d: 26 },
    st9:    { name: "Deux-Ponts's assault column (Gâtinais & Royal Deux-Ponts)", short: 'Deux-Ponts (400)', side: 'allied', force: 'french', men: 400, type: 'line', w: 50, d: 40 },
    st10:   { name: "Hamilton's assault column (light infantry)", short: 'Hamilton (400)', side: 'allied', force: 'continental', men: 400, type: 'line', w: 40, d: 40 },
  },

  works: [
    // British main works around the town (schematic between known points), the hornwork in the centre
    { kind: 'trench', side: 'crown', path: [[-560, 760], [-560, 460], [-480, 190], [-300, 50], [-80, 10], [0, -40], [80, 10], [250, 40], [400, 110], [520, 230], [640, 380], [720, 520]] },
    { kind: 'redoubt', side: 'crown', path: [[-1200, 990], [-1160, 990], [-1160, 1030], [-1200, 1030]] },                  // Fusiliers' Redoubt
    { kind: 'redoubt', side: 'crown', path: [[-540, -816], [-498, -816], [-498, -776], [-540, -776]], to: 0 },          // Pigeon Quarter (abandoned 30 Sep)
    { kind: 'redoubt', side: 'allied', path: [[-540, -816], [-498, -816], [-498, -776], [-540, -776]], from: 1 },
    { kind: 'redoubt', side: 'crown', path: [[616, -112], [656, -112], [656, -72], [616, -72]], to: 4 },                // Redoubt 9
    { kind: 'redoubt', side: 'crown', path: [[741, 98], [777, 98], [777, 134], [741, 134]], to: 4 },                    // Redoubt 10
    { kind: 'redoubt', side: 'allied', path: [[616, -112], [656, -112], [656, -72], [616, -72]], from: 5 },
    { kind: 'redoubt', side: 'allied', path: [[741, 98], [777, 98], [777, 134], [741, 134]], from: 5 },
    // First parallel (6 Oct), through Pigeon Quarter and the Grand Battery to the river
    { kind: 'trench', side: 'allied', from: 2, path: [[-1000, -760], [-519, -796], [-200, -720], [246, -670], [600, -640], [900, -560], [1060, -430]] },
    // Second parallel (11 Oct), extended to Redoubts 9 and 10 after the assault
    { kind: 'trench', side: 'allied', from: 3, path: [[-220, -340], [122, -325], [430, -300], [560, -250]] },
    { kind: 'trench', side: 'allied', from: 5, path: [[560, -250], [636, -92], [759, 116]] },
  ],

  notes: [
    { at: [-80, 640], text: 'Yorktown, on the bluff above the York River' },
    { at: [-150, 1250], text: 'Gloucester Point across the river: Tarleton and Dundas' },
    { at: [188, -1640], text: 'Surrender Field' },
    { at: [246, -720], text: 'French Grand Battery' },
  ],

  phases: [
    { time: '28 September', title: 'The trap closes', conf: 'documented',
      text: "Washington and Rochambeau march down from Williamsburg with about 17,000 men, while de Grasse's fleet holds Chesapeake Bay. Cornwallis, with about 8,000, has fortified Yorktown and Gloucester Point across the river and is waiting for Clinton to rescue him by sea. The French take the left of the siege, the Americans the right.",
      at: {
        g_w: [-380, 330], g_c: [0, 150], g_e: [430, 240], r9g: [636, -92], r10g: [759, 116], fus: [-1180, 1010],
        fr_w: [-700, -1300, 'moving'], fr_c: [-150, -1350, 'moving'], fr_art: [-150, -1500, 'moving'],
        am_c: [500, -1350, 'moving'], am_li: [800, -1250, 'moving'], am_mil: [950, -1550, 'moving'], am_art: [500, -1500, 'moving'],
      },
      arrows: [{ side: 'allied', path: [[-600, -1900], [-600, -1400]] }, { side: 'allied', path: [[600, -1900], [600, -1420]] }] },

    { time: '30 September', title: 'Cornwallis gives up his outer works', conf: 'documented',
      text: "Expecting relief within days, Cornwallis pulls his troops back from the outer redoubts at Pigeon Quarter to shorten his lines. The Allies occupy them the same morning and close in around the town.",
      at: {
        fr_w: [-600, -1050], fr_c: [-100, -1100], am_c: [500, -1100], am_li: [800, -1000], am_mil: [1000, -1300],
      },
      arrows: [{ side: 'crown', path: [[-519, -760], [-480, -200]] }] },

    { time: '6–9 October', title: 'The first parallel', conf: 'documented',
      text: "On the rainy night of 6 October, some 1,500 men dig the first parallel about 600 yards from the British works, guarded by thousands more. Batteries are built along it, including the French Grand Battery. On 9 October the bombardment opens; Washington fires one of the first American guns. Day and night, more than 100 Allied guns pound the town.",
      at: {
        fr_art: [246, -690, 'firing'], am_art: [620, -660, 'firing'],
        fr_w: [-560, -900], fr_c: [-60, -850], am_c: [480, -880], am_li: [820, -800],
        g_w: [-380, 330, 'broken'], g_c: [0, 150, 'broken'], g_e: [430, 240, 'broken'],
      } },

    { time: '11 October', title: 'The second parallel', conf: 'documented',
      text: "With the British guns largely silenced, the Allies open a second parallel only about 300 yards from the works. But two British redoubts out in front, Nos. 9 and 10 near the river, block it from reaching the water.",
      at: {
        fr_art: [150, -360, 'firing'], am_art: [430, -330, 'firing'],
        fr_c: [-60, -500], am_li: [600, -480],
      } },

    { time: '14 October, night', title: 'Redoubts 9 and 10', conf: 'documented',
      text: "After dark, two columns of 400 men go in with the bayonet, muskets unloaded for surprise. Deux-Ponts's French grenadiers and chasseurs storm Redoubt 9 against stiff resistance; Hamilton's Americans, with Laurens, take Redoubt 10 in about ten minutes. Both are in Allied hands within half an hour.",
      at: {
        st9: [636, -110, 'firing'], st10: [755, 96, 'firing'],
        r9g: [636, -92, 'captured'], r10g: [759, 116, 'captured'],
      },
      arrows: [{ side: 'allied', path: [[560, -300], [610, -200], [630, -125]] }, { side: 'allied', path: [[640, -300], [720, -100], [752, 85]] }] },

    { time: '16 October', title: 'A sortie, and a storm', conf: 'documented',
      text: "Before dawn, Abercromby leads about 350 men out against the second parallel and spikes the guns in two batteries before being driven back; the guns are firing again within hours. That night Cornwallis tries to ferry his army across to Gloucester Point to break out, but a violent squall scatters the boats.",
      at: {
        sortie: [300, -300, 'firing'], st9: [600, -200], st10: [700, -60],
        am_art: [500, -270, 'firing'], fr_art: [170, -330, 'broken'],
      },
      arrows: [{ side: 'crown', path: [[150, 20], [260, -200], [300, -290]] }, { side: 'crown', path: [[-60, 640], [-120, 900], [-150, 1150]] }] },

    { time: '17 October', title: 'The parley', conf: 'documented',
      text: "In the morning a red-coated drummer climbs onto the parapet and beats a parley, and an officer comes out with a white handkerchief. The guns fall silent. Commissioners meet at the Moore house to settle the terms of surrender.",
      at: {
        sortie: [150, 60], g_w: [-380, 330, 'formed'], g_c: [0, 150, 'formed'], g_e: [430, 240, 'formed'],
        am_art: [500, -270], fr_art: [170, -330],
      } },

    { time: '19 October', title: 'The world turned upside down', conf: 'documented',
      text: "At 2 p.m. the garrison marches out between a French line and an American line, colours cased, to lay down its arms at Surrender Field. Cornwallis, pleading illness, sends O'Hara, who offers his sword to Rochambeau and is directed to Washington, who directs him to Lincoln. About 7,000 British and German soldiers became prisoners. When word reached London, Lord North exclaimed, \"Oh God! It is all over.\"",
      at: {
        g_c: [188, -1500, 'captured', 90, 260, 60], g_w: [188, -1150, 'moving', 90, 240, 50], g_e: [188, -800, 'moving', 90, 220, 50], sortie: [150, -500, 'moving', 90],
        fr_c: [60, -1250, 'formed', 90], am_c: [320, -1250, 'formed', 90], fr_w: [60, -900, 'formed', 90], am_li: [320, -900, 'formed', 90],
      },
      arrows: [{ side: 'crown', path: [[188, -60], [188, -700], [188, -1450]] }] },
  ],
};
