const Products  = require("../db/Products");
const jwt = require('jsonwebtoken');
const JWT_SECRET = process && process.env.SECRET_ACCESS;

const addproducts = async (req, res)=>{
    try {
        const decodedToken = jwt.verify(req.headers.authorization.split(' ')[1], JWT_SECRET);
        const { name, description, price, category, thumb } = req.body;
        const product = new Products({
            name : name,
            description : description,
            price : price,
            category : category,
            thumb : thumb,
            user_by : decodedToken.user.username,
        });
        const result = await product.save();
        if(result){ 
            res.send({ status:true, data:req.body });
        } else {  
            res.send({status:false}); 
        } 
    } catch(_err){ 
        res.send({ status:false, error:errors });
    } 
   
};

const listProducts = async (req, res)=>{
    try {
        const decodedToken = jwt.verify(req.headers.authorization.split(' ')[1], JWT_SECRET);
        const result = await Products.find({user_by:decodedToken.user.username});
        if(result){ 
            res.json({ 
                status:true, 
                data: result
            });
        } else {  
            res.json({ 
                status:true,
                data: result
            }); 
        } 
    } catch(_err){ 
        res.json({ 
            status:false, 
            error: _err 
        });
    } 
}; 

module.exports = { addproducts, listProducts } 