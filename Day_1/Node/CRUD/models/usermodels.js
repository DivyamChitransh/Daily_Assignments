const mongoose = require('mongoose');
const todoSchema =  new mongoose.Schema({
    title : {type:String,required:true},
    DateAssigned: {type:Date,default:Date.now(),required:true},
    EndTime: {type:Date,required:true}
});

module.exports = mongoose.model('TODO',todoSchema)