const mongoose= require("mongoose")

const CategorySchema= new mongoose.Schema({
    category:{
        type:String,
        required:true,
        trim:true,
        maxlength:50,
        lowercase:true
        
    }
},{timestamps:true})


const Category = new mongoose.model("categories",CategorySchema)

module.exports=Category