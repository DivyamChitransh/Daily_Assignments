const express = require('express');
const multer = require('multer');
const crypto = require('crypto');
const path = require('path');
const fs = require('fs');

const router = express.Router();
const MAX_SIZE_MB = parseInt(process.env.MAX_SIZE_MB) || 2;
const uploadDir = path.join(__dirname, '..', 'uploads');
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {const ext = path.extname(file.originalname);
    const uuid = crypto.randomUUID();
    cb(null, `${uuid}${ext}`);
  }
});

const fileFilter = (req, file, cb) => {
  const allowed = ['image/jpeg', 'image/png'];
  if (!allowed.includes(file.mimetype)) {
    return cb(new Error('Only JPEG and PNG are allowed'), false);
  }
  cb(null, true);
};
const upload = multer({storage,fileFilter,limits: { fileSize: MAX_SIZE_MB * 1024 * 1024 }});

router.post('/upload', upload.single('image'), (req, res) => {
  const fileUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
  res.json({ url: fileUrl });
});
router.use((err, req, res, next) => {
  if (err instanceof multer.MulterError || err.message) {
    return res.status(422).json({ error: err.message });
  }
  next(err);
});

router.get('/storage', (req, res) => {
  fs.readdir(uploadDir, (err, files) => {
    if (err) return res.status(500).json({ error: 'Failed to read storage' });
    let totalSize = 0;
    files.forEach(file => {const { size } = fs.statSync(path.join(uploadDir, file));
      totalSize += size;
    });
    res.json({ totalBytes: totalSize });
  });
});

module.exports = router;
