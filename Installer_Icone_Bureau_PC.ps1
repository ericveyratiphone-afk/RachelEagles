# Script d'installation d'une icône Bureau pour RachelEagles sur PC
$WshShell = New-Object -ComObject WScript.Shell
$DesktopPath = [Environment]::GetFolderPath("Desktop")

# 1. Raccourci principal silencieux et autonome
$Shortcut = $WshShell.CreateShortcut("$DesktopPath\RachelEagles.lnk")
$Shortcut.TargetPath = "$env:SystemRoot\System32\wscript.exe"
$Shortcut.Arguments = "`"D:\AndroidProjects\RachelEagles\RachelEagles.vbs`""
$Shortcut.WorkingDirectory = "D:\AndroidProjects\RachelEagles"
$Shortcut.IconLocation = "D:\AndroidProjects\RachelEagles\RachelEagles.ico,0"
$Shortcut.Description = "RachelEagles - Gestion de Tresorerie (The Fraternal Order of Eagles)"
$Shortcut.Save()

# Nettoyer l'ancien raccourci redondant s'il existe
$oldLnk = "$DesktopPath\Lancer_RachelEagles.lnk"
if (Test-Path $oldLnk) {
    Remove-Item $oldLnk -Force -ErrorAction SilentlyContinue
}

Write-Host "Raccourci 'RachelEagles' installe avec succes sur votre Bureau Windows !" -ForegroundColor Green
