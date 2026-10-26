# Official User Manual — The Fraternal Order of Lady Eagles
**Foundation to Financial Record — Treasury & Projected Audit System**  
*The Fraternal Order of Lady Eagles — Sargo Cambodia Eagles Club & Lady Eagles Group*  
*Version: 2.0 (Hybrid PC & Android)* — *Updated: October 2026*

---

## Table of Contents
1. [Introduction & Overview](#1-introduction--overview)
2. [Installation & Launching (PC & Android)](#2-installation--launching-pc--android)
3. [Authentication & Security](#3-authentication--security)
4. [Top Navigation Bar & Header](#4-top-navigation-bar--header)
5. [Tab 1: Home](#5-tab-1-home)
6. [Tab 2: New Debit Entry (Expenses)](#6-tab-2-new-debit-entry-expenses)
7. [Tab 3: New Credit Entry (Revenues)](#7-tab-3-new-credit-entry-revenues)
8. [Tab 4: Families & Categories](#8-tab-4-families--categories)
9. [Tab 5: Analytics, Reports & Audit](#9-tab-5-analytics-reports--audit)
   - [5.1 Journal & General Ledger (Date Filters & PDF Export)](#51-journal--general-ledger)
   - [5.2 Histogram & Global Pie Chart](#52-histogram--global-pie-chart)
   - [5.3 Breakdown by Family & Category](#53-breakdown-by-family--category)
   - [5.4 Custom Analytics & Operating Ratios](#54-custom-analytics)
   - [5.5 Audit Report & Time-Phased Action Plans (3 Months)](#55-audit-report--time-phased-action-plans-3-months)
10. [Tab 6: Settings](#10-tab-6-settings)
    - [User Credentials & Password Change](#user-credentials--password-change)
    - [ZIP Archive Backup & Date Export](#zip-archive-backup--date-export)
    - [Data Restore](#data-restore)
    - [Local Network Synchronization (Wi-Fi / 5G)](#local-network-synchronization-wi-fi--5g)
11. [Troubleshooting & Best Practices](#11-troubleshooting--best-practices)

---

## 1. Introduction & Overview

The **RachelEagles** application is engineered to meet the financial management, treasury tracking, and governance requirements of **The Fraternal Order of Eagles**, specifically supporting the **Sargo Cambodia Eagles Club** and the **Lady Eagles Group**.

Key capabilities include:
- Strict, transparent cash accounting (revenues, expenditures, and net balance reconciliation).
- Dynamic, two-tiered budgetary classification (**Families** and **Categories**).
- Optional and nominative attribution of transactions by individual member name.
- Standardized, high-resolution official **PDF** generation complete with official Eagles emblems, header graphics, and a centered watermarked club seal.
- An advanced **Financial Audit Report with Time-Phased Improvement Action Cards (Roadmap)** over a 3-month forecast horizon.
- Full **100% offline standalone execution** on both Windows PCs and Android smartphones with seamless local network synchronization.

---

## 2. Installation & Launching (PC & Android)

### 2.1 On Windows PC
1. **1-Click Launch**: Double-click the official **RachelEagles** shortcut (displaying the official club eagle icon) on your Windows Desktop.
2. **Silent Background Daemon**: The launcher starts the background local service seamlessly without opening a command prompt window, and launches Microsoft Edge (or Google Chrome) in standalone App mode.
3. **Manual Batch Option**: You can also double-click `Lancer_RachelEagles.bat` in the project root directory `D:\AndroidProjects\RachelEagles`.

### 2.2 On Android Smartphone
1. **Native APK**: Install the `RachelEagles.apk` file on your Android mobile device.
2. **Direct Execution**: Tap the **Rachel Eagles** icon in your phone's app list.
3. The app runs completely offline without requiring an active internet connection for daily treasury data entry.

---

## 3. Authentication & Security

To safeguard the club's financial data, access is protected upon launching:
1. **Login Prompt**: Enter your **Username** and **Password**.
2. **Default Credentials**:
   - Username: `admin`
   - Password: `eagles2026`
3. **Session Retention**: Credentials are encrypted and retained locally on your device.
4. **Password Updates**: Both username and password can be updated at any time in the **Settings** tab.

---

## 4. Top Navigation Bar & Header

The top header is displayed across all tabs and provides immediate access to essential controls:
- **Official Eagles Emblems**: High-definition club crest and insignia.
- **Information Icon `(i)`**: Opens this comprehensive User Manual at any time in English or French.
- **Language Selector (FR / EN)**: Switches the entire user interface and report formatting between English and French instantly.
- **Native Communication Shortcuts**:
  - **WhatsApp Icon**: Triggers the WhatsApp app to share financial summaries or message fellow officers.
  - **Telegram Icon**: Opens the native Telegram app.
  - **Email Icon (Gmail)**: Launches Gmail with a pre-filled treasury summary (balance, credits, debits).
- **Sync Button**: Forces immediate two-way synchronization with the local club server.
- **Deficit Alert Banner**: If the net balance turns negative, a high-visibility red alert appears instantly, displaying the deficit amount and linking to the audit recommendations.

---

## 5. Tab 1: Home

The **Home** view displays an instant high-level overview of the club's financial position:
1. **Total Credits (Incomes)**: Cumulative incoming funds formatted in USD (`$ 0.00`).
2. **Total Debits (Expenses)**: Cumulative outgoing payments formatted in USD.
3. **Net Balance (Available Cash)**: Net cash surplus or deficit in real time.
4. **Quick Action Buttons**:
   - `+ New Debit`: Jumps directly to expense entry.
   - `+ New Credit`: Jumps directly to revenue entry.
   - `View Analytics`: Opens the analytical charts and audit dashboard.
5. **Recent Transactions Table**:
   - Displays the latest transactions in reverse chronological order.
   - Columns: Date, Type (Credit / Debit), Family & Category, Invoice / Receipt Ref, Remark, Amount (USD).

---

## 6. Tab 2: New Debit Entry (Expenses)

Used to record any club disbursement:
1. **Transaction Date**: Defaults to today's date, or select any date via the native calendar picker (with clear *Set*, *Cancel*, *Clear* actions).
2. **Family & Category**:
   - Select the main budgetary Family, followed by the specific Category.
   - **On-the-fly Addition**: Click `+ New Family` or `+ New Category` to add a new classification immediately without leaving the form. An explicit dialog will display: *"Add a new family"* or *"Add a new category"*.
3. **Amount (USD)**: Enter the payment amount in dollars.
4. **Invoice / Receipt Reference**: Invoice number, receipt code, or voucher identifier.
5. **Person's Name (Optional)**: Name of the member, officer, or vendor associated with the disbursement.
6. **Remark / Purpose**: Free-text description of the expense.
7. **Submission**: Click `Submit Debit`. Upon saving, all input fields are reset to blank, ready for the next entry.
8. **Debits History Table**: Review past disbursements, edit amounts, or cancel/delete entries if entered in error.

---

## 7. Tab 3: New Credit Entry (Revenues)

Used to record all incoming funds:
1. **Transaction Date**: Date funds were collected.
2. **Reason / Source**: Monthly membership dues, donation, sponsorship, event ticket sales...
3. **Amount (USD)**: Value received in dollars.
4. **Receipt Reference**: Receipt number delivered to the payer.
5. **Person's Name (Optional)**: Name of the paying member or donor.
6. **Remark**: Any additional details.
7. **Submission**: Click `Submit Credit`. All fields are cleared immediately after saving.
8. **Credits History Table**: Full searchable ledger of all registered revenues.

---

## 8. Tab 4: Families & Categories

Organizes the club's financial classification schema:
1. **Automatic Alphabetical Sorting**: All families and child categories are strictly sorted from A to Z for effortless discovery.
2. **Create New Family**: Enter the family title (e.g., *Charity Outreach*, *Clubhouse Utilities*, *Logistics*) and confirm.
3. **Create New Category**: Select the parent family and enter the specific item (e.g., *Fuel*, *Van Rental*, *Refreshments*).
4. **Editing & Deletion**: Convenient edit and delete actions are available for every item.

---

## 9. Tab 5: Analytics, Reports & Audit

Named **« Analytics, Reports & Audit »**, this tab houses 6 sub-views:

### 5.1 Journal & General Ledger
- **Date Filters**: Choose between *Date Range* (From ... To ...), *Specific Single Date*, or *Full History*.
- **Live General Ledger Table** with real-time totals.
- **« Export to PDF » Button**: Produces a standardized A4 document featuring the official Rachel Eagles header, centered eagle watermark, financial breakdown, and itemized ledger table.

### 5.2 Histogram & Global Pie Chart
- Visual revenue vs. expense comparison.
- Interactive Chart.js donut chart illustrating fund distribution.

### 5.3 Breakdown by Family & Category
- Percentage and dollar distribution across each primary budget family.
- Granular breakdown of individual expenditure categories.

### 5.4 Custom Analytics
- Key operational metrics and monthly cash turnover ratios.

### 5.5 Audit Report & Time-Phased Action Plans (3 Months)
Dedicated management audit module for club leadership and the Board of Trustees:
1. **Official Audit Banner**:
   - Official `OFFICIAL AUDIT` badge.
   - `Export Official Audit Report (PDF)` button to generate a certified, printable audit report.
2. **Financial Health Score & Risk Assessment**:
   - Score out of 100 based on operational margin and action card progress.
   - Risk rating: *Low Risk (Green)*, *Moderate Risk (Amber)*, or *High Risk (Red)*.
   - Dynamic progress bar tracking the exact percentage of completed action items.
3. **Key Diagnostic Indicators**:
   - Average monthly revenues.
   - Average operational expenditures (burn rate).
   - Net monthly cashflow trend.
   - Reserve coverage ratio (actual months vs. 2.5 months recommended threshold).
4. **3-Month Projected Cashflow Trajectory (M+1, M+2, M+3)**:
   - Forward-looking financial projection cards for each of the next 3 months, highlighting projected income, projected expenses, net monthly balance, and cumulative available cash.
5. **Time-Phased Improvement Action Cards (Roadmap)**:
   Structured across 3 chronological implementation horizons:
   - **Horizon 1: Immediate Actions (0 – 30 Days / Month 1)**:
     - *ACTION-01*: Dominant Expense Rationalization (strict disbursement caps, mandatory comparison of at least 2 vendor quotes, co-signature rule).
     - *ACTION-02*: Accelerated Membership Dues Mobilization (itemized dues statements sent to members, fixed 5th-of-the-month deadline).
   - **Horizon 2: Consolidation & Reserves (30 – 60 Days / Month 2)**:
     - *ACTION-03*: Emergency Safety Reserve (systematic allocation of 15% of all incoming revenues into an untouchable reserve fund).
     - *ACTION-04*: Disbursement Attribution & Receipt Compliance (100% receipt tracking with member attribution and scanned proof of expense).
   - **Horizon 3: Sustainability & Governance (60 – 90 Days / Month 3+)**:
     - *ACTION-05*: Revenue Diversification & Corporate Sponsorships (local business partnerships, organization of the annual Eagles Charity Tournament).
     - *ACTION-06*: Formal Quarterly Audit & Governance Review (variance analysis comparing actuals against projected trajectory, presented to the Eagles Council).
   - **Interactive Status Tracking**: Tapping the status pill on any card toggles its state (*To Plan* ➜ *In Progress* ➜ *Completed*). Progress is persisted on your device and updates the audit score live.

---

## 10. Tab 6: Settings

### User Credentials & Password Change
- **Username Change**: Enter the old username, then specify the new username.
- **Password Change**: Enter the old password, then provide the new password.
- Click `Save Credentials` to apply changes securely.

### ZIP Archive Backup & Date Export
- Select your target date range (*From* and *To*).
- Click `Generate & Download ZIP`.
- Downloads a self-contained archive containing the encrypted JSON database and a standalone HTML executive summary.

### Data Restore
- Click `Select file to restore (.json)`.
- Pick your previously exported backup file to restore transactions and categories instantly.

### Local Network Synchronization (Wi-Fi / 5G)
- Synchronize your mobile device and PC seamlessly when connected to the same Wi-Fi router or mobile hotspot.
- Enter the club server's IP address and tap `Sync Now`.

---

## 11. Troubleshooting & Best Practices

- **Periodic Backups**: Generate a ZIP backup at the end of each month or after major fundraising events.
- **Printing on Android**: When triggering PDF export on mobile, the native Android print dialog allows you to either send the report to a connected Wi-Fi printer or select *« Save as PDF »* to save it to your phone's storage.
- **Offline Reliability**: All recorded data, settings, and action card statuses remain intact locally without requiring continuous internet access.
