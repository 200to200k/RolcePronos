async function fetchCryptoPrices() {
    const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana,ripple,trumpcoin&vs_currencies=usd&include_24hr_change=true');
    const data = await response.json();
    
    updateCryptoPrice('bitcoin', data.bitcoin);
    updateCryptoPrice('ethereum', data.ethereum);
    updateCryptoPrice('solana', data.solana);
    updateCryptoPrice('xrp', data.ripple);
    updateCryptoPrice('trumpcoin', data.trumpcoin);
}

function updateCryptoPrice(id, data) {
    const priceElement = document.querySelector(`#${id} .price`);
    priceElement.textContent = `$${data.usd}`;
    
    const priceChange = data.usd_24h_change;
    if (priceChange > 0) {
        priceElement.classList.add('positive');
        priceElement.classList.remove('negative');
    } else {
        priceElement.classList.add('negative');
        priceElement.classList.remove('positive');
    }
}

// Call the function on page load
fetchCryptoPrices();

// Update every minute
setInterval(fetchCryptoPrices, 60000);
