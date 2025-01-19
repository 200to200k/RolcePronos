document.addEventListener('DOMContentLoaded', function() {
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
                x: {
                    title: {
                        display: true,
                        text: 'Date'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Montant (€)'
                    },
                    min: 0
                }
            }
        }
    });

    // Affichage des paris
    function displayBets() {
        const historyTable = document.getElementById('history-table').getElementsByTagName('tbody')[0];
        historyTable.innerHTML = '';
        bets.forEach((bet, index) => {
            const row = historyTable.insertRow();
            row.innerHTML = `
                <td>${bet.date}</td>
                <td>${bet.bet}</td>
                <td>${bet.sport}</td>
                <td>${bet.stake}</td>
                <td>${bet.odds}</td>
                <td>${bet.result || 'En attente'}</td>
                <td>
                    ${bet.result ? '' : `<button onclick="updateResult(${index}, 'win')">Gagné</button>
                    <button onclick="updateResult(${index}, 'lose')">Perdu</button>`}
                    <button onclick="deleteBet(${index})">❌</button>
                </td>
            `;
        });
    }

    // Ajouter un pari
    const betForm = document.getElementById('bet-form');
    betForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const date = document.getElementById('date').value;
        const sport = document.getElementById('sport').value;
        const bet = document.getElementById('bet').value;
        const stake = parseFloat(document.getElementById('stake').value);
        const odds = parseFloat(document.getElementById('odds').value);

        const newBet = {
            date: date,
            sport: sport,
            bet: bet,
            stake: stake,
            odds: odds,
            result: null
        };

        bets.push(newBet);
        localStorage.setItem('bets', JSON.stringify(bets));
        datesHistory.push(date);
        bankrollHistory.push(currentBankroll);

        displayBets();
        bankrollChart.update();
    });

    // Mettre à jour le résultat d'un pari
    function updateResult(index, result) {
        const bet = bets[index];
        bet.result = result;

        if (result === 'win') {
            currentBankroll += bet.stake * bet.odds;
        } else if (result === 'lose') {
            currentBankroll -= bet.stake;
        }

        localStorage.setItem('bets', JSON.stringify(bets));
        datesHistory.push(bet.date);
        bankrollHistory.push(currentBankroll);

        displayBets();
        bankrollChart.update();
    }

    // Supprimer un pari
    function deleteBet(index) {
        bets.splice(index, 1);
        localStorage.setItem('bets', JSON.stringify(bets));
        displayBets();
        bankrollChart.update();
    }

    displayBets();
});
