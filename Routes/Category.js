
const express= require("express")
const {addCategory,getCategories} = require("../Controllers/Category")
const {jwtAuthenticator} =require("../Middlewares/Authenticator")



const router= express.Router()

router.post("/addCategory",jwtAuthenticator,addCategory)
router.get("/getCategories",getCategories)

module.exports=router