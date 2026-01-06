import React, { useEffect, useState } from "react";
import Footer from "../component/Footer";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";
import publicApi from "../pages/api/publicApi.js";

function UserCart() {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const token = localStorage.getItem("token");

  // 🔹 Fetch user cart from backend
  const getCart = async () => {
    try {
      const res = await publicApi.get("/api/cart/get", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const items = res.data.data.items;
      console.log("item", items);
      setCartItems(items);
      calculateTotal(items);
    } catch (err) {
      console.error("Error fetching cart:", err);
    }
  };

  useEffect(() => {
    getCart();
    console.log("cartItems", cartItems);
  }, []);

  //  Calculate total price
  const calculateTotal = (items) => {
    const totalPrice = items.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );
    setTotal(totalPrice);
  };

  // Remove product from cart
  const removeFromCart = async (productId) => {
    try {
      const remove = await publicApi.delete(`/api/cart/remove/${productId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success(remove.data.message);
      getCart(); // refresh cart
    } catch (err) {
      console.error("Error removing item:", err);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <div className="flex-grow flex items-center justify-center">
          <h1 className="text-center text-2xl font-semibold">
            🛒 Your cart is empty
          </h1>
        </div>
        <Footer />
      </div>
    );
  }

  const discount = total * 0.1;
  const platformFee = 5;
  const finalTotal = total - discount + platformFee;

  return (
    <>
      <div className="flex flex-wrap justify-around mt-15 max-sm:mt-18 max-sm:py-1 py-15 mx-10 bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50">
        <div className="w-full md:w-2/4 flex flex-col gap-6 cursor-pointer">
          {cartItems.map((item) => (
            <div
              key={item.product._id}
              className="
        flex flex-col sm:flex-row justify-between items-center gap-5
        bg-white rounded-2xl p-5
        shadow-md hover:shadow-xl transition duration-300
        border border-gray-100
      "
            >
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 w-full">
                <img
                  src={item.product.avatar}
                  alt={item.product.name}
                  className="
            w-28 h-28 object-contain rounded-xl
            bg-gray-50 p-2
          "
                />

                <div className="flex flex-col text-center sm:text-left">
                  <h2 className="text-lg sm:text-xl font-bold text-gray-800">
                    {item.product.name}
                  </h2>

                  <p className="text-gray-600 mt-1">
                    Price:{" "}
                    <span className="font-semibold">₹{item.product.price}</span>
                  </p>

                  <p className="text-gray-600">
                    Qty: <span className="font-semibold">{item.quantity}</span>
                  </p>

                  <p className="text-lg font-bold text-emerald-600 mt-2">
                    Total: ₹{item.product.price * item.quantity}
                  </p>
                </div>
              </div>

              <button
                onClick={() => removeFromCart(item.product._id)}
                className="
          w-full sm:w-auto
          px-5 py-2 rounded-xl
          text-white font-bold
          bg-gradient-to-r from-red-400 to-red-600
          hover:from-red-600 hover:to-red-400
          transition duration-300
          shadow-md hover:shadow-lg
        "
              >
                Remove
              </button>

              <ToastContainer autoClose={1500} />
            </div>
          ))}
        </div>

        <div className="w-full md:w-1/3 sticky top-20 h-fit cursor-pointer">
          <div
            className="bg-white rounded-3xl p-6 
            shadow-lg hover:shadow-2xl transition duration-300
             border border-gray-100"
          >
            <h2 className="text-2xl font-extrabold text-center mb-6 text-gray-800">
              🧾 Price Details
            </h2>

            <div className="flex justify-between items-center mb-3 text-gray-700">
              <span className="text-sm sm:text-base">
                Price ({cartItems.length} items)
              </span>
              <span className="font-semibold">₹{total}</span>
            </div>

            <div className="flex justify-between items-center mb-3 text-green-600">
              <span className="text-sm sm:text-base">Discount (10%)</span>
              <span className="font-semibold">-₹{discount}</span>
            </div>

            <div className="flex justify-between items-center mb-4 pb-4 border-b text-gray-700">
              <span className="text-sm sm:text-base">Platform Fee</span>
              <span className="font-semibold">₹{platformFee}</span>
            </div>

            <div className="flex justify-between items-center mt-4 text-xl font-bold text-gray-900">
              <span>Total Amount</span>
              <span className="text-emerald-600">₹{finalTotal}</span>
            </div>

            <Link to="/checkout">
              <button
                className="w-full mt-6 py-3 rounded-xl text-lg font-bold text-white
        bg-gradient-to-r from-amber-400 via-orange-400 to-orange-500
        hover:from-orange-500 hover:to-amber-400
        transition duration-300 shadow-md hover:shadow-xl"
              >
                Proceed to Checkout →
              </button>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default UserCart;
