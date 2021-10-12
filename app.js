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
 * ******************/

// Imports
const express = require('express');// Express (N.B. body parser included)
const app = express();
const dotenv = require('dotenv').config();// dotenv to create environment variables // Utile ici ??????????????????????????????????
const Sauce = require('./models/SauceModel');// Sauce Model
const morgan = require('morgan');// Morgan to have logs about HTTP middleware requests
app.use(morgan('dev'));
const authRouter = require('./routes/authRoute');// Registration route
const sauceRouter = require('./routes/saucesRoute');// Sauce route
const db = require('./db/db');// Db connexion
const path = require('path');// Path Node module to have path from images
const mongoose = require('mongoose');// Mongoose
mongoose.set('debug', true);// Mongoose debugger
const cors = require('cors');// Cors to avoid declare headers
app.use(cors());
app.options('*', cors());

/*************** Login form ***************/
app.use(express.json());
// ENDPOINT
// app.post('/api/auth/login', (req, res, next) => {//application qui reçoit la requête POST et la réponse de localhost:3000
//     console.log(req.body);
//     res.status(201).json({
//         message: 'Objet créé !'
//     });
//     next();
// });
app.use('/api/auth', authRouter);// Create authentification route

/*************** SAUCES ***************/
app.use('/api/sauces', sauceRouter);// Create sauce route
app.use('/images', express.static(path.join(__dirname, 'images')));// Access to image Url // Need path module from Node
// POST a new sauce with image
// const upload = require('./middleware/multer-config')
// app.post('/api/sauces', upload, (req, res, next) => {
//     console.log(req.body);
// });

// GET All sauces page // Recover all sauces in DB
// app.get('/api/sauces', (req, res, next) => {
//     console.log(req.body)
//     Sauce.find()
//     .then((sauces) => res.status(200).json(sauces))//200 pour GET lorsque le .find est terminé // A stocker dans la variable sauces
//     .catch(error => res.status(400).json({ error }));// Récupérer l'erreur avec code 400 et json avec erreur
// });

// Recover the unique id sauce (dynamic)
// app.get('/api/sauces/:id', (req, res, next) => {
//     console.log(req.body);
//     Sauce.findOne({ _id: req.params.id })
//     .then(sauce => res.status(200).json(sauce))
//     .catch(error => res.status(404).json({ error }));
// });

// EXPORT app module
module.exports = app;