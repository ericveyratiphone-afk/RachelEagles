$port = 8085
$url = "http://localhost:$port/index.html"
$root = "D:\AndroidProjects\RachelEagles"

# 1. Tester si le serveur repond deja
$isRunning = $false
try {
    $req = [System.Net.WebRequest]::Create("http://127.0.0.1:$port/index.html")
    $req.Timeout = 400
    $resp = $req.GetResponse()
    if ($resp.StatusCode -eq 200) {
        $isRunning = $true
    }
    $resp.Close()
} catch {
    $isRunning = $false
}

# 2. Si non demarre, lancer server.ps1 en tache de fond invisible
if (-not $isRunning) {
    Start-Process -FilePath "powershell.exe" `
        -ArgumentList "-NoProfile -ExecutionPolicy Bypass -WindowStyle Hidden -File `"$root\server.ps1`" -NoBrowser" `
        -WorkingDirectory $root `
        -WindowStyle Hidden

    for ($i = 0; $i -lt 15; $i++) {
        Start-Sleep -Milliseconds 200
        try {
            $req = [System.Net.WebRequest]::Create("http://127.0.0.1:$port/index.html")
            $req.Timeout = 300
            $resp = $req.GetResponse()
            $code = $resp.StatusCode
            $resp.Close()
            if ($code -eq 200) { break }
        } catch {}
    }
}

# 3. Ouvrir l'application en mode fenetre autonome (Edge ou Chrome en mode App)
$edgePaths = @(
    "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe",
    "C:\Program Files\Microsoft\Edge\Application\msedge.exe"
)
$chromePaths = @(
    "C:\Program Files\Google\Chrome\Application\chrome.exe",
    "C:\Program Files (x86)\Google\Chrome\Application\chrome.exe"
)

$browser = $null
foreach ($p in $edgePaths) {
    if (Test-Path $p) { $browser = $p; break }
}
if (-not $browser) {
    foreach ($p in $chromePaths) {
        if (Test-Path $p) { $browser = $p; break }
    }
}

if ($browser) {
    Start-Process -FilePath $browser -ArgumentList "--app=$url"
} else {
    Start-Process $url
}
