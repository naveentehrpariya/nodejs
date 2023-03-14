const Products = require("../db/Products");

const addproducts = async (req, res)=>{
    const { name, price, description, category, thumb } = req.body
    const result = await Products.create({
        name:name,
        price:price,
        thumb:thumb,
        category:category,
        description:description
    });
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