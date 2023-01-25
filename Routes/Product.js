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


module.exports=router;