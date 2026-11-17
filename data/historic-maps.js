// Period map overlays (all public domain, Library of Congress via Wikimedia Commons).
// Each map is drawn from one or more image "tiles". Each tile is pinned by its four corners,
// [top-left, top-right, bottom-right, bottom-left] as [lon, lat], which come from tools/georef.ps1:
//   - an affine fit to known landmarks, and for the larger maps
//   - a rubber-sheet warp (the image is cut into a grid so each landmark lands in place).
// Maps are drawn in list order, so later (more detailed) maps sit on top of earlier ones.
window.SC = window.SC || {};
SC.historicMaps = [
  {
    id: 'fryjefferson',
    title: 'Fry & Jefferson, A Map of the Most Inhabited Part of Virginia (1755 ed.)',
    short: 'Virginia (Fry & Jefferson)',
    credit: 'Joshua Fry & Peter Jefferson; Library of Congress (LCCN 74693168)',
    note: 'Rubber-sheeted on 13 landmarks; typical error a few km near the landmarks, more in the far west.',
    tiles: [
      { src: 'fry-jefferson-00.jpg', coordinates: [[-82.4206, 40.3881], [-80.9265, 40.3837], [-81.0067, 39.1748], [-82.5040, 39.1792]] },
      { src: 'fry-jefferson-01.jpg', coordinates: [[-80.9265, 40.3837], [-79.4332, 40.3755], [-79.5053, 39.1605], [-81.0067, 39.1748]] },
      { src: 'fry-jefferson-02.jpg', coordinates: [[-79.4332, 40.3755], [-77.9457, 40.3723], [-78.0234, 39.1195], [-79.5053, 39.1605]] },
      { src: 'fry-jefferson-03.jpg', coordinates: [[-77.9457, 40.3723], [-76.4871, 40.3917], [-76.4803, 39.1662], [-78.0234, 39.1195]] },
      { src: 'fry-jefferson-04.jpg', coordinates: [[-76.4871, 40.3917], [-75.1288, 40.4294], [-75.1284, 39.1975], [-76.4803, 39.1662]] },
      { src: 'fry-jefferson-05.jpg', coordinates: [[-75.1288, 40.4294], [-73.5715, 40.4093], [-73.6216, 39.1900], [-75.1284, 39.1975]] },
      { src: 'fry-jefferson-10.jpg', coordinates: [[-82.5040, 39.1792], [-81.0067, 39.1748], [-81.1066, 37.9703], [-82.5973, 37.9702]] },
      { src: 'fry-jefferson-11.jpg', coordinates: [[-81.0067, 39.1748], [-79.5053, 39.1605], [-79.5837, 37.9675], [-81.1066, 37.9703]] },
      { src: 'fry-jefferson-12.jpg', coordinates: [[-79.5053, 39.1605], [-78.0234, 39.1195], [-78.0242, 37.9683], [-79.5837, 37.9675]] },
      { src: 'fry-jefferson-13.jpg', coordinates: [[-78.0234, 39.1195], [-76.4803, 39.1662], [-76.5886, 37.9681], [-78.0242, 37.9683]] },
      { src: 'fry-jefferson-14.jpg', coordinates: [[-76.4803, 39.1662], [-75.1284, 39.1975], [-75.1412, 37.9599], [-76.5886, 37.9681]] },
      { src: 'fry-jefferson-15.jpg', coordinates: [[-75.1284, 39.1975], [-73.6216, 39.1900], [-73.6613, 37.9630], [-75.1412, 37.9599]] },
      { src: 'fry-jefferson-20.jpg', coordinates: [[-82.5973, 37.9702], [-81.1066, 37.9703], [-81.2452, 36.7643], [-82.6975, 36.7605]] },
      { src: 'fry-jefferson-21.jpg', coordinates: [[-81.1066, 37.9703], [-79.5837, 37.9675], [-79.7737, 36.7852], [-81.2452, 36.7643]] },
      { src: 'fry-jefferson-22.jpg', coordinates: [[-79.5837, 37.9675], [-78.0242, 37.9683], [-78.0761, 36.7613], [-79.7737, 36.7852]] },
      { src: 'fry-jefferson-23.jpg', coordinates: [[-78.0242, 37.9683], [-76.5886, 37.9681], [-76.7121, 36.7466], [-78.0761, 36.7613]] },
      { src: 'fry-jefferson-24.jpg', coordinates: [[-76.5886, 37.9681], [-75.1412, 37.9599], [-75.2337, 36.7368], [-76.7121, 36.7466]] },
      { src: 'fry-jefferson-25.jpg', coordinates: [[-75.1412, 37.9599], [-73.6613, 37.9630], [-73.7348, 36.7453], [-75.2337, 36.7368]] },
      // Bottom row (North Carolina) is left out: Mouzon's map covers it better.
    ],
  },
  {
    id: 'mouzon1775',
    title: 'Henry Mouzon, An Accurate Map of North and South Carolina (London, 1775)',
    short: 'Carolinas (Mouzon 1775)',
    credit: 'Henry Mouzon; Library of Congress (LCCN 74692510)',
    note: 'Affine fit to 8 landmarks; typical error ~10 km. Its printed longitudes are ~1° off.',
    tiles: [
      { src: 'mouzon-1775.jpg', coordinates: [[-84.3255, 36.6015], [-74.7393, 36.8241], [-75.0826, 31.8818], [-84.6687, 31.6592]],
        remoteSrc: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/8/8c/An_accurate_map_of_North_and_South_Carolina_with_their_Indian_frontiers%2C_shewing_in_a_distinct_manner_all_the_mountains%2C_rivers%2C_swamps%2C_marshes%2C_bays%2C_creeks%2C_harbours%2C_sandbanks_and_soundings_on_the_LOC_74692510.jpg/3840px-thumbnail.jpg' },
    ],
  },
  {
    id: 'campbell1780',
    title: 'Archibald Campbell, Sketch of the Northern Frontiers of Georgia (London, 1780)',
    short: 'Savannah (Campbell 1780)',
    credit: 'Lt. Col. Archibald Campbell, engraved by William Faden; Library of Congress (LCCN 73694481)',
    note: 'Drawn by the officer who captured Savannah. The river-strip insets are left out because they are not drawn in their true positions. Error 1–4 km.',
    tiles: [
      { src: 'campbell-georgia-1780-north.jpg', coordinates: [[-81.3862, 32.3190], [-81.0849, 32.4317], [-80.8535, 32.1385], [-81.1549, 32.0257]] },
      { src: 'campbell-georgia-1780-south.jpg', coordinates: [[-81.4657, 31.9094], [-80.8535, 32.1385], [-80.6220, 31.8450], [-81.2341, 31.6159]] },
    ],
  },
  {
    id: 'faden1781',
    title: 'A Plan of the Entrance of Chesapeak Bay, with James and York Rivers (Faden, Nov. 1781)',
    short: 'Yorktown (Faden 1781)',
    credit: 'Published by William Faden, 26 Nov 1781; Library of Congress (LCCN 74692131)',
    note: 'Shows positions at the start of October 1781, including de Grasse\'s fleet. Rubber-sheeted on 14 landmarks; error ~1–3 km.',
    tiles: [
      { src: 'faden-yorktown-00.jpg', coordinates: [[-76.8422, 37.7643], [-76.5596, 37.6984], [-76.5362, 37.3783], [-76.8258, 37.4339]] },
      { src: 'faden-yorktown-01.jpg', coordinates: [[-76.5596, 37.6984], [-76.2813, 37.6202], [-76.2952, 37.3091], [-76.5362, 37.3783]] },
      { src: 'faden-yorktown-02.jpg', coordinates: [[-76.2813, 37.6202], [-75.9866, 37.5732], [-75.9528, 37.2464], [-76.2952, 37.3091]] },
      { src: 'faden-yorktown-03.jpg', coordinates: [[-75.9866, 37.5732], [-75.6960, 37.5141], [-75.6778, 37.1844], [-75.9528, 37.2464]] },
      { src: 'faden-yorktown-10.jpg', coordinates: [[-76.8258, 37.4339], [-76.5362, 37.3783], [-76.5288, 37.0419], [-76.8127, 37.1102]] },
      { src: 'faden-yorktown-11.jpg', coordinates: [[-76.5362, 37.3783], [-76.2952, 37.3091], [-76.2657, 36.9769], [-76.5288, 37.0419]] },
      { src: 'faden-yorktown-12.jpg', coordinates: [[-76.2952, 37.3091], [-75.9528, 37.2464], [-75.9500, 36.9192], [-76.2657, 36.9769]] },
      { src: 'faden-yorktown-13.jpg', coordinates: [[-75.9528, 37.2464], [-75.6778, 37.1844], [-75.6659, 36.8544], [-75.9500, 36.9192]] },
      { src: 'faden-yorktown-20.jpg', coordinates: [[-76.8127, 37.1102], [-76.5288, 37.0419], [-76.5373, 36.6670], [-76.8063, 36.7639]] },
      { src: 'faden-yorktown-21.jpg', coordinates: [[-76.5288, 37.0419], [-76.2657, 36.9769], [-76.2327, 36.6539], [-76.5373, 36.6670]] },
      { src: 'faden-yorktown-22.jpg', coordinates: [[-76.2657, 36.9769], [-75.9500, 36.9192], [-75.9448, 36.5871], [-76.2327, 36.6539]] },
      { src: 'faden-yorktown-23.jpg', coordinates: [[-75.9500, 36.9192], [-75.6659, 36.8544], [-75.6571, 36.5234], [-75.9448, 36.5871]] },
    ],
  },
];
