const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
    text:String,
    author:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
    post:{type:mongoose.Schema.Types.ObjectId,ref:'Post'}
});

module.exports = mongoose.model('Comments',CommentSchema);

