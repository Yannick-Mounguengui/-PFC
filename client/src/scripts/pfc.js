// Déclaration de la connexion au serveur
const socket = io();

// Récupération des éléments HTML nécessaires
const statusLabel = document.getElementById("gameInfo");
const BTstone = document.getElementById("stone");
const BTpaper = document.getElementById("paper");
const BTcissors = document.getElementById("cissors");
const winner = document.querySelector('#winnerName');
const BTreset = document.getElementById("button");

// Fonction pour actualiser l'état du jeu
const refreshStatus = (value) => {
if(value == 'waiting') {
statusLabel.innerHTML = "En attente d'un joueur...";
disableButtons();
}
else if(value == 'playing') {
statusLabel.innerHTML = "Veuillez choisir quoi jouer";
enableButtons();
}
}

// Fonction pour désactiver les boutons de jeu
const disableButtons = () => {
BTstone.disabled = true;
BTpaper.disabled = true;
BTcissors.disabled = true;
}

// Fonction pour activer les boutons de jeu
const enableButtons = () => {
BTstone.disabled = false;
BTpaper.disabled = false;
BTcissors.disabled = false;
}

// Fonction pour afficher le résultat de la partie
const played = (value, otherAnswer) => {
if(value == 'win') {
statusLabel.innerHTML = `Vous avez gagné ! L'autre joueur a joué ${otherAnswer}`;
}
else if(value == 'loose') {
statusLabel.innerHTML = `Vous avez perdu ! L'autre joueur a joué ${otherAnswer}`;
}
else if(value == 'egality') {
statusLabel.innerHTML = `Vous êtes à égalité en ayant tous les deux joués ${otherAnswer}`;
}
else {
statusLabel.innerHTML = "Une erreur s'est produite, rechargez la page";
socket.disconnect(true);
}
}

// Fonction pour récupérer le gagnant de la partie
const getWinner = () => {
let player1Score = document.querySelector('#player1Score').innerHTML;
let player2Score = document.querySelector('#player2Score').innerHTML;
if (player1Score > player2Score) {
winner.innerHTML = "YOU WIN";
} else if (player2Score > player1Score) {
winner.innerHTML = "YOU LOOSE";
} else {
winner.innerHTML = "DRAW";
}
}

// Événement pour réinitialiser la partie
BTreset.addEventListener("click", () => {
socket.emit('buttonClicked');
});

// Événements pour jouer
BTstone.addEventListener("click", () => {
disableButtons();
statusLabel.innerHTML = "Vous avez joué la pierre. En attente du choix de l'autre joueur...";
socket.emit('play', 'pierre');
});

BTpaper.addEventListener("click", () => {
disableButtons();
statusLabel.innerHTML = "Vous avez joué la feuille. En attente du choix de l'autre joueur...";
socket.emit('play', 'feuille');
});

BTcissors.addEventListener("click", () => {
disableButtons();
statusLabel.innerHTML = "Vous avez joué les ciseaux. En attente du choix de l'autre joueur...";
socket.emit('play', 'ciseaux');
});

// Désactivation des boutons de jeu au début
disableButtons();

// Événements pour la connexion au serveur
socket.emit('newPlayer');
socket.on('status', value => refreshStatus(value));
socket.on('play', (value, otherAnswer) => played(value, otherAnswer));

// Cette fonction est appelée lorsque le score des deux joueurs est mis à jour
socket.on('updateScore', (player1ScoreNew, player2ScoreNew) => {
document.querySelector('#player1Score').innerHTML = player1ScoreNew;
document.querySelector('#player2Score').innerHTML = player2ScoreNew;
});

// Cette fonction est appelée lorsque le jeu est terminé et qu'un vainqueur est déterminé
socket.on('fin',(vainqueur)=>{
let winner1 = getWinner();
console.log('le vainqueur est: '+ vainqueur);
BTreset.disabled=true;
});

// Cette fonction est appelée lorsque le jeu est réinitialisé
socket.on('gameReset',()=>{
enableButtons();
statusLabel.innerHTML = "C'est à votre tour de jouer.";
});

// Cette fonction est appelée lorsque le nombre maximum de joueurs est atteint
socket.on('maxPlayersReached', () => {
console.log("Le nombre maximum de joueurs a été atteint, connexion refusée.");
statusLabel.innerHTML = "Nombre maximal de joueurs atteint, connexion refusée.";
disableButtons();
});
