const userModel=require('../models/user.model')
const getSignUp =(req,res)=>{
    res.render("pages/signup",{message:'', status:'empty'})
}
const getSignIn =(req,res)=>{
    res.render("pages/signin",{message:'', status:'empty'})
}
const getAdminPage =(req,res)=>{
    userModel.find((err,result) =>{
        if(err){
            console.log('error occured')
        }
        else{
     res.render('pages/Admin',{Customers:result})
        }
    });
}
const getIndexPage=(req,res)=>{
    userModel.find((err,result) =>{
        if(err){
            console.log('error occured')
        }
        else{
      console.log(result)
        }
    });
    res.render('index')
}
const registerUser=(req,res)=>{
    userModel.find({email:req.body.email},(err,result)=>{
        if(result.length>0) {
           res.render('pages/signup',{message:'oh no, email already exists!',status:false}) 
        }
        else{
            let form =new userModel(req.body)
             form.save((err)=>{
                if(err){
                    res.render('pages/signup.ejs',{message:'oh no, oh no!, error!',status:false})
                }
                else{
                    res.render('pages/signup.ejs',{message:'sign up successful',status:true})
                }
    
               })
           }
       })
}
const signInUser =(req,res)=>{
    userModel.find({email:req.body.email,password:password.body.password},(err,result)=>{
        if(err){
            console.log(err)
            console.log('an error occured')
        }
        else{
            if(result.length==0){
                res.render('pages/signin',{status:false,message:'invalid credential'}
                )
               }
            else{
             res.redirect('admin')
                }
        }
    })
}
const deleteUser=(req,res)=>{
    let id=req.body.uniqueID;
    userModel.deleteOne({_id:id},(err,result)=>{
         if(err){
       console.log('error occured while deleting')
       res.redirect('admin')
    }
    else{
       console.log('deleted one user')
        res.redirect('admin')
    }
    })
}
const editUser =(req,res)=>{
    console.log(req.body.uniqueID)
    userModel.find({_id:req.body.uniqueID},(err,result)=>{
        if(err){
            console.log(err)
            console.log('error occured')
        }
        else{
            res.render("pages/update",{result})
            console.log(result)
        }
    })
}
const upDateUser=(req,res)=>{
    let newDetails=req.body;
let id =req.body.id
userModel.findByIdAndUpdate(id,newDetails,(err,response)=>{
    if (err){
        console.log("error")
    }
    else{
        console.log(response)
        console.log("updated details successfully")
        res.redirect("admin")
    }
})
}
module.exports={getSignUp,getSignIn,getIndexPage,getAdminPage,registerUser,signInUser,deleteUser,upDateUser,editUser}