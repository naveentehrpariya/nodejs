const mongoose = require('mongoose');
const Ajv = require('ajv');
const ajv = new Ajv({ allErrors:true}); 

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


const userSchema = {  
  type: 'object',
  properties: {
    name: { type: 'string', minLength: 3 },
    username: { type: 'string', minLength: 3, maxLength: 10 },
    email: { type: 'string', minLength: 5 },
    password: { type: 'string', minLength: 4 },
  },
  required: ['name', 'username', 'email', 'password'],
};
const validateUser = ajv.compile(userSchema);

module.exports.validate = validateUser;
module.exports.User = user;

 