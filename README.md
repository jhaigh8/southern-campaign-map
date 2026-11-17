# The Southern Campaign: an interactive 3D atlas

Step day by day through the Southern Campaign of the American Revolution, from the capture of Savannah (Dec 1778) to the surrender at Yorktown (Oct 1781), and watch commanders and their armies move across a 3D map.

## Running it

Double-click **`Start Map.bat`**. It starts a small local web server (no Python or Node needed) and opens `http://localhost:8000`.

From a terminal you can run `powershell -ExecutionPolicy Bypass -File serve.ps1`. You can also open `index.html` directly; it works, but the 1775 map then loads from Wikimedia instead of the local copy.

## Using the map

| Control | What it does |
|---|---|
| ◀ / ▶ or the ← / → keys | Step back or forward one day |
| ⏮ / ⏭ or Shift+← / Shift+→ | Jump to the previous or next battle |
| ▶ / Space | Play, at 1–30 days per second |
| Red ticks above the slider | Battles; click one to jump to it |
| **Isolate** (sidebar) | Show one commander's whole route and their battles only |
| **Follow** (sidebar) | Keep the camera on a commander during playback |
| Battle marker | Opens details and animates each side's approach and withdrawal routes; **Play this battle** runs just that window |
| 3D Satellite / 1775 Maps / Modern | Switch base map; drag with right-click or Ctrl to tilt and rotate |

The URL keeps your place (for example `#date=1781-01-17&battle=cowpens`), so you can bookmark or share a moment. Add `?validate` to the URL to see the data check report.

## How positions work

- Each commander has **dated waypoints** in `data/movements.js`. Each one is marked `d` (documented date and place) or `a` (approximate).
- On days between waypoints, the position is **interpolated** in a straight line. These markers are drawn with a dashed outline, and the event log notes they are estimates.
- Partisan leaders such as Marion and Sumter are thinly documented, so treat their tracks as a sketch.

## Project layout

```
index.html            page shell
css/style.css         styles (light/dark, phone layout)
js/                   util, layers, movements, commanders, battles, timeline, validate, main
data/places.js        gazetteer of historic sites  (id -> [lon, lat, name])
data/commanders.js    commanders, sides, colours, bios
data/movements.js     dated waypoints per commander
data/battles.js       battles, sieges, raids
data/historic-maps.js period map overlays and their corner coordinates
assets/historic/      public-domain map scans
```

### Adding a commander
1. Add an entry to `data/commanders.js`.
2. Add a waypoint list under the same `id` in `data/movements.js`. Use place ids from `places.js`, or `[lon, lat, 'Name']`.
3. Reload with `?validate` and fix anything it reports.

### Adding a period map
Put the image in `assets/historic/` and add an entry to `data/historic-maps.js`. The entry gives the lon/lat of the image's four corners: top-left, top-right, bottom-right, bottom-left.

The Mouzon corners were fitted from 8 known landmarks. Fitting to real places works better than using the map's printed graticule, because 18th-century longitudes are often a degree off.

## Sources
- Lumpkin, *From Savannah to Yorktown*
- Buchanan, *The Road to Guilford Courthouse*
- Babits, *A Devil of a Whipping*
- O'Kelley, *Slaughter in the Carolinas*
- National Park Service battlefield histories

Strengths and casualties are approximate, and sources disagree.

**Map data:** Esri World Imagery and World Shaded Relief; Mapzen/AWS Terrain Tiles; © OpenStreetMap contributors © CARTO. **Period map:** Henry Mouzon, *An Accurate Map of North and South Carolina* (1775), Library of Congress (public domain).
