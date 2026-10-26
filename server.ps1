param(
    [switch]$NoBrowser
)

$port = 8085
$root = "D:\AndroidProjects\RachelEagles"
$stateFile = Join-Path $root "RachelEagles_sync_data.json"

$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:$port/")
$listener.Prefixes.Add("http://127.0.0.1:$port/")

# Détection de l'IP Wi-Fi / Réseau Local pour le smartphone Android
$lanIp = $null
try {
    $lanIp = (Get-NetIPAddress -AddressFamily IPv4 | Where-Object { 
        $_.InterfaceAlias -notmatch 'Loopback' -and 
        $_.IPAddress -notmatch '^169\.254' -and 
        $_.IPAddress -notmatch '^127\.' 
    } | Select-Object -First 1).IPAddress

    if ($lanIp) {
        $listener.Prefixes.Add("http://${lanIp}:$port/")
    }
} catch {
    Write-Host "Note: Accès IP Wi-Fi direct non privilégié, écoute sur localhost." -ForegroundColor Yellow
}

try {
    $listener.Start()
} catch {
    # Fallback sur localhost uniquement
    $listener = New-Object System.Net.HttpListener
    $listener.Prefixes.Add("http://localhost:$port/")
    $listener.Prefixes.Add("http://127.0.0.1:$port/")
    $listener.Start()
}

Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host "   SERVEUR RACHEL EAGLES ACTIF (PC & SMARTPHONE ANDROID)" -ForegroundColor Green
Write-Host "   The Fraternal Order of Eagles - Sargo Cambodia Eagles" -ForegroundColor White
Write-Host "----------------------------------------------------------" -ForegroundColor DarkCyan
Write-Host "   -> Sur ce PC      : http://localhost:$port/index.html" -ForegroundColor Yellow
if ($lanIp) {
    Write-Host "   -> Sur Smartphone : http://${lanIp}:$port/index.html" -ForegroundColor Yellow
}
Write-Host "   (Tapez cette adresse dans le navigateur de votre tel)" -ForegroundColor Gray
Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host "Appuyez sur CTRL+C pour arrêter le serveur à tout moment." -ForegroundColor Gray
Write-Host ""

# Ouvrir le navigateur PC automatiquement si non désactivé
if (-not $NoBrowser) {
    try {
        Start-Process "http://localhost:$port/index.html"
    } catch {}
}

$mimeTypes = @{
    ".html" = "text/html; charset=utf-8"
    ".js"   = "application/javascript; charset=utf-8"
    ".css"  = "text/css; charset=utf-8"
    ".json" = "application/json; charset=utf-8"
    ".svg"  = "image/svg+xml"
    ".png"  = "image/png"
    ".jpg"  = "image/jpeg"
    ".jpeg" = "image/jpeg"
    ".jfif" = "image/jpeg"
    ".ico"  = "image/x-icon"
}

while ($listener.IsListening) {
    try {
        $context = $listener.GetContext()
        $request = $context.Request
        $response = $context.Response

        # CORS Headers
        $response.AddHeader("Access-Control-Allow-Origin", "*")
        $response.AddHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        $response.AddHeader("Access-Control-Allow-Headers", "Content-Type, Accept")

        if ($request.HttpMethod -eq "OPTIONS") {
            $response.StatusCode = 200
            $response.OutputStream.Close()
            continue
        }

        $localPath = $request.Url.LocalPath.TrimStart('/')

        # API de synchronisation
        if ($localPath -eq "api/state") {
            if ($request.HttpMethod -eq "GET") {
                if (Test-Path $stateFile) {
                    $bytes = [System.IO.File]::ReadAllBytes($stateFile)
                    $response.ContentType = "application/json; charset=utf-8"
                    $response.ContentLength64 = $bytes.Length
                    $response.OutputStream.Write($bytes, 0, $bytes.Length)
                } else {
                    $empty = [System.Text.Encoding]::UTF8.GetBytes('{"transactions":[],"families":[]}')
                    $response.ContentType = "application/json; charset=utf-8"
                    $response.ContentLength64 = $empty.Length
                    $response.OutputStream.Write($empty, 0, $empty.Length)
                }
            } elseif ($request.HttpMethod -eq "POST") {
                $reader = New-Object System.IO.StreamReader($request.InputStream, [System.Text.Encoding]::UTF8)
                $body = $reader.ReadToEnd()
                $reader.Close()
                if (-not [string]::IsNullOrWhiteSpace($body)) {
                    [System.IO.File]::WriteAllText($stateFile, $body, [System.Text.Encoding]::UTF8)
                    Write-Host "[SYNC] Données synchronisées avec succès le $(Get-Date -Format 'HH:mm:ss')" -ForegroundColor Green
                }
                $ok = [System.Text.Encoding]::UTF8.GetBytes('{"status":"ok"}')
                $response.ContentType = "application/json; charset=utf-8"
                $response.ContentLength64 = $ok.Length
                $response.OutputStream.Write($ok, 0, $ok.Length)
            }
            $response.OutputStream.Close()
            continue
        }

        # Service des fichiers statiques
        if ([string]::IsNullOrEmpty($localPath)) { $localPath = "index.html" }
        $filePath = Join-Path $root $localPath

        if (Test-Path $filePath -PathType Leaf) {
            $ext = [System.IO.Path]::GetExtension($filePath).ToLower()
            $contentType = if ($mimeTypes.ContainsKey($ext)) { $mimeTypes[$ext] } else { "application/octet-stream" }
            $response.ContentType = $contentType
            $bytes = [System.IO.File]::ReadAllBytes($filePath)
            $response.ContentLength64 = $bytes.Length
            $response.OutputStream.Write($bytes, 0, $bytes.Length)
        } else {
            $response.StatusCode = 404
        }
        $response.OutputStream.Close()
    } catch {
        # Ignorer les déconnexions client et continuer la boucle d'écoute
        try { if ($response) { $response.OutputStream.Close() } } catch {}
    }
}
