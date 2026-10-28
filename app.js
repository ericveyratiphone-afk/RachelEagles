// ============================================================================
// RACHEL EAGLES - APPLICATION DE GESTION DE TRÉSORERIE (React 18)
// The Fraternal Order of Eagles / Sargo Cambodia Eagles Club
// ============================================================================

const { useState, useEffect, useMemo, useRef } = React;

const STORAGE_KEY = 'RACHEL_EAGLES_STATE_V1';

// Emails administrateurs autorisés pour la réinitialisation de mot de passe
const ADMIN_EMAILS = ['Afamcherie@gmail.com', 'ericveyrat.iphone@gmail.com'];

// ============================================================================
// DICTIONNAIRE MULTILINGUE COMPLET (ENGLISH PRIMARY / FRANÇAIS)
// ============================================================================
const I18N = {
  en: {
    // App header & auth
    appTitle: "TREASURER'S REPORT",
    orgTitle: "THE FRATERNAL ORDER OF LADY EAGLES GROUP",
    subTitle: "Financial Record",
    currency: "USD ($)",
    loginTitle: "Secure Access - Treasury",
    loginDesc: "Please login to manage Financial Record",
    username: "Username",
    password: "Password",
    btnLogin: "Login",
    rememberMe: "Remember me",
    logout: "Logout",
    roleTreasurer: "Treasurer",
    loginError: "Invalid username or password.",
    defaultCredsHint: "Default credentials: tresorier / eagles2026",
    showPassword: "Show password",
    hidePassword: "Hide password",
    forgotPassword: "Forgot password?",
    
    // Password Recovery Modal
    recoveryTitle: "Password Recovery",
    recoverySubtitle: "Reset procedure for TREASURER'S REPORT - Financial Record",
    recoveryEmailsNotice: "Verification codes and reset notifications are sent to the authorized administrator emails:",
    btnSendEmailCode: "Generate & Send Reset Code via Email",
    codeSentNotice: "A 6-digit reset code has been generated and pre-filled in your email client for:",
    enterCodeLabel: "6-Digit Verification Code:",
    codePlaceholder: "e.g., 839201",
    newPasswordLabel: "New Password:",
    confirmPasswordLabel: "Confirm New Password:",
    btnConfirmReset: "Update & Save Password",
    btnBackToLogin: "Back to Login",
    errInvalidCode: "Invalid verification code. Please check the code sent to your email.",
    errPasswordMismatch: "The passwords do not match. Please re-type.",
    errPasswordEmpty: "Password must be at least 4 characters long.",
    successReset: "Password successfully updated! You can now log in with your new password.",

    // Navigation Tabs
    navDashboard: "Home",
    navDebits: "Debits (Expenses)",
    navCredits: "Credits (Incomes)",
    navFamilies: "Families",
    navMembers: "Members",
    navCategories: "Families",
    navStats: "Analytics, Reports & Audit",
    navBackup: "Backup & Sync",
    navSettings: "Settings",

    // Members Directory & Management
    membersTitle: "Official Club Members Directory",
    membersSubtitle: "Directory of official members for expense and income attribution, contacts, and emergency info.",
    btnAddMember: "+ Add Member",
    modalNewMemberTitle: "Add Club Member",
    modalEditMemberTitle: "Edit Club Member",
    memberNameLabel: "Full Name (with title):",
    memberPositionLabel: "Club Position / Role:",
    memberPhoneLabel: "Telephone (Cambodia):",
    memberAddressLabel: "Address in Cambodia:",
    memberWorkLabel: "Nature of Work / Occupation:",
    memberEmergencyLabel: "In Case of Emergency (Contact Name):",
    memberEmergencyPhoneLabel: "Emergency Telephone Number:",
    searchMembersPlaceholder: "Search members by name, position, phone, work, address...",
    filterPositionLabel: "Role / Position:",
    filterAllPositions: "All Positions",
    confirmDeleteMember: "Are you sure you want to remove this member from the directory?",
    memberDeletedSuccess: "Member deleted successfully.",
    memberSavedSuccess: "Member saved successfully.",
    noMembersFound: "No members match your search criteria.",

    // Statistical Sub-Views
    statView1: "1. Journal & General Ledger",
    statView2: "2. Histogram & Global Pie Chart",
    statView3: "3. Breakdown by Family",
    statView4: "4. Custom Analytics",
    statView5: "5. Audit Report & Action Plans (3-Mo.)",
    auditReportTitle: "Treasury Audit Report & Action Roadmap",
    auditReportSubtitle: "Financial diagnostic, audit findings, and phased operational improvement plans.",
    auditScoreLabel: "Audit Compliance & Health Score",
    auditRiskLow: "Low Risk (Healthy Treasury)",
    auditRiskMedium: "Moderate Risk (Vigilance Advised)",
    auditRiskHigh: "High Risk (Critical Deficit Action Required)",
    actionRoadmapTitle: "Action Plans for Improvement over Time (Roadmap)",
    actionRoadmapSubtitle: "Structured corrective actions and operational improvements across 3 chronological horizons.",
    horizon1Title: "Horizon 1: Immediate Actions (0 - 30 Days / Month 1)",
    horizon2Title: "Horizon 2: Consolidation & Reserves (30 - 60 Days / Month 2)",
    horizon3Title: "Horizon 3: Sustainability & Governance (60 - 90 Days / Month 3+)",
    actionStatusTodo: "To Plan",
    actionStatusInProgress: "In Progress",
    actionStatusDone: "Completed",
    actionCardGoal: "Target Goal:",
    actionCardSteps: "Improvement Steps:",
    actionCardOwner: "Responsible:",
    actionCardImpact: "Treasury Impact:",
    btnExportAuditPdf: "Export Official Audit Report (PDF)",
    pdfAuditTitle: "OFFICIAL TREASURY AUDIT REPORT & TIME-PHASED ACTION ROADMAP",
    auditProgressTitle: "Audit Action Plan Progress:",
    auditProgressCompleted: "action(s) completed",
    forecastTitle: "3-Month Financial Forecast (Predictive Analysis)",
    forecastSubtitle: "Cash flow projection based on historical credit and debit averages.",
    adviceTitle: "Budget Optimization & Advisory Diagnostic",
    adviceSubtitle: "Actionable strategies and concrete recommendations to maximize income and control expenses.",
    projectedMonth: "Month",
    projectedDebits: "Est. Expenses",
    projectedCredits: "Est. Income",
    projectedNet: "Est. Net Cash Flow",
    projectedBalance: "Est. Cumulative Balance",
    averageMonthlyIncome: "Avg. Monthly Income",
    averageMonthlyExpense: "Avg. Monthly Expense",
    netMonthlyTrend: "Net Monthly Trend",
    financialHealthScore: "Financial Health Score",
    healthExcellent: "Excellent (Strong Reserve)",
    healthGood: "Healthy & Balanced",
    healthWarning: "Tight Margin - Vigilance Needed",
    healthCritical: "Critical Deficit - Immediate Action",
    adviceExpenseTitle: "Expense Reduction & Optimization",
    adviceIncomeTitle: "Revenue Enhancement Strategies",
    adviceSafetyTitle: "Safety Reserve & Liquidity Target",
    btnExportForecastPdf: "Export Forecast & Advisory Report (PDF)",
    pdfForecastTitle: "PREDICTIVE 3-MONTH FINANCIAL FORECAST & BUDGET ADVISORY",
    alertNegativeBalanceTitle: "Warning: Negative Treasury Balance!",
    alertNegativeBalanceDesc: "The total treasury balance is currently negative. Cumulative expenses exceed accumulated revenue.",
    alertDebitNegativeNotice: "Warning: This transaction results in a negative treasury balance!",
    adviceTopFamilyNote: "represents",
    adviceTopFamilySub: "of total expenses. A 10% saving here saves",
    adviceTopFamilyMonthly: "per month.",
    adviceReserveTargetDesc: "Target safety reserve (2 to 3 months of expenses):",
    adviceReserveCurrentNote: "Current coverage:",
    adviceReserveMonths: "months of operations.",

    // General Buttons & Action Buttons
    btnSave: "Save",
    btnUpdate: "Update Entry",
    btnClear: "Clear",
    btnCancel: "Cancel",
    btnEdit: "Edit",
    btnDelete: "Delete",
    calTitle: "Select Date",
    calSet: "Set",
    calCancel: "Cancel",
    calClear: "Clear",
    calToday: "Today",
    calYesterday: "Yesterday",

    // Stats filters & display modes
    statsFilterTitle: "Filters & Period Selection",
    filterModeRange: "Date Range",
    filterModeSingle: "Single Date",
    filterModeMonth: "Year / Month",
    filterModeAll: "All History",
    filterTypeLabel: "Type:",
    filterAllTypes: "All (Credits & Debits)",
    filterDebitsOnly: "Debits (Expenses) Only",
    filterCreditsOnly: "Credits (Incomes) Only",
    filterFamilyLabel: "Family:",
    filterAllFamilies: "All Families",
    filterCategoryLabel: "Category:",
    filterAllCategories: "All Categories",
    filterPersonLabel: "Person / Member:",
    filterAllPersons: "All Persons",
    btnResetStatsFilters: "Reset Filters",
    activeFilterBadge: "Active Filter:",
    filteredCountLabel: "Matching:",
    displayModeLabel: "Display Mode:",
    modeAmounts: "Amounts ($ USD)",
    modePercentages: "Percentages (%)",
    chartView2BarTitle: "Debit vs Credit Histogram",
    chartView2GlobalPieTitle: "Global Proportion (Credit vs Debit)",
    chartView2FamilyPieTitle: "Expense Breakdown by Family",
    chartView3Title: "Expense Distribution by Family",
    chartView4Title: "Expense Distribution by Category",
    inAmounts: "Amounts ($)",
    inPercentages: "Percentages (%)",
    unitAmountDesc: "Values displayed in USD ($)",
    unitPercentDesc: "Values displayed in percent (%)",
    noTransactionsFiltered: "No transactions match the selected filter criteria.",
    btnEditAmount: "Edit Amount",
    btnCancelRow: "Cancel Row",
    btnPrint: "Print",
    btnExportPdf: "Export to PDF",
    btnExportZip: "Save as ZIP",
    btnImport: "Restore",
    btnShare: "Share",
    btnShareTelegram: "Telegram",
    btnShareWhatsApp: "WhatsApp",
    btnShareMail: "Email",
    btnSyncNow: "Sync Now",
    btnAddFamily: "+ New Family",
    btnAddCategory: "+ New Category",
    btnNewDebit: "+ New Debit",
    btnNewCredit: "+ New Credit",
    btnViewStats: "View Analytics",
    btnSaveCreds: "Save Credentials",
    btnGenerateZip: "Generate & Download ZIP",
    btnSelectRestoreFile: "Select file to restore (.json)",
    btnRenameFamily: "Rename family",
    btnDeleteFamily: "Delete family",
    btnDeleteCategory: "Delete category",

    selectFamilyPlaceholder: "-- Select Family --",
    selectCategoryPlaceholder: "-- Select Category --",
    selectReasonPlaceholder: "-- Select Reason --",
    selectPersonPlaceholder: "-- Select Person (Optional) --",
    alertChooseDate: "Please choose a date.",
    alertChooseFamily: "Please select or create an expense family.",
    alertChooseCategory: "Please select a category.",
    alertChooseReason: "Please select a reason for credit.",
    modalNewFamilyTitle: "Add a new family",
    modalNewCategoryTitle: "Add a new category",
    modalNewPersonTitle: "Add a new person",
    modalFamilyNameLabel: "Family Name:",
    modalCategoryNameLabel: "Category Name:",
    modalPersonNameLabel: "Person / Member Name:",
    inputFamilyPlaceholder: "e.g. Venue, Water, Maintenance...",
    inputCategoryPlaceholder: "e.g. Office Bill, Fuel, Van Rental...",
    inputPersonPlaceholder: "e.g. Kuya Gerry, Ate Rachel, Kuya Mark...",
    btnAddConfirm: "Add",
    btnAddPerson: "+ New Person",
    colPerson: "Person / Member",
    optional: "optional",
    personsManagementTitle: "Members & Persons Management",
    personsManagementDesc: "Manage names of club members and persons for expense and income attribution.",
    promptRenamePerson: "New name for person / member:",
    confirmDeletePerson: "Remove this person from the list?",
    btnDeletePerson: "Delete person",
    btnRenamePerson: "Rename person",
    settingsCredsTitle: "Change Username & Password",
    settingsCredsDesc: "Update your treasurer access credentials securely.",
    oldUsernameLabel: "Old Username",
    newUsernameLabel: "New Username",
    oldPasswordLabel: "Old Password",
    newPasswordLabel: "New Password",
    placeholderOldUser: "Enter current username",
    placeholderNewUser: "Enter new username",
    placeholderOldPass: "Enter current password",
    placeholderNewPass: "Enter new password (min. 4 chars)",
    btnSaveSettingsCreds: "Save Credentials",
    errOldCredsIncorrect: "Incorrect old username or password.",
    errNewUserEmpty: "New username must be at least 2 characters.",
    errNewPassEmpty: "New password must be at least 4 characters.",
    successCredsUpdated: "Username and password updated successfully!",

    date: "Date",
    frequency: "Frequency",
    daily: "Daily",
    monthly: "Monthly",
    family: "Family",
    category: "Category",
    amount: "Amount (USD)",
    refInvoice: "Invoice / Reference # (optional)",
    placeholderInvoice: "e.g., INV-2026-004 or REF-88",
    reasonCredit: "Reason for credit",
    customReasonLabel: "Specify custom reason:",
    customReasonPlaceholder: "Indicate income source...",
    remark: "Remark / Free text (optional)",
    placeholderRemark: "Notes, receipts, comments...",
    actions: "Actions",
    type: "Type",
    debit: "Debit",
    credit: "Credit",
    balance: "Net Balance",
    totalDebits: "Total Debits",
    totalCredits: "Total Credits",
    period: "Period",
    fromDate: "From",
    toDate: "To",
    singleDate: "Specific Date",
    dateRange: "Date Range",
    allHistory: "Full History",
    groupBy: "Group by:",
    day: "Day",
    month: "Month",
    allTypes: "All (Debits & Credits)",
    debitsOnly: "Debits only",
    creditsOnly: "Credits only",
    shareColon: "Share:",
    editMode: "Edit Mode",
    newDebitTitle: "New Debit Entry (Expense)",
    editDebitTitle: "Edit Debit Entry",
    newCreditTitle: "New Credit Entry (Income)",
    editCreditTitle: "Edit Credit Entry",
    recentDebits: "Recent Debits History",
    recentCredits: "Recent Credits History",
    recentTransactions: "Recent Transactions",
    cumulCredits: "Total Incomes",
    cumulDebits: "Total Expenses",
    cashAvailable: "Available Cash",
    periodBalance: "Period Balance",
    journalTableTitle: "Credits & Debits Journal by Date",
    familyBreakdownTitle: "Expenses Breakdown by Family",
    familyBreakdownSub: "Electricity, Water, Food, Venue, etc.",
    familySummaryTable: "Family Summary Table",
    categoryBreakdownTitle: "Expenses Breakdown by Category",
    categoryBreakdownSub: "Fuel, Van Rental, Office Bill, etc.",
    customSelectionTitle: "Custom Data Selection",
    customChartTitle: "Chart based on selected data",
    selectedFamilies: "Selected Families:",
    zipBackupTitle: "Data Backup (ZIP Archive)",
    zipBackupDesc: "Export a secure ZIP archive containing transactions for your chosen custom date range.",
    zipDateFromLabel: "Start Date (Optional - Leave blank to include all):",
    zipDateToLabel: "End Date (Optional):",
    restoreTitle: "Data Restore",
    restoreDesc: "Restore your transactions from a JSON file or extracted ZIP archive.",
    syncTitle: "Phone & PC Sync (Wi-Fi / 5G)",
    syncDesc: "Connect your Android smartphone and computer over the same Wi-Fi or 5G hotspot.",
    serverIpLabel: "PC Server IP / Hostname:",
    serverPortNote: "Standard local port: 8085",
    syncInProgress: "Synchronizing with PC...",
    bannerLogosTitle: "Application Banner Logos",
    bannerLogosDesc: "Enable or disable the 3 official logos displayed at the top of the application.",
    logo1Title: "Logo 1: Philippine Eagles Emblem",
    logo1Desc: "Philippine National Colors Eagle",
    logo2Title: "Logo 2: Fraternal Order of Eagles Seal",
    logo2Desc: "Official Golden Circular Seal",
    logo3Title: "Logo 3: Sargo Cambodia Eagles Badge",
    logo3Desc: "Official Cambodia Club Badge",
    securityTitle: "Treasurer Access & Security",
    authorizedEmailsLabel: "Authorized Recovery Emails:",

    // PDF titles & footer
    pdfComparisonTitle: "CREDITS / DEBITS COMPARISON",
    pdfPeriodPrefix: "Period:",
    pdfGeneratedOn: "Generated on",
    pdfCurrencyNote: "Currency: USD ($)",
    pdfOfficialDoc: "Official Internal Treasury Document",
    pdfOrgName: "THE FRATERNAL ORDER OF LADY EAGLES GROUP",
    pdfTreasurerTitle: "The Treasurer",
    pdfSignatureLabel: "(Signature & Date)",
    pdfFamCol: "Family / Reason",
    pdfRefCol: "Ref #",
    pdfRemarkCol: "Remark",
    pdfAmountCol: "Amount (USD)",

    // Prompts & Dialogs
    promptNewFamily: "Name of new expense family (e.g. Community Service, Petty Cash...):",
    promptRenameFamily: "New name for family:",
    confirmDeleteFamily: "Delete this family?",
    promptQuickAmount: "New amount for this entry (USD):",
    alertInvalidAmount: "Please enter a valid amount greater than 0 USD.",
    alertChooseFamily: "Please select or create an expense family.",

    colDate: "Date",
    colType: "Type",
    colFamilyCategory: "Family / Reason",
    colRef: "Ref / Invoice",
    colRemark: "Remark",
    colAmount: "Amount",
    colFrequency: "Frequency",
    colActions: "Actions",
    colFamily: "Family",
    colReason: "Reason",
    syncShort: "Sync",
    syncTooltip: "Local Network Sync (PC <-> Phone)",

    // Default reasons
    reasons: [
      "Membership Dues",
      "Donations & Benefactors",
      "Organization Grants",
      "Fundraising Event",
      "Jerseys & Merchandising",
      "Advance Refund",
      "Other Income"
    ],

    // Messages
    saveSuccess: "Entry saved successfully!",
    deleteConfirm: "Are you sure you want to cancel/delete this entry?",
    deleteSuccess: "Entry deleted.",
    syncSuccess: "Synchronized successfully with PC!",
    syncError: "Cannot reach PC server. Check Wi-Fi IP.",
    zipSuccess: "ZIP archive created successfully for selected dates!",
    restoredSuccess: "Data restored successfully!"
  },
  fr: {
    // App header & auth
    appTitle: "TREASURER'S REPORT",
    orgTitle: "THE FRATERNAL ORDER OF LADY EAGLES GROUP",
    subTitle: "Financial Record",
    currency: "USD ($)",
    loginTitle: "Accès Sécurisé - Trésorerie",
    loginDesc: "Veuillez vous identifier pour accéder à Financial Record",
    username: "Identifiant",
    password: "Mot de passe",
    btnLogin: "Se connecter",
    rememberMe: "Se souvenir de moi",
    logout: "Déconnexion",
    roleTreasurer: "Trésorier / Trésorière",
    loginError: "Identifiant ou mot de passe incorrect.",
    defaultCredsHint: "Identifiants par défaut : tresorier / eagles2026",
    showPassword: "Voir le mot de passe",
    hidePassword: "Masquer le mot de passe",
    forgotPassword: "Mot de passe oublié ?",

    // Modal récupération
    recoveryTitle: "Récupération du Mot de Passe",
    recoverySubtitle: "Procédure officielle de sécurité TREASURER'S REPORT",
    recoveryEmailsNotice: "Les codes de vérification et alertes sont envoyés aux emails administrateurs autorisés :",
    btnSendEmailCode: "Générer & Envoyer le code par Email",
    codeSentNotice: "Un code à 6 chiffres a été généré et préparé dans votre boîte email pour :",
    enterCodeLabel: "Code de vérification à 6 chiffres :",
    codePlaceholder: "ex: 839201",
    newPasswordLabel: "Nouveau mot de passe :",
    confirmPasswordLabel: "Confirmer le mot de passe :",
    btnConfirmReset: "Valider & Enregistrer le mot de passe",
    btnBackToLogin: "Retour à la connexion",
    errInvalidCode: "Code de vérification non valide. Veuillez vérifier votre email.",
    errPasswordMismatch: "Les mots de passe ne correspondent pas.",
    errPasswordEmpty: "Le mot de passe doit comporter au moins 4 caractères.",
    successReset: "Mot de passe mis à jour avec succès ! Vous pouvez maintenant vous connecter.",

    // Navigation Tabs
    navDashboard: "Accueil",
    navDebits: "Débits (Dépenses)",
    navCredits: "Crédits (Recettes)",
    navFamilies: "Familles",
    navMembers: "Membres",
    navCategories: "Familles",
    navStats: "Statistiques, Rapports & Audit",
    navBackup: "Sauvegarde & Synchro",
    navSettings: "Paramètres",

    // Members Directory & Management
    membersTitle: "Annuaire Officiel des Membres",
    membersSubtitle: "Annuaire des membres officiels pour l'imputation des dépenses et recettes, coordonnées et urgence.",
    btnAddMember: "+ Ajouter un Membre",
    modalNewMemberTitle: "Ajouter un Membre du Club",
    modalEditMemberTitle: "Modifier un Membre du Club",
    memberNameLabel: "Nom complet (avec titre) :",
    memberPositionLabel: "Fonction / Rôle au sein du Club :",
    memberPhoneLabel: "Téléphone (Cambodge) :",
    memberAddressLabel: "Adresse au Cambodge :",
    memberWorkLabel: "Nature du Travail / Métier :",
    memberEmergencyLabel: "En cas d'urgence (Nom du contact) :",
    memberEmergencyPhoneLabel: "Téléphone d'urgence :",
    searchMembersPlaceholder: "Rechercher par nom, fonction, téléphone, métier, adresse...",
    filterPositionLabel: "Fonction :",
    filterAllPositions: "Toutes les fonctions",
    confirmDeleteMember: "Êtes-vous sûr de vouloir supprimer ce membre de l'annuaire ?",
    memberDeletedSuccess: "Membre supprimé avec succès.",
    memberSavedSuccess: "Membre enregistré avec succès.",
    noMembersFound: "Aucun membre ne correspond à vos critères de recherche.",

    // Statistical Sub-Views
    statView1: "1. Journal & Grand Livre",
    statView2: "2. Histogramme & Camembert Global",
    statView3: "3. Répartition par Famille",
    statView4: "4. Graphiques Sur-Mesure",
    statView5: "5. Rapport d'Audit & Fiches d'Action (3 Mois)",
    auditReportTitle: "Rapport d'Audit de Trésorerie & Feuille de Route",
    auditReportSubtitle: "Diagnostic financier approfondi, constats d'audit et fiches d'action d'amélioration dans le temps.",
    auditScoreLabel: "Score de Conformité & Santé Financière",
    auditRiskLow: "Risque Faible (Trésorerie Saine)",
    auditRiskMedium: "Risque Modéré (Vigilance Conseillée)",
    auditRiskHigh: "Risque Élevé (Action Corrective Urgente Requise)",
    actionRoadmapTitle: "Fiches d'Action d'Amélioration dans le Temps (Feuille de Route)",
    actionRoadmapSubtitle: "Démarches correctives et plans d'optimisation structurés en 3 horizons chronologiques.",
    horizon1Title: "Horizon 1 : Actions Immédiates (0 à 30 Jours / Mois 1)",
    horizon2Title: "Horizon 2 : Consolidation & Réserves (30 à 60 Jours / Mois 2)",
    horizon3Title: "Horizon 3 : Pérennité & Gouvernance (60 à 90 Jours / Mois 3+)",
    actionStatusTodo: "À Planifier",
    actionStatusInProgress: "En Cours",
    actionStatusDone: "Réalisé",
    actionCardGoal: "Objectif Chiffré :",
    actionCardSteps: "Pistes d'Amélioration & Démarches :",
    actionCardOwner: "Responsable :",
    actionCardImpact: "Impact Trésorerie :",
    btnExportAuditPdf: "Exporter le Rapport d'Audit (PDF)",
    pdfAuditTitle: "RAPPORT OFFICIEL D'AUDIT DE TRÉSORERIE & FICHES D'ACTION",
    auditProgressTitle: "Avancement du Plan d'Action d'Audit :",
    auditProgressCompleted: "action(s) réalisée(s)",
    forecastTitle: "Prévisions Financières sur 3 Mois (Analyse Prédictive)",
    forecastSubtitle: "Projection des flux de trésorerie basée sur les moyennes historiques des crédits et débits.",
    adviceTitle: "Diagnostic & Conseils d'Optimisation Budgétaire",
    adviceSubtitle: "Recommandations stratégiques et concrètes pour maximiser les recettes et maîtriser les dépenses.",
    projectedMonth: "Mois",
    projectedDebits: "Dépenses Estimées",
    projectedCredits: "Recettes Estimées",
    projectedNet: "Flux Net Estimé",
    projectedBalance: "Solde Final Estimé",
    averageMonthlyIncome: "Recette Mensuelle Moyenne",
    averageMonthlyExpense: "Dépense Mensuelle Moyenne",
    netMonthlyTrend: "Tendance Nette Mensuelle",
    financialHealthScore: "Score de Santé Financière",
    healthExcellent: "Excellente (Forte Réserve)",
    healthGood: "Saine & Équilibrée",
    healthWarning: "Marge Étroite - Vigilance Requise",
    healthCritical: "Déficit Critique - Action Requise",
    adviceExpenseTitle: "Optimisation & Réduction des Dépenses",
    adviceIncomeTitle: "Développement des Recettes & Cotisations",
    adviceSafetyTitle: "Fonds de Sécurité & Objectif Liquidités",
    btnExportForecastPdf: "Exporter le Rapport Prévisionnel (PDF)",
    pdfForecastTitle: "RAPPORT PRÉVISIONNEL SUR 3 MOIS & CONSEILS D'OPTIMISATION",
    alertNegativeBalanceTitle: "Attention : Solde de Trésorerie Négatif !",
    alertNegativeBalanceDesc: "Le solde global de trésorerie est actuellement déficitaire. Les dépenses cumulées dépassent les recettes.",
    alertDebitNegativeNotice: "Attention : Cet enregistrement entraîne un solde de trésorerie négatif !",
    adviceTopFamilyNote: "représente",
    adviceTopFamilySub: "du total des dépenses. Une économie de 10% permet d'économiser",
    adviceTopFamilyMonthly: "par mois.",
    adviceReserveTargetDesc: "Fonds de sécurité conseillé (2 à 3 mois de charges) :",
    adviceReserveCurrentNote: "Couverture actuelle :",
    adviceReserveMonths: "mois de fonctionnement.",

    // General Buttons & Action Buttons
    btnSave: "Enregistrer",
    btnUpdate: "Valider la Modification",
    btnClear: "Effacer",
    btnCancel: "Annuler",
    btnEdit: "Modifier",
    btnDelete: "Supprimer",
    calTitle: "Choisir une Date",
    calSet: "Définir",
    calCancel: "Annuler",
    calClear: "Effacer",
    calToday: "Aujourd'hui",
    calYesterday: "Hier",

    // Stats filters & display modes
    statsFilterTitle: "Filtres & Sélection de Période",
    filterModeRange: "Période (Du / Au)",
    filterModeSingle: "Date Unique",
    filterModeMonth: "Année / Mois",
    filterModeAll: "Tout l'historique",
    filterTypeLabel: "Type :",
    filterAllTypes: "Tous (Crédits & Débits)",
    filterDebitsOnly: "Débits (Dépenses) uniquement",
    filterCreditsOnly: "Crédits (Recettes) uniquement",
    filterFamilyLabel: "Famille :",
    filterAllFamilies: "Toutes les familles",
    filterCategoryLabel: "Catégorie :",
    filterAllCategories: "Toutes les catégories",
    filterPersonLabel: "Membre / Personne :",
    filterAllPersons: "Tous les membres",
    btnResetStatsFilters: "Réinitialiser les filtres",
    activeFilterBadge: "Filtre actif :",
    filteredCountLabel: "Correspondance :",
    displayModeLabel: "Mode d'affichage :",
    modeAmounts: "Montants ($ USD)",
    modePercentages: "Pourcentages (%)",
    chartView2BarTitle: "Histogramme Débits vs Crédits",
    chartView2GlobalPieTitle: "Proportion Globale (Crédits vs Débits)",
    chartView2FamilyPieTitle: "Répartition des Dépenses par Famille",
    chartView3Title: "Répartition des Dépenses par Famille",
    chartView4Title: "Répartition des Dépenses par Catégorie",
    inAmounts: "Montants ($)",
    inPercentages: "Pourcentages (%)",
    unitAmountDesc: "Valeurs affichées en USD ($)",
    unitPercentDesc: "Valeurs affichées en pourcentages (%)",
    noTransactionsFiltered: "Aucune transaction ne correspond aux critères de filtrage sélectionnés.",
    btnEditAmount: "Modifier Montant",
    btnCancelRow: "Annuler Ligne",
    btnPrint: "Imprimer",
    btnExportPdf: "Exporter en PDF",
    btnExportZip: "Sauvegarder en ZIP",
    btnImport: "Restaurer",
    btnShare: "Partager",
    btnShareTelegram: "Telegram",
    btnShareWhatsApp: "WhatsApp",
    btnShareMail: "Email",
    btnSyncNow: "Synchroniser maintenant",
    btnAddFamily: "+ Nouvelle Famille",
    btnAddCategory: "+ Nouvelle Catégorie",
    btnNewDebit: "+ Nouveau Débit",
    btnNewCredit: "+ Nouveau Crédit",
    btnViewStats: "Voir Statistiques",
    btnSaveCreds: "Sauvegarder les identifiants",
    btnGenerateZip: "Générer & Télécharger le fichier ZIP",
    btnSelectRestoreFile: "Sélectionner le fichier à restaurer (.json)",
    btnRenameFamily: "Renommer la famille",
    btnDeleteFamily: "Supprimer la famille",
    btnDeleteCategory: "Supprimer la catégorie",

    selectFamilyPlaceholder: "-- Choisir une famille --",
    selectCategoryPlaceholder: "-- Choisir une catégorie --",
    selectReasonPlaceholder: "-- Choisir un motif --",
    selectPersonPlaceholder: "-- Choisir une personne (Optionnel) --",
    alertChooseDate: "Veuillez choisir une date.",
    alertChooseFamily: "Veuillez choisir ou créer une famille de dépense.",
    alertChooseCategory: "Veuillez sélectionner une catégorie.",
    alertChooseReason: "Veuillez sélectionner un motif d'encaissement.",
    modalNewFamilyTitle: "Ajouter une nouvelle famille",
    modalNewCategoryTitle: "Ajouter une nouvelle catégorie",
    modalNewPersonTitle: "Ajouter une nouvelle personne",
    modalFamilyNameLabel: "Nom de la famille :",
    modalCategoryNameLabel: "Nom de la catégorie :",
    modalPersonNameLabel: "Nom de la personne / membre :",
    inputFamilyPlaceholder: "ex: Salle, Eau, Maintenance...",
    inputCategoryPlaceholder: "ex: Facture bureau, Carburant, Location...",
    inputPersonPlaceholder: "ex: Kuya Gerry, Ate Rachel, Kuya Mark...",
    btnAddConfirm: "Ajouter",
    btnAddPerson: "+ Nouvelle Personne",
    colPerson: "Personne / Membre",
    optional: "optionnel",
    personsManagementTitle: "Gestion des Membres & Personnes",
    personsManagementDesc: "Gérez la liste des membres et personnes pour l'attribution des dépenses et recettes.",
    promptRenamePerson: "Nouveau nom pour la personne / membre :",
    confirmDeletePerson: "Supprimer cette personne de la liste ?",
    btnDeletePerson: "Supprimer la personne",
    btnRenamePerson: "Renommer la personne",
    settingsCredsTitle: "Modifier l'Identifiant & le Mot de Passe",
    settingsCredsDesc: "Mettez à jour vos identifiants d'accès trésorier en toute sécurité.",
    oldUsernameLabel: "Ancien Identifiant",
    newUsernameLabel: "Nouvel Identifiant",
    oldPasswordLabel: "Ancien Mot de Passe",
    newPasswordLabel: "Nouveau Mot de Passe",
    placeholderOldUser: "Saisir l'identifiant actuel",
    placeholderNewUser: "Saisir le nouvel identifiant",
    placeholderOldPass: "Saisir le mot de passe actuel",
    placeholderNewPass: "Saisir le nouveau mot de passe (min. 4 car.)",
    btnSaveSettingsCreds: "Enregistrer les identifiants",
    errOldCredsIncorrect: "Ancien identifiant ou mot de passe incorrect.",
    errNewUserEmpty: "Le nouvel identifiant doit comporter au moins 2 caractères.",
    errNewPassEmpty: "Le nouveau mot de passe doit comporter au moins 4 caractères.",
    successCredsUpdated: "Identifiant et mot de passe mis à jour avec succès !",

    // Fields & Labels
    date: "Date",
    frequency: "Périodicité",
    daily: "Quotidien",
    monthly: "Mensuel",
    family: "Famille",
    category: "Catégorie",
    amount: "Montant (USD)",
    refInvoice: "N° Facture / Référence (optionnel)",
    placeholderInvoice: "ex: FACT-2026-004 ou REF-88",
    reasonCredit: "Raison du crédit",
    customReasonLabel: "Préciser la raison libre :",
    customReasonPlaceholder: "Indiquez la source de ce crédit...",
    remark: "Remarque / texte libre (optionnel)",
    placeholderRemark: "Remarques éventuelles, justificatifs...",
    actions: "Actions",
    type: "Type",
    debit: "Débit",
    credit: "Crédit",
    balance: "Solde Net",
    totalDebits: "Total Débits",
    totalCredits: "Total Crédits",
    period: "Période",
    fromDate: "Du",
    toDate: "Au",
    singleDate: "Date précise",
    dateRange: "Plage de dates",
    allHistory: "Tout l'historique",
    groupBy: "Regrouper par :",
    day: "Jour",
    month: "Mois",
    allTypes: "Tous (Débits & Crédits)",
    debitsOnly: "Débits uniquement",
    creditsOnly: "Crédits uniquement",
    shareColon: "Partager :",
    editMode: "Mode Modification",
    newDebitTitle: "Saisie d'un Nouveau Débit (Dépense)",
    editDebitTitle: "Modifier le Débit",
    newCreditTitle: "Saisie d'un Nouveau Crédit (Recette)",
    editCreditTitle: "Modifier le Crédit",
    recentDebits: "Historique des Débits Récents",
    recentCredits: "Historique des Crédits Récents",
    recentTransactions: "Dernières Opérations Enregistrées",
    cumulCredits: "Recettes cumulées",
    cumulDebits: "Dépenses cumulées",
    cashAvailable: "Disponibilité en caisse",
    periodBalance: "Solde Période",
    journalTableTitle: "Liste des Crédits & Débits classés par Date",
    familyBreakdownTitle: "Répartition des Dépenses par Famille",
    familyBreakdownSub: "Electricité, Eau, Alimentation, Réception, etc.",
    familySummaryTable: "Tableau Récapitulatif par Famille",
    categoryBreakdownTitle: "Répartition des Dépenses par Catégorie",
    categoryBreakdownSub: "Essence, Location Van, Facture Bureau, etc.",
    customSelectionTitle: "Sélection des données par le gestionnaire",
    customChartTitle: "Graphique selon vos données choisies",
    selectedFamilies: "Familles sélectionnées :",
    zipBackupTitle: "Sauvegarde des Données (Archive ZIP)",
    zipBackupDesc: "Exportez à la date de votre choix un fichier ZIP sécurisé contenant les données pour les dates définies par vous-même.",
    zipDateFromLabel: "Date de Début (Optionnel - Laisser vide pour tout inclure) :",
    zipDateToLabel: "Date de Fin (Optionnel) :",
    restoreTitle: "Restauration des Données",
    restoreDesc: "Restaurez vos transactions depuis une sauvegarde JSON ou un fichier issu d'un ZIP.",
    syncTitle: "Synchronisation Téléphone & PC (Wi-Fi / 5G)",
    syncDesc: "Connectez votre smartphone Android et votre ordinateur sur le même réseau Wi-Fi ou partage 5G.",
    serverIpLabel: "Adresse IP / Hôte du PC :",
    serverPortNote: "Port local standard : 8085",
    syncInProgress: "Synchronisation en cours avec le PC...",
    bannerLogosTitle: "Logos en Bannière de l'Application",
    bannerLogosDesc: "Activez ou désactivez les 3 logos officiels affichés en tête de l'application selon votre préférence.",
    logo1Title: "Logo 1 : Philippine Eagles Emblem",
    logo1Desc: "Aigle aux couleurs nationales Philippines",
    logo2Title: "Logo 2 : Fraternal Order of Eagles Seal",
    logo2Desc: "Sceau officiel circulaire doré",
    logo3Title: "Logo 3 : Sargo Cambodia Eagles Badge",
    logo3Desc: "Insigne officiel Club du Cambodge",
    securityTitle: "Accès Trésorier & Sécurité",
    authorizedEmailsLabel: "Emails autorisés pour la récupération :",

    // PDF titles & footer
    pdfComparisonTitle: "COMPARAISON CRÉDITS / DÉBITS",
    pdfPeriodPrefix: "Période :",
    pdfGeneratedOn: "Édité le",
    pdfCurrencyNote: "Devise : USD ($)",
    pdfOfficialDoc: "Document officiel de trésorerie interne",
    pdfOrgName: "THE FRATERNAL ORDER OF LADY EAGLES GROUP",
    pdfTreasurerTitle: "Le Trésorier / La Trésorière",
    pdfSignatureLabel: "(Signature & Date)",
    pdfFamCol: "Famille / Motif",
    pdfRefCol: "Réf",
    pdfRemarkCol: "Remarque",
    pdfAmountCol: "Montant (USD)",

    // Prompts & Dialogs
    promptNewFamily: "Nom de la nouvelle famille de dépense (ex: Community Service, Petty Cash...) :",
    promptRenameFamily: "Nouveau nom pour la famille :",
    confirmDeleteFamily: "Supprimer cette famille ?",
    promptQuickAmount: "Nouveau montant pour cette entrée (USD) :",
    alertInvalidAmount: "Veuillez saisir un montant valide supérieur à 0 USD.",
    alertChooseFamily: "Veuillez choisir ou créer une famille de dépense.",

    colDate: "Date",
    colType: "Type",
    colFamilyCategory: "Famille / Motif",
    colRef: "Ref / Invoice",
    colRemark: "Remark",
    colAmount: "Amount",
    colFrequency: "Frequency",
    colActions: "Actions",
    colFamily: "Family",
    colReason: "Reason",
    syncShort: "Sync",
    syncTooltip: "Local Network Sync (PC <-> Phone)",

    // Default reasons
    reasons: [
      "Cotisations des membres",
      "Dons et bienfaiteurs",
      "Subvention organisation",
      "Levée de fonds événementielle",
      "Vente de jerseys & insignes",
      "Remboursement avance",
      "Autre recette"
    ],

    // Messages
    saveSuccess: "Entrée enregistrée avec succès !",
    deleteConfirm: "Êtes-vous sûr de vouloir annuler/supprimer cette ligne ?",
    deleteSuccess: "Entrée supprimée.",
    syncSuccess: "Synchronisation réussie avec le PC !",
    syncError: "Impossible de joindre le serveur PC. Vérifiez l'IP Wi-Fi.",
    zipSuccess: "Archive ZIP générée avec succès pour les dates sélectionnées !",
    restoredSuccess: "Données restaurées avec succès !"
  }
};

// ============================================================================
// DONNÉES INITIALES PAR DÉFAUT
// ============================================================================
const DEFAULT_MEMBERS = [
  {
    id: 'mem_1',
    no: 1,
    name: 'Eagle VILMA ARDINA R.',
    position: 'Group President',
    phone: '092499323',
    address: '',
    work: '',
    emergencyContact: '',
    emergencyPhone: ''
  },
  {
    id: 'mem_2',
    no: 2,
    name: 'Eagle SHARON LLEGADO C.',
    position: 'Group Vice President',
    phone: '078843033',
    address: '',
    work: '',
    emergencyContact: '',
    emergencyPhone: ''
  },
  {
    id: 'mem_3',
    no: 3,
    name: 'Eagle MARY GRACE L. CABALLERO',
    position: 'Group Secretary',
    phone: '0977468246',
    address: 'House 22 Street 28 Borey Piphop Thmey 2 Veng Sreng Road Sangkat Choam Chao Phnom Penh',
    work: 'GARMENT INDUSTRY (QA of FAM BRAND)',
    emergencyContact: 'IRENEO PENAREDONDO / SHANLI PENAREDONDO',
    emergencyPhone: '(855) 972621935'
  },
  {
    id: 'mem_4',
    no: 4,
    name: 'Eagle LEONIE A. ABELLA',
    position: 'Group Treasurer',
    phone: '078598905',
    address: '',
    work: '',
    emergencyContact: '',
    emergencyPhone: ''
  },
  {
    id: 'mem_5',
    no: 5,
    name: 'Eagle HELEN S. DELA CRUZ',
    position: 'Group Auditor',
    phone: '085264243',
    address: '',
    work: '',
    emergencyContact: '',
    emergencyPhone: ''
  },
  {
    id: 'mem_6',
    no: 6,
    name: 'Eagle ROSALIE L. CUESTAS',
    position: 'Group Information Officer',
    phone: '0969377417',
    address: '',
    work: '',
    emergencyContact: '',
    emergencyPhone: ''
  },
  {
    id: 'mem_7',
    no: 7,
    name: 'Eagle LEELANIE J. DE JUAN',
    position: 'Group Protocol Officer',
    phone: '012799167',
    address: '',
    work: '',
    emergencyContact: '',
    emergencyPhone: ''
  },
  {
    id: 'mem_8',
    no: 8,
    name: 'Eagle RIZA E. NACARIO',
    position: 'Group Peace officer',
    phone: '011894417',
    address: '',
    work: '',
    emergencyContact: '',
    emergencyPhone: ''
  },
  {
    id: 'mem_9',
    no: 9,
    name: 'Eagle ANALYN B. EFREN',
    position: 'Group Peace officer',
    phone: '061816886',
    address: '',
    work: '',
    emergencyContact: '',
    emergencyPhone: ''
  },
  {
    id: 'mem_10',
    no: 10,
    name: 'Eagle MENIE R. MABUNGA',
    position: 'Group Peace officer',
    phone: '0973540986',
    address: '',
    work: '',
    emergencyContact: '',
    emergencyPhone: ''
  },
  {
    id: 'mem_11',
    no: 11,
    name: 'Eagle ROSSANA P. AQUINO',
    position: 'Group Grievance Chair',
    phone: '07336308',
    address: '',
    work: '',
    emergencyContact: '',
    emergencyPhone: ''
  },
  {
    id: 'mem_12',
    no: 12,
    name: 'Eagle EMILY C. RAZA',
    position: 'Group C.A.R.E Chairwoman',
    phone: '0716010542',
    address: '',
    work: '',
    emergencyContact: '',
    emergencyPhone: ''
  },
  {
    id: 'mem_13',
    no: 13,
    name: 'Eagle MARIFE G. CONDE',
    position: 'Group Board of Director',
    phone: '012321001',
    address: '',
    work: '',
    emergencyContact: '',
    emergencyPhone: ''
  },
  {
    id: 'mem_14',
    no: 14,
    name: 'Eagle MA. GEMMA L. DIMAALA',
    position: 'Group Board of Director',
    phone: '092628301',
    address: '',
    work: '',
    emergencyContact: '',
    emergencyPhone: ''
  },
  {
    id: 'mem_15',
    no: 15,
    name: 'Eagle ANALIZA S. ASIGNAR',
    position: 'Group Board of Director',
    phone: '089562528',
    address: '',
    work: '',
    emergencyContact: '',
    emergencyPhone: ''
  },
  {
    id: 'mem_16',
    no: 16,
    name: 'Eagle MARITES E. HILOMA',
    position: 'Group Board of Director',
    phone: '087865451',
    address: '',
    work: '',
    emergencyContact: '',
    emergencyPhone: ''
  },
  {
    id: 'mem_17',
    no: 17,
    name: 'Eagle MARILYN B. ABAD',
    position: 'Group Member',
    phone: '069467828',
    address: 'St. 16, #66 Borey 1, Veng Sreng Phnom Penh Cambodia',
    work: '',
    emergencyContact: '',
    emergencyPhone: ''
  },
  {
    id: 'mem_18',
    no: 18,
    name: 'Eagle ANNALIZA S. AUSTRIA',
    position: 'Group Member',
    phone: '017497926',
    address: 'St. 07 No. 01 Borey New World Porsenchey, Phnom Penh, Cambodia',
    work: 'GARMENT INDUSTRY (QUALITY ENGINEER)',
    emergencyContact: 'GERARDO ADINIT / ELEUTERIA AUSTRIA',
    emergencyPhone: '(855) 15907394'
  },
  {
    id: 'mem_19',
    no: 19,
    name: 'Eagle ROSALIE O. CABRERA',
    position: 'Group Member',
    phone: '077349088',
    address: '',
    work: '',
    emergencyContact: '',
    emergencyPhone: ''
  },
  {
    id: 'mem_20',
    no: 20,
    name: 'Eagle HANNAH MARIE S. DELA CRUZ',
    position: 'Group Member',
    phone: '0768020375',
    address: '77K STREET 9 BOREY HONGLAY, VENG SRENG, CHAUM CHAO, PHNOM PENH, CAMBODIA',
    work: 'EDUCATION (TEACHER)',
    emergencyContact: 'HELEN DELA CRUZ',
    emergencyPhone: '(855) 85264243'
  },
  {
    id: 'mem_21',
    no: 21,
    name: 'Eagle LOWELLA J. ESPRA',
    position: 'Group Member',
    phone: '010261621',
    address: 'St. 11, #66 Borey 1, Veng Sreng Phnom Penh Cambodia',
    work: 'BUSINESS (BRANCH MANAGER)',
    emergencyContact: 'JOSEPH CARIN JR',
    emergencyPhone: '(855) 87849245'
  },
  {
    id: 'mem_22',
    no: 22,
    name: 'Eagle NELCIE GRACE J. FUERTE',
    position: 'Group Member',
    phone: '093697255',
    address: 'St. 18, House No. 30 Borey Piphup Thamey 1, Veng Sreng , Phnom Penh, Cambodia',
    work: 'GARMENT INDUSTRY (QUALITY ASSURANCE)',
    emergencyContact: 'SAMUEL J. FUERTE',
    emergencyPhone: '(639) 17561275'
  },
  {
    id: 'mem_23',
    no: 23,
    name: 'Eagle DIANNA JEAN Y. LOREMIA',
    position: 'Group Member',
    phone: '0967404710',
    address: 'St.04, Room.03 Borey 1 Phipop Themey Sangkat Choam Chao 1, Khan Porsenchey Phnom Penh',
    work: 'GARMENT INDUSTRY (MERCHANDISER)',
    emergencyContact: 'ANDREW B. LOREMIA',
    emergencyPhone: '(855) 963146914'
  },
  {
    id: 'mem_24',
    no: 24,
    name: 'Eagle REYNALIN C. MADLA',
    position: 'Group Member',
    phone: '099324089',
    address: 'St.04, Room.08 Borey 1 Phipop Themey Sangkat Choam Chao 1, Khan Porsenchey Phnom Penh',
    work: 'GARMENT INDUSTRY (QUALITY ASSURANCE)',
    emergencyContact: 'ALEJANDRO B. CRISINI JR',
    emergencyPhone: '(855) 969678216'
  },
  {
    id: 'mem_25',
    no: 25,
    name: 'Eagle ELIZABETH V. OLIVEROS',
    position: 'Group Member',
    phone: '086799213',
    address: 'House No #9 Street 19 Room C1 Chaom Chao Khan Porsenchey Phnom Penh',
    work: 'GARMENT INDUSTRY (QUALITY ASSURANCE)',
    emergencyContact: 'SARAH MAE OLIVARES',
    emergencyPhone: '(639) 9771316571'
  },
  {
    id: 'mem_26',
    no: 26,
    name: 'Eagle LAARNIE D. RIVA',
    position: 'Group Member',
    phone: '092487165',
    address: 'St. 18, House No. 30 Borey Piphup Thamey 1, Veng Sreng , Phnom Penh, Cambodia',
    work: 'GARMENT INDUSTRY (QUALITY ASSURANCE)',
    emergencyContact: '',
    emergencyPhone: ''
  },
  {
    id: 'mem_27',
    no: 27,
    name: 'Eagle JUDITH P. VELASCO',
    position: 'Group Member',
    phone: '010820661',
    address: 'St.22 Borey 1 Phipop Themey Sangkat Choam Chao 1, Khan Porsenchey Phnom Penh',
    work: 'GARMENT INDUSTRY (QUALITY ASSURANCE)',
    emergencyContact: 'DARRYL P. VELASCO',
    emergencyPhone: '(639) 9055230422'
  },
  {
    id: 'mem_28',
    no: 28,
    name: 'Eagle CHARMILYN JADE M. POGOY',
    position: 'Group Member',
    phone: '087849182',
    address: 'St. 11, No.66 Borey 1, Veng Sreng Phnom Penh Cambodia',
    work: 'BUSINESS (OFFICE CLERK/ADMIN ASST)',
    emergencyContact: 'NEILJUN C. EGPIT',
    emergencyPhone: '(855) 87849259'
  },
  {
    id: 'mem_29',
    no: 29,
    name: 'Eagle GRACELDA N. SIBUG',
    position: 'Group Member',
    phone: '093580719',
    address: 'Borey SonTony # 16 Concrete Road 1, Trapeang Thleung 4 Village Sangkat Choam Chao 1, Khan Porsenchey Phnom Penh',
    work: 'GARMENT INDUSTRY (QUALITY ASSURANCE)',
    emergencyContact: 'MONICA RIMORIN',
    emergencyPhone: '(639) 9169040027'
  },
  {
    id: 'mem_30',
    no: 30,
    name: 'Eagle MARILYN M. ARANDIA',
    position: 'Group Member',
    phone: '070543092',
    address: 'House 42 Street 42 Borey Piphop Thmey 2 Veng Sreng Road Sangkat Choam Chao Phnom Penh City Cambodia',
    work: 'GARMENT INDUSTRY (QUALITY ASSURANCE)',
    emergencyContact: 'ENGELBERT ESCULTURA',
    emergencyPhone: '(855) 963583154'
  },
  {
    id: 'mem_31',
    no: 31,
    name: 'Eagle JASMIN M. EVANGELISTA',
    position: 'Group Member',
    phone: '069563607',
    address: 'St. Trung Morn Steung Meanchey 1 Meanchey, Phnom Penh Cambodia',
    work: 'GARMENT INDUSTRY (QUALITY ASSURANCE)',
    emergencyContact: 'COSME EVANGELISTA',
    emergencyPhone: '(639) 9096244657'
  },
  {
    id: 'mem_32',
    no: 32,
    name: 'Eagle ANITA S. CARIZO',
    position: 'Group Member',
    phone: '09669242504',
    address: 'St. 12 House #66 Borey Piphup Thamey 1, Veng Sreng, Phnom Penh, Cambodia',
    work: 'GARMENT INDUSTRY (QUALITY ASSURANCE)',
    emergencyContact: '',
    emergencyPhone: ''
  },
  {
    id: 'mem_33',
    no: 33,
    name: 'Eagle MA. LUISA D.C. PINEDA',
    position: 'Group Member',
    phone: '099237584',
    address: 'St. 19 House 138 Borey Piphup Thamey 2, Veng Sreng, Phnom Penh, Cambodia',
    work: 'GARMENT INDUSTRY (COSTING STAFF)',
    emergencyContact: 'GILBERTH T. PINEDA / ERICA MAE PINEDA',
    emergencyPhone: '(855) 11 583 297 / (639) 9274731596'
  }
];

const DEFAULT_FAMILIES = [
  { id: 'fam_alalayang', name: 'Alalayang Agila' },
  { id: 'fam_community', name: 'Community Service' },
  { id: 'fam_en_rent', name: 'En Rent' },
  { id: 'fam_monthly_dues', name: 'Monthly dues' },
  { id: 'fam_petty_cash', name: 'Petty Cash' },
  { id: 'fam_sharing_scleg', name: 'Sharing of SCLEG' },
  { id: 'fam_voluntary_donation', name: 'Voluntary Donation' }
];

const DEFAULT_TRANSACTIONS = [
  {
    id: 'tx_101',
    type: 'credit',
    frequency: 'monthly',
    date: '2026-10-01',
    amount: 3500.00,
    reason: 'Monthly dues',
    person: 'Eagle VILMA ARDINA R.',
    remark: 'October 2026 Monthly Dues',
    updatedAt: Date.now() - 86400000 * 20
  },
  {
    id: 'tx_102',
    type: 'credit',
    frequency: 'daily',
    date: '2026-10-05',
    amount: 1200.00,
    reason: 'Voluntary Donation',
    person: 'Eagle LEONIE A. ABELLA',
    remark: 'Special Voluntary Donation',
    updatedAt: Date.now() - 86400000 * 18
  },
  {
    id: 'tx_103',
    type: 'debit',
    frequency: 'monthly',
    date: '2026-10-06',
    family: 'En Rent',
    amount: 245.50,
    person: 'Eagle SHARON LLEGADO C.',
    refInvoice: 'RENT-2026-10',
    remark: 'Eagles Nest Central Office Rent',
    updatedAt: Date.now() - 86400000 * 17
  },
  {
    id: 'tx_104',
    type: 'debit',
    frequency: 'daily',
    date: '2026-10-08',
    family: 'Petty Cash',
    amount: 45.00,
    refInvoice: 'PC-9921',
    remark: 'Office supplies & drinking water',
    updatedAt: Date.now() - 86400000 * 15
  },
  {
    id: 'tx_105',
    type: 'debit',
    frequency: 'daily',
    date: '2026-10-12',
    family: 'Community Service',
    amount: 320.00,
    refInvoice: 'CS-RENT-04',
    remark: 'Community outreach mission',
    updatedAt: Date.now() - 86400000 * 12
  },
  {
    id: 'tx_106',
    type: 'debit',
    frequency: 'daily',
    date: '2026-10-15',
    family: 'Alalayang Agila',
    amount: 185.00,
    refInvoice: 'AA-5412',
    remark: 'Medical emergency aid for brother eagle',
    updatedAt: Date.now() - 86400000 * 10
  },
  {
    id: 'tx_107',
    type: 'debit',
    frequency: 'daily',
    date: '2026-10-18',
    family: 'Sharing of SCLEG',
    amount: 210.00,
    refInvoice: 'SCLEG-88',
    remark: 'Regional council sharing',
    updatedAt: Date.now() - 86400000 * 7
  },
  {
    id: 'tx_108',
    type: 'credit',
    frequency: 'daily',
    date: '2026-10-22',
    amount: 850.00,
    reason: 'Voluntary Donation',
    remark: 'Fundraising Voluntary Donation',
    updatedAt: Date.now() - 86400000 * 4
  },
  {
    id: 'tx_109',
    type: 'debit',
    frequency: 'daily',
    date: '2026-10-25',
    family: 'Community Service',
    amount: 450.00,
    refInvoice: 'CS-2026-25',
    remark: 'Feeding program supplies',
    updatedAt: Date.now() - 86400000 * 1
  }
];

const FAMILIES_TRANSLATION = {
  fr: {
    'Alalayang Agila': 'Alalayang Agila',
    'Community Service': 'Community Service',
    'En Rent': 'En Rent',
    'Monthly dues': 'Monthly dues',
    'Petty Cash': 'Petty Cash',
    'Sharing of SCLEG': 'Sharing of SCLEG',
    'Voluntary Donation': 'Voluntary Donation',
    'Membership Dues': 'Cotisations membres',
    'Donations & Benefactors': 'Dons & Mécènes',
    'Jerseys & Merchandising': 'Jerseys & Produits dérivés',
    'General': 'Général',
    'Other Income': 'Autre recette'
  },
  en: {
    'Alalayang Agila': 'Alalayang Agila',
    'Community Service': 'Community Service',
    'En Rent': 'En Rent',
    'Monthly dues': 'Monthly dues',
    'Petty Cash': 'Petty Cash',
    'Sharing of SCLEG': 'Sharing of SCLEG',
    'Voluntary Donation': 'Voluntary Donation',
    'Membership Dues': 'Membership Dues',
    'Donations & Benefactors': 'Donations & Benefactors',
    'Jerseys & Merchandising': 'Jerseys & Merchandising',
    'General': 'General',
    'Other Income': 'Other Income'
  }
};

function formatItemLabel(val, targetLang) {
  if (!val) return val;
  var dict = FAMILIES_TRANSLATION[targetLang];
  if (dict && dict[val]) return dict[val];
  if (dict) {
    for (var k in dict) {
      if (k.toLowerCase() === String(val).toLowerCase()) return dict[k];
    }
  }
  return val;
}

function getTodayDateStr() {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

function formatUSD(num) {
  const val = Number(num) || 0;
  return '$ ' + val.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

// ============================================================================
// COMPOSANT SÉLECTEUR DE DATE BILINGUE OFFICIEL (CALENDRIER INTERACTIF)
// Traduction stricte garantie : Set / Cancel / Clear (EN) ou Définir / Annuler / Effacer (FR)
// ============================================================================
function BilingualDatePicker({
  value,
  onChange,
  required = false,
  className = "",
  lang = "en",
  accentColor = "blue",
  placeholder = "YYYY-MM-DD",
  disabled = false,
  compact = false
}) {
  const [isOpen, setIsOpen] = useState(false);
  const isFr = lang === 'fr';

  const parseDate = (dStr) => {
    if (dStr && /^\d{4}-\d{2}-\d{2}$/.test(dStr)) {
      const parts = dStr.split('-').map(Number);
      return { y: parts[0], m: parts[1] - 1, d: parts[2] };
    }
    const now = new Date();
    return { y: now.getFullYear(), m: now.getMonth(), d: now.getDate() };
  };

  const initial = parseDate(value);
  const [viewYear, setViewYear] = useState(initial.y);
  const [viewMonth, setViewMonth] = useState(initial.m);
  const [selectedYMD, setSelectedYMD] = useState(value || '');

  useEffect(() => {
    if (isOpen) {
      setSelectedYMD(value || '');
      const parsed = parseDate(value);
      setViewYear(parsed.y);
      setViewMonth(parsed.m);
    }
  }, [isOpen, value]);

  const monthNamesEn = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const monthNamesFr = [
    "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
    "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
  ];
  const monthNames = isFr ? monthNamesFr : monthNamesEn;

  const daysShortEn = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
  const daysShortFr = ["Lu", "Ma", "Me", "Je", "Ve", "Sa", "Di"];
  const daysShort = isFr ? daysShortFr : daysShortEn;

  const formatStr = (y, m, d) => {
    const mm = String(m + 1).padStart(2, '0');
    const dd = String(d).padStart(2, '0');
    return `${y}-${mm}-${dd}`;
  };

  const today = new Date();
  const todayStr = formatStr(today.getFullYear(), today.getMonth(), today.getDate());

  const daysGrid = useMemo(() => {
    const firstDay = new Date(viewYear, viewMonth, 1).getDay(); // 0 is Sun
    const startOffset = (firstDay + 6) % 7; // Mon = 0, Sun = 6
    const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
    const prevMonthDays = new Date(viewYear, viewMonth, 0).getDate();

    const cells = [];
    for (let i = startOffset - 1; i >= 0; i--) {
      const d = prevMonthDays - i;
      let pm = viewMonth - 1;
      let py = viewYear;
      if (pm < 0) { pm = 11; py--; }
      cells.push({ day: d, month: pm, year: py, isCurrentMonth: false, ymd: formatStr(py, pm, d) });
    }
    for (let i = 1; i <= daysInMonth; i++) {
      cells.push({ day: i, month: viewMonth, year: viewYear, isCurrentMonth: true, ymd: formatStr(viewYear, viewMonth, i) });
    }
    const remaining = (7 - (cells.length % 7)) % 7;
    for (let i = 1; i <= remaining; i++) {
      let nm = viewMonth + 1;
      let ny = viewYear;
      if (nm > 11) { nm = 0; ny++; }
      cells.push({ day: i, month: nm, year: ny, isCurrentMonth: false, ymd: formatStr(ny, nm, i) });
    }
    return cells;
  }, [viewYear, viewMonth]);

  const handlePrevMonth = (e) => {
    e.stopPropagation();
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear(y => y - 1);
    } else {
      setViewMonth(m => m - 1);
    }
  };

  const handleNextMonth = (e) => {
    e.stopPropagation();
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear(y => y + 1);
    } else {
      setViewMonth(m => m + 1);
    }
  };

  const handleClear = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onChange('');
    setIsOpen(false);
  };

  const handleCancel = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsOpen(false);
  };

  const handleSet = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onChange(selectedYMD || todayStr);
    setIsOpen(false);
  };

  const handleQuickToday = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedYMD(todayStr);
    const parsed = parseDate(todayStr);
    setViewYear(parsed.y);
    setViewMonth(parsed.m);
  };

  const handleQuickYesterday = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const d = new Date();
    d.setDate(d.getDate() - 1);
    const yStr = formatStr(d.getFullYear(), d.getMonth(), d.getDate());
    setSelectedYMD(yStr);
    const parsed = parseDate(yStr);
    setViewYear(parsed.y);
    setViewMonth(parsed.m);
  };

  const setBtnColor = accentColor === 'red'
    ? 'bg-red-600 hover:bg-red-700 text-white'
    : (accentColor === 'green' ? 'bg-green-600 hover:bg-green-700 text-white' : 'bg-blue-600 hover:bg-blue-700 text-white');

  const yearOptions = [];
  for (let y = 2020; y <= 2035; y++) yearOptions.push(y);

  return (
    <div className={`relative ${compact ? 'inline-block' : 'w-full'}`}>
      <div
        onClick={() => !disabled && setIsOpen(true)}
        className={`flex items-center justify-between cursor-pointer bg-slate-50 border border-slate-300 rounded-lg transition hover:border-slate-400 select-none ${
          compact ? 'px-2 py-1 text-xs' : 'px-3 py-2 text-sm'
        } ${className}`}
        title={isFr ? "Cliquez pour ouvrir le calendrier" : "Click to open calendar"}
      >
        <div className="flex items-center gap-2 overflow-hidden">
          <i className={`fa-solid fa-calendar-day ${accentColor === 'red' ? 'text-red-600' : accentColor === 'green' ? 'text-green-600' : 'text-blue-600'}`}></i>
          <span className={`font-mono font-medium ${value ? 'text-slate-800' : 'text-slate-400'}`}>
            {value || placeholder}
          </span>
        </div>
        <button
          type="button"
          tabIndex={-1}
          className="text-slate-400 hover:text-slate-600 ml-1.5 focus:outline-none"
        >
          <i className="fa-solid fa-calendar-days"></i>
        </button>
      </div>

      <input
        type="text"
        value={value || ''}
        required={required}
        onChange={(e) => onChange(e.target.value)}
        className="sr-only"
        tabIndex={-1}
        aria-hidden="true"
      />

      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-3 overflow-y-auto"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-sm overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* EN-TÊTE MODALE */}
            <div className="bg-gradient-to-r from-blue-900 to-indigo-950 text-white px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <i className="fa-solid fa-calendar-days text-amber-400 text-lg"></i>
                <div>
                  <h4 className="font-black text-sm tracking-wide">
                    {isFr ? "Choisir une Date" : "Select Date"}
                  </h4>
                  <p className="text-[10px] text-blue-200">
                    {selectedYMD ? selectedYMD : (isFr ? "Aucune date sélectionnée" : "No date selected")}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={handleCancel}
                className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition text-sm font-bold"
              >
                &times;
              </button>
            </div>

            {/* NAVIGATION MOIS / ANNÉE */}
            <div className="p-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between gap-2">
              <button
                type="button"
                onClick={handlePrevMonth}
                className="w-8 h-8 rounded-lg bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 flex items-center justify-center transition shadow-xs"
                title={isFr ? "Mois précédent" : "Previous month"}
              >
                <i className="fa-solid fa-chevron-left text-xs"></i>
              </button>

              <div className="flex items-center gap-1.5 flex-1 justify-center">
                <select
                  value={viewMonth}
                  onChange={(e) => setViewMonth(parseInt(e.target.value, 10))}
                  className="bg-white border border-slate-200 text-slate-800 font-bold text-xs rounded-lg px-2 py-1.5 focus:outline-none"
                >
                  {monthNames.map((mName, mIdx) => (
                    <option key={mIdx} value={mIdx}>{mName}</option>
                  ))}
                </select>

                <select
                  value={viewYear}
                  onChange={(e) => setViewYear(parseInt(e.target.value, 10))}
                  className="bg-white border border-slate-200 text-slate-800 font-bold text-xs rounded-lg px-2 py-1.5 focus:outline-none"
                >
                  {yearOptions.map(y => (
                    <option key={y} value={y}>{y}</option>
                  ))}
                </select>
              </div>

              <button
                type="button"
                onClick={handleNextMonth}
                className="w-8 h-8 rounded-lg bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 flex items-center justify-center transition shadow-xs"
                title={isFr ? "Mois suivant" : "Next month"}
              >
                <i className="fa-solid fa-chevron-right text-xs"></i>
              </button>
            </div>

            {/* RACCOURCIS RAPIDES : AUJOURD'HUI / HIER */}
            <div className="px-3 pt-2.5 pb-1 flex items-center justify-between gap-2 text-xs">
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={handleQuickToday}
                  className="px-2 py-1 rounded bg-blue-50 text-blue-700 hover:bg-blue-100 font-bold text-[11px] border border-blue-200 transition"
                >
                  <i className="fa-solid fa-bullseye mr-1"></i>
                  {isFr ? "Aujourd'hui" : "Today"}
                </button>
                <button
                  type="button"
                  onClick={handleQuickYesterday}
                  className="px-2 py-1 rounded bg-slate-100 text-slate-700 hover:bg-slate-200 font-bold text-[11px] border border-slate-200 transition"
                >
                  <i className="fa-solid fa-arrow-rotate-left mr-1"></i>
                  {isFr ? "Hier" : "Yesterday"}
                </button>
              </div>
              <span className="font-mono text-xs font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                {selectedYMD || "----/--/--"}
              </span>
            </div>

            {/* GRILLE DES JOURS */}
            <div className="p-3">
              <div className="grid grid-cols-7 gap-1 text-center mb-1">
                {daysShort.map((dName, idx) => (
                  <div key={idx} className="text-[11px] font-black uppercase text-slate-500 py-1">
                    {dName}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-1 text-center">
                {daysGrid.map((cell, idx) => {
                  const isSelected = selectedYMD === cell.ymd;
                  const isToday = todayStr === cell.ymd;
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setSelectedYMD(cell.ymd)}
                      className={`h-9 w-full rounded-lg text-xs font-bold transition flex items-center justify-center relative ${
                        isSelected
                          ? (accentColor === 'red' ? 'bg-red-600 text-white shadow-sm ring-2 ring-red-400' : (accentColor === 'green' ? 'bg-green-600 text-white shadow-sm ring-2 ring-green-400' : 'bg-blue-600 text-white shadow-sm ring-2 ring-blue-400'))
                          : (cell.isCurrentMonth
                              ? (isToday ? 'bg-amber-100 text-amber-900 font-black border border-amber-300' : 'text-slate-700 hover:bg-slate-100')
                              : 'text-slate-300 hover:bg-slate-50')
                      }`}
                    >
                      {cell.day}
                      {isToday && !isSelected && (
                        <span className="absolute bottom-1 w-1 h-1 rounded-full bg-amber-600"></span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* LES 3 BOUTONS DEMANDÉS : EFFACER, ANNULER, DÉFINIR */}
            <div className="p-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-2">
              <button
                type="button"
                onClick={handleClear}
                className="px-3 py-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 text-xs font-black transition flex items-center gap-1.5"
                title={isFr ? "Effacer la date" : "Clear date"}
              >
                <i className="fa-solid fa-trash-can text-[11px]"></i>
                <span>{isFr ? "Effacer" : "Clear"}</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-3 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-bold transition flex items-center gap-1.5"
                >
                  <i className="fa-solid fa-xmark text-[11px]"></i>
                  <span>{isFr ? "Annuler" : "Cancel"}</span>
                </button>

                <button
                  type="button"
                  onClick={handleSet}
                  className={`px-4 py-2 rounded-xl ${setBtnColor} text-xs font-black shadow-sm transition flex items-center gap-1.5`}
                >
                  <i className="fa-solid fa-check text-[11px]"></i>
                  <span>{isFr ? "Définir" : "Set"}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ============================================================================
// COMPOSANT PRINCIPAL
// ============================================================================
function RachelEaglesApp() {
  // L'ANGLAIS EST DÉSORMAIS LA LANGUE PRINCIPALE PAR DÉFAUT
  const [lang, setLang] = useState(() => localStorage.getItem('RE_LANG') || 'en');
  const t = I18N[lang] || I18N.en;

  const toggleLang = () => {
    const next = lang === 'en' ? 'fr' : 'en';
    setLang(next);
    localStorage.setItem('RE_LANG', next);
  };

  // Synchronisation de la langue avec le DOM HTML et Android Native Bridge
  useEffect(() => {
    document.documentElement.lang = lang;
    if (window.AndroidNative && typeof window.AndroidNative.setAppLanguage === 'function') {
      try {
        window.AndroidNative.setAppLanguage(lang);
      } catch (e) {
        console.warn("setAppLanguage error:", e);
      }
    }
  }, [lang]);

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('RE_AUTH') === 'true';
  });
  const [loginUser, setLoginUser] = useState('');
  const [loginPass, setLoginPass] = useState('');
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [loginErrorMsg, setLoginErrorMsg] = useState('');
  const [rememberMe, setRememberMe] = useState(true);

  // Modal Récupération / Changement de Mot de Passe
  const [isForgotModalOpen, setIsForgotModalOpen] = useState(false);
  const [forgotStep, setForgotStep] = useState(1); // 1 = envoyer email, 2 = saisir code et nouveau mdp
  const [activeResetCode, setActiveResetCode] = useState('');
  const [resetCodeInput, setResetCodeInput] = useState('');
  const [newPasswordInput, setNewPasswordInput] = useState('');
  const [confirmPasswordInput, setConfirmPasswordInput] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [resetErrorMsg, setResetErrorMsg] = useState('');
  const [resetSuccessMsg, setResetSuccessMsg] = useState('');

  // Identifiants enregistrés
  const [authConfig, setAuthConfig] = useState(() => {
    const saved = localStorage.getItem('RE_AUTH_CONFIG');
    return saved ? JSON.parse(saved) : { user: 'tresorier', pass: 'eagles2026' };
  });

  const [currentTab, setCurrentTab] = useState('dashboard');
  const [statSubView, setStatSubView] = useState('view1');

  const [families, setFamilies] = useState(() => {
    try {
      const migKey = 'RE_LANG_MIG_V10_MEMBERS_33';
      if (localStorage.getItem(migKey) !== 'ready') {
        localStorage.setItem(migKey, 'ready');
        localStorage.setItem('RE_FAMILIES', JSON.stringify(DEFAULT_FAMILIES));
        localStorage.setItem('RE_MEMBERS', JSON.stringify(DEFAULT_MEMBERS));
        localStorage.setItem('RE_TRANSACTIONS', JSON.stringify(DEFAULT_TRANSACTIONS));
        return DEFAULT_FAMILIES;
      }
      const saved = localStorage.getItem('RE_FAMILIES');
      return saved ? JSON.parse(saved) : DEFAULT_FAMILIES;
    } catch(e) {
      return DEFAULT_FAMILIES;
    }
  });

  const [transactions, setTransactions] = useState(() => {
    try {
      const migKey = 'RE_LANG_MIG_V10_MEMBERS_33';
      if (localStorage.getItem(migKey) !== 'ready') {
        return DEFAULT_TRANSACTIONS;
      }
      const saved = localStorage.getItem('RE_TRANSACTIONS');
      return saved ? JSON.parse(saved) : DEFAULT_TRANSACTIONS;
    } catch(e) {
      return DEFAULT_TRANSACTIONS;
    }
  });

  const [members, setMembers] = useState(() => {
    try {
      const migKey = 'RE_LANG_MIG_V10_MEMBERS_33';
      if (localStorage.getItem(migKey) !== 'ready') {
        return DEFAULT_MEMBERS;
      }
      const saved = localStorage.getItem('RE_MEMBERS');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
      return DEFAULT_MEMBERS;
    } catch(e) {
      return DEFAULT_MEMBERS;
    }
  });

  const [bannerLogosConfig, setBannerLogosConfig] = useState(() => {
    const saved = localStorage.getItem('RE_BANNER_LOGOS');
    return saved ? JSON.parse(saved) : { showLogo1: true, showLogo2: true, showLogo3: true };
  });

  const [serverHost, setServerHost] = useState(() => {
    return localStorage.getItem('RE_SERVER_HOST') || window.location.hostname || 'localhost';
  });
  const [syncStatus, setSyncStatus] = useState('idle');
  const [syncMessage, setSyncMessage] = useState('');

  const [toastMessage, setToastMessage] = useState('');
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3500);
  };

  useEffect(() => {
    localStorage.setItem('RE_FAMILIES', JSON.stringify(families));
  }, [families]);

  useEffect(() => {
    localStorage.setItem('RE_TRANSACTIONS', JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem('RE_MEMBERS', JSON.stringify(members));
  }, [members]);

  useEffect(() => {
    localStorage.setItem('RE_BANNER_LOGOS', JSON.stringify(bannerLogosConfig));
  }, [bannerLogosConfig]);

  useEffect(() => {
    localStorage.setItem('RE_AUTH_CONFIG', JSON.stringify(authConfig));
  }, [authConfig]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (loginUser.trim() === authConfig.user && loginPass === authConfig.pass) {
      setIsAuthenticated(true);
      setLoginErrorMsg('');
      if (rememberMe) {
        localStorage.setItem('RE_AUTH', 'true');
      }
    } else {
      setLoginErrorMsg(t.loginError);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('RE_AUTH');
    setCurrentTab('dashboard');
  };

  // Procédure d'envoi du code de réinitialisation par email
  const handleTriggerEmailReset = () => {
    // Génère un code aléatoire à 6 chiffres
    const code = String(Math.floor(100000 + Math.random() * 900000));
    setActiveResetCode(code);
    setResetErrorMsg('');

    const recipients = ADMIN_EMAILS.join(',');
    const subject = encodeURIComponent("TREASURER'S REPORT - Password Reset Verification Code");
    const body = encodeURIComponent(
      `Hello,\n\nA request has been made to reset the treasurer password for the TREASURER'S REPORT Financial Record.\n\n` +
      `Your 6-digit verification code is:\n\n>>> ${code} <<<\n\n` +
      `Enter this code in the application to set your new password.\n\n` +
      `Authorized administrators: ${ADMIN_EMAILS.join(', ')}\n` +
      `Date: ${new Date().toLocaleString()}\n` +
      `THE FRATERNAL ORDER OF LADY EAGLES GROUP`
    );

    // Ouvre le client de messagerie
    window.open(`mailto:${recipients}?subject=${subject}&body=${body}`, '_blank');

    setForgotStep(2);
  };

  // Validation du code et enregistrement du nouveau mot de passe
  const handleConfirmNewPassword = (e) => {
    e.preventDefault();
    setResetErrorMsg('');

    if (resetCodeInput.trim() !== activeResetCode) {
      setResetErrorMsg(t.errInvalidCode);
      return;
    }

    if (!newPasswordInput || newPasswordInput.length < 4) {
      setResetErrorMsg(t.errPasswordEmpty);
      return;
    }

    if (newPasswordInput !== confirmPasswordInput) {
      setResetErrorMsg(t.errPasswordMismatch);
      return;
    }

    // Sauvegarde du nouveau mot de passe
    const updated = { ...authConfig, pass: newPasswordInput };
    setAuthConfig(updated);
    localStorage.setItem('RE_AUTH_CONFIG', JSON.stringify(updated));

    setResetSuccessMsg(t.successReset);
    setTimeout(() => {
      setIsForgotModalOpen(false);
      setForgotStep(1);
      setResetCodeInput('');
      setNewPasswordInput('');
      setConfirmPasswordInput('');
      setResetSuccessMsg('');
      setLoginPass(newPasswordInput);
      showToast(t.successReset);
    }, 1800);
  };

  // ==========================================================================
  // TRI ALPHABÉTIQUE AUTOMATIQUE DES FAMILLES & MEMBRES
  // ==========================================================================
  const sortedFamilies = useMemo(() => {
    return [...families].sort((a, b) => {
      const nameA = formatItemLabel(a.name, lang);
      const nameB = formatItemLabel(b.name, lang);
      return nameA.localeCompare(nameB, undefined, { sensitivity: 'base' });
    });
  }, [families, lang]);

  const sortedMembers = useMemo(() => {
    return [...members].map((m, idx) => {
      if (typeof m === 'string') {
        return {
          id: 'mem_leg_' + idx,
          no: idx + 1,
          name: m,
          position: 'Group Member',
          phone: '',
          address: '',
          work: '',
          emergencyContact: '',
          emergencyPhone: ''
        };
      }
      return m;
    }).sort((a, b) => (a.name || '').localeCompare(b.name || '', undefined, { sensitivity: 'base' }));
  }, [members]);

  // ==========================================================================
  // ÉTAT DU CHANGEMENT D'IDENTIFIANTS DANS PARAMÈTRES
  // ==========================================================================
  const [settingsOldUser, setSettingsOldUser] = useState('');
  const [settingsNewUser, setSettingsNewUser] = useState('');
  const [settingsOldPass, setSettingsOldPass] = useState('');
  const [settingsNewPass, setSettingsNewPass] = useState('');
  const [showSettingsOldPass, setShowSettingsOldPass] = useState(false);
  const [showSettingsNewPass, setShowSettingsNewPass] = useState(false);
  const [settingsCredsError, setSettingsCredsError] = useState('');
  const [settingsCredsSuccess, setSettingsCredsSuccess] = useState('');

  const handleSaveSettingsCredentials = (e) => {
    e.preventDefault();
    setSettingsCredsError('');
    setSettingsCredsSuccess('');

    // Vérification de l'ancien identifiant et mot de passe
    if (settingsOldUser.trim() !== authConfig.user || settingsOldPass !== authConfig.pass) {
      setSettingsCredsError(t.errOldCredsIncorrect);
      return;
    }

    const newUser = settingsNewUser.trim();
    if (!newUser || newUser.length < 2) {
      setSettingsCredsError(t.errNewUserEmpty);
      return;
    }

    if (!settingsNewPass || settingsNewPass.length < 4) {
      setSettingsCredsError(t.errNewPassEmpty);
      return;
    }

    const updated = { user: newUser, pass: settingsNewPass };
    setAuthConfig(updated);
    localStorage.setItem('RE_AUTH_CONFIG', JSON.stringify(updated));

    setSettingsCredsSuccess(t.successCredsUpdated);
    showToast(t.successCredsUpdated);

    // Réinitialisation des champs après succès
    setSettingsOldUser('');
    setSettingsNewUser('');
    setSettingsOldPass('');
    setSettingsNewPass('');
  };

  // ==========================================================================
  // MODALES D'AJOUT FAMILLE & PERSONNE (In-App React Popups)
  // ==========================================================================
  const [isAddFamilyModalOpen, setIsAddFamilyModalOpen] = useState(false);
  const [newFamilyInput, setNewFamilyInput] = useState('');

  // Modale d'ajout de personne / membre
  const [isAddPersonModalOpen, setIsAddPersonModalOpen] = useState(false);
  const [newPersonInput, setNewPersonInput] = useState('');
  const [personModalOrigin, setPersonModalOrigin] = useState('debit');

  // Modale du Manuel Utilisateur (FR / EN)
  const [isUserManualModalOpen, setIsUserManualModalOpen] = useState(false);
  const [manualActiveSection, setManualActiveSection] = useState('overview');

  const handleOpenAddFamily = () => {
    setNewFamilyInput('');
    setIsAddFamilyModalOpen(true);
  };

  const handleConfirmAddFamily = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    const name = newFamilyInput.trim();
    if (!name) return;

    const existing = families.find(f => f.name.toLowerCase() === name.toLowerCase());
    if (existing) {
      setDebitForm(p => ({ ...p, family: existing.name }));
      setIsAddFamilyModalOpen(false);
      setNewFamilyInput('');
      return;
    }

    const newFam = { id: 'fam_' + Date.now(), name: name };
    const updated = [...families, newFam];
    setFamilies(updated);
    setDebitForm(p => ({ ...p, family: name }));
    setIsAddFamilyModalOpen(false);
    setNewFamilyInput('');
    showToast(t.saveSuccess);
  };

  // ==========================================================================
  // ÉTAT ET GESTION DE L'ANNUAIRE DES MEMBRES
  // ==========================================================================
  const [memberSearchQuery, setMemberSearchQuery] = useState('');
  const [memberFilterPosition, setMemberFilterPosition] = useState('all');
  const [isMemberModalOpen, setIsMemberModalOpen] = useState(false);
  const [memberModalOrigin, setMemberModalOrigin] = useState('manage'); // 'manage', 'debit', 'credit'
  const [memberFormData, setMemberFormData] = useState({
    id: null,
    no: null,
    name: '',
    position: 'Group Member',
    phone: '',
    address: '',
    work: '',
    emergencyContact: '',
    emergencyPhone: ''
  });

  const distinctPositions = useMemo(() => {
    const set = new Set();
    members.forEach(m => {
      const pos = typeof m === 'object' ? m.position : 'Group Member';
      if (pos) set.add(pos);
    });
    return Array.from(set).sort();
  }, [members]);

  const filteredDisplayMembers = useMemo(() => {
    return sortedMembers.filter(m => {
      if (memberFilterPosition !== 'all' && m.position !== memberFilterPosition) return false;
      if (memberSearchQuery) {
        const q = memberSearchQuery.toLowerCase();
        const matchName = (m.name || '').toLowerCase().includes(q);
        const matchPos = (m.position || '').toLowerCase().includes(q);
        const matchPhone = (m.phone || '').toLowerCase().includes(q);
        const matchWork = (m.work || '').toLowerCase().includes(q);
        const matchAddr = (m.address || '').toLowerCase().includes(q);
        const matchEmerg = (m.emergencyContact || '').toLowerCase().includes(q) || (m.emergencyPhone || '').toLowerCase().includes(q);
        if (!matchName && !matchPos && !matchPhone && !matchWork && !matchAddr && !matchEmerg) return false;
      }
      return true;
    });
  }, [sortedMembers, memberSearchQuery, memberFilterPosition]);

  const handleOpenAddMember = (origin = 'manage') => {
    setMemberModalOrigin(origin);
    setMemberFormData({
      id: null,
      no: members.length + 1,
      name: '',
      position: 'Group Member',
      phone: '',
      address: '',
      work: '',
      emergencyContact: '',
      emergencyPhone: ''
    });
    setIsMemberModalOpen(true);
  };

  const handleOpenEditMember = (m) => {
    setMemberModalOrigin('manage');
    setMemberFormData({
      id: m.id || null,
      no: m.no || null,
      name: m.name || (typeof m === 'string' ? m : ''),
      position: m.position || 'Group Member',
      phone: m.phone || '',
      address: m.address || '',
      work: m.work || '',
      emergencyContact: m.emergencyContact || '',
      emergencyPhone: m.emergencyPhone || ''
    });
    setIsMemberModalOpen(true);
  };

  const handleSaveMember = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    const trimmedName = memberFormData.name.trim();
    if (!trimmedName) return;

    if (memberFormData.id) {
      const oldMem = members.find(m => (typeof m === 'object' && m.id === memberFormData.id) || (typeof m === 'string' && m === memberFormData.name));
      const oldName = oldMem ? (typeof oldMem === 'object' ? oldMem.name : oldMem) : '';

      setMembers(prev => prev.map(m => {
        const currentId = typeof m === 'object' ? m.id : null;
        const currentName = typeof m === 'object' ? m.name : m;
        if ((currentId && currentId === memberFormData.id) || currentName === oldName) {
          return {
            ...memberFormData,
            name: trimmedName
          };
        }
        return m;
      }));

      if (oldName && oldName !== trimmedName) {
        setTransactions(prev => prev.map(tx => tx.person === oldName ? { ...tx, person: trimmedName } : tx));
      }
      showToast(t.memberSavedSuccess || t.saveSuccess);
    } else {
      const newMem = {
        ...memberFormData,
        id: 'mem_' + Date.now(),
        no: members.length + 1,
        name: trimmedName
      };
      setMembers(prev => [...prev, newMem]);

      if (memberModalOrigin === 'debit') {
        setDebitForm(p => ({ ...p, person: trimmedName }));
      } else if (memberModalOrigin === 'credit') {
        setCreditForm(p => ({ ...p, person: trimmedName }));
      }
      showToast(t.memberSavedSuccess || t.saveSuccess);
    }

    setIsMemberModalOpen(false);
  };

  const handleDeleteMember = (memberToDelete) => {
    const memName = typeof memberToDelete === 'object' ? memberToDelete.name : memberToDelete;
    const memId = typeof memberToDelete === 'object' ? memberToDelete.id : null;
    if (confirm(t.confirmDeleteMember || `Supprimer ${memName} de l'annuaire ?`)) {
      setMembers(prev => prev.filter(m => {
        if (memId && typeof m === 'object' && m.id) return m.id !== memId;
        const n = typeof m === 'object' ? m.name : m;
        return n !== memName;
      }));
      showToast(t.memberDeletedSuccess || t.deleteSuccess);
    }
  };

  const handleOpenAddPerson = handleOpenAddMember;

  // ==========================================================================
  // ÉTAT FORMULAIRE DÉBIT (Champs 100% vierges au démarrage)
  // ==========================================================================
  const [debitForm, setDebitForm] = useState({
    id: null,
    frequency: 'daily',
    date: '',
    family: '',
    amount: '',
    person: '',
    refInvoice: '',
    remark: ''
  });

  const handleFamilyChange = (famName) => {
    setDebitForm(prev => ({
      ...prev,
      family: famName
    }));
  };

  const handleSaveDebit = (e) => {
    e.preventDefault();
    if (!debitForm.date) {
      alert(t.alertChooseDate || (lang === 'fr' ? "Veuillez choisir une date." : "Please choose a date."));
      return;
    }
    if (!debitForm.family) {
      alert(t.alertChooseFamily || (lang === 'fr' ? "Veuillez choisir ou créer une famille de dépense." : "Please select or create an expense family."));
      return;
    }
    const amt = parseFloat(debitForm.amount);
    if (isNaN(amt) || amt <= 0) {
      alert(t.alertInvalidAmount);
      return;
    }

    if (debitForm.id) {
      setTransactions(prev => prev.map(tx => {
        if (tx.id === debitForm.id) {
          return {
            ...tx,
            frequency: debitForm.frequency,
            date: debitForm.date,
            family: debitForm.family,
            amount: amt,
            person: debitForm.person ? debitForm.person.trim() : '',
            refInvoice: debitForm.refInvoice.trim(),
            remark: debitForm.remark.trim(),
            updatedAt: Date.now()
          };
        }
        return tx;
      }));
      showToast(t.saveSuccess);
    } else {
      const newTx = {
        id: 'tx_deb_' + Date.now() + '_' + Math.floor(Math.random() * 1000),
        type: 'debit',
        frequency: debitForm.frequency,
        date: debitForm.date,
        family: debitForm.family,
        amount: amt,
        person: debitForm.person ? debitForm.person.trim() : '',
        refInvoice: debitForm.refInvoice.trim(),
        remark: debitForm.remark.trim(),
        updatedAt: Date.now()
      };
      setTransactions(prev => [newTx, ...prev]);
      if ((netBalance - amt) < 0) {
        showToast(t.alertDebitNegativeNotice);
      } else {
        showToast(t.saveSuccess);
      }
    }

    setDebitForm({
      id: null,
      frequency: 'daily',
      date: '',
      family: '',
      amount: '',
      person: '',
      refInvoice: '',
      remark: ''
    });
  };

  // ==========================================================================
  // ÉTAT FORMULAIRE CRÉDIT (Champs 100% vierges au démarrage)
  // ==========================================================================
  const [creditForm, setCreditForm] = useState({
    id: null,
    frequency: 'daily',
    date: '',
    amount: '',
    reason: '',
    person: '',
    customReason: '',
    remark: ''
  });

  const handleSaveCredit = (e) => {
    e.preventDefault();
    if (!creditForm.date) {
      alert(t.alertChooseDate || (lang === 'fr' ? "Veuillez choisir une date." : "Please choose a date."));
      return;
    }
    if (!creditForm.reason) {
      alert(t.alertChooseReason || (lang === 'fr' ? "Veuillez sélectionner un motif d'encaissement." : "Please select a reason for credit."));
      return;
    }
    const amt = parseFloat(creditForm.amount);
    if (isNaN(amt) || amt <= 0) {
      alert(t.alertInvalidAmount);
      return;
    }

    const isOther = creditForm.reason === 'Autre recette' || creditForm.reason === 'Other Income';
    const finalReason = isOther
      ? (creditForm.customReason.trim() || (lang === 'fr' ? 'Autre recette' : 'Other Income'))
      : creditForm.reason;

    if (creditForm.id) {
      setTransactions(prev => prev.map(tx => {
        if (tx.id === creditForm.id) {
          return {
            ...tx,
            frequency: creditForm.frequency,
            date: creditForm.date,
            amount: amt,
            reason: finalReason,
            person: creditForm.person ? creditForm.person.trim() : '',
            remark: creditForm.remark.trim(),
            updatedAt: Date.now()
          };
        }
        return tx;
      }));
      showToast(t.saveSuccess);
    } else {
      const newTx = {
        id: 'tx_cred_' + Date.now() + '_' + Math.floor(Math.random() * 1000),
        type: 'credit',
        frequency: creditForm.frequency,
        date: creditForm.date,
        amount: amt,
        reason: finalReason,
        person: creditForm.person ? creditForm.person.trim() : '',
        remark: creditForm.remark.trim(),
        updatedAt: Date.now()
      };
      setTransactions(prev => [newTx, ...prev]);
      showToast(t.saveSuccess);
    }

    setCreditForm({
      id: null,
      frequency: 'daily',
      date: '',
      amount: '',
      reason: '',
      person: '',
      customReason: '',
      remark: ''
    });
  };

  const handleDeleteTx = (id) => {
    if (window.confirm(t.deleteConfirm)) {
      setTransactions(prev => prev.filter(tx => tx.id !== id));
      showToast(t.deleteSuccess);
    }
  };

  const handleQuickEditAmount = (tx) => {
    const input = window.prompt(t.promptQuickAmount, tx.amount);
    if (input !== null) {
      const val = parseFloat(input);
      if (!isNaN(val) && val > 0) {
        setTransactions(prev => prev.map(item => item.id === tx.id ? { ...item, amount: val, updatedAt: Date.now() } : item));
        showToast(t.saveSuccess);
      } else {
        alert(t.alertInvalidAmount);
      }
    }
  };

  // ==========================================================================
  // CALCULS KPIs GLOBAUX
  // ==========================================================================
  const totalCredits = useMemo(() => {
    return transactions.filter(tx => tx.type === 'credit').reduce((sum, tx) => sum + (Number(tx.amount) || 0), 0);
  }, [transactions]);

  const totalDebits = useMemo(() => {
    return transactions.filter(tx => tx.type === 'debit').reduce((sum, tx) => sum + (Number(tx.amount) || 0), 0);
  }, [transactions]);

  const netBalance = totalCredits - totalDebits;

  // ==========================================================================
  // HISTORIQUE CLASSE PAR DATE (LES PLUS RÉCENTES EN PREMIER)
  // ==========================================================================
  const sortedTransactions = useMemo(() => {
    return [...transactions].sort((a, b) => (b.date > a.date ? 1 : b.date < a.date ? -1 : (b.id > a.id ? 1 : -1)));
  }, [transactions]);

  const sortedDebits = useMemo(() => {
    return sortedTransactions.filter(tx => tx.type === 'debit');
  }, [sortedTransactions]);

  const sortedCredits = useMemo(() => {
    return sortedTransactions.filter(tx => tx.type === 'credit');
  }, [sortedTransactions]);

  // ==========================================================================
  // FILTRAGE STATISTIQUES GLOBAL (POUR TOUTES LES SOUS-VUES DE STATS)
  // ==========================================================================
  const [statsFilterMode, setStatsFilterMode] = useState('all'); // 'all', 'range', 'single', 'month'
  const [statsFilterDateSingle, setStatsFilterDateSingle] = useState(getTodayDateStr());
  const [statsFilterDateFrom, setStatsFilterDateFrom] = useState(() => {
    const d = new Date();
    d.setDate(1);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-01`;
  });
  const [statsFilterDateTo, setStatsFilterDateTo] = useState(getTodayDateStr());
  const [statsFilterYear, setStatsFilterYear] = useState(() => String(new Date().getFullYear()));
  const [statsFilterMonth, setStatsFilterMonth] = useState(() => String(new Date().getMonth() + 1).padStart(2, '0'));
  const [statsFilterType, setStatsFilterType] = useState('all'); // 'all', 'debit', 'credit'
  const [statsFilterFamily, setStatsFilterFamily] = useState('all');
  const [statsFilterPerson, setStatsFilterPerson] = useState('all');

  const filteredStatsTransactions = useMemo(() => {
    return transactions.filter(tx => {
      // 1. Filtrage Date
      if (statsFilterMode === 'single') {
        if (statsFilterDateSingle && tx.date !== statsFilterDateSingle) return false;
      } else if (statsFilterMode === 'range') {
        if (statsFilterDateFrom && tx.date < statsFilterDateFrom) return false;
        if (statsFilterDateTo && tx.date > statsFilterDateTo) return false;
      } else if (statsFilterMode === 'month') {
        if (statsFilterYear && !tx.date.startsWith(statsFilterYear)) return false;
        if (statsFilterMonth && statsFilterMonth !== 'all' && tx.date.substring(5, 7) !== statsFilterMonth) return false;
      }

      // 2. Filtrage Type
      if (statsFilterType !== 'all') {
        if (tx.type !== statsFilterType) return false;
      }

      // 3. Filtrage Famille
      if (statsFilterFamily !== 'all') {
        if (tx.family !== statsFilterFamily) return false;
      }

      // 4. Filtrage Personne / Membre
      if (statsFilterPerson !== 'all') {
        if (tx.person !== statsFilterPerson) return false;
      }

      return true;
    }).sort((a, b) => (b.date > a.date ? 1 : b.date < a.date ? -1 : 0));
  }, [
    transactions,
    statsFilterMode,
    statsFilterDateSingle,
    statsFilterDateFrom,
    statsFilterDateTo,
    statsFilterYear,
    statsFilterMonth,
    statsFilterType,
    statsFilterFamily,
    statsFilterPerson
  ]);

  const activeFilterDescription = useMemo(() => {
    const parts = [];
    if (statsFilterMode === 'all') {
      parts.push(lang === 'fr' ? "Tout l'historique" : "All history");
    } else if (statsFilterMode === 'single') {
      parts.push(`${lang === 'fr' ? 'Date' : 'Date'}: ${statsFilterDateSingle}`);
    } else if (statsFilterMode === 'range') {
      parts.push(`${lang === 'fr' ? 'Du' : 'From'} ${statsFilterDateFrom || '...'} ${lang === 'fr' ? 'au' : 'to'} ${statsFilterDateTo || '...'}`);
    } else if (statsFilterMode === 'month') {
      const mNamesEn = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      const mNamesFr = ["Jan", "Fév", "Mar", "Avr", "Mai", "Juin", "Juil", "Août", "Sep", "Oct", "Nov", "Déc"];
      const mLabel = statsFilterMonth === 'all'
        ? (lang === 'fr' ? 'Tous les mois' : 'All months')
        : (lang === 'fr' ? mNamesFr[parseInt(statsFilterMonth, 10) - 1] : mNamesEn[parseInt(statsFilterMonth, 10) - 1]);
      parts.push(`${mLabel} ${statsFilterYear}`);
    }

    if (statsFilterType === 'debit') parts.push(lang === 'fr' ? "Débits" : "Debits");
    if (statsFilterType === 'credit') parts.push(lang === 'fr' ? "Crédits" : "Credits");

    if (statsFilterFamily !== 'all') parts.push(`${lang === 'fr' ? 'Famille' : 'Family'}: ${statsFilterFamily}`);
    if (statsFilterPerson !== 'all') parts.push(`${lang === 'fr' ? 'Membre' : 'Member'}: ${statsFilterPerson}`);

    return parts.join(' • ');
  }, [lang, statsFilterMode, statsFilterDateSingle, statsFilterDateFrom, statsFilterDateTo, statsFilterYear, statsFilterMonth, statsFilterType, statsFilterFamily, statsFilterPerson]);

  const filteredJournalTransactions = filteredStatsTransactions;

  // ==========================================================================
  // MOTEUR D'IMPRESSION & EXPORT PDF OFFICIEL
  // ==========================================================================
  const [printDocumentData, setPrintDocumentData] = useState(null);

  const triggerOfficialPdfExport = (title, subtitle, transactionsList, chartCanvasId = null) => {
    setPrintDocumentData({
      title,
      subtitle: subtitle || `${t.pdfPeriodPrefix} ${filterDateFrom || 'Start'} ${t.toDate.toLowerCase()} ${filterDateTo || 'End'}`,
      dateGenerated: new Date().toLocaleString(lang === 'fr' ? 'fr-FR' : 'en-US'),
      transactions: transactionsList,
      totalCredits: transactionsList.filter(tx => tx.type === 'credit').reduce((s, tx) => s + (Number(tx.amount) || 0), 0),
      totalDebits: transactionsList.filter(tx => tx.type === 'debit').reduce((s, tx) => s + (Number(tx.amount) || 0), 0),
      chartImageUri: chartCanvasId && document.getElementById(chartCanvasId) ? document.getElementById(chartCanvasId).toDataURL('image/png') : null
    });

    setTimeout(() => {
      if (window.AndroidNative && typeof window.AndroidNative.printPdf === 'function') {
        window.AndroidNative.printPdf(title);
      } else {
        window.print();
      }
    }, 300);
  };

  const handleShare = (channel, summaryText) => {
    const text = encodeURIComponent(summaryText || `${t.appTitle}\n${t.balance}: ${formatUSD(netBalance)}\n${t.totalCredits}: ${formatUSD(totalCredits)}\n${t.totalDebits}: ${formatUSD(totalDebits)}`);
    if (channel === 'whatsapp') {
      window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
    } else if (channel === 'telegram') {
      window.open(`https://t.me/share/url?url=${encodeURIComponent(window.location.href)}&text=${text}`, '_blank');
    } else if (channel === 'mail') {
      window.open(`mailto:?subject=${encodeURIComponent(t.appTitle)}&body=${text}`, '_blank');
    }
  };

  // ==========================================================================
  // SAUVEGARDE ZIP
  // ==========================================================================
  const [zipDateFrom, setZipDateFrom] = useState('');
  const [zipDateTo, setZipDateTo] = useState('');

  const generateNativeZipBlob = (files) => {
    const encoder = new TextEncoder();
    const parts = [];
    const centralDirectory = [];
    let offset = 0;

    const crcTable = new Uint32Array(256);
    for (let n = 0; n < 256; n++) {
      let c = n;
      for (let k = 0; k < 8; k++) {
        c = ((c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1));
      }
      crcTable[n] = c;
    }

    function crc32(buf) {
      let c = 0xFFFFFFFF;
      for (let i = 0; i < buf.length; i++) {
        c = crcTable[(c ^ buf[i]) & 0xFF] ^ (c >>> 8);
      }
      return (c ^ 0xFFFFFFFF) >>> 0;
    }

    files.forEach(f => {
      const data = encoder.encode(f.content);
      const nameBytes = encoder.encode(f.name);
      const fileCrc = crc32(data);
      const size = data.length;

      const lfh = new Uint8Array(30 + nameBytes.length);
      const lfhView = new DataView(lfh.buffer);
      lfhView.setUint32(0, 0x04034b50, true);
      lfhView.setUint16(4, 20, true);
      lfhView.setUint16(6, 0, true);
      lfhView.setUint16(8, 0, true);
      lfhView.setUint16(10, 0, true);
      lfhView.setUint16(12, 0, true);
      lfhView.setUint32(14, fileCrc, true);
      lfhView.setUint32(18, size, true);
      lfhView.setUint32(22, size, true);
      lfhView.setUint16(26, nameBytes.length, true);
      lfhView.setUint16(28, 0, true);
      lfh.set(nameBytes, 30);

      parts.push(lfh);
      parts.push(data);

      const cdh = new Uint8Array(46 + nameBytes.length);
      const cdhView = new DataView(cdh.buffer);
      cdhView.setUint32(0, 0x02014b50, true);
      cdhView.setUint16(4, 20, true);
      cdhView.setUint16(6, 20, true);
      cdhView.setUint16(8, 0, true);
      cdhView.setUint16(10, 0, true);
      cdhView.setUint16(12, 0, true);
      cdhView.setUint16(14, 0, true);
      cdhView.setUint32(16, fileCrc, true);
      cdhView.setUint32(20, size, true);
      cdhView.setUint32(24, size, true);
      cdhView.setUint16(28, nameBytes.length, true);
      cdhView.setUint16(30, 0, true);
      cdhView.setUint16(32, 0, true);
      cdhView.setUint16(34, 0, true);
      cdhView.setUint16(36, 0, true);
      cdhView.setUint32(38, 0, true);
      cdhView.setUint32(42, offset, true);
      cdh.set(nameBytes, 46);

      centralDirectory.push(cdh);
      offset += lfh.length + data.length;
    });

    const cdOffset = offset;
    let cdSize = 0;
    centralDirectory.forEach(cd => { cdSize += cd.length; parts.push(cd); });

    const eocd = new Uint8Array(22);
    const eocdView = new DataView(eocd.buffer);
    eocdView.setUint32(0, 0x06054b50, true);
    eocdView.setUint16(4, 0, true);
    eocdView.setUint16(6, 0, true);
    eocdView.setUint16(8, files.length, true);
    eocdView.setUint16(10, files.length, true);
    eocdView.setUint32(12, cdSize, true);
    eocdView.setUint32(16, cdOffset, true);
    eocdView.setUint16(20, 0, true);
    parts.push(eocd);

    return new Blob(parts, { type: 'application/zip' });
  };

  const handleExportZip = () => {
    const txToSave = transactions.filter(tx => {
      if (zipDateFrom && tx.date < zipDateFrom) return false;
      if (zipDateTo && tx.date > zipDateTo) return false;
      return true;
    });

    const backupPayload = {
      app: "TREASURER'S REPORT",
      version: "2.0",
      foundation: "THE FRATERNAL ORDER OF LADY EAGLES GROUP",
      exportDate: new Date().toISOString(),
      dateRange: { from: zipDateFrom || 'All', to: zipDateTo || 'All' },
      transactionsCount: txToSave.length,
      transactions: txToSave,
      families: families,
      members: members
    };

    const miniHtmlReport = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>${t.appTitle} - Backup</title>
  <style>
    body { font-family: sans-serif; padding: 20px; color: #1e293b; }
    h1 { color: #1e3a8a; }
    table { width: 100%; border-collapse: collapse; margin-top: 15px; }
    th, td { border: 1px solid #cbd5e1; padding: 8px 12px; text-align: left; }
    th { background: #f1f5f9; }
    .credit { color: #16a34a; font-weight: bold; }
    .debit { color: #dc2626; font-weight: bold; }
  </style>
</head>
<body>
  <h1>THE FRATERNAL ORDER OF LADY EAGLES GROUP - ${t.appTitle}</h1>
  <p>${t.pdfGeneratedOn} ${new Date().toLocaleDateString()} | ${t.period}: ${zipDateFrom || 'Start'} ${t.toDate.toLowerCase()} ${zipDateTo || 'End'}</p>
  <table>
    <thead><tr><th>${t.date}</th><th>${t.type}</th><th>${t.pdfFamCol}</th><th>${t.pdfRefCol}</th><th>${t.amount}</th></tr></thead>
    <tbody>
      ${txToSave.map(tItem => `<tr><td>${tItem.date}</td><td>${tItem.type.toUpperCase()}</td><td>${tItem.family || ''} ${tItem.reason || ''}</td><td>${tItem.refInvoice || ''}</td><td class="${tItem.type}">$ ${Number(tItem.amount).toFixed(2)}</td></tr>`).join('')}
    </tbody>
  </table>
</body>
</html>`;

    const files = [
      { name: 'RachelEagles_Data.json', content: JSON.stringify(backupPayload, null, 2) },
      { name: 'Rapport_Synthese.html', content: miniHtmlReport }
    ];

    const blob = generateNativeZipBlob(files);
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    const fromStr = zipDateFrom ? zipDateFrom : 'start';
    const toStr = zipDateTo ? zipDateTo : 'end';
    a.href = url;
    a.download = `RachelEagles_Sauvegarde_${fromStr}_to_${toStr}.zip`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast(t.zipSuccess);
  };

  const handleRestoreFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const content = event.target.result;
        const data = JSON.parse(content);
        if (data && data.transactions) {
          if (window.confirm(`Restaurer ${data.transactions.length} transaction(s) ?`)) {
            setTransactions(data.transactions);
            if (data.families) setFamilies(data.families);
            if (data.members && Array.isArray(data.members)) setMembers(data.members);
            showToast(t.restoredSuccess);
          }
        } else {
          alert("Fichier JSON non valide.");
        }
      } catch (err) {
        alert("Fichier non reconnu.");
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  // ==========================================================================
  // SYNCHRONISATION WI-FI & RÉSEAU LOCAL
  // ==========================================================================
  const handleSyncWithServer = async () => {
    setSyncStatus('syncing');
    setSyncMessage(t.syncInProgress);
    const host = serverHost.trim() || 'localhost';
    const port = 8085;
    const url = `http://${host}:${port}/api/state`;

    try {
      const getRes = await fetch(url, { method: 'GET', headers: { 'Accept': 'application/json' } });
      if (!getRes.ok) throw new Error("Status " + getRes.status);
      const remoteData = await getRes.json();

      let mergedTx = [...transactions];
      if (remoteData && remoteData.transactions && Array.isArray(remoteData.transactions)) {
        const map = new Map();
        transactions.forEach(tx => map.set(tx.id, tx));
        remoteData.transactions.forEach(rt => {
          if (!map.has(rt.id)) {
            map.set(rt.id, rt);
          } else {
            const local = map.get(rt.id);
            if ((rt.updatedAt || 0) > (local.updatedAt || 0)) {
              map.set(rt.id, rt);
            }
          }
        });
        mergedTx = Array.from(map.values());
      }

      let mergedFamilies = families;
      if (remoteData && remoteData.families && Array.isArray(remoteData.families)) {
        mergedFamilies = remoteData.families;
      }

      let mergedMembers = members;
      if (remoteData && remoteData.members && Array.isArray(remoteData.members)) {
        mergedMembers = remoteData.members;
      }

      setTransactions(mergedTx);
      setFamilies(mergedFamilies);
      setMembers(mergedMembers);

      const stateToPush = {
        app: "RachelEagles",
        lastSync: new Date().toISOString(),
        transactions: mergedTx,
        families: mergedFamilies,
        members: mergedMembers
      };

      await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(stateToPush)
      });

      setSyncStatus('success');
      setSyncMessage(t.syncSuccess);
      showToast(t.syncSuccess);
    } catch (err) {
      setSyncStatus('error');
      setSyncMessage(t.syncError);
    }
  };

  // ==========================================================================
  // RENDU ÉCRAN DE CONNEXION (AVEC VUE DU MOT DE PASSE & MOT DE PASSE OUBLIÉ)
  // ==========================================================================
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900 p-4 relative overflow-hidden">
        <div className="watermark-bg" style={{ opacity: 0.12, filter: 'invert(1)' }}></div>

        <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 sm:p-8 relative z-10 border border-slate-100">
          {/* SELECTEUR DE LANGUE SUR L'ECRAN DE CONNEXION (ANGLAIS PAR DEFAUT) */}
          <div className="flex justify-between items-center mb-4 pb-2 border-b border-slate-100">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              {lang === 'en' ? 'Language' : 'Langue'}
            </span>
            <div className="inline-flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-300">
              <button
                type="button"
                onClick={() => { setLang('en'); localStorage.setItem('RE_LANG', 'en'); }}
                className={`px-2.5 py-0.5 text-xs font-bold rounded transition ${lang === 'en' ? 'bg-blue-900 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'}`}
              >
                English
              </button>
              <button
                type="button"
                onClick={() => { setLang('fr'); localStorage.setItem('RE_LANG', 'fr'); }}
                className={`px-2.5 py-0.5 text-xs font-bold rounded transition ${lang === 'fr' ? 'bg-blue-900 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'}`}
              >
                Français
              </button>
            </div>
          </div>

          <div className="text-center mb-6">
            <div className="flex justify-center items-center gap-3 mb-3">
              <img src="logo1.png" alt="Eagles Logo" className="w-16 h-16 object-contain" />
              <img src="logo2.png" alt="Philippine Eagles" className="w-16 h-16 object-contain" />
              <img src="logo3.png" alt="Sargo Eagles" className="w-16 h-16 object-contain" />
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-blue-900 tracking-tight leading-tight uppercase">TREASURER'S REPORT</h1>
            <h2 className="text-xs sm:text-sm font-black text-slate-800 tracking-wider uppercase mt-1">THE FRATERNAL ORDER OF LADY EAGLES GROUP</h2>
            <p className="text-xs uppercase font-extrabold tracking-widest text-amber-600 mt-1">Financial Record</p>
            <p className="text-xs sm:text-sm text-slate-500 mt-2">{t.loginDesc}</p>
          </div>

          {loginErrorMsg && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg flex items-center gap-2">
              <i className="fa-solid fa-triangle-exclamation"></i>
              <span>{loginErrorMsg}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase text-slate-600 mb-1">{t.username}</label>
              <div className="relative">
                <i className="fa-solid fa-user absolute left-3 top-3.5 text-slate-400 text-sm"></i>
                <input
                  type="text"
                  required
                  value={loginUser}
                  onChange={(e) => setLoginUser(e.target.value)}
                  className="w-full pl-10 pr-3 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  placeholder={lang === 'fr' ? "ex: tresorier" : "e.g.: treasurer"}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="block text-xs font-bold uppercase text-slate-600">{t.password}</label>
                {/* LIEN MOT DE PASSE OUBLIÉ */}
                <button
                  type="button"
                  onClick={() => {
                    setIsForgotModalOpen(true);
                    setForgotStep(1);
                    setResetErrorMsg('');
                    setResetSuccessMsg('');
                  }}
                  className="text-xs text-blue-700 hover:text-blue-900 font-bold hover:underline"
                >
                  {t.forgotPassword}
                </button>
              </div>

              {/* CHAMP MOT DE PASSE AVEC ICÔNE OEIL (AFFICHER / MASQUER) */}
              <div className="relative">
                <i className="fa-solid fa-lock absolute left-3 top-3.5 text-slate-400 text-sm"></i>
                <input
                  type={showLoginPassword ? "text" : "password"}
                  required
                  value={loginPass}
                  onChange={(e) => setLoginPass(e.target.value)}
                  className="w-full pl-10 pr-10 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowLoginPassword(p => !p)}
                  className="absolute right-3 top-3 text-slate-400 hover:text-slate-600 focus:outline-none"
                  title={showLoginPassword ? t.hidePassword : t.showPassword}
                >
                  <i className={`fa-solid ${showLoginPassword ? 'fa-eye-slash text-blue-700' : 'fa-eye'}`}></i>
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center gap-2 text-slate-600 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded text-blue-600 focus:ring-blue-500"
                />
                <span>{t.rememberMe}</span>
              </label>

              {/* SÉLECTEUR DE LANGUE RAPIDE */}
              <button
                type="button"
                onClick={toggleLang}
                className="text-blue-700 font-bold hover:underline flex items-center gap-1"
                title="Switch Language"
              >
                <i className="fa-solid fa-globe"></i>
                <span>{lang.toUpperCase()}</span>
              </button>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-blue-800 hover:bg-blue-900 text-white font-bold rounded-lg shadow-md transition transform active:scale-95 flex items-center justify-center gap-2"
            >
              <i className="fa-solid fa-right-to-bracket"></i>
              <span>{t.btnLogin}</span>
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-slate-100 text-center">
            <span className="text-xs text-slate-400">{t.defaultCredsHint}</span>
          </div>
        </div>

        {/* MODAL DE RÉCUPÉRATION DE MOT DE PASSE (VIA EMAIL AFAMCHERIE & ERICVEYRAT) */}
        {isForgotModalOpen && (
          <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 border border-slate-200 relative fade-in">
              <div className="flex justify-between items-center border-b border-slate-100 pb-3 mb-4">
                <h3 className="font-extrabold text-slate-800 text-base flex items-center gap-2">
                  <i className="fa-solid fa-shield-halved text-amber-600"></i>
                  <span>{t.recoveryTitle}</span>
                </h3>
                <button
                  onClick={() => setIsForgotModalOpen(false)}
                  className="text-slate-400 hover:text-slate-600 text-lg"
                >
                  &times;
                </button>
              </div>

              {resetErrorMsg && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-lg flex items-center gap-2">
                  <i className="fa-solid fa-triangle-exclamation"></i>
                  <span>{resetErrorMsg}</span>
                </div>
              )}

              {resetSuccessMsg && (
                <div className="mb-4 p-3 bg-green-50 border border-green-200 text-green-700 text-xs rounded-lg flex items-center gap-2">
                  <i className="fa-solid fa-circle-check"></i>
                  <span>{resetSuccessMsg}</span>
                </div>
              )}

              {/* ÉTAPE 1 : ENVOI DU CODE SUR LES 2 EMAILS */}
              {forgotStep === 1 && (
                <div className="space-y-4">
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {t.recoveryEmailsNotice}
                  </p>

                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-1.5 font-mono text-xs">
                    <div className="flex items-center gap-2 text-blue-900 font-bold">
                      <i className="fa-solid fa-envelope text-blue-700"></i>
                      <span>Afamcherie@gmail.com</span>
                    </div>
                    <div className="flex items-center gap-2 text-blue-900 font-bold">
                      <i className="fa-solid fa-envelope text-blue-700"></i>
                      <span>ericveyrat.iphone@gmail.com</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleTriggerEmailReset}
                    className="w-full py-3 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-xl text-sm shadow-md flex items-center justify-center gap-2 transition"
                  >
                    <i className="fa-solid fa-paper-plane"></i>
                    <span>{t.btnSendEmailCode}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setForgotStep(2)}
                    className="w-full text-center text-xs text-slate-500 hover:text-slate-800 underline font-semibold"
                  >
                    J'ai déjà un code de vérification &rsaquo;
                  </button>
                </div>
              )}

              {/* ÉTAPE 2 : SAISIE DU CODE & NOUVEAU MOT DE PASSE */}
              {forgotStep === 2 && (
                <form onSubmit={handleConfirmNewPassword} className="space-y-4">
                  <div className="p-2.5 bg-blue-50 border border-blue-200 rounded-lg text-[11px] text-blue-900">
                    <i className="fa-solid fa-circle-info mr-1.5 text-blue-700"></i>
                    <span>Code envoyé vers : <b>Afamcherie@gmail.com</b> & <b>ericveyrat.iphone@gmail.com</b></span>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-600 mb-1">
                      {t.enterCodeLabel}
                    </label>
                    <input
                      type="text"
                      required
                      value={resetCodeInput}
                      onChange={(e) => setResetCodeInput(e.target.value)}
                      placeholder={t.codePlaceholder}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm font-mono tracking-widest text-center font-bold text-blue-900 focus:ring-2 focus:ring-blue-600 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-600 mb-1">
                      {t.newPasswordLabel}
                    </label>
                    <div className="relative">
                      <input
                        type={showNewPassword ? "text" : "password"}
                        required
                        value={newPasswordInput}
                        onChange={(e) => setNewPasswordInput(e.target.value)}
                        placeholder="••••••••"
                        className="w-full pl-3 pr-10 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none"
                      />
                      <button
                        type="button"
                        onClick={() => setShowNewPassword(p => !p)}
                        className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600"
                        title={showNewPassword ? t.hidePassword : t.showPassword}
                      >
                        <i className={`fa-solid ${showNewPassword ? 'fa-eye-slash text-blue-700' : 'fa-eye'}`}></i>
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-600 mb-1">
                      {t.confirmPasswordLabel}
                    </label>
                    <div className="relative">
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        required
                        value={confirmPasswordInput}
                        onChange={(e) => setConfirmPasswordInput(e.target.value)}
                        placeholder="••••••••"
                        className="w-full pl-3 pr-10 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(p => !p)}
                        className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600"
                        title={showConfirmPassword ? t.hidePassword : t.showPassword}
                      >
                        <i className={`fa-solid ${showConfirmPassword ? 'fa-eye-slash text-blue-700' : 'fa-eye'}`}></i>
                      </button>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setForgotStep(1)}
                      className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-lg text-xs"
                    >
                      &lsaquo; {t.btnBackToLogin}
                    </button>
                    <button
                      type="submit"
                      className="flex-1 py-2 bg-blue-800 hover:bg-blue-900 text-white font-bold rounded-lg text-xs shadow-md"
                    >
                      {t.btnConfirmReset}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }

  // ==========================================================================
  // RENDU PRINCIPAL DE L'APPLICATION CONNECTÉE
  // ==========================================================================
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 watermark-container">
      <div className="watermark-bg"></div>

      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3 fade-in border border-slate-700">
          <i className="fa-solid fa-circle-check text-green-400 text-lg"></i>
          <span className="text-sm font-semibold">{toastMessage}</span>
        </div>
      )}

            {/* MODAL NOUVELLE FAMILLE */}
      {isAddFamilyModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm fade-in">
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl border border-slate-200 overflow-hidden transform transition-all">
            <div className="bg-blue-900 text-white p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <i className="fa-solid fa-folder-plus text-amber-400 text-lg"></i>
                <h3 className="font-bold text-base">{t.modalNewFamilyTitle}</h3>
              </div>
              <button
                type="button"
                onClick={() => setIsAddFamilyModalOpen(false)}
                className="text-white/70 hover:text-white p-1 rounded-lg"
              >
                <i className="fa-solid fa-xmark text-lg"></i>
              </button>
            </div>

            <form onSubmit={handleConfirmAddFamily} className="p-5 space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 mb-1.5">
                  {t.modalFamilyNameLabel}
                </label>
                <input
                  type="text"
                  autoFocus
                  required
                  value={newFamilyInput}
                  onChange={(e) => setNewFamilyInput(e.target.value)}
                  placeholder={t.inputFamilyPlaceholder}
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-semibold focus:ring-2 focus:ring-blue-800 focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddFamilyModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs sm:text-sm transition"
                >
                  {t.btnCancel}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-800 hover:bg-blue-900 text-white font-bold rounded-xl text-xs sm:text-sm shadow-md transition flex items-center gap-1.5"
                >
                  <i className="fa-solid fa-check"></i>
                  <span>{t.btnAddConfirm}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}


      {/* MODAL MEMBRE DU CLUB (AJOUT & MODIFICATION) */}
      {isMemberModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm fade-in overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden transform transition-all my-8">
            <div className="bg-blue-900 text-white p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <i className={`fa-solid ${memberFormData.id ? 'fa-user-pen' : 'fa-user-plus'} text-amber-400 text-lg`}></i>
                <h3 className="font-bold text-base">
                  {memberFormData.id ? (t.modalEditMemberTitle || "Modifier le Membre") : (t.modalNewMemberTitle || "Ajouter un Membre")}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsMemberModalOpen(false)}
                className="text-white/70 hover:text-white p-1 rounded-lg"
              >
                <i className="fa-solid fa-xmark text-lg"></i>
              </button>
            </div>

            <form onSubmit={handleSaveMember} className="p-5 space-y-3.5 max-h-[80vh] overflow-y-auto">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 mb-1">
                  {t.memberNameLabel || "Nom complet (avec titre) :"} *
                </label>
                <input
                  type="text"
                  autoFocus
                  required
                  value={memberFormData.name}
                  onChange={(e) => setMemberFormData(p => ({ ...p, name: e.target.value }))}
                  placeholder="ex: Eagle VILMA ARDINA R."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-sm font-semibold focus:ring-2 focus:ring-blue-800 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-600 mb-1">
                    {t.memberPositionLabel || "Fonction / Rôle :"}
                  </label>
                  <input
                    type="text"
                    list="positions-datalist"
                    value={memberFormData.position}
                    onChange={(e) => setMemberFormData(p => ({ ...p, position: e.target.value }))}
                    placeholder="ex: Group President"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-blue-800 focus:outline-none"
                  />
                  <datalist id="positions-datalist">
                    <option value="Group President" />
                    <option value="Group Vice President" />
                    <option value="Group Secretary" />
                    <option value="Group Treasurer" />
                    <option value="Group Auditor" />
                    <option value="Group Information Officer" />
                    <option value="Group Protocol Officer" />
                    <option value="Group Peace officer" />
                    <option value="Group Grievance Chair" />
                    <option value="Group C.A.R.E Chairwoman" />
                    <option value="Group Board of Director" />
                    <option value="Group Member" />
                  </datalist>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-600 mb-1">
                    {t.memberPhoneLabel || "Téléphone (Cambodge) :"}
                  </label>
                  <input
                    type="tel"
                    value={memberFormData.phone}
                    onChange={(e) => setMemberFormData(p => ({ ...p, phone: e.target.value }))}
                    placeholder="ex: 092499323"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-blue-800 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 mb-1">
                  {t.memberWorkLabel || "Nature du Travail / Métier :"}
                </label>
                <input
                  type="text"
                  value={memberFormData.work}
                  onChange={(e) => setMemberFormData(p => ({ ...p, work: e.target.value }))}
                  placeholder="ex: GARMENT INDUSTRY (QA of FAM BRAND), EDUCATION..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-blue-800 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 mb-1">
                  {t.memberAddressLabel || "Adresse au Cambodge :"}
                </label>
                <input
                  type="text"
                  value={memberFormData.address}
                  onChange={(e) => setMemberFormData(p => ({ ...p, address: e.target.value }))}
                  placeholder="ex: Borey Piphop Thmey 2, Veng Sreng Road, Phnom Penh"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-blue-800 focus:outline-none"
                />
              </div>

              <div className="p-3 bg-amber-50/70 border border-amber-200 rounded-xl space-y-2.5">
                <div className="flex items-center gap-1.5 text-xs font-bold text-amber-900 uppercase">
                  <i className="fa-solid fa-truck-medical text-amber-600"></i>
                  <span>{lang === 'fr' ? 'Coordonnées en cas d’urgence' : 'Emergency Contact Information'}</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-0.5">
                      {t.memberEmergencyLabel || "Nom du contact :"}
                    </label>
                    <input
                      type="text"
                      value={memberFormData.emergencyContact}
                      onChange={(e) => setMemberFormData(p => ({ ...p, emergencyContact: e.target.value }))}
                      placeholder="Nom du proche"
                      className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-blue-800 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-0.5">
                      {t.memberEmergencyPhoneLabel || "Téléphone d'urgence :"}
                    </label>
                    <input
                      type="tel"
                      value={memberFormData.emergencyPhone}
                      onChange={(e) => setMemberFormData(p => ({ ...p, emergencyPhone: e.target.value }))}
                      placeholder="(855) 97... / (639) 90..."
                      className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-blue-800 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsMemberModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs sm:text-sm transition"
                >
                  {t.btnCancel}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-800 hover:bg-blue-900 text-white font-bold rounded-xl text-xs sm:text-sm shadow-md transition flex items-center gap-1.5"
                >
                  <i className="fa-solid fa-check"></i>
                  <span>{memberFormData.id ? t.btnUpdate : t.btnSave}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODALE DU MANUEL UTILISATEUR OFFICIEL (FR / EN) */}
      {isUserManualModalOpen && (
        <UserManualModalComponent
          lang={lang}
          setLang={setLang}
          onClose={() => setIsUserManualModalOpen(false)}
        />
      )}

      {/* HEADER OFFICIEL */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-2.5 flex items-center justify-between gap-4">
          
          <div className="flex items-center gap-2.5">
            <div className="flex items-center gap-1.5 sm:gap-2">
              {bannerLogosConfig.showLogo1 && (
                <img src="logo1.png" alt="Philippine Eagles Emblem" className="h-10 w-10 sm:h-12 sm:w-12 object-contain" title="Philippine Eagles Emblem" />
              )}
              {bannerLogosConfig.showLogo2 && (
                <img src="logo2.png" alt="Fraternal Order of Eagles Seal" className="h-10 w-10 sm:h-12 sm:w-12 object-contain" title="Fraternal Order of Eagles Seal" />
              )}
              {bannerLogosConfig.showLogo3 && (
                <img src="logo3.png" alt="Sargo Cambodia Eagles" className="h-10 w-10 sm:h-12 sm:w-12 object-contain" title="Sargo Cambodia Eagles" />
              )}
            </div>
            <div className="hidden sm:block leading-tight">
              <h1 className="text-xs sm:text-sm font-black text-blue-900 tracking-tight uppercase">TREASURER'S REPORT</h1>
              <p className="text-[10px] font-black uppercase text-slate-800 tracking-wider">THE FRATERNAL ORDER OF LADY EAGLES GROUP</p>
              <p className="text-[9px] font-extrabold uppercase text-amber-600 tracking-widest">Financial Record</p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={handleSyncWithServer}
              title={t.btnSyncNow}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition ${
                syncStatus === 'syncing' ? 'bg-amber-100 text-amber-800 animate-pulse' :
                syncStatus === 'success' ? 'bg-green-100 text-green-800' :
                syncStatus === 'error' ? 'bg-red-100 text-red-800' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <i className={`fa-solid fa-rotate ${syncStatus === 'syncing' ? 'fa-spin' : ''}`}></i>
              <span className="hidden md:inline">{t.btnSyncNow}</span>
            </button>

            {/* SÉLECTEUR DE LANGUE RAPIDE */}
            <button
              onClick={toggleLang}
              className="px-2 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-black text-xs rounded-md border border-slate-300 flex items-center gap-1"
              title="Toggle English / Français"
            >
              <i className="fa-solid fa-globe text-blue-700"></i>
              <span>{lang.toUpperCase()}</span>
            </button>

            {/* BOUTON D'INFORMATION / MANUEL UTILISATEUR (i) */}
            <button
              onClick={() => setIsUserManualModalOpen(true)}
              className="px-2 py-1 bg-amber-50 hover:bg-amber-100 text-amber-900 font-bold text-xs rounded-md border border-amber-300 flex items-center gap-1.5 transition shadow-xs"
              title={lang === 'fr' ? "Manuel d'Utilisation & Guide (i)" : "User Manual & Guide (i)"}
            >
              <i className="fa-solid fa-circle-info text-amber-600 text-sm"></i>
              <span className="hidden sm:inline font-black">{lang === 'fr' ? 'INFO' : 'INFO'}</span>
            </button>

            <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
              <span className="text-xs text-slate-600 font-semibold hidden lg:inline">
                {t.roleTreasurer}
              </span>
              <button
                onClick={handleLogout}
                className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                title={t.logout}
              >
                <i className="fa-solid fa-power-off"></i>
              </button>
            </div>
          </div>
        </div>

        {/* NAVIGATION DES ONGLETS */}
        <nav className="bg-blue-900 text-white px-4 overflow-x-auto shadow-inner">
          <div className="max-w-7xl mx-auto flex items-center gap-1 sm:gap-2 text-xs sm:text-sm font-semibold whitespace-nowrap">
            <button
              onClick={() => setCurrentTab('dashboard')}
              className={`py-2.5 px-3 border-b-2 flex items-center gap-2 transition ${
                currentTab === 'dashboard' ? 'border-amber-400 text-white bg-blue-950/40' : 'border-transparent text-blue-200 hover:text-white'
              }`}
            >
              <i className="fa-solid fa-house"></i>
              <span>{t.navDashboard}</span>
            </button>

            <button
              onClick={() => setCurrentTab('debits')}
              className={`py-2.5 px-3 border-b-2 flex items-center gap-2 transition ${
                currentTab === 'debits' ? 'border-amber-400 text-white bg-blue-950/40' : 'border-transparent text-blue-200 hover:text-white'
              }`}
            >
              <i className="fa-solid fa-arrow-trend-down text-red-400"></i>
              <span>{t.navDebits}</span>
            </button>

            <button
              onClick={() => setCurrentTab('credits')}
              className={`py-2.5 px-3 border-b-2 flex items-center gap-2 transition ${
                currentTab === 'credits' ? 'border-amber-400 text-white bg-blue-950/40' : 'border-transparent text-blue-200 hover:text-white'
              }`}
            >
              <i className="fa-solid fa-arrow-trend-up text-green-400"></i>
              <span>{t.navCredits}</span>
            </button>

            <button
              onClick={() => setCurrentTab('categories')}
              className={`py-2.5 px-3 border-b-2 flex items-center gap-2 transition ${
                currentTab === 'categories' ? 'border-amber-400 text-white bg-blue-950/40' : 'border-transparent text-blue-200 hover:text-white'
              }`}
            >
              <i className="fa-solid fa-folder-tree text-amber-300"></i>
              <span>{t.navFamilies || "Familles"}</span>
            </button>

            <button
              onClick={() => setCurrentTab('members')}
              className={`py-2.5 px-3 border-b-2 flex items-center gap-2 transition ${
                currentTab === 'members' ? 'border-amber-400 text-white bg-blue-950/40' : 'border-transparent text-blue-200 hover:text-white'
              }`}
            >
              <i className="fa-solid fa-users text-purple-300"></i>
              <span>{t.navMembers || "Membres"}</span>
              <span className="ml-0.5 text-[10px] bg-purple-900/80 text-purple-200 px-1.5 py-0.5 rounded-full font-bold">
                {members.length}
              </span>
            </button>

            <button
              onClick={() => setCurrentTab('stats')}
              className={`py-2.5 px-3 border-b-2 flex items-center gap-2 transition ${
                currentTab === 'stats' ? 'border-amber-400 text-white bg-blue-950/40' : 'border-transparent text-blue-200 hover:text-white'
              }`}
            >
              <i className="fa-solid fa-chart-pie text-cyan-300"></i>
              <span>{t.navStats}</span>
            </button>

            <button
              onClick={() => setCurrentTab('backup')}
              className={`py-2.5 px-3 border-b-2 flex items-center gap-2 transition ${
                currentTab === 'backup' ? 'border-amber-400 text-white bg-blue-950/40' : 'border-transparent text-blue-200 hover:text-white'
              }`}
            >
              <i className="fa-solid fa-file-zipper text-emerald-300"></i>
              <span>{t.navBackup}</span>
            </button>

            <button
              onClick={() => setCurrentTab('settings')}
              className={`py-2.5 px-3 border-b-2 flex items-center gap-2 transition ${
                currentTab === 'settings' ? 'border-amber-400 text-white bg-blue-950/40' : 'border-transparent text-blue-200 hover:text-white'
              }`}
            >
              <i className="fa-solid fa-gear"></i>
              <span>{t.navSettings}</span>
            </button>
          </div>
        </nav>
      </header>

      {/* CONTENU PRINCIPAL */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 relative z-10">
        
        {/* ==================================================================== */}
        {/* ONGLET 1 : TABLEAU DE BORD (DASHBOARD) */}
        {/* ==================================================================== */}
        {currentTab === 'dashboard' && (
          <div className="space-y-6 fade-in">
            {/* ALERTE SOLDE NÉGATIF */}
            {netBalance < 0 && (
              <div className="p-4 bg-gradient-to-r from-red-600 to-rose-700 text-white rounded-2xl shadow-lg flex items-center gap-3.5 border-2 border-red-500 animate-pulse">
                <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0 text-2xl text-white">
                  <i className="fa-solid fa-triangle-exclamation"></i>
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h4 className="font-extrabold text-sm sm:text-base tracking-wide uppercase flex items-center gap-2">
                      <span>{t.alertNegativeBalanceTitle}</span>
                    </h4>
                    <span className="text-xs font-black bg-white text-red-700 px-3 py-1 rounded-full shadow-sm">
                      {formatUSD(netBalance)}
                    </span>
                  </div>
                  <p className="text-xs text-red-100 mt-1 leading-relaxed">
                    {t.alertNegativeBalanceDesc}
                  </p>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-500">{t.totalCredits}</p>
                  <p className="text-2xl font-black text-green-700 mt-1">{formatUSD(totalCredits)}</p>
                  <p className="text-[11px] text-slate-400 mt-1">{t.cumulCredits}</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center text-green-600 text-xl">
                  <i className="fa-solid fa-arrow-down-left"></i>
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-500">{t.totalDebits}</p>
                  <p className="text-2xl font-black text-red-600 mt-1">{formatUSD(totalDebits)}</p>
                  <p className="text-[11px] text-slate-400 mt-1">{t.cumulDebits}</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center text-red-600 text-xl">
                  <i className="fa-solid fa-arrow-up-right"></i>
                </div>
              </div>

              <div className={`p-5 rounded-2xl border shadow-sm flex items-center justify-between ${netBalance < 0 ? 'bg-red-50/60 border-red-300' : 'bg-white border-slate-200'}`}>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-500">{t.balance}</p>
                    {netBalance < 0 && (
                      <span className="px-1.5 py-0.5 rounded text-[10px] font-black uppercase bg-red-600 text-white animate-pulse">
                        {lang === 'fr' ? 'Déficit' : 'Deficit'}
                      </span>
                    )}
                  </div>
                  <p className={`text-2xl font-black mt-1 ${netBalance >= 0 ? 'text-blue-900' : 'text-red-700'}`}>
                    {formatUSD(netBalance)}
                  </p>
                  <p className="text-[11px] text-slate-400 mt-1">{t.cashAvailable}</p>
                </div>
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl ${netBalance >= 0 ? 'bg-blue-50 text-blue-800' : 'bg-red-100 text-red-700'}`}>
                  <i className="fa-solid fa-vault"></i>
                </div>
              </div>
            </div>

            {/* BOUTONS D'ACCÈS RAPIDE */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentTab('debits')}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl text-xs sm:text-sm flex items-center gap-2 shadow-sm transition"
                >
                  <i className="fa-solid fa-plus-circle"></i>
                  <span>{t.btnNewDebit}</span>
                </button>
                <button
                  onClick={() => setCurrentTab('credits')}
                  className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl text-xs sm:text-sm flex items-center gap-2 shadow-sm transition"
                >
                  <i className="fa-solid fa-plus-circle"></i>
                  <span>{t.btnNewCredit}</span>
                </button>
                <button
                  onClick={() => setCurrentTab('stats')}
                  className="px-4 py-2 bg-blue-800 hover:bg-blue-900 text-white font-bold rounded-xl text-xs sm:text-sm flex items-center gap-2 shadow-sm transition"
                >
                  <i className="fa-solid fa-chart-column"></i>
                  <span>{t.btnViewStats}</span>
                </button>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400 font-bold hidden sm:inline">{t.shareColon}</span>
                <button
                  onClick={() => handleShare('telegram')}
                  className="p-2 bg-sky-50 text-sky-700 hover:bg-sky-100 rounded-lg text-sm"
                  title={t.btnShareTelegram}
                >
                  <i className="fa-brands fa-telegram text-base"></i>
                </button>
                <button
                  onClick={() => handleShare('whatsapp')}
                  className="p-2 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 rounded-lg text-sm"
                  title={t.btnShareWhatsApp}
                >
                  <i className="fa-brands fa-whatsapp text-base"></i>
                </button>
                <button
                  onClick={() => handleShare('mail')}
                  className="p-2 bg-slate-100 text-slate-700 hover:bg-slate-200 rounded-lg text-sm"
                  title={t.btnShareMail}
                >
                  <i className="fa-solid fa-envelope text-base"></i>
                </button>
              </div>
            </div>

            {/* DERNIÈRES OPÉRATIONS RÉCENTES */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="p-4 border-b border-slate-200 flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
                  <i className="fa-solid fa-clock-rotate-left text-blue-700"></i>
                  <span>{t.recentTransactions}</span>
                </h3>
                <span className="text-xs text-slate-400">{transactions.length}</span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left table-compact">
                  <thead>
                    <tr>
                      <th className="whitespace-nowrap">{t.colDate || t.date}</th>
                      <th className="w-28 text-center whitespace-nowrap">{t.colType || t.type}</th>
                      <th>{t.colFamilyCategory || t.pdfFamCol}</th>
                      <th className="whitespace-nowrap">{t.colRef || t.refInvoice}</th>
                      <th>{t.colRemark || t.remark}</th>
                      <th className="text-right whitespace-nowrap">{t.colAmount || t.amount}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sortedTransactions.slice(0, 10).map(tx => (
                      <tr key={tx.id}>
                        <td className="font-semibold text-slate-700 whitespace-nowrap">{tx.date}</td>
                        <td className="w-28 text-center whitespace-nowrap">
                          <span className={`inline-flex items-center justify-center min-w-[78px] px-2.5 py-0.5 rounded-full text-xs font-bold tracking-wide shadow-sm ${tx.type === 'credit' ? 'badge-credit' : 'badge-debit'}`}>
                            {tx.type === 'credit' ? `+ ${t.credit}` : `- ${t.debit}`}
                          </span>
                        </td>
                        <td className="font-medium text-slate-800">
                          {tx.type === 'debit' ? (
                            <div>
                              <div>{formatItemLabel(tx.family, lang)}</div>
                              {tx.person && (
                                <div className="text-[11px] text-blue-800 font-semibold mt-0.5 flex items-center gap-1">
                                  <i className="fa-solid fa-user text-[9px] text-slate-400"></i>
                                  <span>{tx.person}</span>
                                </div>
                              )}
                            </div>
                          ) : (
                            <div>
                              <div>{formatItemLabel(tx.reason, lang)}</div>
                              {tx.person && (
                                <div className="text-[11px] text-green-800 font-semibold mt-0.5 flex items-center gap-1">
                                  <i className="fa-solid fa-user text-[9px] text-slate-400"></i>
                                  <span>{tx.person}</span>
                                </div>
                              )}
                            </div>
                          )}
                        </td>
                        <td className="text-slate-500 text-xs whitespace-nowrap">{tx.refInvoice || '-'}</td>
                        <td className="text-slate-500 text-xs italic">{tx.remark || '-'}</td>
                        <td className={`text-right font-black whitespace-nowrap ${tx.type === 'credit' ? 'text-green-700' : 'text-red-600'}`}>
                          {formatUSD(tx.amount)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ==================================================================== */}
        {/* ONGLET 2 : SAISIE DES DÉBITS */}
        {/* ==================================================================== */}
        {currentTab === 'debits' && (
          <div className="space-y-6 fade-in">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between mb-5 pb-3 border-b border-slate-100">
                <h2 className="text-lg font-bold text-red-700 flex items-center gap-2">
                  <i className="fa-solid fa-receipt"></i>
                  <span>{debitForm.id ? t.editDebitTitle : t.newDebitTitle}</span>
                </h2>
                {debitForm.id && (
                  <span className="bg-amber-100 text-amber-800 text-xs font-bold px-2.5 py-1 rounded-full">
                    {t.editMode}
                  </span>
                )}
              </div>

              <form onSubmit={handleSaveDebit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-600 mb-1.5">{t.frequency}</label>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => setDebitForm(p => ({ ...p, frequency: 'daily' }))}
                        className={`flex-1 py-2 text-xs font-bold rounded-lg border transition ${
                          debitForm.frequency === 'daily' ? 'bg-red-600 text-white border-red-600 shadow-sm' : 'bg-slate-50 text-slate-700 border-slate-200'
                        }`}
                      >
                        <i className="fa-solid fa-calendar-day mr-1.5"></i>
                        {t.daily}
                      </button>
                      <button
                        type="button"
                        onClick={() => setDebitForm(p => ({ ...p, frequency: 'monthly' }))}
                        className={`flex-1 py-2 text-xs font-bold rounded-lg border transition ${
                          debitForm.frequency === 'monthly' ? 'bg-red-600 text-white border-red-600 shadow-sm' : 'bg-slate-50 text-slate-700 border-slate-200'
                        }`}
                      >
                        <i className="fa-solid fa-calendar-days mr-1.5"></i>
                        {t.monthly}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-600 mb-1.5">{t.date}</label>
                    <BilingualDatePicker
                      value={debitForm.date}
                      onChange={(newDate) => setDebitForm(p => ({ ...p, date: newDate }))}
                      required
                      lang={lang}
                      accentColor="red"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <div className="flex justify-between items-center mb-1.5">
                      <label className="text-xs font-bold uppercase text-slate-600">{t.family} *</label>
                      <button
                        type="button"
                        onClick={handleOpenAddFamily}
                        className="text-[11px] text-blue-700 hover:underline font-bold flex items-center gap-1"
                      >
                        <i className="fa-solid fa-plus text-[10px]"></i>
                        <span>{t.btnAddFamily}</span>
                      </button>
                    </div>
                    <select
                      value={debitForm.family}
                      onChange={(e) => handleFamilyChange(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-red-600 focus:outline-none"
                    >
                      <option value="">{t.selectFamilyPlaceholder}</option>
                      {sortedFamilies.map(f => (
                        <option key={f.id} value={f.name}>{formatItemLabel(f.name, lang)}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-600 mb-1.5">{t.amount} *</label>
                    <div className="relative">
                      <span className="absolute left-3 top-2.5 font-bold text-slate-400 text-sm">$</span>
                      <input
                        type="number"
                        step="0.01"
                        min="0.01"
                        required
                        value={debitForm.amount}
                        onChange={(e) => setDebitForm(p => ({ ...p, amount: e.target.value }))}
                        placeholder="0.00"
                        className="w-full pl-8 pr-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm font-bold text-red-700 focus:ring-2 focus:ring-red-600 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <div className="flex justify-between items-center mb-1.5">
                      <label className="text-xs font-bold uppercase text-slate-600">
                        {t.colPerson} <span className="text-slate-400 font-normal lowercase">({t.optional})</span>
                      </label>
                      <button
                        type="button"
                        onClick={() => handleOpenAddMember('debit')}
                        className="text-[11px] text-blue-700 hover:underline font-bold flex items-center gap-1"
                      >
                        <i className="fa-solid fa-plus text-[10px]"></i>
                        <span>{t.btnAddMember || t.btnAddPerson}</span>
                      </button>
                    </div>
                    <select
                      value={debitForm.person}
                      onChange={(e) => setDebitForm(p => ({ ...p, person: e.target.value }))}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-red-600 focus:outline-none"
                    >
                      <option value="">{t.selectPersonPlaceholder}</option>
                      {sortedMembers.map((m, idx) => (
                        <option key={m.id || idx} value={m.name || m}>
                          {m.name || m} {m.position ? `(${m.position})` : ''}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-600 mb-1.5">{t.refInvoice}</label>
                    <input
                      type="text"
                      value={debitForm.refInvoice}
                      onChange={(e) => setDebitForm(p => ({ ...p, refInvoice: e.target.value }))}
                      placeholder={t.placeholderInvoice}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-red-600 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-600 mb-1.5">{t.remark}</label>
                  <input
                    type="text"
                    value={debitForm.remark}
                    onChange={(e) => setDebitForm(p => ({ ...p, remark: e.target.value }))}
                    placeholder={t.placeholderRemark}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-red-600 focus:outline-none"
                  />
                </div>

                <div className="flex items-center gap-3 pt-3">
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl text-sm shadow-md transition flex items-center gap-2"
                  >
                    <i className="fa-solid fa-check"></i>
                    <span>{debitForm.id ? t.btnUpdate : t.btnSave}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setDebitForm({
                      id: null,
                      frequency: 'daily',
                      date: '',
                      family: '',
                      amount: '',
                      person: '',
                      refInvoice: '',
                      remark: ''
                    })}
                    className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl text-sm transition"
                  >
                    {t.btnClear}
                  </button>
                </div>
              </form>
            </div>

            {/* LISTE DES DÉBITS */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="p-4 border-b border-slate-200 flex justify-between items-center">
                <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">
                  {t.recentDebits}
                </h3>
                <span className="text-xs text-red-700 font-bold">
                  {t.totalDebits} : {formatUSD(transactions.filter(tx => tx.type === 'debit').reduce((s, tx) => s + (Number(tx.amount) || 0), 0))}
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left table-compact">
                  <thead>
                    <tr>
                      <th className="whitespace-nowrap">{t.colDate || t.date}</th>
                      <th className="whitespace-nowrap text-center">{t.colFrequency || t.frequency}</th>
                      <th>{t.colFamily || t.family}</th>
                      <th className="whitespace-nowrap">{t.colPerson}</th>
                      <th className="whitespace-nowrap">{t.colRef || t.refInvoice}</th>
                      <th>{t.colRemark || t.remark}</th>
                      <th className="text-right whitespace-nowrap">{t.colAmount || t.amount}</th>
                      <th className="text-center whitespace-nowrap">{t.colActions || t.actions}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sortedDebits.map(tx => (
                      <tr key={tx.id}>
                        <td className="font-semibold text-slate-700 whitespace-nowrap">{tx.date}</td>
                        <td className="text-xs uppercase text-slate-500 whitespace-nowrap text-center font-bold">
                          <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                            {tx.frequency === 'monthly' ? t.monthly : t.daily}
                          </span>
                        </td>
                        <td className="font-bold text-slate-800">{formatItemLabel(tx.family, lang)}</td>
                        <td className="text-xs font-semibold text-slate-700 whitespace-nowrap">
                          {tx.person ? (
                            <span className="inline-flex items-center gap-1 text-blue-900 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-100 font-medium">
                              <i className="fa-solid fa-user text-[10px] text-blue-600"></i>
                              {tx.person}
                            </span>
                          ) : (
                            <span className="text-slate-400">-</span>
                          )}
                        </td>
                        <td className="text-xs text-slate-500 whitespace-nowrap">{tx.refInvoice || '-'}</td>
                        <td className="text-xs text-slate-500 italic">{tx.remark || '-'}</td>
                        <td className="text-right font-black text-red-600 whitespace-nowrap">{formatUSD(tx.amount)}</td>
                        <td className="text-center whitespace-nowrap">
                          <button
                            onClick={() => {
                              setDebitForm({
                                id: tx.id,
                                frequency: tx.frequency || 'daily',
                                date: tx.date,
                                family: tx.family,
                                amount: tx.amount,
                                person: tx.person || '',
                                refInvoice: tx.refInvoice || '',
                                remark: tx.remark || ''
                              });
                              window.scrollTo({ top: 0, behavior: 'smooth' });
                            }}
                            className="p-1.5 text-blue-700 hover:bg-blue-50 rounded-md text-xs font-bold mr-1"
                            title={t.btnEdit}
                          >
                            <i className="fa-solid fa-pen-to-square"></i>
                          </button>
                          <button
                            onClick={() => handleDeleteTx(tx.id)}
                            className="p-1.5 text-red-600 hover:bg-red-50 rounded-md text-xs font-bold"
                            title={t.btnDelete}
                          >
                            <i className="fa-solid fa-trash-can"></i>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ==================================================================== */}
        {/* ONGLET 3 : SAISIE DES CRÉDITS */}
        {/* ==================================================================== */}
        {currentTab === 'credits' && (
          <div className="space-y-6 fade-in">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between mb-5 pb-3 border-b border-slate-100">
                <h2 className="text-lg font-bold text-green-700 flex items-center gap-2">
                  <i className="fa-solid fa-hand-holding-dollar"></i>
                  <span>{creditForm.id ? t.editCreditTitle : t.newCreditTitle}</span>
                </h2>
                {creditForm.id && (
                  <span className="bg-amber-100 text-amber-800 text-xs font-bold px-2.5 py-1 rounded-full">
                    {t.editMode}
                  </span>
                )}
              </div>

              <form onSubmit={handleSaveCredit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-600 mb-1.5">{t.frequency}</label>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => setCreditForm(p => ({ ...p, frequency: 'daily' }))}
                        className={`flex-1 py-2 text-xs font-bold rounded-lg border transition ${
                          creditForm.frequency === 'daily' ? 'bg-green-600 text-white border-green-600 shadow-sm' : 'bg-slate-50 text-slate-700 border-slate-200'
                        }`}
                      >
                        <i className="fa-solid fa-calendar-day mr-1.5"></i>
                        {t.daily}
                      </button>
                      <button
                        type="button"
                        onClick={() => setCreditForm(p => ({ ...p, frequency: 'monthly' }))}
                        className={`flex-1 py-2 text-xs font-bold rounded-lg border transition ${
                          creditForm.frequency === 'monthly' ? 'bg-green-600 text-white border-green-600 shadow-sm' : 'bg-slate-50 text-slate-700 border-slate-200'
                        }`}
                      >
                        <i className="fa-solid fa-calendar-days mr-1.5"></i>
                        {t.monthly}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-600 mb-1.5">{t.date}</label>
                    <BilingualDatePicker
                      value={creditForm.date}
                      onChange={(newDate) => setCreditForm(p => ({ ...p, date: newDate }))}
                      required
                      lang={lang}
                      accentColor="green"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-600 mb-1.5">{t.amount} *</label>
                    <div className="relative">
                      <span className="absolute left-3 top-2.5 font-bold text-slate-400 text-sm">$</span>
                      <input
                        type="number"
                        step="0.01"
                        min="0.01"
                        required
                        value={creditForm.amount}
                        onChange={(e) => setCreditForm(p => ({ ...p, amount: e.target.value }))}
                        placeholder="0.00"
                        className="w-full pl-8 pr-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm font-bold text-green-700 focus:ring-2 focus:ring-green-600 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-600 mb-1.5">{t.reasonCredit}</label>
                    <select
                      value={creditForm.reason}
                      onChange={(e) => setCreditForm(p => ({ ...p, reason: e.target.value }))}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-green-600 focus:outline-none"
                    >
                      <option value="">{t.selectReasonPlaceholder || (lang === 'fr' ? '-- Choisir un motif --' : '-- Select Reason --')}</option>
                      {t.reasons.map((r, i) => (
                        <option key={i} value={r}>{r}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {(creditForm.reason === 'Autre recette' || creditForm.reason === 'Other Income') && (
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-600 mb-1.5">{t.customReasonLabel}</label>
                    <input
                      type="text"
                      required
                      value={creditForm.customReason}
                      onChange={(e) => setCreditForm(p => ({ ...p, customReason: e.target.value }))}
                      placeholder={t.customReasonPlaceholder}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-green-600 focus:outline-none"
                    />
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <div className="flex justify-between items-center mb-1.5">
                      <label className="text-xs font-bold uppercase text-slate-600">
                        {t.colPerson} <span className="text-slate-400 font-normal lowercase">({t.optional})</span>
                      </label>
                      <button
                        type="button"
                        onClick={() => handleOpenAddMember('credit')}
                        className="text-[11px] text-blue-700 hover:underline font-bold flex items-center gap-1"
                      >
                        <i className="fa-solid fa-plus text-[10px]"></i>
                        <span>{t.btnAddMember || t.btnAddPerson}</span>
                      </button>
                    </div>
                    <select
                      value={creditForm.person}
                      onChange={(e) => setCreditForm(p => ({ ...p, person: e.target.value }))}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-green-600 focus:outline-none"
                    >
                      <option value="">{t.selectPersonPlaceholder}</option>
                      {sortedMembers.map((m, idx) => (
                        <option key={m.id || idx} value={m.name || m}>
                          {m.name || m} {m.position ? `(${m.position})` : ''}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-600 mb-1.5">{t.remark}</label>
                    <input
                      type="text"
                      value={creditForm.remark}
                      onChange={(e) => setCreditForm(p => ({ ...p, remark: e.target.value }))}
                      placeholder={t.placeholderRemark}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-green-600 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-3">
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl text-sm shadow-md transition flex items-center gap-2"
                  >
                    <i className="fa-solid fa-check"></i>
                    <span>{creditForm.id ? t.btnUpdate : t.btnSave}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setCreditForm({
                      id: null,
                      frequency: 'daily',
                      date: '',
                      amount: '',
                      reason: '',
                      person: '',
                      customReason: '',
                      remark: ''
                    })}
                    className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl text-sm transition"
                  >
                    {t.btnClear}
                  </button>
                </div>
              </form>
            </div>

            {/* LISTE DES CRÉDITS */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="p-4 border-b border-slate-200 flex justify-between items-center">
                <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">
                  {t.recentCredits}
                </h3>
                <span className="text-xs text-green-700 font-bold">
                  {t.totalCredits} : {formatUSD(transactions.filter(tx => tx.type === 'credit').reduce((s, tx) => s + (Number(tx.amount) || 0), 0))}
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left table-compact">
                  <thead>
                    <tr>
                      <th className="whitespace-nowrap">{t.colDate || t.date}</th>
                      <th className="whitespace-nowrap text-center">{t.colFrequency || t.frequency}</th>
                      <th>{t.colReason || t.reasonCredit}</th>
                      <th className="whitespace-nowrap">{t.colPerson}</th>
                      <th>{t.colRemark || t.remark}</th>
                      <th className="text-right whitespace-nowrap">{t.colAmount || t.amount}</th>
                      <th className="text-center whitespace-nowrap">{t.colActions || t.actions}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sortedCredits.map(tx => (
                      <tr key={tx.id}>
                        <td className="font-semibold text-slate-700 whitespace-nowrap">{tx.date}</td>
                        <td className="text-xs uppercase text-slate-500 whitespace-nowrap text-center font-bold">
                          <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                            {tx.frequency === 'monthly' ? t.monthly : t.daily}
                          </span>
                        </td>
                        <td className="font-bold text-slate-800">{formatItemLabel(tx.reason, lang)}</td>
                        <td className="text-xs font-semibold text-slate-700 whitespace-nowrap">
                          {tx.person ? (
                            <span className="inline-flex items-center gap-1 text-green-900 bg-green-50 px-2 py-0.5 rounded-md border border-green-100 font-medium">
                              <i className="fa-solid fa-user text-[10px] text-green-600"></i>
                              {tx.person}
                            </span>
                          ) : (
                            <span className="text-slate-400">-</span>
                          )}
                        </td>
                        <td className="text-xs text-slate-500 italic">{tx.remark || '-'}</td>
                        <td className="text-right font-black text-green-700 whitespace-nowrap">{formatUSD(tx.amount)}</td>
                        <td className="text-center whitespace-nowrap">
                          <button
                            onClick={() => {
                              setCreditForm({
                                id: tx.id,
                                frequency: tx.frequency || 'daily',
                                date: tx.date,
                                amount: tx.amount,
                                reason: tx.reason,
                                person: tx.person || '',
                                customReason: '',
                                remark: tx.remark || ''
                              });
                              window.scrollTo({ top: 0, behavior: 'smooth' });
                            }}
                            className="p-1.5 text-blue-700 hover:bg-blue-50 rounded-md text-xs font-bold mr-1"
                            title={t.btnEdit}
                          >
                            <i className="fa-solid fa-pen-to-square"></i>
                          </button>
                          <button
                            onClick={() => handleDeleteTx(tx.id)}
                            className="p-1.5 text-red-600 hover:bg-red-50 rounded-md text-xs font-bold"
                            title={t.btnDelete}
                          >
                            <i className="fa-solid fa-trash-can"></i>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ==================================================================== */}
        {/* ONGLET 4 : GESTION DES FAMILLES */}
        {/* ==================================================================== */}
        {currentTab === 'categories' && (
          <div className="space-y-6 fade-in">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                  <i className="fa-solid fa-folder-tree text-amber-600"></i>
                  <span>{t.navFamilies || "Familles"}</span>
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  {lang === 'fr'
                    ? "Gérez les 7 familles budgétaires officielles de RachelEagles classées par ordre alphabétique."
                    : "Manage RachelEagles 7 official budgetary families sorted in alphabetical order."}
                </p>
              </div>

              <button
                type="button"
                onClick={handleOpenAddFamily}
                className="px-4 py-2 bg-blue-800 hover:bg-blue-900 text-white font-bold rounded-xl text-xs sm:text-sm flex items-center gap-2 shadow-sm"
              >
                <i className="fa-solid fa-plus"></i>
                <span>{t.btnAddFamily}</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {sortedFamilies.map(fam => {
                const famDebits = transactions.filter(tx => tx.type === 'debit' && tx.family === fam.name);
                const famTotal = famDebits.reduce((sum, tx) => sum + (Number(tx.amount) || 0), 0);
                return (
                  <div key={fam.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-amber-500"></span>
                        <h3 className="font-extrabold text-slate-800 text-base">{formatItemLabel(fam.name, lang)}</h3>
                      </div>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => {
                            const n = prompt(t.promptRenameFamily, formatItemLabel(fam.name, lang));
                            if (n && n.trim() && n.trim() !== fam.name) {
                              setFamilies(prev => prev.map(f => f.id === fam.id ? { ...f, name: n.trim() } : f));
                              setTransactions(prev => prev.map(tx => tx.family === fam.name ? { ...tx, family: n.trim() } : tx));
                            }
                          }}
                          className="p-1.5 text-slate-400 hover:text-blue-700 rounded-md"
                          title={t.btnRenameFamily}
                        >
                          <i className="fa-solid fa-pen text-xs"></i>
                        </button>
                        <button
                          onClick={() => {
                            if (confirm(t.confirmDeleteFamily)) {
                              setFamilies(prev => prev.filter(f => f.id !== fam.id));
                            }
                          }}
                          className="p-1.5 text-slate-400 hover:text-red-600 rounded-md"
                          title={t.btnDeleteFamily}
                        >
                          <i className="fa-solid fa-trash-can text-xs"></i>
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-xs text-slate-600">
                      <span>{famDebits.length} {lang === 'fr' ? 'écriture(s)' : 'transaction(s)'}</span>
                      <span className="font-bold text-red-600">{formatUSD(famTotal)}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ==================================================================== */}
        {/* ONGLET 5 : ANNUAIRE & GESTION DÉDIÉE DES MEMBRES */}
        {/* ==================================================================== */}
        {currentTab === 'members' && (
          <div className="space-y-6 fade-in">
            {/* EN-TÊTE PRINCIPAL */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-wrap items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-800 flex items-center justify-center font-bold text-lg">
                    <i className="fa-solid fa-users"></i>
                  </div>
                  <div>
                    <h2 className="text-lg font-extrabold text-slate-800">
                      {t.membersTitle || "Annuaire Officiel des Membres"}
                    </h2>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {t.membersSubtitle || "Gérez les membres du club, coordonnées, postes et contacts d'urgence."}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <button
                  type="button"
                  onClick={() => handleOpenAddMember('manage')}
                  className="px-4 py-2.5 bg-blue-800 hover:bg-blue-900 text-white font-bold rounded-xl text-xs sm:text-sm flex items-center gap-2 shadow-sm transition"
                >
                  <i className="fa-solid fa-user-plus"></i>
                  <span>{t.btnAddMember || "+ Ajouter un Membre"}</span>
                </button>
              </div>
            </div>

            {/* STATISTIQUES DES MEMBRES */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs text-center">
                <span className="text-[11px] font-bold uppercase text-slate-500">{lang === 'fr' ? 'Total Membres' : 'Total Members'}</span>
                <p className="text-xl font-black text-blue-900 mt-0.5">{members.length}</p>
              </div>
              <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs text-center">
                <span className="text-[11px] font-bold uppercase text-amber-700">{lang === 'fr' ? 'Direction / Bureau' : 'Executive Board'}</span>
                <p className="text-xl font-black text-amber-700 mt-0.5">
                  {members.filter(m => (m.position || '').includes('President') || (m.position || '').includes('Treasurer') || (m.position || '').includes('Secretary') || (m.position || '').includes('Auditor')).length}
                </p>
              </div>
              <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs text-center">
                <span className="text-[11px] font-bold uppercase text-purple-700">{lang === 'fr' ? 'Officiers & Chaires' : 'Officers & Chairs'}</span>
                <p className="text-xl font-black text-purple-700 mt-0.5">
                  {members.filter(m => (m.position || '').includes('Officer') || (m.position || '').includes('Chair') || (m.position || '').includes('Director')).length}
                </p>
              </div>
              <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs text-center">
                <span className="text-[11px] font-bold uppercase text-slate-600">{lang === 'fr' ? 'Membres Adhérents' : 'General Members'}</span>
                <p className="text-xl font-black text-slate-700 mt-0.5">
                  {members.filter(m => !(m.position || '').includes('President') && !(m.position || '').includes('Treasurer') && !(m.position || '').includes('Secretary') && !(m.position || '').includes('Auditor') && !(m.position || '').includes('Officer') && !(m.position || '').includes('Chair') && !(m.position || '').includes('Director')).length}
                </p>
              </div>
            </div>

            {/* RECHERCHE ET FILTRE */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-wrap items-center justify-between gap-3">
              <div className="relative flex-1 min-w-[220px]">
                <i className="fa-solid fa-magnifying-glass absolute left-3 top-3 text-slate-400 text-xs"></i>
                <input
                  type="text"
                  value={memberSearchQuery}
                  onChange={(e) => setMemberSearchQuery(e.target.value)}
                  placeholder={t.searchMembersPlaceholder || "Rechercher par nom, fonction, téléphone, métier, adresse..."}
                  className="w-full pl-9 pr-8 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm font-semibold focus:ring-2 focus:ring-blue-800 focus:outline-none"
                />
                {memberSearchQuery && (
                  <button
                    onClick={() => setMemberSearchQuery('')}
                    className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 text-xs"
                  >
                    <i className="fa-solid fa-circle-xmark"></i>
                  </button>
                )}
              </div>

              <div className="flex items-center gap-2 text-xs">
                <label className="font-bold text-slate-600 whitespace-nowrap">{t.filterPositionLabel || "Fonction :"}</label>
                <select
                  value={memberFilterPosition}
                  onChange={(e) => setMemberFilterPosition(e.target.value)}
                  className="px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold text-slate-800 focus:outline-none"
                >
                  <option value="all">{t.filterAllPositions || "Toutes les fonctions"}</option>
                  {distinctPositions.map((pos, idx) => (
                    <option key={idx} value={pos}>{pos}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* GRILLE DES CARTES DE MEMBRES */}
            {filteredDisplayMembers.length === 0 ? (
              <div className="bg-white p-8 rounded-2xl border border-slate-200 text-center text-slate-500 space-y-2">
                <i className="fa-solid fa-users-slash text-3xl text-slate-300"></i>
                <p className="text-sm font-semibold">{t.noMembersFound || "Aucun membre ne correspond à vos critères de recherche."}</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredDisplayMembers.map(m => (
                  <div key={m.id || m.name} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition space-y-3 flex flex-col justify-between">
                    <div>
                      {/* Header with badge and name */}
                      <div className="flex items-start justify-between gap-3 border-b border-slate-100 pb-3">
                        <div className="flex items-center gap-3">
                          <div className={`w-11 h-11 rounded-xl flex items-center justify-center font-black text-sm shadow-sm flex-shrink-0 ${
                            m.position?.includes('President') ? 'bg-amber-100 text-amber-800 border border-amber-300' :
                            m.position?.includes('Treasurer') ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' :
                            m.position?.includes('Secretary') ? 'bg-blue-100 text-blue-800 border border-blue-300' :
                            m.position?.includes('Auditor') ? 'bg-cyan-100 text-cyan-800 border border-cyan-300' :
                            m.position?.includes('Director') ? 'bg-purple-100 text-purple-800 border border-purple-300' :
                            m.position?.includes('Officer') || m.position?.includes('Chair') ? 'bg-indigo-100 text-indigo-800 border border-indigo-300' :
                            'bg-slate-100 text-slate-700 border border-slate-200'
                          }`}>
                            {m.no ? `#${m.no}` : <i className="fa-solid fa-user"></i>}
                          </div>
                          <div>
                            <h3 className="font-extrabold text-slate-900 text-sm leading-snug">{m.name}</h3>
                            <span className={`inline-block mt-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                              m.position?.includes('President') ? 'bg-amber-50 text-amber-800 border border-amber-200' :
                              m.position?.includes('Treasurer') ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' :
                              m.position?.includes('Secretary') ? 'bg-blue-50 text-blue-800 border border-blue-200' :
                              m.position?.includes('Auditor') ? 'bg-cyan-50 text-cyan-800 border border-cyan-200' :
                              m.position?.includes('Director') ? 'bg-purple-50 text-purple-800 border border-purple-200' :
                              m.position?.includes('Officer') || m.position?.includes('Chair') ? 'bg-indigo-50 text-indigo-800 border border-indigo-200' :
                              'bg-slate-100 text-slate-600 border border-slate-200'
                            }`}>
                              {m.position || 'Group Member'}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Details */}
                      <div className="pt-3 space-y-2 text-xs text-slate-600">
                        {m.phone && (
                          <div className="flex items-center gap-2">
                            <i className="fa-solid fa-phone text-slate-400 w-4 text-center"></i>
                            <a href={`tel:${m.phone}`} className="font-semibold text-blue-700 hover:underline">
                              {m.phone}
                            </a>
                          </div>
                        )}

                        {m.work && (
                          <div className="flex items-start gap-2">
                            <i className="fa-solid fa-briefcase text-slate-400 w-4 text-center mt-0.5 flex-shrink-0"></i>
                            <span className="font-medium text-slate-700">{m.work}</span>
                          </div>
                        )}

                        {m.address && (
                          <div className="flex items-start gap-2">
                            <i className="fa-solid fa-location-dot text-slate-400 w-4 text-center mt-0.5 flex-shrink-0"></i>
                            <span className="text-slate-500 line-clamp-2">{m.address}</span>
                          </div>
                        )}

                        {(m.emergencyContact || m.emergencyPhone) && (
                          <div className="p-2.5 bg-amber-50/70 rounded-xl border border-amber-100 text-[11px] text-amber-950 mt-2 space-y-0.5">
                            <div className="font-bold flex items-center gap-1.5 text-amber-900">
                              <i className="fa-solid fa-truck-medical text-amber-600 text-[10px]"></i>
                              <span>{lang === 'fr' ? 'En cas d’urgence :' : 'In Case of Emergency:'}</span>
                            </div>
                            {m.emergencyContact && <div className="text-slate-700 font-medium">{m.emergencyContact}</div>}
                            {m.emergencyPhone && <div className="font-bold text-red-700">{m.emergencyPhone}</div>}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Actions footer */}
                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-[11px] text-slate-400">
                        {transactions.filter(tx => tx.person === m.name).length} {lang === 'fr' ? 'écriture(s)' : 'transaction(s)'}
                      </span>
                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => handleOpenEditMember(m)}
                          className="px-2.5 py-1 text-xs bg-slate-100 hover:bg-blue-50 hover:text-blue-700 text-slate-700 font-bold rounded-lg transition flex items-center gap-1"
                          title={t.btnEdit}
                        >
                          <i className="fa-solid fa-pen text-[10px]"></i>
                          <span>{t.btnEdit}</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteMember(m)}
                          className="px-2.5 py-1 text-xs bg-slate-100 hover:bg-red-50 hover:text-red-600 text-slate-700 font-bold rounded-lg transition flex items-center gap-1"
                          title={t.btnDelete}
                        >
                          <i className="fa-solid fa-trash-can text-[10px]"></i>
                          <span>{t.btnDelete}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ==================================================================== */}
        {/* ONGLET 5 : MODULE STATISTIQUES */}
        {/* ==================================================================== */}
        {currentTab === 'stats' && (
          <div className="space-y-6 fade-in">
            <div className="bg-white p-3 rounded-2xl border border-slate-200 shadow-sm flex flex-wrap gap-2">
              {[
                { id: 'view1', label: t.statView1, icon: 'fa-table-list' },
                { id: 'view2', label: t.statView2, icon: 'fa-chart-pie' },
                { id: 'view3', label: t.statView3, icon: 'fa-layer-group' },
                { id: 'view5', label: t.statView4, icon: 'fa-sliders' },
                { id: 'view6', label: t.statView5, icon: 'fa-chart-line' }
              ].map(v => (
                <button
                  key={v.id}
                  onClick={() => setStatSubView(v.id)}
                  className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition ${
                    statSubView === v.id
                      ? 'bg-blue-900 text-white shadow-md'
                      : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <i className={`fa-solid ${v.icon}`}></i>
                  <span>{v.label}</span>
                </button>
              ))}
            </div>

            {/* BARRE DE FILTRAGE UNIFIEE DU MODULE STATISTIQUES */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-3 pb-2.5 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <i className="fa-solid fa-filter text-amber-600"></i>
                  <span className="text-xs font-black uppercase text-slate-700 tracking-wider">
                    {t.statsFilterTitle}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  {(statsFilterMode !== 'all' || statsFilterType !== 'all' || statsFilterFamily !== 'all' || statsFilterPerson !== 'all') && (
                    <button
                      type="button"
                      onClick={() => {
                        setStatsFilterMode('all');
                        setStatsFilterType('all');
                        setStatsFilterFamily('all');
                        setStatsFilterPerson('all');
                      }}
                      className="text-xs text-red-600 hover:text-red-800 font-bold flex items-center gap-1 transition"
                    >
                      <i className="fa-solid fa-rotate-left text-[11px]"></i>
                      <span>{t.btnResetStatsFilters}</span>
                    </button>
                  )}
                  
                  <button
                    type="button"
                    onClick={() => {
                      triggerOfficialPdfExport(
                        `${t.navStats} - ${statSubView === 'view1' ? t.statView1 : statSubView === 'view2' ? t.statView2 : statSubView === 'view3' ? t.statView3 : statSubView === 'view5' ? t.statView4 : t.statView5}`,
                        `${t.activeFilterBadge} ${activeFilterDescription}`,
                        filteredStatsTransactions,
                        statSubView === 'view2' ? 'chart-view2-bar' : statSubView === 'view3' ? 'chart-view3-fam' : null
                      );
                    }}
                    className="px-3.5 py-1.5 bg-red-700 hover:bg-red-800 text-white font-bold rounded-lg text-xs flex items-center gap-1.5 shadow-sm transition"
                    title={t.btnExportPdf}
                  >
                    <i className="fa-solid fa-file-pdf"></i>
                    <span>{t.btnExportPdf}</span>
                  </button>
                </div>
              </div>

              {/* LIGNE 1 : SÉLECTEUR DE MODE DE PÉRIODE */}
              <div className="flex flex-wrap items-center gap-2.5">
                <div className="flex rounded-lg border border-slate-300 p-0.5 bg-slate-50 text-xs font-bold">
                  <button
                    type="button"
                    onClick={() => setStatsFilterMode('all')}
                    className={`px-3 py-1.5 rounded-md transition ${statsFilterMode === 'all' ? 'bg-blue-900 text-white shadow-xs font-black' : 'text-slate-600 hover:text-slate-900'}`}
                  >
                    {t.filterModeAll}
                  </button>
                  <button
                    type="button"
                    onClick={() => setStatsFilterMode('range')}
                    className={`px-3 py-1.5 rounded-md transition ${statsFilterMode === 'range' ? 'bg-blue-900 text-white shadow-xs font-black' : 'text-slate-600 hover:text-slate-900'}`}
                  >
                    {t.filterModeRange}
                  </button>
                  <button
                    type="button"
                    onClick={() => setStatsFilterMode('single')}
                    className={`px-3 py-1.5 rounded-md transition ${statsFilterMode === 'single' ? 'bg-blue-900 text-white shadow-xs font-black' : 'text-slate-600 hover:text-slate-900'}`}
                  >
                    {t.filterModeSingle}
                  </button>
                  <button
                    type="button"
                    onClick={() => setStatsFilterMode('month')}
                    className={`px-3 py-1.5 rounded-md transition ${statsFilterMode === 'month' ? 'bg-blue-900 text-white shadow-xs font-black' : 'text-slate-600 hover:text-slate-900'}`}
                  >
                    {t.filterModeMonth}
                  </button>
                </div>

                {/* SÉLECTEURS DE DATE DYNAMIQUES SELON LE MODE */}
                {statsFilterMode === 'range' && (
                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    <label className="text-slate-500 font-semibold">{t.fromDate}:</label>
                    <BilingualDatePicker
                      value={statsFilterDateFrom}
                      onChange={(d) => setStatsFilterDateFrom(d)}
                      lang={lang}
                      compact
                      accentColor="blue"
                    />
                    <label className="text-slate-500 font-semibold">{t.toDate}:</label>
                    <BilingualDatePicker
                      value={statsFilterDateTo}
                      onChange={(d) => setStatsFilterDateTo(d)}
                      lang={lang}
                      compact
                      accentColor="blue"
                    />
                  </div>
                )}

                {statsFilterMode === 'single' && (
                  <div className="flex items-center gap-2 text-xs">
                    <label className="text-slate-500 font-semibold">{t.date}:</label>
                    <BilingualDatePicker
                      value={statsFilterDateSingle}
                      onChange={(d) => setStatsFilterDateSingle(d)}
                      lang={lang}
                      compact
                      accentColor="blue"
                    />
                  </div>
                )}

                {statsFilterMode === 'month' && (
                  <div className="flex items-center gap-2 text-xs">
                    <select
                      value={statsFilterMonth}
                      onChange={(e) => setStatsFilterMonth(e.target.value)}
                      className="px-2.5 py-1.5 bg-slate-50 border border-slate-300 rounded-lg text-xs font-bold text-slate-800 focus:outline-none"
                    >
                      <option value="all">{lang === 'fr' ? 'Tous les mois' : 'All Months'}</option>
                      {[
                        { num: '01', fr: 'Janvier', en: 'January' },
                        { num: '02', fr: 'Février', en: 'February' },
                        { num: '03', fr: 'Mars', en: 'March' },
                        { num: '04', fr: 'Avril', en: 'April' },
                        { num: '05', fr: 'Mai', en: 'May' },
                        { num: '06', fr: 'Juin', en: 'June' },
                        { num: '07', fr: 'Juillet', en: 'July' },
                        { num: '08', fr: 'Août', en: 'August' },
                        { num: '09', fr: 'Septembre', en: 'September' },
                        { num: '10', fr: 'Octobre', en: 'October' },
                        { num: '11', fr: 'Novembre', en: 'November' },
                        { num: '12', fr: 'Décembre', en: 'December' }
                      ].map(m => (
                        <option key={m.num} value={m.num}>{lang === 'fr' ? m.fr : m.en}</option>
                      ))}
                    </select>

                    <select
                      value={statsFilterYear}
                      onChange={(e) => setStatsFilterYear(e.target.value)}
                      className="px-2.5 py-1.5 bg-slate-50 border border-slate-300 rounded-lg text-xs font-bold text-slate-800 focus:outline-none"
                    >
                      {[2024, 2025, 2026, 2027, 2028].map(y => (
                        <option key={y} value={String(y)}>{y}</option>
                      ))}
                    </select>
                  </div>
                )}
              </div>

              {/* LIGNE 2 : SÉLECTEURS TYPE / FAMILLE / PERSONNE */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
                <div>
                  <label className="block text-[11px] font-bold uppercase text-slate-500 mb-1">{t.filterTypeLabel}</label>
                  <select
                    value={statsFilterType}
                    onChange={(e) => setStatsFilterType(e.target.value)}
                    className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-300 rounded-lg text-xs font-semibold text-slate-800 focus:outline-none"
                  >
                    <option value="all">{t.filterAllTypes}</option>
                    <option value="debit">{t.filterDebitsOnly}</option>
                    <option value="credit">{t.filterCreditsOnly}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase text-slate-500 mb-1">{t.filterFamilyLabel}</label>
                  <select
                    value={statsFilterFamily}
                    onChange={(e) => setStatsFilterFamily(e.target.value)}
                    className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-300 rounded-lg text-xs font-semibold text-slate-800 focus:outline-none"
                  >
                    <option value="all">{t.filterAllFamilies}</option>
                    {sortedFamilies.map(f => (
                      <option key={f.id} value={f.name}>{formatItemLabel(f.name, lang)}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase text-slate-500 mb-1">{t.filterPersonLabel}</label>
                  <select
                    value={statsFilterPerson}
                    onChange={(e) => setStatsFilterPerson(e.target.value)}
                    className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-300 rounded-lg text-xs font-semibold text-slate-800 focus:outline-none"
                  >
                    <option value="all">{t.filterAllPersons}</option>
                    {sortedMembers.map((m, i) => (
                      <option key={m.id || i} value={m.name || m}>{m.name || m}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* BANDEAU RECAPITULATIF DU FILTRE ACTIF */}
              <div className="bg-slate-50 rounded-xl px-3 py-2 border border-slate-200 flex flex-wrap items-center justify-between gap-2 text-xs">
                <div className="flex items-center gap-1.5 text-slate-600 font-medium">
                  <span className="font-bold text-slate-700">{t.activeFilterBadge}</span>
                  <span className="bg-blue-100 text-blue-900 font-bold px-2 py-0.5 rounded border border-blue-200">
                    {activeFilterDescription}
                  </span>
                </div>

                <div className="flex items-center gap-3 font-bold">
                  <span className="text-slate-600">
                    {filteredStatsTransactions.length} transaction(s)
                  </span>
                  <span className="text-green-700">
                    + {formatUSD(filteredStatsTransactions.filter(tx => tx.type === 'credit').reduce((s, tx) => s + (Number(tx.amount) || 0), 0))}
                  </span>
                  <span className="text-red-600">
                    - {formatUSD(filteredStatsTransactions.filter(tx => tx.type === 'debit').reduce((s, tx) => s + (Number(tx.amount) || 0), 0))}
                  </span>
                </div>
              </div>
            </div>

            {/* VUE 1 : JOURNAL & GRAND LIVRE */}
            {statSubView === 'view1' && (
              <div className="space-y-4 fade-in">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm text-center">
                    <span className="text-xs text-slate-500 font-bold uppercase">{t.totalCredits}</span>
                    <p className="text-xl font-black text-green-700 mt-1">
                      {formatUSD(filteredStatsTransactions.filter(tx => tx.type === 'credit').reduce((s, tx) => s + (Number(tx.amount) || 0), 0))}
                    </p>
                  </div>
                  <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm text-center">
                    <span className="text-xs text-slate-500 font-bold uppercase">{t.totalDebits}</span>
                    <p className="text-xl font-black text-red-600 mt-1">
                      {formatUSD(filteredStatsTransactions.filter(tx => tx.type === 'debit').reduce((s, tx) => s + (Number(tx.amount) || 0), 0))}
                    </p>
                  </div>
                  <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm text-center">
                    <span className="text-xs text-slate-500 font-bold uppercase">{t.periodBalance}</span>
                    <p className="text-xl font-black text-blue-900 mt-1">
                      {formatUSD(
                        filteredStatsTransactions.filter(tx => tx.type === 'credit').reduce((s, tx) => s + (Number(tx.amount) || 0), 0) -
                        filteredStatsTransactions.filter(tx => tx.type === 'debit').reduce((s, tx) => s + (Number(tx.amount) || 0), 0)
                      )}
                    </p>
                  </div>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                  <div className="p-4 border-b border-slate-200 flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">
                        {t.journalTableTitle}
                      </h3>
                      <p className="text-xs text-slate-500">
                        {t.activeFilterBadge} {activeFilterDescription}
                      </p>
                    </div>
                    <span className="text-xs font-bold bg-slate-100 text-slate-600 px-2.5 py-1 rounded-md border border-slate-200">
                      {filteredStatsTransactions.length} transaction(s)
                    </span>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left table-compact">
                      <thead>
                        <tr>
                          <th className="whitespace-nowrap">{t.colDate || t.date}</th>
                          <th className="w-28 text-center whitespace-nowrap">{t.colType || t.type}</th>
                          <th>{t.colFamilyCategory || t.pdfFamCol}</th>
                          <th className="whitespace-nowrap">{t.colPerson}</th>
                          <th className="whitespace-nowrap">{t.colRef || t.refInvoice}</th>
                          <th>{t.colRemark || t.remark}</th>
                          <th className="text-right whitespace-nowrap">{t.colAmount || t.amount}</th>
                          <th className="text-center whitespace-nowrap">{t.colActions || t.actions}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredStatsTransactions.map(tx => (
                          <tr key={tx.id}>
                            <td className="font-semibold text-slate-700 whitespace-nowrap">{tx.date}</td>
                            <td className="w-28 text-center whitespace-nowrap">
                              <span className={`inline-flex items-center justify-center min-w-[78px] px-2.5 py-0.5 rounded-full text-xs font-bold tracking-wide shadow-sm ${tx.type === 'credit' ? 'badge-credit' : 'badge-debit'}`}>
                                {tx.type === 'credit' ? `+ ${t.credit}` : `- ${t.debit}`}
                              </span>
                            </td>
                            <td className="font-medium text-slate-800">
                              {tx.type === 'debit' ? (
                                <div>
                                  <div>{formatItemLabel(tx.family, lang)}</div>
                                </div>
                              ) : (
                                <div>
                                  <div>{formatItemLabel(tx.reason, lang)}</div>
                                </div>
                              )}
                            </td>
                            <td className="text-xs font-semibold text-slate-700 whitespace-nowrap">
                              {tx.person ? (
                                <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-medium border ${
                                  tx.type === 'credit' ? 'text-green-900 bg-green-50 border-green-100' : 'text-blue-900 bg-blue-50 border-blue-100'
                                }`}>
                                  <i className="fa-solid fa-user text-[10px]"></i>
                                  <span>{tx.person}</span>
                                </span>
                              ) : (
                                <span className="text-slate-300 italic text-xs">-</span>
                              )}
                            </td>
                            <td className="text-xs text-slate-500 whitespace-nowrap">{tx.refInvoice || '-'}</td>
                            <td className="text-xs text-slate-500 italic">{tx.remark || '-'}</td>
                            <td className={`text-right font-black whitespace-nowrap ${tx.type === 'credit' ? 'text-green-700' : 'text-red-600'}`}>
                              {tx.type === 'credit' ? '+ ' : '- '}
                              {formatUSD(tx.amount)}
                            </td>
                            <td className="text-center whitespace-nowrap">
                              <button
                                onClick={() => handleQuickEditAmount(tx)}
                                className="px-2 py-1 text-blue-700 bg-blue-50 hover:bg-blue-100 rounded text-xs font-bold mr-1.5"
                                title={t.btnEditAmount}
                              >
                                <i className="fa-solid fa-pen-to-square mr-1"></i>
                                {t.btnEditAmount}
                              </button>
                              <button
                                onClick={() => handleDeleteTx(tx.id)}
                                className="px-2 py-1 text-red-600 bg-red-50 hover:bg-red-100 rounded text-xs font-bold"
                                title={t.btnCancelRow}
                              >
                                <i className="fa-solid fa-trash-can mr-1"></i>
                                {t.btnCancelRow}
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* VUE 2 : HISTOGRAMME DÉBITS/CRÉDITS + CAMEMBERTS */}
            {statSubView === 'view2' && (
              <StatView2Component
                transactions={filteredStatsTransactions}
                activeFilterDescription={activeFilterDescription}
                families={families}
                formatUSD={formatUSD}
                triggerOfficialPdfExport={triggerOfficialPdfExport}
                t={t}
                lang={lang}
              />
            )}

            {/* VUE 3 : RÉPARTITION PAR FAMILLE */}
            {statSubView === 'view3' && (
              <StatView3Component
                transactions={filteredStatsTransactions}
                activeFilterDescription={activeFilterDescription}
                families={families}
                formatUSD={formatUSD}
                triggerOfficialPdfExport={triggerOfficialPdfExport}
                t={t}
                lang={lang}
              />
            )}


            {/* VUE 5 : DONNÉES CHOISIES (SUR-MESURE) */}
            {statSubView === 'view5' && (
              <StatView5Component
                transactions={filteredStatsTransactions}
                activeFilterDescription={activeFilterDescription}
                families={families}
                formatUSD={formatUSD}
                triggerOfficialPdfExport={triggerOfficialPdfExport}
                t={t}
                lang={lang}
              />
            )}

            {/* VUE 6 : PRÉVISIONS 3 MOIS & CONSEILS D'OPTIMISATION */}
            {statSubView === 'view6' && (
              <StatView6Component
                transactions={transactions}
                families={families}
                formatUSD={formatUSD}
                triggerOfficialPdfExport={triggerOfficialPdfExport}
                t={t}
                lang={lang}
                currentBalance={netBalance}
              />
            )}
          </div>
        )}

        {/* ==================================================================== */}
        {/* ONGLET 6 : SAUVEGARDE & SYNCHRONISATION */}
        {/* ==================================================================== */}
        {currentTab === 'backup' && (
          <div className="space-y-6 fade-in">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
                <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600 text-lg">
                  <i className="fa-solid fa-file-zipper"></i>
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 text-base">{t.zipBackupTitle}</h3>
                  <p className="text-xs text-slate-500">{t.zipBackupDesc}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-600 mb-1">{t.zipDateFromLabel}</label>
                  <BilingualDatePicker
                    value={zipDateFrom}
                    onChange={(d) => setZipDateFrom(d)}
                    lang={lang}
                    accentColor="blue"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-600 mb-1">{t.zipDateToLabel}</label>
                  <BilingualDatePicker
                    value={zipDateTo}
                    onChange={(d) => setZipDateTo(d)}
                    lang={lang}
                    accentColor="blue"
                  />
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                <span className="text-xs text-slate-500">
                  {transactions.filter(tx => (!zipDateFrom || tx.date >= zipDateFrom) && (!zipDateTo || tx.date <= zipDateTo)).length} transaction(s)
                </span>

                <button
                  onClick={handleExportZip}
                  className="px-5 py-2.5 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-xl text-sm flex items-center gap-2 shadow-md transition"
                >
                  <i className="fa-solid fa-download"></i>
                  <span>{t.btnGenerateZip}</span>
                </button>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-700 text-lg">
                  <i className="fa-solid fa-cloud-arrow-up"></i>
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 text-base">{t.restoreTitle}</h3>
                  <p className="text-xs text-slate-500">{t.restoreDesc}</p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <label className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-sm cursor-pointer flex items-center gap-2 border border-slate-300 transition">
                  <i className="fa-solid fa-folder-open text-blue-700"></i>
                  <span>{t.btnSelectRestoreFile}</span>
                  <input
                    type="file"
                    accept=".json"
                    onChange={handleRestoreFile}
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 text-lg">
                  <i className="fa-solid fa-tower-broadcast"></i>
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 text-base">{t.syncTitle}</h3>
                  <p className="text-xs text-slate-500">{t.syncDesc}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-600 mb-1">{t.serverIpLabel}</label>
                  <input
                    type="text"
                    value={serverHost}
                    onChange={(e) => {
                      setServerHost(e.target.value);
                      localStorage.setItem('RE_SERVER_HOST', e.target.value);
                    }}
                    placeholder="ex: 192.168.11.234 ou localhost"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm font-mono"
                  />
                  <p className="text-[11px] text-slate-400 mt-1">{t.serverPortNote}</p>
                </div>

                <div className="flex flex-col justify-end">
                  <button
                    onClick={handleSyncWithServer}
                    className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-sm flex items-center justify-center gap-2 shadow-md transition"
                  >
                    <i className="fa-solid fa-arrows-rotate"></i>
                    <span>{t.btnSyncNow}</span>
                  </button>
                </div>
              </div>

              {syncMessage && (
                <div className={`p-3 rounded-lg text-xs font-semibold flex items-center gap-2 ${
                  syncStatus === 'success' ? 'bg-green-50 text-green-700 border border-green-200' :
                  syncStatus === 'error' ? 'bg-red-50 text-red-700 border border-red-200' :
                  'bg-blue-50 text-blue-700 border border-blue-200'
                }`}>
                  <i className={`fa-solid ${syncStatus === 'success' ? 'fa-check' : syncStatus === 'error' ? 'fa-xmark' : 'fa-circle-notch fa-spin'}`}></i>
                  <span>{syncMessage}</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ==================================================================== */}
        {/* ONGLET 7 : PARAMÈTRES */}
        {/* ==================================================================== */}
        {currentTab === 'settings' && (
          <div className="space-y-6 fade-in max-w-2xl mx-auto">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <h3 className="font-bold text-slate-800 text-base flex items-center gap-2 border-b border-slate-100 pb-3">
                <i className="fa-solid fa-images text-blue-700"></i>
                <span>{t.bannerLogosTitle}</span>
              </h3>
              <p className="text-xs text-slate-500">{t.bannerLogosDesc}</p>

              <div className="space-y-3">
                <label className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl cursor-pointer hover:bg-slate-100">
                  <input
                    type="checkbox"
                    checked={bannerLogosConfig.showLogo1}
                    onChange={(e) => setBannerLogosConfig(p => ({ ...p, showLogo1: e.target.checked }))}
                    className="rounded text-blue-700 focus:ring-blue-600 w-4 h-4"
                  />
                  <img src="logo1.png" alt="Logo 1" className="w-10 h-10 object-contain" />
                  <div>
                    <span className="text-xs font-bold text-slate-800 block">{t.logo1Title}</span>
                    <span className="text-[11px] text-slate-500">{t.logo1Desc}</span>
                  </div>
                </label>

                <label className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl cursor-pointer hover:bg-slate-100">
                  <input
                    type="checkbox"
                    checked={bannerLogosConfig.showLogo2}
                    onChange={(e) => setBannerLogosConfig(p => ({ ...p, showLogo2: e.target.checked }))}
                    className="rounded text-blue-700 focus:ring-blue-600 w-4 h-4"
                  />
                  <img src="logo2.png" alt="Logo 2" className="w-10 h-10 object-contain" />
                  <div>
                    <span className="text-xs font-bold text-slate-800 block">{t.logo2Title}</span>
                    <span className="text-[11px] text-slate-500">{t.logo2Desc}</span>
                  </div>
                </label>

                <label className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl cursor-pointer hover:bg-slate-100">
                  <input
                    type="checkbox"
                    checked={bannerLogosConfig.showLogo3}
                    onChange={(e) => setBannerLogosConfig(p => ({ ...p, showLogo3: e.target.checked }))}
                    className="rounded text-blue-700 focus:ring-blue-600 w-4 h-4"
                  />
                  <img src="logo3.png" alt="Logo 3" className="w-10 h-10 object-contain" />
                  <div>
                    <span className="text-xs font-bold text-slate-800 block">{t.logo3Title}</span>
                    <span className="text-[11px] text-slate-500">{t.logo3Desc}</span>
                  </div>
                </label>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <div className="border-b border-slate-100 pb-3">
                <h3 className="font-bold text-slate-800 text-base flex items-center gap-2">
                  <i className="fa-solid fa-user-shield text-blue-700"></i>
                  <span>{t.settingsCredsTitle}</span>
                </h3>
                <p className="text-xs text-slate-500 mt-1">{t.settingsCredsDesc}</p>
              </div>

              {settingsCredsError && (
                <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                  <i className="fa-solid fa-triangle-exclamation flex-shrink-0"></i>
                  <span>{settingsCredsError}</span>
                </div>
              )}

              {settingsCredsSuccess && (
                <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs flex items-center gap-2">
                  <i className="fa-solid fa-circle-check flex-shrink-0"></i>
                  <span>{settingsCredsSuccess}</span>
                </div>
              )}

              <form onSubmit={handleSaveSettingsCredentials} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* ANCIEN IDENTIFIANT */}
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-600 mb-1">
                      {t.oldUsernameLabel} <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={settingsOldUser}
                        onChange={(e) => setSettingsOldUser(e.target.value)}
                        placeholder={t.placeholderOldUser}
                        className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm focus:bg-white focus:border-blue-600 focus:outline-none"
                      />
                      <i className="fa-solid fa-user text-slate-400 absolute left-3 top-2.5 text-xs"></i>
                    </div>
                  </div>

                  {/* NOUVEL IDENTIFIANT */}
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-600 mb-1">
                      {t.newUsernameLabel} <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={settingsNewUser}
                        onChange={(e) => setSettingsNewUser(e.target.value)}
                        placeholder={t.placeholderNewUser}
                        className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm focus:bg-white focus:border-blue-600 focus:outline-none"
                      />
                      <i className="fa-solid fa-user-pen text-slate-400 absolute left-3 top-2.5 text-xs"></i>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* ANCIEN MOT DE PASSE */}
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-600 mb-1">
                      {t.oldPasswordLabel} <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type={showSettingsOldPass ? "text" : "password"}
                        value={settingsOldPass}
                        onChange={(e) => setSettingsOldPass(e.target.value)}
                        placeholder={t.placeholderOldPass}
                        className="w-full pl-9 pr-10 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm focus:bg-white focus:border-blue-600 focus:outline-none"
                      />
                      <i className="fa-solid fa-lock text-slate-400 absolute left-3 top-2.5 text-xs"></i>
                      <button
                        type="button"
                        onClick={() => setShowSettingsOldPass(p => !p)}
                        className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 focus:outline-none"
                        title={showSettingsOldPass ? t.hidePassword : t.showPassword}
                      >
                        <i className={`fa-solid ${showSettingsOldPass ? 'fa-eye-slash text-blue-700' : 'fa-eye'}`}></i>
                      </button>
                    </div>
                  </div>

                  {/* NOUVEAU MOT DE PASSE */}
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-600 mb-1">
                      {t.newPasswordLabel} <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type={showSettingsNewPass ? "text" : "password"}
                        value={settingsNewPass}
                        onChange={(e) => setSettingsNewPass(e.target.value)}
                        placeholder={t.placeholderNewPass}
                        className="w-full pl-9 pr-10 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm focus:bg-white focus:border-blue-600 focus:outline-none"
                      />
                      <i className="fa-solid fa-key text-slate-400 absolute left-3 top-2.5 text-xs"></i>
                      <button
                        type="button"
                        onClick={() => setShowSettingsNewPass(p => !p)}
                        className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 focus:outline-none"
                        title={showSettingsNewPass ? t.hidePassword : t.showPassword}
                      >
                        <i className={`fa-solid ${showSettingsNewPass ? 'fa-eye-slash text-blue-700' : 'fa-eye'}`}></i>
                      </button>
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <p className="text-xs font-bold text-slate-600 mb-1">{t.authorizedEmailsLabel}</p>
                  <div className="space-y-1 font-mono text-xs text-blue-900 bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                    <div>&bull; Afamcherie@gmail.com</div>
                    <div>&bull; ericveyrat.iphone@gmail.com</div>
                  </div>
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-blue-800 hover:bg-blue-900 text-white font-bold rounded-xl text-xs sm:text-sm flex items-center gap-2 shadow-sm transition"
                  >
                    <i className="fa-solid fa-floppy-disk"></i>
                    <span>{t.btnSaveSettingsCreds}</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>

      {/* FOOTER OFFICIEL */}
      <footer className="bg-white border-t border-slate-200 py-4 mt-auto z-20">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <img src="footer_banner.jpg" alt="Footer Banner" className="h-8 object-contain" />
          </div>
          <div className="text-center sm:text-right">
            <p className="font-semibold text-slate-700">THE FRATERNAL ORDER OF LADY EAGLES GROUP &bull; Philippine Eagles</p>
            <p className="text-[11px] text-slate-400">TREASURER'S REPORT - Financial Record V2.0</p>
          </div>
        </div>
      </footer>

      {/* SECTION OFFICIELLE POUR L'EXPORTATION & IMPRESSION PDF */}
      {printDocumentData && (
        <div id="print-section">
          <div className="print-watermark"></div>

          <div className="text-center mb-4">
            <img src="header_banner.jpg" alt="Official Header" style={{ width: '100%', maxHeight: '110px', objectFit: 'contain' }} />
          </div>

          <div className="text-center my-4 pb-2 border-b-2 border-blue-900">
            <h2 className="text-lg font-black text-blue-900 uppercase tracking-wide">
              {printDocumentData.title}
            </h2>
            <p className="text-xs font-bold text-slate-700 mt-1">
              {printDocumentData.subtitle}
            </p>
            <p className="text-[10px] text-slate-500 mt-0.5">
              {t.pdfGeneratedOn} {printDocumentData.dateGenerated} &bull; {t.pdfCurrencyNote}
            </p>
          </div>

          <div className="flex justify-between items-center my-4 p-3 bg-slate-50 border border-slate-200 rounded">
            <div>
              <span className="text-[11px] uppercase font-bold text-slate-500 block">{t.totalCredits}</span>
              <span className="text-base font-black text-green-700">{formatUSD(printDocumentData.totalCredits)}</span>
            </div>
            <div>
              <span className="text-[11px] uppercase font-bold text-slate-500 block">{t.totalDebits}</span>
              <span className="text-base font-black text-red-600">{formatUSD(printDocumentData.totalDebits)}</span>
            </div>
            <div>
              <span className="text-[11px] uppercase font-bold text-slate-500 block">{t.balance}</span>
              <span className="text-base font-black text-blue-900">{formatUSD(printDocumentData.totalCredits - printDocumentData.totalDebits)}</span>
            </div>
          </div>

          {printDocumentData.chartImageUri && (
            <div className="my-5 text-center">
              <img src={printDocumentData.chartImageUri} alt="Chart Graphique" style={{ maxWidth: '90%', maxHeight: '280px', margin: '0 auto' }} />
            </div>
          )}

          <div className="my-4">
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '11px' }}>
              <thead>
                <tr style={{ background: '#1e3a8a', color: 'white' }}>
                  <th style={{ padding: '6px 8px', textAlign: 'left' }}>{t.date}</th>
                  <th style={{ padding: '6px 8px', textAlign: 'left' }}>{t.type}</th>
                  <th style={{ padding: '6px 8px', textAlign: 'left' }}>{t.pdfFamCol}</th>
                  <th style={{ padding: '6px 8px', textAlign: 'left' }}>{t.pdfRefCol}</th>
                  <th style={{ padding: '6px 8px', textAlign: 'left' }}>{t.pdfRemarkCol}</th>
                  <th style={{ padding: '6px 8px', textAlign: 'right' }}>{t.pdfAmountCol}</th>
                </tr>
              </thead>
              <tbody>
                {printDocumentData.transactions.map((tx, idx) => (
                  <tr key={idx} style={{ background: idx % 2 === 0 ? '#ffffff' : '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                    <td style={{ padding: '5px 8px', fontWeight: 'bold' }}>{tx.date}</td>
                    <td style={{ padding: '5px 8px', color: tx.type === 'credit' ? '#16a34a' : '#dc2626', fontWeight: 'bold' }}>
                      {tx.type === 'credit' ? t.credit.toUpperCase() : t.debit.toUpperCase()}
                    </td>
                    <td style={{ padding: '5px 8px' }}>
                      {tx.type === 'debit' ? formatItemLabel(tx.family, lang) : formatItemLabel(tx.reason, lang)}
                    </td>
                    <td style={{ padding: '5px 8px', color: '#64748b' }}>{tx.refInvoice || '-'}</td>
                    <td style={{ padding: '5px 8px', color: '#64748b', fontStyle: 'italic' }}>{tx.remark || '-'}</td>
                    <td style={{ padding: '5px 8px', textAlign: 'right', fontWeight: 'bold', color: tx.type === 'credit' ? '#16a34a' : '#dc2626' }}>
                      {formatUSD(tx.amount)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div style={{ marginTop: '30px', paddingTop: '15px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
              <div style={{ fontSize: '10px', color: '#64748b' }}>
                <p>{t.pdfOfficialDoc}</p>
                <p>{t.pdfOrgName}</p>
              </div>
              <div style={{ textAlign: 'center', minWidth: '180px', borderTop: '1px solid #94a3b8', paddingTop: '5px' }}>
                <p style={{ fontSize: '11px', fontWeight: 'bold', color: '#1e3a8a' }}>{t.pdfTreasurerTitle}</p>
                <p style={{ fontSize: '9px', color: '#64748b', marginTop: '20px' }}>{t.pdfSignatureLabel}</p>
              </div>
            </div>

            <div style={{ textAlign: 'center' }}>
              <img src="footer_banner.jpg" alt="Official Footer" style={{ width: '100%', maxHeight: '60px', objectFit: 'contain' }} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ============================================================================
// COMPOSANT VUE 2 : HISTOGRAMME DÉBITS/CRÉDITS + CAMEMBERTS STATISTIQUES
// Affiche le nom du filtre actif et sélecteur d'unité (Montants $ ou Pourcentages %)
// ============================================================================
function StatView2Component({
  transactions,
  activeFilterDescription,
  families,
  formatUSD,
  triggerOfficialPdfExport,
  t,
  lang
}) {
  const [groupBy, setGroupBy] = useState('day');
  const [displayMode, setDisplayMode] = useState('amount'); // 'amount' | 'percent'
  const isFr = lang === 'fr';

  const barCanvasRef = useRef(null);
  const pieCanvasRef = useRef(null);
  const familyPieCanvasRef = useRef(null);

  const barChartInstance = useRef(null);
  const pieChartInstance = useRef(null);
  const familyPieChartInstance = useRef(null);

  const totalCredits = useMemo(() => {
    return transactions.filter(tItem => tItem.type === 'credit').reduce((s, tItem) => s + (Number(tItem.amount) || 0), 0);
  }, [transactions]);

  const totalDebits = useMemo(() => {
    return transactions.filter(tItem => tItem.type === 'debit').reduce((s, tItem) => s + (Number(tItem.amount) || 0), 0);
  }, [transactions]);

  const totalBoth = totalCredits + totalDebits;
  const creditPct = totalBoth > 0 ? ((totalCredits / totalBoth) * 100).toFixed(1) : '0.0';
  const debitPct = totalBoth > 0 ? ((totalDebits / totalBoth) * 100).toFixed(1) : '0.0';

  const groupedData = useMemo(() => {
    const datesMap = {};
    transactions.forEach(tx => {
      const key = groupBy === 'day' ? tx.date : tx.date.substring(0, 7);
      if (!datesMap[key]) {
        datesMap[key] = { credit: 0, debit: 0 };
      }
      if (tx.type === 'credit') datesMap[key].credit += Number(tx.amount) || 0;
      if (tx.type === 'debit') datesMap[key].debit += Number(tx.amount) || 0;
    });

    const sortedKeys = Object.keys(datesMap).sort();

    const creditsData = sortedKeys.map(k => {
      const c = datesMap[k].credit;
      const d = datesMap[k].debit;
      if (displayMode === 'percent') {
        const sum = c + d;
        return sum > 0 ? Number(((c / sum) * 100).toFixed(1)) : 0;
      }
      return c;
    });

    const debitsData = sortedKeys.map(k => {
      const c = datesMap[k].credit;
      const d = datesMap[k].debit;
      if (displayMode === 'percent') {
        const sum = c + d;
        return sum > 0 ? Number(((d / sum) * 100).toFixed(1)) : 0;
      }
      return d;
    });

    return {
      labels: sortedKeys,
      credits: creditsData,
      debits: debitsData,
      rawMap: datesMap
    };
  }, [transactions, groupBy, displayMode]);

  // Répartition des débits par famille pour le 2ème camembert
  const familyDebitsBreakdown = useMemo(() => {
    const map = {};
    transactions.filter(tx => tx.type === 'debit' && tx.family).forEach(tx => {
      const fam = tx.family;
      map[fam] = (map[fam] || 0) + (Number(tx.amount) || 0);
    });
    const sorted = Object.entries(map).sort((a, b) => b[1] - a[1]);
    const labels = sorted.map(([fam, amt]) => {
      const pct = totalDebits > 0 ? ((amt / totalDebits) * 100).toFixed(1) : '0.0';
      const labelName = formatItemLabel(fam, lang);
      return displayMode === 'amount'
        ? `${labelName}: ${formatUSD(amt)} (${pct}%)`
        : `${labelName}: ${pct}% (${formatUSD(amt)})`;
    });
    const data = sorted.map(([_, amt]) => {
      if (displayMode === 'percent') {
        return totalDebits > 0 ? Number(((amt / totalDebits) * 100).toFixed(1)) : 0;
      }
      return amt;
    });
    return { labels, data, count: sorted.length };
  }, [transactions, totalDebits, displayMode, lang]);

  const familyColors = [
    '#2563eb', '#d97706', '#059669', '#dc2626', '#7c3aed',
    '#db2777', '#0891b2', '#ea580c', '#4f46e5', '#84cc16'
  ];

  const [chartReady, setChartReady] = useState(() => typeof window !== 'undefined' && !!window.Chart);

  useEffect(() => {
    if (chartReady) return;
    const interval = setInterval(() => {
      if (typeof window !== 'undefined' && window.Chart) {
        setChartReady(true);
        clearInterval(interval);
      }
    }, 100);
    const timeout = setTimeout(() => clearInterval(interval), 4000);
    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [chartReady]);

  useEffect(() => {
    if (!window.Chart) return;

    try {
      if (barCanvasRef.current) {
        if (barChartInstance.current) {
          try { barChartInstance.current.destroy(); } catch (_) {}
          barChartInstance.current = null;
        }
        if (window.Chart.getChart) {
          try {
            const ex = window.Chart.getChart(barCanvasRef.current);
            if (ex) ex.destroy();
          } catch (_) {}
        }
        const ctx = barCanvasRef.current.getContext('2d');
        const unitLabel = displayMode === 'amount' ? '($ USD)' : '(%)';

        barChartInstance.current = new window.Chart(ctx, {
          type: 'bar',
          data: {
            labels: groupedData.labels,
            datasets: [
              {
                label: `${t.credit} ${unitLabel}`,
                data: groupedData.credits,
                backgroundColor: '#16a34a'
              },
              {
                label: `${t.debit} ${unitLabel}`,
                data: groupedData.debits,
                backgroundColor: '#dc2626'
              }
            ]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: { position: 'top' },
              tooltip: {
                callbacks: {
                  label: function(context) {
                    const val = context.raw || 0;
                    if (displayMode === 'percent') {
                      return ` ${context.dataset.label}: ${val}%`;
                    }
                    return ` ${context.dataset.label}: ${formatUSD(val)}`;
                  }
                }
              }
            },
            scales: {
              y: {
                beginAtZero: true,
                ticks: {
                  callback: function(value) {
                    return displayMode === 'amount' ? `$ ${value}` : `${value} %`;
                  }
                }
              }
            }
          }
        });
      }

      if (pieCanvasRef.current) {
        if (pieChartInstance.current) {
          try { pieChartInstance.current.destroy(); } catch (_) {}
          pieChartInstance.current = null;
        }
        if (window.Chart.getChart) {
          try {
            const ex = window.Chart.getChart(pieCanvasRef.current);
            if (ex) ex.destroy();
          } catch (_) {}
        }
        const ctx = pieCanvasRef.current.getContext('2d');
        const pieLabels = displayMode === 'amount'
          ? [`${t.credit}: ${formatUSD(totalCredits)} (${creditPct}%)`, `${t.debit}: ${formatUSD(totalDebits)} (${debitPct}%)`]
          : [`${t.credit}: ${creditPct}% (${formatUSD(totalCredits)})`, `${t.debit}: ${debitPct}% (${formatUSD(totalDebits)})`];

        const pieData = displayMode === 'amount'
          ? [totalCredits, totalDebits]
          : [Number(creditPct), Number(debitPct)];

        pieChartInstance.current = new window.Chart(ctx, {
          type: 'pie',
          data: {
            labels: pieLabels,
            datasets: [{
              data: pieData,
              backgroundColor: ['#16a34a', '#dc2626']
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: { position: 'bottom' }
            }
          }
        });
      }

      if (familyPieCanvasRef.current && familyDebitsBreakdown.count > 0) {
        if (familyPieChartInstance.current) {
          try { familyPieChartInstance.current.destroy(); } catch (_) {}
          familyPieChartInstance.current = null;
        }
        if (window.Chart.getChart) {
          try {
            const ex = window.Chart.getChart(familyPieCanvasRef.current);
            if (ex) ex.destroy();
          } catch (_) {}
        }
        const ctx = familyPieCanvasRef.current.getContext('2d');

        familyPieChartInstance.current = new window.Chart(ctx, {
          type: 'pie',
          data: {
            labels: familyDebitsBreakdown.labels,
            datasets: [{
              data: familyDebitsBreakdown.data,
              backgroundColor: familyColors.slice(0, familyDebitsBreakdown.labels.length)
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: { position: 'bottom' }
            }
          }
        });
      }
    } catch (chartErr) {
      console.warn("Chart render warning in StatView2:", chartErr);
    }

    return () => {
      if (barChartInstance.current) {
        try { barChartInstance.current.destroy(); } catch (_) {}
        barChartInstance.current = null;
      }
      if (pieChartInstance.current) {
        try { pieChartInstance.current.destroy(); } catch (_) {}
        pieChartInstance.current = null;
      }
      if (familyPieChartInstance.current) {
        try { familyPieChartInstance.current.destroy(); } catch (_) {}
        familyPieChartInstance.current = null;
      }
    };
  }, [chartReady, groupedData, totalCredits, totalDebits, creditPct, debitPct, displayMode, familyDebitsBreakdown, lang]);

  return (
    <div className="space-y-6 fade-in">
      {/* BANDEAU INDICATEUR : NOM DU FILTRE ACTIF + SÉLECTEURS UNITÉ & GROUPEMENT */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-xs">
          <i className="fa-solid fa-filter text-amber-600"></i>
          <span className="font-bold text-slate-700">{t.activeFilterBadge}</span>
          <span className="bg-blue-50 text-blue-900 border border-blue-200 px-2.5 py-1 rounded-md font-extrabold shadow-2xs">
            {activeFilterDescription || (isFr ? "Tout l'historique" : "All history")}
          </span>
          <span className="text-slate-500 font-semibold hidden sm:inline">
            ({transactions.length} transaction(s))
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Toggle Montant / Pourcentage */}
          <div className="flex items-center gap-1.5 bg-slate-100 p-0.5 rounded-lg border border-slate-300 text-xs font-bold">
            <button
              type="button"
              onClick={() => setDisplayMode('amount')}
              className={`px-3 py-1.5 rounded-md transition ${
                displayMode === 'amount'
                  ? 'bg-blue-900 text-white shadow-xs font-black'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <i className="fa-solid fa-dollar-sign mr-1"></i>
              <span>{t.modeAmounts}</span>
            </button>
            <button
              type="button"
              onClick={() => setDisplayMode('percent')}
              className={`px-3 py-1.5 rounded-md transition ${
                displayMode === 'percent'
                  ? 'bg-blue-900 text-white shadow-xs font-black'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <i className="fa-solid fa-percent mr-1"></i>
              <span>{t.modePercentages}</span>
            </button>
          </div>

          {/* Group By Jour / Mois */}
          <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-lg border border-slate-300 text-xs font-bold">
            <button
              type="button"
              onClick={() => setGroupBy('day')}
              className={`px-2.5 py-1.5 rounded-md transition ${
                groupBy === 'day' ? 'bg-white text-blue-900 shadow-xs font-black' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {t.day}
            </button>
            <button
              type="button"
              onClick={() => setGroupBy('month')}
              className={`px-2.5 py-1.5 rounded-md transition ${
                groupBy === 'month' ? 'bg-white text-blue-900 shadow-xs font-black' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {t.month}
            </button>
          </div>

          <button
            type="button"
            onClick={() => triggerOfficialPdfExport(
              `${t.chartView2BarTitle} - ${displayMode === 'amount' ? t.inAmounts : t.inPercentages}`,
              `${t.activeFilterBadge} ${activeFilterDescription}`,
              transactions,
              'chart-view2-bar'
            )}
            className="px-3.5 py-1.5 bg-red-700 hover:bg-red-800 text-white font-bold rounded-lg text-xs flex items-center gap-1.5 shadow-sm transition"
            title={t.btnExportPdf}
          >
            <i className="fa-solid fa-file-pdf"></i>
            <span>{t.btnExportPdf}</span>
          </button>
        </div>
      </div>

      {transactions.length === 0 ? (
        <div className="bg-white p-12 text-center rounded-2xl border border-slate-200 shadow-sm space-y-2">
          <i className="fa-solid fa-filter-circle-xmark text-slate-300 text-4xl mb-2"></i>
          <p className="text-slate-600 font-bold text-sm">{t.noTransactionsFiltered}</p>
          <p className="text-xs text-slate-400">{t.activeFilterBadge} {activeFilterDescription}</p>
        </div>
      ) : (
        <>
          {/* HISTOGRAMME */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-4 pb-2 border-b border-slate-100">
              <h3 className="text-sm font-black text-slate-800 uppercase tracking-wider flex items-center gap-2">
                <i className="fa-solid fa-chart-column text-blue-700"></i>
                <span>{t.chartView2BarTitle}</span>
                <span className="text-amber-700 font-extrabold normal-case">
                  ({displayMode === 'amount' ? t.inAmounts : t.inPercentages})
                </span>
              </h3>
              <span className="text-[11px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                {activeFilterDescription}
              </span>
            </div>
            <div style={{ height: '340px' }}>
              <canvas id="chart-view2-bar" ref={barCanvasRef}></canvas>
            </div>
          </div>

          {/* SECTION LES CAMEMBERTS STATISTIQUES */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Camembert Global Crédits vs Débits */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-100">
                  <h3 className="text-sm font-black text-slate-800 uppercase tracking-wider flex items-center gap-2">
                    <i className="fa-solid fa-chart-pie text-amber-600"></i>
                    <span>{t.chartView2GlobalPieTitle}</span>
                  </h3>
                  <span className="text-xs font-bold text-amber-700">
                    {displayMode === 'amount' ? t.inAmounts : t.inPercentages}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 my-2 text-xs font-bold text-center">
                  <div className="p-2 rounded-lg bg-green-50 border border-green-200 text-green-800">
                    <span className="block text-[10px] uppercase text-green-600 font-extrabold">{t.credit}</span>
                    <span className="text-sm font-black">{creditPct}%</span>
                    <span className="block text-[11px] text-green-700">{formatUSD(totalCredits)}</span>
                  </div>
                  <div className="p-2 rounded-lg bg-red-50 border border-red-200 text-red-800">
                    <span className="block text-[10px] uppercase text-red-600 font-extrabold">{t.debit}</span>
                    <span className="text-sm font-black">{debitPct}%</span>
                    <span className="block text-[11px] text-red-700">{formatUSD(totalDebits)}</span>
                  </div>
                </div>
              </div>

              <div style={{ height: '260px' }} className="my-auto">
                <canvas id="chart-view2-pie" ref={pieCanvasRef}></canvas>
              </div>

              <p className="text-center text-[11px] text-slate-400 mt-2 font-medium">
                {t.activeFilterBadge} {activeFilterDescription}
              </p>
            </div>

            {/* Camembert Répartition des Dépenses par Famille */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-100">
                  <h3 className="text-sm font-black text-slate-800 uppercase tracking-wider flex items-center gap-2">
                    <i className="fa-solid fa-layer-group text-blue-600"></i>
                    <span>{t.chartView2FamilyPieTitle}</span>
                  </h3>
                  <span className="text-xs font-bold text-amber-700">
                    {displayMode === 'amount' ? t.inAmounts : t.inPercentages}
                  </span>
                </div>

                <p className="text-xs text-slate-500 mb-2">
                  {isFr ? "Total des dépenses analysées :" : "Total expenses analyzed:"}{" "}
                  <strong className="text-red-600 font-black">{formatUSD(totalDebits)}</strong>
                </p>
              </div>

              {familyDebitsBreakdown.count === 0 ? (
                <div className="py-12 text-center text-xs text-slate-400 font-medium">
                  {isFr ? "Aucune dépense enregistrée sur cette sélection." : "No expenses recorded in this selection."}
                </div>
              ) : (
                <div style={{ height: '260px' }} className="my-auto">
                  <canvas id="chart-view2-family-pie" ref={familyPieCanvasRef}></canvas>
                </div>
              )}

              <p className="text-center text-[11px] text-slate-400 mt-2 font-medium">
                {t.activeFilterBadge} {activeFilterDescription}
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

// ============================================================================
// COMPOSANT VUE 3 : RÉPARTITION PAR FAMILLE
// ============================================================================
function StatView3Component({ transactions, activeFilterDescription, families, formatUSD, triggerOfficialPdfExport, t, lang }) {
  const [displayMode, setDisplayMode] = useState('amount'); // 'amount' | 'percent'
  const isFr = lang === 'fr';
  const familyCanvasRef = useRef(null);
  const familyChartInstance = useRef(null);

  const totalDebits = useMemo(() => {
    return transactions.filter(tItem => tItem.type === 'debit').reduce((s, tItem) => s + (Number(tItem.amount) || 0), 0);
  }, [transactions]);

  const familyStats = useMemo(() => {
    const map = {};
    families.forEach(f => {
      map[f.name] = { debit: 0, credit: 0 };
    });

    transactions.forEach(tx => {
      if (tx.family) {
        if (!map[tx.family]) map[tx.family] = { debit: 0, credit: 0 };
        if (tx.type === 'debit') map[tx.family].debit += Number(tx.amount) || 0;
        if (tx.type === 'credit') map[tx.family].credit += Number(tx.amount) || 0;
      }
    });

    const labels = Object.keys(map).sort((a, b) => map[b].debit - map[a].debit);
    const debits = labels.map(l => map[l].debit);
    const percentages = labels.map(l => totalDebits > 0 ? Number(((map[l].debit / totalDebits) * 100).toFixed(1)) : 0);

    return { labels, debits, percentages, map };
  }, [transactions, families, totalDebits]);

  const [chartReady, setChartReady] = useState(() => typeof window !== 'undefined' && !!window.Chart);

  useEffect(() => {
    if (chartReady) return;
    const interval = setInterval(() => {
      if (typeof window !== 'undefined' && window.Chart) {
        setChartReady(true);
        clearInterval(interval);
      }
    }, 100);
    const timeout = setTimeout(() => clearInterval(interval), 4000);
    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [chartReady]);

  useEffect(() => {
    if (!window.Chart || !familyCanvasRef.current) return;

    try {
      if (familyChartInstance.current) {
        try { familyChartInstance.current.destroy(); } catch (_) {}
        familyChartInstance.current = null;
      }
      if (window.Chart.getChart) {
        try {
          const ex = window.Chart.getChart(familyCanvasRef.current);
          if (ex) ex.destroy();
        } catch (_) {}
      }

      const ctx = familyCanvasRef.current.getContext('2d');
      const unitLabel = displayMode === 'amount' ? '($ USD)' : '(%)';
      const chartData = displayMode === 'amount' ? familyStats.debits : familyStats.percentages;

      familyChartInstance.current = new window.Chart(ctx, {
        type: 'bar',
        data: {
          labels: familyStats.labels.map(l => formatItemLabel(l, lang)),
          datasets: [
            {
              label: `${t.debit} ${unitLabel}`,
              data: chartData,
              backgroundColor: '#d97706'
            }
          ]
        },
        options: {
          indexAxis: 'y',
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { position: 'top' },
            tooltip: {
              callbacks: {
                label: function(context) {
                  const idx = context.dataIndex;
                  const amt = familyStats.debits[idx];
                  const pct = familyStats.percentages[idx];
                  return ` ${formatUSD(amt)} (${pct}%)`;
                }
              }
            }
          },
          scales: {
            x: {
              ticks: {
                callback: function(value) {
                  return displayMode === 'amount' ? `$ ${value}` : `${value} %`;
                }
              }
            }
          }
        }
      });
    } catch (err) {
      console.warn("Chart render warning in StatView3:", err);
    }

    return () => {
      if (familyChartInstance.current) {
        try { familyChartInstance.current.destroy(); } catch (_) {}
        familyChartInstance.current = null;
      }
    };
  }, [chartReady, familyStats, displayMode, lang]);

  return (
    <div className="space-y-6 fade-in">
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-wrap justify-between items-center gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-slate-800 text-sm uppercase">{t.familyBreakdownTitle}</h3>
            <span className="text-xs font-bold text-amber-700">
              ({displayMode === 'amount' ? t.inAmounts : t.inPercentages})
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            {t.activeFilterBadge} {activeFilterDescription}
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Toggle Montant / Pourcentage */}
          <div className="flex items-center gap-1.5 bg-slate-100 p-0.5 rounded-lg border border-slate-300 text-xs font-bold">
            <button
              type="button"
              onClick={() => setDisplayMode('amount')}
              className={`px-3 py-1 rounded-md transition ${
                displayMode === 'amount' ? 'bg-blue-900 text-white shadow-xs font-black' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <i className="fa-solid fa-dollar-sign mr-1"></i>
              <span>{t.modeAmounts}</span>
            </button>
            <button
              type="button"
              onClick={() => setDisplayMode('percent')}
              className={`px-3 py-1 rounded-md transition ${
                displayMode === 'percent' ? 'bg-blue-900 text-white shadow-xs font-black' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <i className="fa-solid fa-percent mr-1"></i>
              <span>{t.modePercentages}</span>
            </button>
          </div>

          <button
            onClick={() => triggerOfficialPdfExport(
              `${t.familyBreakdownTitle} - ${displayMode === 'amount' ? t.inAmounts : t.inPercentages}`,
              `${t.activeFilterBadge} ${activeFilterDescription}`,
              transactions,
              'chart-view3-fam'
            )}
            className="px-4 py-2 bg-red-700 hover:bg-red-800 text-white font-bold rounded-xl text-xs sm:text-sm flex items-center gap-2 shadow-sm transition"
          >
            <i className="fa-solid fa-file-pdf"></i>
            <span>{t.btnExportPdf}</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div style={{ height: '350px' }}>
            <canvas id="chart-view3-fam" ref={familyCanvasRef}></canvas>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm overflow-x-auto">
          <h4 className="text-xs font-bold uppercase text-slate-600 mb-3">{t.familySummaryTable}</h4>
          <table className="w-full text-left table-compact">
            <thead>
              <tr>
                <th>{t.colFamily || t.family}</th>
                <th className="text-right">{t.colAmount || t.totalDebits}</th>
                <th className="text-right">Part (%)</th>
              </tr>
            </thead>
            <tbody>
              {familyStats.labels.map((name, i) => (
                <tr key={i}>
                  <td className="font-bold text-slate-800">{formatItemLabel(name, lang)}</td>
                  <td className="text-right font-black text-red-600">{formatUSD(familyStats.debits[i])}</td>
                  <td className="text-right font-bold text-slate-600">{familyStats.percentages[i]}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// COMPOSANT VUE 5 : DONNÉES CHOISIES PAR LE GESTIONNAIRE (SUR-MESURE)
// ============================================================================
function StatView5Component({ transactions, activeFilterDescription, families, formatUSD, triggerOfficialPdfExport, t, lang }) {
  const [selectedFamilies, setSelectedFamilies] = useState(() => families.map(f => f.name));
  const [filterType, setFilterType] = useState('all');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');

  const customCanvasRef = useRef(null);
  const customChartInstance = useRef(null);

  const customFilteredTx = useMemo(() => {
    return transactions.filter(tx => {
      if (filterType !== 'all' && tx.type !== filterType) return false;
      if (dateFrom && tx.date < dateFrom) return false;
      if (dateTo && tx.date > dateTo) return false;
      if (tx.family && !selectedFamilies.includes(tx.family)) return false;
      return true;
    });
  }, [transactions, selectedFamilies, filterType, dateFrom, dateTo]);

  const [chartReady, setChartReady] = useState(() => typeof window !== 'undefined' && !!window.Chart);

  useEffect(() => {
    if (chartReady) return;
    const interval = setInterval(() => {
      if (typeof window !== 'undefined' && window.Chart) {
        setChartReady(true);
        clearInterval(interval);
      }
    }, 100);
    const timeout = setTimeout(() => clearInterval(interval), 4000);
    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [chartReady]);

  useEffect(() => {
    if (!window.Chart || !customCanvasRef.current) return;

    try {
      if (customChartInstance.current) {
        try { customChartInstance.current.destroy(); } catch (_) {}
        customChartInstance.current = null;
      }
      if (window.Chart.getChart) {
        try {
          const ex = window.Chart.getChart(customCanvasRef.current);
          if (ex) ex.destroy();
        } catch (_) {}
      }

      const datesMap = {};
      customFilteredTx.forEach(tx => {
        const k = tx.date;
        if (!datesMap[k]) datesMap[k] = { debit: 0, credit: 0 };
        if (tx.type === 'debit') datesMap[k].debit += Number(tx.amount) || 0;
        if (tx.type === 'credit') datesMap[k].credit += Number(tx.amount) || 0;
      });

      const labels = Object.keys(datesMap).sort();
      const debits = labels.map(l => datesMap[l].debit);
      const credits = labels.map(l => datesMap[l].credit);

      const ctx = customCanvasRef.current.getContext('2d');
      customChartInstance.current = new window.Chart(ctx, {
        type: 'bar',
        data: {
          labels,
          datasets: [
            { label: `${t.credit} ($)`, data: credits, backgroundColor: '#16a34a' },
            { label: `${t.debit} ($)`, data: debits, backgroundColor: '#dc2626' }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { position: 'top' } }
        }
      });
    } catch (err) {
      console.warn("Chart render warning in StatView5:", err);
    }

    return () => {
      if (customChartInstance.current) {
        try { customChartInstance.current.destroy(); } catch (_) {}
        customChartInstance.current = null;
      }
    };
  }, [chartReady, customFilteredTx, lang]);

  return (
    <div className="space-y-6 fade-in">
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex justify-between items-center pb-2 border-b border-slate-100">
          <h3 className="font-bold text-slate-800 text-sm uppercase">{t.customSelectionTitle}</h3>
          <button
            onClick={() => triggerOfficialPdfExport(t.statView5, `${t.customSelectionTitle} (${customFilteredTx.length})`, customFilteredTx, 'chart-view5-custom')}
            className="px-4 py-2 bg-red-700 hover:bg-red-800 text-white font-bold rounded-xl text-xs sm:text-sm flex items-center gap-2 shadow-sm transition"
          >
            <i className="fa-solid fa-file-pdf"></i>
            <span>{t.btnExportPdf}</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase text-slate-600 mb-1">{t.type} :</label>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm"
            >
              <option value="all">{t.allTypes}</option>
              <option value="debit">{t.debitsOnly}</option>
              <option value="credit">{t.creditsOnly}</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-slate-600 mb-1">{t.fromDate} :</label>
            <BilingualDatePicker
              value={dateFrom}
              onChange={(d) => setDateFrom(d)}
              lang={lang}
              accentColor="blue"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-slate-600 mb-1">{t.toDate} :</label>
            <BilingualDatePicker
              value={dateTo}
              onChange={(d) => setDateTo(d)}
              lang={lang}
              accentColor="blue"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase text-slate-600 mb-2">{t.selectedFamilies}</label>
          <div className="flex flex-wrap gap-2">
            {families.map(f => {
              const active = selectedFamilies.includes(f.name);
              return (
                <button
                  key={f.id}
                  onClick={() => {
                    setSelectedFamilies(p => active ? p.filter(x => x !== f.name) : [...p, f.name]);
                  }}
                  className={`px-3 py-1 rounded-lg text-xs font-bold border transition ${
                    active ? 'bg-blue-800 text-white border-blue-800' : 'bg-slate-50 text-slate-600 border-slate-200'
                  }`}
                >
                  {f.name}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
        <h4 className="text-xs font-bold uppercase text-slate-600 mb-3">{t.customChartTitle}</h4>
        <div style={{ height: '320px' }}>
          <canvas id="chart-view5-custom" ref={customCanvasRef}></canvas>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// COMPOSANT VUE 6 : RAPPORT D'AUDIT DE TRÉSORERIE & FICHES D'ACTION DANS LE TEMPS
// ============================================================================
function StatView6Component({ transactions, families, formatUSD, triggerOfficialPdfExport, t, lang, currentBalance }) {
  // Suivi de l'état d'avancement des fiches d'action
  const [actionStatuses, setActionStatuses] = useState(() => {
    try {
      const saved = localStorage.getItem('RE_AUDIT_ACTION_STATUSES');
      return saved ? JSON.parse(saved) : {};
    } catch (e) {
      return {};
    }
  });

  const toggleActionStatus = (actionId) => {
    setActionStatuses(prev => {
      const current = prev[actionId] || 'todo';
      const next = current === 'todo' ? 'in_progress' : current === 'in_progress' ? 'done' : 'todo';
      const updated = { ...prev, [actionId]: next };
      localStorage.setItem('RE_AUDIT_ACTION_STATUSES', JSON.stringify(updated));
      return updated;
    });
  };

  // Calcul des statistiques historiques pour l'audit et la projection
  const analyticsData = useMemo(() => {
    const debits = transactions.filter(tx => tx.type === 'debit');
    const credits = transactions.filter(tx => tx.type === 'credit');

    const totalDebits = debits.reduce((s, tx) => s + (Number(tx.amount) || 0), 0);
    const totalCredits = credits.reduce((s, tx) => s + (Number(tx.amount) || 0), 0);

    // Détection des mois distincts dans l'historique
    const monthsSet = new Set();
    transactions.forEach(tx => {
      if (tx.date && tx.date.length >= 7) {
        monthsSet.add(tx.date.substring(0, 7)); // 'YYYY-MM'
      }
    });

    const numMonths = Math.max(1, monthsSet.size);

    const avgMonthlyCredits = totalCredits / numMonths;
    const avgMonthlyDebits = totalDebits / numMonths;
    const netMonthlyTrend = avgMonthlyCredits - avgMonthlyDebits;

    // Détection du poste le plus dépensier (famille dominante)
    const familyTotals = {};
    debits.forEach(tx => {
      const f = tx.family || (lang === 'fr' ? 'Non classé' : 'Uncategorized');
      familyTotals[f] = (familyTotals[f] || 0) + (Number(tx.amount) || 0);
    });

    let topFamilyName = '';
    let topFamilyAmount = 0;
    Object.entries(familyTotals).forEach(([fam, amt]) => {
      if (amt > topFamilyAmount) {
        topFamilyAmount = amt;
        topFamilyName = fam;
      }
    });

    const topFamilyPct = totalDebits > 0 ? ((topFamilyAmount / totalDebits) * 100).toFixed(1) : 0;
    const topFamilyMonthlyAvg = topFamilyAmount / numMonths;
    const topFamilyPotentialSavings = topFamilyMonthlyAvg * 0.10; // Économie de 10%

    // Réserve de sécurité conseillée (2.5 mois de charges d'exploitation moyennes)
    const recommendedReserve = avgMonthlyDebits * 2.5;
    const reserveCoverageMonths = avgMonthlyDebits > 0 ? (currentBalance / avgMonthlyDebits) : 0;

    // Score de conformité & santé financière de l'audit
    let healthScore = 50;
    if (currentBalance < 0) {
      healthScore = Math.max(15, Math.min(45, Math.round(30 + (currentBalance / (avgMonthlyDebits || 1)) * 10)));
    } else {
      if (netMonthlyTrend > 0) healthScore += 25;
      if (reserveCoverageMonths >= 2) healthScore += 15;
      else if (reserveCoverageMonths >= 1) healthScore += 5;
      if (totalCredits > totalDebits * 1.15) healthScore += 10;
      healthScore = Math.min(100, Math.max(50, healthScore));
    }

    let riskLevel = t.auditRiskMedium;
    let riskColor = 'text-amber-800 bg-amber-50 border-amber-300';
    if (healthScore >= 75) {
      riskLevel = t.auditRiskLow;
      riskColor = 'text-emerald-800 bg-emerald-50 border-emerald-300';
    } else if (healthScore < 50 || currentBalance < 0) {
      riskLevel = t.auditRiskHigh;
      riskColor = 'text-red-800 bg-red-50 border-red-300';
    }

    // Calcul des 3 prochains mois
    const now = new Date();
    const projections = [];
    let runningBalance = currentBalance;

    for (let i = 1; i <= 3; i++) {
      const futureDate = new Date(now.getFullYear(), now.getMonth() + i, 1);
      const monthLabel = new Intl.DateTimeFormat(lang === 'fr' ? 'fr-FR' : 'en-US', {
        month: 'long',
        year: 'numeric'
      }).format(futureDate);

      const capitalizedMonth = monthLabel.charAt(0).toUpperCase() + monthLabel.slice(1);
      const estIncome = avgMonthlyCredits;
      const estExpense = avgMonthlyDebits;
      const estNet = estIncome - estExpense;
      runningBalance += estNet;

      projections.push({
        monthNumber: i,
        monthName: capitalizedMonth,
        estIncome,
        estExpense,
        estNet,
        cumulBalance: runningBalance
      });
    }

    return {
      numMonths,
      totalCredits,
      totalDebits,
      avgMonthlyCredits,
      avgMonthlyDebits,
      netMonthlyTrend,
      topFamilyName,
      topFamilyAmount,
      topFamilyPct,
      topFamilyMonthlyAvg,
      topFamilyPotentialSavings,
      recommendedReserve,
      reserveCoverageMonths,
      healthScore,
      riskLevel,
      riskColor,
      projections
    };
  }, [transactions, currentBalance, lang, t]);

  // Fiches d'Action dans le temps (Audit Roadmap)
  const auditActionCards = useMemo(() => [
    {
      id: 'act_01',
      code: 'ACTION-01',
      horizonKey: 'horizon1',
      periodLabel: lang === 'fr' ? 'Mois 1 (J+1 à J+15)' : 'Month 1 (Day 1 - 15)',
      title: lang === 'fr' ? 'Maîtrise & Plafonnement du Poste Dominant' : 'Dominant Expense Rationalization',
      finding: lang === 'fr'
        ? `L'audit constate que le poste « ${formatItemLabel(analyticsData.topFamilyName, lang) || 'Charges Principales'} » absorbe à lui seul ${analyticsData.topFamilyPct}% des sorties de trésorerie (${formatUSD(analyticsData.topFamilyMonthlyAvg)}/mois).`
        : `Audit reveals that "${formatItemLabel(analyticsData.topFamilyName, lang) || 'Main Expenses'}" consumes ${analyticsData.topFamilyPct}% of all cash outflows (${formatUSD(analyticsData.topFamilyMonthlyAvg)}/mo).`,
      targetGoal: lang === 'fr'
        ? `Économie immédiate de 10%, soit ${formatUSD(analyticsData.topFamilyPotentialSavings)} / mois préservés en caisse.`
        : `Immediate 10% reduction, saving ${formatUSD(analyticsData.topFamilyPotentialSavings)} / month.`,
      steps: lang === 'fr' ? [
        "Geler ou plafonner les dépenses discrétionnaires non urgentes sur ce poste.",
        "Mettre en concurrence systématique au moins 2 devis avant engagement d'achat.",
        "Exiger une validation formelle du Trésorier pour tout décaissement supérieur à 100 USD."
      ] : [
        "Freeze or cap non-critical discretionary spend in this family.",
        "Require at least two comparative vendor quotes before purchase approvals.",
        "Mandate formal Treasurer sign-off on any disbursement exceeding 100 USD."
      ],
      owner: lang === 'fr' ? 'Trésorier & Responsable des Achats' : 'Treasurer & Procurement Lead',
      impact: lang === 'fr'
        ? `+ ${formatUSD(analyticsData.topFamilyPotentialSavings * 3)} économisés sur l'horizon de 3 mois.`
        : `+ ${formatUSD(analyticsData.topFamilyPotentialSavings * 3)} preserved over the 3-month horizon.`
    },
    {
      id: 'act_02',
      code: 'ACTION-02',
      horizonKey: 'horizon1',
      periodLabel: lang === 'fr' ? 'Mois 1 (J+5 à J+30)' : 'Month 1 (Day 5 - 30)',
      title: lang === 'fr' ? 'Sécurisation & Relance des Cotisations Régulières' : 'Accelerated Membership Dues Mobilization',
      finding: lang === 'fr'
        ? `Pour couvrir le train de charges moyen (${formatUSD(analyticsData.avgMonthlyDebits)}/mois), les encaissements doivent être rigoureusement planifiés et réguliers.`
        : `Operating burn of ${formatUSD(analyticsData.avgMonthlyDebits)}/mo mandates prompt and disciplined member contributions.`,
      targetGoal: lang === 'fr'
        ? `Sécuriser au moins ${formatUSD(analyticsData.avgMonthlyDebits * 1.20)} / mois d'encaissements (+20% de marge de sécurité).`
        : `Secure at least ${formatUSD(analyticsData.avgMonthlyDebits * 1.20)} / month (+20% safety margin).`,
      steps: lang === 'fr' ? [
        "Diffuser un relevé d'appel de cotisations individuel aux membres via WhatsApp et Email.",
        "Fixer une date limite d'encaissement impérative (le 5 de chaque mois).",
        "Proposer aux membres volontaires un règlement groupé trimestriel ou semestriel anticipé."
      ] : [
        "Issue itemized dues contribution statements to all members via WhatsApp and Email.",
        "Establish an enforceable monthly collection deadline (e.g. 5th of each month).",
        "Offer voluntary advance quarterly or biannual dues payment options."
      ],
      owner: lang === 'fr' ? 'Trésorier & Secrétaire Général' : 'Treasurer & General Secretary',
      impact: lang === 'fr'
        ? 'Prévisibilité totale du cash-flow et élimination des goulets d’étranglement de liquidités.'
        : 'Predictable cash flow and elimination of month-end liquidity shortfalls.'
    },
    {
      id: 'act_03',
      code: 'ACTION-03',
      horizonKey: 'horizon2',
      periodLabel: lang === 'fr' ? 'Mois 2 (J+30 à J+60)' : 'Month 2 (Day 30 - 60)',
      title: lang === 'fr' ? 'Constitution du Fonds de Réserve d’Urgence' : 'Establishment of Emergency Safety Reserve',
      finding: lang === 'fr'
        ? `La couverture actuelle est de ${Math.max(0, analyticsData.reserveCoverageMonths).toFixed(1)} mois de fonctionnement. L'audit préconise une réserve de 2,5 mois (${formatUSD(analyticsData.recommendedReserve)}).`
        : `Current cash coverage is ${Math.max(0, analyticsData.reserveCoverageMonths).toFixed(1)} months. Audit standard specifies 2.5 months (${formatUSD(analyticsData.recommendedReserve)}).`,
      targetGoal: lang === 'fr'
        ? `Atteindre le palier de réserve de sécurité de ${formatUSD(analyticsData.recommendedReserve)}.`
        : `Reach recommended safety reserve benchmark of ${formatUSD(analyticsData.recommendedReserve)}.`,
      steps: lang === 'fr' ? [
        "Allouer systématiquement 15% de chaque recette brute au compte de prévoyance.",
        "Créer une règle interne interdisant tout tirage sur la réserve sans vote du Bureau.",
        "Afficher l'état d'avancement de la réserve lors du rapport financier mensuel."
      ] : [
        "Systematically allocate 15% of every gross inflow to the contingency reserve.",
        "Establish an internal governance rule restricting reserve withdrawals to Board approval.",
        "Present the reserve replenishment progress in the monthly treasurer report."
      ],
      owner: lang === 'fr' ? 'Bureau de Direction & Trésorier' : 'Executive Board & Treasurer',
      impact: lang === 'fr'
        ? 'Protection complète de l’organisation contre les imprévus majeurs.'
        : 'Complete financial resilience against unexpected operational disruptions.'
    },
    {
      id: 'act_04',
      code: 'ACTION-04',
      horizonKey: 'horizon2',
      periodLabel: lang === 'fr' ? 'Mois 2 (J+40 à J+60)' : 'Month 2 (Day 40 - 60)',
      title: lang === 'fr' ? 'Audit des Justificatifs & Imputation par Membre' : 'Disbursement Attribution & Receipt Compliance',
      finding: lang === 'fr'
        ? 'Conformité d’audit : chaque débit doit comporter un numéro de reçu/facture et le nom du membre responsable.'
        : 'Audit compliance: every expense voucher must include receipt/ref # and the responsible member name.',
      targetGoal: lang === 'fr'
        ? '100% des transactions justifiées et traçables sur le grand livre.'
        : '100% of journal transactions fully documented with receipt and attributed member.',
      steps: lang === 'fr' ? [
        "Vérifier et compléter les références de factures manquantes sur les débits passés.",
        "Effectuer une sauvegarde ZIP mensuelle complète certifiée conforme.",
        "Sensibiliser les membres aux règles d'engagement de dépenses officielles du club."
      ] : [
        "Review and update any missing invoice/ref numbers on historical records.",
        "Perform a certified full-month ZIP backup archive for official club records.",
        "Brief members on formal reimbursement protocols and valid proof-of-purchase standards."
      ],
      owner: lang === 'fr' ? 'Comité d’Audit Interne' : 'Internal Audit Committee',
      impact: lang === 'fr'
        ? 'Transparence absolue et absence totale de contestation lors des contrôles externes.'
        : 'Total transparency and zero dispute vulnerability during external fraternal reviews.'
    },
    {
      id: 'act_05',
      code: 'ACTION-05',
      horizonKey: 'horizon3',
      periodLabel: lang === 'fr' ? 'Mois 3 (J+60 à J+90)' : 'Month 3 (Day 60 - 90)',
      title: lang === 'fr' ? 'Diversification des Recettes & Partenariats' : 'Revenue Diversification & Sponsorships',
      finding: lang === 'fr'
        ? 'L’audit recommande de ne pas reposer uniquement sur les cotisations pour financer les grands projets Eagles.'
        : 'Audit advises against sole reliance on membership dues for financing strategic community initiatives.',
      targetGoal: lang === 'fr'
        ? `Générer un surplus trimestriel de ${formatUSD(analyticsData.avgMonthlyDebits * 0.50)} issu d'activités tierces.`
        : `Generate an auxiliary quarterly surplus of ${formatUSD(analyticsData.avgMonthlyDebits * 0.50)} via external channels.`,
      steps: lang === 'fr' ? [
        "Organiser un événement caritatif annuel Eagles avec billetterie et tombola.",
        "Développer les articles officiels du club (polos, casquettes, insignes).",
        "Établir une convention avec 2 ou 3 entreprises partenaires bienfaitrices."
      ] : [
        "Organize an annual Eagles fraternal charity event with ticket sales and raffles.",
        "Expand official club merchandising (polo shirts, badges, eagles memorabilia).",
        "Sign sponsorship agreements with 2-3 local community corporate benefactors."
      ],
      owner: lang === 'fr' ? 'Comité Événements & Trésorier' : 'Events Committee & Treasurer',
      impact: lang === 'fr'
        ? 'Autonomie accrue pour financer les actions caritatives et investissements durables.'
        : 'Self-sustaining financial foundation for philanthropic mission and club expansion.'
    },
    {
      id: 'act_06',
      code: 'ACTION-06',
      horizonKey: 'horizon3',
      periodLabel: lang === 'fr' ? 'Mois 3 (J+75 à J+90)' : 'Month 3 (Day 75 - 90)',
      title: lang === 'fr' ? 'Revue Budgétaire & Audit Trimestriel Formel' : 'Formal Quarterly Audit & Governance Review',
      finding: lang === 'fr'
        ? 'Nécessité de mesurer les écarts entre les prévisions d’audit et les réalisations comptables réelles.'
        : 'Mandatory reconciliation between predictive audit benchmarks and actual treasury outcomes.',
      targetGoal: lang === 'fr'
        ? 'Clôture trimestrielle certifiée avec Rapport d’Audit signé par le Président et le Trésorier.'
        : 'Certified quarterly closing with formal Audit Report signed by President and Treasurer.',
      steps: lang === 'fr' ? [
        "Comparer les 3 mois réels avec les prévisions formulées lors de l'audit initial.",
        "Actualiser la feuille de route d'amélioration pour le trimestre suivant.",
        "Présenter le bilan d'audit lors de l'Assemblée Générale trimestrielle."
      ] : [
        "Benchmark actual 3-month performance against original predictive audit model.",
        "Update time-phased action cards and roadmap for the subsequent quarter.",
        "Present the formal audit closure at the Quarterly General Membership Meeting."
      ],
      owner: lang === 'fr' ? 'Président du Club & Trésorier' : 'Club President & Treasurer',
      impact: lang === 'fr'
        ? 'Pérennité de la gouvernance financière et distinction d’excellence pour le club.'
        : 'Institutional governance maturity and recognized fiscal excellence within Philippine Eagles.'
    }
  ], [analyticsData, formatUSD, lang]);

  const completedCount = useMemo(() => {
    return auditActionCards.filter(c => actionStatuses[c.id] === 'done').length;
  }, [auditActionCards, actionStatuses]);

  const inProgressCount = useMemo(() => {
    return auditActionCards.filter(c => actionStatuses[c.id] === 'in_progress').length;
  }, [auditActionCards, actionStatuses]);

  const completionPct = Math.round((completedCount / auditActionCards.length) * 100);

  // Export Officiel du Rapport d'Audit en PDF
  const handleExportAuditPdf = () => {
    const auditRows = auditActionCards.map((c) => {
      const st = actionStatuses[c.id] || 'todo';
      const stLabel = st === 'done' ? t.actionStatusDone : st === 'in_progress' ? t.actionStatusInProgress : t.actionStatusTodo;

      return {
        id: c.code,
        date: c.periodLabel,
        type: st === 'done' ? 'credit' : 'debit',
        family: `${c.code}: ${c.title} - [${stLabel.toUpperCase()}] ${c.owner}`,
        refInvoice: c.periodLabel,
        amount: analyticsData.topFamilyPotentialSavings || 100,
        remark: `${c.targetGoal} | ${c.impact}`
      };
    });

    const p0 = analyticsData?.projections?.[0]?.monthName || '';
    const p2 = analyticsData?.projections?.[2]?.monthName || '';
    const periodStr = p0 && p2 ? `${t.pdfPeriodPrefix} ${p0} - ${p2} | ` : '';

    triggerOfficialPdfExport(
      t.pdfAuditTitle,
      `${periodStr}${t.auditProgressTitle} ${completedCount}/${auditActionCards.length} (${completionPct}%)`,
      auditRows
    );
  };

  return (
    <div className="space-y-6 fade-in">
      {/* BANNIÈRE OFFICIELLE DU RAPPORT D'AUDIT */}
      <div className="bg-gradient-to-r from-blue-900 via-blue-950 to-slate-900 text-white p-6 rounded-2xl shadow-md border border-blue-800 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-400/40 flex items-center justify-center font-bold text-2xl shadow-sm">
            <i className="fa-solid fa-clipboard-check"></i>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-amber-500 text-blue-950">
                AUDIT OFFICIEL
              </span>
              <span className="text-xs text-blue-200">THE FRATERNAL ORDER OF LADY EAGLES GROUP</span>
            </div>
            <h3 className="text-lg sm:text-xl font-black mt-1">
              {t.auditReportTitle}
            </h3>
            <p className="text-xs text-blue-200 mt-0.5 max-w-xl">
              {t.auditReportSubtitle}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleExportAuditPdf}
          className="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl text-xs sm:text-sm flex items-center gap-2 shadow-lg transition"
        >
          <i className="fa-solid fa-file-pdf"></i>
          <span>{t.btnExportAuditPdf}</span>
        </button>
      </div>

      {/* SCORE D'AUDIT & JAUGE D'AVANCEMENT DE LA FEUILLE DE ROUTE */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
          {/* SCORE & NIVEAU DE RISQUE */}
          <div className="flex items-center gap-4 p-4 rounded-xl border bg-slate-50 border-slate-200">
            <div className="relative flex items-center justify-center">
              <div className="w-16 h-16 rounded-full border-4 border-blue-800 flex items-center justify-center bg-white shadow-inner">
                <span className="text-xl font-black text-slate-800">{analyticsData.healthScore}</span>
              </div>
            </div>
            <div>
              <p className="text-xs font-bold uppercase text-slate-500">{t.auditScoreLabel}</p>
              <div className="mt-1">
                <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-black border ${analyticsData.riskColor}`}>
                  {analyticsData.riskLevel}
                </span>
              </div>
            </div>
          </div>

          {/* AVANCEMENT DU PLAN D'ACTION DANS LE TEMPS */}
          <div className="p-4 rounded-xl border bg-slate-50 border-slate-200 space-y-2">
            <div className="flex items-center justify-between text-xs font-bold">
              <span className="text-slate-700 flex items-center gap-1.5">
                <i className="fa-solid fa-list-check text-blue-800"></i>
                <span>{t.auditProgressTitle}</span>
              </span>
              <span className="text-blue-900 font-black">{completedCount} / {auditActionCards.length} {t.auditProgressCompleted} ({completionPct}%)</span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden">
              <div
                className="bg-emerald-600 h-3 rounded-full transition-all duration-500"
                style={{ width: `${completionPct}%` }}
              ></div>
            </div>
            <div className="flex items-center justify-between text-[11px] text-slate-500 pt-0.5">
              <span>{inProgressCount} {lang === 'fr' ? 'en cours' : 'in progress'}</span>
              <span>{auditActionCards.length - completedCount - inProgressCount} {lang === 'fr' ? 'à planifier' : 'to plan'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 4 INDICATEURS DE DIAGNOSTIC D'AUDIT */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* RECETTE MOYENNE */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-xs text-slate-500 font-bold uppercase mb-1">
            <span>{t.averageMonthlyIncome}</span>
            <i className="fa-solid fa-arrow-down-left text-green-600"></i>
          </div>
          <p className="text-xl font-black text-green-700">
            {formatUSD(analyticsData.avgMonthlyCredits)}
          </p>
          <p className="text-[11px] text-slate-400 mt-1">
            {lang === 'fr' ? `Base : ${analyticsData.numMonths} mois audité(s)` : `Based on ${analyticsData.numMonths} mo. audited`}
          </p>
        </div>

        {/* DÉPENSE MOYENNE */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-xs text-slate-500 font-bold uppercase mb-1">
            <span>{t.averageMonthlyExpense}</span>
            <i className="fa-solid fa-arrow-up-right text-red-600"></i>
          </div>
          <p className="text-xl font-black text-red-600">
            {formatUSD(analyticsData.avgMonthlyDebits)}
          </p>
          <p className="text-[11px] text-slate-400 mt-1">
            {lang === 'fr' ? 'Charges mensuelles constatées' : 'Monthly audited operating costs'}
          </p>
        </div>

        {/* TENDANCE NETTE */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-xs text-slate-500 font-bold uppercase mb-1">
            <span>{t.netMonthlyTrend}</span>
            <i className={`fa-solid ${analyticsData.netMonthlyTrend >= 0 ? 'fa-arrow-trend-up text-emerald-600' : 'fa-arrow-trend-down text-red-600'}`}></i>
          </div>
          <p className={`text-xl font-black ${analyticsData.netMonthlyTrend >= 0 ? 'text-blue-900' : 'text-red-700'}`}>
            {analyticsData.netMonthlyTrend >= 0 ? '+ ' : ''}{formatUSD(analyticsData.netMonthlyTrend)}
          </p>
          <p className="text-[11px] text-slate-400 mt-1">
            {analyticsData.netMonthlyTrend >= 0
              ? (lang === 'fr' ? 'Capacité d\'épargne mensuelle' : 'Monthly savings capacity')
              : (lang === 'fr' ? 'Déficit mensuel structurel' : 'Structural monthly deficit')}
          </p>
        </div>

        {/* COUVERTURE RÉSERVE */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-xs text-slate-500 font-bold uppercase mb-1">
            <span>{lang === 'fr' ? 'Couverture de Réserve' : 'Reserve Coverage'}</span>
            <i className="fa-solid fa-vault text-blue-700"></i>
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-xl font-black text-slate-800">{Math.max(0, analyticsData.reserveCoverageMonths).toFixed(1)}</span>
            <span className="text-xs text-slate-500 font-bold">/ 2.5 {lang === 'fr' ? 'mois cible' : 'mo. target'}</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">
            {lang === 'fr' ? `Cible : ${formatUSD(analyticsData.recommendedReserve)}` : `Target: ${formatUSD(analyticsData.recommendedReserve)}`}
          </p>
        </div>
      </div>

      {/* PROJECTIONS 3 MOIS */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h4 className="font-extrabold text-slate-800 text-sm sm:text-base flex items-center gap-2">
            <i className="fa-solid fa-calendar-days text-blue-700"></i>
            <span>{lang === 'fr' ? 'Trajectoire Prévisionnelle sur les 3 Prochains Mois' : 'Projected Trajectory over Next 3 Months'}</span>
          </h4>
          <span className="text-xs text-slate-500 font-semibold">
            {lang === 'fr' ? 'Solde de départ' : 'Starting balance'}: <strong>{formatUSD(currentBalance)}</strong>
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {analyticsData.projections.map((proj) => {
            const isSurplus = proj.estNet >= 0;
            const isFinalPositive = proj.cumulBalance >= 0;

            return (
              <div
                key={proj.monthNumber}
                className={`p-4 rounded-2xl border transition shadow-sm ${
                  isFinalPositive ? 'bg-slate-50/70 border-slate-200' : 'bg-red-50/50 border-red-200'
                }`}
              >
                <div className="flex items-center justify-between mb-3 border-b border-slate-200/60 pb-2">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-blue-900 text-white flex items-center justify-center text-xs font-black">
                      +{proj.monthNumber}
                    </span>
                    <h5 className="font-bold text-slate-800 text-sm">{proj.monthName}</h5>
                  </div>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    isSurplus ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {isSurplus ? (lang === 'fr' ? '+ Excédent' : '+ Surplus') : (lang === 'fr' ? '- Déficit' : '- Deficit')}
                  </span>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">{t.projectedCredits}:</span>
                    <span className="font-bold text-green-700">{formatUSD(proj.estIncome)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">{t.projectedDebits}:</span>
                    <span className="font-bold text-red-600">{formatUSD(proj.estExpense)}</span>
                  </div>
                  <div className="flex items-center justify-between pt-1 border-t border-slate-200/60">
                    <span className="text-slate-600 font-semibold">{t.projectedNet}:</span>
                    <span className={`font-black ${isSurplus ? 'text-green-700' : 'text-red-700'}`}>
                      {isSurplus ? '+ ' : ''}{formatUSD(proj.estNet)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-slate-200">
                    <span className="text-slate-800 font-bold uppercase text-[11px]">{t.projectedBalance}:</span>
                    <span className={`font-black text-sm ${isFinalPositive ? 'text-blue-900' : 'text-red-700 animate-pulse'}`}>
                      {formatUSD(proj.cumulBalance)}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* SECTION FICHES D'ACTION D'AMÉLIORATION DANS LE TEMPS (FEUILLE DE ROUTE D'AUDIT) */}
      <div className="space-y-6">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center font-bold text-xl shadow-sm">
              <i className="fa-solid fa-route"></i>
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-black text-slate-800">
                {t.actionRoadmapTitle}
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                {t.actionRoadmapSubtitle}
              </p>
            </div>
          </div>
          <div className="pt-2 text-xs text-slate-500 flex items-center gap-2">
            <i className="fa-solid fa-hand-pointer text-blue-700"></i>
            <span>{lang === 'fr' ? 'Cliquez sur le badge de statut d\'une fiche pour modifier son état (À Planifier → En Cours → Réalisé).' : 'Click an action badge to toggle status (To Plan → In Progress → Completed).'}</span>
          </div>
        </div>

        {/* ================= HORIZON 1 : IMMÉDIAT (0 À 30 JOURS) ================= */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 px-1">
            <span className="w-3 h-3 rounded-full bg-rose-600"></span>
            <h4 className="font-extrabold text-sm uppercase tracking-wider text-rose-900">
              {t.horizon1Title}
            </h4>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {auditActionCards.filter(c => c.horizonKey === 'horizon1').map(card => {
              const status = actionStatuses[card.id] || 'todo';
              const statusBadgeClass = status === 'done'
                ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                : status === 'in_progress'
                ? 'bg-amber-100 text-amber-800 border-amber-300'
                : 'bg-slate-100 text-slate-700 border-slate-300';
              const statusLabel = status === 'done'
                ? t.actionStatusDone + ' ✓'
                : status === 'in_progress'
                ? t.actionStatusInProgress
                : t.actionStatusTodo;

              return (
                <div key={card.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3 hover:border-blue-400 transition">
                  <div className="flex items-start justify-between gap-2 border-b border-slate-100 pb-2.5">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[11px] font-black px-2 py-0.5 rounded bg-blue-900 text-white">
                          {card.code}
                        </span>
                        <span className="text-xs font-bold text-slate-500">
                          {card.periodLabel}
                        </span>
                      </div>
                      <h5 className="font-extrabold text-slate-800 text-sm mt-1">
                        {card.title}
                      </h5>
                    </div>

                    <button
                      type="button"
                      onClick={() => toggleActionStatus(card.id)}
                      className={`px-3 py-1 rounded-full text-xs font-bold border transition shadow-sm flex items-center gap-1.5 flex-shrink-0 cursor-pointer ${statusBadgeClass}`}
                      title="Changer le statut"
                    >
                      <i className={`fa-solid ${status === 'done' ? 'fa-check' : status === 'in_progress' ? 'fa-spinner fa-spin' : 'fa-circle-dot'}`}></i>
                      <span>{statusLabel}</span>
                    </button>
                  </div>

                  {/* CONSTAT D'AUDIT */}
                  <div className="p-3 bg-slate-50 rounded-xl text-xs text-slate-700 border border-slate-200 leading-relaxed">
                    <strong className="text-slate-900 block mb-0.5">{lang === 'fr' ? 'Constat d\'Audit :' : 'Audit Finding:'}</strong>
                    {card.finding}
                  </div>

                  {/* OBJECTIF CHIFFRÉ */}
                  <div className="text-xs">
                    <strong className="text-blue-900 block">{t.actionCardGoal}</strong>
                    <p className="text-slate-700 font-semibold">{card.targetGoal}</p>
                  </div>

                  {/* PISTES D'AMÉLIORATION & DÉMARCHES */}
                  <div className="text-xs space-y-1">
                    <strong className="text-slate-800 block">{t.actionCardSteps}</strong>
                    <ul className="list-disc list-inside space-y-1 text-slate-600">
                      {card.steps.map((st, i) => (
                        <li key={i}>{st}</li>
                      ))}
                    </ul>
                  </div>

                  {/* RESPONSABLE & IMPACT */}
                  <div className="pt-2 border-t border-slate-100 text-xs flex flex-wrap items-center justify-between gap-2">
                    <span className="text-slate-500">
                      <strong>{t.actionCardOwner}</strong> {card.owner}
                    </span>
                    <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      {card.impact}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ================= HORIZON 2 : CONSOLIDATION (30 À 60 JOURS) ================= */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center gap-2 px-1">
            <span className="w-3 h-3 rounded-full bg-amber-500"></span>
            <h4 className="font-extrabold text-sm uppercase tracking-wider text-amber-900">
              {t.horizon2Title}
            </h4>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {auditActionCards.filter(c => c.horizonKey === 'horizon2').map(card => {
              const status = actionStatuses[card.id] || 'todo';
              const statusBadgeClass = status === 'done'
                ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                : status === 'in_progress'
                ? 'bg-amber-100 text-amber-800 border-amber-300'
                : 'bg-slate-100 text-slate-700 border-slate-300';
              const statusLabel = status === 'done'
                ? t.actionStatusDone + ' ✓'
                : status === 'in_progress'
                ? t.actionStatusInProgress
                : t.actionStatusTodo;

              return (
                <div key={card.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3 hover:border-blue-400 transition">
                  <div className="flex items-start justify-between gap-2 border-b border-slate-100 pb-2.5">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[11px] font-black px-2 py-0.5 rounded bg-blue-900 text-white">
                          {card.code}
                        </span>
                        <span className="text-xs font-bold text-slate-500">
                          {card.periodLabel}
                        </span>
                      </div>
                      <h5 className="font-extrabold text-slate-800 text-sm mt-1">
                        {card.title}
                      </h5>
                    </div>

                    <button
                      type="button"
                      onClick={() => toggleActionStatus(card.id)}
                      className={`px-3 py-1 rounded-full text-xs font-bold border transition shadow-sm flex items-center gap-1.5 flex-shrink-0 cursor-pointer ${statusBadgeClass}`}
                      title="Changer le statut"
                    >
                      <i className={`fa-solid ${status === 'done' ? 'fa-check' : status === 'in_progress' ? 'fa-spinner fa-spin' : 'fa-circle-dot'}`}></i>
                      <span>{statusLabel}</span>
                    </button>
                  </div>

                  {/* CONSTAT D'AUDIT */}
                  <div className="p-3 bg-slate-50 rounded-xl text-xs text-slate-700 border border-slate-200 leading-relaxed">
                    <strong className="text-slate-900 block mb-0.5">{lang === 'fr' ? 'Constat d\'Audit :' : 'Audit Finding:'}</strong>
                    {card.finding}
                  </div>

                  {/* OBJECTIF CHIFFRÉ */}
                  <div className="text-xs">
                    <strong className="text-blue-900 block">{t.actionCardGoal}</strong>
                    <p className="text-slate-700 font-semibold">{card.targetGoal}</p>
                  </div>

                  {/* PISTES D'AMÉLIORATION & DÉMARCHES */}
                  <div className="text-xs space-y-1">
                    <strong className="text-slate-800 block">{t.actionCardSteps}</strong>
                    <ul className="list-disc list-inside space-y-1 text-slate-600">
                      {card.steps.map((st, i) => (
                        <li key={i}>{st}</li>
                      ))}
                    </ul>
                  </div>

                  {/* RESPONSABLE & IMPACT */}
                  <div className="pt-2 border-t border-slate-100 text-xs flex flex-wrap items-center justify-between gap-2">
                    <span className="text-slate-500">
                      <strong>{t.actionCardOwner}</strong> {card.owner}
                    </span>
                    <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      {card.impact}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ================= HORIZON 3 : PÉRENNITÉ & EXPANSION (60 À 90 JOURS+) ================= */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center gap-2 px-1">
            <span className="w-3 h-3 rounded-full bg-emerald-600"></span>
            <h4 className="font-extrabold text-sm uppercase tracking-wider text-emerald-900">
              {t.horizon3Title}
            </h4>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {auditActionCards.filter(c => c.horizonKey === 'horizon3').map(card => {
              const status = actionStatuses[card.id] || 'todo';
              const statusBadgeClass = status === 'done'
                ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                : status === 'in_progress'
                ? 'bg-amber-100 text-amber-800 border-amber-300'
                : 'bg-slate-100 text-slate-700 border-slate-300';
              const statusLabel = status === 'done'
                ? t.actionStatusDone + ' ✓'
                : status === 'in_progress'
                ? t.actionStatusInProgress
                : t.actionStatusTodo;

              return (
                <div key={card.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3 hover:border-blue-400 transition">
                  <div className="flex items-start justify-between gap-2 border-b border-slate-100 pb-2.5">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[11px] font-black px-2 py-0.5 rounded bg-blue-900 text-white">
                          {card.code}
                        </span>
                        <span className="text-xs font-bold text-slate-500">
                          {card.periodLabel}
                        </span>
                      </div>
                      <h5 className="font-extrabold text-slate-800 text-sm mt-1">
                        {card.title}
                      </h5>
                    </div>

                    <button
                      type="button"
                      onClick={() => toggleActionStatus(card.id)}
                      className={`px-3 py-1 rounded-full text-xs font-bold border transition shadow-sm flex items-center gap-1.5 flex-shrink-0 cursor-pointer ${statusBadgeClass}`}
                      title="Changer le statut"
                    >
                      <i className={`fa-solid ${status === 'done' ? 'fa-check' : status === 'in_progress' ? 'fa-spinner fa-spin' : 'fa-circle-dot'}`}></i>
                      <span>{statusLabel}</span>
                    </button>
                  </div>

                  {/* CONSTAT D'AUDIT */}
                  <div className="p-3 bg-slate-50 rounded-xl text-xs text-slate-700 border border-slate-200 leading-relaxed">
                    <strong className="text-slate-900 block mb-0.5">{lang === 'fr' ? 'Constat d\'Audit :' : 'Audit Finding:'}</strong>
                    {card.finding}
                  </div>

                  {/* OBJECTIF CHIFFRÉ */}
                  <div className="text-xs">
                    <strong className="text-blue-900 block">{t.actionCardGoal}</strong>
                    <p className="text-slate-700 font-semibold">{card.targetGoal}</p>
                  </div>

                  {/* PISTES D'AMÉLIORATION & DÉMARCHES */}
                  <div className="text-xs space-y-1">
                    <strong className="text-slate-800 block">{t.actionCardSteps}</strong>
                    <ul className="list-disc list-inside space-y-1 text-slate-600">
                      {card.steps.map((st, i) => (
                        <li key={i}>{st}</li>
                      ))}
                    </ul>
                  </div>

                  {/* RESPONSABLE & IMPACT */}
                  <div className="pt-2 border-t border-slate-100 text-xs flex flex-wrap items-center justify-between gap-2">
                    <span className="text-slate-500">
                      <strong>{t.actionCardOwner}</strong> {card.owner}
                    </span>
                    <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      {card.impact}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// MODALE DU MANUEL UTILISATEUR OFFICIEL (FRANÇAIS & ANGLAIS)
// ============================================================================
function UserManualModalComponent({ lang, setLang, onClose }) {
  const [activeTab, setActiveTab] = useState('overview');

  const downloadFile = (filename) => {
    const link = document.createElement('a');
    link.href = filename;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportManualPdf = () => {
    if (window.AndroidNative && typeof window.AndroidNative.printPdf === 'function') {
      const manualUrl = isFr ? 'export_manual_pdf.html?lang=fr&print=true' : 'export_manual_pdf.html?lang=en&print=true';
      window.location.href = manualUrl;
    } else {
      window.open(`export_manual_pdf.html?lang=${lang}&print=true`, '_blank');
    }
  };

  const isFr = lang === 'fr';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/75 backdrop-blur-sm fade-in">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
        {/* EN-TETE DE LA MODALE */}
        <div className="bg-gradient-to-r from-blue-900 via-blue-950 to-slate-900 text-white p-4 sm:p-5 flex items-center justify-between gap-3 shadow-md">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-400/40 flex items-center justify-center font-bold text-xl shadow-sm">
              <i className="fa-solid fa-book-open"></i>
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-black tracking-wide flex items-center gap-2">
                <span>{isFr ? "Manuel d'Utilisation Officiel" : "Official User Manual & Guide"}</span>
                <span className="text-[10px] uppercase px-2 py-0.5 rounded-full bg-amber-500 text-slate-950 font-black">v2.0</span>
              </h3>
              <p className="text-[11px] text-blue-200 font-medium">THE FRATERNAL ORDER OF LADY EAGLES GROUP &bull; Sargo Cambodia Eagles</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* SELECTEUR LANGUE RAPIDE */}
            <div className="flex items-center bg-blue-800/80 p-0.5 rounded-lg border border-blue-700">
              <button
                type="button"
                onClick={() => { setLang('en'); localStorage.setItem('RE_LANG', 'en'); }}
                className={`px-2.5 py-1 rounded text-xs font-black transition ${lang === 'en' ? 'bg-amber-400 text-slate-950 shadow-sm' : 'text-blue-200 hover:text-white'}`}
              >
                EN
              </button>
              <button
                type="button"
                onClick={() => { setLang('fr'); localStorage.setItem('RE_LANG', 'fr'); }}
                className={`px-2.5 py-1 rounded text-xs font-black transition ${lang === 'fr' ? 'bg-amber-400 text-slate-950 shadow-sm' : 'text-blue-200 hover:text-white'}`}
              >
                FR
              </button>
            </div>

            <button
              type="button"
              onClick={() => downloadFile(isFr ? 'MANUEL_UTILISATEUR_FR.pdf' : 'USER_MANUAL_EN.pdf')}
              className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-lg flex items-center gap-1.5 shadow-sm transition"
              title={isFr ? "Télécharger le Manuel en PDF" : "Download Manual as PDF"}
            >
              <i className="fa-solid fa-file-pdf"></i>
              <span className="hidden sm:inline">PDF</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="w-9 h-9 rounded-lg bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition cursor-pointer"
              title={isFr ? "Fermer" : "Close"}
            >
              <i className="fa-solid fa-xmark text-lg"></i>
            </button>
          </div>
        </div>

        {/* BARRE D'ONGLETS / SECTIONS */}
        <div className="bg-slate-100 border-b border-slate-200 px-3 py-2 flex items-center gap-1.5 overflow-x-auto text-xs font-bold scrollbar-thin">
          <button
            type="button"
            onClick={() => setActiveTab('overview')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition flex items-center gap-1.5 ${
              activeTab === 'overview' ? 'bg-blue-900 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-200'
            }`}
          >
            <i className="fa-solid fa-compass"></i>
            <span>{isFr ? "1. Démarrage" : "1. Quickstart"}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('debits_credits')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition flex items-center gap-1.5 ${
              activeTab === 'debits_credits' ? 'bg-blue-900 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-200'
            }`}
          >
            <i className="fa-solid fa-money-bill-transfer"></i>
            <span>{isFr ? "2. Dépenses & Recettes" : "2. Incomes & Expenses"}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('families_categories')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition flex items-center gap-1.5 ${
              activeTab === 'families_categories' ? 'bg-blue-900 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-200'
            }`}
          >
            <i className="fa-solid fa-tags"></i>
            <span>{isFr ? "3. Familles A-Z" : "3. Families A-Z"}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('ledger_reports')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition flex items-center gap-1.5 ${
              activeTab === 'ledger_reports' ? 'bg-blue-900 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-200'
            }`}
          >
            <i className="fa-solid fa-file-pdf"></i>
            <span>{isFr ? "4. Grand Livre & PDF" : "4. Ledger & PDF"}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('audit_roadmap')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition flex items-center gap-1.5 ${
              activeTab === 'audit_roadmap' ? 'bg-blue-900 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-200'
            }`}
          >
            <i className="fa-solid fa-clipboard-check text-amber-300"></i>
            <span>{isFr ? "5. Audit & Fiches d'Action" : "5. Audit & Actions"}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('settings_sync')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition flex items-center gap-1.5 ${
              activeTab === 'settings_sync' ? 'bg-blue-900 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-200'
            }`}
          >
            <i className="fa-solid fa-sliders"></i>
            <span>{isFr ? "6. Sécurité & ZIP" : "6. Security & ZIP"}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('pc_mobile')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition flex items-center gap-1.5 ${
              activeTab === 'pc_mobile' ? 'bg-blue-900 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-200'
            }`}
          >
            <i className="fa-solid fa-laptop"></i>
            <span>{isFr ? "7. PC & Smartphone" : "7. PC & Mobile"}</span>
          </button>
        </div>

        {/* CONTENU DÉTAILLÉ DE LA SECTION SÉLECTIONNÉE */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed flex-1">
          {activeTab === 'overview' && (
            <div className="space-y-4 fade-in">
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl">
                <h4 className="font-black text-blue-900 text-sm sm:text-base flex items-center gap-2 mb-1">
                  <i className="fa-solid fa-shield-halved text-blue-700"></i>
                  <span>{isFr ? "Présentation Institutionnelle" : "Institutional Presentation"}</span>
                </h4>
                <p>
                  {isFr
                    ? "TREASURER'S REPORT est l'application officielle de trésorerie conçue pour THE FRATERNAL ORDER OF LADY EAGLES GROUP (Financial Record). Elle permet une gestion financière rigoureuse, transparente et conforme, consultable à tout moment en français et en anglais."
                    : "TREASURER'S REPORT is the official treasury application designed for THE FRATERNAL ORDER OF LADY EAGLES GROUP (Financial Record). It enables rigorous, transparent, and compliant financial governance, accessible in English and French."}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-1.5">
                  <h5 className="font-black text-slate-800 flex items-center gap-2">
                    <i className="fa-solid fa-key text-amber-600"></i>
                    <span>{isFr ? "Authentification Sécurisée" : "Secure Authentication"}</span>
                  </h5>
                  <p className="text-xs">
                    {isFr ? "Identifiants par défaut :" : "Default credentials:"} <code className="bg-white px-1.5 py-0.5 rounded border font-mono">admin</code> / <code className="bg-white px-1.5 py-0.5 rounded border font-mono">eagles2026</code>.
                    {isFr ? " Modifiables à tout moment dans l'onglet Paramètres." : " Can be modified anytime in Settings."}
                  </p>
                </div>

                <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-1.5">
                  <h5 className="font-black text-slate-800 flex items-center gap-2">
                    <i className="fa-solid fa-triangle-exclamation text-red-600"></i>
                    <span>{isFr ? "Alerte Solde Négatif" : "Negative Balance Alert"}</span>
                  </h5>
                  <p className="text-xs">
                    {isFr
                      ? "Si la trésorerie nette devient déficitaire, un bandeau rouge clignotant s'affiche automatiquement en haut de l'écran avec le montant du déficit."
                      : "If net cashflow becomes negative, a flashing red banner immediately alerts you with the exact deficit figure."}
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'debits_credits' && (
            <div className="space-y-4 fade-in">
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                <h4 className="font-black text-slate-900 text-sm flex items-center gap-2">
                  <i className="fa-solid fa-arrow-down-long text-red-600"></i>
                  <span>{isFr ? "Saisie des Dépenses (Débits)" : "Expense Entry (Debits)"}</span>
                </h4>
                <ul className="list-disc list-inside space-y-1 text-xs text-slate-600">
                  <li><strong>{isFr ? "Calendrier :" : "Calendar:"}</strong> {isFr ? "Sélecteur bilingue avec boutons clairs Définir, Annuler, Effacer." : "Bilingual picker with clear Set, Cancel, Clear actions."}</li>
                  <li><strong>{isFr ? "Familles à la volée :" : "On-the-fly families:"}</strong> {isFr ? "Bouton '+ Nouvelle Famille' avec fenêtre explicite sans quitter le formulaire." : "Direct '+ New Family' button with explicit popup."}</li>
                  <li><strong>{isFr ? "Attribution nominative :" : "Member attribution:"}</strong> {isFr ? "Champ optionnel pour associer le nom du membre ou du demandeur." : "Optional field to record the responsible member's name."}</li>
                  <li><strong>{isFr ? "Réinitialisation vierge :" : "Clean reset:"}</strong> {isFr ? "Tous les champs se vident automatiquement après chaque enregistrement." : "All fields clear automatically upon saving for the next entry."}</li>
                </ul>
              </div>

              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                <h4 className="font-black text-slate-900 text-sm flex items-center gap-2">
                  <i className="fa-solid fa-arrow-up-long text-green-600"></i>
                  <span>{isFr ? "Saisie des Recettes (Crédits)" : "Revenue Entry (Credits)"}</span>
                </h4>
                <p className="text-xs text-slate-600">
                  {isFr
                    ? "Enregistrez cotisations, dons et sponsorings en spécifiant la date, le motif, le montant USD, la référence reçu et le nom du membre cotisant (optionnel)."
                    : "Record membership dues, donations, and sponsorships with transaction date, source reason, USD amount, receipt reference, and optional donor/member name."}
                </p>
              </div>
            </div>
          )}

          {activeTab === 'families_categories' && (
            <div className="space-y-4 fade-in">
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                <h4 className="font-black text-slate-900 text-sm flex items-center gap-2">
                  <i className="fa-solid fa-arrow-down-a-z text-blue-700"></i>
                  <span>{isFr ? "Tri Alphabétique des Familles A-Z" : "Automatic Alphabetical Ordering A-Z"}</span>
                </h4>
                <p className="text-xs text-slate-600">
                  {isFr
                    ? "Toutes les 7 familles budgétaires officielles (Alalayang Agila, Community Service, En Rent, Monthly dues, Petty Cash, Sharing of SCLEG, Voluntary Donation) sont triées rigoureusement de A à Z pour une navigation instantanée et fluide."
                    : "All 7 official budgetary families (Alalayang Agila, Community Service, En Rent, Monthly dues, Petty Cash, Sharing of SCLEG, Voluntary Donation) are strictly sorted alphabetically from A to Z for rapid, intuitive lookups."}
                </p>
              </div>

              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                <h4 className="font-black text-slate-900 text-sm flex items-center gap-2">
                  <i className="fa-solid fa-users text-purple-700"></i>
                  <span>{isFr ? "Annuaire Officiel des 33 Membres Eagles" : "Official 33 Eagles Members Directory"}</span>
                </h4>
                <p className="text-xs text-slate-600">
                  {isFr
                    ? "L'onglet Membres liste les 33 membres officiels du club (Présidente, Trésorière, Secrétaire, Directeurs, Membres) avec téléphone, métier, adresse au Cambodge et contacts d'urgence. Vous pouvez ajouter, modifier ou retirer des membres à tout moment."
                    : "The Members tab features the 33 official club members (President, Treasurer, Secretary, Board of Directors, Members) with telephone, occupation, Cambodian address, and emergency contact details. You can add, edit, or remove members at any time."}
                </p>
              </div>
            </div>
          )}

          {activeTab === 'ledger_reports' && (
            <div className="space-y-4 fade-in">
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                <h4 className="font-black text-slate-900 text-sm flex items-center gap-2">
                  <i className="fa-solid fa-file-pdf text-red-600"></i>
                  <span>{isFr ? "Grand Livre & Export PDF Officiel" : "General Ledger & Official PDF Export"}</span>
                </h4>
                <p className="text-xs text-slate-600">
                  {isFr
                    ? "Filtrez vos écritures par plage de dates, par date unique ou sur l'historique complet. Cliquez sur 'Exporter en PDF' pour générer un document A4 officiel avec en-tête Eagles, filigrane aigle centré et tableau complet des transactions."
                    : "Filter records by custom date ranges, single date, or complete ledger history. Click 'Export to PDF' to generate an official A4 document with club crest header, watermarked eagle seal, and certified transactions table."}
                </p>
              </div>
            </div>
          )}

          {activeTab === 'audit_roadmap' && (
            <div className="space-y-4 fade-in">
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl space-y-2">
                <h4 className="font-black text-blue-950 text-sm flex items-center gap-2">
                  <i className="fa-solid fa-clipboard-check text-amber-500"></i>
                  <span>{isFr ? "Rapport d'Audit & Fiches d'Action (3 Mois)" : "Audit Report & Action Cards (3 Months)"}</span>
                </h4>
                <p className="text-xs text-blue-900">
                  {isFr
                    ? "Accessible dans le sous-menu 6 de l'onglet 'Statistiques, Rapports & Audit'. Ce module fournit un audit complet de santé financière :"
                    : "Located in sub-view 6 under 'Analytics, Reports & Audit'. Provides full diagnostic and forward-looking financial governance:"}
                </p>
                <ul className="list-disc list-inside space-y-1 text-xs text-slate-700">
                  <li><strong>{isFr ? "Score / 100 & Niveau de Risque :" : "Score / 100 & Risk Assessment:"}</strong> {isFr ? "Évaluation dynamique et jauge de conformité." : "Live compliance rating and risk gauge."}</li>
                  <li><strong>{isFr ? "Trajectoire Prévisionnelle sur 3 Mois :" : "3-Month Forecast Trajectory:"}</strong> {isFr ? "Flux nets et soldes projetés pour M+1, M+2 et M+3." : "Projected revenues, burn, and cumulative cash balances."}</li>
                  <li><strong>{isFr ? "6 Fiches d'Action dans le temps :" : "6 Time-Phased Action Cards:"}</strong> {isFr ? "Réparties sur 3 horizons chronologiques (0-30j, 30-60j, 60-90j)." : "Organized across 3 horizons (0-30d, 30-60d, 60-90d)."}</li>
                  <li><strong>{isFr ? "Statut interactif mémorisé :" : "Interactive Status Toggle:"}</strong> {isFr ? "Cliquez sur chaque badge pour basculer (À Planifier ➜ En Cours ➜ Réalisé)." : "Click badges to toggle (To Plan ➜ In Progress ➜ Completed)."}</li>
                  <li><strong>{isFr ? "Export PDF d'Audit :" : "Audit PDF Export:"}</strong> {isFr ? "Édition du rapport officiel certifié." : "Official certified PDF export button."}</li>
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'settings_sync' && (
            <div className="space-y-4 fade-in">
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                <h4 className="font-black text-slate-900 text-sm flex items-center gap-2">
                  <i className="fa-solid fa-shield-cat text-blue-800"></i>
                  <span>{isFr ? "Sécurité, Sauvegardes ZIP & Synchronisation" : "Security, ZIP Backups & Synchronization"}</span>
                </h4>
                <ul className="list-disc list-inside space-y-1 text-xs text-slate-600">
                  <li><strong>{isFr ? "Identifiants :" : "Credentials:"}</strong> {isFr ? "Changement de login et mot de passe avec saisie de l'ancien et du nouveau." : "Change username and password with old/new validation fields."}</li>
                  <li><strong>{isFr ? "Sauvegarde ZIP par dates :" : "ZIP Backup by dates:"}</strong> {isFr ? "Générez une archive ZIP de la période de votre choix avec export JSON et rapport HTML." : "Export a portable ZIP archive with date-filtered JSON and HTML summary."}</li>
                  <li><strong>{isFr ? "Restauration JSON :" : "JSON Restore:"}</strong> {isFr ? "Réintégrez vos données en un clic." : "Restore previous database backups seamlessly."}</li>
                  <li><strong>{isFr ? "Synchro Wi-Fi / 5G :" : "Wi-Fi / 5G Sync:"}</strong> {isFr ? "Synchronisation directe entre le PC et le téléphone sur le réseau local." : "Direct two-way synchronization between PC and mobile on the local network."}</li>
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'pc_mobile' && (
            <div className="space-y-4 fade-in">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-1.5">
                  <h5 className="font-black text-slate-900 flex items-center gap-2">
                    <i className="fa-solid fa-desktop text-blue-700"></i>
                    <span>{isFr ? "Version PC (Windows)" : "PC Version (Windows)"}</span>
                  </h5>
                  <p className="text-xs text-slate-600">
                    {isFr
                      ? "Double-cliquez sur l'icône RachelEagles du Bureau. Le serveur démarre en tâche de fond de façon transparente sans fenêtre noire, et l'application s'ouvre dans une fenêtre dédiée sans barre d'URL."
                      : "Double-click the RachelEagles Desktop icon. The local background daemon launches silently without a console window, opening the app in standalone desktop mode."}
                  </p>
                </div>

                <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-1.5">
                  <h5 className="font-black text-slate-900 flex items-center gap-2">
                    <i className="fa-solid fa-mobile-screen-button text-emerald-700"></i>
                    <span>{isFr ? "Version Smartphone (Android)" : "Smartphone Version (Android)"}</span>
                  </h5>
                  <p className="text-xs text-slate-600">
                    {isFr
                      ? "Application APK 100% autonome et hors-ligne. Les boutons WhatsApp, Telegram et Gmail déclenchent directement les applications natives du téléphone."
                      : "100% offline standalone APK. WhatsApp, Telegram, and Gmail buttons directly trigger your phone's native applications."}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* PIED DE MODALE */}
        <div className="bg-slate-50 border-t border-slate-200 p-3 sm:p-4 flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => downloadFile(isFr ? 'MANUEL_UTILISATEUR_FR.pdf' : 'USER_MANUAL_EN.pdf')}
              className="px-3.5 py-1.5 bg-red-700 hover:bg-red-800 text-white font-bold rounded-lg flex items-center gap-1.5 shadow-xs transition cursor-pointer"
            >
              <i className="fa-solid fa-file-pdf"></i>
              <span>{isFr ? "Télécharger le Manuel (PDF)" : "Download Manual (PDF)"}</span>
            </button>

            <button
              type="button"
              onClick={exportManualPdf}
              className="px-3.5 py-1.5 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-lg flex items-center gap-1.5 shadow-xs transition cursor-pointer"
            >
              <i className="fa-solid fa-print"></i>
              <span>{isFr ? "Imprimer / Exporter (PDF)" : "Print / Export (PDF)"}</span>
            </button>

            <button
              type="button"
              onClick={() => downloadFile(isFr ? 'MANUEL_UTILISATEUR_FR.md' : 'USER_MANUAL_EN.md')}
              className="px-2.5 py-1.5 bg-white hover:bg-slate-100 text-slate-600 font-bold rounded-lg border border-slate-300 flex items-center gap-1.5 shadow-2xs transition cursor-pointer"
            >
              <i className="fa-solid fa-file-lines text-slate-500"></i>
              <span>{isFr ? "Version Markdown (.md)" : "Markdown Version (.md)"}</span>
            </button>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="px-5 py-1.5 bg-blue-900 hover:bg-blue-950 text-white font-bold rounded-lg shadow-sm transition cursor-pointer"
          >
            {isFr ? "Fermer" : "Close"}
          </button>
        </div>
      </div>
    </div>
  );
}

// Initialisation React
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<RachelEaglesApp />);
