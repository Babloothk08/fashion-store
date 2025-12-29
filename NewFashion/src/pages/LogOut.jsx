// import axios from "axios";
// import React, { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { ToastContainer, toast } from "react-toastify";

function LogOut() {
  // const navigate = useNavigate();
  

  // useEffect(() => {
    

  //   if (!token) {
  //     console.log("No token found, user not logged in");
  //     navigate("/");
  //     return;
  //   }

  //   const logOutUser = async () => {
  //     try {
  //       const response = await axios.post(
  //         "http://localhost:8080/api/logOut", // ✅ lowercase route
  //         {},
  //         {
  //           headers: {
  //             Authorization: `Bearer ${token}`,
  //           },
  //         }
  //       );
  //       console.log("Logout successful:", response.data);
  //       // localStorage.removeItem("token");
  //       toast.success(response.data.message);
  //       localStorage.removeItem("token");
  //       navigate("/");
  //     } catch (error) {
  //       console.error("Logout error:", error.response?.data || error.message);
  //       localStorage.removeItem("token");
  //       navigate("/");
  //     }
  //   };

  //   logOutUser();
  // }, [navigate]);

  return <div>Logging out...</div>;
}

export default LogOut;
