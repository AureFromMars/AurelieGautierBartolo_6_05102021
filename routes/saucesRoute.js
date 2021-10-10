const express = require('express');
const sauceRouter = express.Router();

// Import sauceCtrl
const sauceCtrl = require('../controllers/saucesCtrl');

// // Import authCtrl
const authCtrl = require('../controllers/authCtrl');

// Import registerRouter
// const registerRouter = require('./registerRoute');

// Import Multer Middleware
const multer = require('../middleware/multer-config')

// CRUD ENDPOINT
sauceRouter.post('/', authCtrl, multer, sauceCtrl.createSauce);// Multer after auth to authentify before to post
sauceRouter.put('/:id', authCtrl, sauceCtrl.modifySauce);
sauceRouter.delete('/:id', authCtrl, sauceCtrl.deleteSauce);
sauceRouter.get('/:id', authCtrl, sauceCtrl.getOneSauce);
sauceRouter.get('/', authCtrl, sauceCtrl.getAllSauces);

// Créer une route pour l'upload de l'image
// const app = express();
// const path = require('path');

// const upload = require('../middleware/multer-config');
// const Resize = require('../uploads/Resize');

// sauceRouter.get('/', async function (req, res) {
//     console.log(req.body);
//     await res.render('new-sauce');
// });

// sauceRouter.post('/post', upload.single('image'), async function (req, res) {
//     console.log(req.body);
//     const imagePath = path.join(__dirname, '../images');// Quel path ?????????
//     const fileUpload = new Resize(imagePath);
//     if (!req.file) {
//         res.status(401).json({error: 'Merci de fournir une image !'});
//     }
//     const filename = await fileUpload.save(req.file.buffer);
//     return res.status(200).json({ name: filename });
// });

// EXPORT router module
module.exports = sauceRouter;