const mongoose = require('mongoose');
const Joi = require('joi');

const schema = new mongoose.Schema({
    name: {
        type:String,
        require:true,
        minLength:3
    },
    username: {
        type:String,
        require:true,
        minLength:3,
        maxLength:10
    },
    email: {
        type:String,
        require:true,
        minLength:5
    },
    password: {
        type:String,
        require:true,
        minLength:4
    },

});
const user = mongoose.model('users', schema);



function validateUser(user){ 
    const schema = Joi.object({
        name: Joi.string().min(3).required(),
        username: Joi.string().min(3).required(),
        password:Joi.string().min(4).required(8),
        email:Joi.string().email({
            minDomainSegments:2,
            tlds : { allow : ['com', 'net']}
        }),
    });
    return schema.validate(user);
}

module.exports.validate = validateUser;
module.exports.User = user;

 