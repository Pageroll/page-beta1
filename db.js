const mongoose = require('mongoose');

const mongo = ()=>{
     mongoose.connect(`${process.env.CONN_STR}`, { useNewUrlParser: true, useUnifiedTopology: true }).then(()=>{
    console.log("DB connected")
  }).catch((err)=>console.log(err));
}

module.exports=mongo;