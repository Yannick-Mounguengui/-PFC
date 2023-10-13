// Initialisation de la connexion avec Socket.io
const socket = io();

// Récupération des éléments HTML nécessaires
const statusLabel = document.getElementById("gameInfo");
const BTstone = document.getElementById("stone");
const BTpaper = document.getElementById("paper");
const BTcissors = document.getElementById("cissors");
const winner = document.querySelector('#winnerName');
const BTreset = document.getElementById("button");
const scoreBoard = document.getElementById("scoreBoard");

// Initialisation des scores et choix des joueurs
let player1Choice;
let player2Choice;
let player1Score = 0;
let player2Score = 0;

// Tableau contenant les choix possibles
const choices = ["Pierre", "Feuille", "Ciseaux"];

// Fonction pour désactiver les boutons de choix
const disableButtons = () => {
    BTstone.disabled = true;
    BTpaper.disabled = true;
    BTcissors.disabled = true;
}

// Fonction pour réactiver les boutons de choix
const enableButtons = () => {
    BTstone.disabled = false;
    BTpaper.disabled = false;
    BTcissors.disabled = false;
}

// Fonction pour rafraîchir le statut de la partie
const refreshStatus = (value) => {
    if(value == 'playing') {
        statusLabel.innerHTML = "Veuillez choisir quoi jouer";
        enableButtons();
    }
}

// Fonction qui compare les choix des joueurs et retourne le résultat de la partie
const play = (player1, player2) => {
  if (player1 === player2) {
    return "Draw!";
  }
  if (player1 === "Pierre") {
    if (player2 === "Ciseaux") {
      return "Player wins with stone !";
    } else {
      return "AI wins with paper !";
    }
  }
  if (player1 === "Feuille") {
    if (player2 === "Pierre") {
      return "Player wins with paper !";
    } else {
      return "AI wins with cissors !";
    }
  }
  if (player1 === "Ciseaux") {
    if (player2 === "Feuille") {
      return "Player wins with cissors !";
    } else {
      return "AI wins with stone !";
    }
  }
};

// Fonction pour mettre à jour le tableau des scores
const updateScoreBoard = () => {
  const player1ScoreDisplay = document.querySelector('#player1Score');
  player1ScoreDisplay.textContent = player1Score;
  const player2ScoreDisplay = document.querySelector('#player2Score');
  player2ScoreDisplay.textContent = player2Score;
}

// Fonction pour réinitialiser la partie
const end = () => {
  player1Score = 0;
  player2Score = 0;
  updateScoreBoard();
  winner.textContent = '';
  enableButtons();
}

// Écouteur d'événement pour le bouton de réinitialisation de la partie
BTreset.addEventListener("click", () => {
  socket.emit('buttonClickedai');
});

// Écouteur d'événement pour le bouton "Pierre" quand il est cliqué
BTstone.addEventListener("click", () => {
disableButtons();
player1Choice = "Pierre";
player2Choice = choices[Math.floor(Math.random() * choices.length)];
statusLabel.textContent = play(player1Choice, player2Choice);
if (statusLabel.textContent.includes("Player win")) {
player1Score += 1;
}
if (statusLabel.textContent.includes("AI wins")) {
player2Score += 1;
}
updateScoreBoard();
scoreBoard.style.display = "block";
if (player1Score >= 3 || player2Score >= 3) {
const winnerName = player1Score > player2Score ? "Player" : "AI";
winner.textContent = `${winnerName} has won the game!`;
socket.emit("end");
BTreset.disabled=true;
}
});

// Écouteur d'événement pour le bouton "Feuille" quand il est cliqué
BTpaper.addEventListener("click", () => {
disableButtons();
player1Choice = "Feuille";
player2Choice = choices[Math.floor(Math.random() * choices.length)];
statusLabel.textContent = play(player1Choice, player2Choice);
if (statusLabel.textContent.includes("Player win")) {
player1Score += 1;
}
if (statusLabel.textContent.includes("AI wins")) {
player2Score += 1;
}
updateScoreBoard();
scoreBoard.style.display = "block";
if (player1Score >= 3 || player2Score >= 3) {
const winnerName = player1Score > player2Score ? "Player" : "AI";
winner.textContent = `${winnerName} has won the game!`;
socket.emit("end");
BTreset.disabled=true;
}
});


// Écouteur d'événement pour le bouton "Ciseaux" quand il est cliqué
BTcissors.addEventListener("click", () => {
    disableButtons();
    player1Choice = "Ciseaux";
    player2Choice = choices[Math.floor(Math.random() * choices.length)];
    statusLabel.textContent = play(player1Choice, player2Choice);
    if (statusLabel.textContent.includes("Player win")) {
      player1Score += 1;
    }
    if (statusLabel.textContent.includes("AI wins")) {
      player2Score += 1;
    }
    updateScoreBoard();
    scoreBoard.style.display = "block";
    if (player1Score >= 3 || player2Score >= 3) {
      const winnerName = player1Score > player2Score ? "Player" : "AI";
      winner.textContent = `${winnerName} has won the game!`;
      socket.emit("end");
      BTreset.disabled=true;
  }
    });

// Événements pour la connexion au serveur
socket.emit('new');
socket.on('status', value => refreshStatus(value));
// Cette fonction est appelée lorsque le jeu est réinitialisé
socket.on('gameResetai',()=>{
  enableButtons();
  statusLabel.innerHTML = "C'est à votre tour de jouer.";
});
// Cette fonction est appelée lorsque le nombre maximum de joueurs est atteint
socket.on('maxPlayersReached', () => {
  console.log("Le nombre maximum de joueurs a été atteint, connexion refusée.");
  statusLabel.innerHTML = "Nombre maximal de joueurs atteint, connexion refusée.";
  disableButtons();
});
