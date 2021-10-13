/// Import Express
const express = require('express');
const authRouter = express.Router();// Create a new router object of the middleware

// Import authCtrl.js
const authCtrl = require('../controllers/authCtrl');

// Import password.js Middleware
const password = require('../middleware/password');

// Route register ENDPOINT
authRouter.post('/signup', password, authCtrl.signup);

// Route login ENDPOINT
authRouter.post('/login', authCtrl.login);

// EXPORT app module
module.exports = authRouter;