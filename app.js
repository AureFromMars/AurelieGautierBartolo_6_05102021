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
 * 200 = 
 * 201 = pour les requêtes de création d'une nouvelle ressource
 * 400 = 
 * 401 = 
 * 
 * ******************/

// Import Express (N.B. body parser included)
const express = require('express');
const app = express();

// Import dotenv to create environment variables
const dotenv = require('dotenv').config();

// Import Sauce Model
const Sauce = require('./models/SauceModel');

// Import Morgan to have logs about HTTP middleware requests
const morgan = require('morgan');
app.use(morgan('dev'));

// Import registration route
const registerRouter = require('./routes/registerRoute');

// Import sauce route // Déjà déclaré... dans ???
// const sauceRouter = require('./routes/saucesRoute');

// Import db connexion
const db = require('./db/db');

// Import path Node module to have path from images
const path = require('path');

// Import cors to avoid declare headers
const cors = require('cors');
app.use(cors());
app.options('*', cors());
/*********** Authorisations headers */ // Pas utilse si app.use(cors());
// app.use((req, res, next) => {//application qui reçoit la requête GET et la réponse de localhost:3000
//     res.setHeader('Access-Control-Allow-Origin', '*');// Accéder à l'API depuis n'importe quelle origine
//     res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization, text/html, application/xhtml+xml, application/xml;q=0.9, image/avif, image/webp, image/apng, */*;q=0.8, application/signed-exchange;v=b3;q=0.9');
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');// Requête GET et OPTIONS sans CROS // les autres avec prefetch // GET DELETE et OPTIONS n'envoient pas forcément des données // les autres de type POST avec envoi
//     req.headers['Accept'] = 'application/json, text/plain, */*';
//     req.headers['Content-Type'] = 'multipart/form-data';// Pour permettre l'upload de l'image
//     next();
// });

// Import Mongoose debugger
const mongoose = require('mongoose');// Import Mongoose
mongoose.set('debug', true);


/*************** POST Login form ***************/
app.use(express.json());
// ENDPOINT
app.post('/api/auth/login', (req, res, next) => {//application qui reçoit la requête POST et la réponse de localhost:3000
    console.log(req.body);
    res.status(201).json({
        message: 'Objet créé !'
    });
    next();
});

// Create authentification route (token ?)
app.use('/api/auth', registerRouter);

/*************** CRUD SAUCES = CREATE, READ, UPDATE, DELETE ***************/
const sauceRouter = require('./routes/saucesRoute');

// POST a new sauce
app.post('/api/sauces', (req, res, next) => {
    delete req.body._id;// enlever l'id avant de copier l'objet
    console.log(req.body);
    const sauce = new Sauce({
        ...req.body/// Raccourci pour remplacer tous les types de champs dans Thing.js de type title: req.body.title
    });
    sauce.save()// Pour enregistrer l'objet dans la base

    // const image = new Image({
    //     // Ajouter du code ici pour récupérer l'image et la stocker quelque part !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    // });
    // image.save()// Pour enregistrer l'image dans la base : cf. https://appdividend.com/2019/02/14/node-express-image-upload-and-resize-tutorial-example/
    

    .then(() => res.status(201).json({ message: 'Sauce enregistrée !'}))// Callback qui retourne une promise, et envoyer une res sinon expiration de requête
    .catch(error => res.status(400).json({ error }));// Callback pour récupérer l'erreur avec code 400 et json avec erreur
});

// GET All sauce page // Recover all sauces in DB
app.get('/api/sauces', (req, res, next) => {
    console.log(req.body)
    Sauce.find()
    .then((sauces) => res.status(200).json(sauces))//200 pour GET lorsque le .find est terminé // A stocker dans la variable sauces
    .catch(error => res.status(400).json({ error }));// Récupérer l'erreur avec code 400 et json avec erreur
});

// Recover the unique id sauce (dynamic)
app.get('/api/sauces/:id', (req, res, next) => {
    console.log(req.body);
    Sauce.findOne({ _id: req.params.id })
    .then(sauce => res.status(200).json(sauce))
    .catch(error => res.status(404).json({ error }));
});

// Access to image Url
app.use('/images', express.static(path.join(__dirname, 'images')));// Need path module from Node

// EXPORT app module
module.exports = app;