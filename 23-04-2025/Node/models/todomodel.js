const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    title:{type:String,required:true},
    duration:{type:String,required:true},
    status: {type:String,required:true,enum:['Todo','In-progress','Done']}
})

module.exports = mongoose.model('Task',TaskSchema);
