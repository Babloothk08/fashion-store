import mongoose from "mongoose";


const productSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
        // unique : true
    },
    price : {
        type : Number,
        required : true
    },
    
    category : {
        type : String,
        required : false
    },
    heading : {
        type : String,
        required : true
    },
    quantity : {
        type : Number,
       
    },
    avatar : {
        type : String,
        required : true
    }
    // coverImage : {
    //     type : String,
    //     required : true
    // }

},{timestamps : true})

export const Product = mongoose.model("Product",productSchema)