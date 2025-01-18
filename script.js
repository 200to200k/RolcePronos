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
