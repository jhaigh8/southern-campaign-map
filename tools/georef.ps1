# Fit an affine transform (pixel -> lon/lat) from landmark control points and print the
# corner coordinates MapLibre needs for an image overlay (top-left, top-right, bottom-right, bottom-left).
#
# Usage:
#   powershell -File tools/georef.ps1 -Points "x,y,lon,lat; x,y,lon,lat; ..." -Width 2800 -Height 3375 [-Scale 1.69] [-Crops "x0,y0,x1,y1; ..."]
#   -Points : pixel positions of known places (in displayed-image pixels if -Scale is given) and their real lon/lat
#   -Scale  : multiply point pixels by this to get original-image pixels (default 1)
#   -Crops  : optional sub-rectangles (original pixels) to report corners for, e.g. to cut out inset maps
#   -Grid 4x3 -Image map.jpg -OutPrefix name : rubber-sheet warp; writes tile images and prints their corners
param(
  [Parameter(Mandatory)] [string]$Points,
  [Parameter(Mandatory)] [int]$Width,
  [Parameter(Mandatory)] [int]$Height,
  [double]$Scale = 1,
  [string]$Crops = '',
  [string]$Grid = '',        # e.g. "4x3": rubber-sheet the image into 4 columns x 3 rows of tiles
  [string]$Image = '',       # image file to cut into tiles (required with -Grid)
  [string]$OutPrefix = ''    # tile file name prefix, written next to the image
)

$pts = New-Object System.Collections.Generic.List[double[]]
foreach ($chunk in $Points.Split(';')) {
  if (-not $chunk.Trim()) { continue }
  $v = $chunk.Split(',') | ForEach-Object { [double]$_.Trim() }
  $pts.Add([double[]]@(($v[0] * $Scale), ($v[1] * $Scale), $v[2], $v[3]))  # parens: ',' binds tighter than '*'
}
if ($pts.Count -lt 3) { throw 'Need at least 3 control points' }

function Solve([int]$k) {
  $S = New-Object 'double[,]' 3, 4
  foreach ($p in $pts) {
    $r = [double[]]@($p[0], $p[1], 1.0)
    for ($i = 0; $i -lt 3; $i++) { for ($j = 0; $j -lt 3; $j++) { $S[$i, $j] += $r[$i] * $r[$j] }; $S[$i, 3] += $r[$i] * $p[$k] }
  }
  for ($i = 0; $i -lt 3; $i++) {
    $piv = $S[$i, $i]; for ($j = 0; $j -lt 4; $j++) { $S[$i, $j] /= $piv }
    for ($r2 = 0; $r2 -lt 3; $r2++) { if ($r2 -ne $i) { $f = $S[$r2, $i]; for ($j = 0; $j -lt 4; $j++) { $S[$r2, $j] -= $f * $S[$i, $j] } } }
  }
  return [double[]]@($S[0, 3], $S[1, 3], $S[2, 3])
}
$L = Solve 2; $A = Solve 3
function Proj([double]$x, [double]$y) { return [double[]]@(($L[0] * $x + $L[1] * $y + $L[2]), ($A[0] * $x + $A[1] * $y + $A[2])) }

Write-Host 'Residuals:'
foreach ($p in $pts) {
  $q = Proj $p[0] $p[1]
  $km = [math]::Sqrt([math]::Pow(($q[0] - $p[2]) * 111 * [math]::Cos($p[3] * [math]::PI / 180), 2) + [math]::Pow(($q[1] - $p[3]) * 111, 2))
  Write-Host ('  ({0,7:N0},{1,7:N0})  fit {2:N4},{3:N4}  true {4},{5}  error {6:N1} km' -f $p[0], $p[1], $q[0], $q[1], $p[2], $p[3], $km)
}

function Corners($x0, $y0, $x1, $y1) {
  $c = @((Proj $x0 $y0), (Proj $x1 $y0), (Proj $x1 $y1), (Proj $x0 $y1))
  return '[' + (($c | ForEach-Object { '[{0:N4}, {1:N4}]' -f $_[0], $_[1] }) -join ', ') + ']'
}
Write-Host "Full image corners: $(Corners 0 0 $Width $Height)"

# ---- Optional rubber-sheet warp ----
# The affine fit is corrected by inverse-distance-weighted residuals, so every control point lands
# exactly. The image is cut into a Cols x Rows grid; each tile gets its own four corners, and
# neighbouring tiles share corners, so there are no seams.
if ($Grid) {
  $res = foreach ($p in $pts) { $q = Proj $p[0] $p[1]; ,([double[]]@($p[0], $p[1], ($p[2] - $q[0]), ($p[3] - $q[1]))) }
  function Warp([double]$x, [double]$y) {
    $q = Proj $x $y; $sw = 0.0; $dx = 0.0; $dy = 0.0
    foreach ($r in $res) {
      $d2 = [math]::Pow($x - $r[0], 2) + [math]::Pow($y - $r[1], 2)
      if ($d2 -lt 1) { return [double[]]@(($q[0] + $r[2]), ($q[1] + $r[3])) }
      $w = 1.0 / $d2; $sw += $w; $dx += $w * $r[2]; $dy += $w * $r[3]
    }
    return [double[]]@(($q[0] + $dx / $sw), ($q[1] + $dy / $sw))
  }
  $cols, $rows = $Grid.Split('x') | ForEach-Object { [int]$_ }
  Add-Type -AssemblyName System.Drawing
  $img = [System.Drawing.Image]::FromFile((Resolve-Path $Image))
  $enc = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object MimeType -eq 'image/jpeg'
  $ep = New-Object System.Drawing.Imaging.EncoderParameters 1
  $ep.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter ([System.Drawing.Imaging.Encoder]::Quality), 85L
  $tiles = @()
  for ($r = 0; $r -lt $rows; $r++) {
    for ($c = 0; $c -lt $cols; $c++) {
      $x0 = [int]($Width * $c / $cols); $x1 = [int]($Width * ($c + 1) / $cols)
      $y0 = [int]($Height * $r / $rows); $y1 = [int]($Height * ($r + 1) / $rows)
      $name = "$OutPrefix-$r$c.jpg"
      $bmp = New-Object System.Drawing.Bitmap ($x1 - $x0), ($y1 - $y0)
      $g = [System.Drawing.Graphics]::FromImage($bmp)
      $g.DrawImage($img, (New-Object System.Drawing.Rectangle 0, 0, ($x1 - $x0), ($y1 - $y0)), (New-Object System.Drawing.Rectangle $x0, $y0, ($x1 - $x0), ($y1 - $y0)), [System.Drawing.GraphicsUnit]::Pixel)
      $g.Dispose(); $bmp.Save((Join-Path (Split-Path (Resolve-Path $Image)) $name), $enc, $ep); $bmp.Dispose()
      $cs = @((Warp $x0 $y0), (Warp $x1 $y0), (Warp $x1 $y1), (Warp $x0 $y1)) | ForEach-Object { '[{0:N4}, {1:N4}]' -f $_[0], $_[1] }
      $tiles += "      { src: '$name', coordinates: [$($cs -join ', ')] },"
    }
  }
  $img.Dispose()
  Write-Host "Tiles (paste into historic-maps.js 'tiles'):"
  $tiles | ForEach-Object { Write-Host $_ }
}
foreach ($chunk in $Crops.Split(';')) {
  if (-not $chunk.Trim()) { continue }
  $v = $chunk.Split(',') | ForEach-Object { [double]$_.Trim() }
  Write-Host "Crop ($chunk): $(Corners $v[0] $v[1] $v[2] $v[3])"
}
