const mongoose = require('mongoose');
const bcrypt =require('bcryptjs')
let userSchema = mongoose.Schema({
    fullname:String,
    email:String,
    number:String,
    password:String
})
let saltRound =10;
userSchema.pre('save',function(next){
    const document =this;
    bcrypt.hash(document.password,saltRound,(err,hashedPassword)=>{
        if(!err){
            document.password=hashedPassword;
            next();
        }
        else{
        console.log(err)
        }
    })
})
userSchema.methods.validatePassword = function(password,callback){
    const document = this;
    bcrypt.compare(password,document.password,(err,same)=>{
        if(!err){
            callback(err,same)
        }
        else{
            next()
        }
    })
}
let userModel = mongoose.model('user_tb',userSchema)
module.exports=userModel