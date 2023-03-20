const express = require('express');
const app = express();
const errorHandler = require("./middlewares/errorHandler");
const validateToken = require("./middlewares/validateToken");

const cors = require('cors');
require('./db/config');

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(errorHandler);

const { login, signup, user } = require('./controllers/userController');
const { addproducts, listProducts } = require(`./controllers/productsController`);

app.get('/', (req, res)=>{ 
    res.send({
        status:"Active",  
        code:200
    });  
});
 
 
//  SIGN UP
app.post('/signup', signup);
app.post('/login', login);
app.get('/user', validateToken, user); 
 

// ADD PRODUCTS
app.post('/add-products', addproducts); 

 
// List PRODUCTS
app.get('/shop', listProducts); 


app.listen(5000, ()=>{console.log("SERVER RUNNINGGGGG.....")});