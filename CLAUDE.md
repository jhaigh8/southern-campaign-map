# Handoff notes for Claude (and future me)

Read README.md for what the map does and how the data is laid out. This file has the things the README doesn't:
current status, working conventions, gotchas, and the backlog.

## Status (paused 2026-11-23)
- Covers Dec 1778 – Dec 1782 (Savannah to the evacuation of Charleston): 70 battles/actions, 716 historical
  markers (NC 200, GA 97, SC 268, VA 151), 35 battlefield reconstructions in `data/tactical/`.
- Live: https://jhaigh8.github.io/southern-campaign-map/ (GitHub Pages from `main`, repo root). Public repo,
  non-commercial pet project shared with friends.
- Accuracy pass done against American Battlefield Trust pages (battlefields.org) and USGS hydrography.

## Working conventions
- Clean, focused commits, each pushed. Pushing `main` updates the live site in a minute or two.
- Commits must use the GitHub no-reply address (`git config user.email` is set in this repo). Never commit
  with a personal email — the history was rewritten once to remove it.
- No Python or Node on this machine. Data lives in plain `.js` files so the page works from `file://`;
  `serve.ps1` / `Start Map.bat` serve it locally when needed. Tools are PowerShell.
- Base maps must stay free and key-less with open terms (USGS National Map, NASA GIBS, AWS Terrarium).
  Esri was removed because its terms expect an ArcGIS account.

## Testing
- In the page, `SC.validate()` checks the data: dates, coordinates, and that every listed commander is
  within 10 km (or the battle's `radiusKm`) of the battle on its dates (campaign/naval/evacuation skipped).
- Headless check (Chrome, no install needed):
  `powershell -ExecutionPolicy Bypass -File tools\test\headless-check.ps1 -StepsFile tools\test\smoke.steps`
  Add `-Live` to test the GitHub Pages site. Steps files are `name|waitSeconds|js expression` lines; a
  screenshot `<name>.png` goes to `-OutDir` (default %TEMP%) unless the name is `-`.
  Expected: "All data checks passed", errs [], battles 70, markers 716, {"true":45} portraits.

## Data gotchas
- Strings with apostrophes must use double quotes in the data files (single-quote escaping has broken
  `battles.js` before — run the validator after every data edit).
- Movement waypoints: `[isoDate, placeId | [lon,lat,'Name'] | null, troops, 'd'|'a', note]` ('d' documented,
  'a' approximate; `null` place ends a track). Battles are sorted by date at runtime.
- Mark anything uncertain as approximate and give casualty/strength ranges where sources disagree.
- Historical markers are generated: edit `tools/build-visit.ps1` (or `tools/va-markers.json`), then run it to
  rebuild `data/visit-data.js`. Don't hand-edit `visit-data.js`. SC markers replaced by a newer marker number
  are filtered out; `$scExtra` adds war markers SC files under other eras.
- A curated visit pin within 2.5 km of its own battle is hidden (the battle icon covers it).

## Backlog (ideas, none started)
- People and stories layer beyond commanders (e.g. pension-statement soldiers, Black Loyalists, Catawba and
  Cherokee perspectives, civilians).
- Period landscape layer: pre-dam rivers (Lake Marion/Moultrie flooded several sites), old roads, ferries.
- Known nit: a faint seam offshore where USGS imagery meets the Blue Marble underlay.
- Halfway Swamp site is approximate (creek not in NHD); Lindley's Mill and Long Swamp also approximate.
