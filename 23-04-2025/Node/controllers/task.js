const Task = require('../models/todomodel.js');

const addTask = async(req,res) => {
    try{
    const {title,duration,status} = req.body;
    if(!title || !duration,status){
        return res.status(404).json({message:'No Title or Duration given!'});
    }
    const addNewTask = new Task({title,duration,status});
    await addNewTask.save();

    res.status(200).json({message:'New task added!',addNewTask});
}
catch(error){
    res.status(500).json({error:error.message})
}
}

const getalltask = async(req,res) => {
    try{
        const tasks = await Task.find();
        res.status(200).json({message:'All tasks!',tasks})
    }
    catch(error){
        res.status(500).json({error:error.message})
    }
}

const updatetask = async(req,res) => {
    try{
        const {id} = req.params;
        const {status} = req.body;
        const updatedtask = await Task.findByIdAndUpdate(id,{status},{new:true});
        res.status(200).json({message:'Updated Task',updatedtask})
    }
    catch(error){
        res.status(500).json({error:error.message})
    }
}


module.exports = {addTask,getalltask,updatetask};