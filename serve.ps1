# Minimal static file server for local development (no Python/Node needed).
# Usage:  powershell -ExecutionPolicy Bypass -File serve.ps1 [-Port 8000] [-NoBrowser]
param([int]$Port = 8000, [switch]$NoBrowser)

$root = $PSScriptRoot
$mime = @{
  '.html' = 'text/html; charset=utf-8'; '.js' = 'text/javascript; charset=utf-8'; '.css' = 'text/css; charset=utf-8'
  '.json' = 'application/json'; '.jpg' = 'image/jpeg'; '.jpeg' = 'image/jpeg'; '.png' = 'image/png'
  '.svg' = 'image/svg+xml'; '.ico' = 'image/x-icon'; '.md' = 'text/markdown; charset=utf-8'
}

# Use the first free port from $Port to $Port+10 (another copy may already be running)
$listener = $null
foreach ($p in $Port..($Port + 10)) {
  $try = New-Object System.Net.HttpListener
  $try.Prefixes.Add("http://localhost:$p/")
  try { $try.Start(); $listener = $try; $Port = $p; break } catch { $try.Close() }
}
if (-not $listener) { Write-Host "Could not start a server on ports $Port-$($Port + 10)." -ForegroundColor Red; exit 1 }

$url = "http://localhost:$Port/"
Write-Host "Serving $root at $url  (Ctrl+C to stop)" -ForegroundColor Green
if (-not $NoBrowser) { Start-Process $url }

try {
  while ($listener.IsListening) {
    $ctx = $listener.GetContext()
    try {
    $path = [Uri]::UnescapeDataString($ctx.Request.Url.AbsolutePath.TrimStart('/'))
    if ([string]::IsNullOrEmpty($path)) { $path = 'index.html' }
    $file = [IO.Path]::GetFullPath((Join-Path $root $path))
    $res = $ctx.Response
    if ($file.StartsWith($root) -and (Test-Path $file -PathType Leaf)) {
      $bytes = [IO.File]::ReadAllBytes($file)
      $ext = [IO.Path]::GetExtension($file).ToLower()
      $res.ContentType = if ($mime.ContainsKey($ext)) { $mime[$ext] } else { 'application/octet-stream' }
      $res.Headers.Add('Cache-Control', 'no-cache')
      $res.ContentLength64 = $bytes.Length
      $res.OutputStream.Write($bytes, 0, $bytes.Length)
    } else {
      $res.StatusCode = 404
    }
    $res.OutputStream.Close()
    } catch { }  # browser cancelled a request; keep serving
  }
} finally { $listener.Stop() }
