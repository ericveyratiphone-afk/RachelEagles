$edgePath = "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
if (-not (Test-Path $edgePath)) {
    $edgePath = "C:\Program Files\Microsoft\Edge\Application\msedge.exe"
}

$port = 9222
$userDataDir = [System.IO.Path]::Combine($env:TEMP, "edge_test_pdf_flow_" + [System.Guid]::NewGuid().ToString())

Write-Host "Launching Edge headless with CDP on port $port..."
$process = Start-Process -FilePath $edgePath -ArgumentList @(
    "--headless=new",
    "--remote-debugging-port=$port",
    "--user-data-dir=$userDataDir",
    "--no-first-run",
    "--no-default-browser-check",
    "--disable-gpu",
    "http://localhost:8085/"
) -PassThru

Start-Sleep -Seconds 2

try {
    $endpoints = Invoke-RestMethod -Uri "http://localhost:$port/json"
    $page = $endpoints | Where-Object { $_.url -like "*8085*" } | Select-Object -First 1
    if (-not $page) { $page = $endpoints[0] }
    Write-Host "Connected to page: $($page.title)"
    $wsUrl = $page.webSocketDebuggerUrl

    $null = [System.Reflection.Assembly]::Load("System, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089")
    $ws = New-Object System.Net.WebSockets.ClientWebSocket
    $cts = New-Object System.Threading.CancellationTokenSource
    $task = $ws.ConnectAsync([System.Uri]$wsUrl, $cts.Token)
    $task.Wait(5000)

    function Receive-NextMessage() {
        $buf = [byte[]]::new(65536)
        $mem = New-Object System.IO.MemoryStream
        do {
            $seg = [System.ArraySegment[byte]]::new($buf)
            $res = $ws.ReceiveAsync($seg, $cts.Token).Result
            $mem.Write($buf, 0, $res.Count)
        } while (-not $res.EndOfMessage)
        $text = [System.Text.Encoding]::UTF8.GetString($mem.ToArray())
        return ($text | ConvertFrom-Json)
    }

    function Send-Cdp($method, $params = @{}) {
        $id = [System.Threading.Interlocked]::Increment([ref]$global:cdpId)
        $payload = @{ id = $id; method = $method; params = $params } | ConvertTo-Json -Compress -Depth 10
        $bytes = [System.Text.Encoding]::UTF8.GetBytes($payload)
        $segment = [System.ArraySegment[byte]]::new($bytes)
        $ws.SendAsync($segment, [System.Net.WebSockets.WebSocketMessageType]::Text, $true, $cts.Token).Wait()
        
        while ($true) {
            $msg = Receive-NextMessage
            if ($msg.id -eq $id) {
                return $msg
            } else {
                if ($msg.method -eq "Runtime.consoleAPICalled") {
                    $argsStr = ($msg.params.args | ForEach-Object { $_.value }) -join " "
                    Write-Host "[Console $($msg.params.type)]: $argsStr"
                }
                elseif ($msg.method -eq "Runtime.exceptionThrown") {
                    Write-Host "[Exception]: $($msg.params.exceptionDetails.text) $($msg.params.exceptionDetails.exception.description)"
                }
            }
        }
    }

    $global:cdpId = 0
    $null = Send-Cdp "Runtime.enable"
    $null = Send-Cdp "Console.enable"

    Write-Host "Waiting 8 seconds for React..."
    Start-Sleep -Seconds 8

    # Login
    $loginCode = @"
(function() {
    const userInp = document.querySelector('input[type="text"]');
    const passInp = document.querySelector('input[type="password"]');
    const setVal = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
    setVal.call(userInp, 'tresorier');
    userInp.dispatchEvent(new Event('input', { bubbles: true }));
    setVal.call(passInp, 'eagles2026');
    passInp.dispatchEvent(new Event('input', { bubbles: true }));
    const btn = document.querySelector('form button[type="submit"]') || document.querySelector('form button');
    if (btn) btn.click();
    return 'LOGIN_OK';
})()
"@
    $loginRes = Send-Cdp "Runtime.evaluate" @{ expression = $loginCode; returnByValue = $true }
    Write-Host "Login: $($loginRes.result.value)"

    Start-Sleep -Seconds 3

    # Navigate to Members tab
    $navMembersCode = @"
(function() {
    const navItems = Array.from(document.querySelectorAll('nav button, button'));
    const membersNav = navItems.find(b => b.innerText && b.innerText.includes('Members'));
    if (membersNav) {
        membersNav.click();
        return 'MEMBERS_TAB_CLICKED';
    }
    return 'MEMBERS_NAV_NOT_FOUND';
})()
"@
    $navRes = Send-Cdp "Runtime.evaluate" @{ expression = $navMembersCode; returnByValue = $true }
    Write-Host "Nav Members: $($navRes.result.value)"

    Start-Sleep -Seconds 2

    # Click PDF Export in Members
    $exportPdfCode = @"
(function() {
    const btns = Array.from(document.querySelectorAll('button'));
    const pdfBtn = btns.find(b => (b.innerText && b.innerText.includes('PDF')) || (b.title && b.title.includes('PDF')));
    if (pdfBtn) {
        pdfBtn.click();
        return 'EXPORT_PDF_CLICKED: ' + (pdfBtn.innerText.trim() || pdfBtn.title);
    }
    return 'EXPORT_PDF_NOT_FOUND';
})()
"@
    $expRes = Send-Cdp "Runtime.evaluate" @{ expression = $exportPdfCode; returnByValue = $true }
    Write-Host "Export PDF click: $($expRes.result.value)"

    Start-Sleep -Seconds 2

    # Check modal state and document content
    $checkModalCode = @"
(function() {
    const backdrop = document.querySelector('.pdf-preview-backdrop');
    const toolbar = document.querySelector('.pdf-preview-toolbar');
    const printSection = document.getElementById('print-section');
    const toolbarBtns = toolbar ? Array.from(toolbar.querySelectorAll('button')).map(b => b.innerText.trim() || b.title) : [];
    return JSON.stringify({
        hasBackdrop: !!backdrop,
        hasToolbar: !!toolbar,
        toolbarButtons: toolbarBtns,
        hasPrintSection: !!printSection,
        sectionHtmlLength: printSection ? printSection.innerHTML.length : 0,
        sectionSnippet: printSection ? printSection.innerText.slice(0, 150) : null
    });
})()
"@
    $modalRes = Send-Cdp "Runtime.evaluate" @{ expression = $checkModalCode; returnByValue = $true }
    Write-Host "Modal State: $($modalRes.result.value)"

    # Take screenshot of the PDF preview modal
    $shot = Send-Cdp "Page.captureScreenshot" @{ format = "png" }
    if ($shot.result.data) {
        $bytes = [System.Convert]::FromBase64String($shot.result.data)
        $outPath = "C:\Users\ASUS\.gemini\antigravity\brain\65d8678a-bb47-4f6a-aa27-4b33d0130121\pdf_preview_modal.png"
        [System.IO.File]::WriteAllBytes($outPath, $bytes)
        Write-Host "Wrote preview screenshot to $outPath ($($bytes.Length) bytes)"
    }
}
finally {
    if ($process -and -not $process.HasExited) { $process.Kill() }
    if (Test-Path $userDataDir) { Remove-Item -Path $userDataDir -Recurse -Force -ErrorAction SilentlyContinue }
}
