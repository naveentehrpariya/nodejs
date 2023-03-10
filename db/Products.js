const { default: mongoose } = require('mongoose');
const mongo = require('mongoose');

const schema = new mongoose.Schema({
    name:String,
    description:String,
    price:Number,
    category:String,
    thumb:String 
});  
 
module.exports = mongo.model('products', schema);