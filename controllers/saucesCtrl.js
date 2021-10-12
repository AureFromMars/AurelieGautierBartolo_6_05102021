const Sauce = require('../models/SauceModel');

// CRUD Controller for sauces

exports.createSauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce);
    delete sauceObject._id;
    const sauce = new Sauce({
        ...sauceObject,// Raccourci pour remplacer tous les types de champs dans Thing.js de type title: req.body.title
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    sauce.save()// Pour enregistrer l'objet dans la base
    .then(() => res.status(201).json({ message: 'Sauce enregistrée !'}))// Callback that returns the promise
    .catch(error => res.status(400).json({ error }));// Callback error
};

exports.modifySauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce);
    if (req.file) {
        sauceObject = {
            imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        };
    } else {
        sauceObject = { ...req.body };
    }
    console.log(sauceObject.userId);
    if (res.locals.userId === sauceObject.userId) {
        Sauce.updateOne(
            { _id: req.params.id, userId: req.body.userId },
            { ...sauceObject, _id: req.params.id}
        )
        .then(() => res.status(200).json({ message: 'Sauce modifée !'}))// Callback that returns the promise
        .catch(error => res.status(400).json({ error }));// Callback error
    } else {
        res.status(203).json({ mesage: 'Vous n\'avez pas les autorisations pour modifier une sauce'})
        .catch(error => res.status(400).json({ error }));// Callback error
    }
};

exports.deleteSauce = (req, res, next) => {
    console.log(req.body)
    const sauceObject = JSON.parse(req.body.sauce);
    Sauce.deleteOne(
        { _id: req.params.id, userId: req.body.userId },
        { ...sauceObject, _id: req.params.id}
    )
    .then(() => res.status(200).json({ message: 'Sauce supprimée !'}))// Callback that returns the promise
    .catch(error => res.status(400).json({ error }));// Callback error
};

exports.getOneSauce = (req, res, next) => {
    console.log(req.body)
    const sauceObject = JSON.parse(req.body.sauce);
    Sauce.findOne(
        { _id: req.params.id},
        {...sauceObject, _id: req.params.id}
    )
    .then(() => res.status(200).json({ message: 'Sauce récupérée :' + sauce}))// Callback that returns the promise
    .catch(error => res.status(404).json({ error }));// Callback error
};

exports.getAllSauces = (req, res, next) => {
    console.log(req.body)
    Sauce.find()
    .then((sauces) => res.status(200).json({ message: 'Sauces récupérées :' + sauces}))// Callback that returns the promise
    .catch(error => res.status(400).json({ error }));// Callback error
};