

const Category=require("../models/Category")
const addCategory=async (req,res)=>
{
    let data= req.body
    console.log(data)
    console.log(req.user)
    if(data)
    {

        try {
        let status= await Category.findOne({category:data.category})
        if(status)
        {
            res.status(400).json({"errorMessage":"Category already present"})
        }
        else
        {
            let newCategory = new Category()
            newCategory.category= data.category
            newCategory = await newCategory.save()
            res.status(201).json(newCategory)
        }
       
      
        } catch (error) {
           console.log("error :" ,error)
           res.status(500).json({"errorMessage":"failed to add category, try again"})

        }
       


        
    }
    else
    {
        res.status(400).json({"errorMessage":"error occured"})
    }
}
const getCategories=async (req,res)=>
{
    try {
        let categories= await Category.find({})
        res.status(200).json({categories})
    } catch (error) {
        res.status(400).json({"errorMessage":"error in fetching category"})
    }
}

module.exports={
    addCategory,
    getCategories
}