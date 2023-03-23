const Ajv = require('ajv');
const ajv = new Ajv({ allErrors:true}); 
const { default: mongoose } = require('mongoose');
const mongo = require('mongoose');

const schema = new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    description:String,
    price:Number,
    category:String,
    thumb:String,
    user_by:String,
});  

const productsVals = {
    type:'object',
    properties : {
        name : { type:'string', minLength:3 },
        description : { type:'string', minLength:20 },
        price : { type:'string', minLength:2 },
        category : { type:'string', minLength:4 },
        thumb : { type:'string', minLength:10 },
        user_by : { type:'string', minLength:4 },
    }
}
const validateProduct = ajv.compile(productsVals);
 
module.exports.validate = validateProduct;
module.exports.Products = mongo.model('products', schema);