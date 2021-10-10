const express = require('express');// UTILE ?????????????????????????????????????

/*********** MongoDb Atlas : agautierbartolo - M0ngodb */
const mongoose = require('mongoose');
const uri = `${process.env.DB_PROTO}://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_CLUSTER}.${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority`;
mongoose.connect( uri,
    { useNewUrlParser: true,
    useUnifiedTopology: true })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !')
);

// EXPORT mongoose DB module
module.exports = mongoose;