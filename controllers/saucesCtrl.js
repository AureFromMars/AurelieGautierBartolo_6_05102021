// Imports
const Sauce = require('../models/SauceModel');
const fs = require('fs');// File system Node module to manager files

// CRUD Controller for sauces

exports.createSauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce);
    delete sauceObject._id;
    const sauce = new Sauce({
        ...sauceObject,// Raccourci pour remplacer tous les types de champs dans Sauce.js de type title: req.body.title
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    sauce.save()// Pour enregistrer l'objet dans la base
    .then(() => res.status(201).json({ message: 'Sauce enregistrée !'}))// Callback that returns the promise
    .catch(error => res.status(400).json({ error }));// Callback error
};

exports.getAllSauces = (req, res, next) => {
    Sauce.find()
    .then((sauces) => res.status(200).json(sauces))// Callback that returns the promise
    .catch(error => res.status(400).json({ error }));// Callback error
};

exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
    .then((sauce) => res.status(200).json(sauce))// Callback that returns the promise
    .catch(error => res.status(404).json({ error }));// Callback error
};

exports.modifySauce = (req, res, next) => {
    if (res.locals.userId === req.params.userId) { // If same userId because rights allows to proprior

        const sauceObject = req.file
        ? {
            ...JSON.parse(req.body.sauce),
            imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        }
        : { ...req.body };
        console.log(sauceObject);

        // const saveOldFileName = req.file.filename;

        // if (req.file) {
        //     Sauce.findOne({ _id: req.params.id })
        //     .then(modifyImage => {
        //         const filename = modifyImage.imageUrl.split('/images/')[1];
        //         fs.unlink('images/' + filename, () => {
        //             Sauce.updateOne({ imageUrl: req.params.imageUrl })
        //             .then(() => res.status(200).json({ message: 'Image supprimée !'}))// Callback that returns the promise
        //         });
        //     })
        // };


        Sauce.updateOne(
            { _id: req.params.id },
            { ...sauceObject, _id: req.params.id}
        )
        .then(() => res.status(200).json({ message: 'Sauce modifiée !'}))
        // .catch(error => res.status(400).json({ error }));// Callback error
    } else {
        res.status(203).json({ message: 'Vous n\'avez pas les autorisations pour modifier la sauce car vous devez en être le propriétaire !'})
        .catch(error => res.status(400).json({ error }));// Callback error
    }
};

exports.deleteSauce = (req, res, next) => {
    if (res.locals.userId === req.params.userId) { // If same userId because rights allows to proprior
        // Sauce.findOne({ _id: req.params.id })
        // .then(deleteSauce => {
        //     const filename = deleteSauce.imageUrl.split('/images/')[1];
        //     fs.unlink('images/' + filename, () => {
        //         Sauce.deleteOne({ _id: req.params.id })
        //         .then(() => res.status(200).json({ message: 'Sauce supprimée !'}))// Callback that returns the promise
        //     });
        // })

        const filename = toString(req.params.imageUrl).split('/images/')[1];
        fs.unlink('images/' + filename, () => {
            Sauce.deleteOne({ _id: req.params.id })
            .then(() => res.status(200).json({ message: 'Sauce supprimée !'}))// Callback that returns the promise
            .catch(error => res.status(400).json({ error }));// Callback error
        });
        // .catch(error => res.status(400).json({ error }));// Callback error
    } else {
        res.status(203).json({ message: 'Vous n\'avez pas les autorisations pour supprimer la sauce car vous devez en être le propriétaire !'})
        .catch(error => res.status(400).json({ error }));// Callback error
    }
};