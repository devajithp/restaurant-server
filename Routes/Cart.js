const express= require("express");
const { jwtAuthenticator } = require("../Middlewares/Authenticator");
const {AddToCart,GetCart,IncQuantity,DecQuantity,RemoveProduct,GetExactCart,RemoveCart} = require("../Controllers/Cart")



const router= express.Router()

router.post("/addtocart",jwtAuthenticator,AddToCart)
router.get("/getcart/:userId",GetCart)
router.get("/getexactcart/:userId",GetExactCart)
router.patch("/incquantity",jwtAuthenticator,IncQuantity)
router.patch("/decquantity",jwtAuthenticator,DecQuantity)
router.patch("/removeProduct",jwtAuthenticator,RemoveProduct)
router.patch("/removeCart/:userId",RemoveCart)

module.exports= router;