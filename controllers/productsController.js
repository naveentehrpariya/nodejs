const Products  = require("../db/Products");
const jwt = require('jsonwebtoken');
const JWT_SECRET = process && process.env.SECRET_ACCESS;


class APIFeatures { 
    constructor(query, queryString){ 
        this.query = query;
        this.queryString = queryString;
    }

    filter(){ 
        const QueryObject  = {...this.queryString}

        // REMOVE SORTING PAREMETER FROM QUERY
        const excludeQueries = ['page', 'sort', 'limit', 'fields']
        excludeQueries.forEach(el => delete QueryObject[el]);

        // ORDER BY 
        let querySting = JSON.stringify(QueryObject);
        querySting = querySting.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);

        // JSON.parse(querySting)
        this.query.find(JSON.parse(querySting));
        return this;
    }
}



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

        // const QueryObject  = {...req.query}

        // // REMOVE SORTING PAREMETER FROM QUERY
        // const excludeQueries = ['page', 'sort', 'limit', 'fields']
        // excludeQueries.forEach(el => delete QueryObject[el]);

        // // ORDER BY 
        // let querySting = JSON.stringify(QueryObject);
        // querySting = querySting.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);

        // // JSON.parse(querySting)
        let query = Products.find(JSON.parse(querySting));
        // console.log("query", req.query);
        

        // SORTING
        if(req.query.sort){
           query = query.sort(req.query.sort);
        }

        // SELECT DISIRED FIELDS
        if(req.query.fields){
            const q = req.query.fields.split(',').join(' ');
            query = query.select({q});
        }

        // PAGINATION 
        const page = req.query.page *1;
        const limit = req.query.limit * 1 || 2;
        const skip = (page - 1) * limit;
        query.skip(skip).limit(limit);

        const feature = new APIFeatures(Products.find(), req.query).filter();
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

module.exports = { addproducts, listProducts, productDetail } 