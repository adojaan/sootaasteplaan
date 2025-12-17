@echo off
REM ============================================
REM Soo Taasteplaan - Kiosk Mode Launcher
REM ============================================
REM 
REM USAGE:
REM   start-kiosk.bat                    - Uses remote server
REM   start-kiosk.bat http://localhost:8000  - Local testing
REM
REM TO EXIT KIOSK MODE:
REM   Long-press (3 sec) on orange card's info icon
REM   OR Alt+F4 / Ctrl+Alt+Delete
REM
REM ============================================

SETLOCAL EnableDelayedExpansion

SET "URL=%~1"
IF "%URL%"=="" SET "URL=https://dev90.5dvision.ee/~kristjan/sootaasteplaan/"

REM Kiosk profile directory (separate from main Chrome)
SET "KIOSK_PROFILE=%TEMP%\ChromeKiosk"

REM Find Chrome
SET "CHROME="
FOR %%P IN (
    "C:\Program Files\Google\Chrome\Application\chrome.exe"
    "C:\Program Files (x86)\Google\Chrome\Application\chrome.exe"
    "%LOCALAPPDATA%\Google\Chrome\Application\chrome.exe"
) DO (
    IF EXIST %%P SET "CHROME=%%~P"
)

IF "%CHROME%"=="" (
    echo Chrome not found!
    pause
    exit /b 1
)

echo Starting kiosk mode...
echo URL: %URL%
echo Profile: %KIOSK_PROFILE%
echo.
echo To exit: Long-press orange card info icon for 3 seconds

start "" "%CHROME%" --kiosk "%URL%" --user-data-dir="%KIOSK_PROFILE%" --disable-pinch --overscroll-history-navigation=disabled --noerrdialogs --disable-infobars --disable-translate --no-first-run
