
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import publicApi from "../pages/api/publicApi.js"
import Footer from "../component/Footer.jsx";

function SignUp() {
  const [change, setChange] = useState({
    name: "",
    lastName: "",
    email: "",
    password: "",
  });
  console.log("role", change.role);

  const navigate = useNavigate();

  const clickOnChange = (e) => {
    const { name, value } = e.target;
    setChange({ ...change, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("cc", change);

    try {
      const getResponse = await publicApi.post(
        "/api/register",
        change,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("registration successful", getResponse.data);

     
      toast.success(getResponse.data.message);

      // navigate to login page after 2 sec delay (so user sees popup)
      setTimeout(() => {
        navigate("/");
      }, 2000);
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
        toast.error("Something went wrong ");
      }
    }

    setChange({
      name: "",
      lastName: "",
      email: "",
      password: "",
    });
  };

 return (
  <div>
    <div className="w-full min-h-screen bg-gray-100 flex flex-col md:flex-row items-center justify-center md:gap-15">

   
    <div className=" h-52 sm:h-64 md:h-90 pt-24 md:pt-11   md:max-w-7xl ">
      <img
        src="https://im.uniqlo.com/global-cms/spa/res24ab4b5656b77c964dadd271276af132fr.jpg"
        alt="Signup Banner"
        className="w-full h-[30vh]  md:h-[46vh] object-center md:rounded-2xl"
      />
    </div>

   
    <form
      onSubmit={handleSubmit}
      className="flex  max-sm:w-full justify-center px-4 mt-38 md:mt-15 md:max-w-7xl "
    >
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-xl p-6 sm:p-8 flex flex-col gap-2">

        <h1 className="text-2xl sm:text-3xl font-semibold text-center">
          Registration
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-base font-semibold">Name</label>
            <input
              type="text"
              name="name"
              value={change.name}
              placeholder="First Name"
              className="border h-9 px-3 rounded-lg"
              onChange={clickOnChange}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-base font-semibold">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={change.lastName}
              placeholder="Last Name"
              className="border h-9 px-3 rounded-lg"
              onChange={clickOnChange}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-base font-semibold">Email</label>
            <input
              type="email"
              name="email"
              value={change.email}
              placeholder="Email Address"
              className="border h-9 px-3 rounded-lg"
              onChange={clickOnChange}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-base font-semibold">Password</label>
            <input
              type="password"
              name="password"
              value={change.password}
              placeholder="Password"
              className="border h-9 px-3 rounded-lg"
              onChange={clickOnChange}
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full h-12 bg-yellow-600 text-white text-lg font-bold rounded-xl hover:bg-yellow-700 transition"
        >
          Continue
        </button>

        <ToastContainer position="top-right" autoClose={1000} />

        <div className="flex justify-center gap-2 text-sm sm:text-base">
          <p>Already Registered?</p>
          <Link to="/" className="font-semibold text-blue-600">
            Sign In
          </Link>
        </div>
      </div>
    </form>
  </div>
  <Footer/>
  </div>
);

}

export default SignUp;
