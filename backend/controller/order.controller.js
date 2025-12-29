import { populate } from "dotenv";
import { Cart } from "../models/model.Cart.js";
import { Order } from "../models/model.Order.js"
// import Product from "../models/model.Product.js";

export const createOrder = async(req, res) => {
    try {
        // const { cartId, addressId} = req.body
        const userId = req.user._id
        const {addressId, selectedPayment} = req.body
        if(!addressId || !selectedPayment){
            return res.status(400).json({message : "Missing Fields"});
        }

        const cartId = await Cart.findOne({user : userId})
        if(!cartId || cartId.items.length === 0){
            return res.status(400).json({message : "Cart is empty"});
        }

        const newOrder = await Order.create({
            userId,
            // cartId : cartId._id,
            items : cartId.items.map(item => ({
                product:item.product._id || item.product,
                quantity: item.quantity
            })),
            addressId,
            selectedPayment,
            status:"PLACED"
        })
    
        const userOrder = await Order.findById(newOrder._id)
        if(!userOrder){
            return res.status(404).json({Message : "userOrder not found"})
        }

        cartId.items = [],
        await cartId.save();
        
        res.status(201).json({
            Message : "Uer Order Created successfully",
            order : userOrder
            
        })
    } catch (error) {
        res.status(500).json({message : "Server error"})
    }
}


export const getOrder = async(req, res) => {
    try {
        const userId = req.user._id
        if(!userId){
            return res.status(404).json({message : "User Not Logged In "})
        }

        const userOrder = await Order.find({userId})
       
        .populate({
            path : "items.product",
            select : "heading avatar price"
        }).sort({createdAt: -1})

       
        .populate({
            path : "addressId",
            select:"name phone city state pincode address"
        }).sort({createdAt : -1})
        

        if(!userOrder){
            return res.status(404).json({Message : "User Order is empty, please place order"})
        }

        res.status(200).json({
            Message : "Order fetched successfully",
            data : userOrder
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({message : "server not found"})
    }
}