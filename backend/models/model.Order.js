// import mongoose from "mongoose";

import mongoose from "mongoose";
const orderSchema = mongoose.Schema({
    userId : {
        type :mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true
    },
    items : [
        {
            product : {
                type : mongoose.Schema.Types.ObjectId,
                ref : "Product",
                required : true
            },
            quantity :{
                type : Number,
                required : true
            }
        }
    ],
    addressId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Address",
        required : true
    },
    selectedPayment : {
        type : String,
        required : true
    },
    status : {
        type :String,
        required : true,
        default : "PLACED"
    }
}, {timestamps : true})

const Order = mongoose.model("Order", orderSchema)

export {Order}