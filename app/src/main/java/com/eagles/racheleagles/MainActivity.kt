package com.eagles.racheleagles

import android.annotation.SuppressLint
import android.app.AlertDialog
import android.content.Context
import android.content.Intent
import android.net.Uri
import android.os.Bundle
import android.os.CancellationSignal
import android.os.ParcelFileDescriptor
import android.print.PageRange
import android.print.PrintAttributes
import android.print.PrintDocumentAdapter
import android.print.PrintDocumentInfo
import android.print.PrintManager
import android.util.Base64
import android.webkit.DownloadListener
import android.webkit.JavascriptInterface
import android.webkit.JsPromptResult
import android.webkit.JsResult
import android.webkit.ValueCallback
import android.webkit.WebChromeClient
import android.webkit.WebResourceRequest
import android.webkit.WebSettings
import android.webkit.WebView
import android.webkit.WebViewClient
import android.widget.EditText
import android.widget.Toast
import androidx.activity.ComponentActivity
import androidx.activity.OnBackPressedCallback
import androidx.activity.result.contract.ActivityResultContracts
import androidx.core.content.FileProvider
import java.io.File
import java.io.FileOutputStream
import java.io.InputStream

class MainActivity : ComponentActivity() {

    private lateinit var webView: WebView
    var baseActivityContext: Context? = null
        private set

    private var fileUploadCallback: ValueCallback<Array<Uri>>? = null
    private val filePickerLauncher = registerForActivityResult(
        ActivityResultContracts.StartActivityForResult()
    ) { result ->
        if (result.resultCode == RESULT_OK) {
            val intent = result.data
            val dataUris: Array<Uri>? = when {
                intent?.data != null -> arrayOf(intent.data!!)
                intent?.clipData != null -> {
                    val clip = intent.clipData!!
                    Array(clip.itemCount) { idx -> clip.getItemAt(idx).uri }
                }
                else -> null
            }
            fileUploadCallback?.onReceiveValue(dataUris)
        } else {
            fileUploadCallback?.onReceiveValue(null)
        }
        fileUploadCallback = null
    }

    override fun attachBaseContext(newBase: Context) {
        val prefs = newBase.getSharedPreferences("RachelEaglesPrefs", Context.MODE_PRIVATE)
        val lang = prefs.getString("APP_LANG", "en") ?: "en"
        val locale = java.util.Locale(lang)
        java.util.Locale.setDefault(locale)
        val config = android.content.res.Configuration(newBase.resources.configuration)
        config.setLocale(locale)
        val localizedContext = newBase.createConfigurationContext(config)
        baseActivityContext = localizedContext
        super.attachBaseContext(localizedContext)
    }

    fun applyAppLocale(languageCode: String) {
        try {
            val locale = java.util.Locale(languageCode)
            java.util.Locale.setDefault(locale)
            val res = resources
            val config = res.configuration
            config.setLocale(locale)
            config.setLayoutDirection(locale)
            @Suppress("DEPRECATION")
            res.updateConfiguration(config, res.displayMetrics)
            try {
                @Suppress("DEPRECATION")
                applicationContext.resources.updateConfiguration(config, applicationContext.resources.displayMetrics)
            } catch (_: Exception) {}
        } catch (e: Exception) {
            e.printStackTrace()
        }
    }

    @SuppressLint("SetJavaScriptEnabled")
    override fun onCreate(savedInstanceState: Bundle?) {
        val prefs = getSharedPreferences("RachelEaglesPrefs", Context.MODE_PRIVATE)
        val initialLang = prefs.getString("APP_LANG", "en") ?: "en"
        applyAppLocale(initialLang)

        super.onCreate(savedInstanceState)
        WebView.setWebContentsDebuggingEnabled(true)

        webView = WebView(this)
        setContentView(webView)

        val settings: WebSettings = webView.settings
        settings.javaScriptEnabled = true
        settings.domStorageEnabled = true
        settings.cacheMode = WebSettings.LOAD_NO_CACHE
        settings.databaseEnabled = true
        settings.allowFileAccess = true
        settings.allowContentAccess = true
        settings.allowFileAccessFromFileURLs = true
        settings.allowUniversalAccessFromFileURLs = true
        settings.mixedContentMode = WebSettings.MIXED_CONTENT_ALWAYS_ALLOW
        settings.useWideViewPort = true
        settings.loadWithOverviewMode = true

        // Interface native pour l'impression PDF, partage et intégration apps
        webView.addJavascriptInterface(AndroidBridge(this, webView), "AndroidNative")

        webView.setDownloadListener { url, _, _, mimetype, _ ->
            if (url.startsWith("data:application/pdf") || url.endsWith(".pdf", ignoreCase = true) || mimetype == "application/pdf") {
                if (url.startsWith("data:")) {
                    val base64 = url.substringAfter("base64,")
                    AndroidBridge(this, webView).savePdfAndShare(base64, "Document_SCLEG_Treasury.pdf")
                } else {
                    openPdfUri(url)
                }
            }
        }

        webView.webViewClient = object : WebViewClient() {
            override fun shouldOverrideUrlLoading(view: WebView?, request: WebResourceRequest?): Boolean {
                val url = request?.url?.toString() ?: return false
                return handleExternalUrl(url)
            }

            @Deprecated("Deprecated in Java")
            override fun shouldOverrideUrlLoading(view: WebView?, url: String?): Boolean {
                if (url == null) return false
                return handleExternalUrl(url)
            }

            private fun handleExternalUrl(url: String): Boolean {
                if (url.startsWith("mailto:")) {
                    openEmailUri(url)
                    return true
                } else if (url.startsWith("whatsapp://") || url.startsWith("https://wa.me/") || url.startsWith("https://api.whatsapp.com/")) {
                    openWhatsAppUri(url)
                    return true
                } else if (url.startsWith("tg://") || url.startsWith("https://t.me/")) {
                    openTelegramUri(url)
                    return true
                } else if (url.endsWith(".pdf", ignoreCase = true) || url.contains(".pdf?")) {
                    openPdfUri(url)
                    return true
                } else if (!url.startsWith("file://") && !url.startsWith("http://localhost") && !url.startsWith("http://127.0.0.1") && !url.startsWith("http://192.168.")) {
                    try {
                        val intent = Intent(Intent.ACTION_VIEW, Uri.parse(url)).apply {
                            addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
                        }
                        startActivity(intent)
                        return true
                    } catch (e: Exception) {
                        return false
                    }
                }
                return false
            }
        }

        // WebChromeClient avec support natif complet de prompt(), alert() et confirm()
        webView.webChromeClient = object : WebChromeClient() {
            override fun onJsPrompt(view: WebView?, url: String?, message: String?, defaultValue: String?, result: JsPromptResult?): Boolean {
                val input = EditText(this@MainActivity).apply {
                    setText(defaultValue ?: "")
                    setPadding(40, 25, 40, 25)
                    selectAll()
                }
                AlertDialog.Builder(this@MainActivity)
                    .setTitle("TREASURER'S REPORT")
                    .setMessage(message ?: "")
                    .setView(input)
                    .setPositiveButton("OK") { _, _ -> result?.confirm(input.text.toString()) }
                    .setNegativeButton("Cancel") { _, _ -> result?.cancel() }
                    .setOnCancelListener { result?.cancel() }
                    .show()
                return true
            }

            override fun onJsAlert(view: WebView?, url: String?, message: String?, result: JsResult?): Boolean {
                AlertDialog.Builder(this@MainActivity)
                    .setTitle("TREASURER'S REPORT")
                    .setMessage(message ?: "")
                    .setPositiveButton("OK") { _, _ -> result?.confirm() }
                    .setOnCancelListener { result?.cancel() }
                    .show()
                return true
            }

            override fun onJsConfirm(view: WebView?, url: String?, message: String?, result: JsResult?): Boolean {
                AlertDialog.Builder(this@MainActivity)
                    .setTitle("TREASURER'S REPORT")
                    .setMessage(message ?: "")
                    .setPositiveButton("OK") { _, _ -> result?.confirm() }
                    .setNegativeButton("Cancel") { _, _ -> result?.cancel() }
                    .setOnCancelListener { result?.cancel() }
                    .show()
                return true
            }

            override fun onShowFileChooser(
                view: WebView?,
                filePathCallback: ValueCallback<Array<Uri>>?,
                fileChooserParams: FileChooserParams?
            ): Boolean {
                fileUploadCallback?.onReceiveValue(null)
                fileUploadCallback = filePathCallback
                try {
                    val intent = fileChooserParams?.createIntent() ?: Intent(Intent.ACTION_GET_CONTENT).apply {
                        type = "image/*"
                        addCategory(Intent.CATEGORY_OPENABLE)
                    }
                    filePickerLauncher.launch(intent)
                    return true
                } catch (e: Exception) {
                    fileUploadCallback = null
                    return false
                }
            }
        }

        // Charge l'application embarquée dans les assets locaux (fonctionne 100% hors-ligne)
        webView.loadUrl("file:///android_asset/index.html")

        onBackPressedDispatcher.addCallback(this, object : OnBackPressedCallback(true) {
            override fun handleOnBackPressed() {
                if (webView.canGoBack()) {
                    webView.goBack()
                } else {
                    finish()
                }
            }
        })
    }

    private fun openEmailUri(mailtoUrl: String) {
        try {
            val intent = Intent(Intent.ACTION_SENDTO, Uri.parse(mailtoUrl)).apply {
                `package` = "com.google.android.gm"
                addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
            }
            startActivity(intent)
        } catch (e: Exception) {
            try {
                val intent = Intent(Intent.ACTION_SENDTO, Uri.parse(mailtoUrl)).apply {
                    addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
                }
                startActivity(intent)
            } catch (ex: Exception) {
                Toast.makeText(this, "Application Gmail ou e-mail non disponible", Toast.LENGTH_SHORT).show()
            }
        }
    }

    private fun openWhatsAppUri(url: String) {
        try {
            val uri = Uri.parse(url)
            val intent = Intent(Intent.ACTION_VIEW, uri).apply {
                `package` = "com.whatsapp"
                addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
            }
            startActivity(intent)
        } catch (e: Exception) {
            try {
                val intent = Intent(Intent.ACTION_VIEW, Uri.parse(url)).apply {
                    addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
                }
                startActivity(intent)
            } catch (ex: Exception) {
                Toast.makeText(this, "Application WhatsApp non installée", Toast.LENGTH_SHORT).show()
            }
        }
    }

    private fun openTelegramUri(url: String) {
        try {
            val uri = Uri.parse(url)
            val intent = Intent(Intent.ACTION_VIEW, uri).apply {
                `package` = "org.telegram.messenger"
                addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
            }
            startActivity(intent)
        } catch (e: Exception) {
            try {
                val intent = Intent(Intent.ACTION_VIEW, Uri.parse(url)).apply {
                    addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
                }
                startActivity(intent)
            } catch (ex: Exception) {
                Toast.makeText(this, "Application Telegram non installée", Toast.LENGTH_SHORT).show()
            }
        }
    }

    fun openPdfUri(url: String) {
        try {
            if (url.startsWith("file:///android_asset/")) {
                val assetPath = url.substring("file:///android_asset/".length)
                openAssetPdf(assetPath)
                return
            }
            val intent = Intent(Intent.ACTION_VIEW).apply {
                setDataAndType(Uri.parse(url), "application/pdf")
                addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
            }
            startActivity(intent)
        } catch (e: Exception) {
            try {
                val browserIntent = Intent(Intent.ACTION_VIEW, Uri.parse(url)).apply {
                    addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
                }
                startActivity(browserIntent)
            } catch (ex: Exception) {
                Toast.makeText(this, "Impossible d'ouvrir le PDF: ${ex.message}", Toast.LENGTH_SHORT).show()
            }
        }
    }

    fun openAssetPdf(assetPath: String) {
        try {
            val fileName = assetPath.substringAfterLast("/")
            val outFile = File(cacheDir, fileName)
            assets.open(assetPath).use { input ->
                FileOutputStream(outFile).use { output ->
                    input.copyTo(output)
                }
            }
            openOrSharePdfFile(outFile, fileName.replace(".pdf", ""))
        } catch (e: Exception) {
            e.printStackTrace()
            Toast.makeText(this, "Erreur lecture PDF: ${e.message}", Toast.LENGTH_SHORT).show()
        }
    }

    fun openOrSharePdfFile(file: File, title: String) {
        try {
            val uri: Uri = FileProvider.getUriForFile(
                this,
                "${packageName}.provider",
                file
            )
            val viewIntent = Intent(Intent.ACTION_VIEW).apply {
                setDataAndType(uri, "application/pdf")
                addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION)
                addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
            }
            val shareIntent = Intent(Intent.ACTION_SEND).apply {
                type = "application/pdf"
                putExtra(Intent.EXTRA_STREAM, uri)
                putExtra(Intent.EXTRA_SUBJECT, title)
                addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION)
                addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
            }
            val chooser = Intent.createChooser(viewIntent, title).apply {
                putExtra(Intent.EXTRA_INITIAL_INTENTS, arrayOf(shareIntent))
                addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION)
                addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
            }
            startActivity(chooser)
        } catch (e: Exception) {
            e.printStackTrace()
            Toast.makeText(this, "Erreur ouverture PDF: ${e.message}", Toast.LENGTH_LONG).show()
        }
    }

    class AndroidBridge(private val activity: MainActivity, private val webView: WebView) {

        @JavascriptInterface
        fun printPdf(jobTitle: String?) {
            activity.runOnUiThread {
                try {
                    val rawName = jobTitle ?: "Treasurers_Report_Financial_Record"
                    val safeName = rawName.replace(Regex("[^a-zA-Z0-9_ -]"), "_").trim().ifBlank { "Treasurers_Report_Document" }
                    val printManager = (activity.getSystemService(Context.PRINT_SERVICE) as? PrintManager)
                        ?: (activity.baseActivityContext?.getSystemService(Context.PRINT_SERVICE) as? PrintManager)

                    if (printManager != null) {
                        val printAdapter = webView.createPrintDocumentAdapter(safeName)
                        val printAttributes = PrintAttributes.Builder()
                            .setColorMode(PrintAttributes.COLOR_MODE_COLOR)
                            .setMediaSize(PrintAttributes.MediaSize.ISO_A4)
                            .setMinMargins(PrintAttributes.Margins.NO_MARGINS)
                            .build()
                        printManager.print(safeName, printAdapter, printAttributes)
                    } else {
                        Toast.makeText(activity, "Service d'impression système non disponible sur cet appareil", Toast.LENGTH_SHORT).show()
                    }
                } catch (e: Exception) {
                    e.printStackTrace()
                    Toast.makeText(activity, "Impression: ${e.message}", Toast.LENGTH_SHORT).show()
                }
            }
        }

        @JavascriptInterface
        fun savePdfAndShare(base64Data: String?, fileName: String?) {
            activity.runOnUiThread {
                try {
                    if (base64Data.isNullOrBlank()) {
                        Toast.makeText(activity, "Données PDF invalides", Toast.LENGTH_SHORT).show()
                        return@runOnUiThread
                    }
                    val cleanBase64 = if (base64Data.contains(",")) base64Data.substringAfter(",") else base64Data
                    val pdfBytes = Base64.decode(cleanBase64, Base64.DEFAULT)
                    val name = (fileName ?: "SCLEG_Treasury_Document.pdf").trim()
                    val safeName = if (name.endsWith(".pdf", ignoreCase = true)) name else "$name.pdf"

                    val pdfDir = File(activity.cacheDir, "pdf_exports")
                    if (!pdfDir.exists()) pdfDir.mkdirs()
                    val pdfFile = File(pdfDir, safeName)
                    FileOutputStream(pdfFile).use { it.write(pdfBytes) }

                    activity.openOrSharePdfFile(pdfFile, safeName.replace(".pdf", ""))
                } catch (e: Exception) {
                    e.printStackTrace()
                    Toast.makeText(activity, "Erreur génération PDF: ${e.message}", Toast.LENGTH_LONG).show()
                }
            }
        }

        @JavascriptInterface
        fun openPdfFile(fileName: String?) {
            activity.runOnUiThread {
                val clean = (fileName ?: "").trim()
                if (clean.isBlank()) return@runOnUiThread
                activity.openAssetPdf(clean)
            }
        }

        @JavascriptInterface
        fun openWhatsApp(message: String?, phone: String?) {
            activity.runOnUiThread {
                val text = message ?: ""
                val uriStr = if (!phone.isNullOrBlank()) {
                    "whatsapp://send?phone=$phone&text=${Uri.encode(text)}"
                } else {
                    "whatsapp://send?text=${Uri.encode(text)}"
                }
                try {
                    val intent = Intent(Intent.ACTION_VIEW, Uri.parse(uriStr)).apply {
                        `package` = "com.whatsapp"
                        addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
                    }
                    activity.startActivity(intent)
                } catch (e: Exception) {
                    try {
                        val fallbackUri = if (!phone.isNullOrBlank()) {
                            "https://wa.me/$phone?text=${Uri.encode(text)}"
                        } else {
                            "https://api.whatsapp.com/send?text=${Uri.encode(text)}"
                        }
                        val intent = Intent(Intent.ACTION_VIEW, Uri.parse(fallbackUri)).apply {
                            addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
                        }
                        activity.startActivity(intent)
                    } catch (ex: Exception) {
                        Toast.makeText(activity, "WhatsApp non installé sur le téléphone", Toast.LENGTH_SHORT).show()
                    }
                }
            }
        }

        @JavascriptInterface
        fun openTelegram(message: String?) {
            activity.runOnUiThread {
                val text = message ?: ""
                val uriStr = "tg://msg?text=${Uri.encode(text)}"
                try {
                    val intent = Intent(Intent.ACTION_VIEW, Uri.parse(uriStr)).apply {
                        `package` = "org.telegram.messenger"
                        addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
                    }
                    activity.startActivity(intent)
                } catch (e: Exception) {
                    try {
                        val fallbackUri = "https://t.me/share/url?url=&text=${Uri.encode(text)}"
                        val intent = Intent(Intent.ACTION_VIEW, Uri.parse(fallbackUri)).apply {
                            addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
                        }
                        activity.startActivity(intent)
                    } catch (ex: Exception) {
                        Toast.makeText(activity, "Telegram non installé sur le téléphone", Toast.LENGTH_SHORT).show()
                    }
                }
            }
        }

        @JavascriptInterface
        fun openGmail(to: String?, subject: String?, body: String?) {
            activity.runOnUiThread {
                val toClean = to ?: ""
                val mailto = "mailto:$toClean?subject=${Uri.encode(subject ?: "")}&body=${Uri.encode(body ?: "")}"
                try {
                    val intent = Intent(Intent.ACTION_SENDTO, Uri.parse(mailto)).apply {
                        `package` = "com.google.android.gm"
                        addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
                    }
                    activity.startActivity(intent)
                } catch (e: Exception) {
                    try {
                        val intent = Intent(Intent.ACTION_SENDTO, Uri.parse(mailto)).apply {
                            addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
                        }
                        activity.startActivity(intent)
                    } catch (ex: Exception) {
                        Toast.makeText(activity, "Application Gmail ou e-mail non trouvée", Toast.LENGTH_SHORT).show()
                    }
                }
            }
        }

        @JavascriptInterface
        fun shareText(title: String?, message: String?) {
            activity.runOnUiThread {
                val sendIntent = Intent().apply {
                    action = Intent.ACTION_SEND
                    putExtra(Intent.EXTRA_TEXT, message ?: "")
                    putExtra(Intent.EXTRA_SUBJECT, title ?: "TREASURER'S REPORT - Financial Record")
                    type = "text/plain"
                }
                val shareIntent = Intent.createChooser(sendIntent, title ?: "Partager via")
                shareIntent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
                activity.startActivity(shareIntent)
            }
        }

        @JavascriptInterface
        fun isAndroidApp(): Boolean {
            return true
        }

        @JavascriptInterface
        fun setAppLanguage(lang: String?) {
            val targetLang = if (lang == "fr") "fr" else "en"
            activity.runOnUiThread {
                try {
                    val prefs = activity.getSharedPreferences("RachelEaglesPrefs", Context.MODE_PRIVATE)
                    prefs.edit().putString("APP_LANG", targetLang).apply()
                    activity.applyAppLocale(targetLang)
                } catch (e: Exception) {
                    e.printStackTrace()
                }
            }
        }

        @JavascriptInterface
        fun showToast(msg: String?) {
            activity.runOnUiThread {
                Toast.makeText(activity, msg ?: "", Toast.LENGTH_SHORT).show()
            }
        }
    }
}
