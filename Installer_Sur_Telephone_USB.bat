@echo off
title Installation de RachelEagles sur votre Telephone Android
echo ====================================================================
echo   INSTALLATION DE RACHEL EAGLES SUR VOTRE TELEPHONE ANDROID (USB)
echo   The Fraternal Order of Eagles - Sargo Cambodia Eagles
echo ====================================================================
echo.
echo Assurez-vous que votre telephone est branche en USB avec le
echo "Debogage USB" active.
echo.

set ADB="D:\AndroidProjects\Android_SDK\platform-tools\adb.exe"
if not exist %ADB% set ADB="C:\Users\ASUS\AppData\Local\Android\Sdk\platform-tools\adb.exe"

%ADB% devices
echo.
echo Installation de RachelEagles.apk en cours...
%ADB% install -r "%~dp0RachelEagles.apk"
echo.
echo Lancement de l'application sur votre telephone...
%ADB% shell monkey -p com.eagles.racheleagles -c android.intent.category.LAUNCHER 1
echo.
echo Termine ! L'application RachelEagles est maintenant installee sur votre telephone.
pause
