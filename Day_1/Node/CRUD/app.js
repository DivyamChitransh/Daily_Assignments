const express = require('express');
const app = express();
const PORT = 3000;
const TODO = require('./models/usermodels.js')
const mongoose = require('mongoose');

app.use(express.json());

mongoose.connect('mongodb://localhost:27017/TD').then(console.log('Database Connected!')).catch(err => console.log('Failed to connect database',err))

app.post('/add',async(req,res) => {
    const {title,DateAssigned,EndTime} = req.body;
    const newTodo = new TODO({title,DateAssigned,EndTime});
    newTodo.save();
    res.status(200).json({message:'New Todo Assigned',todo:newTodo})
});

app.get('/get',async(req,res) => {
    const todos = await TODO.find();
    res.status(200).json({todos});
});

app.put('/update/:id',async(req,res) => {
    const {id} = req.params;
    const {title,DateAssigned,EndTime} = req.body;
    const updatedtodo = await TODO.findByIdAndUpdate(id,{title,DateAssigned,EndTime},{new:true,runValidators:true})
    res.status(200).json({message:'TODO updated!',todo:updatedtodo})

});

app.delete('/delete/:id', async(req,res) => {
    const {id} = req.params;
    const deleteTodo = await TODO.findByIdAndDelete(id);
    res.status(200).json({message:'Todo Deleted'})
})

app.listen(PORT, () => {
    console.log(`Server Running at ${PORT}`)
});


