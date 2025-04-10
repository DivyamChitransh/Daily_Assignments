const express = require('express');
const Product = require('../models/productmodels.js');

const router = express.Router();

router.post('/product',async(req,res) => {
    try{
        const {name,category,price,rating} = req.body;
        const newproduct = new Product({name,category,price,rating});
        await newproduct.save();
        res.status(201).json({message:'New Product added!',product:newproduct})
    }
    catch(error){
        res.status(500).json({error:error.message})
    }
});

router.get('/products', async (req, res) => {
    try {
        const { page = 1, limit = 10, sort, category, minprice, maxprice, rating } = req.query;
        const filter = {};
        if (category) {
            filter.category = category;
        }
        if (rating) {
            filter.rating = { $gte: Number(rating) };
        }
        if (minprice || maxprice) {
            filter.price = {};
            if (minprice) filter.price.$gte = Number(minprice);
            if (maxprice) filter.price.$lte = Number(maxprice);
        }
        let sortOption = {};
        if (sort) {
            const order = sort.startsWith('-') ? -1 : 1;
            const field = sort.startsWith('-') ? sort.substring(1) : sort;
            sortOption[field] = order;
        }
        const products = await Product.find(filter)
            .sort(sortOption)
            .skip((page - 1) * limit)
            .limit(Number(limit));
        const total = await Product.countDocuments(filter);
        res.status(200).json({
            message: 'List of products!',
            total,
            page: Number(page),
            limit: Number(limit),
            products,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;