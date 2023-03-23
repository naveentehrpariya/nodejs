const { Products, validate } = require("../db/Products");
const jwt = require('jsonwebtoken');
const JWT_SECRET = process && process.env.SECRET_ACCESS;

const addproducts = async (req, res)=>{
    const isValid = validate(req.body);
    if (!isValid) { 
        validate.errors.map(error => {
            return {
                status:false,
                error: error
            };
        });
    }  
    try {
        const { name, description, price, category, thumb } = req.body;

        const decodedToken = jwt.verify(req.headers.authorization.split(' ')[1], JWT_SECRET);
       
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
            res.send({ 
                status:true, 
                data: result
            });
        } else {  
            res.send({ 
                status:false,
                msg:"no results found !!"
            }); 
        } 
    } catch(_err){ 
        res.send({ 
            status:false, 
            error: _err 
        });
    } 
}; 

module.exports = { addproducts, listProducts } 