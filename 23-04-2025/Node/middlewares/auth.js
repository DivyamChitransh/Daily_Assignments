const jwt = require('jsonwebtoken');
const JWT_SECRET = '12345678';

const authenticate = async(req,res,next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader.split(' ')[1];
    try{
        const decoded = jwt.verify(token,JWT_SECRET);
        req.user = decoded;
        next();
    }
    catch(error){
        res.status(403).json({error:'Invalid token!'})
    }
};

module.exports = {authenticate}