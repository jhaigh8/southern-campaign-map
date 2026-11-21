# Builds data/visit-data.js: the generated part of the "Visit today" layer.
#   - National Park Service unit boundaries (NPS Land Resources Division, public domain)
#   - Overmountain Victory National Historic Trail, historic route (NPS)
#   - Roadside historical markers on the Revolution, with their inscriptions: South Carolina (SC Dept. of
#     Archives & History's public marker map, Revolution-era markers; retired markers that have been
#     replaced are left out), North Carolina (NC Dept. of Natural and Cultural Resources' American
#     Revolution marker layer), Georgia (Georgia Historical Society markers whose time period includes
#     "Revolutionary") and Virginia (Dept. of Historic Resources highway markers, hand-picked: see below)
# Inscriptions are shown in the marker popups with credit to each program.
# Virginia publishes no open marker-text dataset. tools/va-markers.json holds the 151 markers picked by
# reading the full text of all 2,711 Virginia markers (DHR marker database export, Nov. 2026): war events
# in Virginia 1779-81 (the Collier, Leslie, Arnold, Phillips and Cornwallis invasions, Tarleton's and
# Simcoe's raids, Lafayette's campaign, Yorktown and the allied march) and people and units of the
# Southern Campaign. Left out: 1775-76 Dunmore-era actions, county-line markers and purely civil or
# biographical markers. Edit that file by hand to add or drop a Virginia marker.
# The hand-curated parks, sites and museums are in data/visit-sites.js.
#
# Usage (from the project folder):  powershell -ExecutionPolicy Bypass -File tools\build-visit.ps1
$ErrorActionPreference = 'Stop'
$root = Split-Path -Parent (Split-Path -Parent $MyInvocation.MyCommand.Path)
Add-Type -AssemblyName System.Web

function Get-Json([string]$url, [hashtable]$q) {
  $qs = ($q.GetEnumerator() | ForEach-Object { "$($_.Key)=$([Uri]::EscapeDataString([string]$_.Value))" }) -join '&'
  Invoke-RestMethod -Uri "$url`?$qs" -TimeoutSec 180
}
function Get-Text([string]$url, [hashtable]$q) {
  $qs = ($q.GetEnumerator() | ForEach-Object { "$($_.Key)=$([Uri]::EscapeDataString([string]$_.Value))" }) -join '&'
  (Invoke-WebRequest -Uri "$url`?$qs" -UseBasicParsing -TimeoutSec 180).Content
}
function Title([string]$s) {
  $s = ($s -replace '\s+', ' ').Trim()
  # Mostly upper case (some programs store titles in capitals, e.g. "McKNIGHT'S SHIPYARD"): title-case it
  $lower = ([regex]::Matches($s, '[a-z]')).Count; $upper = ([regex]::Matches($s, '[A-Z]')).Count
  if ($lower -gt $upper) { return $s }
  $t = (Get-Culture).TextInfo.ToTitleCase($s.ToLower())
  # keep small words lower-case and Roman-numeral / initial forms tidy
  $t = [regex]::Replace($t, '(?<=\s)(Of|And|The|At|In|On|To|A|An|For|By)(?=\s)', { param($m) $m.Value.ToLower() })
  $t = [regex]::Replace($t, "(?<=\w)'S\b", "'s")
  $t = [regex]::Replace($t, '\bMc([a-z])', { param($m) 'Mc' + $m.Groups[1].Value.ToUpper() })
  return $t
}
# Tidy an inscription: unify line breaks, drop hard wraps inside paragraphs
function Clean([string]$t) {
  if (-not $t) { return '' }
  $t = $t -replace '(?i)<br\s*/?>', "`n" -replace '(?i)</p>\s*<p[^>]*>', "`n`n" -replace '<[^>]+>', ''   # the Georgia list stores some HTML
  $t = [System.Web.HttpUtility]::HtmlDecode($t)
  $t = ($t -replace "`r", '' -replace '[ \t]+', ' ').Trim()
  $t = $t -replace '(?<!\n)\n(?!\n)', ' '
  return ($t -replace ' *\n\n+ *', "`n`n" -replace '  +', ' ').Trim()
}
$r4 = { param($v) [math]::Round([double]$v, 5) }

# ---- NPS boundaries ----
$nps = Get-Text 'https://services1.arcgis.com/fBc8EJBxQRMcHlei/arcgis/rest/services/NPS_Land_Resources_Division_Boundary_and_Tract_Data_Service/FeatureServer/2/query' @{
  where = "UNIT_CODE IN ('COWP','KIMO','GUCO','NISI','COLO','MOCR','FOSU','CHPI')"; outFields = 'UNIT_CODE,UNIT_NAME'; outSR = 4326
  geometryPrecision = 5; maxAllowableOffset = 0.0001; f = 'geojson' }

# ---- Overmountain Victory NHT ----
$ovvi = Get-Text 'https://services1.arcgis.com/fBc8EJBxQRMcHlei/arcgis/rest/services/Overmountain_Victory_National_Historic_Trail_Official_Temp/FeatureServer/0/query' @{
  where = '1=1'; outFields = 'OBJECTID'; outSR = 4326; geometryPrecision = 4; maxAllowableOffset = 0.0005; f = 'geojson' }

$markers = New-Object System.Collections.ArrayList

# ---- North Carolina ----
$nc = Get-Json 'https://services6.arcgis.com/nRIB86xC7kq6wavB/arcgis/rest/services/Highway_MarkerMap_AmericanRevolution_Update_WFL1/FeatureServer/0/query' @{
  where = '1=1'; outFields = 'MarkerId,Marker_Title,Marker_Text,County'; outSR = 4326; f = 'json'; resultRecordCount = 2000 }
foreach ($f in $nc.features) {
  $a = $f.attributes; if (-not $f.geometry) { continue }
  $id = ($a.MarkerId -replace '\s', '')
  # (ncmarkers.com, the program's per-marker site, has been down with a database error, so no link)
  $m = [ordered]@{ st = 'NC'; no = $id; name = (Title $a.Marker_Title); ll = @((& $r4 $f.geometry.x), (& $r4 $f.geometry.y)) }
  if ($a.County) { $m.where = "$($a.County.Trim()) County" }
  if ($a.Marker_Text) { $m.text = (Clean $a.Marker_Text) }
  [void]$markers.Add($m)
}

# ---- Georgia ----
$ga = Get-Json 'https://services8.arcgis.com/mPCcw2QHTvtUPtyA/arcgis/rest/services/CSV1_GA_historical_markers_9_25_23/FeatureServer/0/query' @{
  where = "Marker_Time_Period LIKE '%Revolution%'"; outFields = 'Number,Name,Latitude,Longitude,Learn_More,Marker_Status,Marker_Text,Tips_for_Finding_This_Marker_'; returnGeometry = 'false'; f = 'json'; resultRecordCount = 2000 }
foreach ($f in $ga.features) {
  $a = $f.attributes; if (-not $a.Latitude) { continue }
  $m = [ordered]@{ st = 'GA'; no = "$($a.Number)".Trim(); name = (Title $a.Name); ll = @((& $r4 $a.Longitude), (& $r4 $a.Latitude)) }
  if ($a.Learn_More -match '^https?://') { $m.url = $a.Learn_More.Trim() }
  if ($a.Marker_Status -match 'not in place') { $m.note = 'Reported not in place (damage or maintenance)' }
  if ($a.Tips_for_Finding_This_Marker_) { $m.where = (Clean $a.Tips_for_Finding_This_Marker_) }
  if ($a.Marker_Text) { $m.text = (Clean $a.Marker_Text) }
  [void]$markers.Add($m)
}

# ---- South Carolina: the SC Dept. of Archives & History's public "SC Historical Markers" Google My Map,
# exported as KML (all ~3,100 approved markers). Kept: time period "Era of American Revolution" or keyword
# "American Revolution". The program has no per-marker web page, so the link is the SCDAH map. ----
$scMap = '10X1A0ZtrChZ89za9_emjArJ9vUT6r04'
$kmlText = (Invoke-WebRequest -Uri "https://www.google.com/maps/d/kml?mid=$scMap&forcekml=1" -UseBasicParsing -TimeoutSec 300).Content
if ($kmlText -is [byte[]]) { $kmlText = [Text.Encoding]::UTF8.GetString($kmlText) }
$kml = [xml]$kmlText
$scSeen = @{}   # a marker appears once in each of the map's category layers
# Markers the program files under another era whose text records the war 1779-82 (picked by reading the
# text of every untagged marker that mentions the Revolution): churches burned by the British, British
# posts and headquarters, Jacksonborough, Pickens's home and grave, and similar
$scExtra = '07-17', '08-09', '08-21', '08-59', '10-07', '10-119', '11-10', '13-01', '15-01', '18-02', '18-05',
  '20-07', '22-18', '27-18', '28-04', '38-08', '39-03', '39-04', '40-185', '40-29', '45-09', '12-06', '28-23'
foreach ($pm in $kml.GetElementsByTagName('Placemark')) {
  $d = @{}; foreach ($x in $pm.GetElementsByTagName('Data')) { $d[$x.GetAttribute('name')] = $x.InnerText.Trim() }
  if ("$($d['Time Period'])" -notmatch 'American Revolution' -and "$($d['Keywords'])" -notmatch 'American Revolution' -and $scExtra -notcontains $pm.name.Trim()) { continue }
  $pt = $pm.GetElementsByTagName('coordinates') | Select-Object -First 1
  if (-not $pt) { continue }
  # an old marker that has been replaced (the new one is in the set too) or destroyed
  # ("Marker replaced in 2005 by <a society>" means a new plate on the same marker: that one stays)
  if ("$($d['Additional Info'])" -match 'Replaced (in \d{4} )?by (marker )?\d+-\d+|damaged beyond repair') { continue }
  $c = $pt.InnerText.Trim() -split ','
  $key = "$($pm.name.Trim())|$($d['Marker Name - Front'])"; if ($scSeen[$key]) { continue }; $scSeen[$key] = 1
  $name = $d['Marker Name - Front']; if ($d['Marker Name - Reverse'] -and $d['Marker Name - Reverse'] -ne $name) { $name = "$name / $($d['Marker Name - Reverse'])" }
  $m = [ordered]@{ st = 'SC'; no = $pm.name.Trim(); name = (Title $name); ll = @((& $r4 $c[0]), (& $r4 $c[1]))
    url = "https://www.google.com/maps/d/viewer?mid=$scMap&ll=$([double]$c[1]),$([double]$c[0])&z=16" }
  if ($d['Address/Location']) { $m.where = $d['Address/Location'] }
  if ($d['Missing'] -eq 'TRUE') { $m.note = 'Reported missing' }
  $tx = Clean $d['Text - Front']; $tr = Clean $d['Text - Reverse']
  if ($tr -and $tr -ne $tx) { $tx = "$tx`n`n(Reverse) $tr" }
  if ($tx) { $m.text = $tx }
  [void]$markers.Add($m)
}

# ---- Virginia: the hand-picked list (see the header) ----
foreach ($v in (Get-Content -Raw -Encoding UTF8 (Join-Path $root 'tools\va-markers.json') | ConvertFrom-Json)) {
  $m = [ordered]@{ st = 'VA'; no = $v.no; name = (Title $v.name); ll = @($v.ll[0], $v.ll[1]) }
  if ($v.where) { $m.where = $v.where }
  if ($v.note) { $m.note = $v.note }
  if ($v.text) { $m.text = (Clean $v.text) }
  [void]$markers.Add($m)
}

# A state's service can be down (Virginia's sometimes returns errors): keep that state's markers from the last build
$prevFile = Join-Path $root 'data\visit-data.js'
if (Test-Path $prevFile) {
  $prev = [regex]::Match([IO.File]::ReadAllText($prevFile), '(?s)markers: (\[.*?\]),\r?\n  parks:')
  if ($prev.Success) {
    $old = $prev.Groups[1].Value | ConvertFrom-Json
    foreach ($st in 'SC', 'NC', 'GA', 'VA') {
      if (-not ($markers | Where-Object { $_.st -eq $st })) {
        $keep = @($old | Where-Object { $_.st -eq $st })
        if ($keep.Count) { Write-Warning "$st source returned nothing; keeping $($keep.Count) markers from the last build"; foreach ($k in $keep) { [void]$markers.Add($k) } }
      }
    }
  }
}

$counts = $markers | Group-Object { $_.st } | ForEach-Object { "$($_.Name) $($_.Count)" }
$js = @"
// GENERATED by tools/build-visit.ps1 on $(Get-Date -Format 'yyyy-MM-dd'). Do not edit by hand; rerun the script.
// Markers: $($counts -join ', '). Sources: NC Dept. of Natural and Cultural Resources (Highway Historical Marker
// Program, American Revolution layer); SC Dept. of Archives & History (SCDAH marker map); Georgia Historical Society marker list (public ArcGIS layer); Virginia Dept.
// of Historic Resources highway markers (hand-picked; tools/va-markers.json). Inscriptions are the programs' own. Park boundaries and the Overmountain Victory NHT route: National Park Service.
window.SC = window.SC || {};
SC.visitData = {
  markers: $($markers | ConvertTo-Json -Depth 5 -Compress),
  parks: $nps,
  trail: $ovvi,
};
"@
[IO.File]::WriteAllText((Join-Path $root 'data\visit-data.js'), $js, (New-Object Text.UTF8Encoding $false))
"wrote data/visit-data.js: $($counts -join ', ')"
