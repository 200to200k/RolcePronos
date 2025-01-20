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

        const sportsBetTable = document.getElementById("sports-bet-table");
        const betHistoryTable = document.getElementById("bet-history-table");
        sportsBetTable.innerHTML = ""; // Réinitialiser le contenu
        betHistoryTable.innerHTML = ""; // Réinitialiser le contenu

        createTableFromSheetData(cols, rows, sportsBetTable);
        createTableFromSheetData(cols, rows, betHistoryTable);
    } catch (error) {
        console.error("Erreur lors de la récupération des données Google Sheets :", error);
    }
}

// Fonction utilitaire pour générer un tableau HTML
function createTableFromSheetData(cols, rows, container) {
    const table = document.createElement("table");
    const thead = document.createElement("thead");
    const tbody = document.createElement("tbody");

    const headerRow = document.createElement("tr");
    cols.forEach(col => {
        if (col.label) {
            const th = document.createElement("th");
            th.textContent = col.label;
            headerRow.appendChild(th);
        }
    });
    thead.appendChild(headerRow);

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
    container.appendChild(table);
}

// Récupération des cours des cryptomonnaies
async function fetchCryptoPrices() {
    try {
        const response = await fetch(
            "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana,ripple&vs_currencies=eur&include_24hr_change=true"
        );
        const data = await response.json();

        const cryptos = [
            { name: "BTC", id: "bitcoin" },
            { name: "ETH", id: "ethereum" },
            { name: "SOL", id: "solana" },
            { name: "XRP", id: "ripple" },
        ];

        const cryptoContainer = document.getElementById("crypto-container");
        cryptoContainer.innerHTML = ""; // Réinitialiser le contenu

        cryptos.forEach(crypto => {
            const price = data[crypto.id].eur;
            const change = data[crypto.id].eur_24h_change.toFixed(2);

            const div = document.createElement("div");
            div.className = "crypto-item";

            const name = document.createElement("div");
            name.className = "crypto-name";
            name.textContent = crypto.name;

            const priceSpan = document.createElement("span");
            priceSpan.className = "crypto-price";
            priceSpan.textContent = `${price} €`;

            const changeSpan = document.createElement("div");
            changeSpan.textContent = `${change}%`;
            changeSpan.className = change >= 0 ? "price-up" : "price-down";

            div.appendChild(name);
            div.appendChild(priceSpan);
            div.appendChild(changeSpan);

            cryptoContainer.appendChild(div);
        });
    } catch (error) {
        console.error("Erreur lors de la récupération des données des cryptomonnaies :", error);
    }
}

// Initialisation
document.addEventListener("DOMContentLoaded", () => {
    fetchGoogleSheetData();
    fetchCryptoPrices();
    setInterval(fetchGoogleSheetData, 60000); // Actualiser les paris toutes les 60 secondes
    setInterval(fetchCryptoPrices, 60000); // Actualiser les cryptos toutes les 60 secondes
});
