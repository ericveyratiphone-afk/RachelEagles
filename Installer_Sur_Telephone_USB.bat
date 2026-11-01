@echo off
title Installation de SCLEG Treasury V1.0 sur votre Smartphone / Tablette Android
echo ====================================================================
echo   INSTALLATION DE SCLEG TREASURY V1.0 (SMARTPHONE / TABLETTE ANDROID)
echo   The Fraternal Order of Lady Eagles Group - Sargo Cambodia
echo ====================================================================
echo.
echo 1. Branchez votre telephone ou tablette en USB au PC.
echo 2. Assurez-vous que le "Debogage USB" est active.
echo.

set ADB="C:\Users\ASUS\AppData\Local\Android\Sdk\platform-tools\adb.exe"
if not exist %ADB% set ADB="D:\AndroidProjects\Android_SDK\platform-tools\adb.exe"

%ADB% devices
echo.
echo Installation de SCLEG_Treasury_V1_Mobile_Tablette.apk en cours...
set APK="D:\SCLEG_Treasury_V1_Mobile_Tablette.apk"
if not exist %APK% set APK="%~dp0SCLEG_Treasury_V1_Mobile_Tablette.apk"

%ADB% install -r %APK%
echo.
echo Lancement de l'application sur votre appareil...
%ADB% shell monkey -p com.eagles.racheleagles -c android.intent.category.LAUNCHER 1
echo.
echo Termine ! SCLEG Treasury V1.0 est installee avec succes.
pause
