const User = require('../db/Users');

const signup = async (req, res) =>{
    const user = new User(req.body); 
    const result = await user.save();
    if(result){
        res.send({ 
            status:true,   
            data:result
        });
    } else { 
        res.send({
            status:false
        });
    }
};


const login = async (req, res)=>{
    const user = await User.findOne(req.body).select("-password");
    if(user){
        res.send({
            user:user, 
            status:true, 
            msg:"login Successfully" 
        }); 
    } 
    else { 
        res.send({
            status:false,
            msg:"Invalid login details !!"
        });
    }
}

module.exports = { login, signup }
