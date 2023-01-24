const {check,validationResult } = require('express-validator');

exports.signupValidator=[
    check("username").not().isEmpty().trim().withMessage("All fields required"),
    check("email").isEmail().normalizeEmail().withMessage("Invalid email"),
    check("password").isLength({min:5}).withMessage("password must have atleast 5 characters")
]

exports.validatorResult=(req,res,next)=>
{
  const result= validationResult(req)
  const hasErrors=!result.isEmpty()
  if(hasErrors)
  {
    const firstError=result.errors[0].msg
    console.log(firstError)
    
  res.status(400).json({errorMessage:firstError})
    
    
  }
  next()
}