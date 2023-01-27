const express= require("express")
const { jwtAuthenticator } = require("../Middlewares/Authenticator");
const {AddToOrder,GetUserOrder,GetAllOrders,ConfirmOrder,CancelOrder,InitiateOnlineOrder,VerifyOnlineOrder} = require("../Controllers/Order")
const router=express.Router()

router.post("/addtoorder",jwtAuthenticator,AddToOrder)
router.get("/getorders/:userId",GetUserOrder)
router.get("/getOrders",GetAllOrders)
router.patch("/confirm/:orderId",jwtAuthenticator,ConfirmOrder)
router.patch("/cancel/:orderId",jwtAuthenticator,CancelOrder)
router.post("/razorpay/initiate",jwtAuthenticator,InitiateOnlineOrder)
router.post("/razorpay/verify",VerifyOnlineOrder)


module.exports=router;