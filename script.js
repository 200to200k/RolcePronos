document.addEventListener("DOMContentLoaded", () => {
    console.log("Bienvenue sur le site sombre !");

    const tableContainer = document.getElementById("table-container");

    // URL publique de votre fichier Google Sheet au format CSV
    const googleSheetUrl = "https://docs.google.com/spreadsheets/d/1l_k_jNZZ38XiOeKbwI79xffMb0F8IfOGy9se9ugtkgU/gviz/tq?tqx=out:csv&sheet=Feuille1";

    // Fonction pour récupérer et afficher les données depuis l'URL CSV
    async function fetchTableDataFromCSV() {
        try {
            const response = await fetch(googleSheetUrl);
            if (!response.ok) {
                throw new Error(`Erreur HTTP : ${response.status}`);
            }
            const csvText = await response.text();

            // Convertir le CSV en tableau HTML
            const rows = csvText.split("\n").map(row => row.split(",").map(col => col.replace(/"/g, "").trim()));

            // Filtrer les lignes entièrement vides
            const filteredRows = rows.filter(row => row.some(cell => cell !== ""));

            // Vérifier s'il y a des données après filtrage
            if (filteredRows.length === 0) {
                tableContainer.innerHTML = "<p>Aucune donnée disponible</p>";
                return;
            }

            const table = document.createElement("table");
            table.style.margin = "20px auto"; // Centrer le tableau
            table.style.borderCollapse = "collapse";
            table.style.width = "80%";
            table.style.maxWidth = "800px"; // Largeur max pour éviter l'étirement

            filteredRows.forEach((row, rowIndex) => {
                const tableRow = table.insertRow();
                row.forEach(col => {
                    const cell = rowIndex === 0 ? document.createElement("th") : tableRow.insertCell();
                    cell.textContent = col;
                    cell.style.border = "1px solid white";
                    cell.style.padding = "10px";
                    cell.style.textAlign = "center";
                    if (rowIndex === 0) cell.style.backgroundColor = "#333"; // Fond pour l'en-tête
                });
            });

            // Afficher le tableau dans le conteneur
            tableContainer.innerHTML = ""; // Supprimer le message de chargement
            tableContainer.appendChild(table);
        } catch (error) {
            console.error("Erreur lors de la récupération des données :", error);
            tableContainer.innerHTML = "Erreur lors du chargement des données.";
        }
    }

    // Charger les données du tableau
    fetchTableDataFromCSV();

    // Mise à jour automatique toutes les 30 secondes
    setInterval(fetchTableDataFromCSV, 30000);
});
