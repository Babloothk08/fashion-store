import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import Navbar from "../component/Navbar";

function Product() {
  const [change, setChange] = useState({
    name: "",
    heading: "",
    price: "",
    quantity: "",
    avatar: null,
    // coverImage: "",
  });

  const token = localStorage.getItem("token")
  // const navigate = useNavigate();

  const clickOnChange = (e) => {
    const { name, value } = e.target;
    setChange({ ...change, [name]: value });
  };
console.log(change)
  const handleSubmit = async (e) => {
    e.preventDefault();

   

    const formData = new FormData();
    formData.append("name", change.name);
    formData.append("heading", change.heading);
    formData.append("price", change.price);
    formData.append("quantity", change.quantity);
    if (change.avatar) formData.append("avatar", change.avatar);
    if (change.coverImage) formData.append("coverImage", change.coverImage);
   
    try {
      const response = await axios.post(
        "http://localhost:8080/api/addProduct",
        formData,
        {
          headers: {
            Authorization : `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Product added successful", response.data);
      console.log("gettt", response);

      // ✅ Success message
      toast.success(response.data.message);

      // navigate to login page after 2 sec delay (so user sees popup)
      // setTimeout(() => {
      //   navigate("/data");
      // }, 2000);
    } catch (error) {
      console.log("failed to access", error);

      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error(error.response.data.message);
      } else {
        // agar backend se kuch bhi nahi mila (network error etc.)
        toast.error("Something went wrong ❌");
      }
    }

    setChange({
      name: "",
      heading: "",
      price: "",
      quantity: "",
      avatar: "",
      coverImage: "",
    });
  };
  return (
    <>
    {/* <Navbar/> */}
     <div className="w-full min-h-screen px-4 pt-20   p-25   flex flex-col justify-center  items-center shadow-md bg-[url('https://im.uniqlo.com/global-cms/spa/res24ab4b5656b77c964dadd271276af132fr.jpg')] bg-cover ">
      <form onSubmit={handleSubmit}>
        <div className="w-full rounded-4xl shadow-lg bg-amber-100  p-4 flex flex-col justify-start ">
          <h1 className="text-4xl pb-4 font-semibold text-center ">
            Add Products{" "}
          </h1>
          <div className="grid grid-cols-1 md:grid col-end-2 gap-1">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="flex flex-col ">
                 <label className="text-lg font-semibold">Name</label>
                <input
                  type="text"
                  name="name"
                  value={change.name}
                  placeholder="Name"
                  className="border h-12 px-4 text-lg rounded-lg"
                  onChange={clickOnChange}
                />
              </div>
              <div className="flex flex-col ">
                 <label className="text-lg font-semibold">Heading</label>
                <input
                  type="heading"
                  name="heading"
                  value={change.heading}
                  placeholder="Heading"
                  className="border h-12 px-4 text-lg rounded-lg"
                  onChange={clickOnChange}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="flex flex-col ">
                 <label className="text-lg font-semibold">Prices</label>
                <input
                  type="number"
                  name="price"
                  value={change.price}
                  placeholder="Price"
                  className="border h-12 px-4 text-lg rounded-lg"
                  onChange={clickOnChange}
                />
              </div>
              <div className="flex flex-col">
                 <label className="text-lg font-semibold">Quantity</label>
                <input
                  type="number"
                  name="quantity"
                  value={change.quantity}
                  placeholder="Quantity"
                  className="border h-12 px-4 text-lg rounded-lg"
                  onChange={clickOnChange}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="flex flex-col ">
                 <label className="text-lg font-semibold">Avatar</label>
                <input
                  type="file"
                  name="avatar"
                  // value={change.avatar}
                  placeholder="avatar Url"
                  className="border h-12 px-4 text-lg rounded-lg"
                  onChange={(e) =>
                    setChange({ ...change, avatar: e.target.files[0] })
                  }
                />
              </div>
              {/* <div className="flex flex-col gap-2">
                 <label className="text-lg font-semibold">Cover Image</label>
                <input
                  type="file"
                  name="coverImage"
                  // value={change.coverImage}
                  placeholder="Cover Image Url"
                  className="border h-12 px-4 text-lg rounded-lg"
                  onChange={(e) =>
                    setChange({ ...change, coverImage: e.target.files[0] })
                  }
                />
              </div> */}
            </div>
          </div>
          {/* {msg && <p className='text-red-600 text-lg'>{msg}</p>} */}
          <div className="text-white text-center pt-1  text-3xl  h-16 rounded-xl cursor-pointer">
            <button
              type="submit"
              className="cursor-pointer text-xl w-40 h-10 rounded-xl font-bold bg-yellow-600 mt-5"
            >
              Continue
            </button>
            <ToastContainer position="top-right" autoClose={1000} />
          </div>
          <div className="flex justify-around mt-2">
            <p className="text-xl ">Already Registered </p>
            <Link to="/home">
              <p className="text-xl font-semibold cursor-pointer">
                All Data
              </p>
            </Link>
          </div>
        </div>
      </form>
    </div>
    </>
  );
}

export default Product;


