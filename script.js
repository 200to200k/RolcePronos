cryptos.forEach(crypto => {
    const price = data[crypto.id].eur;
    const change = data[crypto.id].eur_24h_change.toFixed(2);

    const div = document.createElement('div');
    div.className = 'crypto-item';
    
    const name = document.createElement('div');
    name.className = 'crypto-name';
    name.textContent = crypto.name;

    const index = document.createElement('span');
    index.className = 'crypto-index';
    index.textContent = crypto.name === "BTC" ? "BTC" : crypto.name === "ETH" ? "ETH" : crypto.name === "SOL" ? "SOL" : "XRP";
    
    const priceSpan = document.createElement('span');
    priceSpan.textContent = `${price} €`;
    priceSpan.className = change >= 0 ? 'price-up' : 'price-down';

    const changeSpan = document.createElement('div');
    changeSpan.textContent = `${change}%`;
    changeSpan.className = change >= 0 ? 'price-up' : 'price-down';

    div.appendChild(name);
    name.appendChild(index); // Ajout de l'indice à droite du nom
    div.appendChild(priceSpan);
    div.appendChild(changeSpan);
    cryptoContainer.appendChild(div);
});
