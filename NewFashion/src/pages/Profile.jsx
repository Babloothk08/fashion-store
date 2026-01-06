import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import publicApi from "../pages/api/publicApi";

function Profile() {
  const [user, setUser] = useState(null);
  const [lastName, setLastName] = useState("");
  const [mobile, setMobile] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [dots, setDots] = useState("");

  const fetchProfile = async () => {
    const token = localStorage.getItem("token");
    console.log("Token:", token);

    if (!token) return;

    try {
      const response = await publicApi.get("/api/profile", {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      });
      console.log("Profile Response:", response.data);
      setUser(response.data.data);
      // setName(response.data.data)
      setMobile(response.data.data.mobile);
      
      setAddress(response.data.data.address);
      setName(response.data.data.name);
      
      setLastName(response.data.data.lastName);
      
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleUpdate = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await publicApi.put(
        "/api/profile",
        { name, lastName, email: user.email, mobile, address },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      // console.log("Update Response:", response.data);

      const updatedUser = response.data.data;
      console.log("updatedUsr", updatedUser);
      
      setUser(updatedUser)
      setName(updatedUser.name)
      setLastName(updatedUser.lastName)
      setAddress(updatedUser.address)
      setMobile(updatedUser.mobile)
      console.log("mob",mobile);
      
      
    } catch (error) { 
      console.error("error updating profile:", error);
    }
  };

useEffect(()=>{
  setInterval(() => {
    setDots((prev) => prev.length < 3 ? prev + "." : "")
  },500)
},[])

  if (!user) return <p className="flex h-screen w-full items-center justify-center text-4xl">Loading profile{dots}</p>;

  return (
    <>
      <div className="flex flex-col md:flex-row gap-2 mt-[75px] md:px-20 w-full">
        {/* Left Part */}
        <div className="w-full md:w-[30%] ">
          <div className="flex gap-5 h-18 items-center pl-2 shadow-lg">
            <div>
              <img
                src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/profile-pic-male_4811a1.svg"
                alt="profile-pic"
              />
            </div>
            <div>
              <h1>Hello</h1>
              <h2 className="font-bold text-xl">
                {`${user.name}${user.lastName}` || "Name"}
              </h2>
            </div>
          </div>

          <div className="flex gap-5 h-18 items-center shadow-lg">
            <div className="flex pl-5 gap-5">
              <Link to="/orderdetails"><h1 className="pb-1 text-xl font-semibold shadow">My Orders</h1></Link>
            </div>
          </div>

          

          <div className="flex gap-5 h-18 items-center">
            <div className="flex pl-5 gap-5">
              <h1 className="pb-1 text-xl">Payments</h1>
            </div>
          </div>

          <div className="flex flex-col pl-5 pb-10 gap-1 text-xl">
            <p>Gift Cards</p>
            <p>Saved UPI</p>
            <p>Saved Cards</p>
          </div>
          <div className="flex  pl-5 pb-10 gap-1 text-xl">
            <button onClick={handleUpdate} className="shadow-2xl w-25 rounded-xl font-bold text-white text-center bg-green-300 cursor-pointer">UPDATE</button>
          </div>
        </div>

        {/* Right Part */}
        <div className="w-full md:w-[70%] ">
          <div className="flex gap-10 h-18 items-center pl-5 shadow-lg">
            <h1 className="text-xl font-semibold">Personal Information</h1>
          </div>

          <div className="flex gap-7 h-18 items-center pl-5 shadow-lg">
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="outline-none"/>
            <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} className="outline-none"/>
          </div>

          <div className="flex flex-col gap-5 py-5 pl-5 shadow-lg ">
            <div className="flex gap-10">
              <h1 className="text-xl font-semibold">Email Address</h1>
            </div>
            <div className="pl-2 flex flex-wrap">
              <input type="text" value={user.email || ""} className="outline-none w-full bg-transparent" readOnly />
            </div>
          </div>

          <div className="flex flex-col gap-5 py-5 pl-5 shadow-lg">
            <div className="flex gap-10">
              <h1 className="text-xl font-semibold">Password</h1>
            </div>
            <div className="pl-2">
              <input type="password" placeholder="Enter New Password" value={user.password} className="outline-none" />
            </div>
          </div>

          <div className="flex flex-col gap-5 py-5 pl-5 shadow-lg">
            <div className="flex gap-10">
              <h1 className="text-xl font-semibold">Mobile Number</h1>
            </div>
            <div className="pl-2">
              <input type="text" placeholder="Mobile" value={mobile} onChange={(e) => setMobile(e.target.value)} className="outline-none" />
            </div>
          </div>

          <div className="flex flex-col gap-5 py-5 pl-5 shadow-lg">
            <div className="flex  gap-10">
              <h1 className="text-xl font-semibold">Address</h1>
            </div>
            <div className="pl-2 flex flex-wrap ">
              <input type="text" placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} className="w-full outline-none bg-transparent"/>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
