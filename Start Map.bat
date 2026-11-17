@echo off
rem Double-click to start the local server and open the map in your browser.
rem Keep this window open while you use the map; close it to stop the server.
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0serve.ps1"
if errorlevel 1 pause
