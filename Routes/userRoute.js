const express=require('express')
const User=require('../models/user')
const auth=require('../middleware/auth')

const router= new express.Router();

// API for signup 
router.post('/user/signup',async (req,res)=>
{ 

    console.log(req.body)
    try
        {
            // Creating new user

             const user= await new User({email: req.body.email, username : req.body.username,password:req.body.password})
             await user.save()
             console.log("user saved")
             // calling generateTolen function for token-based authentication
            const token=await user.generateToken()
                if (!token) {
                  res.json({success:false, message:"Your account could not be saved. Error: ", err}) 
                }else {
                      res.statusCode = 200;
                      res.setHeader('Content-Type', 'application/json');
                      res.json({success: true, status: 'Registration Successful!'});
                }
            
        }
        catch(e)
        {
            //check If user is already registered
            const user=User.findOne({email:req.email})
            console.log("user found"+req.email)
            if(user)
            {
                res.status(404).send("Already existing account,Please login")
            }
        }  
})

//API for sign in
// auth is a middleware to authenticate using token for valid user
router.post('/user/login',auth,(req,res)=>
{ 
    console.log("insie login")
    try
        {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json({success: true, status: 'login Successful!'});
                
        }  
    catch(e)
    {
        
            res.status(404).send("Failure")
    
    }
// })
})



//Exporting user for the use in other files
module.exports = router