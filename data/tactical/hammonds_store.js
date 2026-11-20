// Tactical reconstruction (approximate): Hammond's Store, 30 December 1780. Format: see cowpens.js.
// Placement: origin is the battle's map location (data/places.js). Positions schematic.
// Sources: Morgan's report to Greene; Babits, A Devil of a Whipping (1998).
window.SC = window.SC || {};
SC.tactical = SC.tactical || {};

SC.tactical.hammonds_store = {
  battle: 'hammonds_store', title: "Hammond's Store", date: '30 December 1780', level: 'approximate', site: 'approximate',
  origin: 'hammonds_store', facing: 180,
  camera: { at: [0, 80], zoom: 15.6, pitch: 52, bearing: 0, elev: 180 },
  sources: "After Morgan's report and Babits (1998). Site approximate; positions schematic.",
  people: {
    Cornwallis: { id: 'cornwallis' },
    Washington: { id: 'wwashington' }, Morgan: { id: 'morgan' }, Tarleton: { id: 'tarleton' },
    Waters: { force: 'loyalist', full: 'Col. Thomas Waters, Georgia Loyalists' },
  },
  units: {
    cav:  { name: "Washington's Continental dragoons", short: 'Washington', side: 'allied', force: 'continental', men: 80, type: 'cavalry', w: 50, d: 40 },
    mil:  { name: 'Mounted militia under McCall', short: 'Mounted militia', side: 'allied', force: 'militia', men: 200, type: 'cavalry', w: 80, d: 30 },
    loy:  { name: "Waters's Georgia Loyalists", short: 'Loyalists (Waters)', side: 'crown', force: 'loyalist', men: 250, type: 'line', w: 120, d: 40 },
  },
  phases: [
    { time: '12:00', title: 'A raid from Morgan', conf: 'documented',
      text: "Sent by Morgan to deal with Loyalists plundering the back country, Washington's dragoons and about 200 mounted militia ride 40 miles to find some 250 Georgia Loyalists camped at Hammond's Store.",
      at: { loy: [0, 300], cav: [-60, -150, 'moving'], mil: [100, -160, 'moving'] } },
    { time: '12:30', title: 'Cut down in flight', conf: 'documented',
      text: "The Loyalists fall back to a hill and fire a scattered volley, then break as the horsemen charge. About 150 are killed or wounded and 40 captured; the Americans lose none. The raid so alarmed Cornwallis that he sent Tarleton after Morgan, setting up Cowpens.",
      at: { cav: [-40, 280, 'moving'], mil: [100, 270, 'moving'], loy: [0, 450, 'routed'] },
      arrows: [{ side: 'allied', path: [[-60, -100], [-40, 250]] }, { side: 'allied', path: [[100, -110], [100, 240]] }] },
  ],
};
