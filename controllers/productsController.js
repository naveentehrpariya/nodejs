const { Products, validate } = require("../db/Products");

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
        const product = new Products(req.body);
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
        const result = await Products.find();
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
        res.send({ status:false, error: _err });
    } 
}; 

module.exports = { addproducts, listProducts } 