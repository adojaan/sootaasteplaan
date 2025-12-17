# ============================================
# Soo Taasteplaan - Kiosk Mode Launcher (PowerShell)
# ============================================
#
# This script launches Chrome in kiosk mode for the game.
#
# USAGE:
#   .\start-kiosk.ps1                    # Uses default remote URL
#   .\start-kiosk.ps1 -Url "http://localhost:8000"  # Local testing
#   .\start-kiosk.ps1 -Local             # Shortcut for localhost:8000
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

# Find Chrome
$chromePaths = @(
    "C:\Program Files\Google\Chrome\Application\chrome.exe",
    "C:\Program Files (x86)\Google\Chrome\Application\chrome.exe",
    "$env:LOCALAPPDATA\Google\Chrome\Application\chrome.exe"
)

$chromePath = $null
foreach ($path in $chromePaths) {
    if (Test-Path $path) {
        $chromePath = $path
        break
    }
}

if (-not $chromePath) {
    Write-Error "Chrome not found! Please install Google Chrome or update the path in this script."
    exit 1
}

Write-Host "Starting kiosk mode..." -ForegroundColor Green
Write-Host "URL: $Url" -ForegroundColor Cyan
Write-Host ""
Write-Host "TO EXIT: Long-press the orange card's info icon for 3 seconds" -ForegroundColor Yellow

# Chrome kiosk arguments (--kiosk gives true fullscreen without titlebar)
# --user-data-dir creates separate profile so kiosk runs independently of main Chrome
$kioskProfile = "$env:TEMP\ChromeKiosk"

$arguments = @(
    "--kiosk",
    "$Url",
    "--user-data-dir=$kioskProfile",
    "--disable-pinch",
    "--overscroll-history-navigation=disabled",
    "--noerrdialogs",
    "--disable-infobars",
    "--disable-translate",
    "--no-first-run"
)

Write-Host "Profile: $kioskProfile" -ForegroundColor Gray
Start-Process -FilePath $chromePath -ArgumentList $arguments
