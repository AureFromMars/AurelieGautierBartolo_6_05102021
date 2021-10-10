// MULTER is an Express package that allows to capture files in server Middleware Upload

// Import multer
const multer = require('multer');// capable de gérer le multipart/form-data

// Types of extensions files
const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'
};

// Multer storage config
const storage = multer.diskStorage({
    destination: (req, res, callback) => {
        callback(null, '../images')// Folder
    },
    filename: (req, res, callback) => {
        const name = file.originalname.split('').join('_'); // Replace spaces with _ // Create a table with filenames
        const extension = MIME_TYPES[file.mimetype];// Apply extension to files uploaded by frontend
        callback(null, name + Date.now() + '.' + extension) // null to verify if there's errors + name + precise timestamp to make an unique filename
    }
});

// LAISSER ICI ????????????????????????????????????????
// const fileSize = multer({
//     limits: {
//         fileSize: 4 * 649 * 486,
//     }
// });

// EXPORT multer-config module for unique image
module.exports = multer({ storage }).single('image');