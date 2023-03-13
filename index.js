const express = require('express');
const app = express();

const cors = require('cors');
app.use(cors({ 
    origin: true, 
    credentials: true 
}));


const { createProxyMiddleware } = require('http-proxy-middleware');

const options = {
    target: 'https://nodemongo.cyclic.app',
    changeOrigin: true,
    cookieDomainRewrite: {
      '*': 'localhost'
    },
    onProxyRes: function(proxyRes, req, res) {
      proxyRes.headers['Access-Control-Allow-Origin'] = 'http://localhost:3000';
      proxyRes.headers['Access-Control-Allow-Credentials'] = 'true';
    }
  };
  
const corsPatch =  createProxyMiddleware(options);

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
app.post('/signup', signup, corsPatch);


// LOGIN 
app.post('/login', login, corsPatch);


// ADD PRODUCTS
app.post('/add-products', addproducts, corsPatch);


app.listen(5000, ()=>{console.log("SERVER RUNNINGGGGG.....")});