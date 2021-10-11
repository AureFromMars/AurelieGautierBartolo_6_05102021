const express = require('express');
const sauceRouter = express.Router();

// Import sauceCtrl
const sauceCtrl = require('../controllers/saucesCtrl');

// // // Import authCtrl
// const authCtrl = require('../controllers/authCtrl');

// Import token.js
const authMiddleware = require('../middleware/token');  // <- plus verbeux comme ça, ok


// Import Multer Middleware
const multer = require('../middleware/multer-config')

// CRUD ENDPOINT // Routes for sauces
sauceRouter.post('/', authMiddleware, multer, sauceCtrl.createSauce);// Multer after auth to authentify before to post
// authCtrl == User Controller pas auth middleware, je l'ai appelé authCtrl, pas User :)
// là ton middleware est bien exzporté, donc importes-le ici et utilise-le // ok j'approfondis alors je sais pas le récupérer tel quel
sauceRouter.put('/:id', authMiddleware, sauceCtrl.modifySauce);
sauceRouter.delete('/:id', authMiddleware, sauceCtrl.deleteSauce);
sauceRouter.get('/:id', authMiddleware, sauceCtrl.getOneSauce);
sauceRouter.get('/', authMiddleware, sauceCtrl.getAllSauces);

// EXPORT router module
module.exports = sauceRouter;