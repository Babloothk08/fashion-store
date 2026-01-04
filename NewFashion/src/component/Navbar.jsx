import React, {  useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { IoCartSharp } from "react-icons/io5";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import publicApi from "../pages/api/publicApi.js";

function Navbar({search, setSearch, handleSearch}) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart.items);
  const uniqueCount = cart.length;
  const isLoggedIn = !!localStorage.getItem("token");

 
   const handleLogout = async () => {
     const token = localStorage.getItem("token");
      try {
        const response = await publicApi.post(
          "/api/logOut", 
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        localStorage.removeItem('token')
       console.log("userlogout", response)
        toast("user logout successfully")
        navigate("/")

      } catch (error) {
        console.error("Logout error:", error.response?.data || error.message);
      }
    };

  const visible = () => {
    setOpen(!open);
  };
  return (
    <div className="fixed top-0 m-0 z-20 h-18 items-center text-center w-full flex justify-between  px-3  bg-white-800 shadow-xl bg-white max-sm:flex max-sm:justify-between ">
      <div className="  cursor-pointer ">
        <Link to="/home" className="text-2xl font-bold">
          FashionStore
        </Link>
      </div>
      <div className="flex  ml-auto gap-18 cursor-pointer max-sm:pl-2 max-sm:gap-4 ">
        <div className="max-sm:hidden">
          <NavLink
          to="/home"
          className={({ isActive }) =>
            ` cursor-pointer transition-transform hover:scale-120 hover:underline hover:underline-offset-8 hover:font-bold hover:text-[#4DA6FF] hover:text-shadow-lg  ${
              isActive
                ? "scale-120 underline underline-offset-8 font-bold text-[#4DA6FF] text-shadow-lg "
                : ""
            }`
          }
        >
          Home
        </NavLink>
        </div>

        <div className="">
          <NavLink
          to="/data"
          className= {({ isActive }) =>
            ` cursor-pointer transition-transform hover:scale-120 hover:underline hover:underline-offset-8 hover:font-bold hover:text-[#4DA6FF] hover:text-shadow-lg  ${
              isActive
                ? "scale-120 underline underline-offset-8 font-bold text-[#4DA6FF] text-shadow-lg "
                : ""
            }`
          }
        >
          SHOP
        </NavLink>
        </div>

        <div className="max-sm:hidden">
          <NavLink
          to="/about"
          className={({ isActive }) =>
            ` cursor-pointer transition-transform hover:scale-120 hover:underline hover:underline-offset-8 hover:font-bold hover:text-[#4DA6FF] hover:text-shadow-lg  ${
              isActive
                ? "scale-120 underline underline-offset-8 font-bold text-[#4DA6FF] text-shadow-lg "
                : ""
            }`
          }
        >
          ABOUT
        </NavLink>
        </div>
       
      </div>
      <div className="flex  gap-8 items-center text-10 ml-auto cursor-pointer  ">
        <div className="flex w-60 h-8 rounded-full pl-4 bg-neutral-100 gap-3 items-center max-sm:hidden">
          <IoSearch onClick={handleSearch}/>
          <input
            type="text"
            placeholder="Search your products"
            className="focus:outline-none"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value)
            }
          }
            
          />
          
        </div>
        <div className="flex gap-8 ">
          <FaRegHeart className="cursor-pointer max-sm:hidden" />

          <div className="relative">
            <CgProfile className="cursor-pointer max-sm:text-xl" onClick={visible} />
            {open && (
              <div className="mt-7  bg-amber-500 text-white p-2 font-bold rounded-2xl  w-30 h-25 absolute  left-[-50px]">
                <Link to="/profile">
                  <p
                    className="cursor-pointer hover:text-amber-600"
                    onClick={() => setOpen(false)}
                  >
                    Profiles
                  </p>
                </Link>

               {isLoggedIn ? (
                 <Link to="/">
                  <p
                    className="cursor-pointer hover:text-amber-600"
                    onClick={() => {
                      setOpen(false);
                      handleLogout();
                    }}
                  >
                    Log Out
                  </p>
                </Link>
               ): (
                <>
                <Link to="/">
                  <p
                    className="cursor-pointer hover:text-amber-600"
                    onClick={() => setOpen(false)}
                  >
                    Sign In
                  </p>
                </Link>
                <Link to="/signUp">
                  <p
                    className="cursor-pointer hover:text-amber-600"
                    onClick={() => setOpen(false)}
                  >
                    Sign Up
                  </p>
                </Link>
                </>
               )}
              </div>
            )}
          </div>
          <Link to="/userCart" className="relative ">
            <IoCartSharp className="cursor-pointer text-xl " />
            {uniqueCount > 0 && (
              <span className="absolute -top-4  -right-1 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                {uniqueCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
