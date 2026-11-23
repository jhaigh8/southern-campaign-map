param([string]$StepsFile, [string]$Hash = 'visit=1', [int]$Port = 9338, [switch]$Live, [string]$OutDir = $env:TEMP)
# StepsFile: lines "name|waitSeconds|js expression" ; a shot named <name>.png is taken after each step (name '-' = no shot)
# -Live tests the GitHub Pages site instead of the local files. Screenshots go to -OutDir.
$repo = (Resolve-Path (Join-Path $PSScriptRoot '..\..')).Path
$url = if ($Live) { "https://jhaigh8.github.io/southern-campaign-map/#$Hash" } else { "file:///" + ($repo -replace "\\", "/") + "/index.html#$Hash" }
$S = $OutDir
$chrome = 'C:\Program Files\Google\Chrome\Application\chrome.exe'
$ud = Join-Path $env:TEMP ('st-' + [guid]::NewGuid())
$p = Start-Process $chrome -ArgumentList @("--remote-debugging-port=$Port", "--user-data-dir=$ud", '--window-size=1400,900', '--headless=new', '--use-angle=d3d11', '--no-first-run', '--allow-file-access-from-files', $url) -PassThru
$script:n = 0
function Send($c, $method, $params) {
  $script:n++; $id = $script:n
  $msg = @{ id = $id; method = $method; params = $params } | ConvertTo-Json -Depth 6
  $b = [Text.Encoding]::UTF8.GetBytes($msg)
  $c.SendAsync([ArraySegment[byte]]$b, 'Text', $true, [Threading.CancellationToken]::None).Wait()
  $buf = New-Object byte[] 16777216
  while ($true) {
    $sb = New-Object Text.StringBuilder
    do { $r = $c.ReceiveAsync([ArraySegment[byte]]$buf, [Threading.CancellationToken]::None).Result; [void]$sb.Append([Text.Encoding]::UTF8.GetString($buf, 0, $r.Count)) } while (-not $r.EndOfMessage)
    $o = $sb.ToString() | ConvertFrom-Json
    if ($o.id -eq $id) { return $o }
  }
}
try {
  Start-Sleep -Seconds 14
  $tabs = Invoke-RestMethod "http://127.0.0.1:$Port/json"
  $ws = ($tabs | Where-Object { $_.type -eq 'page' } | Select-Object -First 1).webSocketDebuggerUrl
  $c = New-Object System.Net.WebSockets.ClientWebSocket
  $c.ConnectAsync([Uri]$ws, [Threading.CancellationToken]::None).Wait()
  foreach ($line in (Get-Content $StepsFile)) {
    if (-not $line.Trim()) { continue }
    $name, $wait, $expr = $line -split '\|', 3
    $r = Send $c 'Runtime.evaluate' @{ expression = "(()=>{ try { return String($expr) } catch(e) { return 'ERR ' + e.message } })()"; returnByValue = $true }
    Start-Sleep -Seconds ([int]$wait)
    if ($name -ne '-') { $shot = Send $c 'Page.captureScreenshot' @{ format = 'png' }; [IO.File]::WriteAllBytes("$S\$name.png", [Convert]::FromBase64String($shot.result.data)) }
    "$name -> $($r.result.result.value)"
  }
} finally { Get-CimInstance Win32_Process -Filter "name='chrome.exe'" | ? { $_.CommandLine -like "*$ud*" } | % { Stop-Process -Id $_.ProcessId -Force -EA SilentlyContinue } }
