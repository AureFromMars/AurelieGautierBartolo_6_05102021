# AurelieGautierBartolo_6_05102021


# Installation du site PIIQUANTE
- Ouvrir une fenêtre VS Code
- Activer WSL Debian (clic sur le logo en bas à gauche WSL : New WSL Window)
- Ouvrir le terminal
- Se positionner dans le dossier dans lequel déposer le dossier du repository du frontend : www
- Cloner le repo
```
git clone : https://github.com/OpenClassrooms-Student-Center/Web-Developer-P6
```
- Renommer le dossier en p6.localhost
- Activer Live Server  
OU BIEN  
- installer Angular CLI (Command Line Interface) pour faire tourner le serveur
```
npm install -g @angular/cli
```
- lancer le server Angular
```
ng serve
```

# Installation de l'API

## 1. Installation du repository github (voir pour créer un repo sur github)
- Ouvrir une fenêtre VS Code
- Activer WSL Debian
- Ouvrir le terminal
- Se positionner dans le dossier dans lequel déposer le dossier du repository du frontend : www
- Cloner le repo
```
git clone : https://github.com/AureFromMars/AurelieGautierBartolo_6_05102021
```
- Renommer le dossier en p6.localhost
- Activer WSL Debian (clic sur le logo en bas à gauche WSL : Reopen folder in WSL)

## 2. Installation de Node.js avec Debian
- Ouvrir le terminal Debian
```
curl -fsSL https://deb.nodesource.com/setup_16.x | bash -
apt-get install -y nodejs
```
- Ajouter nodemon server pour surveiller les modifications de fichiers et éviter d'utiliser systématiquement node server
```
npm install -g nodemon
```
- Remplacer node par nodemon à package.json, et l'exécuter avec npm run start
- ajouter l'extension body-parser pour pouvoir extraire des objets JSON
```
npm install --save body-parser
```

## 3. Installation du framework Express
- Ouvrir le terminal Debian
```
npm install express
```
N.B. Dès Express 4.16, bodyparser est inclu, utiliser expression.json() pour analyser le corps d'une requête  
[Documentation](http://expressjs.com/fr/)

## 4. Installation du système de gestion de Base De Données Mongoose (noSQL)
Système qui se connecte à MongoDB et se connecte à NodeJS (équivalent SQL = Sequalize)
- Ouvrir le terminal Debian
```
npm install mongoose
```
[Documentation](https://atinux.developpez.com/tutoriels/javascript/mongodb-nodejs-mongoose/)  
[MongoDB Atlas](https://cloud.mongodb.com/v2#/preferences/organizations) : créer/stocker la base sur le serveur public

# Préparer le scaffold
Echaffaudage : structure des dossiers minimum
- server.js (le créer avant va le faire reconnaître pas npm init, sinon noter server.js comme point d'entrée de npm init)  
!!! ATTENTION, si le même port d'écoute est déjà utilisé (processus zombie) :
```
killall node
```

```
npm init
```
- app.js => importation des rooters, se connecter à MongoDB (pas nécessaire au scaffolding, dépend de l'API)
- .env ==> npm install dot env : https://www.npmjs.com/package/dotenv
- .gitignore => https://www.toptal.com/developers/gitignore (saisir : node windows linux VisualStudioCode, voire express et mongodb)
=> Mettre de côté pour P7  
!!! Créer un repo pour le scaffold pour mettre de côté

- package.json (limiter à ce qui est commun au départ)
- ajout du package cors pour éviter d'avoir à écrire tous les headers : npm install --save cors
- ajout du package morgan pour logger les requêtes middleware HTTP : npm install --save morgan
- ajout du package bcrypt pour hasher le password
- ajout du package crypto-js/hmac-sha256 pour chiffrer l'email avec un haut niveau de sécurité (résultat très long avec 256)
- ajout du package password-validator pour obliger à créer un mot de passe fort
- ajout du package mongoose-unique-validator pour clarifier les erreurs de validation
- ajout du package jsonwebtoken pour créer des tokens d'authentification

# Installer la Base de données
1. Installer MongoDB Atlas
- curl -OL https://cloud.mongodb.com/download/agent/automation/mongodb-mms-automation-agent-manager_11.6.0.7119-1_amd64.ubuntu1604.deb
- sudo dpkg -i mongodb-mms-automation-agent-manager_11.6.0.7119-1_amd64.ubuntu1604.deb
- mmsGroupId=6160282089695131a8eba296
- mmsApiKey=6160291321ddbd52cb17cacdfad58c5880dfd20589c9664e43cdd004
2. Installer Mongoose
```
npm install --save mongoose
```


# Créer l'API

- .env (dot env) = travailler avec les variables d'environnement (globales, pour éviter d'avoir à tout éditer si besoin) : https://ichi.pro/fr/gerez-les-variables-d-environnement-dans-votre-application-nodejs-avec-dotenv-90198954812747  
--> URL, mots de passe, id, chemins d'accès aux fichiers, et données sécurisées (token, clés d'API, etc.)








# NOTES
git branch
pour quitter = q

[Markown-memento](https://github.com/Simplonline-foad/utiliser-markdown/blob/master/README.md)  
[Basic writing and formatting syntax](https://docs.github.com/en/github/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax)


# Debugger les blocages de node et port déjà utilisés

- killall node : pour tout tuer
- ps aux | grep node : voir tous les modules utilisants node
- sh -c nodemon server.js --> tâche qui a lancé la commande suivante
- node /usr/bin/nodemon server.js --> commande qui a créé la commande suivante
- /usr/bin/node server.js --> processus qui refresh node  
- (rechercher kill process id linux) kill -9 <id> (arrêter les 3 processus manuellement avec signaux : 1 2 9 etc.)