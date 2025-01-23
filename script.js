<script>
// Afficher plus de paris (par exemple, récupérer plus de lignes depuis le CSV)
let parisLimit = 5; // Limite initiale de paris
function loadMoreBets() {
    parisLimit += 5; // Ajouter 5 paris supplémentaires
    loadCSV('https://example.com/path-to-your-google-sheet-csv', (csvData) => {
        // Nous ne montrons que les paris dans les limites spécifiées
        const rows = csvData.split('\n');
        let table = document.getElementById('suivi-des-paris');
        table.innerHTML = ''; // Réinitialiser le tableau
        rows.slice(0, parisLimit).forEach((row) => {
            const cells = row.split(',');
            if (cells.length > 1) {
                const tr = document.createElement('tr');
                cells.forEach((cell) => {
                    const td = document.createElement('td');
                    td.textContent = cell.trim();
                    tr.appendChild(td);
                });
                table.appendChild(tr);
            }
        });
    });
}
</script>
