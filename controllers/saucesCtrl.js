// Imports
const Sauce = require('../models/SauceModel');
const fs = require('fs');// File system Node module to manager files
const User = require('../models/AuthModel');// Authentification model// DELETE ????????????????????????????????????????????????????????????????????????????????

// CRUD Controllers = CREATE, READ, UPDATE, DELETE // Controllers for sauces

exports.createSauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce);
    delete sauceObject._id;
    const sauce = new Sauce({
        ...sauceObject,// Shortcup to replace all fields in Sauce.js like title: req.body.title
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    sauce.save()// Save object in database
    .then(() => res.status(201).json({ message: "Sauce enregistrée !"}))// Callback that returns the promise
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
    const sauceObject = req.file ? {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };

    if (req.file) {
        Sauce.findOne({ _id: req.params.id})
        .then(sauce => {
            const filename = sauce.imageUrl.split('/images/')[1];
            fs.unlink('images/' + filename, () => {
                Sauce.updateOne(// .save included in mongoose to persist datas
                    { _id: req.params.id },
                    { ...sauceObject, _id: req.params.id, imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}` }
                )
                .then(() => res.status(200).json({ message: "Sauce modifiée !"}))
                .catch(error => res.status(400).json({ error }));// Callback error
                console.log("Image supprimée !")
            })
        })
        .catch(error => res.status(400).json({ error }));
    } else {
        Sauce.updateOne(// Use "await" to avoid double function with above
            { _id: req.params.id },
            { ...sauceObject, _id: req.params.id }
        )
        .then(() => res.status(200).json({ message: "Sauce modifiée !"}))
        .catch(error => res.status(400).json({ error }));// Callback error
    };
};

exports.likingSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
    .then (sauce => {
        const likingDatas = {
            usersLiked: sauce.usersLiked,
            usersDisliked: sauce.usersDisliked,
            likes: sauce.likes,
            dislikes: sauce.dislikes
        };
        switch (req.body.like) {
            case -1 :// Dislike case
                if (likingDatas.usersLiked.includes(req.body.userId)) {
                    const indexUsersLiked = likingDatas.usersLiked.indexOf(req.body.userId);
                    likingDatas.usersLiked.splice(indexUsersLiked, 1)
                };
                if (!likingDatas.usersDisliked.includes(req.body.userId)) {// To protect multiple dislike
                    likingDatas.usersDisliked.push(req.body.userId);
                };
                console.log("Dislike");
                break;
            case 1 :// Like case
                if (likingDatas.usersDisliked.includes(req.body.userId)) {
                    const indexUsersDisliked = likingDatas.usersDisliked.indexOf(req.body.userId);
                    likingDatas.usersDisliked.splice(indexUsersDisliked, 1);
                };
                if (!likingDatas.usersLiked.includes(req.body.userId)) {// To protect multiple dislike
                    likingDatas.usersLiked.push(req.body.userId);
                };
                console.log("Like");
                break;
            case 0 :// Set default value (0) like/dislike from user
                if (likingDatas.usersLiked.includes(req.body.userId)) {
                    const indexUsersLiked = likingDatas.usersLiked.indexOf(req.body.userId);
                    likingDatas.usersLiked.splice(indexUsersLiked, 1);
                } else if (likingDatas.usersDisliked.includes(req.body.userId)) {
                    const indexUsersDisliked = likingDatas.usersDisliked.indexOf(req.body.userId);
                    likingDatas.usersDisliked.splice(indexUsersDisliked, 1);
                };
                console.log(0);
            default :
                console.log("default");
        };
        // Get number of likes and dislikes
        likingDatas.likes = likingDatas.usersLiked.length;
        likingDatas.dislikes = likingDatas.usersDisliked.length;

        Sauce.updateOne({ _id: req.params.id }, likingDatas )
        .then(() => res.status(200).json({ message: "Like/Dislike ajouté/modifié !" }))
        .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(400).json({ error }));
};

exports.deleteSauce = (req, res, next) => {
    if (res.locals.userId === req.params.userId) {// If same userId because rights allows to proprior
        Sauce.findOne({ _id: req.params.id})
        .then(sauce => {
            const filename = sauce.imageUrl.split('/images/')[1];
            console.log("filename : " + filename);
            fs.unlink('images/' + filename, () => {
                Sauce.deleteOne({ _id: req.params.id })
                .then(() => res.status(200).json({ message: "Sauce supprimée !"}))// Callback that returns the promise
                .catch(error => res.status(400).json({ error }));// Callback error
            });
        })
        .catch(error => res.status(400).json({ error }));
    } else {
        res.status(203).json({ message: "Vous n\'avez pas les autorisations pour supprimer la sauce car vous devez en être le propriétaire !"})
        .catch(error => res.status(400).json({ error }));// Callback error
    }
};