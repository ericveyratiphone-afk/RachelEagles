@echo off
title RachelEagles - Serveur de Gestion de Tresorerie
cd /d "%~dp0"
echo ========================================================
echo   DEMARRAGE DE RACHEL EAGLES SUR http://localhost:8085
echo   The Fraternal Order of Eagles - Tresorerie
echo ========================================================

set "SCRIPT_FILE=%~dp0server.ps1"
if not exist "%SCRIPT_FILE%" (
    if exist "D:\AndroidProjects\RachelEagles\server.ps1" (
        set "SCRIPT_FILE=D:\AndroidProjects\RachelEagles\server.ps1"
        cd /d "D:\AndroidProjects\RachelEagles"
    )
)

powershell -NoProfile -ExecutionPolicy Bypass -File "%SCRIPT_FILE%"
