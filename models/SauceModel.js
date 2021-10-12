const mongoose = require('mongoose');

const sauceSchema = mongoose.Schema({
    _id: { type: String },// Unique value that allows to verify unique sauce
    name: { type: String, required: true, trim: true },// trim to remove white spaces before and after
    manufacturer: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    mainPepper: { type: String, required: true, trim: true },
    heat: { type: Number, required: true },
    userId: { type: String, required: true, immutable: true },// To disable userId modification
    imageId: { type: String }
});

// EXPORT sauce schema
module.exports = mongoose.model('Sauce', sauceSchema);