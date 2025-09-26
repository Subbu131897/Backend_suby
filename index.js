const express = require("express");
const dotEnv = require('dotenv');
const mongoose = require("mongoose");
const vendrRoutes = require('./routes/VendorRoutes');
const bodyParser = require('body-parser');
const firmRoutes= require('./routes/FirmRoutes')
const productRoutes = require('./routes/ProductRotes');
const cors = require('cors'); 
const path = require('path');//image routes

const app = express()

const PORT = process.env.PORT || 4000;
dotEnv.config();

mongoose.connect(process.env.MONGO_URI)
.then(()=>{
  console.log("mongoDb connected succesfully")
})
.catch((error)=>{
  console.log(error)
})
app.use(bodyParser.json())
app.use('/vendor',vendrRoutes)
app.use('/firm',firmRoutes)
app.use('/product',productRoutes)
app.use('/uploads/', express.static('uploads'));

app.listen(PORT,()=>{
  console.log(`server started at ${PORT}`)
});

app.use('/',(req,res)=>{
  res.send("<h1>WELCOME TO NODEJS Backend</h1>",
   <marquee direction="left">Hello Psycho Chandana</marquee>

  )
})