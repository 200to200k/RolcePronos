// Initialisation des variables
let bets = JSON.parse(localStorage.getItem('bets')) || [];
let currentBankroll = parseFloat(localStorage.getItem('bankroll')) || 200;
let bankrollHistory = [currentBankroll];
let datesHistory = ['2025-01-18']; // Date initiale

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

// Mise à jour du graphique de la bankroll
function updateBankrollChart() {
    bankrollChart.update(); // Actualisation du graphique après chaque mise à jour
}

// Fonction pour afficher l'historique des paris
function updateBetHistory() {
    const tableBody = document.getElementById('history-table').getElementsByTagName('tbody')[0];
    tableBody.innerHTML = '';
    bets.forEach((bet, index) => {
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
                <button class="win-btn" onclick="setResult(${index}, 'win')">Gagné</button>
                <button class="lose-btn" onclick="setResult(${index}, 'lose')">Perdu</button>
            `;
        }
    });
}

// Fonction pour définir le résultat d'un pari
function setResult(index, result) {
    const bet = bets[index];
    bet.result = result;

    // Calcul du résultat du pari
    const winAmount = bet.stake * bet.odds;
    if (result === 'win') {
        currentBankroll += winAmount - bet.stake;
    } else if (result === 'lose') {
        currentBankroll -= bet.stake;
    }

    // Mise à jour de la bankroll et historique
    bankrollHistory.push(currentBankroll);
    datesHistory.push(new Date().toISOString().split('T')[0]);

    // Sauvegarde dans localStorage
    localStorage.setItem('bets', JSON.stringify(bets));
    localStorage.setItem('bankroll', currentBankroll);

    // Mise à jour du graphique et de l'historique des paris
    updateBankrollChart();
    updateBetHistory();
}

// Formulaire pour ajouter un pari
document.getElementById('bet-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const date = document.getElementById('date').value;
    const sport = document.getElementById('sport').value;
    const bet = document.getElementById('bet').value;
    const stake = parseFloat(document.getElementById('stake').value);
    const odds = parseFloat(document.getElementById('odds').value);

    if (!date || !sport || !bet || !stake || !odds) {
        // Afficher un message d'erreur si des champs sont vides
        document.getElementById('form-feedback').innerText = 'Veuillez remplir tous les champs.';
        document.getElementById('form-feedback').style.color = 'red';
        return;
    }

    // Ajout du pari au tableau local
    bets.push({ date, sport, bet, stake, odds, result: "Non défini" });
    localStorage.setItem('bets', JSON.stringify(bets));

    // Affichage du message de succès
    document.getElementById('form-feedback').innerText = 'Pari ajouté avec succès !';
    document.getElementById('form-feedback').style.color = 'green';

    // Mise à jour de l'historique des paris
    updateBetHistory();
});

// Charger l'historique des paris au chargement de la page
document.addEventListener('DOMContentLoaded', function() {
    if (bets.length > 0) {
        updateBetHistory();
    }
});
