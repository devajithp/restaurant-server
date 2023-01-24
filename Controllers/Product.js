const mongoose= require("mongoose")
const Product= require("../models/Product")
const addProduct=async (req,res)=>
{
    
    let productData=req.body;
    console.log(req.body.productName)
    if(!productData)
    {
        
        res.status(400).json({"errorMessage":"unable to add food"})
    }
    else
    {  console.log("success")
        console.log(productData)
        console.log("req.user :",req.user)
       
        try {
            const newProduct= new Product()
            newProduct.productName=req.body.productName
            newProduct.productDescription= req.body.productDescription
            newProduct.productPrice=req.body.productPrice
            newProduct.productCategory=req.body.productCategory
            newProduct.productQty= req.body.productQty
            newProduct.productImage=req.body.productImage
           let newProductData= await newProduct.save()
           console.log(newProductData)
           res.status(201).json(newProductData)
        } catch (error) {
            console.log(error)
            res.status(400).json({"errorMessage":"unable to add food mongo error"})
        }
        
    }
}
const getProducts=async(req,res)=>
{
   try {
      
    const products= await Product.find({}).populate("productCategory", "category")
    console.log(products)
    res.status(200).json(products)


   } catch (error) {
    console.log(error)
    res.status(500).json({"errorMessage":"failed to fetch products"})
   }
}
const deleteProduct=async(req,res)=>
{
   try {
    const id= req.params.id
    const deletedProduct= await Product.findByIdAndDelete(id)
    res.json(deletedProduct).status(200)
   } catch (error) {
     console.log(error)
     res.status(400).json({"errorMessage":"unable to delete , try again"})
   }
}

const getProduct=async(req,res)=>
{
    try {
        const id= req.params.id
        const product=await Product.findById(id)
        res.json(product).status(200)
    } catch (error) {
        console.log(error)
        res.status(400).json({"errorMessage":" unable to fetch product"})
    }
}
const editProduct=async (req,res)=>
{
    try {
        const id=req.params.id
        const productData=req.body
       Product.findByIdAndUpdate(id,{
            productName:productData.productName,
            productDescription:productData.productDescription,
            productPrice:productData.productPrice,
            productQty:productData.productQty,
            productImage:productData.productImage
        }).then((product)=>
        {
            Product.find({}).populate("productCategory", "category").then((products)=>
            {
                res.status(200).json(products)
            })
        }).catch((err)=>
        {
            console.log(err,"error in updating product")
        })
        
        
    } catch (error) {
        
        console.log(error,"error in updating product")
    }
}
const getProductsOfCategory=async(req,res)=>
{
   let categoryId=req.params.categoryId
   console.log(typeof(categoryId))
   try {
        
    let products= await Product.find({productCategory: mongoose.Types.ObjectId(categoryId)}).populate("productCategory", "category")
    res.status(200).json(products)


   } catch (error) {
     console.log(error)
     res.status(400)
   }
}
module.exports={
    addProduct,
    getProducts,
    deleteProduct,
    getProduct,
    editProduct,
    getProductsOfCategory
}