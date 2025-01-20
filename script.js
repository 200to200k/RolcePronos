<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Page d'Accueil - Cryptomonnaies</title>
    <link rel="stylesheet" href="styles.css">
    <script>
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
    </script>
</head>
<body>
    <div class="main-container">
        <header>
            <h1>Bienvenue sur notre site</h1>
            <p>Suivi de vos paris sportifs, casinos et cryptomonnaies.</p>
        </header>

        <section class="content">
            <div class="block">
                <h2>Tableau de suivi de la bankroll</h2>
                <table>
                    <tr>
                        <th>START</th>
                        <th>BANKROLL</th>
                        <th>EVOLUTION</th>
                        <th>OBJECTIF</th>
                    </tr>
                    <tr>
                        <td>500 €</td>
                        <td>500 €</td>
                        <td>0%</td>
                        <td>500,000 €</td>
                    </tr>
                </table>
            </div>

            <div class="crypto-block" id="crypto-container">
                <h2>Cours des cryptomonnaies</h2>
                <!-- Les données des cryptomonnaies seront insérées ici dynamiquement -->
            </div>
        </section>

        <!-- Section des reels Instagram -->
        <section class="reels-section">
            <h2>Mes derniers Reels</h2>
            <div class="reels-container">
                <div class="reels-left">
                    <div class="reel-item">
                        <a href="https://www.instagram.com/200to200kinayear/reel/1" target="_blank">
                            <img src="https://via.placeholder.com/300x200/0000FF/808080?text=Reel+1" alt="Reel 1" />
                        </a>
                    </div>
                    <div class="reel-item">
                        <a href="https://www.instagram.com/200to200kinayear/reel/2" target="_blank">
                            <img src="https://via.placeholder.com/300x200/0000FF/808080?text=Reel+2" alt="Reel 2" />
                        </a>
                    </div>
                </div>

                <div class="reels-right">
                    <div class="reel-item">
                        <a href="https://www.instagram.com/200to200kinayear/reel/3" target="_blank">
                            <img src="https://via.placeholder.com/300x200/0000FF/808080?text=Reel+3" alt="Reel 3" />
                        </a>
                    </div>
                    <div class="reel-item">
                        <a href="https://www.instagram.com/200to200kinayear/reel/4" target="_blank">
                            <img src="https://via.placeholder.com/300x200/0000FF/808080?text=Reel+4" alt="Reel 4" />
                        </a>
                    </div>
                </div>
            </div>
        </section>
    </div>
</body>
</html>
