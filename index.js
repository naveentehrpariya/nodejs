const express = require('express');
const app = express();
const errorHandler = require("./middlewares/errorHandler");
const cors = require('cors');
require('./db/config');

// MIDDLE-WARES 
app.use(cors({ origin: true, credentials: true }));
app.use(express.json()); 
app.use(errorHandler);  

// ROUTES
app.use("/api/admin/user", require('./routes/userRoutes'));
app.use("/api/admin/product", require('./routes/productsRoutes'));

// TEST CHECK
app.get('/', (req, res)=>{ 
    res.send({
        status:"Active",  
        code:200
    });  
});
  
app.listen(5000, ()=>{console.log("SERVER RUNNINGGGGG.....")});