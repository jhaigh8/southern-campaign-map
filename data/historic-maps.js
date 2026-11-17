// Period map overlays, placed on the globe by their four image corners
// [top-left, top-right, bottom-right, bottom-left] as [lon, lat].
// Corners come from a least-squares affine fit to 8 landmarks (Cape Hatteras, Wilmington, Cape Fear,
// Cape Romain, Tybee, Augusta, Salisbury, Charlotte), with a typical error of about 10 km.
// Mouzon's printed longitudes are about 1° off, so the printed graticule was not used.
window.SC = window.SC || {};
SC.historicMaps = [
  {
    id: 'mouzon1775',
    title: 'Henry Mouzon, An Accurate Map of North and South Carolina (London, 1775)',
    credit: 'Library of Congress, Geography and Map Division (LCCN 74692510), public domain, via Wikimedia Commons',
    src: 'assets/historic/mouzon-1775.jpg',
    remoteSrc: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/8/8c/An_accurate_map_of_North_and_South_Carolina_with_their_Indian_frontiers%2C_shewing_in_a_distinct_manner_all_the_mountains%2C_rivers%2C_swamps%2C_marshes%2C_bays%2C_creeks%2C_harbours%2C_sandbanks_and_soundings_on_the_LOC_74692510.jpg/3840px-thumbnail.jpg',
    coordinates: [
      [-84.3255, 36.6015],
      [-74.7393, 36.8241],
      [-75.0826, 31.8818],
      [-84.6687, 31.6592],
    ],
  },
];
