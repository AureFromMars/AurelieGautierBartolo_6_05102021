// MULTER is an Express package that allows to capture files in server Middleware Upload
const express = require('express')

// Import multer
const multer = require('multer');// Able to manage multipart/form-data

// Types of extensions files
const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'
};

// Multer storage config
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'images')// Folder's destination for uploaded images
    },
    filename: (req, file, callback) => {
        const name = file.originalname.split(' ').join('_'); // Replace spaces with _ // Create a table with filenames
        const extension = MIME_TYPES[file.mimetype];// Apply extension to files uploaded by frontend
        callback(null, Date.now() + name) // null to verify if there's errors + name + precise timestamp to make an unique filename
    }// In ideal case, use sauce_name + sauce_id for the the filename
});

// EXPORT multer-config module for unique image
module.exports = multer({ storage: storage }).single('image');