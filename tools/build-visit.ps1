# Builds data/visit-data.js: the generated part of the "Visit today" layer.
#   - National Park Service unit boundaries (NPS Land Resources Division, public domain)
#   - Overmountain Victory National Historic Trail, historic route (NPS)
#   - Roadside historical markers on the Revolution: South Carolina (SC Dept. of Archives & History's public
#     marker map, Revolution-era markers), North Carolina (NC Dept. of Natural and Cultural
#     Resources' American Revolution marker layer), Georgia (Georgia Historical Society markers whose
#     time period includes "Revolutionary") and Virginia (Dept. of Historic Resources highway markers,
#     matched by title)
# Only titles, numbers, positions and links are kept: marker inscriptions stay on the programs' own pages.
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
  where = '1=1'; outFields = 'MarkerId,Marker_Title,Learn_More'; outSR = 4326; f = 'json'; resultRecordCount = 2000 }
foreach ($f in $nc.features) {
  $a = $f.attributes; if (-not $f.geometry) { continue }
  $id = ($a.MarkerId -replace '\s', '')
  [void]$markers.Add([ordered]@{ st = 'NC'; no = $id; name = (Title $a.Marker_Title); ll = @((& $r4 $f.geometry.x), (& $r4 $f.geometry.y))
    url = "https://www.dncr.nc.gov/search?keys=$([Uri]::EscapeDataString($id))" })
}

# ---- Georgia ----
$ga = Get-Json 'https://services8.arcgis.com/mPCcw2QHTvtUPtyA/arcgis/rest/services/CSV1_GA_historical_markers_9_25_23/FeatureServer/0/query' @{
  where = "Marker_Time_Period LIKE '%Revolution%'"; outFields = 'Number,Name,Latitude,Longitude,Learn_More,Marker_Status'; returnGeometry = 'false'; f = 'json'; resultRecordCount = 2000 }
foreach ($f in $ga.features) {
  $a = $f.attributes; if (-not $a.Latitude) { continue }
  $m = [ordered]@{ st = 'GA'; no = "$($a.Number)".Trim(); name = (Title $a.Name); ll = @((& $r4 $a.Longitude), (& $r4 $a.Latitude)) }
  if ($a.Learn_More -match '^https?://') { $m.url = $a.Learn_More.Trim() }
  if ($a.Marker_Status -match 'not in place') { $m.note = 'Reported not in place (damage or maintenance)' }
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
foreach ($pm in $kml.GetElementsByTagName('Placemark')) {
  $d = @{}; foreach ($x in $pm.GetElementsByTagName('Data')) { $d[$x.GetAttribute('name')] = $x.InnerText.Trim() }
  if ("$($d['Time Period'])" -notmatch 'American Revolution' -and "$($d['Keywords'])" -notmatch 'American Revolution') { continue }
  $pt = $pm.GetElementsByTagName('coordinates') | Select-Object -First 1
  if (-not $pt) { continue }
  $c = $pt.InnerText.Trim() -split ','
  $key = "$($pm.name.Trim())|$($d['Marker Name - Front'])"; if ($scSeen[$key]) { continue }; $scSeen[$key] = 1
  $name = $d['Marker Name - Front']; if ($d['Marker Name - Reverse'] -and $d['Marker Name - Reverse'] -ne $name) { $name = "$name / $($d['Marker Name - Reverse'])" }
  $m = [ordered]@{ st = 'SC'; no = $pm.name.Trim(); name = (Title $name); ll = @((& $r4 $c[0]), (& $r4 $c[1]))
    url = "https://www.google.com/maps/d/viewer?mid=$scMap&ll=$([double]$c[1]),$([double]$c[0])&z=16" }
  if ($d['Address/Location']) { $m.where = $d['Address/Location'] }
  if ($d['Missing'] -eq 'TRUE') { $m.note = 'Reported missing' }
  [void]$markers.Add($m)
}

# ---- Virginia (no subject field: matched by title, then filtered by hand-checked exclusions) ----
$va = $null
try { $va = Get-Json 'https://vcris.dhr.virginia.gov/arcgis/rest/services/Highway_Markers/MapServer/0/query' @{
  where = "fldMarkerName LIKE '%Revolution%' OR fldMarkerName LIKE '%1781%' OR fldMarkerName LIKE '%1780%' OR fldMarkerName LIKE '%Cornwallis%' OR fldMarkerName LIKE '%Lafayette%' OR fldMarkerName LIKE '%Tarleton%' OR fldMarkerName LIKE '%Rochambeau%' OR fldMarkerName LIKE '%Steuben%' OR fldMarkerName LIKE '%Simcoe%' OR fldMarkerName LIKE '%Arnold%' OR fldMarkerName LIKE '%Green Spring%' OR fldMarkerName LIKE '%Yorktown%' OR fldMarkerName LIKE '%Gloucester Point%' OR fldMarkerName LIKE '%Point of Fork%' OR fldMarkerName LIKE '%Jouett%' OR fldMarkerName LIKE '%Wayne%Crossing%' OR fldMarkerName LIKE '%British Ra%' OR fldMarkerName LIKE '%British Landing%' OR fldMarkerName LIKE '%Washington%Headquarters%' OR fldMarkerName LIKE '%Phillips%' OR fldMarkerName LIKE '%Muhlenberg%' OR fldMarkerName LIKE '%Weedon%' OR fldMarkerName LIKE '%Campbell%Grave%' OR fldMarkerName LIKE '%Arthur Campbell%' OR fldMarkerName LIKE '%Overmountain%' OR fldMarkerName LIKE '%Kings Mountain%' OR fldMarkerName LIKE '%Guilford%' OR fldMarkerName LIKE '%Continental%'"
  outFields = 'fldMarkerNo,fldMarkerName,fldLatitude,fldLongitude'; returnGeometry = 'false'; orderByFields = 'fldMarkerNo'; f = 'json' } } catch { Write-Warning "Virginia marker service failed: $_" }
$skip = 'Green Spring Presbyterian|Green Springs|Aviation Field|Thomas Pettus|Lafayette.s Visit|Morgan v|Irene Morgan|Hooker|1812|School|Armistead \(1780|Campbell County|Continental Divide|Arnold.s Valley|Benedict Arnold.s Wife|Waynesboro|Civil War|Confederate|Union '
$seen = @{}
foreach ($f in $va.features) {
  $a = $f.attributes; $no = ($a.fldMarkerNo -replace '\s', ''); $name = Title $a.fldMarkerName
  if (-not $a.fldLatitude -or $seen[$no] -or $name -match $skip) { continue }
  $seen[$no] = 1
  [void]$markers.Add([ordered]@{ st = 'VA'; no = $no; name = $name; ll = @((& $r4 $a.fldLongitude), (& $r4 $a.fldLatitude))
    url = "https://vcris.dhr.virginia.gov/HistoricMarkers/" })
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
// of Historic Resources highway markers. Park boundaries and the Overmountain Victory NHT route: National Park Service.
window.SC = window.SC || {};
SC.visitData = {
  markers: $($markers | ConvertTo-Json -Depth 5 -Compress),
  parks: $nps,
  trail: $ovvi,
};
"@
[IO.File]::WriteAllText((Join-Path $root 'data\visit-data.js'), $js, (New-Object Text.UTF8Encoding $false))
"wrote data/visit-data.js: $($counts -join ', ')"
