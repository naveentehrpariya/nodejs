const { default: mongoose } = require('mongoose');
const mongo = require('mongoose');

const UsersSchema = new mongoose.Schema({
    name:String,
    password:String,
    email:String,
    username:String
});

module.exports = mongo.model('users', UsersSchema);