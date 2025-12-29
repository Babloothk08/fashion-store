import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { increaseQuantity, decreaseQuantity, removeItem } from "../features/cart/cartSlice";
import Navbar from "../component/Navbar";
import Footer from "../component/Footer";


function Cart() {
  const cart = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const cartTotal = cart.reduce((total, item) => {
    return total + item.product.price * item.quantity;
  }, 0);

  const discountPrice = cartTotal / 10;
  const cartTotalPrice = cartTotal - discountPrice + 5;

  if (cart.length === 0) {
    return <p>Cart have not items</p>;
  }

  return (
    
   <>
    <Navbar/>
    <div className="flex flex-wrap justify-around max-w-full mt-10 pt-10 max-sm:gap-20 mx-10 md:mx-10">
   
      <div className="w-full md:w-2/3  flex flex-col max-sm:pb-15 gap-20"> 
      <h1 className="text-xl md:text-2xl font-bold text-amber-600"><span className="text-5xl text-blue-700">Shopping Cart</span></h1>
        {cart.map((item) => (
          <div key={item.id || item.product.id} className=" flex max-sm:pb-20 max-sm:flex-wrap justify-around   text-xl text-center items-center gap-15 max-sm:gap-4  max-sm:w-70 max-sm:h-70 w-40 h-40 py-5 ">
            <img src={item.product.image} alt=""className="w-full h-full object-contain rounded-lg" />
            <div className="flex gap-5 text-center items-center">
              <button onClick={() => dispatch(increaseQuantity(item.product.id))} className="bg-green-500  text-2xl text-center w-8 rounded-2xl text-white cursor-pointer">
                +
              </button>
              <span>{item.quantity}</span>
              <button onClick={() => dispatch(decreaseQuantity(item.product.id))} className=" bg-red-500 text-2xl text-center w-8 rounded-2xl text-white cursor-pointer">
                -
              </button>
            </div>
            <div className=" h-10 ">
              <button onClick={() => dispatch(removeItem(item.product.id))} className="bg-amber-500 text-xl text-center w-35 h-8 rounded-2xl text-white cursor-pointer">Remove</button>
            </div>
            <div className=" h-10 flex ">
             <h1 className="w-35 text-2xl font-bold">Total Price : </h1>
              <p className="text-2xl">₹{item.product.price * item.quantity}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="w-full md:w-1/3  flex flex-col border-2 rounded-3xl p-5 sticky top-25 h-fit">
        <div className="flex flex-col justify-between gap-6">
          <h1 className="text-2xl font-semibold text-center">Price Details</h1>
          <div className="flex  justify-between gap-45">
             <span>Price ({cart.length} Items)</span>
            <span>₹{cartTotal}</span>
          </div>
          <div className="flex  justify-between">
            <span>Discount(10%)</span>
            <span>-10%</span>
          </div>
          <div className="flex justify-between  border-b-4 border-blue-500 pb-5">
            <span>Plateform Fee</span>
            <span>₹5</span>
          </div>
         </div>
         <div className="flex justify-between py-6 text-xl font-semibold">
          <h1>Total Amount</h1>
          <p>₹{cartTotalPrice}</p>
         </div>
         <button className="text-xl text-white bg-amber-500 w-full h-10 rounded-2xl cursor-pointer">Proceed To CheckOut ---</button>
      </div>
    </div>
    <Footer/>
   </>

  );
}

export default Cart;





