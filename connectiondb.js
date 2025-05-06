const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI).then(()=>{
    console.log('Connected successfully to database')
}).catch((error)=>{
    console.log("Could not connect to database",error.message);
});