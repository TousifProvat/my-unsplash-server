const express = require('express');
const {
  getAllImages,
  uploadImage,
  deleteImage,
} = require('../controllers/image');
const multer = require('multer');
const { storage } = require('../utils/multerConfig');
const router = express.Router();

const upload = multer({ storage: storage });

const password = (req, res, next) => {
  const { password } = req.body;
  if (password !== '12345') {
    return res.status(403).json({ message: 'Invalid password' });
  }
  next();
};

router.get('/images/get', getAllImages);
router.post('/images/upload', upload.single('feedImage'), uploadImage);
router.post('/images/delete', password, deleteImage);

module.exports = router;
