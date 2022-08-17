const express = require('express');
const app = express(); 
const morgan = require('morgan');
 const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv/config');


const api = process.env.API_URL;

 

//Middleware

app.use(morgan('tiny'));
app.use(express.json()); 
app.use(cors()); 
app.options('*',cors ());


const collaboraterRouter = require('./routes/collaboraters');

//Routes 
app.use(`${api}/collaboraters`, collaboraterRouter);







 
//Database
mongoose.connect(process.env.CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
   dbName: 'MobileApp'
})
.then(()=>{
  console.log('Database Connection is ready...')
})
.catch((err)=> {
  console.log(err);
})
 

app.listen(3000, ()=>{
     console.log('server is running http://localhost:3000');
})