$apkSource = "D:\AndroidProjects\RachelEagles\app\build\outputs\apk\debug\app-debug.apk"
$targetProjectApk = "D:\AndroidProjects\RachelEagles\RachelEagles_V1_Mobile_Tablette.apk"
$targetRootApk = "D:\RachelEagles_V1_Mobile_Tablette.apk"
$zipPath = "D:\RachelEagles_V1_OFFICIEL.zip"

Write-Host "Copying APK to project and D:\ root..."
Copy-Item $apkSource $targetProjectApk -Force
Copy-Item $apkSource $targetRootApk -Force

# Create staging directory for official zip
$staging = [System.IO.Path]::Combine($env:TEMP, "RachelEagles_ZipStaging_" + [System.Guid]::NewGuid().ToString())
New-Item -ItemType Directory -Path $staging -Force | Out-Null

Write-Host "Extracting existing zip to update..."
Add-Type -AssemblyName System.IO.Compression.FileSystem
[System.IO.Compression.ZipFile]::ExtractToDirectory($zipPath, $staging)

# Replace APKs in staging
Copy-Item $apkSource (Join-Path $staging "RachelEagles_V1_Mobile_Tablette.apk") -Force
Copy-Item $apkSource (Join-Path $staging "RachelEagles_V1_Light.apk") -Force

# Replace Guide FR if updated
if (Test-Path "D:\AndroidProjects\RachelEagles\GUIDE_SYNCHRONISATION_ET_UTILISATION_FR.pdf") {
    Copy-Item "D:\AndroidProjects\RachelEagles\GUIDE_SYNCHRONISATION_ET_UTILISATION_FR.pdf" (Join-Path $staging "GUIDE_SYNCHRONISATION_ET_UTILISATION_FR.pdf") -Force
}

# Re-create zip
Remove-Item $zipPath -Force
[System.IO.Compression.ZipFile]::CreateFromDirectory($staging, $zipPath)
Remove-Item $staging -Recurse -Force -ErrorAction SilentlyContinue

Write-Host "Official package D:\RachelEagles_V1_OFFICIEL.zip updated successfully!"
Write-Host "Root APK size: $((Get-Item $targetRootApk).Length) bytes"
Write-Host "ZIP size: $((Get-Item $zipPath).Length) bytes"
