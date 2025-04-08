const express = require('express');
const mongoose = require('mongoose');
const formroutes = require('./Routes/formroutes.js')
const submitformroutes = require('./Routes/submitformroutes.js')
const app = express();

app.use(express.json());

mongoose.connect('mongodb://localhost:27017/TD').then(console.log('Database Connected!')).catch(err => console.log('Unable to connect db!',err))


app.use('/',formroutes);
app.use('/',submitformroutes)

const PORT = 3000;

app.listen(PORT,() => {
    console.log(`Server Running at ${PORT}`)
});

