const express = require('express');
const cors = require('cors');
const app = express();
require('./db/config');
app.use(express.json());
app.use(cors());
const User = require('./db/Users'); 

app.get('/check', (req, res)=>{
   res.send("STATUS - ACTIVE");  
});

app.post('/signup', async (req, res)=>{
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
});

app.post('/login', async (req, res)=>{
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
});

app.listen(5000, ()=>{console.log("===> SERVER RUNNINGGGGG")});