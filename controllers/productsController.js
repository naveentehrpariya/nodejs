const {Products, validate} = require("../db/Products");

const addproducts = async (req, res)=>{
    const isValid = validate(req.body);
    if (!isValid) { 
        validate.errors.map(error => {
            return {
                status:false,
                error: error
            } ;
        });
    }  
    try {
        const product = new Products(req.body);
        const result = await product.save();
        if(result){ 
            res.send({ 
                status:true,   
                data:req.body
            });
        } else { 
            res.send({
                status:false
            }); 
        }
    } catch(_err){
        res.send({ 
            status:false,   
            error:errors
        });
    }
   
};



module.exports = { addproducts } 