const Order = require("../models/Order")
const mongoose =require("mongoose")
const Razorpay = require("razorpay");
const crypto = require("crypto");

const AddToOrder=(req,res)=>
{
    let data= req.body
    try {
        Order.create({...data}).then((response)=>
        {
            
            res.status(201).json(response)

        })
    } catch (error) {
        res.status(400).json({"message":"unable to add order"})
    }
}
const GetUserOrder=(req,res)=>
{
    let userId=req.params.userId
    try {
        Order.find({userId:mongoose.Types.ObjectId(userId)}).populate("products.productId").then((data)=>
        {
            
            res.status(200).json(data)
        })
    } catch (error) {
        console.log(error)
        res.status(400).json({"message":"unable to fetch orders"})
    }
}
const GetAllOrders=(req,res)=>
{
    try {
        Order.find().populate("products.productId").then((data)=>
        {
            
            res.status(200).json(data)
        })
    } catch (error) {
        console.log(error)
        res.status(400).json({"message":"unable to fetch orders"})
    }
}
const ConfirmOrder=(req,res)=>
{
   let orderId= req.params.orderId;
   try {
    Order.updateOne({_id:mongoose.Types.ObjectId(orderId)},{status:"Order Confirmed"}).then((data)=>
    {
        
        res.status(200).json({"message":"status updated"})
    })
   } catch (error) {
      console.log(error)
      res.status(400).json({"message":"status couldn't updated"})
   }
}
const CancelOrder=(req,res)=>
{
    let orderId= req.params.orderId;
    try {
     Order.updateOne({_id:mongoose.Types.ObjectId(orderId)},{status:"Order Cancelled"}).then((data)=>
     {
         
         res.status(200).json({"message":"status updated"})
     })
    } catch (error) {
       console.log(error)
       res.status(400).json({"message":"status couldn't updated"})
    }
}
const InitiateOnlineOrder=(req,res)=>
{
    try {
		const instance = new Razorpay({
			key_id: process.env.KEY_ID,
			key_secret: process.env.KEY_SECRET,
		});

		const options = {
			amount: req.body.amount * 100,
			currency: "INR",
			receipt: crypto.randomBytes(10).toString("hex"),
		};

		instance.orders.create(options, (error, order) => {
			if (error) {
				console.log(error);
				return res.status(500).json({ message: "Something Went Wrong!" });
			}
			res.status(200).json({ data: order });
            
		});
	} catch (error) {
		res.status(500).json({ message: "Internal Server Error!" });
		console.log(error);
	}
}
const VerifyOnlineOrder=(req,res)=>
{
    
    try {
		const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
			req.body;
		const sign = razorpay_order_id + "|" + razorpay_payment_id;
		const expectedSign = crypto
			.createHmac("sha256", process.env.KEY_SECRET)
			.update(sign.toString())
			.digest("hex");

		if (razorpay_signature === expectedSign) {
			return res.status(200).json({ message: "Payment verified successfully" });
		} else {
			return res.status(400).json({ message: "Invalid signature sent!" });
		}
	} catch (error) {
		res.status(500).json({ message: "Internal Server Error!" });
		console.log(error);
	}
}


module.exports={
    AddToOrder,
    GetUserOrder,
    GetAllOrders,
    ConfirmOrder,
    CancelOrder,
    InitiateOnlineOrder,
    VerifyOnlineOrder

}