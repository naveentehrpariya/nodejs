const express = require('express');
const app = express();

// const errorHandler = require("./middlewares/errorHandler");
const cors = require('cors');
require('./db/config');
 
// MIDDLE-WARES 
app.use(cors()); 
app.use(express.json()); 
// app.use(errorHandler);  

// ROUTES
app.use("/user", require('./routes/userRoutes'));
app.use("/product", require('./routes/productsRoutes'));
  

// TEST CHECK
app.get('/', (req, res)=>{ 
    res.send({
        status:"Active",  
        code:200
    });  
}); 
  
app.listen(5000, ()=>{console.log("SERVER RUNNINGGGGG.....")});