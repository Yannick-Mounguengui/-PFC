export default class IOController {
  //un constructeur qui initialise les variables pour les joueurs et les scores
  constructor(io) {
    this.io = io;
    this.winner;
    this.player1ID = '';
    this.player1Socket;
    this.player1Choice = '';

    this.player2ID = '';
    this.player2Socket;
    this.player2Choice = '';
    this.player1Score=0;
    this.player2Score=0;
    this.scores = {};
    this.numberOfRound = 0;
    this.numberOfRounds=5;
    this.finishedGame = false;
  }

  choices = ["Pierre", "Feuille", "Ciseaux"];
  //une fonction pour enregistrer les connexions Socket.io pour les deux joueurs ou pour le mode solo. Cette fonction écoute les événements Socket.io pour les connexions, les déconnexions et les événements du jeu

  registerSocket(socket) {
    //avec 2 players
    socket.on('newPlayer', () => this.registerPlayer(socket));
    socket.on('play', (value) => this.play(socket, value));
    socket.on('updateScore',() => this.updateScore(socket));
    socket.on('buttonClicked',() => this.restart(socket));
    socket.on('disconnect', () => this.leave(socket));
    //avec l'ia
    socket.on('new', () => this.registerPlayerai(socket));
    socket.on('buttonClickedai',() => this.restartai(socket));
    socket.on('end',() => this.endGameai(socket));
  }

  //une fonction pour enregistrer une connexion Socket.io
  registerPlayer(socket) {
      console.log(`Nouvelle connexion ID : ${socket.id}`);
      if(this.player1ID == '') {
          this.player1ID = socket.id;
          this.player1Socket = socket;
          console.log('Connexion Joueur1 enregistrée');
      }
      else if(this.player2ID == '') {
          this.player2ID = socket.id;
          this.player2Socket = socket;
          console.log('Connexion Joueur2 enregistrée');
      }
      else {
          socket.emit('maxPlayersReached');
          socket.disconnect(true);
          console.log('Nouvelle connexion refusée : 2 joueurs maximum');
      }
      this.sayIfReady();
  }

//une fonction pour enregistrer une connexion Socket.io pour le mode solo, où le joueur 1 est humain et le joueur 2 est une intelligence artificielle.
  registerPlayerai(socket) {
      console.log(`Nouvelle connexion ID : ${socket.id}`);
      if(this.player1ID == '') {
          this.player1ID = socket.id;
          this.player1Socket = socket;
          console.log('Connexion Joueur1 enregistrée');
      }
      else {
          socket.emit('maxPlayersReached');
          socket.disconnect(true);
          console.log('Nouvelle connexion refusée : 1 joueurs maximum');
      }
      this.sayIfReadyai();
  }

//une fonction pour gérer les déconnexions Socket.io pour les joueurs
  leave(socket) {
    console.log(`Déconnexion ID : ${socket.id}`);
    if(this.player1ID == socket.id) {
      this.player1ID = '';
      console.log('Joueur1 s\'est déconnecté');
    }
    else if(this.player2ID == socket.id) {
        this.player2ID = '';
        console.log('Joueur2 s\'est déconnecté');
    }
    if(!this.finishedGame) { this.sayIfReady(); }
    else { this.finishedGame = true; }
  }

//une fonction qui informe les joueurs de leur état (attente ou jeu en cours) et gère les transitions entre ces états
  sayIfReady() {
      if(this.player1ID == '' && !this.player2ID == '') {
          this.player2Socket.emit('status', 'waiting');
      }
      else if(this.player2ID == '' && !this.player1ID == '') {
          this.player1Socket.emit('status', 'waiting');
      }
      else if(!this.player2ID == '' && !this.player1ID == '') {
          this.player1Socket.emit('status', 'playing');
          this.player2Socket.emit('status', 'playing');
      }
  }

//une fonction qui informe le joueur de l'état du jeu en mode solo
  sayIfReadyai() {
      if(!this.player1ID == '') {
          this.player1Socket.emit('status', 'playing');
      }
  }

// une fonction qui envoie les scores mis à jour à tous les joueurs
  updateScore(socket){
    this.player1Socket.emit('updateScore', this.scores[this.player1ID], this.scores[this.player2ID]);
    this.player2Socket.emit('updateScore', this.scores[this.player1ID], this.scores[this.player2ID]);

  }

// une fonction qui envoie les scores mis à jour à tous les joueurs
  play(socket, value) {
    if(socket.id == this.player1ID) {
        this.player1Choice = value;
    }
    else if(socket.id == this.player2ID) {
        this.player2Choice = value;
    }
    if(this.player1Choice != '' && this.player2Choice != '') {
            this.numberOfRound++;
            this.determine();
            this.player1Score = this.scores[this.player1ID];
            this.player2Score = this.scores[this.player2ID];
            if(this.player1Score >= 3 || this.player2Score >= 3){
              let vainqueur = this.Winner();
              this.player1Socket.emit('fin', vainqueur);
              this.player2Socket.emit('fin', vainqueur);
              console.log('le vainqueur est: '+ vainqueur);
              this.endGame();
            }
    }
  }

//une fonction qui réinitialise les choix des joueurs et envoie un événement Socket.io pour réinitialiser le jeu.
  restart(socket){
      this.player1Choice = '';
      this.player2Choice = '';
      this.player1Socket.emit('gameReset');
      this.player2Socket.emit('gameReset');
  }

// une fonction qui réinitialise les choix du joueur et envoie un événement Socket.io pour réinitialiser le jeu
  restartai(socket){
      this.player1Choice = '';
      this.player1Socket.emit('gameResetai');
  }

//une fonction qui détermine le vainqueur du jeu
  Winner() {
  this.player1Score = this.scores[this.player1ID];
  this.player2Score = this.scores[this.player2ID];
  if(this.player1Score > this.player2Score) {
    return 'Player 1';
  }
  else if(this.player2Score > this.player1Score) {
    return 'Player 2';
  }
  else {
    return 'Draw';
  }
}

//une fonction qui détermine le vainqueur de chaque manche et met à jour les scores.
  determine() {
    const choices = {
      pierre: { pierre: 'egality', feuille: 'loose', ciseaux: 'win' },
      feuille: { pierre: 'win', feuille: 'egality', ciseaux: 'loose' },
      ciseaux: { pierre: 'loose', feuille: 'win', ciseaux: 'egality' },
    };
    const result = choices[this.player1Choice][this.player2Choice];
    this.player1Score = result === 'win' ? this.player1Score + 1 : this.player1Score;
    this.player2Score = result === 'loose' ? this.player2Score + 1 : this.player2Score;
    this.scores[this.player1ID]=this.player1Score;
    this.scores[this.player2ID]=this.player2Score;

    this.player1Socket.emit('play', result, this.player2Choice);
    this.player2Socket.emit('play', result === 'win' ? 'loose' : result === 'loose' ? 'win' : 'egality', this.player1Choice);
    this.player1Socket.emit('updateScore', this.player1Score, this.player2Score);
    this.player2Socket.emit('updateScore', this.player2Score, this.player1Score);
  }

  //une fonction qui termine le jeu après un certain nombre de manches
  endGame() {
      this.finishedGame = true;
      this.leave(this.player1Socket);
      this.leave(this.player2Socket);
      this.player1ID = '';
      this.player2ID = '';
      this.player1Choice = '';
      this.player2Choice = '';
      this.player1Score=0;
      this.player2Score=0;
      this.roundsPlayed=0;
  }

//une fonction qui termine le jeu après un certain nombre de manches
  endGameai(Socket){
      this.finishedGame = true;
      this.leave(this.player1Socket);
  }

}
