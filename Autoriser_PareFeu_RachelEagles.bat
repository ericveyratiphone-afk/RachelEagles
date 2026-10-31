@echo off
title Autoriser le Pare-feu Windows pour RachelEagles (Port 8085)
echo =========================================================================
echo   AUTORISATION DU PARE-FEU WINDOWS POUR LA SYNCHRONISATION WI-FI
echo   The Fraternal Order of Eagles - RachelEagles V1.0
echo =========================================================================
echo.

:: Verifier si la session est deja en Administrateur
net session >nul 2>&1
if %errorlevel% == 0 (
    echo [OK] Execution avec droits Administrateur.
    echo Configuration de la regle de pare-feu pour le port 8085...
    netsh advfirewall firewall add rule name="RachelEagles_Server_8085" dir=in action=allow protocol=TCP localport=8085
    echo.
    echo =========================================================================
    echo   SUCCES : Le pare-feu Windows autorise desormais la tablette et le mobile !
    echo =========================================================================
    echo.
    pause
    exit /b 0
)

:: Sinon, demander l'elevation UAC (Fenetre Windows Oui / Non)
echo Demande d'autorisation administrateur...
echo (Cliquez sur "OUI" sur la fenetre de confirmation Windows)
echo.
powershell -NoProfile -ExecutionPolicy Bypass -Command "Start-Process cmd.exe -ArgumentList '/c netsh advfirewall firewall add rule name=\"RachelEagles_Server_8085\" dir=in action=allow protocol=TCP localport=8085 & echo. & echo ========================================================================= & echo   SUCCES : Le pare-feu autorise desormais la synchronisation Wi-Fi ! & echo ========================================================================= & echo. & pause' -Verb RunAs"
