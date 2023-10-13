/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/scripts/pfc.js":
/*!****************************!*\
  !*** ./src/scripts/pfc.js ***!
  \****************************/
/***/ (() => {

eval("// Déclaration de la connexion au serveur\r\nconst socket = io();\r\n\r\n// Récupération des éléments HTML nécessaires\r\nconst statusLabel = document.getElementById(\"gameInfo\");\r\nconst BTstone = document.getElementById(\"stone\");\r\nconst BTpaper = document.getElementById(\"paper\");\r\nconst BTcissors = document.getElementById(\"cissors\");\r\nconst winner = document.querySelector('#winnerName');\r\nconst BTreset = document.getElementById(\"button\");\r\n\r\n// Fonction pour actualiser l'état du jeu\r\nconst refreshStatus = (value) => {\r\nif(value == 'waiting') {\r\nstatusLabel.innerHTML = \"En attente d'un joueur...\";\r\ndisableButtons();\r\n}\r\nelse if(value == 'playing') {\r\nstatusLabel.innerHTML = \"Veuillez choisir quoi jouer\";\r\nenableButtons();\r\n}\r\n}\r\n\r\n// Fonction pour désactiver les boutons de jeu\r\nconst disableButtons = () => {\r\nBTstone.disabled = true;\r\nBTpaper.disabled = true;\r\nBTcissors.disabled = true;\r\n}\r\n\r\n// Fonction pour activer les boutons de jeu\r\nconst enableButtons = () => {\r\nBTstone.disabled = false;\r\nBTpaper.disabled = false;\r\nBTcissors.disabled = false;\r\n}\r\n\r\n// Fonction pour afficher le résultat de la partie\r\nconst played = (value, otherAnswer) => {\r\nif(value == 'win') {\r\nstatusLabel.innerHTML = `Vous avez gagné ! L'autre joueur a joué ${otherAnswer}`;\r\n}\r\nelse if(value == 'loose') {\r\nstatusLabel.innerHTML = `Vous avez perdu ! L'autre joueur a joué ${otherAnswer}`;\r\n}\r\nelse if(value == 'egality') {\r\nstatusLabel.innerHTML = `Vous êtes à égalité en ayant tous les deux joués ${otherAnswer}`;\r\n}\r\nelse {\r\nstatusLabel.innerHTML = \"Une erreur s'est produite, rechargez la page\";\r\nsocket.disconnect(true);\r\n}\r\n}\r\n\r\n// Fonction pour récupérer le gagnant de la partie\r\nconst getWinner = () => {\r\nlet player1Score = document.querySelector('#player1Score').innerHTML;\r\nlet player2Score = document.querySelector('#player2Score').innerHTML;\r\nif (player1Score > player2Score) {\r\nwinner.innerHTML = \"YOU WIN\";\r\n} else if (player2Score > player1Score) {\r\nwinner.innerHTML = \"YOU LOOSE\";\r\n} else {\r\nwinner.innerHTML = \"DRAW\";\r\n}\r\n}\r\n\r\n// Événement pour réinitialiser la partie\r\nBTreset.addEventListener(\"click\", () => {\r\nsocket.emit('buttonClicked');\r\n});\r\n\r\n// Événements pour jouer\r\nBTstone.addEventListener(\"click\", () => {\r\ndisableButtons();\r\nstatusLabel.innerHTML = \"Vous avez joué la pierre. En attente du choix de l'autre joueur...\";\r\nsocket.emit('play', 'pierre');\r\n});\r\n\r\nBTpaper.addEventListener(\"click\", () => {\r\ndisableButtons();\r\nstatusLabel.innerHTML = \"Vous avez joué la feuille. En attente du choix de l'autre joueur...\";\r\nsocket.emit('play', 'feuille');\r\n});\r\n\r\nBTcissors.addEventListener(\"click\", () => {\r\ndisableButtons();\r\nstatusLabel.innerHTML = \"Vous avez joué les ciseaux. En attente du choix de l'autre joueur...\";\r\nsocket.emit('play', 'ciseaux');\r\n});\r\n\r\n// Désactivation des boutons de jeu au début\r\ndisableButtons();\r\n\r\n// Événements pour la connexion au serveur\r\nsocket.emit('newPlayer');\r\nsocket.on('status', value => refreshStatus(value));\r\nsocket.on('play', (value, otherAnswer) => played(value, otherAnswer));\r\n\r\n// Cette fonction est appelée lorsque le score des deux joueurs est mis à jour\r\nsocket.on('updateScore', (player1ScoreNew, player2ScoreNew) => {\r\ndocument.querySelector('#player1Score').innerHTML = player1ScoreNew;\r\ndocument.querySelector('#player2Score').innerHTML = player2ScoreNew;\r\n});\r\n\r\n// Cette fonction est appelée lorsque le jeu est terminé et qu'un vainqueur est déterminé\r\nsocket.on('fin',(vainqueur)=>{\r\nlet winner1 = getWinner();\r\nconsole.log('le vainqueur est: '+ vainqueur);\r\nBTreset.disabled=true;\r\n});\r\n\r\n// Cette fonction est appelée lorsque le jeu est réinitialisé\r\nsocket.on('gameReset',()=>{\r\nenableButtons();\r\nstatusLabel.innerHTML = \"C'est à votre tour de jouer.\";\r\n});\r\n\r\n// Cette fonction est appelée lorsque le nombre maximum de joueurs est atteint\r\nsocket.on('maxPlayersReached', () => {\r\nconsole.log(\"Le nombre maximum de joueurs a été atteint, connexion refusée.\");\r\nstatusLabel.innerHTML = \"Nombre maximal de joueurs atteint, connexion refusée.\";\r\ndisableButtons();\r\n});\r\n\n\n//# sourceURL=webpack://client/./src/scripts/pfc.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/scripts/pfc.js"]();
/******/ 	
/******/ })()
;