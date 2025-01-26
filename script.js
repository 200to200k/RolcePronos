// Exemple de script pour une interaction basique
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
          const rows = csvText.split("\n");
          const table = document.createElement("table");
          table.style.margin = "0 auto"; // Centrer le tableau
          table.style.borderCollapse = "collapse"; // Compact
          table.style.width = "80%";

          rows.forEach((row, rowIndex) => {
              const cols = row.split(",");
              const tableRow = table.insertRow();

              cols.forEach((col) => {
                  const cell = rowIndex === 0 ? document.createElement("th") : tableRow.insertCell();
                  cell.textContent = col.replace(/"/g, "").trim(); // Supprimer les guillemets et les espaces
                  cell.style.border = "1px solid white";
                  cell.style.padding = "10px";
                  cell.style.textAlign = "center";
              });
          });

          // Afficher le tableau dans le conteneur
          tableContainer.innerHTML = ""; // Supprimer le message de chargement
          tableContainer.appendChild(table);
      } catch (error) {
          console.error("Erreur lors de la récupération des données :", error);
          tableContainer.innerHTML = "Erreur lors du chargement des données. Veuillez réessayer.";
      }
  }

  // Charger les données du tableau
  fetchTableDataFromCSV();
});
