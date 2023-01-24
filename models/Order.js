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
const OrderSchema= mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users",
        required:true
    },
    products:{
        type:[cartProductSchema],
        required:true,
        default: undefined
    },
    status:{
        type:String,
        required:true
    },
    payment:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    address:{
        name:{
            type:String,
            required:true
        },
        mobileNumber:{
            type:String,
            required:true
        },
        state:{
            type:String,
            required:true
        },
        district:{
            type:String,
            required:true
        },
        pincode:{
            type:String,
            required:true
        },
        houseName:{
            type:String,
            required:true
        },
        landmark:{
            type:String,
            required:true
        },
        payment:{
            type:String,
            required:true
        },

    }
    
},
{
  timestamps:true  
})

const Order=mongoose.model("orders",OrderSchema)

module.exports=Order;