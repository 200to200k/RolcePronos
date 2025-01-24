<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Page d'accueil</title>
    <link rel="stylesheet" href="style.css">
    <style>
        /* Ajout ou modification du CSS */
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
        }

        .topbar {
            display: flex;
            justify-content: space-between;
            align-items: center;
            background-color: #333;
            color: #fff;
            padding: 10px 20px;
        }

        .topbar .logo {
            font-size: 20px;
            font-weight: bold;
        }

        .topbar nav a {
            color: #fff;
            text-decoration: none;
            margin: 0 10px;
        }

        .topbar nav a:hover {
            text-decoration: underline;
        }

        .main-section {
            padding: 20px;
        }

        .block {
            margin-bottom: 40px;
        }

        .block h2 {
            margin-bottom: 20px;
            color: #333;
        }

        .tableau {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 10px;
        }

        .tableau th, .tableau td {
            border: 1px solid #ddd;
            padding: 8px;
            text-align: center;
        }

        .tableau th {
            background-color: #f4f4f4;
        }

        .btn-plus {
            display: inline-block;
            background-color: #007bff;
            color: white;
            border: none;
            padding: 10px 20px;
            cursor: pointer;
            font-size: 14px;
        }

        .btn-plus:hover {
            background-color: #0056b3;
        }
    </style>
</head>
<body>
    <!-- Topbar -->
    <div class="topbar">
        <div class="logo">Mon Logo</div>
        <nav>
            <a href="home.html">Accueil</a>
            <a href="bankroll.html">Bankroll</a>
            <a href="bonushunt.html">Bonushunt</a>
            <a href="bonus.html">Bonus</a>
        </nav>
    </div>

    <!-- Main content -->
    <div class="main-section">
        <!-- Image with shadow -->
        <div class="image-container">
            <img src="image.jpg" alt="Image principale" class="image">
        </div>

        <!-- First block: Bankroll -->
        <div class="block">
            <h2>Bankroll</h2>
            <!-- Tableau Bankroll -->
            <table id="bankroll" class="tableau">
                <!-- Le tableau sera rempli par le script -->
            </table>
        </div>

        <!-- Second block: Suivi des paris -->
        <div class="block">
            <h2>Suivi des paris</h2>
            <!-- Tableau des paris -->
            <table id="suivi-des-paris" class="tableau">
                <!-- Le tableau sera rempli par le script -->
            </table>
            <button class="btn-plus" onclick="loadMoreBets()">+ Afficher plus de paris</button>
        </div>
    </div>

    <!-- Scripts -->
    <script>
        // URLs des Google Sheets exportées en CSV
        const BANKROLL_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTRLKMNFqQpf8K5ftVNp6E09gHTq1s7us_lB_Bh37hnWRf3OUAidGXZqfkiLBEL5MIKqrFtzr-1uEUr/pub?output=csv';
        const PARIS_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTRLKMNFqQpf8K5ftVNp6E09gHTq1s7us_lB_Bh37hnWRf3OUAidGXZqfkiLBEL5MIKqrFtzr-1uEUr/pub?gid=474886906&single=true&output=csv';

        // Limite initiale des paris affichés
        let parisLimit = 5;

        // Fonction pour charger un fichier CSV et le convertir en tableau HTML
        function loadCSV(url, callback) {
            fetch(url)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`Erreur HTTP : ${response.status}`);
                    }
                    return response.text();
                })
                .then(data => callback(data))
                .catch(error => console.error('Erreur lors du chargement du CSV :', error));
        }

        // Fonction pour afficher les données d'un CSV dans un tableau
        function csvToTable(csvData, tableId, limit = null) {
            const rows = csvData.trim().split('\n');
            const table = document.getElementById(tableId);
            table.innerHTML = ''; // Réinitialiser le tableau

            rows.slice(0, limit || rows.length).forEach((row, index) => {
                const cells = row.split(',');
                if (cells.length > 1) {
                    const tr = document.createElement('tr');
                    cells.forEach((cell, i) => {
                        const td = document.createElement(index === 0 ? 'th' : 'td'); // En-têtes pour la première ligne
                        td.textContent = cell.trim();
                        tr.appendChild(td);
                    });
                    table.appendChild(tr);
                }
            });
        }

        // Charger les données de la bankroll
        function loadBankroll() {
            loadCSV(BANKROLL_URL, (csvData) => {
                csvToTable(csvData, 'bankroll');
            });
        }

        // Charger les paris avec une limite
        function loadLastBets() {
            loadCSV(PARIS_URL, (csvData) => {
                csvToTable(csvData, 'suivi-des-paris', parisLimit);
            });
        }

        // Afficher plus de paris
        function loadMoreBets() {
            parisLimit += 5; // Augmenter la limite
            loadLastBets();
        }

        // Charger les données au démarrage
        window.onload = function () {
            loadBankroll();   // Charger les données de la bankroll
            loadLastBets();   // Charger les données du suivi des paris
        };
    </script>
</body>
</html>
