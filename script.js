// Script de gestion des paris

let bets = JSON.parse(localStorage.getItem('bets')) || [];
let currentBankroll = 200;
let bankrollHistory = [currentBankroll];
let datesHistory = ['2025-01-18'];

// Graphique de la bankroll
const ctx = document.getElementById('bankroll-chart').getContext('2d');
const bankrollData = {
    labels: datesHistory,
    datasets: [{
        label: 'Évolution de la bankroll (€)',
        data: bankrollHistory,
        borderColor: '#f3a712',
        backgroundColor: 'rgba(243, 167, 18, 0.2)',
        borderWidth: 2,
        fill: true
    }]
};

const bankrollChart = new Chart(ctx, {
    type: 'line',
    data: bankrollData,
    options: {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

// Formulaire pour ajouter un pari
document.getElementById('bet-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const date = document.getElementById('date').value;
    const sport = document.getElementById('sport').value;
    const bet = document.getElementById('bet').value;
    const stake = parseFloat(document.getElementById('stake').value);
    const odds = parseFloat(document.getElementById('odds').value);
    const result = "Non défini";

    // Ajout du pari au tableau local
    bets.push({ date, sport, bet, stake, odds, result });
    localStorage.setItem('bets', JSON.stringify(bets));

    // Mise à jour du tableau des paris
    updateBetHistory();
});

// Fonction pour afficher l'historique des paris
function updateBetHistory() {
    const tableBody = document.getElementById('history-table').getElementsByTagName('tbody')[0];
    tableBody.innerHTML = '';
    bets.forEach(bet => {
        const row = tableBody.insertRow();
        row.insertCell(0).innerText = bet.date;
        row.insertCell(1).innerText = bet.bet;
        row.insertCell(2).innerText = bet.sport;
        row.insertCell(3).innerText = bet.stake.toFixed(2);
        row.insertCell(4).innerText = bet.odds.toFixed(2);
        row.insertCell(5).innerText = bet.result;

        // Ajouter les boutons d'action
        const actionsCell = row.insertCell(6);
        if (bet.result === "Non défini") {
            actionsCell.innerHTML = `
                <button class="win-btn" onclick="setResult(${bets.indexOf(bet)}, 'win')">Gagné</button>
                <button class="lose-btn" onclick="setResult(${bets.indexOf(bet)}, 'lose')">Perdu</button>
            `;
        }
    });
}

// Fonction pour définir le résultat d'un pari
function setResult(index, result) {
    const bet = bets[index];
    bet
