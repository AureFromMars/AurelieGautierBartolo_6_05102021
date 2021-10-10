// Import of DB model
const Auth = require('../models/AuthModel');

// Import of Bcrypt package and set salt to hash password
const bcrypt = require('bcrypt');
const saltRounds = 10;// Allows to complexify encrypt executing 10 times the hashing algorithm

// Import of Crypto-js package to encrypt email
const cryptoJs = require('crypto-js');

// Register a new user in the DB
exports.register = (req, res, next) => {

    // Encryption of the email
    const encryptEmail = cryptoJs.HmacSHA256(req.body.email, process.env.EMAIL_ENCRYPT_KEY).toString();

    // Hash du password to encrypt with SHA 512 Bit... allows to compare 2 files that should be the same if not corrupted
    bcrypt.hash(req.body.password, saltRounds)
    .then((hash) => {// Callback that returns the promise
        const addUser = new Auth({
            email: encryptEmail,
            password: hash
        })
        addUser.save() // Return a promise
        .then(() => res.status(201).json({ message: 'Utilisateur enregistré !'}))// Callback that returns the promise
        .catch(error => res.status(400).json({ error }));// Callback

        console.log(addUser);
    })
    .catch(error => res.status(400).json({ error }));// Callback
};

// EXPORT login authentification
exports.login = (req, res, next) => {
    
};