
import React, { useEffect, useState } from "react";
import { FaStar, FaStarHalf } from "react-icons/fa";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import publicApi from "../pages/api/publicApi.js";

function AllProducts() {
  const [data, setData] = useState([]);
  console.log("allProducts", data);
  useEffect(() => {
    const getResponse = async () => {
      const response = await publicApi.get("/api/products", {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setData(response.data);
    };
    getResponse();
  }, []);

  return (
    <div className=" grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 px-10 pt-10">
      {data.map((item, index) => (
        <motion.div
          key={item._id}
          initial={{ opacity: 0, y:100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.4,
            delay: index * 0.05 > 0.3 ? 0.3 : index * 0.05,
            ease: "easeOut",
          }}
          viewport={{ once: true, amount: 0.2 }}
          className="w-full pt-10 flex justify-center"
        >
          <div className="overflow-hidden  bg-white rounded-2xl shadow transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
            <Link to={`/detailPage/${item._id}`}>
              <div className="overflow-hidden w-80 h-80 rounded-2xl ">
                <img
                  src={item.avatar}
                  alt={item.title}
                  className="w-full  transition-transform hover:scale-110 object-center ease-in-out duration-500 h-full cursor-pointer rounded-2xl"
                />
              </div>
            </Link>

            <div className="items-start p-2">
              <p className="text-xl font-semibold">{item.heading}</p>
              <div className="flex gap-1">
                <div className="font-semibold">Ratings :</div>
                <div>
                  <p className="flex text-yellow-400 p-1">
                    <FaStar className="" />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStarHalf />
                  </p>
                </div>
              </div>
              <p className="font-semibold">
                Price: <span className="font-sans text-xl">₹{item.price}</span>
              </p>
            </div>
          </div>
          {/* </div> */}
        </motion.div>
      ))}
    </div>
  );
}

export default AllProducts;
