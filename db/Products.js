const mongo = require('mongoose'); 
const slugify = require('slugify'); 
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
    slugtest: {
        type:String
    },
    year: Number,
    createdAt: {
        type: Date,
        default: Date.now()     
    },
}); 

// Will runs ony when .save or .create trigger not for insertMany
schema.pre('save',function(next){
    this.slugtest= slugify(this.name, {lower:true})
    next();
});

// To Not Find All Document Matching this Condition
// schema.pre(/^find/,function(next){
//     this.find({year : {$ne:'2023'}})
//     next();
// });


module.exports = mongo.model('products', schema);