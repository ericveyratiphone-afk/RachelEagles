param(
    [switch]$NoBrowser,
    [int]$Port = 8085
)

$root = "D:\AndroidProjects\RachelEagles"
$stateFile = Join-Path $root "RachelEagles_sync_data.json"

# Détection de l'adresse IP Wi-Fi / Réseau Local
$lanIp = "127.0.0.1"
try {
    $ips = Get-NetIPAddress -AddressFamily IPv4 -ErrorAction SilentlyContinue | Where-Object { 
        $_.InterfaceAlias -notmatch 'Loopback' -and 
        $_.IPAddress -notmatch '^169\.254' -and 
        $_.IPAddress -notmatch '^127\.' 
    }
    $wifiIp = ($ips | Where-Object { $_.InterfaceAlias -match 'Wi-Fi|Wireless|WLAN' } | Select-Object -First 1).IPAddress
    if ($wifiIp) {
        $lanIp = $wifiIp
    } elseif ($ips) {
        $lanIp = ($ips | Select-Object -First 1).IPAddress
    }
} catch {}

# Verification si le serveur Rachel Eagles est deja actif
$listener = $null
$isAlreadyRunning = $false
try {
    $wcCheck = New-Object System.Net.WebClient
    $resCheck = $wcCheck.DownloadString("http://127.0.0.1:$Port/api/ping")
    if ($resCheck -match "RachelEagles") {
        $isAlreadyRunning = $true
    }
} catch {}

if ($isAlreadyRunning) {
    Write-Host "==========================================================" -ForegroundColor Green
    Write-Host "   LE SERVEUR RACHEL EAGLES EST DEJA ACTIF SUR LE PORT $Port" -ForegroundColor Green
    Write-Host "==========================================================" -ForegroundColor Green
    if (-not $NoBrowser) {
        Write-Host "Ouverture immediate dans votre navigateur..." -ForegroundColor Cyan
        try { Start-Process "http://localhost:$Port/index.html" } catch {}
    }
    Write-Host "Application prete." -ForegroundColor Gray
    Start-Sleep -Seconds 1
    exit 0
}

# Demarrage du serveur TCP HTTP (Accessible depuis PC, Smartphone et Tablette)
try {
    $listener = New-Object System.Net.Sockets.TcpListener([System.Net.IPAddress]::Any, $Port)
    $listener.Start()
} catch {
    # Si le port est occupe par un ancien processus powershell
    try {
        $conn = Get-NetTCPConnection -LocalPort $Port -ErrorAction SilentlyContinue | Select-Object -First 1
        if ($conn -and $conn.OwningProcess -gt 0) {
            $oldProc = Get-Process -Id $conn.OwningProcess -ErrorAction SilentlyContinue
            if ($oldProc -and $oldProc.ProcessName -eq "powershell") {
                Stop-Process -Id $oldProc.Id -Force -ErrorAction SilentlyContinue
                Start-Sleep -Milliseconds 800
                $listener = New-Object System.Net.Sockets.TcpListener([System.Net.IPAddress]::Any, $Port)
                $listener.Start()
            }
        }
    } catch {}

    if (-not $listener) {
        Write-Host "[ERREUR] Port $Port occupe. Ouverture directe du fichier..." -ForegroundColor Yellow
        if (-not $NoBrowser) {
            Start-Process "D:\AndroidProjects\RachelEagles\index.html"
        }
        exit 1
    }
}

Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host "   SERVEUR SYNCHRONISATION RACHEL EAGLES (PC & MOBILE)" -ForegroundColor Green
Write-Host "   The Fraternal Order of Eagles - Sargo Cambodia Eagles" -ForegroundColor White
Write-Host "----------------------------------------------------------" -ForegroundColor DarkCyan
Write-Host "   -> Sur ce PC           : http://localhost:$Port/index.html" -ForegroundColor Yellow
Write-Host "   -> Sur Smartphone/Tab  : http://${lanIp}:$Port/index.html" -ForegroundColor Yellow
Write-Host "   -> Point d'acces Synchro: http://${lanIp}:$Port/api/state" -ForegroundColor Cyan
Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host "Pret pour la synchronisation bidirectionnelle avec le PC." -ForegroundColor Gray
Write-Host "Appuyez sur CTRL+C pour arreter le serveur a tout moment." -ForegroundColor Gray
Write-Host ""

# Ouvrir le navigateur PC automatiquement si non desactive
if (-not $NoBrowser) {
    try {
        Start-Process "http://localhost:$Port/index.html"
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
    ".ico"  = "image/x-icon"
    ".pdf"  = "application/pdf"
}

function Send-HttpResponse {
    param(
        [System.IO.Stream]$Stream,
        [int]$StatusCode = 200,
        [string]$StatusText = "OK",
        [string]$ContentType = "text/plain; charset=utf-8",
        [byte[]]$Body = @()
    )
    $headers = "HTTP/1.1 $StatusCode $StatusText`r`n" +
               "Content-Type: $ContentType`r`n" +
               "Content-Length: $($Body.Length)`r`n" +
               "Access-Control-Allow-Origin: *`r`n" +
               "Access-Control-Allow-Methods: GET, POST, OPTIONS`r`n" +
               "Access-Control-Allow-Headers: *`r`n" +
               "Cache-Control: no-cache, no-store, must-revalidate`r`n" +
               "Connection: close`r`n`r`n"
    $hdrBytes = [System.Text.Encoding]::ASCII.GetBytes($headers)
    $Stream.Write($hdrBytes, 0, $hdrBytes.Length)
    if ($Body.Length -gt 0) {
        $Stream.Write($Body, 0, $Body.Length)
    }
    $Stream.Flush()
}

while ($true) {
    try {
        $client = $listener.AcceptTcpClient()
        $stream = $client.GetStream()
        $stream.ReadTimeout = 5000
        $stream.WriteTimeout = 5000

        $reader = New-Object System.IO.StreamReader($stream, [System.Text.Encoding]::UTF8)
        $reqLine = $reader.ReadLine()

        if ([string]::IsNullOrWhiteSpace($reqLine)) {
            $client.Close()
            continue
        }

        $parts = $reqLine -split ' '
        if ($parts.Length -lt 2) {
            $client.Close()
            continue
        }

        $method = $parts[0].ToUpper()
        $rawUrl = $parts[1]
        $path = $rawUrl.Split('?')[0].TrimStart('/')
        if ([string]::IsNullOrEmpty($path)) { $path = "index.html" }

        # Lecture des en-têtes
        $headers = @{}
        $contentLength = 0
        while (($headerLine = $reader.ReadLine()) -and $headerLine.Length -gt 0) {
            $hParts = $headerLine -split ':', 2
            if ($hParts.Length -eq 2) {
                $hName = $hParts[0].Trim().ToLower()
                $hVal = $hParts[1].Trim()
                $headers[$hName] = $hVal
                if ($hName -eq "content-length") {
                    [int]::TryParse($hVal, [ref]$contentLength) | Out-Null
                }
            }
        }

        # Gérer CORS Preflight
        if ($method -eq "OPTIONS") {
            Send-HttpResponse -Stream $stream -StatusCode 200 -StatusText "OK" -ContentType "text/plain"
            $client.Close()
            continue
        }

        # API: Ping / Info du serveur
        if ($path -eq "api/ping" -or $path -eq "api/info") {
            $info = @{
                status = "ok"
                app = "RachelEagles"
                serverIp = $lanIp
                port = $Port
                hostname = $env:COMPUTERNAME
                timestamp = (Get-Date -Format "o")
                version = "3.0-light"
            } | ConvertTo-Json -Compress
            $bytes = [System.Text.Encoding]::UTF8.GetBytes($info)
            Send-HttpResponse -Stream $stream -ContentType "application/json; charset=utf-8" -Body $bytes
            $client.Close()
            continue
        }

        # API: Synchronisation d'état (GET & POST)
        if ($path -eq "api/state") {
            if ($method -eq "GET") {
                if (Test-Path $stateFile) {
                    $bytes = [System.IO.File]::ReadAllBytes($stateFile)
                    Send-HttpResponse -Stream $stream -ContentType "application/json; charset=utf-8" -Body $bytes
                } else {
                    $empty = [System.Text.Encoding]::UTF8.GetBytes('{"transactions":[],"members":[],"families":[]}')
                    Send-HttpResponse -Stream $stream -ContentType "application/json; charset=utf-8" -Body $empty
                }
            } elseif ($method -eq "POST") {
                $bodyBytes = New-Object byte[] $contentLength
                $totalRead = 0
                while ($totalRead -lt $contentLength) {
                    $read = $stream.Read($bodyBytes, $totalRead, $contentLength - $totalRead)
                    if ($read -le 0) { break }
                    $totalRead += $read
                }
                $bodyText = [System.Text.Encoding]::UTF8.GetString($bodyBytes, 0, $totalRead)
                if (-not [string]::IsNullOrWhiteSpace($bodyText)) {
                    [System.IO.File]::WriteAllText($stateFile, $bodyText, [System.Text.Encoding]::UTF8)
                    Write-Host "[SYNC] Données reçues et sauvegardées ($totalRead octets) le $(Get-Date -Format 'HH:mm:ss')" -ForegroundColor Green
                }
                $ok = [System.Text.Encoding]::UTF8.GetBytes('{"status":"ok","updatedAt":"' + (Get-Date -Format 'o') + '"}')
                Send-HttpResponse -Stream $stream -ContentType "application/json; charset=utf-8" -Body $ok
            }
            $client.Close()
            continue
        }

        # Distribution des fichiers statiques
        $decodedPath = $path
        try {
            $decodedPath = [System.Uri]::UnescapeDataString($path)
        } catch {}
        if (-not $decodedPath) { $decodedPath = $path }
        $filePath = Join-Path $root $decodedPath

        if (Test-Path $filePath -PathType Leaf) {
            $ext = [System.IO.Path]::GetExtension($filePath).ToLower()
            $contentType = if ($mimeTypes.ContainsKey($ext)) { $mimeTypes[$ext] } else { "application/octet-stream" }
            $bytes = [System.IO.File]::ReadAllBytes($filePath)
            Send-HttpResponse -Stream $stream -ContentType $contentType -Body $bytes
        } else {
            $notFound = [System.Text.Encoding]::UTF8.GetBytes("404 Not Found")
            Send-HttpResponse -Stream $stream -StatusCode 404 -StatusText "Not Found" -Body $notFound
        }

        $client.Close()
    } catch {
        try { if ($client) { $client.Close() } } catch {}
    }
}
