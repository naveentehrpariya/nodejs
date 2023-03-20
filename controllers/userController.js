const { User, validate } = require('../db/Users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SECRET_ACCESS = process.env && process.env.SECRET_ACCESS;
const asyncHandle = require('express-async-handler');

const signup = async (req, res) =>{
    const { name, email, username, password } = req.body
    const isValid = validate(req.body);
    if (!isValid) { 
        const errors = validate.errors.map(error => {
          return {
            status:false,
            error: error
        } ;
        });
        console.log(errors);
      }  
    try { 
        // Check username exists or not
        const exists_username = await User.findOne({username:username})
        const exists_email = await User.findOne({email:email})
        if(exists_username){
           return res.send({ 
                'status':418,
                'msg':"Username already exists."
            });
        }
        if(exists_email){
            return res.send({
                'status':418,
                'msg':"Email already exists."
            });
        }

        // encrypt password values
        const hash_pass = await bcrypt.hash(password, 10);

        const result = await User.create({
            name:name,
            email:email,
            password:hash_pass,
            username:username
        });

        // JWt Token
        const token = jwt.sign({email:result.email}, SECRET_ACCESS);
        res.send({
            status:true,
            user:result,
            token:token,
            msg:"Signup Successfully"
        });
    } catch (_err) { 
        console.log(_err);
        res.send({
            status:false,
            errors:_err,
            msg:"Something went wrong!!"
        });
    }
}; 
 
const login = async (req, res)=>{
    const { username, password } = req.body;
    try {
        const exists = await User.findOne({username:username});
        if(!exists){
            return res.send({
                status:false,
                msg:'404, user not found !!'
            });
        } 
        const match_pass = await bcrypt.compare(password, exists.password);
        if(!match_pass){
            res.send({
                status:false,
                msg:'Invalid Credentials !!'    
            });
        }  
        const token = jwt.sign({email:exists.email }, SECRET_ACCESS);
        res.send({
            status:true,
            user:exists,
            token:token,
            msg:"Login Successfully"
        });
    } catch(err){ 
        console.log(err);
    }
   
}

const user = asyncHandle( async (req, res) => {
    res.json(req.user); 
});

module.exports = { login, signup, user }
