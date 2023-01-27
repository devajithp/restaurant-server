const jwt = require("jsonwebtoken")
const {jwtSecret}= require("../Config/Keys")

exports.jwtAuthenticator=(req,res,next)=>
{
   
   console.log(req.headers)
   const token = req.headers.token
   
   if(!token)
   {
    res.status(400).json({"errorMessage" :"authorisation denied because no token"})
   }
   try {
    const decoded=jwt.verify(token,jwtSecret)
    req.user=decoded.user
    next()
   } catch (error) {
    console.log("jwt error: ",error)
    res.status(401).json({"errorMessage" :"authorisation denied"})
   }
  
}
