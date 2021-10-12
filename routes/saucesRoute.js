// Imports
const express = require('express');
const sauceRouter = express.Router();
const sauceCtrl = require('../controllers/saucesCtrl');
const authMiddleware = require('../middleware/token');
const multer = require('../middleware/multer-config')

// CRUD ENDPOINT = CREATE, READ, UPDATE, DELETE // Routes for sauces
sauceRouter.post('/', authMiddleware, multer, sauceCtrl.createSauce);// Multer after auth to authentify before to post
sauceRouter.put('/:id', authMiddleware, sauceCtrl.modifySauce);
sauceRouter.delete('/:id', authMiddleware, sauceCtrl.deleteSauce);
sauceRouter.get('/:id', authMiddleware, sauceCtrl.getOneSauce);
sauceRouter.get('/', authMiddleware, sauceCtrl.getAllSauces);

// EXPORT router module
module.exports = sauceRouter;