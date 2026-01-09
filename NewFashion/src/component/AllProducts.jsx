import React, { useEffect, useState } from "react";
import { FaStar, FaStarHalf } from "react-icons/fa";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import publicApi from "../pages/api/publicApi.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AllProducts() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
const [error, setError] = useState(false);

useEffect(() => {
  const getResponse = async () => {
    const toastId = toast.loading("Loading products...");
    setLoading(true);
    setError(false);

    try {
      const response = await publicApi.get("/api/products");
      setData(response.data);

      toast.update(toastId, {
        render: "Products loaded successfully ✅",
        type: "success",
        isLoading: false,
        autoClose: 2000,
      });
    } catch (error) {
      setError(true);

      toast.update(toastId, {
        render: "Failed to load products ❌",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  getResponse();
}, []);


  const PRODUCTS_PER_PAGE = 8;

  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(data.length / PRODUCTS_PER_PAGE);

  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
  const endIndex = startIndex + PRODUCTS_PER_PAGE;

  const currentData = data.slice(startIndex, endIndex);

  const SkeletonCard = () => (
  <div className="w-full max-w-[260px] sm:max-w-[280px] md:max-w-[300px]
    bg-white rounded-2xl shadow-md p-3 animate-pulse"
  >
    <div className="aspect-square bg-gray-200 rounded-2xl"></div>

    <div className="mt-3 space-y-2">
      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
      <div className="h-3 bg-gray-200 rounded w-1/2"></div>
      <div className="h-4 bg-gray-200 rounded w-2/3"></div>
    </div>
  </div>
);


  return (
    <>
      <ToastContainer position="top-right" />
      <div
        className="
    flex-grow
   
  grid
  grid-cols-2     
  sm:grid-cols-2
  md:grid-cols-3
  lg:grid-cols-4
  gap-6
  px-4 sm:px-6 lg:px-10
  pt-22
  pb-10
"
      >
      {loading
  ? Array.from({ length: 8 }).map((_, index) => (
      <div key={index} className="flex justify-center">
        <SkeletonCard />
      </div>
    ))
  : error
  ? (
      <div className="col-span-full text-center text-red-500 font-semibold">
        Failed to load products. Please try again later.
      </div>
    )
  : currentData.map((item, index) => (

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
            <div
              className="
        w-full max-w-[260px] sm:max-w-[280px] md:max-w-[300px]
        bg-white rounded-2xl
        shadow-md hover:shadow-xl
        transition-all duration-300
        hover:-translate-y-2
      "
            >
              <Link to={`/detailPage/${item._id}`}>
                <div className="aspect-square overflow-hidden rounded-2xl">
                  <img
                    src={item.avatar}
                    alt={item.title}
                    loading={index < 4 ? "eager" : "lazy"}
                    className="
                w-full h-full
                object-center
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
      <div className="flex justify-center items-center gap-4 mt-8">
        <button
          onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
        >
          Prev
        </button>

        <span className="font-semibold">
          Page {currentPage} of {totalPages}
        </span>

        <button
          onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </>
  );
}

export default AllProducts;
