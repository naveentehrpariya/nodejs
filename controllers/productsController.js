const Products = require("../db/Products");

const addproducts = async (req, res)=>{
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
};



module.exports = { addproducts } 