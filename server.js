/****************** Créer le serveur Node ******************/
const http = require('http');
const app = require('./app');// Importer le app.js
const dotenv = require('dotenv').config();// Importer dotenv

const normalizePort = val => {//Définir, normaliser un port valide : numéro ou chaîne
    const port = parseInt(val, 10);
    if (isNaN(port)) {return val;}
    if (port >= 0) {return port;}
    return false;
};
const port = normalizePort(process.env.PORT);// Normaliser le port dont le numéro est stocké dans .env
app.set('port', port);// Créer, setter le port dans app.js

const server = http.createServer(app);// Fonction d'appel d'app.js
const address = server.address();
const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;

const errorHandler = error => {//Rechercher et gérer les erreurs
    if (error.syscall !== 'listen') {throw error;}
    switch (error.code) {//Instruction similaire à if...else
        case 'EACCES':
            console.error(bind + ' requires elevated privileges.');
            process.exit(1);
        break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use.');
            process.exit(1);
        break;
        default: throw error;
    }
};

server.on('error', errorHandler);
server.on('listening', () => {// Ecouteur d'événements avec port ou canal n'exécution du serveur dans la console
    console.log('Listening on ' + bind);
});
server.listen(port);