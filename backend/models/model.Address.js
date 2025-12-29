import mongoose from "mongoose";

const addressSchema = mongoose.Schema({
    userId :{
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    },
    name :{
        type : String,
        required : true
    },
    address : {
        type : String,
        required : true
    },
    phone : {
        type: String,
        required: true
    },
    pincode:{
        type : Number,
        required : true
    },
    city : {
        type : String,
        required : true
    },
    state : {
        type : String,
        required : true
    }

},{timestamps:true})

const Address = mongoose.model("Address",addressSchema)

export {Address}