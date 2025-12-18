@echo off
REM ============================================
REM Soo Taasteplaan - LOCAL Kiosk Launcher
REM ============================================
REM 
REM Automatically runs index.html from the same folder as this script.
REM Copy this file to the Startup folder: shell:startup
REM Or keep it in the same folder as index.html and run directly.
REM
REM ============================================

REM Get the directory where this script is located (removes trailing backslash)
SET "SCRIPT_DIR=%~dp0"
SET "SCRIPT_DIR=%SCRIPT_DIR:~0,-1%"

REM Convert backslashes to forward slashes for file:// URL
SET "URL_PATH=%SCRIPT_DIR:\=/%"

REM Build the local file URL
SET "LOCAL_URL=file:///%URL_PATH%/index.html"

echo Starting kiosk with local file...
echo Path: %LOCAL_URL%

REM Call the main kiosk script with local path
call "%SCRIPT_DIR%\start-kiosk.bat" "%LOCAL_URL%"
