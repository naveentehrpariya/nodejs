const Products  = require("../db/Products");
const jwt = require('jsonwebtoken');
const JWT_SECRET = process && process.env.SECRET_ACCESS;

const addproducts = async (req, res)=>{
    try {
        // const decodedToken = jwt.verify(req.headers.authorization.split(' ')[1], JWT_SECRET);
        // decodedToken.user.username

        const updated = Object.assign( {user_id:5}, req.body );
        const product = await Products.create(updated);
        if(product){ 
            res.status(200).json({ 
                status:true, 
                data:product 
            });
        } else {  
            res.status(400).json({
                status:false
            }); 
        } 
    } catch(_err){ 
        res.send({ 
            status:false, 
            error:_err 
        });
    } 
   
};

const listProducts = async (req, res)=>{
    try {

        // const decodedToken = jwt.verify(req.headers.authorization.split(' ')[1], JWT_SECRET);
        // {user_by:decodedToken.user.username}
        // const { price } = req.query;
        // console.log(query);

        const QueryObject  = {...req.query}
        const excludeQueries = ['page', 'sort', 'limit', 'fields']
        excludeQueries.forEach(el => delete QueryObject[el]);

        const result = await Products.find(req.query)
        // .where("price").equals(90000);
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
        console.log(_err);
        res.json({ 
            status:false, 
            error: _err 
        });
    } 
}; 


const productDetail = async (req, res)=>{
    try {
        const id = req.params;
        res.json({ 
            status:true, 
            data: id
        });
        // const result = await Products.find();
        // if(result){ 
        //     res.json({ 
        //         status:true, 
        //         data: id
        //     });
        // } else {  
        //     res.json({ 
        //         status:true,
        //         data: id
        //     }); 
        // } 
    } catch(_err){ 
        res.json({ 
            status:false, 
            error: _err 
        });
    } 
}; 

module.exports = { addproducts, listProducts, productDetail } 