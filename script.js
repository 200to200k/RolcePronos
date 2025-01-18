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
