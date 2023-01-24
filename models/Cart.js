const mongoose= require("mongoose")
const cartProductSchema=mongoose.Schema({
    productId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"products",
        required:true
    },
    quantity:{
        type:Number,
        minimum:0,
        required:true,
        default:0
    }
})
const CartSchema= mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users",
        required:true
    },
    products:{
        type:[cartProductSchema],
        required:true,
        default: undefined
    }
    
},
{
  timestamps:true  
})

const Cart=mongoose.model("carts",CartSchema)

module.exports=Cart;