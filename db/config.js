const dotenv = require('dotenv');
dotenv.config({path:'config.env'});

const mongoose = require('mongoose');
mongoose.set('strictQuery', true);
  
// mongoose.connect( `mongodb+srv://naveentehrpariya:`+process.env.PASS+`@cluster0.rnebihn.mongodb.net/test`, {
mongoose.connect( `mongodb+srv://naveenfp:${process.env.DB_PASS}@cluster0.5c8ne.mongodb.net/test`, {
    useNewUrlParser: true,   
    serverSelectionTimeoutMS: 5000,    
    autoIndex: false, // Don't build indexes 
    maxPoolSize: 10, // Maintain up to 10 socket connections
    serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    family: 4 // Use IPv4, skip trying IPv6 
 }).then(() => {
   console.log('MongoDB connected successfully');
 }).catch((err) => {
   console.error('MongoDB connection error: ', err);
 }); 
  