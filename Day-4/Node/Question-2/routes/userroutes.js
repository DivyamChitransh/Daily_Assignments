const express = require('express');
const User = require('../models/usermodels.js');
const Post = require('../models/postmodels.js');
const Comments = require('../models/commentmodel.js');

const router = express.Router();

router.post('/user',async(req,res) => {
    try{
        const {name,email} = req.body;
        const newUser = new User({name,email});
        await newUser.save();
        res.status(201).json({message:'New user created!',newUser})
    }
    catch(error){
        res.status(500).json({error:error.message})
    }
});

router.post('/blog',async(req,res) => {
    try{
        const {title,content,author} = req.body;
        const newPost = new Post({title,content,author});
        await newPost.save();
        res.status(201).json({message:'New post created!',newPost})
    }
    catch(error){
        res.status(500).json({error:error.message})
    }
});

router.get('/blogs',async(req,res) => {
    try{
        const posts = await Post.find().populate('author','name email');
        if(!posts){
            return res.status(404).json({message:'No posts found!'})
        }
        res.status(200).json({message:'All blog posts',posts})
    }catch(error){
        res.status(500).json({error:error.message});
    }
});

router.post('/comment', async(req,res) => {
    try{
        const {text,author,post} = req.body;
        const newComment = new Comments({text,author,post});
        await newComment.save();
        res.status(201).json({message:'New Comment Added!',newComment});
    }
    catch(error){
        res.status(500).json({error:error.message})
    }
});

router.get('/comments',async(req,res) => {
    try{
        const comments = await Comments.find().populate('author','name');
        if(!comments){
            res.status(404).json({message:'No Comments Found!'})
        }
        res.status(200).json({message:'All Comments!',comments})
    }
    catch(error){
        res.status(500).json({error:error.message})
    }
});

module.exports = router;