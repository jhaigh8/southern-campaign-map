# The Southern Campaign: an interactive 3D atlas

Step day by day through the Southern Campaign of the American Revolution, from the capture of Savannah (Dec 1778) through the surrender at Yorktown (Oct 1781) to the British evacuation of Charleston (Dec 1782), and watch commanders and their armies move across a 3D map.

**View it online:** https://jhaigh8.github.io/southern-campaign-map/

## Running it

Double-click **`Start Map.bat`**. It starts a small local web server (no Python or Node needed) and opens `http://localhost:8000`. If port 8000 is busy it uses the next free port. Keep the window open while you use the map.

From a terminal you can run `powershell -ExecutionPolicy Bypass -File serve.ps1`. Opening `index.html` directly also works, but most period maps only load through the server.

## Using the map

| Control | What it does |
|---|---|
| ◀ / ▶ or the ← / → keys | Step back or forward one day; markers glide to their new positions |
| ⏮ / ⏭ or Shift+← / Shift+→ | Jump to the previous or next battle |
| ▶ / Space | Play smoothly at 1–30 days per second. Each battle gets a card at the top, and every battle and movement goes into the **Dispatches** log above the timeline. Hover the log to scroll back; click a line to open it. Turn the log off with **Dispatches log during playback**; battle cards still appear |
| **Pause at battles** | Stop playback and zoom in when a battle begins. Press play to close the card and zoom back out |
| Red ticks above the slider | Battles; hover to see the name and date, click to jump to it |
| Commander (sidebar or map) | Opens a profile card: portrait, bio, today's position, battles, plus **Isolate route**, **Follow** and **Fly to** |
| Battle marker | Hover for its name, date and location. Click to open details and animate each side's approach and withdrawal routes; **Play this battle** runs just that window. While a battle is under way, its commanders line up as small portraits under the icon |
| **Enter the battlefield** (on a battle card) | Phase-by-phase 3D reconstruction, north up and framed on the units: units as raised blocks on the terrain, movement arrows, a pulse on units that are firing, and a battle clock. Officers named in the captions are coloured by the troops they led (hover for the full name). ← / → step phases, Space plays, Esc returns to the campaign map. Each phase is tagged *Well documented*, *Probable* or *Sources differ*. Available for 35 battles and sieges: every Tier 1 battle, the sieges and the Tier 2 actions (see below). A badge shows whether a view is a *Detailed* or an *Approximate* reconstruction; a second, outlined badge, *Location approximate*, marks the views whose exact site is not confirmed |
| Tent / stockade / meetinghouse / flag markers | Camps, fortified posts, occupied towns and musters. They light up while in use; click for details |
| **Visit today** (layer panel) | Places to visit now: national and state parks (NPS boundaries shaded green), battlefields, historic sites, museums and visitor centers, graves and memorials, the Overmountain Victory National Historic Trail (dashed orange), and about 700 roadside historical markers on the Revolution from the South Carolina, North Carolina, Georgia and Virginia programs (small gold dots). Every pin is labelled with what it is (battlefield site, marker / memorial, museum and so on), and the map's own battle icons always stay on top. Click a place for its status, the battles it belongs to, an official or Liberty Trail page and directions; click a marker dot for its full inscription (**Read more**) and, where several markers stand together, the others at that spot. Each battle card lists its sites and nearby markers under **Visit today**, with a badge: *On the battlefield*, *Part of the field*, *Marker or memorial* (a dotted line joins it to the battle site when they are apart) or *Site lost* |
| **N⬆** button | Turn the map north-up; click again for a flat top-down view |
| 3D Satellite / Period Maps / Modern | Switch base map; drag with right-click or Ctrl to tilt and rotate |
| **Tilted view** | Untick for a flat, top-down map (tilting is then locked) |
| **Show full trails** | Off by default: trails show the last 30 days and fade with age. Tick to show every route as a full line |

The URL keeps your place (for example `#date=1781-01-17&battle=cowpens&layer=period`) and `&visit=1` when the Visit today layer is on, so you can bookmark or share a moment. Add `?validate` to the URL to see the data check report.

## Map colours

Colour shows the kind of force a commander led:

| Colour | Force |
|---|---|
| Dark blue | Continental Army |
| Light blue | Patriot militia and partisans (Marion, Sumter, Pickens, Clarke, Overmountain Men) |
| Gold | French forces |
| Dark red | British regulars |
| Light red | Loyalist provincials and militia (Tarleton's British Legion, Ferguson, Cruger, Brown) |

## Period maps

All four are public domain, from the Library of Congress via Wikimedia Commons. They share one colour toning so they read as a single atlas, and later maps sit on top of earlier ones.

- **Fry & Jefferson**, *Map of the Most Inhabited Part of Virginia* (1755 ed.): Virginia, the 1781 campaign
- **Henry Mouzon**, *An Accurate Map of North and South Carolina* (1775): the Carolinas
- **Archibald Campbell**, *Sketch of the Northern Frontiers of Georgia* (1780): Savannah, drawn by the officer who captured it
- **William Faden**, *Plan of the Entrance of Chesapeak Bay* (Nov 1781): Yorktown and the French fleet

Each map is placed with `tools/georef.ps1`, which works from known landmarks:

- It fits an affine transform and reports the error at each landmark.
- With `-Grid`, it also rubber-sheets the scan into tiles so each landmark lands in place (used for Fry-Jefferson and Faden).
- With `-Grid` and `-Smooth`, it solves the tile corners by least squares, which fits better and avoids folds. Mouzon uses this: a 10×8 grid on 29 landmarks with `-Smooth 0.3`, landing within about 1 km of most landmarks. The landmarks are saved in `tools/control-points/`.

Fitting to real places works better than using a map's printed graticule, because 18th-century longitudes are often a degree off.

## How positions work

- Each commander has **dated waypoints** in `data/movements.js`. Each one is marked `d` (documented date and place) or `a` (approximate).
- On days between waypoints, the position is **interpolated** with easing. These markers have a dashed ring, and the profile card says the position is estimated.
- Partisan leaders such as Marion and Sumter are thinly documented, so treat their tracks as a sketch.

## Project layout

```
index.html              page shell
css/style.css           styles (light/dark, phone layout)
js/                     util, layers, movements, commanders, battles, tactical, landmarks, visit, toasts, timeline, validate, main
data/places.js          gazetteer of historic sites  (id -> [lon, lat, name])
data/commanders.js      commanders, force type, portrait, bio  (+ SC.FORCES colour scheme)
data/movements.js       dated waypoints per commander
data/battles.js         battles, sieges, raids
data/landmarks.js       camps, posts, occupied towns and when they were in use
data/historic-maps.js   period map overlays and their tile corner coordinates
data/visit-sites.js     Visit today: curated parks, sites, museums and memorials (hand-edited)
data/visit-data.js      Visit today: roadside markers, NPS park boundaries, Overmountain trail (generated)
data/tactical/          battlefield reconstructions (units, phases, arrows), one file per battle
assets/historic/        map scans (some cut into georeferenced tiles)
assets/portraits/       commander portraits + CREDITS.md
tools/georef.ps1        landmark-based georeferencing / rubber-sheet tiling
tools/control-points/   saved landmark lists, so a map can be refitted later
tools/build-visit.ps1   regenerates data/visit-data.js from the state marker programs and the NPS
tools/va-markers.json   the hand-picked Virginia markers with their inscriptions (input to build-visit)
```

### Adding a commander
1. Add an entry to `data/commanders.js`, with a `force` and optionally a `portrait`.
2. Add a waypoint list under the same `id` in `data/movements.js`. Use place ids from `places.js`, or `[lon, lat, 'Name']`.
3. Reload with `?validate` and fix anything it reports.

### Adding a period map
1. Put the scan in `assets/historic/`.
2. Note the pixel positions of 5–15 places you can identify.
3. Run `powershell -File tools/georef.ps1 -Points "x,y,lon,lat; ..." -Width W -Height H`, adding `-Grid 4x3 -Image file.jpg -OutPrefix name` for a rubber-sheet warp. Add `-Smooth 0.3` for the least-squares fit. Raise the value if any tiles look stretched or folded.
4. Paste the printed corners into `data/historic-maps.js`.

## Sources
- Lumpkin, *From Savannah to Yorktown*
- Buchanan, *The Road to Guilford Courthouse*
- Babits, *A Devil of a Whipping*
- O'Kelley, *Slaughter in the Carolinas*
- National Park Service battlefield histories

Strengths and casualties are approximate, and sources disagree.

**Map data:** USGS The National Map (USDA NAIP imagery, 3DEP shaded relief, US Topo) and NASA Blue Marble (zoomed-out imagery), all public domain; Mapzen/AWS Terrain Tiles; © OpenStreetMap contributors (site positions). **Rendering:** MapLibre GL JS 5.6. **Portraits:** see `assets/portraits/CREDITS.md`.

**Visit today:** The Liberty Trail (American Battlefield Trust and the South Carolina Battleground Preservation Trust) for South and North Carolina site positions and pages; National Park Service unit boundaries (Land Resources Division) and the Overmountain Victory NHT historic route; South Carolina Department of Archives and History (its public marker map, Revolution-era markers); NC Department of Natural and Cultural Resources, Highway Historical Marker Program (American Revolution layer); Georgia Historical Society marker list (public ArcGIS layer); Virginia Department of Historic Resources highway markers (151 picked by reading all 2,711 inscriptions; see `tools/va-markers.json`); © OpenStreetMap contributors for the other sites. Marker inscriptions are shown with credit to each program.

**Battle locations** were checked against the National Register / park positions on Wikipedia, The Liberty Trail and OpenStreetMap (park boundaries, monuments, trails, rivers) in November 2026.

### Credits and rights
This is a non-commercial personal project. Base maps, period map scans and almost all portraits are public domain (credits above and in `assets/portraits/CREDITS.md`; the Overmountain Men photograph is used under its Wikimedia Commons licence). Historical marker inscriptions are quoted from, and credited to, the South Carolina Department of Archives and History, the North Carolina Department of Natural and Cultural Resources, the Georgia Historical Society and the Virginia Department of Historic Resources; site positions and pages for Liberty Trail sites come from The Liberty Trail (American Battlefield Trust and the SC Battleground Preservation Trust). If you hold rights to any of this material and would like it removed or credited differently, please open an issue.

### Adding a battlefield reconstruction
Copy `data/tactical/cowpens.js` and add a `<script>` tag for it in `index.html`:
- Units are positioned in local metres. `x` runs toward the American right and `y` toward the enemy, measured from an `origin` on the field. `facing` is the compass bearing the American line faced.
- Each phase lists only the units that move or change state (`formed`, `firing`, `moving`, `broken`, `routed`, `captured`), plus optional arrows.
- The camera is north-up and frames the units automatically (the middle of all their positions over the battle, so a far approach march does not shrink the view). `camera.zoom` is a guide the fit stays within about a level of; `camera.elev` is a fallback ground height (the real one is read from the elevation tiles). Set `camera.fit: false` to use `camera.at` and `camera.zoom` exactly.
- `roadLL` draws a period road from real-world `[lon, lat]` points (or use `road` in local metres).
- `people` maps names in the captions to a tracked commander (`id`) or a `force` + `full` name, so they are coloured by the troops they led.
- Anchor the frame on the ground: find the period road's surviving trace, sample the terrain along it, and check the positions against the sources' distances and descriptions of the ground (see the header of `cowpens.js`).
- `level`: `'detailed'` (positions anchored to the surviving landscape and the main studies) or `'approximate'` (the course of the fight is documented, positions are estimated). It shows as a badge on the battle card and in the battlefield bar.
- `origin` can be a place id from `data/places.js` instead of `[lon, lat]`, for sites known only approximately.
- `site: 'approximate'` adds a *Location approximate* badge: the site is lost, disputed or known only from accounts and roadside markers, and the view is placed at the best-supported spot (see the file's header for which).
- Sieges: phase `time` can be free text (`'14 October, night'`) instead of `HH:MM`, and `works` draws trenches (`kind: 'trench'`, a line) and forts/redoubts (`'fort'`/`'redoubt'`, a low raised outline) in local metres (`path`) or `[lon, lat]` (`pathLL`), shown from phase `from` to phase `to`, tinted by `side`. A unit may set its own block height with `h` (used for siege towers).

**Battlefield views so far**
- *Detailed:* Cowpens, Guilford Courthouse, Kings Mountain, Siege of Yorktown.
- *Approximate, major battles:* Camden, Eutaw Springs, Hobkirk's Hill, Green Spring.
- *Approximate, sieges:* Savannah (1779), Charleston (1780), Ninety Six, Augusta (1781), Fort Watson, Fort Motte, Fort Granby.
- *Approximate, smaller actions:* Capture of Savannah (1778), Kettle Creek, Brier Creek, Stono Ferry, Monck's Corner, Lenud's Ferry, Waxhaws, Ramsour's Mill, Huck's Defeat, Rocky Mount, Hanging Rock, Musgrove Mill, Fishdam Ford, Blackstock's, Hammond's Store, Cowan's Ford, Pyle's Defeat, Weitzel's Mill, Quinby Bridge, Parker's Ferry.
- *Not yet:* the sparsely documented partisan fights (Black Mingo, Tearcoat Swamp, Great Savannah, Blue Savannah, Halfway Swamp, Wiboo Swamp and others), plus Race to the Dan (a campaign), the Little Lynches Creek standoff (no fighting) and the Battle of the Capes (naval).
