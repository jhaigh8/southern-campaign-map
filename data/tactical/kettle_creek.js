// Tactical reconstruction (approximate): Battle of Kettle Creek, 14 February 1779. Format: see cowpens.js.
// Placement: origin is the battle's map location in Wilkes County, Georgia (data/places.js); Boyd's camp
// lay in a bend of the creek. The Patriots came from the south-east. Positions schematic.
// Sources: Robert S. Davis, Kettle Creek battlefield studies; Pickens's account; Lamar Institute archaeology.
window.SC = window.SC || {};
SC.tactical = SC.tactical || {};

SC.tactical.kettle_creek = {
  battle: 'kettle_creek', title: 'Battle of Kettle Creek', date: '14 February 1779', level: 'approximate',
  origin: 'kettle_creek', facing: 310,
  camera: { at: [0, 120], zoom: 15.3, pitch: 52, bearing: 300, elev: 160 },
  sources: "After Pickens's account and Davis's studies. Site approximate; positions schematic.",
  people: {
    Pickens: { id: 'pickens' }, Clarke: { id: 'clarke' },
    Dooly: { force: 'militia', full: 'Col. John Dooly, Georgia militia' },
    Boyd: { force: 'loyalist', full: 'Col. James Boyd, Loyalist militia (mortally wounded)' },
  },
  units: {
    pick: { name: "Pickens's South Carolina militia", short: 'Pickens', side: 'allied', force: 'militia', men: 200, type: 'skirmish', w: 120, d: 16 },
    dool: { name: "Dooly's Georgia militia", short: 'Dooly', side: 'allied', force: 'militia', men: 70, type: 'skirmish', w: 80, d: 16 },
    clar: { name: "Clarke's Georgia militia", short: 'Clarke', side: 'allied', force: 'militia', men: 70, type: 'skirmish', w: 80, d: 16 },
    boyd: { name: "Boyd's Loyalist militia, in camp", short: 'Boyd', side: 'crown', force: 'loyalist', men: 600, type: 'line', w: 160, d: 60 },
  },
  notes: [{ at: [120, 380], text: 'Kettle Creek' }],
  phases: [
    { time: '10:00', title: 'Boyd at breakfast', conf: 'documented',
      text: "About 600 back-country Loyalists under Boyd, marching to join the British at Augusta, have halted by Kettle Creek to slaughter cattle. About 340 Patriot militia have trailed them, and attack in three bodies: Pickens in the centre, Dooly on the right, Clarke on the left.",
      at: { boyd: [0, 300], pick: [0, -150, 'moving'], dool: [200, -100, 'moving'], clar: [-200, -100, 'moving'] } },
    { time: '10:15', title: 'Boyd falls', conf: 'documented',
      text: "Boyd forms a line behind a fence and fallen trees and holds Pickens's advance until he is mortally wounded. His men begin to give way toward the creek.",
      at: { pick: [0, 180, 'firing'], boyd: [0, 270, 'firing'], dool: [200, 160, 'firing'], clar: [-220, 150, 'moving'] } },
    { time: '10:30', title: "Clarke's flank attack", conf: 'probable',
      text: "Clarke, with his horse shot under him, leads his men across the creek and onto a rise behind the Loyalists' flank. Caught between fires, the Loyalists scatter.",
      at: { clar: [-180, 420, 'firing'], boyd: [80, 360, 'routed'], pick: [0, 290, 'firing'], dool: [180, 300, 'firing'] },
      arrows: [{ side: 'allied', path: [[-220, 150], [-280, 350], [-190, 410]] }] },
    { time: '11:00', title: 'A frontier victory', conf: 'documented',
      text: "About 40 Loyalists were killed and 70 captured, against about 9 Patriots killed. Five captured Loyalists were later hanged for treason. The win revived the Patriot cause in back-country Georgia just weeks after Savannah fell.",
      at: {} },
  ],
};
