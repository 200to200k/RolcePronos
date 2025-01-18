// Vérification du code
const correctCode = "200to200k";

function checkCode() {
    const inputCode = document.getElementById("codeInput").value;
    const authDiv = document.getElementById("auth");
    const mainContent = document.getElementById("main-content");
    const errorMsg = document.getElementById("error");

    if (inputCode === correctCode) {
        authDiv.classList.add("hidden");
        mainContent.classList.remove("hidden");
    } else {
        errorMsg.classList.remove("hidden");
    }
}

// Mise à jour de la bankroll
let startBankroll = 200;
let currentBankroll = 200;

function updateBankroll() {
    currentBankroll += 10;
    const percentage = ((currentBankroll - startBankroll) / startBankroll * 100).toFixed(2);

    document.getElementById("current-bankroll").textContent = currentBankroll;
    document.getElementById("percentage").textContent = `${percentage}%`;
}
