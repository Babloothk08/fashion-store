// model.Cart.js
import mongoose from "mongoose";

const CartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  items: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,  // id store krne 
        ref: "Product",
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        default: 1,
      },
    },
  ],
});

export const Cart = mongoose.model("Cart", CartSchema);


// import mongoose from "mongoose";

// const orderSchema = new mongoose.Schema({
//   userId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "User"
//   },
//   items: [
//     {
//       product: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "Product"
//       },
//       quantity: Number
//     }
//   ],
//   addressId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "Address"
//   },
//   selectedPayment: String,
//   status: String
// }, { timestamps: true });

// export const Cart = mongoose.model("Cart", CartSchema);

// // 🪄 This means: each cart belongs to one user,
// // and inside the cart there is an array of items (each item = product + quantity).