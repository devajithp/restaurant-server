const bcrypt= require("bcryptjs")
const User = require("../models/User")
const jwt= require("jsonwebtoken")
const Keys = require("../Config/Keys")
const{jwtSecret,jwtExpire}=Keys
  const signupController=async (req,res)=>
{
    const {username,email,password}= req.body
    console.log(req.body)
    
    try {
        const data= await User.findOne({email:email})
        
        if(data)
        {
            res.status(400).json({errorMessage:"user already exists"})
        }
        else
        {
           const newUser=new User()
           newUser.username=username
           newUser.email=email
          const salt= await bcrypt.genSalt(10)
          newUser.password= await bcrypt.hash(password,salt)
          console.log(newUser.password)
          await newUser.save()
          
          res.status(201).json({successMessage:"Registration successfull , please login"})

          
        }
    } catch (error) {
        console.log("signupControllererror: ", error)
        res.status(500).json({errorMessage:"server error"})
    }

   
    

   

}
const signinController= async (req,res)=>
{
    const{email,password}=req.body

    try {
        const user= await User.findOne({email:email})
        if(!user)
        {
            res.status(400).json({errorMessage:"This email is not registered, please signup"})
        }
        else
        {
            let status= await bcrypt.compare(password,user.password)
            if(!status)
            {
                res.status(400).json({errorMessage:"Incorrect password"})
            }
            else
            {
                const payload={
                    user:{
                        _id:user._id
                    }
                }
                jwt.sign(payload,jwtSecret,{expiresIn:jwtExpire},(err,token)=>
                {
                    const{_id,username,email,role}=user
                    if(err)
                    {
                        console.log("jwterror :  ",err)
                    }
                    else
                    {
                       
                        res.status(200).json({token,user:{_id,username,email,role}})
                    }
                })
                
            }
        }
    } catch (error) {
        
        if(error)
        {
            console.log(error)
            res.status(400).json({errorMessage:"server error"})
        }
    }
}
module.exports={
    signupController,
    signinController
}