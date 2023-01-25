const Cart =require("../models/Cart")
const mongoose=require("mongoose")


const AddToCart= async (req,res)=>
{
    const userId=req.body.userId
    const productId=req.body.productId

    let cart= await Cart.find({userId: mongoose.Types.ObjectId(userId) })
    
    if(cart.length===0)
    {
      cart= await Cart.create({
            userId: mongoose.Types.ObjectId(userId) ,
            products:[{
                productId:  mongoose.Types.ObjectId(productId),
                quantity:1
            }]
        })
        res.status(201).json({"message":"added to cart"})
    }
    else
    {
        const product=await Cart.aggregate([{$match:{userId:mongoose.Types.ObjectId(userId)}},{$unwind:"$products"},{$project:{products:1,_id:0}},{$match:{"products.productId":mongoose.Types.ObjectId(productId)}}])
        
        if(product.length>0)
        {
           cart= await Cart.updateOne({userId:mongoose.Types.ObjectId(userId),"products.productId": mongoose.Types.ObjectId(productId)},{$inc:{"products.$.quantity":1}})
           res.status(201).json({"message":"quantity incremented"})
        }
        else
        {
           cart= await Cart.updateOne({userId:mongoose.Types.ObjectId(userId)},{$push:{products:{productId:mongoose.Types.ObjectId(productId),quantity:1}}})
           res.status(201).json({"message":"new product added to cart"})
        }
    }

    

    

}
const GetCart=async (req,res)=>
{
 let userId= req.params.userId;
 let cart= await Cart.find({userId:mongoose.Types.ObjectId(userId)})
 if(!cart)
 {
    res.status(400).json({"message":"Cart is empty"})
 }
 else
 {
    let modifiedCart= await Cart.aggregate([{$match:{userId:mongoose.Types.ObjectId(userId)}},{$lookup:{from:"users",localField:"userId",foreignField:"_id",as:"userId"}},
{$unwind:{path:"$products"}},{$lookup:{from:"products",localField:"products.productId",foreignField:"_id",as:"products.productId"}},{$unwind:{path:"$products.productId"}},
{$addFields:{"total":{$multiply:["$products.productId.productPrice","$products.quantity"]}}},{$unwind:{path:"$userId"}}])
    res.status(200).json(modifiedCart)
 }
}
const IncQuantity=(req,res)=>
{
    const userId=req.body.userId
    const productId=req.body.productId
    Cart.updateOne({userId:mongoose.Types.ObjectId(userId),"products.productId": mongoose.Types.ObjectId(productId)},{$inc:{"products.$.quantity":1}}).then(()=>
    {
        res.status(201).json({"message":"quantity incremented"})
    })
    
}

const DecQuantity=(req,res)=>
{
    const userId=req.body.userId
    const productId=req.body.productId
    Cart.updateOne({userId:mongoose.Types.ObjectId(userId),"products.productId": mongoose.Types.ObjectId(productId)},{$inc:{"products.$.quantity":-1}}).then(()=>
    {
        res.status(201).json({"message":"quantity decremented"})
    })
}
const RemoveProduct=(req,res)=>
{
    const userId=req.body.userId
    const productId=req.body.productId
    Cart.updateOne({userId:mongoose.Types.ObjectId(userId)},{$pull:{products:{productId:mongoose.Types.ObjectId(productId)}}}).then(()=>
    {
        res.status(201).json({"message":"product removed"})
    })
}
const GetExactCart=async (req,res)=>
{
   let userId=req.params.userId
   let cart= await Cart.find({userId:mongoose.Types.ObjectId(userId)})
   if(cart)
   {
    res.status(200).json(cart)
   }
   else
   {
    res.status(400).json({"message":"unable to get cart"})
   }

}
const RemoveCart=(req,res)=>
{
    let userId= req.params.userId
    try {
        Cart.deleteOne({userId:mongoose.Types.ObjectId(userId)}).then((response)=>
        {
            
            res.status(200).json(response)
        })
    } catch (error) {
       console.log(error) 
       res.status(400).json({"message":"couldn't able to delete"})
    }
}

module.exports={
    AddToCart,
    GetCart,
    IncQuantity,
    DecQuantity,
    RemoveProduct,
    GetExactCart,
    RemoveCart
}