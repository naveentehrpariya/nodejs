const express = require('express');
const app = express();
const Pusher = require('pusher');
const morgan = require('morgan')
app.use(morgan('dev')); 
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
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



const pusher = new Pusher({
    appId: '1569306',
    key: '35a80b2b96010f87b14f',
    secret: '90644451264fded8b7b0',
    cluster: 'eu',
    useTLS: true
});

app.post('/pusher/auth', (req, res) => {
    const socketId = req.body.socket_id;
    const channel = req.body.channel_name;
    const user = req.body.user_id; // replace this with your own user authentication logic
    
    console.log("req.body",req.body);
    if (!user) {
      return res.status(401).send('Unauthorized');
    }
    
    const auth = pusher.authenticate(socketId, channel, user);
    console.log("Auth",auth);
    res.send(auth);
});
  
app.listen(5000, ()=>{console.log("SERVER RUNNINGGGGG.....")});