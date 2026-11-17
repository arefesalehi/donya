const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const multer = require('multer');
const uploadDir = require('./uploadDir');

module.exports = multer.diskStorage({
  destination: (req, file, cb) => {
    fs.mkdir(uploadDir, { recursive: true }, (error) => cb(error, uploadDir));
  },
  filename: (req, file, cb) => {
    const sha256 = crypto.createHash('SHA256');
    const hashedFileName = sha256.update(file.originalname).digest('hex');
    cb(null, hashedFileName + path.extname(file.originalname));
  },
});
