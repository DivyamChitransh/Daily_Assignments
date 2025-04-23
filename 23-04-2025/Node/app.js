const express = require('express');
const mongoose = require('mongoose');
const rateLimit = require('express-rate-limit');


const taskroutes = require('./routes/Taskroutes.js');
const PORT = 4000;
const app = express();
app.use(express.json());
mongoose.connect('mongodb://localhost:27017/MasaiDB').then(() => console.log('Database Connected!')).catch(err => console.log('Unable to connect db',err))

const limiter = rateLimit({
    windowMs: 10 * 60 * 1000,
    max: 60,
  });
  app.use(limiter);

app.use('/',taskroutes);



app.listen(PORT,() => {
    console.log(`Server Running at ${PORT}`)
});