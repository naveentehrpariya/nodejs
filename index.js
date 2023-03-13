const express = require('express');
const cors = require('cors');
const app = express();
require('./db/config');
app.use(express.json());

app.use(cors({
    origin:"http://localhost:3000",
}));

const { login, signup } = require('./controllers/userController');
const { addproducts } = require(`./controllers/productsController`);

app.get('/', (req, res)=>{ 
    res.send({
        status:"Active",  
        code:200
    });  
 });
 

//  SIGN UP
app.post('/signup', signup);


// LOGIN 
app.post('/login', login);


// ADD PRODUCTS
app.post('/add-products', addproducts, {withCredentials: true});


app.listen(5000, ()=>{console.log("SERVER RUNNINGGGGG.....")});