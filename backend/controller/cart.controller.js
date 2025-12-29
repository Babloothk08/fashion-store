import { Cart } from "../models/model.Cart.js";
import { Product } from "../models/model.Product.js";

// Add to Cart (unique per user)
export const addToCart = async (req, res) => {
  try {
    const userId = req.user._id; // token se aaya user
    console.log("userID",userId);
    
    if (!userId) {
      return res.status(401).json({ message: "User ID not found" });
    }

    const { productId, quantity } = req.body;
    console.log("req.body",req.body);
    
    //  req.body = {
    //  productId: "66f7e23abc4567d890ef12aa",
    //  quantity: 1
    //  }
    const product = await Product.findById(productId);
    console.log("product", product);
    

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // user ka cart find 
    let cart = await Cart.findOne({ user: userId });

    // agar cart nahi hai to create karo
    if (!cart) {
      cart = new Cart({
        user: userId,
        items: [{ product: productId, quantity: quantity || 1 }],
      });
    } else {
      // check product already existed / not
      const existingItem = cart.items.find(
        (item) => item.product.toString() === productId
      );

      if (existingItem) {
        existingItem.quantity += quantity || 1;
      } else {
        cart.items.push({ product: productId, quantity: quantity || 1 });
      }
    }

    await cart.save();

    res.status(200).json({ message: "Product added to cart", cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

// Get Cart of Logged-in User
export const getCart = async (req, res) => {
  try {
    const userId = req.user._id;

    const cart = await Cart.findOne({ user: userId }).populate("items.product");

    if (!cart) {
      return res.status(200).json({ items: [] });
    }

    res.status(200).json({
      message: "Cart fetched successfully",
      data: cart,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Update Quantity
export const updateCartQuantity = async (req, res) => {
  try {
    const userId = req.user._id;
    const { productId, quantity } = req.body;

    if (!userId) return res.status(401).json({ message: "User ID not found" });
    if (!quantity || quantity < 1)
      return res.status(400).json({ message: "Invalid quantity" });

    const cart = await Cart.findOne({ user: userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const item = cart.items.find(
      (item) => item.product.toString() === productId
    );
    if (!item) return res.status(404).json({ message: "Product not found in cart" });

    item.quantity = quantity;
    await cart.save();

    res.status(200).json({ message: "Quantity updated", cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};



// Remove Product from Cart
export const removeFromCart = async (req, res) => {
  try {
    const userId = req.user._id;  //Jab user login karta hai, hume uska userId milta hai (JWT token ya database se).
    // console.log("userId",userId);
    
    const { productId } = req.params     //req.params — (URL ke andar data hota hai)
    
    const cart = await Cart.findOne({ user: userId });
    
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.items = cart.items.filter(                    // cart.item  => ye hamarte model se hame mil raha h
      (item) => item.product.toString() !== productId
    );

    await cart.save();

    res.status(200).json({ message: "Product removed", cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};



