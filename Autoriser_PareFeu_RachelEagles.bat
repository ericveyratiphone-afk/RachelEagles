@echo off
title Autoriser le Pare-feu Windows pour RachelEagles (Port 8085)
echo =========================================================================
echo   AUTORISATION DU PARE-FEU WINDOWS POUR LA SYNCHRONISATION WI-FI
echo   The Fraternal Order of Eagles - RachelEagles V1.0
echo =========================================================================
echo.
echo Demande d'autorisation administrateur pour ouvrir le port 8085...
powershell -NoProfile -ExecutionPolicy Bypass -Command "Start-Process netsh -ArgumentList 'advfirewall firewall add rule name=\"RachelEagles_Server_8085\" dir=in action=allow protocol=TCP localport=8085' -Verb RunAs"
echo.
echo Termine ! Le pare-feu autorise desormais la tablette et le telephone.
echo.
pause
