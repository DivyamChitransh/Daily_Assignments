const express = require('express');
const mongoose = require('mongoose');

const userroutes = require('./routes/userroutes.js');

const PORT = 3000;
mongoose.connect('mongodb://localhost:27017/TD').then(console.log('Database Connected!')).catch(err => console.log('Unable to connect DB!',err))
const app = express();
app.use(express.json());

app.use('/',userroutes);

app.listen(PORT,() => {
    console.log(`Server Running at ${PORT}`)
});