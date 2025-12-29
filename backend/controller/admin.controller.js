import { User } from "../models/model.User.js";
import { Order } from "../models/model.Order.js";
import { Cart } from "../models/model.Cart.js";
import { Product } from "../models/model.Product.js";

// 1️⃣ Get all users with order summary
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({ role: "user" }).select("-password -__v");
    
    const usersData = await Promise.all(
      users.map(async (user) => {
        const orders = await Order.find({ userId: user._id }).populate("items.product")
        let totalOrders = orders.length;
        let totalAmount = 0;

        orders.forEach(order => {
          order.items.forEach(item => {
            totalAmount += item.quantity * (item.product?.price || 0);
          });
        });

        return {
          _id: user._id,
          name: user.name,
          email: user.email,
          totalOrders,
          totalAmount
        };
      })
    );

    res.status(200).json({ message: "Users fetched successfully", data: usersData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all managers
export const getAllManagers = async (req, res) => {
  try {
    const managers = await User.find({ role: "manager" }).select("-password -__v");
    res.status(200).json({ message: "Managers fetched", data: managers });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Add manager
export const addManager = async (req, res) => {
  try {
    const { name, lastName, email, password } = req.body;
    if (!name || !lastName || !email || !password)
      return res.status(400).json({ message: "All fields are required" });

    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: "Manager already exists" });

    const newManager = await User.create({
      name,
      lastName,
      email,
      password, // production: hash karo
      role: "manager"
    });

    res.status(201).json({ message: "Manager added", data: newManager });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete manager
export const deleteManager = async (req, res) => {
  try {
    const { managerId } = req.params;
    const deleted = await User.findOneAndDelete({ _id: managerId, role: "manager" });
    if (!deleted) return res.status(404).json({ message: "Manager not found" });

    res.status(200).json({ message: "Manager deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
