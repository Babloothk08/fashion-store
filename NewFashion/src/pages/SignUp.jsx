
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import publicApi from "../pages/api/publicApi.js"

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
    <div className="w-full  min-h-screen  pt-5    flex flex-col justify-center  items-center shadow-md bg-[url('https://im.uniqlo.com/global-cms/spa/res24ab4b5656b77c964dadd271276af132fr.jpg')] bg-cover bg-center">
      <form onSubmit={handleSubmit}>
        <div className="w-full max-w-2xl rounded-2xl shadow-2xl bg-red-100  p-5 flex flex-col justify-start gap-2 ">
          <h1 className="text-3xl  font-semibold text-center ">
            Registration{" "}
          </h1>
          <div className="flex  justify-center flex-wrap gap-5 ">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                 <label className="text-xl font-semibold">Name</label>
                <input
                  type="text"
                  name="name"
                  value={change.name}
                  placeholder="Name"
                  className="border h-12 p-4 text-lg rounded-lg"
                  onChange={clickOnChange}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xl font-semibold">LastName</label>
                <input
                  type="text"
                  name="lastName"
                  value={change.lastName}
                  placeholder="Last Name"
                  className="border h-12 p-4 text-lg rounded-lg"
                  onChange={clickOnChange}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-xl font-semibold">Email</label>
                <input
                  type="email"
                  name="email"
                  value={change.email}
                  placeholder="Email Address"
                  className="border h-12 p-4 text-lg rounded-lg"
                  onChange={clickOnChange}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xl font-semibold">Password</label>
                <input
                  type="password"
                  name="password"
                  value={change.password}
                  placeholder="Password"
                  className="border h-12 p-4 text-lg rounded-lg"
                  onChange={clickOnChange}
                />
              </div>
              
            </div>
          </div>
          {/* {msg && <p className='text-red-600 text-lg'>{msg}</p>} */}
          <div className="text-white text-center pt-3  text-3xl  h-16 rounded-xl cursor-pointer">
            <button
              type="submit"
              className="cursor-pointer text-3xl w-50 h-13 rounded-xl font-bold bg-yellow-600"
            >
              Continue
            </button>
            <ToastContainer position="top-right" autoClose={1000} />
          </div>
          <div className="flex justify-around">
            <p className="text-xl ">Already Registered </p>
            <Link to="/">
              <p className="text-xl font-semibold cursor-pointer">Sign-In</p>
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}

export default SignUp;
