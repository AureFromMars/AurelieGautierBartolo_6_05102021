/// Import Express
const express = require('express');
const registerRouter = express.Router();// Create a new router object of the middleware

// Import authCtrl.js
const authCtrl = require('../controllers/authCtrl');

// Import password.js Middleware
const password = require('../middleware/password');






// Route register ENDPOINT
registerRouter.post('/register', password, authCtrl.register);

// Route login ENDPOINT
registerRouter.post('/login', authCtrl.login);

// EXPORT app module
module.exports = registerRouter;