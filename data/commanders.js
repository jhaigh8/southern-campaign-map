// Commanders.
//   side  : american | british | loyalist | french   (which side of the war)
//   force : the kind of troops they led; this sets the map colour (see SC.FORCES)
//   portrait : image path, or null to show initials (no free portrait exists)
window.SC = window.SC || {};

// One colour per kind of force: dark = regulars, light = militia / provincials
SC.FORCES = {
  continental: { label: 'Continental Army', color: '#1d4ed8', side: 'allied' },
  militia:     { label: 'Patriot militia & partisans', color: '#60b6f0', side: 'allied' },
  french:      { label: 'French forces', color: '#e2b007', side: 'allied' },
  british:     { label: 'British regulars', color: '#b91c1c', side: 'crown' },
  loyalist:    { label: 'Loyalist provincials & militia', color: '#f58a8a', side: 'crown' },
};

SC.commanders = [
  // ---------- American ----------
  { id: 'lincoln', name: 'Benjamin Lincoln', side: 'american', rank: 'Major General', unit: 'Southern Department (1778–80)', force: 'continental', portrait: 'assets/portraits/lincoln.png',
    bio: 'Took command of the Southern Department in December 1778. He failed to retake Savannah in 1779 and surrendered Charleston and its 5,000-man garrison on 12 May 1780. After being exchanged, he served under Washington at Yorktown, where he received the British surrender.' },
  { id: 'gates', name: 'Horatio Gates', side: 'american', rank: 'Major General', unit: 'Southern Army (Jul–Dec 1780)', force: 'continental', portrait: 'assets/portraits/gates.jpg',
    bio: 'Gates, the victor of Saratoga, took command of the Southern Army on 25 July 1780. He marched it straight at Camden, where Cornwallis routed it on 16 August. He was replaced by Nathanael Greene in December.' },
  { id: 'dekalb', name: 'Johann de Kalb', side: 'american', rank: 'Major General', unit: 'Maryland & Delaware Continentals', force: 'continental', portrait: 'assets/portraits/dekalb.webp',
    bio: 'A Bavarian-born officer who led the Maryland and Delaware Continentals south in 1780. Mortally wounded at Camden while his men held their ground after the militia broke. He died on 19 August.' },
  { id: 'greene', name: 'Nathanael Greene', side: 'american', rank: 'Major General', unit: 'Southern Army (Dec 1780–1782)', force: 'continental', portrait: 'assets/portraits/greene.jpg',
    bio: 'Greene took command at Charlotte on 3 December 1780. He split his army, led Cornwallis on the "Race to the Dan", and fought him at Guilford Courthouse. He then cleared the British posts in the Carolina interior and fought them at Eutaw Springs. He lost most of his battles but won the campaign.' },
  { id: 'morgan', name: 'Daniel Morgan', side: 'american', rank: 'Brigadier General', unit: 'Flying army / light corps', force: 'continental', portrait: 'assets/portraits/morgan.jpg',
    bio: 'Commanded the detached "flying army" sent into western South Carolina. On 17 January 1781 he destroyed Tarleton\'s legion at Cowpens. He retreated across the Catawba and left the army in February with sciatica.' },
  { id: 'marion', name: 'Francis Marion', side: 'american', rank: 'Brigadier General (militia)', unit: 'Marion\'s Brigade', force: 'militia', portrait: 'assets/portraits/marion.jpg',
    bio: 'The "Swamp Fox". His partisan brigade, based around Snow\'s Island on the Pee Dee, raided British supply lines between Charleston and Camden. With Henry Lee he captured Fort Watson and Fort Motte in 1781. His day-to-day movements are poorly recorded, so many positions here are approximate.' },
  { id: 'sumter', name: 'Thomas Sumter', side: 'american', rank: 'Brigadier General (militia)', unit: 'South Carolina militia', force: 'militia', portrait: 'assets/portraits/sumter.jpg',
    bio: 'The "Gamecock" led partisans in the South Carolina backcountry. He fought at Rocky Mount, Hanging Rock, Fishdam Ford and Blackstock\'s, and was surprised by Tarleton at Fishing Creek.' },
  { id: 'pickens', name: 'Andrew Pickens', side: 'american', rank: 'Brigadier General (militia)', unit: 'Upcountry SC militia', force: 'militia', portrait: 'assets/portraits/pickens.jpg',
    bio: 'Won at Kettle Creek in 1779 and commanded the militia line at Cowpens. In 1781 he besieged Augusta with Lee and led militia at Eutaw Springs.' },
  { id: 'clarke', name: 'Elijah Clarke', side: 'american', rank: 'Colonel (militia)', unit: 'Georgia militia', force: 'militia', portrait: 'assets/portraits/clarke.jpg',
    bio: 'A Georgia partisan who fought at Kettle Creek and Musgrove Mill and attacked Augusta in 1780. He helped capture Augusta in 1781.' },
  { id: 'lee', name: 'Henry "Light-Horse Harry" Lee', side: 'american', rank: 'Lieutenant Colonel', unit: "Lee's Legion", force: 'continental', portrait: 'assets/portraits/lee.jpg',
    bio: "His legion of cavalry and infantry formed the rearguard in the Race to the Dan. With Marion and Pickens he reduced British posts across South Carolina and Georgia in the spring of 1781." },
  { id: 'wwashington', name: 'William Washington', short: 'W. Washington', side: 'american', rank: 'Lieutenant Colonel', unit: '3rd Continental Light Dragoons', force: 'continental', portrait: 'assets/portraits/wwashington.jpg',
    bio: "A cousin of George Washington. His dragoons struck at Hammond's Store and broke Tarleton's cavalry at Cowpens. He was wounded and captured at Eutaw Springs." },
  { id: 'overmountain', name: 'Overmountain Men', short: 'Overmountain Men', side: 'american', rank: 'Cols. Campbell, Shelby, Sevier, Cleveland', unit: 'Backwater militia', force: 'militia', portrait: 'assets/portraits/overmountain.jpg',
    bio: 'Frontier militia from beyond the Appalachians. They mustered at Sycamore Shoals and destroyed Ferguson\'s Loyalist force at Kings Mountain on 7 October 1780.' },
  { id: 'lafayette', name: 'Marquis de Lafayette', side: 'american', rank: 'Major General', unit: 'Continental light infantry (Virginia 1781)', force: 'continental', portrait: 'assets/portraits/lafayette.png',
    bio: 'Defended Virginia against Arnold, Phillips and then Cornwallis in 1781. He shadowed Cornwallis down the Peninsula and helped trap him at Yorktown.' },
  { id: 'gwashington', name: 'George Washington', short: 'Washington', side: 'american', rank: 'General & Commander-in-Chief', unit: 'Continental Army', force: 'continental', portrait: 'assets/portraits/gwashington.jpg',
    bio: 'In August 1781 Washington left a screening force facing New York and marched with Rochambeau 450 miles to Virginia. Together they besieged Cornwallis at Yorktown.' },

  // ---------- British ----------
  { id: 'campbell', name: 'Archibald Campbell', side: 'british', rank: 'Lieutenant Colonel', unit: '71st Highlanders expedition', force: 'british', portrait: 'assets/portraits/campbell.jpg',
    bio: 'Captured Savannah on 29 December 1778 and briefly occupied Augusta. This began the British "Southern strategy".' },
  { id: 'prevost', name: 'Augustine Prevost', side: 'british', rank: 'Major General', unit: 'East Florida / Georgia command', force: 'british', portrait: 'assets/portraits/prevost.jpg',
    bio: 'Brought troops north from Florida and took command in Georgia. He raided to the gates of Charleston in May 1779 and held Savannah against the Franco-American siege that autumn.' },
  { id: 'clinton', name: 'Sir Henry Clinton', side: 'british', rank: 'General & Commander-in-Chief', unit: 'British Army in North America', force: 'british', portrait: 'assets/portraits/clinton.jpg',
    bio: 'Led the 1780 expedition that besieged and captured Charleston. He returned to New York in June and left Cornwallis in command in the South.' },
  { id: 'cornwallis', name: 'Charles, Earl Cornwallis', side: 'british', rank: 'Lieutenant General', unit: 'British Southern Army', force: 'british', portrait: 'assets/portraits/cornwallis.png',
    bio: 'Won at Camden and pursued Greene to the Dan, then won a costly victory at Guilford Courthouse. He marched into Virginia and was trapped and forced to surrender at Yorktown on 19 October 1781.' },
  { id: 'tarleton', name: 'Banastre Tarleton', side: 'british', rank: 'Lieutenant Colonel', unit: 'British Legion', force: 'loyalist', portrait: 'assets/portraits/tarleton.jpg',
    bio: 'A British regular officer commanding the British Legion, a Loyalist provincial corps of dragoons and light infantry raised in America (hence the Loyalist colour). He won at Monck\'s Corner, Waxhaws and Fishing Creek, and was routed by Morgan at Cowpens.' },
  { id: 'rawdon', name: 'Francis, Lord Rawdon', side: 'british', rank: 'Lieutenant Colonel', unit: 'Camden & interior posts', force: 'british', portrait: 'assets/portraits/rawdon.jpg',
    bio: 'Held Camden after Cornwallis left. He beat Greene at Hobkirk\'s Hill, then pulled back from the interior and relieved Ninety Six before sailing home in ill health.' },
  { id: 'stewart', name: 'Alexander Stewart', side: 'british', rank: 'Lieutenant Colonel', unit: 'Field army in SC (1781)', force: 'british', portrait: null,
    bio: 'Commanded the British field army at Eutaw Springs on 8 September 1781, the last major battle in the Carolinas.' },
  { id: 'arnold', name: 'Benedict Arnold', side: 'british', rank: 'Brigadier General (British)', unit: 'Virginia raiding force', force: 'british', portrait: 'assets/portraits/arnold.jpg',
    bio: 'After his treason, Arnold raided Virginia in January 1781 and burned stores at Richmond. He joined Phillips and handed his force to Cornwallis at Petersburg in May.' },
  { id: 'phillips', name: 'William Phillips', side: 'british', rank: 'Major General', unit: 'Virginia expedition', force: 'british', portrait: 'assets/portraits/phillips.jpg',
    bio: 'Took over the Virginia expedition in March 1781 and raided along the James. He died of fever at Petersburg on 13 May.' },

  // ---------- Loyalist ----------
  { id: 'ferguson', name: 'Patrick Ferguson', side: 'loyalist', rank: 'Major', unit: 'American Volunteers & Loyalist militia', force: 'loyalist', portrait: 'assets/portraits/ferguson.jpg',
    bio: 'A Scottish regular officer and inventor of a breech-loading rifle. He organized backcountry Loyalist militia and was killed at Kings Mountain, the only British soldier in the battle.' },
  { id: 'cruger', name: 'John Harris Cruger', side: 'loyalist', rank: 'Lieutenant Colonel', unit: 'Ninety Six garrison', force: 'loyalist', portrait: null,
    bio: 'A New York Loyalist who held Ninety Six through Greene\'s 28-day siege in 1781.' },
  { id: 'brown', name: 'Thomas Brown', side: 'loyalist', rank: 'Lieutenant Colonel', unit: 'King\'s Rangers, Augusta', force: 'loyalist', portrait: null,
    bio: 'Commanded the Loyalist garrison at Augusta. He held it against Clarke in 1780 and surrendered it to Lee and Pickens on 5 June 1781.' },

  // ---------- French ----------
  { id: 'destaing', name: "Comte d'Estaing", side: 'french', rank: 'Vice Admiral', unit: 'French expeditionary force (1779)', force: 'french', portrait: 'assets/portraits/destaing.jpg',
    bio: 'Joined Lincoln to besiege Savannah in September 1779. He was wounded in the failed assault of 9 October.' },
  { id: 'rochambeau', name: 'Comte de Rochambeau', side: 'french', rank: 'Lieutenant General', unit: 'Expédition Particulière', force: 'french', portrait: 'assets/portraits/rochambeau.jpg',
    bio: 'Commanded the French army that marched with Washington from New York to Yorktown.' },
  { id: 'degrasse', name: 'Comte de Grasse', short: 'de Grasse', side: 'french', rank: 'Admiral (lieutenant général des armées navales)', unit: 'French West Indies fleet', force: 'french', portrait: 'assets/portraits/degrasse.jpg',
    bio: 'His fleet arrived in the Chesapeake on 30 August 1781 and beat back the British fleet at the Battle of the Capes on 5 September. This sealed Cornwallis\'s fate.' },
];
