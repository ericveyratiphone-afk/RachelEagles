@echo off
title RachelEagles V1.0 - Gestion de Tresorerie (PC & Laptop)
echo =========================================================================
echo   DEMARRAGE DE RACHEL EAGLES V1.0 (PC & LAPTOP) SUR http://localhost:8085
echo   The Fraternal Order of Eagles - Tresorerie
echo =========================================================================

if exist "%~dp0server.ps1" (
    cd /d "%~dp0"
    powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0server.ps1"
) else (
    cd /d "D:\AndroidProjects\RachelEagles"
    powershell -NoProfile -ExecutionPolicy Bypass -File "D:\AndroidProjects\RachelEagles\server.ps1"
)
