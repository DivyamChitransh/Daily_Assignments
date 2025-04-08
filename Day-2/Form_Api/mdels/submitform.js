const mongoose = require('mongoose');
const formSchema = new mongoose.Schema({
    email:{type:String,requied:true},
    age:{type:Number,required:true}
});

module.exports = mongoose.model('Submit',formSchema)