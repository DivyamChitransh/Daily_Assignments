const express = require('express');
const mongoose = require('mongoose');
const rateLimit = require('express-rate-limit');
const Rate = require('./models/ratemodel.js');

const app = express();
app.use(express.json());
mongoose.connect('mongodb://127.0.0.1:27017/rateLimiterDB').then(() => console.log('MongoDB connected'));
const limiter = rateLimit({
  windowMs: 60 * 60 * 1000, 
  max: 100,
  message: { error: 'Too many requests. Please try again later.' },
  standardHeaders: true,
  legacyHeaders: false, 
});

app.use(limiter);

app.get('/', async (req, res) => {
  const ip = req.ip;
  let user = await Rate.findOne({ ip });
  if (!user) {
    user = await Rate.create({ ip, name: `User-${Math.floor(Math.random() * 10000)}` });
}
res.status(200).json({message: `Hello, ${user.name}`,ip,});
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running at ${PORT}`);
});
