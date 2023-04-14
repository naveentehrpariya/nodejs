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
    rating :{type:Number},
    technology: String,
    discount:String,
    emi : String,
    slug: String,
    year: Number,
    createdAt: {
        type: Date,
        default: Date.now()
    },
});   
module.exports = mongo.model('products', schema);