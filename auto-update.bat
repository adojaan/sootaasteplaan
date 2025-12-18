@echo off
REM ============================================
REM Soo Taasteplaan - Auto Update Script
REM ============================================
REM 
REM Checks for updates from GitHub and restarts kiosk if changes found.
REM Run this via Task Scheduler (e.g., every hour or at startup).
REM
REM ============================================

SETLOCAL EnableDelayedExpansion

REM Get the directory where this script is located
SET "SCRIPT_DIR=%~dp0"
SET "SCRIPT_DIR=%SCRIPT_DIR:~0,-1%"

cd /d "%SCRIPT_DIR%"

REM Store current HEAD before pull
FOR /F "tokens=*" %%G IN ('git rev-parse HEAD 2^>nul') DO SET "OLD_HEAD=%%G"

REM Pull latest changes
echo [%date% %time%] Checking for updates...
git pull origin main 2>&1

REM Get new HEAD after pull
FOR /F "tokens=*" %%G IN ('git rev-parse HEAD 2^>nul') DO SET "NEW_HEAD=%%G"

REM Compare
IF "%OLD_HEAD%"=="%NEW_HEAD%" (
    echo [%date% %time%] No changes detected.
    exit /b 0
)

echo [%date% %time%] Updates found! Restarting kiosk...

REM Kill browser processes (Edge, Chrome, Firefox)
taskkill /F /IM msedge.exe 2>nul
taskkill /F /IM chrome.exe 2>nul
taskkill /F /IM firefox.exe 2>nul

REM Wait a moment for processes to fully terminate
timeout /t 2 /nobreak >nul

REM Restart kiosk
call "%SCRIPT_DIR%\start-kiosk-local.bat"

echo [%date% %time%] Kiosk restarted with updates.
