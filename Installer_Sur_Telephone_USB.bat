@echo off
title Installation de RachelEagles V1.0 sur votre Smartphone / Tablette Android
echo ====================================================================
echo   INSTALLATION DE RACHEL EAGLES V1.0 (SMARTPHONE / TABLETTE ANDROID)
echo   The Fraternal Order of Eagles - Sargo Cambodia Eagles
echo ====================================================================
echo.
echo 1. Branchez votre telephone ou tablette en USB au PC.
echo 2. Assurez-vous que le "Debogage USB" est active.
echo.

set ADB="C:\Users\ASUS\AppData\Local\Android\Sdk\platform-tools\adb.exe"
if not exist %ADB% set ADB="D:\AndroidProjects\Android_SDK\platform-tools\adb.exe"

%ADB% devices
echo.
echo Installation de RachelEagles_V1_Mobile_Tablette.apk en cours...
set APK="D:\RachelEagles_V1_Mobile_Tablette.apk"
if not exist %APK% set APK="%~dp0RachelEagles_V1_Mobile_Tablette.apk"

%ADB% install -r %APK%
echo.
echo Lancement de l'application sur votre appareil...
%ADB% shell monkey -p com.eagles.racheleagles -c android.intent.category.LAUNCHER 1
echo.
echo Termine ! Rachel Eagles V1.0 est installee avec succes.
pause