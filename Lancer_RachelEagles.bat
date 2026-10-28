@echo off
chcp 65001 >nul
title RachelEagles - Serveur de Gestion de Tresorerie
echo ========================================================
echo   DEMARRAGE DE RACHEL EAGLES SUR http://localhost:8085
echo   The Fraternal Order of Eagles - Trésorerie
echo ========================================================

set "SCRIPT_DIR=%~dp0"
set "SERVER_FILE=%SCRIPT_DIR%server.ps1"

if not exist "%SERVER_FILE%" (
    if exist "D:\AndroidProjects\RachelEagles\server.ps1" (
        set "SERVER_FILE=D:\AndroidProjects\RachelEagles\server.ps1"
        cd /d "D:\AndroidProjects\RachelEagles"
    ) else (
        echo.
        echo [ERREUR] Fichiers non extraits !
        echo Vous avez lance le script directement depuis l'interieur de WinRAR.
        echo.
        echo Solution :
        echo 1. Cliquez sur le bouton "Extraire vers" en haut dans WinRAR.
        echo 2. Ou ouvrez le dossier deja installe : D:\AndroidProjects\RachelEagles
        echo.
        pause
        exit /b
    )
)

powershell -NoProfile -ExecutionPolicy Bypass -File "%SERVER_FILE%"
pause
