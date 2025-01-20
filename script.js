// Récupération des données des paris sportifs via Google Sheets
async function fetchGoogleSheetData() {
    const sheetUrl = "https://docs.google.com/spreadsheets/d/1l_k_jNZZ38XiOeKbwI79xffMb0F8IfOGy9se9ugtkgU/gviz/tq?tqx=out:json";
    try {
        const response = await fetch(sheetUrl);
        const text = await response.text();
        const json = JSON.parse(text.substr(47).slice(0, -2));
        const rows = json.table.rows;

        const tableContainer = document.getElementById("sports-bet-table");
        tableContainer.innerHTML = ""; // Réinitialiser le contenu

        // Créer un tableau HTML
        const table = document.createElement("table");
        const thead = document.createElement("thead");
        const tbody = document.createElement("tbody");

        // Créer les en-têtes
        const headerRow = document.createElement("tr");
        json.table.cols.forEach(col => {
            const th = document.createElement("th");
            th.textContent = col.label;
            headerRow.appendChild(th);
        });
        thead.appendChild(headerRow);

        // Ajouter les lignes
        rows.forEach(row => {
            const tr = document.createElement("tr");
            row.c.forEach(cell => {
                const td = document.createElement("td");
                td.textContent = cell?.v || "";
                tr.appendChild(td);
            });
            tbody.appendChild(tr);
        });

        table.appendChild(thead);
        table.appendChild(tbody);
        tableContainer.appendChild(table);
    } catch (error) {
        console.error("Erreur lors de la récupération des données Google Sheets :", error);
    }
}

// Récupération des cours des cryptomonnaies via CoinGecko
async function fetchCryptoPrices() {
    const apiUrl = "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana,ripple&vs_currencies=eur&include_24hr_change=true";
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        const cryptoContainer = document.getElementById("crypto-container");
        cryptoContainer.innerHTML = ""; // Réinitialiser le contenu

        Object.entries(data).forEach(([key, value]) => {
            const div = document.createElement("div");
            div.innerHTML = `
                <strong>${key.toUpperCase()}</strong>: ${value.eur} € (${value.eur_24h_change.toFixed(2)}%)
            `;
            cryptoContainer.appendChild(div);
        });
    } catch (error) {
        console.error("Erreur lors de la récupération des cryptos :", error);
    }
}

// Initialisation
document.addEventListener("DOMContentLoaded", () => {
    fetchGoogleSheetData();
    fetchCryptoPrices();
    setInterval(fetchGoogleSheetData, 60000); // Actualiser toutes les 60 secondes
    setInterval(fetchCryptoPrices, 60000);
});
