/******************Récupérer l'application Express
 * Elle contient des fonctions middleware permettant d'utiliser des objets request et response
 * 
 * 4 éléments :
 * 1. enregistre « Requête reçue ! » dans la console et passe l'exécution
 * 2. ajoute un code d'état 201 à la réponse et passe l'exécution
 * 3. envoie la réponse JSON et passe l'exécution
 * 4. enregistre « Réponse envoyée avec succès ! » dans la console
 *  
 * MIDDLEWARE = app.use
 * next();// QUE DANS LE MIDDLEWARE !
 * 
 * 100+ ➡ Information
 * 200+ ➡ Succès
 * 300+ ➡ Redirection
 * 400+ ➡ Erreur client
 * 500+ ➡ Erreur serveur
 * 
 * 200 = 
 * 201 = pour les requêtes de création d'une nouvelle ressource
 * 400 = 
 * 401 = 
 * 
 * Commenter le catch si on veut l'erreur en console
 * 
 * ******************/

// Imports
const express = require('express');// Express (N.B. body parser included)
const dotenv = require('dotenv');// dotenv to create environment variables
dotenv.config();// Could be included in above line
const morgan = require('morgan');// Morgan to have logs about HTTP middleware requests
const authRouter = require('./routes/authRoute');// Registration route
const sauceRouter = require('./routes/saucesRoute');// Sauce route
const path = require('path');// Path Node module to have path from images
const mongoose = require('mongoose');// Mongoose
const cors = require('cors');// Cors to avoid declare headers

/*** Use middlewares and apps config */
const app = express();
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());
app.options('*', cors());

/*********** MongoDb Atlas : agautierbartolo - M0ngodb */
mongoose.set('debug', true);// Mongoose debugger
const uri = `${process.env.DB_PROTO}://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_CLUSTER}.${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority`;
mongoose.connect( uri,
    { useNewUrlParser: true,
    useUnifiedTopology: true })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !')
);

/*************** AUTHENTIFICATION ***************/
app.use('/api/auth', authRouter);// Create authentification route

/*************** SAUCES ***************/
app.use('/api/sauces', sauceRouter);// Create sauce route
app.use('/images', express.static(path.join(__dirname, 'images')));// Access to image Url // Need path module from Node

// EXPORT app module
module.exports = app;