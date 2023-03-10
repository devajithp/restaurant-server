const express= require("express")
const {signupValidator,validatorResult}= require("../Middlewares/Validator")
const {signupController,signinController} =require("../Controllers/Auth")

 const router= express.Router()



router.post("/signup",signupValidator,validatorResult,signupController)

router.post("/signin",signinController)

module.exports=router