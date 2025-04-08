const express = require('express');
const router = express.Router();
const Submit = require('../mdels/submitform.js');

router.post('/form/:id',async(req,res) => {
    const {id} = req.params;
    const {email,age} = req.body;
    const newEntry = new Submit({id,email,age});
    await newEntry.save();
    res.status(200).json({message:'Form created',Entry:newEntry})
});

router.get('/form/:id',async(req,res) => {
    try{
        const {id} = req.params;
        const data = await Submit.find({id});
        res.status(200).json({message:'Submit Data',data})
    }
    catch(error){
        res.status(500).json({error:error.message})
    }
});

module.exports = router;
