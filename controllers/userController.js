const User  = require('../db/Users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SECRET_ACCESS = process.env && process.env.SECRET_ACCESS;
const asyncHandle = require('express-async-handler');
const Joi = require('joi'); 

const signup = async (req, res) =>{

    const UserValidate = Joi.object({
        name: Joi.string().required(),
        username: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required(),
    });
    const { error, value } = UserValidate.validate(req.body, {abortEarly: false});

    if (error) {
      return res.send({
        status:false,
        error : error
      });
    }  

    const { name, email, username, password } = req.body;

    try { 
        // Check Username Exists
        const exists_username = await User.findOne({username:username})
        const exists_email = await User.findOne({email:email})
        if(exists_username){
            return res.status(418).json({
               status:false,
               message:'Username Already Taken!!',
            });
        }
        if(exists_email){
            return res.status(418).json({
                status:false,
                message:'Email Already Taken!!',
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

        res.send({
            status:true,
            user:result,
            msg:"Signup Successfully"
        });
    } catch (_err) { 
        console.log(_err);
        return res.json({
            status:false,
            message:'Username Already Taken!!',
            error:_err
        });
    }
}; 
 
const login = async (req, res)=>{

    const UserValidate = Joi.object({
        username: Joi.string().required(),
        password: Joi.string().required(),
    });

    const { error, value } = UserValidate.validate(req.body, {abortEarly: false});
    if (error) {
        return res.json({
          status:false,
          error :error
        });
    } 

    const { username, password } = req.body;

    try {
        const exists = await User.findOne({username:username});
        if(!exists){
            return res.status(403).json({
                status:false,
                msg:'User Not Found !!'
            });
        } 
        const match_pass = bcrypt.compare(password, exists.password);
        if(!match_pass){
            return res.status(403).json({
                status:false,
                msg:'Invalid Details'
            });
        }  
        const token = jwt.sign(
            {user:exists}, 
            SECRET_ACCESS, 
            { expiresIn: "58m" }
        ); 
        res.status(200).json({
            status:true,
            msg:"Login Successfully",
            user:exists, 
            token:token
        });
    } catch(err){ 
        console.log(err); 
    }
   
} 

const current_user = asyncHandle( async (req, res) => {
    res.json(req.user);  
}); 

module.exports = { login, signup, current_user }
