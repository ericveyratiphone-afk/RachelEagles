@echo off
title SCLEG_Treasury V1.0 - Gestion de Tresorerie (PC & Laptop)
echo =========================================================================
echo   DEMARRAGE DE SCLEG_TREASURY V1.0 (PC & LAPTOP) SUR http://localhost:8085
echo   The Fraternal Order of Lady Eagles Group - Tresorerie
echo =========================================================================

if exist "%~dp0server.ps1" (
    cd /d "%~dp0"
    powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0server.ps1"
) else (
    cd /d "D:\AndroidProjects\RachelEagles"
    powershell -NoProfile -ExecutionPolicy Bypass -File "D:\AndroidProjects\RachelEagles\server.ps1"
)
