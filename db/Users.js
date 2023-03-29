const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    name: {
        type:String, 
        require:true
    },
    username: {
        type:String, 
        require:true,
    },
    email: {
        type:String,
        require:true
    },
    password: {
        type:String,
        require:true
    },
});

const User = mongoose.model('users', schema);

module.exports = User;

 