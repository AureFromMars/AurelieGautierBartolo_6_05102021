const Sauce = require('../models/SauceModel');

// CRUD Controller for sauces

exports.createSauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce);
    delete sauceObject._id;
    const sauce = new Sauce({
        ...sauceObject,
        imageUrl: `${req.protocol}://${get('host')}/images/${req.file.filename}`// Voir si on récupère bien le host pour la prod éventuelle #################################################################
    });
    sauce.save()
    .then(() => res.status(201).json({ message: 'Sauce enregistrée !'}))// Callback that returns the promise
    .catch(error => res.status(400).json({ error }));// Callback error
};

exports.modifySauce = (req, res, next) => {
    Sauce.updateOne({ _id: req.params.id}, { ...req.body, _id: req.params.id})
    .then(() => res.status(200).json({ message: 'Sauce modifée !'}))// Callback that returns the promise
    .catch(error => res.status(400).json({ error }));// Callback error
};

exports.deleteSauce = (req, res, next) => {
    Sauce.deleteOne({ _id: req.params.id})
    .then(() => res.status(200).json({ message: 'Sauce supprimée !'}))// Callback that returns the promise
    .catch(error => res.status(400).json({ error }));// Callback error
};

exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id})
    .then(() => res.status(200).json({ message: 'Sauce récupérée !'}))// Callback that returns the promise
    .catch(error => res.status(404).json({ error }));// Callback error
};

exports.getAllSauces = (req, res, next) => {
    Sauce.find()
    .then((sauces) => res.status(200).json({ message: 'Sauces récupérées !' + sauces}))// Callback that returns the promise
    .catch(error => res.status(400).json({ error }));// Callback error
};

// module.exports = sauceCtrl;