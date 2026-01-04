import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { FaStarHalf } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { motion } from "framer-motion"; 
import publicApi from "../pages/api/publicApi.js"


function Data() {

  const [change, setChange] = useState([]);
  const token = localStorage.getItem("token"); // user login token

  
  const fetchData = async () => {
    try {
      const response = await publicApi.get("/api/products", {
        headers: {
          "Content-Type": "application/json",
        },
      });
       console.log("data", response)
      setChange(response.data);
      console.log("response", response.data);
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };


 const handleAddToCart = async (productId) => {
  if (!token) {
    alert("Please login first!");
    return;
  }

  try {
    const res = await publicApi.post(
      "/api/cart/add",
      { productId, quantity: 1 },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    alert(" Product added to cart!");
    console.log("Cart Response:", res.data);
  } catch (error) {
    console.error("Error adding to cart:", error.response?.data || error.message);
    alert("Error adding to cart!");
  }
};


  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
     <div>
      <div className="mt-18">
      <img src="https://cms.landmarkshops.in/cdn-cgi/image/w=1232,q=85,fit=cover/LS-Fest/LS-new/desktop-dept-6modblk-oneBythree-A-Women-15Oct25.jpg" alt="" className="w-[100vw] object-cover max-sm:object-center sm:object-center h-90" />
     </div>
   
    <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 px-10">
      {change.map((item, index) => (
        <motion.div
        key= {item._id}
        initial = {{opacity:0, y:-80}}
        whileInView={{opacity:1, y:0}}
        transition={{
          duration : 0.6,
          delay: index * 0.05 > 0.3 ? 0.3 : index * 0.05,
          ease : "easeOut",
        }}
        viewport={{once:true, amount:0.2}}
        className="w-full pt-10 flex flex-col justify-center"
        >
        {/* <div
          key={item.id}
          className="rounded-2xl  w-75 flex-col  overflow-hidden bg-white shadow-lg"
        > */}
          <Link to={`/detailPage/${item._id}`}>
            <img
              src={item.avatar}
              alt={item.title}
              className="cursor-pointer transition-transform duration-300 hover:scale-105 rounded-2xl w-80 h-70 object-center"
            />
          </Link>
          <div className="p-5 ">
            <label className="text-lg font-bold">{item.heading}</label>
            <div className="flex justify-between">
              
              <div className="flex w-full justify-between">
                <div className="font-semibold text-lg">Ratings</div>
                <div className="flex text-yellow-400 p-1 px-5">
                  <FaStar className="" />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStarHalf />
                </div>
              </div>
            </div>
            <div className="flex w-full justify-between">
              <h1 className="font-semibold text-lg">Price</h1>
              <div className="flex gap-2 px-7">
                <p className=" line-through">{item.discount}</p>
                <p className="font-semibold">₹{item.price}</p>
              </div>
            </div>
            <div className="flex justify-between mt-3">
              <button
                className=" px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition cursor-pointer"
                onClick={() => handleAddToCart(item._id)}
              >
                Add To Cart
              </button>
              <h1 className="cursor-pointer px-7 py-2 text-xl">
                <FaRegHeart />
              </h1>
            </div>
          </div>
        {/* </div> */}
        </motion.div>
      ))}
    </div>
     </div>
     </>
  );
}

export default Data;
