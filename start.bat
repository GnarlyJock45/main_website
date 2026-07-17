@echo off
REM ===========================================================
REM  Azwa - launches Flask backend + static frontend, opens browser
REM ===========================================================
setlocal
cd /d "%~dp0"

set FRONT_PORT=5555
set BACK_PORT=5000

echo.
echo   Azwa is starting...
echo   Backend  : http://localhost:%BACK_PORT%
echo   Frontend : http://localhost:%FRONT_PORT%
echo.
echo   Two windows will open (one for the backend, one for the frontend).
echo   Close them to stop the app.
echo.

REM Pick a Python command
set PY=
where python >nul 2>&1 && set PY=python
if not defined PY where py >nul 2>&1 && set PY=py -3
if not defined PY (
    echo  ERROR: Python is required. Install from https://www.python.org/downloads/
    pause
    exit /b 1
)

REM Install backend deps on first run (silent if already installed)
%PY% -m pip install --quiet -r backend\requirements.txt

REM Start backend in a new window
start "Azwa - backend"  cmd /k "cd /d %~dp0backend && %PY% app.py"

REM Give backend a couple seconds to bind before browser opens
timeout /t 2 /nobreak >nul

REM Start frontend in a new window (this window)
start "" http://localhost:%FRONT_PORT%/index.html
%PY% -m http.server %FRONT_PORT%
