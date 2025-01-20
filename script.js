// Récupération des données des paris sportifs via Google Sheets
async function fetchGoogleSheetData() {
    const sheetUrl = "https://docs.google.com/spreadsheets/d/1l_k_jNZZ38XiOeKbwI79xffMb0F8IfOGy9se9ugtkgU/gviz/tq?tqx=out:json";
    try {
        const response = await fetch(sheetUrl);
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        const text = await response.text();

        // Extraction des données JSON de Google Sheets
        const json = JSON.parse(text.substr(47).slice(0, -2));
        const rows = json.table.rows;
        const cols = json.table.cols;

        // Cible pour afficher les données
        const tableContainer = document.getElementById("sports-bet-table");
        tableContainer.innerHTML = ""; // Réinitialiser le contenu

        // Création du tableau HTML
        const table = document.createElement("table");
        const thead = document.createElement("thead");
        const tbody = document.createElement("tbody");

        // En-têtes : Ajouter uniquement les colonnes ayant un label
        const headerRow = document.createElement("tr");
        cols.forEach(col => {
            if (col.label) {
                const th = document.createElement("th");
                th.textContent = col.label;
                headerRow.appendChild(th);
            }
        });
        thead.appendChild(headerRow);

        // Lignes : Ajouter uniquement celles qui contiennent au moins une cellule non vide
        rows.forEach(row => {
            const tr = document.createElement("tr");
            let hasTextContent = false;

            row.c.forEach(cell => {
                if (cell && cell.v) {
                    const td = document.createElement("td");
                    td.textContent = cell.v;
                    tr.appendChild(td);
                    hasTextContent = true;
                }
            });

            // Ajouter la ligne uniquement si elle contient du contenu
            if (hasTextContent) {
                tbody.appendChild(tr);
            }
        });

        table.appendChild(thead);
        table.appendChild(tbody);
        tableContainer.appendChild(table);
    } catch (error) {
        console.error("Erreur lors de la récupération des données Google Sheets :", error);
    }
}

// Initialisation : Ajouter un gestionnaire d'événements pour charger les données
document.addEventListener("DOMContentLoaded", () => {
    fetchGoogleSheetData();
    setInterval(fetchGoogleSheetData, 60000); // Actualiser toutes les 60 secondes
});
