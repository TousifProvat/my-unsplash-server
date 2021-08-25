const express = require('express');
const { getAllImages, uploadImage } = require('../controllers/image');
const multer = require('multer');
const { storage } = require('../utils/multerConfig');
const router = express.Router();

const upload = multer({ storage: storage });

router.get('/images/get', getAllImages);
router.post('/images/upload', upload.single('feedImage'), uploadImage);

module.exports = router;
