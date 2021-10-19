# AurelieGautierBartolo_6_05102021
  
Ce repository backend est celui du projet 6 du parcours OpenClassrooms Développeur Web.  
Le frontend est fourni (cf. documentation ci-après).  
  
Prérequis :
- Visual Studio Code
- WSL Debian (Windows Subsystem for Linux)
- Commandes de base sous linux

## Compétences évaluées
- Implémenter un modèle logique de données conformément à la réglementation
- Stocker des données de manière sécurisée
- Mettre en œuvre des opérations CRUD de manière sécurisée  
  
## Contexte du projet
Piiquante se dédie à la création de sauces épicées dont les recettes sont gardées  
secrètes. Pour tirer parti de son succès et générer davantage de buzz, l'entreprise  
souhaite créer une application web dans laquelle les utilisateurs peuvent ajouter  
leurs sauces préférées et liker ou disliker les sauces ajoutées par les autres.  

# Installation de Node.js avec Debian  
[Documentation](https://github.com/nodesource/distributions/blob/master/README.md)
- Ouvrir une fenêtre VS Code
- Activer WSL Debian (clic sur le logo en bas à gauche WSL : New WSL Window)
- Ouvrir le terminal (comme pour toutes les commandes suivantes)
```
curl -fsSL https://deb.nodesource.com/setup_16.x | bash -

apt-get install -y nodejs
```

# Installation du site PIIQUANTE avec Node.js
(OU BIEN Utilisation du frontend du site PIIQUANTE avec l'extension Live Share de VS Code)
  
- Se positionner dans le dossier dans lequel déposer le dossier du repository du frontend : www
```
cd <path>
```
- Cloner le repository
```
git clone : https://github.com/OpenClassrooms-Student-Center/Web-Developer-P6
```
- Renommer le dossier en p6.localhost
- Activer l'extension Live Server  
OU BIEN  
installer Angular CLI (Command Line Interface) pour faire tourner le serveur
```
npm install -g @angular/cli
```
- lancer le server Angular
```
ng serve
```

## OU BIEN Utilisation du frontend du site PIIQUANTE avec l'extension Live Share de VS Code  
  
# Installation de l'API

## 1. Installation du repository github (voir pour créer un repo sur github)
- Ouvrir une fenêtre VS Code
- Activer WSL Debian
- Ouvrir le terminal Debian
- Se positionner dans le dossier dans lequel déposer le dossier du repository du backend : www
- Cloner le repository

```
git clone : https://github.com/AureFromMars/AurelieGautierBartolo_6_05102021
```
- Renommer le dossier en p6.localhost
- Activer WSL Debian (clic sur le logo en bas à gauche WSL : Reopen folder in WSL)

## 2. Installation de nodemon server  
=> Pour surveiller les modifications de fichiers et éviter d'utiliser systématiquement node server
```
npm install -g nodemon
```
- Remplacer node par nodemon à package.json, et l'exécuter avec npm run start

## 3. Installation du framework Express
```
npm install express
```
N.B. Dès Express 4.16, bodyparser est inclu, utiliser expression.json() pour analyser le corps d'une requête  
[Documentation](http://expressjs.com/fr/)

## 4. Installer la base de données

1. Installer Mongoose  
[Documentation](https://atinux.developpez.com/tutoriels/javascript/mongodb-nodejs-mongoose/)  
Système de gestion de Base De Données Mongoose (noSQL)  
=> se connecte à MongoDB et NodeJS (équivalent SQL = Sequalize)  
```
npm install mongoose
```
2. Installer MongoDB Atlas  
[MongoDB Atlas](https://cloud.mongodb.com/v2#/preferences/organizations) : créer/stocker la base sur le serveur public  
Cas P6 (données confidentielles en cas réel) :
```
curl -OL https://cloud.mongodb.com/download/agent/automation/mongodb-mms-automation-agent-manager_11.6.0.7119-1_amd64.ubuntu1604.deb

sudo dpkg -i mongodb-mms-automation-agent-manager_11.6.0.7119-1_amd64.ubuntu1604.deb

mmsGroupId=6160282089695131a8eba296

mmsApiKey=6160291321ddbd52cb17cacdfad58c5880dfd20589c9664e43cdd004
```

# Ajouter les packages/extensions Node.js utiles pour le projet
N.B. Before NPM5 "--save" was required to save the installed package to package.json  
package.json (limiter à ce qui est commun au départ, s'incrémente à chaque ajout de package)
  
- dot env pour travailler avec les variables d'environnement (globales, pour éviter d'avoir à tout éditer si besoin : URL, mots de passe, id, chemins d'accès aux fichiers, et données sécurisées (token, clés d'API, etc.)) : npm install dot env
- body-parser pour pouvoir extraire des objets JSON : npm install body-parser // À partir de la version 4.16 d'Express, bodyparser est inclus !
- cors pour éviter d'avoir à écrire tous les headers : npm install cors
- morgan pour logger les requêtes middleware HTTP : npm install morgan
- bcrypt pour hasher le password : npm install bcrypt
- crypto-js/hmac-sha256 pour chiffrer l'email avec un haut niveau de sécurité (résultat très long avec 256) : npm install crypto-js/hmac-sha256
- password-validator pour obliger à créer un mot de passe fort : npm install password-validator
- mongoose-unique-validator pour clarifier les erreurs de validation : npm install mongoose-unique-validator
- jsonwebtoken pour créer des tokens d'authentification : npm install jsonwebtoken

# Créer l'API : indications pour les développeurs, NE PAS FAIRE pour la seule installation post-développement

## 1. Mettre en place l'organisation du modèle de conception MVC (Model-View-Controller)
- 2 dossiers MVC (donc sans view du front) + 1 routes + 1 middleware + 1 pour stocker les images  
1. controllers
2. images
3. middleware
4. models
5. routes  
La part VIEW ici est le frontend et la part qui renvoie du JSON au frontend pour affichage

## 2. Créer les fichiers
=> importations en cascade (cf. ci-dessous)  
=> importations de packages adhoc selon usages (ex : importation d'express ou mongoosse dans app.js, non documenté ici)
  
1. Le server : server.js => importation de app.js  
!!! le créer avant pour le faire reconnaître par npm init, sinon noter server.js comme point d'entrée de npm init  
```
npm init
```
2. L'application qui configure le démarrage :  : app.js => importation des routes
3. Les middleware
4. Les routes => importation des controllers et middlewares  
5. Les controllers => importation des models  
6. Les models  
7. Les variables d'environnement
[Documentation](https://ichi.pro/fr/gerez-les-variables-d-environnement-dans-votre-application-nodejs-avec-dotenv-90198954812747)  
- créer le fichier .env à la racine du projet
- ajouter le fichier .env à .gitignore =>  
8. .gitignore => https://www.toptal.com/developers/gitignore (saisir : node windows linux VisualStudioCode, voire express et mongodb)

# NOTES
- git branch  
pour quitter = q
- Commenter le catch si on veut l'erreur en console
- Préparer un "scaffold" : échaffaudage, structure des dossiers minimaux

## Ressources supplémentaires
[Express Guide](https://expressjs.com/fr/4x/api.html#express)  
[mongoose Guides](https://mongoosejs.com/docs/guides.html)  
[Node.js debugging in VS Code](https://code.visualstudio.com/docs/nodejs/nodejs-debugging)  
[Markown-memento](https://github.com/Simplonline-foad/utiliser-markdown/blob/master/README.md)    
[Basic writing and formatting syntax](https://docs.github.com/en/github/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax)

## Debugger les blocages de node et port d'écoute déjà utilisés (processus zombie)
  
- Tout tuer :
``` 
killall node
```
- Voir les modules utilisant Node :  
```
ps aux | grep node
```
- Tâche qui a lancé la commande suivante :
```
sh -c nodemon server.js
```
- Commande qui a créé la commande suivante :
```
node /usr/bin/nodemon server.js
```
- Processus qui refresh node :
```
/usr/bin/node server.js
```
- Arrêter les 3 processus manuellement avec signaux : 1 2 9 etc. => recherche web kill process id linux
```
kill -9 <id>
```