const mongoose = require('mongoose');

const postschema = new mongoose.Schema({
    title:String,
    content:String,
    author:{type:mongoose.Schema.Types.ObjectId,ref:'User'}
});

module.exports = mongoose.model('Post',postschema)