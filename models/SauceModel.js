const mongoose = require('mongoose');

const sauceSchema = mongoose.Schema({
    name: { type: String, required: true },
    manufacturer: { type: String, required: true },
    description: { type: String, required: true },
    mainPepper: { type: String, required: true },
    heat: { type: String, required: true }
});

// EXPORT sauce schema
module.exports = mongoose.model('Sauce', sauceSchema);