# Manuel Utilisateur Officiel — The Fraternal Order of Lady Eagles
**Foundation to Financial Record — Trésorerie & Audit Prévisionnel**  
*The Fraternal Order of Lady Eagles — Sargo Cambodia Eagles Club & Lady Eagles Group*  
*Version : 2.0 (Hybride PC & Android)* — *Date de mise à jour : Octobre 2026*

---

## Sommaire
1. [Introduction & Présentation Générale](#1-introduction--présentation-générale)
2. [Installation & Démarrage (PC & Android)](#2-installation--démarrage-pc--android)
3. [Authentification & Sécurité](#3-authentification--sécurité)
4. [Barre d'Outils Supérieure & En-tête](#4-barre-doutils-supérieure--en-tête)
5. [Onglet 1 : Accueil (Home)](#5-onglet-1--accueil-home)
6. [Onglet 2 : Nouvelle Dépense (Débits)](#6-onglet-2--nouvelle-dépense-débits)
7. [Onglet 3 : Nouvelle Recette (Crédits)](#7-onglet-3--nouvelle-recette-crédits)
8. [Onglet 4 : Familles & Catégories](#8-onglet-4--familles--catégories)
9. [Onglet 5 : Statistiques, Rapports & Audit](#9-onglet-5--statistiques-rapports--audit)
   - [5.1 Grand Livre & Journal (Filtrages et Export PDF)](#51-grand-livre--journal)
   - [5.2 Histogramme & Camembert Global](#52-histogramme--camembert-global)
   - [5.3 Ventilation par Famille & Catégorie](#53-ventilation-par-famille--catégorie)
   - [5.4 Analyses Personnalisées](#54-analyses-personnalisées)
   - [5.5 Rapport d'Audit & Fiches d'Action dans le Temps (3 Mois)](#55-rapport-daudit--fiches-daction-dans-le-temps-3-mois)
10. [Onglet 6 : Paramètres (Settings)](#10-onglet-6--paramètres-settings)
    - [Gestion des Identifiants & Mots de Passe](#gestion-des-identifiants--mots-de-passe)
    - [Sauvegarde & Exportation d'Archive ZIP](#sauvegarde--exportation-darchive-zip)
    - [Restauration des Données](#restauration-des-données)
    - [Synchronisation Réseau Local (Wi-Fi / 5G)](#synchronisation-réseau-local-wi-fi--5g)
11. [Guide de Dépannage & Bonnes Pratiques](#11-guide-de-dépannage--bonnes-pratiques)

---

## 1. Introduction & Présentation Générale

L'application **RachelEagles** a été spécialement conçue pour répondre aux exigences comptables et de gouvernance de la fraternité **The Fraternal Order of Eagles**, plus particulièrement pour le **Sargo Cambodia Eagles Club** et le **Lady Eagles Group**.

Elle assure :
- La tenue d'une comptabilité de trésorerie claire et conforme (recettes, dépenses, rapprochement de solde).
- La gestion dynamique d'un plan analytique hiérarchisé (**Familles** et **Catégories**).
- L'attribution nominative et optionnelle des dépenses et recettes par membre.
- L'édition de rapports officiels et d'états comptables au format **PDF** enrichis des emblèmes officiels (en-têtes et filigrane aigle).
- Un module avancé d'**Audit Financier avec Fiches d'Action dans le temps** pour anticiper la trésorerie sur 3 mois et piloter les actions correctives.
- Une utilisation **100% autonome et hors-ligne** sur smartphone Android et sur ordinateur PC Windows, avec synchronisation locale sécurisée.

---

## 2. Installation & Démarrage (PC & Android)

### 2.1 Sur Ordinateur PC (Windows)
1. **Démarrage en 1 clic** : Rendez-vous sur votre Bureau Windows et double-cliquez sur l'icône officielle **RachelEagles** (représentant l'aigle).
2. **Fonctionnement silencieux** : Le lanceur sécurisé démarre automatiquement le serveur local en arrière-plan sans afficher de fenêtre noire, puis ouvre l'application dans une fenêtre autonome dédiée (sans barre d'adresse de navigateur).
3. **Alternative manuelle** : Vous pouvez également exécuter le fichier `Lancer_RachelEagles.bat` situé dans le dossier du projet `D:\AndroidProjects\RachelEagles`.

### 2.2 Sur Smartphone Android
1. **Application native APK** : Installez le fichier `RachelEagles.apk` sur votre téléphone Android.
2. **Lancement** : Appuyez sur l'icône **Rachel Eagles** dans la liste de vos applications.
3. L'application s'exécute nativement et fonctionne **100% hors-ligne**, sans dépendre d'une connexion internet pour vos opérations quotidiennes.

---

## 3. Authentification & Sécurité

Pour préserver la confidentialité financière de la fondation, l'application est protégée dès l'ouverture :
1. **Écran de connexion** : Saisissez votre **Nom d'utilisateur** et votre **Mot de passe**.
2. **Identifiants initiaux par défaut** :
   - Utilisateur : `admin`
   - Mot de passe : `eagles2026`
3. **Mémorisation de session** : L'application conserve votre authentification sur l'appareil.
4. **Modification des accès** : Vous pouvez modifier à tout moment le login et le mot de passe dans l'onglet **Paramètres**.

---

## 4. Barre d'Outils Supérieure & En-tête

En haut de chaque écran, l'en-tête officiel regroupe tous les contrôles clés :
- **Emblèmes officiels Eagles** : Logo du club et sceaux institutionnels.
- **Bouton d'Information `(i)`** : Ouvre à tout instant ce Manuel Utilisateur complet, en français ou en anglais.
- **Sélecteur de Langue (FR / EN)** : Bascule instantanément toute l'interface entre le français et l'anglais.
- **Raccourcis de Partage & Messagerie** :
  - **Icône WhatsApp** : Ouvre directement l'application WhatsApp pour partager un point de situation ou contacter un responsable.
  - **Icône Telegram** : Déclenche l'application native Telegram.
  - **Icône E-mail (Gmail)** : Ouvre l'application Gmail avec un e-mail pré-rempli contenant le solde et le récapitulatif.
- **Bouton Synchroniser** : Lance une synchronisation instantanée des écritures avec le serveur local du club.
- **Alerte Solde Négatif** : Si le solde net de trésorerie devient négatif, une bannière rouge d'alerte clignotante apparaît automatiquement avec la mention explicite du déficit et l'invitation à consulter le diagnostic d'audit.

---

## 5. Onglet 1 : Accueil (Home)

L'onglet **Accueil** offre une vision globale et immédiate de l'état financier :
1. **Total des Crédits (Recettes)** : Somme totale des entrées financières en USD.
2. **Total des Débits (Dépenses)** : Somme totale des sorties en USD.
3. **Solde Net (Available Cash)** : Solde de trésorerie disponible en temps réel.
4. **Boutons d'Action Rapide** :
   - `+ Nouveau Débit` : Bascule vers la saisie rapide d'une dépense.
   - `+ Nouveau Crédit` : Bascule vers la saisie rapide d'une recette.
   - `Voir Statistiques` : Accède au tableau de bord analytique et d'audit.
5. **Tableau des Dernières Opérations** :
   - Historique immédiat des transactions récentes classées par ordre chronologique décroissant.
   - Colonnes : Date, Type (Crédit / Débit), Famille & Catégorie, Réf. Facture / Reçu, Remarque, Montant USD.

---

## 6. Onglet 2 : Nouvelle Dépense (Débits)

Cet onglet permet l'enregistrement de tout décaissement :
1. **Date de l'opération** : Par défaut la date du jour, modifiable via le sélecteur de calendrier natif (avec options claires *Définir*, *Annuler*, *Effacer*).
2. **Famille & Catégorie** :
   - Sélectionnez la famille de dépense, puis la catégorie associée.
   - **Ajout à la volée** : Utilisez les boutons `+ Nouvelle Famille` et `+ Nouvelle Catégorie` pour créer instantanément un nouveau poste sans quitter la saisie. Une fenêtre explicite s'affiche : *« Ajouter une nouvelle famille »* ou *« Ajouter une nouvelle catégorie »*.
3. **Montant (USD)** : Montant de la dépense en dollars.
4. **Référence Facture / Reçu** : Numéro de facture, reçu de caisse ou pièce justificative.
5. **Nom de la personne (Optionnel)** : Nom du membre, bénévole ou prestataire ayant engagé ou reçu le règlement.
6. **Remarque / Objet** : Description libre de la dépense.
7. **Validation** : Bouton `Enregistrer le Débit`. À la validation, tous les champs sont réinitialisés vierges pour la saisie suivante.
8. **Tableau des Débits enregistrés** : Permet de consulter l'historique des débits, de modifier le montant ou d'annuler/supprimer une ligne en cas d'erreur.

---

## 7. Onglet 3 : Nouvelle Recette (Crédits)

Cet onglet est dédié à l'encaissement des fonds :
1. **Date de l'opération** : Date de perception des fonds.
2. **Motif d'entrée** : Cotisation mensuelle, don, sponsoring, participation à un événement...
3. **Montant (USD)** : Valeur perçue en dollars.
4. **Référence Reçu / Pièce** : Numéro du reçu délivré au donateur ou cotisant.
5. **Nom de la personne (Optionnel)** : Nom du membre ou du donateur ayant versé les fonds.
6. **Remarque** : Précision éventuelle.
7. **Validation** : Bouton `Enregistrer le Crédit`. Tous les champs sont réinitialisés vierges pour la saisie suivante.
8. **Tableau des Crédits** : Liste complète des recettes avec recherche et options de gestion.

---

## 8. Onglet 4 : Familles & Catégories

Ce module structure l'architecture comptable :
1. **Classement Alphabétique Automatique** : Toutes les familles et sous-catégories sont automatiquement ordonnées de A à Z pour un repérage immédiat.
2. **Création d'une Famille** : Saisissez l'intitulé (ex. *Électricité*, *Transport*, *Alimentation*) et validez.
3. **Création d'une Catégorie** : Sélectionnez la famille parente et ajoutez la catégorie correspondante (ex. *Essence*, *Location minibus*, *Eau minérale*).
4. **Modification & Suppression** : Boutons d'édition et de suppression sécurisée pour chaque élément.

---

## 9. Onglet 5 : Statistiques, Rapports & Audit

Renommé **« Statistiques, Rapports & Audit »**, cet onglet regroupe 6 vues puissantes :

### 5.1 Grand Livre & Journal
- **Filtres de dates** : Choix entre *Plage de dates* (Du ... Au ...), *Date spécifique* ou *Historique complet*.
- **Tableau détaillé du Grand Livre** avec montants totaux calculés dynamiquement.
- **Bouton « Exporter en PDF »** : Génère un document officiel au format A4 avec en-tête Rachel Eagles, watermark aigle en filigrane, récapitulatif financier et liste complète des écritures.

### 5.2 Histogramme & Camembert Global
- Visualisation graphique des flux globaux (recettes vs dépenses).
- Diagramme circulaire Chart.js de la répartition financière.

### 5.3 Ventilation par Famille & Catégorie
- Décomposition précise des dépenses par grandes familles budgétaires.
- Analyse détaillée des catégories les plus dépensières.

### 5.4 Analyses Personnalisées
- Indicateurs synthétiques et ratios d'exploitation du club.

### 5.5 Rapport d'Audit & Fiches d'Action dans le Temps (3 Mois)
Il s'agit du module d'audit institutionnel destiné au Trésorier et au Conseil d'Administration des Eagles :
1. **Bannière d'Audit Officielle** :
   - Badge officiel `AUDIT OFFICIEL`.
   - Bouton `Export Official Audit Report (PDF)` permettant d'éditer un document d'audit officiel imprimable et partageable.
2. **Score de Santé Financière & Risque** :
   - Note sur 100 calculée selon la couverture des charges et l'avancement des actions.
   - Niveau de risque qualifié : *Faible (Vert)*, *Modéré (Ambre)* ou *Élevé (Rouge)*.
   - Barre de progression dynamique indiquant le pourcentage d'actions réalisées.
3. **Métriques Clés de l'Audit** :
   - Recettes mensuelles moyennes.
   - Dépenses opérationnelles moyennes (burn rate).
   - Cash-flow net mensuel moyen.
   - Taux de couverture des réserves de sécurité (face à l'objectif de 2,5 mois).
4. **Trajectoire Prévisionnelle de Trésorerie sur 3 Mois (M+1, M+2, M+3)** :
   - Cartes prévisionnelles pour chacun des trois prochains mois avec recettes estimées, charges estimées, flux net mensuel et solde cumulé projeté.
5. **Feuille de Route & Fiches d'Action dans le Temps** :
   Les pistes d'amélioration sont réparties sur 3 horizons temporels structurés :
   - **Horizon 1 (0 – 30 jours / Mois 1) — Actions Immédiates** :
     - *ACTION-01* : Rationalisation des dépenses dominantes (plafonnement des décaissements majeurs, au moins 2 devis comparatifs, double signature).
     - *ACTION-02* : Mobilisation accélérée des cotisations (échéancier strict au 5 du mois, relevés individuels transmis aux membres).
   - **Horizon 2 (30 – 60 jours / Mois 2) — Consolidation & Réserves** :
     - *ACTION-03* : Réserve de sécurité d'urgence (dotation automatique de 15% de tout encaissement sur un sous-compte de réserve intouchable).
     - *ACTION-04* : Traçabilité des décaissements & conformité des reçus (100% des dépenses justifiées par reçu scanné et membre identifié).
   - **Horizon 3 (60 – 90 jours / Mois 3+) — Pérennité & Gouvernance** :
     - *ACTION-05* : Diversification des recettes & sponsoring (partenariats avec commerces locaux, organisation du tournoi caritatif annuel).
     - *ACTION-06* : Revue trimestrielle de gouvernance (audit contradictoire des écarts entre budget prévisionnel et réalisé présenté au Conseil des Eagles).
   - **Suivi Interactif** : En cliquant sur le badge de statut de chaque fiche, vous basculez son état (*À Planifier* ➜ *En Cours* ➜ *Réalisé*). L'avancement est mémorisé sur votre appareil et met à jour en temps réel la barre d'audit.

---

## 10. Onglet 6 : Paramètres (Settings)

### Gestion des Identifiants & Mots de Passe
- **Changement d'identifiant** : Saisissez l'ancien login puis le nouveau login.
- **Changement de mot de passe** : Saisissez l'ancien mot de passe puis le nouveau mot de passe.
- Cliquez sur `Sauvegarder les identifiants` pour appliquer la modification sécurisée.

### Sauvegarde & Exportation d'Archive ZIP
- Sélectionnez la période désirée avec les dates *Du* et *Au*.
- Cliquez sur `Générer & Télécharger le fichier ZIP`.
- L'application télécharge instantanément une archive ZIP autonome contenant la base de données au format `.json` et un rapport HTML récapitulatif.

### Restauration des Données
- Cliquez sur `Sélectionner le fichier à restaurer (.json)`.
- Choisissez votre sauvegarde antérieure : les écritures et nomenclatures sont réintégrées immédiatement.

### Synchronisation Réseau Local (Wi-Fi / 5G)
- L'application intègre une passerelle de synchronisation directe entre le téléphone et le PC connectés au même réseau local ou point d'accès.
- Renseignez l'adresse IP du serveur du club et appuyez sur `Synchroniser maintenant`.

---

## 11. Guide de Dépannage & Bonnes Pratiques

- **Sauvegardes régulières** : Il est recommandé de générer une archive ZIP à chaque fin de mois ou après chaque événement majeur.
- **Impression PDF sur Smartphone** : Lors de l'export PDF sur Android, l'aperçu système vous propose de choisir votre imprimante Wi-Fi ou de sélectionner l'option *« Enregistrer au format PDF »* dans vos fichiers de téléchargement.
- **Connexion hors-ligne** : L'ensemble de vos transactions et fiches d'audit restent enregistrées sur votre appareil même en coupant tout réseau.
