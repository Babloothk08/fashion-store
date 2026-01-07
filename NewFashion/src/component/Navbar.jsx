import React, { useState } from "react";
import { IoSearch } from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { IoCartSharp } from "react-icons/io5";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import publicApi from "../pages/api/publicApi.js";

function Navbar({ search, setSearch, handleSearch }) {
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
      localStorage.removeItem("token");
      console.log("userlogout", response);
      toast("user logout successfully");
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error.response?.data || error.message);
    }
  };

  return (
    <header className="fixed top-0 z-30 w-full bg-gradient-to-r from-slate-600 via-slate-800 to-slate-900 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link
          to="/home"
          className="text-2xl sm:text-3xl font-extrabold tracking-wide"
        >
          <span className="text-white">Fashion</span>
          <span className="bg-gradient-to-r from-orange-400 to-amber-500 bg-clip-text text-transparent">
            Store
          </span>
        </Link>

        <Link
          to="/home"
          className=" text-xl font-semibold  md:hidden"
        >
          
          <span className="text-white bg-clip-text">
            Home
          </span>
        </Link>

        <nav className="hidden md:flex gap-10 text-sm font-semibold text-gray-300 ">
          {[
            { name: "Home", path: "/home" },
            { name: "Shop", path: "/data" },
            { name: "About", path: "/about" },
          ].map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `transition-all hover:text-orange-400 ${
                  isActive
                    ? "text-orange-400 border-b-2 border-orange-400 pb-1"
                    : ""
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-4 sm:gap-6 pr-2">
          <div className="hidden lg:flex items-center gap-2 bg-slate-700 px-3 py-1.5 rounded-full">
            <IoSearch
              className="text-gray-300 cursor-pointer"
              onClick={handleSearch}
            />
            <input
              type="text"
              placeholder="Search products"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-transparent text-sm focus:outline-none text-white placeholder-gray-400 w-40"
            />
          </div>

          <FaRegHeart className="hidden sm:block text-xl text-gray-300 hover:text-orange-400 cursor-pointer" />

          <div className="relative">
            <CgProfile
              className="text-2xl text-gray-300 hover:text-orange-400 cursor-pointer"
              onClick={() => setOpen(!open)}
            />

            {open && (
              <div className="absolute right-0 mt-3 w-36 rounded-xl bg-white text-gray-800 shadow-xl text-sm overflow-hidden">
                <Link to="/profile">
                  <p
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => setOpen(false)}
                  >
                    Profile
                  </p>
                </Link>

                {isLoggedIn ? (
                  <p
                    onClick={() => {
                      setOpen(false);
                      handleLogout();
                    }}
                    className="px-4 py-2 hover:bg-red-100 text-red-600 cursor-pointer"
                  >
                    Logout
                  </p>
                ) : (
                  <>
                    <Link to="/">
                      <p
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => setOpen(false)}
                      >
                        Sign In
                      </p>
                    </Link>
                    <Link to="/signUp">
                      <p
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
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

          <Link to="/userCart" className="relative">
            <IoCartSharp className="text-2xl text-gray-300 hover:text-orange-400" />
            {uniqueCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs font-bold px-2 rounded-full">
                {uniqueCount}
              </span>
            )}
          </Link>
        </div>
      </div>
      <div className="md:hidden px-4 pb-3">
        <div className="flex items-center gap-2 bg-slate-700 px-4 py-2 rounded-full">
          <IoSearch className="text-gray-300" onClick={handleSearch} />
          <input
            type="text"
            placeholder="Search products"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent text-sm focus:outline-none text-white w-full"
          />
        </div>
      </div>
    </header>
  );
}

export default Navbar;
