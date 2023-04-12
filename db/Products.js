const mongo = require('mongoose');
const schema = new mongo.Schema({
    name:{ 
        type:String,
        require:true
    },
    description:String,
    price:Number,
    category:String,
    thumb:String,
    createdAt: {
        type: Date,
        default: Date.now(),
        select: false
    },
});   
module.exports = mongo.model('products', schema);