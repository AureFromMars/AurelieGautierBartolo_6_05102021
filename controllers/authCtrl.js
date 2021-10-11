// Import of DB model
const Auth = require('../models/AuthModel');

// Import of Bcrypt package and set salt to hash password
const bcrypt = require('bcrypt');
const saltRounds = 10;// Allows to complexify encrypt executing 10 times the hashing algorithm

// Import of Crypto-js package to encrypt email
const cryptoJs = require('crypto-js');

// Import jsonwebtoken package to create a token ????????????????????????????????????????????????????


// Register a new user in the DB
exports.register = (req, res, next) => {

    // Encryption of the email
    const encryptEmail = cryptoJs.HmacSHA256(req.body.email, process.env.EMAIL_ENCRYPT_KEY).toString();

    // Hash du password to encrypt with SHA 512 Bit... allows to compare 2 files that should be the same if not corrupted
    bcrypt.hash(req.body.password, saltRounds)
    .then((hash) => {// Callback that returns the promise
        const User = new Auth({
            email: encryptEmail,
            password: hash
        })
        User.save() // Return a promise
        .then(() => res.status(201).json({ message: 'Utilisateur enregistré !'}))// Callback that returns the promise
        .catch(error => res.status(400).json({ error }));// Callback

        console.log(User);
    })
    .catch(error => res.status(400).json({ error }));// Callback
};

// EXPORT login authentification // A FAIRE ############################################################################
exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email })
    .then(user => {
        if (!user) {
        return res.status(401).json({ error: 'Utilisateur non trouvé !' });
        }
        bcrypt.compare(req.body.password, user.password)
        .then(valid => {
            if (!valid) {
                return res.status(401).json({ error: 'Mot de passe incorrect !' });
            }
            res.status(200).json({
                userId: user._id,
                token: jwt.sign(
                    { userId: user._id }, 'RANDOM_TOKEN_SECRET', { expiresIn: '24h' }
                )
            });
        })
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};