const mongoose = require('mongoose');

const fillformSchema = new mongoose.Schema({
    title:String,
    Entries:Number
});

module.exports = mongoose.model('Forms',fillformSchema);