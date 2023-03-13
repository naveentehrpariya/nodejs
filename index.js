const express = require('express');
const app = express();

const cors = require('cors');
app.use(cors({
    origin:"http://localhost:3000/",
}));

require('./db/config');
app.use(express.json());


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