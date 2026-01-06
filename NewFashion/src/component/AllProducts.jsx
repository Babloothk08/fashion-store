
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
      const response = await publicApi.get("/api/products");
      setData(response.data);
    };
    getResponse();
  }, []);

  return (
    <div className="
  grid
  grid-cols-2     
  sm:grid-cols-2
  md:grid-cols-3
  lg:grid-cols-4
  gap-6
  px-4 sm:px-6 lg:px-10
  pt-22
">
  {data.map((item, index) => (
    <motion.div
      key={item._id}
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.4,
        delay: Math.min(index * 0.05, 0.3),
        ease: "easeOut",
      }}
      viewport={{ once: true, amount: 0.2 }}
      className="flex justify-center"
    >
      <div className="
        w-full max-w-[260px] sm:max-w-[280px] md:max-w-[300px]
        bg-white rounded-2xl
        shadow-md hover:shadow-xl
        transition-all duration-300
        hover:-translate-y-2
      ">
        <Link to={`/detailPage/${item._id}`}>
          <div className="aspect-square overflow-hidden rounded-2xl">
            <img
              src={item.avatar}
              alt={item.title}
              loading={index < 4 ? "eager" : "lazy"}
              className="
                w-full h-full
                object-cover
                transition-transform duration-500
                hover:scale-110
              "
            />
          </div>
        </Link>

        <div className="p-3 space-y-1">
          <p className="text-sm sm:text-base font-semibold truncate">
            {item.heading}
          </p>

          <div className="flex items-center gap-1 text-yellow-400 text-sm">
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStarHalf />
          </div>

          <p className="font-semibold text-sm sm:text-base">
            Price:{" "}
            <span className="text-lg text-emerald-600 font-bold">
              ₹{item.price}
            </span>
          </p>
        </div>
      </div>
    </motion.div>
  ))}
</div>

  );
}

export default AllProducts;
