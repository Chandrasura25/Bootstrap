const express = require('express');
const app = express();
const path = require("path");
const ejs = require("ejs");
const PORT =process.env.PORT||2000
const userRouter =require('./routes/user.route')
const bodyParser = require('body-parser'); 
const userModel = require('./models/user.model')
const cors =require('cors')
app.use(cors())
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json())
const URI =process.env.MONGO_URI
app.use('/',userRouter);

const mongoose = require('mongoose')

mongoose.connect(URI,(err)=>{
    if(err){
        console.log(err)
        console.log(`mongoose isn't connected`)
    }
    else{
        console.log(`moogoose is connected`)
    }
})
 app.get('/',(res,req)=>{
    res.send("hello bae")
 })
app.post('/signup',(res,req)=>{
    var userDetails =req.body
    const form =new userModel(userDetails)
    form.save()
})
 app.set("view engine","ejs");
   
 app.listen(PORT,()=>{
  console.log(`App is running on port: ${PORT}`);
  })

