import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import publicApi from "../pages/api/publicApi.js"

function DetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState(null);
  const [singlePage, setSinglePage] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);

  const token = localStorage.getItem("token");


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await publicApi.get("/api/data");
        const product = response.data.find((item) => item._id === id);
        setData(product);
        setSinglePage(product?.avatar);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, [id]);

  

  const handleAddToCart = async () => {
    if (!token) {
      alert("Please login first!");
      return;
    }

    if (!selectedSize) {
      alert("Please select size!");
      return;
    }

    try {
      await publicApi.post(
        "/api/cart/add",
        {
          productId: data._id,
          quantity: 1,
          size: selectedSize,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Product added to cart!");
    } catch (error) {
      console.error(error);
      alert(" Error adding to cart");
    }
  };


  const handleBuyNow = async () => {
    if (!token) {
      alert("Please login first!");
      return;
    }

    if (!selectedSize) {
      alert("Please select size!");
      return;
    }

    try {
      await publicApi.post(
        "/api/cart/add",
        {
          productId: data._id,
          quantity: 1,
          size: selectedSize,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      navigate("/checkout");
    } catch (error) {
      console.error(error);
      alert(" Error");
    }
  };

  if (!data) {
    return <p className="text-center py-10">Loading product...</p>;
  }

  return (
    <>

      <div className="max-w-7xl mx-auto px-4 mt-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          
          <div className="flex flex-col items-center gap-6">
            <img
              src={singlePage}
              alt="product"
              className="w-full max-w-md h-[420px] object-contain rounded-xl cursor-pointer"
            />

            <div className="flex gap-4">
              {[data.avatar, data.coverImage].map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt=""
                  onClick={() => setSinglePage(img)}
                  className={`w-18 h-24 object-contain border rounded-lg cursor-pointer
                    ${
                      singlePage === img
                        ? "border-amber-500"
                        : "border-gray-300"
                    }`}
                />
              ))}
            </div>
          </div>

          



          <div className="flex flex-col gap-6">

            <h1 className="text-3xl font-bold">{data.heading}</h1>

            <div className="flex gap-4 items-center">
              <p className="text-2xl font-semibold text-green-600">
                ₹{data.price}
              </p>
              {data.discount && (
                <p className="line-through text-gray-400">
                  ₹{data.discount}
                </p>
              )}
            </div>

            



            <div>
              <h2 className="font-semibold text-lg mb-2">Select Size</h2>

              <div className="flex gap-3 flex-wrap">
                {["S", "M", "L", "XL", "XXL"].map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`border px-5 py-2 rounded-lg transition cursor-pointer
                      ${
                        selectedSize === size
                          ? "bg-black text-white border-black"
                          : "border-gray-300 hover:border-black"
                      }`}
                  >
                    {size}
                  </button>
                ))}
              </div>

              {!selectedSize && (
                <p className="text-red-500 text-sm mt-2">
                  Please select a size
                </p>
              )}
            </div>

            


            <div className="flex gap-4 flex-wrap">
              <button
                disabled={!selectedSize}
                onClick={handleAddToCart}
                className={`px-6 py-3 rounded-xl font-semibold w-full sm:w-[200px]
                  ${
                    selectedSize
                      ? "bg-amber-400 hover:bg-amber-500 text-white cursor-pointer"
                      : "bg-gray-300 cursor-not-allowed"
                  }`}
              >
                Add To Cart
              </button>

              <button
                disabled={!selectedSize}
                onClick={handleBuyNow}
                className={`px-6 py-3 rounded-xl font-semibold w-full sm:w-[200px]
                  ${
                    selectedSize
                      ? "bg-amber-600 hover:bg-amber-700 text-white cursor-pointer"
                      : "bg-gray-300 cursor-not-allowed"
                  }`}
              >
                Buy Now
              </button>
            </div>
            
            <div className="pt-6 border-t">
              <h2 className="text-xl font-bold mb-2">Why Shop From Here?</h2>
              <ul className="space-y-2 text-gray-700">
                <li>🚀 Superfast Delivery</li>
                <li>💰 Best Prices & Offers</li>
                <li>🛍 Wide Assortment</li>
              </ul>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}

export default DetailPage;
