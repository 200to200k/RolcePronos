// Fonction pour récupérer les données des paris sportifs via Google Sheets
async function fetchGoogleSheetData() {
    const sheetUrls = [
        "https://docs.google.com/spreadsheets/d/1l_k_jNZZ38XiOeKbwI79xffMb0F8IfOGy9se9ugtkgU/gviz/tq?tqx=out:json&sheet=Feuille%201", // Tableau de suivi des paris sportifs
        "https://docs.google.com/spreadsheets/d/1l_k_jNZZ38XiOeKbwI79xffMb0F8IfOGy9se9ugtkgU/gviz/tq?tqx=out:json&sheet=Feuille%202"  // Mes derniers paris
    ];

    try {
        // Traitement pour chaque URL de feuille
        for (let i = 0; i < sheetUrls.length; i++) {
            const response = await fetch(sheetUrls[i]);
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

            const text = await response.text();
            const json = JSON.parse(text.substr(47).slice(0, -2));
            const rows = json.table.rows;
            const cols = json.table.cols;

            // Affichage des données dans les tables HTML correspondantes
            if (i === 0) {
                const sportsBetTable = document.getElementById("sports-bet-table");
                sportsBetTable.innerHTML = ""; // Réinitialiser le contenu
                createTableFromSheetData(cols, rows, sportsBetTable);
            } else {
                const betHistoryContainer = document.getElementById("bet-history-container");
                betHistoryContainer.innerHTML = ""; // Réinitialiser le contenu
                createBetHistoryTable(cols, rows, betHistoryContainer);
            }
        }
    } catch (error) {
        console.error("Erreur lors de la récupération des données Google Sheets :", error);
    }
}

// Fonction utilitaire pour limiter les nombres à deux décimales
function formatToTwoDecimals(value) {
    const number = parseFloat(value);
    if (isNaN(number)) return value; // Retourner la valeur brute si ce n'est pas un nombre
    return number.toFixed(2); // Limiter à deux chiffres après la virgule
}

// Fonction utilitaire pour générer un tableau HTML à partir des données de la feuille
function createTableFromSheetData(cols, rows, container) {
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

                // Vérifier si la valeur est numérique pour appliquer le formatage
                td.textContent = isNaN(cell.v) ? cell.v : formatToTwoDecimals(cell.v);
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
    container.appendChild(table);
}

// Fonction pour créer le tableau "Mes derniers paris" avec la fonctionnalité de masquage
function createBetHistoryTable(cols, rows, container) {
    const tableContainer = document.createElement("div");
    tableContainer.className = "table-container";

    const table = document.createElement("table");
    const thead = document.createElement("thead");
    const tbody = document.createElement("tbody");

    // En-têtes
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
    rows.forEach((row, index) => {
        const tr = document.createElement("tr");
        let hasTextContent = false;

        row.c.forEach(cell => {
            if (cell && cell.v) {
                const td = document.createElement("td");

                // Vérifier si la valeur est numérique pour appliquer le formatage
                td.textContent = isNaN(cell.v) ? cell.v : formatToTwoDecimals(cell.v);
                tr.appendChild(td);
                hasTextContent = true;
            }
        });

        // Ajouter la ligne uniquement si elle contient du contenu
        if (hasTextContent) {
            // Masquer les lignes au-delà des 5 premières
            if (index >= 5) {
                tr.style.display = "none";
                tr.classList.add("hidden-row");
            }
            tbody.appendChild(tr);
        }
    });

    table.appendChild(thead);
    table.appendChild(tbody);
    tableContainer.appendChild(table);

    // Ajouter le bouton pour charger plus
    const expandBtn = document.createElement("button");
    expandBtn.className = "expand-btn";
    expandBtn.textContent = "+";

    expandBtn.addEventListener("click", () => {
        const hiddenRows = table.querySelectorAll(".hidden-row");
        hiddenRows.forEach(row => {
            row.style.display = row.style.display === "none" ? "table-row" : "none";
        });

        // Basculer la classe pour changer l'état du tableau
        tableContainer.classList.toggle("expanded");

        // Mettre à jour le texte du bouton
        expandBtn.textContent = tableContainer.classList.contains("expanded") ? "-" : "+";
    });

    container.appendChild(tableContainer);
    container.appendChild(expandBtn);
}

// Récupération en temps réel des cours des cryptomonnaies
async function fetchCryptoPricesRealtime() {
    const cryptoContainer = document.getElementById("crypto-container");
    const cryptos = [
        { name: "BTC", id: "bitcoin" },
        { name: "ETH", id: "ethereum" },
        { name: "SOL", id: "solana" },
        { name: "XRP", id: "ripple" },
    ];

    try {
        const response = await fetch(
            "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana,ripple&vs_currencies=eur&include_24hr_change=true"
        );
        const data = await response.json();

        cryptoContainer.innerHTML = ""; // Réinitialiser le contenu

        cryptos.forEach(crypto => {
            const price = data[crypto.id].eur;
            const change = data[crypto.id].eur_24hr_change.toFixed(2);

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

    // Rappel pour une actualisation rapide
    setTimeout(fetchCryptoPricesRealtime, 5000); // Met à jour toutes les 5 secondes
}

// Initialisation
document.addEventListener("DOMContentLoaded", () => {
    fetchGoogleSheetData();
    fetchCryptoPricesRealtime(); // Initialisation en temps réel
    setInterval(fetchGoogleSheetData, 60000); // Actualiser les paris toutes les 60 secondes
});
