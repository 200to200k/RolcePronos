// Code secret attendu
const SECRET_CODE = "200to200k";

// Fonction pour vérifier le code
function checkCode() {
    const userInput = document.getElementById("codeInput").value; // Récupère la valeur entrée par l'utilisateur
    const errorElement = document.getElementById("error"); // Message d'erreur

    // Vérifie si le code est correct
    if (userInput === SECRET_CODE) {
        // Redirige vers la page principale
        window.location.href = "home.html";
    } else {
        // Affiche un message d'erreur si le code est incorrect
        errorElement.classList.remove("hidden");
    }
}
// script.js

// On sélectionne le formulaire et le tableau des participants
const form = document.getElementById('participation-form');
const participantsTable = document.getElementById('participants-table').getElementsByTagName('tbody')[0];

// Tableau pour stocker les noms des participants
let participants = [];

// Fonction pour ajouter un participant
function addParticipant(pseudo) {
    // Crée une nouvelle ligne dans le tableau
    const row = participantsTable.insertRow();
    const cell = row.insertCell(0);
    cell.textContent = pseudo;
}

// Événement au moment de soumettre le formulaire
form.addEventListener('submit', function(event) {
    event.preventDefault(); // Empêche la soumission du formulaire

    const pseudo = document.getElementById('pseudo').value; // Récupère le pseudo

    if (pseudo && !participants.includes(pseudo)) {
        participants.push(pseudo); // Ajoute le pseudo au tableau des participants
        addParticipant(pseudo); // Ajoute le pseudo au tableau visible sur la page
        document.getElementById('pseudo').value = ''; // Réinitialise le champ du formulaire
    } else if (participants.includes(pseudo)) {
        alert('Ce pseudo est déjà inscrit !');
    } else {
        alert('Veuillez entrer un pseudo valide.');
    }
});
// script.js

// Sélectionne le formulaire et le tableau
const betForm = document.getElementById('bet-form');
const historyTable = document.getElementById('history-table').getElementsByTagName('tbody')[0];

// Fonction pour ajouter un pari dans le tableau
function addBet(date, bet, sport, stake, bankroll, odds, result) {
    const row = historyTable.insertRow(); // Crée une nouvelle ligne
    const stakePercentage = (stake / bankroll) * 100; // Calcule la mise en pourcentage de la bankroll
    let gain = 0;

    // Calcule le gain en fonction du résultat
    if (result === "win") {
        gain = stake * (odds - 1); // Gain si gagné
    } else {
        gain = -stake; // Perte si perdu
    }

    // Ajoute les cellules dans la ligne
    row.insertCell(0).textContent = date;
    row.insertCell(1).textContent = bet;
    row.insertCell(2).textContent = sport;
    row.insertCell(3).textContent = stake;
    row.insertCell(4).textContent = stakePercentage.toFixed(2) + '%';
    row.insertCell(5).textContent = odds;
    row.insertCell(6).textContent = gain.toFixed(2);
    row.insertCell(7).textContent = result === "win" ? "Gagné" : "Perdu";

    // Applique une classe de couleur en fonction du résultat
    row.classList.add(result); // Ajoute la classe "win" ou "lose"
}

// Événement de soumission du formulaire
betForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Empêche la soumission du formulaire

    const date = document.getElementById('date').value;
    const bet = document.getElementById('bet').value;
    const sport = document.getElementById('sport').value;
    const stake = parseFloat(document.getElementById('stake').value);
    const bankroll = parseFloat(document.getElementById('bankroll').value);
    const odds = parseFloat(document.getElementById('odds').value);
    const result = document.getElementById('result').value;

    // Ajoute le pari dans le tableau
    addBet(date, bet, sport, stake, bankroll, odds, result);

    // Réinitialise le formulaire
    betForm.reset();
});
// Fonction pour mettre à jour la date du jour
function updateDate() {
    const currentDateElement = document.getElementById('current-date');
    const today = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    currentDateElement.textContent = today.toLocaleDateString('fr-FR', options);
}

// Fonction pour mettre à jour la bankroll et le pourcentage gagné
function updateBankroll() {
    const startBankroll = parseFloat(document.getElementById('start-bankroll').textContent);
    const currentBankrollElement = document.getElementById('current-bankroll');
    let currentBankroll = parseFloat(currentBankrollElement.textContent);

    // Ajoute 10 à la bankroll actuelle
    currentBankroll += 10;
    currentBankrollElement.textContent = currentBankroll.toFixed(2);

    // Calcule le pourcentage gagné
    const percentageElement = document.getElementById('percentage');
    const percentage = ((currentBankroll - startBankroll) / startBankroll) * 100;
    percentageElement.textContent = percentage.toFixed(2) + '%';

    // Applique une classe pour la coloration conditionnelle
    if (percentage >= 0) {
        percentageElement.classList.add('positive');
        percentageElement.classList.remove('negative');
    } else {
        percentageElement.classList.add('negative');
        percentageElement.classList.remove('positive');
    }
}

// Met à jour la date lors du chargement de la page
window.onload = function() {
    updateDate();
};
