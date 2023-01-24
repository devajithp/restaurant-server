const mongoose = require("mongoose")

const connectDB= async ()=>
{
    try {
        await mongoose.connect("mongodb+srv://devajith:MJC8tjq167Pktqwk@cluster0.jzonz9t.mongodb.net/restaurant?retryWrites=true&w=majority",
        {
            useNewUrlParser:true,
            useUnifiedTopology: true

        })
        console.log("Database connected")

    } catch (error) {
        console.log(error)
    }
}

module.exports={
    connectDB
}