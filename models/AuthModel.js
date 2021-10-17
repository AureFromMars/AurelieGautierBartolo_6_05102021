// Import Mongoose
const mongoose = require('mongoose');

// Import mongoose-unique-validator
const uniqueValidator = require('mongoose-unique-validator')

const authSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

// Avoid double email to add in DB
authSchema.plugin(uniqueValidator);

// EXPORT authentification schema
module.exports = mongoose.model('AuthModel', authSchema);