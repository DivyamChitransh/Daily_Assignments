const express = require('express');
const mongoose = require('mongoose');

const taskroutes = require('./routes/Taskroutes.js');
const PORT = 4000;
const app = express();
app.use(express.json());
mongoose.connect('mongodb://localhost:27017/MasaiDB').then(() => console.log('Database Connected!')).catch(err => console.log('Unable to connect db',err))

app.use('/',taskroutes);

app.listen(PORT,() => {
    console.log(`Server Running at ${PORT}`)
});