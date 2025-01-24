<script>
    // Limite initiale des paris affichés
    let parisLimit = 5;

    // Fonction pour charger et afficher plus de paris
    function loadMoreBets() {
        // Augmenter la limite des paris affichés
        parisLimit += 5;

        // URL du fichier CSV (mettez ici l'URL de votre Google Sheet exportée en CSV)
        const sheetURL = 'https://docs.google.com/spreadsheets/d/e/ID_DE_VOTRE_FEUILLE/pub?output=csv';

        // Charger les données depuis le CSV
        loadCSV(sheetURL, (csvData) => {
            // Diviser les données CSV en lignes
            const rows = csvData.split('\n');

            // Sélectionner le tableau pour les paris
            const table = document.getElementById('suivi-des-paris');
            table.innerHTML = ''; // Réinitialiser le tableau avant de le remplir

            // Afficher les paris jusqu'à la limite actuelle
            rows.slice(0, parisLimit).forEach((row) => {
                const cells = row.split(',');
                if (cells.length > 1) {
                    // Créer une nouvelle ligne pour chaque pari
                    const tr = document.createElement('tr');
                    cells.forEach((cell) => {
                        const td = document.createElement('td');
                        td.textContent = cell.trim(); // Nettoyer les données
                        tr.appendChild(td);
                    });
                    table.appendChild(tr);
                }
            });
        });
    }

    // Fonction générique pour charger un fichier CSV
    function loadCSV(url, callback) {
        fetch(url)
            .then(response => response.text())
            .then(data => callback(data))
            .catch(error => console.error('Erreur lors du chargement du CSV :', error));
    }

    // Charger les données initiales des paris au chargement de la page
    window.onload = function () {
        loadMoreBets(); // Appeler la fonction pour charger les paris initiaux
    };
</script>
