const { error } = require("ajv/dist/vocabularies/applicator/dependencies");
const Products  = require("../db/Products");
const APIFeatures  = require("../lib/APIFeatures");
// const jwt = require('jsonwebtoken');
// const JWT_SECRET = process && process.env.SECRET_ACCESS;


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
                error:product
            }); 
        } 
    } catch(err){ 
        console.log(err);
        res.send({ 
            status:false, 
            error:err 
        });
    } 
};

const listProducts = async (req, res)=>{
    try {
        const feature = new APIFeatures(Products.find(), req.query).filter().sort().limit_fields().paginate();
        const data = await feature.query;
        if(data){ 
            res.json({ 
                status:true, 
                data: data
            });
        } else {  
            res.json({ 
                status:true,
                data: data
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

const tour_stats = async (req, res)=>{
    try {
        const stats = await Products.aggregate([
            {
                $match: {
                    price : { $gte:2000}
                }
            },
            {
                $group: {
                     _id: null,
                     averagePrice: { $avg: '$price'},
                     minRating: { $min: '$rating'},
                     maxRating: { $max: '$rating'},
                     avarageRating: { $avg: '$rating'},
                }
            }
        ]);
        if(stats){
            res.json({ 
                status:true, 
                data: stats
            });
        }
    } catch(_err){ 
        res.json({ 
            status:false, 
            error: _err 
        });
    } 
}; 



module.exports = { addproducts, listProducts, productDetail, tour_stats } 