# ============================================
# Soo Taasteplaan - Kiosk Mode Launcher (PowerShell)
# ============================================
#
# Supports: Microsoft Edge, Firefox, Chrome
#
# USAGE:
#   .\start-kiosk.ps1                    # Uses default remote URL
#   .\start-kiosk.ps1 -Url "http://localhost:8000"  # Local testing
#   .\start-kiosk.ps1 -Local             # Shortcut for localhost:8000
#
# IF SCRIPTS ARE DISABLED, run in Admin PowerShell:
#   Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
#
# OR use the .bat file instead (no restrictions)
#
# TO EXIT KIOSK MODE:
#   - Long-press (3 seconds) on the orange card's info icon (i)
#   - OR press Alt+F4 if keyboard is available
#
# ============================================

param(
    [string]$Url = "https://dev90.5dvision.ee/~kristjan/sootaasteplaan/",
    [switch]$Local
)

if ($Local) {
    $Url = "http://localhost:8000"
}

# Browser paths to try (in order of preference)
$browsers = @(
    @{ Name = "Edge"; Paths = @(
        "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe",
        "C:\Program Files\Microsoft\Edge\Application\msedge.exe",
        "$env:LOCALAPPDATA\Microsoft\Edge\Application\msedge.exe"
    )},
    @{ Name = "Chrome"; Paths = @(
        "C:\Program Files\Google\Chrome\Application\chrome.exe",
        "C:\Program Files (x86)\Google\Chrome\Application\chrome.exe",
        "$env:LOCALAPPDATA\Google\Chrome\Application\chrome.exe"
    )},
    @{ Name = "Firefox"; Paths = @(
        "C:\Program Files\Mozilla Firefox\firefox.exe",
        "C:\Program Files (x86)\Mozilla Firefox\firefox.exe"
    )}
)

$browserPath = $null
$browserName = $null

foreach ($browser in $browsers) {
    foreach ($path in $browser.Paths) {
        if (Test-Path $path) {
            $browserPath = $path
            $browserName = $browser.Name
            break
        }
    }
    if ($browserPath) { break }
}

if (-not $browserPath) {
    Write-Error "No supported browser found! (Edge, Chrome, or Firefox)"
    exit 1
}

Write-Host "Starting kiosk mode with $browserName..." -ForegroundColor Green
Write-Host "URL: $Url" -ForegroundColor Cyan
Write-Host ""
Write-Host "TO EXIT: Long-press the orange card's info icon for 3 seconds" -ForegroundColor Yellow

$kioskProfile = "$env:TEMP\KioskProfile\$browserName"
Write-Host "Profile: $kioskProfile" -ForegroundColor Gray

if ($browserName -eq "Firefox") {
    # Firefox uses different arguments
    if (-not (Test-Path $kioskProfile)) {
        New-Item -ItemType Directory -Path $kioskProfile -Force | Out-Null
    }
    $arguments = @("-kiosk", $Url, "-profile", $kioskProfile, "-no-remote")
} else {
    # Edge and Chrome use similar Chromium arguments
    $arguments = @(
        "--kiosk",
        $Url,
        "--user-data-dir=$kioskProfile",
        "--disable-pinch",
        "--overscroll-history-navigation=disabled",
        "--noerrdialogs",
        "--disable-infobars",
        "--disable-translate",
        "--no-first-run"
    )
}

Start-Process -FilePath $browserPath -ArgumentList $arguments
