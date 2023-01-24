const express= require("express")
const { jwtAuthenticator } = require("../Middlewares/Authenticator")

const {addProduct,getProducts,deleteProduct,getProduct,editProduct,getProductsOfCategory} = require("../Controllers/Product")
const upload = require("../Middlewares/multer")

const router = express.Router()



router.post("/addProduct",jwtAuthenticator,addProduct)
router.get("/getProducts",getProducts)
router.delete("/deleteProduct/:id",jwtAuthenticator,deleteProduct)
router.get("/getProduct/:id",getProduct)
router.patch("/editProduct/:id",jwtAuthenticator,editProduct)
router.get("/getProducts/:categoryId",getProductsOfCategory)
// 63a3f34f5ef4a68d4fb21d8e

module.exports=router;