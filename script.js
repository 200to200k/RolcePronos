async function fetchCryptoPrices() {
    try {
        // Récupération des prix via l'API CoinGecko
        const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana,ripple&vs_currencies=eur&include_24hr_change=true');
        const data = await response.json();

        // Définir la liste des cryptos
        const cryptos = [
            { name: "BTC", id: "bitcoin" },
            { name: "ETH", id: "ethereum" },
            { name: "SOL", id: "solana" },
            { name: "XRP", id: "ripple" }
        ];

        // Sélectionner le conteneur pour afficher les données des cryptos
        const cryptoContainer = document.getElementById('crypto-container');
        cryptoContainer.innerHTML = ''; // Effacer les anciens éléments avant de les actualiser

        // Parcourir chaque crypto et ajouter les données dynamiquement
        cryptos.forEach(crypto => {
            const price = data[crypto.id].eur;
            const change = data[crypto.id].eur_24h_change.toFixed(2);

            const div = document.createElement('div');
            div.className = 'crypto-item';
            
            const name = document.createElement('div');
            name.className = 'crypto-name';
            name.textContent = crypto.name;

            const priceSpan = document.createElement('span');
            priceSpan.className = 'crypto-price';
            priceSpan.textContent = `${price} €`;

            const changeSpan = document.createElement('div');
            changeSpan.textContent = `${change}%`;
            changeSpan.className = change >= 0 ? 'price-up' : 'price-down';

            // Ajouter les éléments dans le div
            div.appendChild(name);
            div.appendChild(priceSpan);
            div.appendChild(changeSpan);

            // Ajouter ce div au conteneur des cryptos
            cryptoContainer.appendChild(div);
        });
    } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
    }
}

// Lorsque la page est complètement chargée
document.addEventListener("DOMContentLoaded", function () {
    // Charger initialement les données
    fetchCryptoPrices();

    // Mettre à jour les données toutes les 60 secondes (60000 ms)
    setInterval(fetchCryptoPrices, 60000);
});
