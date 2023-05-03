const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');

const schema = new mongoose.Schema({
    name: {
        type:String, 
        required:true,
    },
    username: {
        required:[true, 'Please enter your name.'],
        unique:[true, 'Username is already taken.'], 
        type:String,
        minLength:5,
        maxLength:10
    },
    email: {
        type:String,
        unique:true, 
        required:[true, 'Please enter your email address.'],
        lowercase:true,
        validate: [validator.isEmail, 'Please provide a valid email address.']
    },
    avatar: {
        type:String,
        // require:[true, 'Please add your profile photo.']
    },
    password: {
        type:String,
        required:true,
        select:false
    },
    confirmPassword: {
        type:String,
        required:true,
        select:false,
        validate : {
            validator : function (val) { return val === this.password },
            message : 'Password did\'t matched.'
        }
    }
});

schema.pre('save', async function(next) { 
    if(!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 12);
    this.confirmPassword = undefined;
});

schema.methods.checkPassword = async function (pass, hash) { 
    return await bcrypt.compare(pass, hash);
}


const User = mongoose.model('users', schema);

module.exports = User;

 