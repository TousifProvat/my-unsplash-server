const multer = require('multer');
const path = require('path');

exports.storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(path.dirname(__dirname), '/uploads'));
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
