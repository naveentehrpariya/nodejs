const mongo = require('mongoose');

const schema = new mongo.Schema({
    name:{type:String,require:true},
    description:String,
    price:Number,
    category:String,
    thumb:String,
    user_by:String,
});   
 
module.exports = mongo.model('products', schema);