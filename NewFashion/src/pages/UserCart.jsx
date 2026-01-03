import React, { useEffect, useState } from "react";
import Footer from "../component/Footer";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";
import publicApi from "../pages/api/publicApi.js"

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
  },[]);

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
      // alert(remove.data.message);
      toast.success(remove.data.message)
      getCart(); // refresh cart
    } catch (err) {
      console.error("Error removing item:", err);
    }
  };
  

  // useEffect(() => {
  //   getCart();
  // }, []);

  // Empty cart case
  if (cartItems.length === 0) {
    return (
      <>
        {/* <Navbar /> */}
        <h1 className="text-center text-2xl py-20">🛒 Your cart is empty</h1>
        <Footer />
      </>
    );
  }

  const discount = total * 0.1;
  const platformFee = 5;
  const finalTotal = total - discount + platformFee;

  return (
    <>
     
      <div className="flex flex-wrap justify-around mt-15 py-15 mx-10">
        {/* Left side - products */}
        <div className="w-full md:w-2/3 flex flex-col gap-5">

          {cartItems.map((item) => (
            <div
              key={item.product._id}
              className="flex justify-around max-sm:flex-col max-sm:gap-5 sm:gap-5 items-center bg-white shadow-lg p-4 rounded-lg"
            >
              <div className="flex md:gap-25 max-sm:gap-10">
                <img
                  src={item.product.avatar}
                  alt={item.product.name}
                  className="w-28 h-28 object-contain rounded-md"
                />
                <div className="flex flex-col">
                  <h2 className="text-lg font-semibold">{item.product.name}</h2>
                  <p>Price: ₹{item.product.price}</p>
                  <p>Qty: {item.quantity}</p>

                  <p className="text-lg font-semibold">
                    Total = ₹{item.product.price * item.quantity}
                  </p>
                </div>
              </div>
                <button
                  onClick={() => removeFromCart(item.product._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded-lg w-35 h-10 font-bold text-xl cursor-pointer"
                >
                  Remove
                </button>
                <ToastContainer autoClose={1500} />
              </div>
            // </div>
          ))}
        </div>

        {/* Right side - summary */}
        <div className="w-full md:w-1/3 border-2 rounded-3xl p-5 h-fit sticky  top-20 ">
          <h2 className="text-2xl font-bold text-center mb-4">Price Details</h2>

          <div className="flex justify-between mb-2">
            <span>Price ({cartItems.length} items)</span>
            <span>₹{total}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span>Discount (10%)</span>
            <span>-₹{discount}</span>
          </div>
          <div className="flex justify-between mb-2 border-b-2 pb-2">
            <span>Platform Fee</span>
            <span>₹{platformFee}</span>
          </div>
          <div className="flex justify-between mt-4 text-xl font-semibold">
            <span>Total Amount</span>
            <span>₹{finalTotal}</span>
          </div>

          <button className="w-full mt-5 bg-amber-500 text-white py-2 rounded-lg text-lg">
            <Link to="/checkout">
              Proceed to Checkout →
            </Link>
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default UserCart;
