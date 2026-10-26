@echo off
title RachelEagles - Serveur de Gestion de Tresorerie
echo ========================================================
echo   DEMARRAGE DE RACHEL EAGLES SUR http://localhost:8085
echo   The Fraternal Order of Eagles - Trésorerie
echo ========================================================
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0server.ps1"
pause
