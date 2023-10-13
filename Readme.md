# Projet : pierre feuille ciseaux

## Membres du binôme :

* Yannick MOUNGUENGUI

## How To

## Récupérer le projet

*Dans un terminal faire les commandes suivantes:*

```bash
git clone git@gitlab-etu.fil.univ-lille.fr:angeyannick.mounguenguiitoua.etu/mounguengui_yannick_jsfs.git

```
*se placer dans le répertoire*

```bash
cd mounguengui_yannick_jsfs/pfc
```
*se placer dans le dossier client*

```bash
cd client
```
*faire la commande suivante pour generer les modules:*

```bash
npm install
```
*faire la commande suivante pour generer le bundle et tous les fichiers necessaires:*

```bash
npm run build
```
*se placer dans le dossier serveur*

```bash
cd ../serveur
```
*faire la commande suivante pour generer les modules:*

```bash
npm install
```
*faire la commande:*

```bash
nodemon
```

*ensuite ouvrir un navigateur et coller le lien suivant:*

```bash
http://localhost:8080/
```

## Info projet

# PFC

La page PFC est une page consacré au jeu Pierre feuille ciseaux pour joueur contre joueur.
Pour jouer cliquer sur l'icone pfc à partir de la "Home page" pour etre diriger vers la page pfc.
Dupliquer l'onglet pfc pour enregistrer un 2e joueur pour pouvoir lancer la partie.
Un 3e onglet de la page pfc indiquera qu'on ne peut pas jouer car le nombre de place max a été atteinte.
Le jeu se deroule en 5 manches,le 1er joueur à atteindre 3 points remporte la partie.
Le bouton play again permet de jouer un nouveau tour apres le 1er tour.
Des qu'il y a un gagnant,le jeu se stoppe avec la fonction endGame et il y a un affichage du joueur qui a gagné et et qui a perdu dans les pages respectives ,il y a une deconnection des 2 joueurs via la fonction endGame.
Il faut recharger les pages pour enregistrer de nouveaux joueurs et commencer une nouvelle partie.
Ce jeu necessite 2  pages de pfc ouvertes si on est sur un meme ordinateur.
Pour tester sur des ordinateurs differents il faut partager le meme reseau wifi connecté et:

-lancer le serveur sur l'ordinateur ayant le code avec la commande nodemon coté serveur et partagé son addresse ip au 2e ordinateur(pour savoir son addresse ip,on fait ipconfig(si vous etes sur windows) ou ip a(si vous etes sur syteme linux))

-l'autre ordinateur doit recuperer l'adresse ip du 1er ordinateur et l'entrer dans un navigateur internet en fesant: adresse_ip:8080


# PFCIA

La page PFCIA est une page consacré au jeu Pierre feuille ciseaux pour joueur contre intelligence artificielle(IA).
Pour jouer cliquer sur l'icone pfcia à partir de la "Home page" pour etre diriger vers la page pfcia.
Le jeu se deroule en 5 manches,le 1er joueur (entre le joueur réel et l'IA) à atteindre 3 points remporte la partie,la fonction endGameai coté serveur deconnecte le joueur à la fin de la partie.
Il faut recharger la page pour enregistrer un nouveau joueur et commencer une nouvelle partie contre l'IA.
Ce jeu necessite une seule page ouverte car on affronte une IA.
