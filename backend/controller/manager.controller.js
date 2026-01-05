import { Order } from "../models/model.Order.js"
import { User } from "../models/model.User.js"

export const getAllUsersForManager = async() => {
    try {
        const users = await User.find({role : "user"}).select("-password -__v")
        const orders = await Order.find({userId : User._id})
        .populate(items.product)
        console.log("orders",orders);
        
        const totalOrders = orders.length
        console.log("total Orders", totalOrders);

        totalAmount += item.quantity * item.product.price;

        return res.status(200).json({
            _id: User._id,
            name: User.name,
            email:users.email,
            totalOrders,
            totalAmount
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({message : "server error"})
    }
}