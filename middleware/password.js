// Import passwordValidator
const passwordValidator = require('password-validator');

// Récupéraion du PasswordModel
// const passwordSchema = require('../models/PasswordModel');

const passwordSchema = new passwordValidator();

passwordSchema
.is().min(8)                                    // Minimum length 8
.is().max(100)                                  // Maximum length 100
.has().uppercase()                              // Must have uppercase letters
.has().lowercase()                              // Must have lowercase letters
.has().digits(2)                                // Must have at least 2 digits
.has().not().spaces()                           // Should not have spaces
// .is().not().oneOf(['Passw0rd', 'Password123']); // Blacklist these values

// Translate in French ?????????????????????????????????????????????????????????????????
// Récupérer la list true de validate en bas et retraduire + indiquer les valeurs obligatoires

// Verify password regarding to passwordSchema


// EXPORT password schema module
module.exports = (req, res, next) => {
    if(passwordSchema.validate(req.body.password)){
        next();
    } else {
        return res.status(400).json({
            error : `Merci de choisir un mot de passe plus fort car il doit contenir : ${passwordSchema.validate(req.body.password, { list: true})} `
        });
    }
};