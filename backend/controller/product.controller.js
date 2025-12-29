import { Product } from "../models/model.Product.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

// console.log(addProduct);

export const addProduct = async(req, res) => {
    const {name , price, heading, quantity } = req.body   // (Request ke andar data hota hai)
    console.log(req.body)

    try {
        if(!name || !price || !heading || !quantity){
            return res.status(400).json({message : "All fields are required"})
        }

       
        // const existedProduct = await Product.findOne({
        //     $or: [{ name }, { heading }]
        // })

        // if(existedProduct){
        //     return res.status(401).json({message : "product already exist"});
        // }

        const avatarLocalPath = req.files?.avatar?.[0].path;
        // const coverImageLocalPath = req.files?.coverImage?.[0].path;
        //  console.log(avatarLocalPath)
        // console.log(coverImageLocalPath)
      

        if(!avatarLocalPath){
           return  res.status(400).json({message: "Avatar file is required"})
        }

        const avatar = await uploadOnCloudinary(avatarLocalPath)
        // const coverImage = await uploadOnCloudinary(coverImageLocalPath)
        console.log("avatar", avatar);
        // console.log("coverImage",coverImage);

        if(!avatar){
            return res.status(400).json({message : "Avatar file is required"})
        }
        // if not existed create new product
        const newProduct = await Product.create({
            name,
            avatar : avatar?.url,
            // coverImage : coverImage?.url || "",
            price,
            heading,
            quantity,
        })
        // const createdProduct = Product.findById(product._id).select(
        //     '-password -refreshToken'
        // )
        return res.status(200).json({
            message : "Product added successfully",
            data : newProduct
        })
    } catch (error) {
        console.error(error)
        return res.status(500).json({message : "server error"})
    }
    // console.log("Req.bdy",req.body);
    
}


export const allData = async(req, res) => {
    try {
        const allProduct = await Product.find();
        res.status(200).json(allProduct);
    } catch (error) {
        res.status(500).json({message : "Error fetching Products"});
    }
};



export const searchProduct = async(req, res) => {
    try {
        const {q} = req.query;
    
        if(!q){
            return res.status(400).json({message : " Search query required"})
        }
    
        const products = await Product.find({
            $or:[
                {name: {$regex:q, $options:"i"}},
                {heading: {$regex: q, $options: "i"}},
            ],
        });
        res.status(200).json(products)
    } catch (error) {
        res.status(500).json({message : "Search Failed"})
    }
};