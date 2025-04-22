const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');

dotenv.config();
const app = express();

const uploadRoute = require('./routes/upload');

const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

app.use('/uploads', express.static(uploadDir, {
  immutable: true,
  maxAge: '1d'
}));

app.use('/api', uploadRoute);

const PORT = process.env.PORT || 4040;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
