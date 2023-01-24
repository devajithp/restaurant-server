const mongoose= require("mongoose")


const productSchema= new mongoose.Schema({
    productName:{
        type:"String",
        required:true,
        trim:true,
        maxlength:60
    },
    productDescription:{
        type:"String",
        required:true,
        trim:true
    },
    productPrice:{
       type:Number,
       required:true
    },
    productCategory:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "categories",
        required:true
    },
    productQty:{
        type:Number,
        required:true
    },
    productImage:{
        type:"String",
        required:true
    }
    
},{timestamps:true})


const Product= mongoose.model("products",productSchema)

module.exports= Product