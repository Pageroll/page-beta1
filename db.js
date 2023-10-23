const mongoose = require('mongoose');
require("dotenv").config()

const mongo = ()=>{
     mongoose.connect(`${process.env.DB_CONNECT}`, { useNewUrlParser: true, useUnifiedTopology: true }).then(()=>{
    console.log("DB connected")
    console.log(process.env.DB_CONNECT)
  }).catch((err)=>console.log(err));
}

module.exports=mongo;