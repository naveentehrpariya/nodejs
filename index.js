const express = require('express');
const cors = require('cors');
const app = express();
require('./db/config');
app.use(express.json());
app.use(cors());

const Products = require('./db/Products');
const { login, signup } = require('./controllers/userController');

app.get('/', (req, res)=>{
    res.send({
        status:"Active",
        code:200
    });  
 });

app.post('/signup', signup);

app.post('/login', login);

app.post('/add-products', async (req, res)=>{
    const product = new Products(req.body); 
    const result = await product.save();
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

app.listen(5000, ()=>{console.log("SERVER RUNNINGGGGG.....")});