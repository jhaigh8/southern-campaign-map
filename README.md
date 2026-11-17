# The Southern Campaign: an interactive 3D atlas

Step day by day through the Southern Campaign of the American Revolution, from the capture of Savannah (Dec 1778) to the surrender at Yorktown (Oct 1781), and watch commanders and their armies move across a 3D map.

## Running it

Double-click **`Start Map.bat`**. It starts a small local web server (no Python or Node needed) and opens `http://localhost:8000`. If port 8000 is busy it uses the next free port. Keep the window open while you use the map.

From a terminal you can run `powershell -ExecutionPolicy Bypass -File serve.ps1`. Opening `index.html` directly also works, but most period maps only load through the server.

## Using the map

| Control | What it does |
|---|---|
| ◀ / ▶ or the ← / → keys | Step back or forward one day; markers glide to their new positions |
| ⏮ / ⏭ or Shift+← / Shift+→ | Jump to the previous or next battle |
| ▶ / Space | Play smoothly at 1–30 days per second; a card pops up for each battle and documented movement |
| **Pause at battles** | Stop playback automatically when a battle begins |
| Red ticks above the slider | Battles; click one to jump to it |
| Commander (sidebar or map) | Opens a profile card: portrait, bio, today's position, battles, plus **Isolate route**, **Follow** and **Fly to** |
| Battle marker | Opens details and animates each side's approach and withdrawal routes; **Play this battle** runs just that window |
| ⛺ ⛫ ★ ⚑ markers | Camps, fortified posts, occupied towns and musters. They light up while in use; click for details |
| **N⬆** button | Turn the map north-up; click again for a flat top-down view |
| 3D Satellite / Period Maps / Modern | Switch base map; drag with right-click or Ctrl to tilt and rotate |

The URL keeps your place (for example `#date=1781-01-17&battle=cowpens&layer=period`), so you can bookmark or share a moment. Add `?validate` to the URL to see the data check report.

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

Fitting to real places works better than using a map's printed graticule, because 18th-century longitudes are often a degree off.

## How positions work

- Each commander has **dated waypoints** in `data/movements.js`. Each one is marked `d` (documented date and place) or `a` (approximate).
- On days between waypoints, the position is **interpolated** with easing. These markers have a dashed ring, and the profile card says the position is estimated.
- Partisan leaders such as Marion and Sumter are thinly documented, so treat their tracks as a sketch.

## Project layout

```
index.html              page shell
css/style.css           styles (light/dark, phone layout)
js/                     util, layers, movements, commanders, battles, landmarks, toasts, timeline, validate, main
data/places.js          gazetteer of historic sites  (id -> [lon, lat, name])
data/commanders.js      commanders, force type, portrait, bio  (+ SC.FORCES colour scheme)
data/movements.js       dated waypoints per commander
data/battles.js         battles, sieges, raids
data/landmarks.js       camps, posts, occupied towns and when they were in use
data/historic-maps.js   period map overlays and their tile corner coordinates
assets/historic/        map scans (some cut into georeferenced tiles)
assets/portraits/       commander portraits + CREDITS.md
tools/georef.ps1        landmark-based georeferencing / rubber-sheet tiling
```

### Adding a commander
1. Add an entry to `data/commanders.js`, with a `force` and optionally a `portrait`.
2. Add a waypoint list under the same `id` in `data/movements.js`. Use place ids from `places.js`, or `[lon, lat, 'Name']`.
3. Reload with `?validate` and fix anything it reports.

### Adding a period map
1. Put the scan in `assets/historic/`.
2. Note the pixel positions of 5–15 places you can identify.
3. Run `powershell -File tools/georef.ps1 -Points "x,y,lon,lat; ..." -Width W -Height H`, adding `-Grid 4x3 -Image file.jpg -OutPrefix name` for a rubber-sheet warp.
4. Paste the printed corners into `data/historic-maps.js`.

## Sources
- Lumpkin, *From Savannah to Yorktown*
- Buchanan, *The Road to Guilford Courthouse*
- Babits, *A Devil of a Whipping*
- O'Kelley, *Slaughter in the Carolinas*
- National Park Service battlefield histories

Strengths and casualties are approximate, and sources disagree.

**Map data:** Esri World Imagery, World Shaded Relief and World Street Map; Mapzen/AWS Terrain Tiles; © OpenStreetMap contributors. **Rendering:** MapLibre GL JS 5.6. **Portraits:** see `assets/portraits/CREDITS.md`.
