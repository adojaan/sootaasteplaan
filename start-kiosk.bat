@echo off
REM ============================================
REM Soo Taasteplaan - Kiosk Mode Launcher
REM ============================================
REM 
REM Supports: Microsoft Edge, Firefox, Chrome
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

REM Kiosk profile directories
SET "KIOSK_PROFILE=%TEMP%\KioskProfile"

REM Try Edge first (most common on Windows)
SET "BROWSER="
SET "BROWSER_NAME="

FOR %%P IN (
    "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
    "C:\Program Files\Microsoft\Edge\Application\msedge.exe"
    "%LOCALAPPDATA%\Microsoft\Edge\Application\msedge.exe"
) DO (
    IF EXIST %%P (
        SET "BROWSER=%%~P"
        SET "BROWSER_NAME=Edge"
        GOTO :found
    )
)

REM Try Chrome
FOR %%P IN (
    "C:\Program Files\Google\Chrome\Application\chrome.exe"
    "C:\Program Files (x86)\Google\Chrome\Application\chrome.exe"
    "%LOCALAPPDATA%\Google\Chrome\Application\chrome.exe"
) DO (
    IF EXIST %%P (
        SET "BROWSER=%%~P"
        SET "BROWSER_NAME=Chrome"
        GOTO :found
    )
)

REM Try Firefox
FOR %%P IN (
    "C:\Program Files\Mozilla Firefox\firefox.exe"
    "C:\Program Files (x86)\Mozilla Firefox\firefox.exe"
) DO (
    IF EXIST %%P (
        SET "BROWSER=%%~P"
        SET "BROWSER_NAME=Firefox"
        GOTO :found
    )
)

echo No supported browser found! (Edge, Chrome, or Firefox)
pause
exit /b 1

:found
echo Starting kiosk mode with %BROWSER_NAME%...
echo URL: %URL%
echo.
echo To exit: Long-press orange card info icon for 3 seconds

REM Firefox uses different arguments
IF "%BROWSER_NAME%"=="Firefox" (
    REM Create Firefox profile directory if needed
    IF NOT EXIST "%KIOSK_PROFILE%\firefox" mkdir "%KIOSK_PROFILE%\firefox"
    start "" "%BROWSER%" -kiosk "%URL%" -profile "%KIOSK_PROFILE%\firefox" -no-remote
) ELSE (
    REM Edge and Chrome use similar arguments
    start "" "%BROWSER%" --kiosk "%URL%" --user-data-dir="%KIOSK_PROFILE%\%BROWSER_NAME%" --disable-pinch --overscroll-history-navigation=disabled --noerrdialogs --disable-infobars --disable-translate --no-first-run
)
