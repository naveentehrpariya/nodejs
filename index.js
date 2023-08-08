const express = require('express');
const app = express();
const axios = require('axios');


const morgan = require('morgan')
app.use(morgan('dev')); 

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const globalErrorHandler = require("./middlewares/gobalErrorHandler");
const cors = require('cors');
const AppError = require('./utils/AppError');
require('./db/config');
 
// MIDDLE-WARES 
app.use(cors()); 
app.use(express.json()); 
// app.use(errorHandler);  

// ROUTES
app.use("/user", require('./routes/authRoutes'));
app.use("/product", require('./routes/productsRoutes'));
app.use("/user", require('./routes/userRoutes'));

// TEST CHECK
app.get('/', (req, res)=>{ 
    res.send({
        status:"Active",  
        Status :200
    });   
}); 


const Pusher = require('pusher');
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
    if (!user) {
      return res.status(401).send('Unauthorized');
    }
    const auth = pusher.authenticate(socketId, channel, user);
    console.log("Auth",auth);
    res.send(auth);
});



app.post('/links', async (req, res) => {
    try {
        const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY
        const ENGINE_ID = process.env.ENGINE_ID
        const query = 'what is the name president of india ??';
        const url = `https://www.googleapis.com/customsearch/v1?key=${GOOGLE_API_KEY}&cx=${ENGINE_ID}&q=${query}`;
        const response = await axios.get(url);
        const searchResults = response.data.items;
        let results = [];
        searchResults.forEach((result) => {
            const data = [{
                title:result.title,
                link:result.link,
                snippet:result.snippet,
            }];
            results.push(data);
        });
        res.json({
            message:'successfully fetched !!',
            data:results
        })
    } catch (error) {
        console.error('Error:', error.message);
    }
});


const TextRazor = require('textrazor');
app.post('/rajor', async (req, res) => {
    try {
        const textRazor = new TextRazor(process.env.RAJOR_API);
        const content = 'provide links top 10 books of skill development ??'
        const options = { extractors: ["links"], }
        textRazor.exec(content, options)
        .then(ress => {
            res.json({
                msg:ress
            });
        })
        .catch(err => {
            console.error(err);
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status:500,
            error:error,
            msg:'Internal Server Error',
        });
    }
});
 
app.all('*', (req, res, next) => { 
    next(new AppError("page not found !!", 404    ));         
});

app.use(globalErrorHandler); 
const port = 8080;
app.listen(port, ()=>{ console.log(`On PORT ${port} SERVER RUNNINGGGGG.....`) });