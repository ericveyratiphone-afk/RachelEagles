@echo off
title RachelEagles V1.0 - Gestion de Tresorerie (PC & Laptop)
cd /d "D:\AndroidProjects\RachelEagles"
echo =========================================================================
echo   DEMARRAGE DE RACHEL EAGLES V1.0 (PC & LAPTOP) SUR http://localhost:8085
echo   The Fraternal Order of Eagles - Tresorerie
echo =========================================================================

powershell -NoProfile -ExecutionPolicy Bypass -File "D:\AndroidProjects\RachelEagles\server.ps1"