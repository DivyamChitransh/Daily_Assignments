const express = require('express');
const router = express.Router();
const Forms = require('../mdels/createform.js');

router.post('/form',async(req,res) => {
    const {title,Entries} = req.body;
    const newForm = new Forms({title,Entries});
    await newForm.save();
    res.status(200).json({message:'Form created',form:newForm})
});

router.get('/form',async(req,res) => {
    try{
        const data = await Forms.find();
        res.status(200).json({message:'Forms Data',data})
    }
    catch(error){
        res.status(500).json({error:error.message})
    }
});

module.exports = router;
