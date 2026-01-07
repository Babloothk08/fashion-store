import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import publicApi from "../pages/api/publicApi.js"
import Footer from "../component/Footer.jsx";

function SignIn() {
  const [change, setChange] = useState({
    email: "",
    password: "",
    role : "",
  });

  const navigate = useNavigate();
  

  console.log("sss", change);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setChange({ ...change, [name]: value });
    console.log("eee", e);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await publicApi.post(
        "/api/signIn",
        change,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      console.log("RES sining", response);

      localStorage.setItem("token", response.data.accessToken);

      const userRole = response.data.user.role
      toast.success("Login Successfull");
      console.log("role :" , userRole);
      

      
      
      setTimeout(() => {
        if (userRole === "admin") {
          navigate("/admin");
        } else if (userRole === "manager") {
          navigate("/manager");
        } else {
          navigate("/home");   // normal user
        }
      }, 1200);
    } catch (error) {
      console.log("TY", typeof error);

      if (error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Email Not Registered");
      }
    }
    setChange({
      email: "",
      password: "",
    });
  };

  return (
    <>
    <div className="w-full min-h-screen bg-gray-100 flex flex-col md:flex-row items-center justify-center md:gap-15 ">
      <div className="h-52 sm:h-64 md:h-90 pt-7 md:pt-11 md:max-w-7xl ">
        <img
          src="https://im.uniqlo.com/global-cms/spa/res417390df1624974374e1a543fc9a7e32fr.jpg"
          alt="Sign In Banner"
          className="w-full h-[30vh]  md:h-[46vh] object-center md:rounded-2xl"
        />
      </div>
      <form onSubmit={handleSubmit} className=" flex  max-sm:w-full justify-center px-4 mt-38 md:mt-15 md:max-w-7xl">
        <div className="max-sm:w-full max-w-7xl bg-white rounded-2xl shadow-xl p-6 sm:p-8 flex flex-col gap-2">
          <h1 className="text-2xl">Sign In</h1>
          <div className="flex flex-col gap-7 ">
            <input
              type="email"
              name="email"
              value={change.email}
              placeholder="Your Email"
              className="border-1 h-12 p-7 text-xl rounded-xl cursor-pointer"
              onChange={handleChange}
            />
            <input
              type="password"
              name="password"
              value={change.password}
              placeholder="Your Password"
              className="border-1 h-12 p-7 text-xl rounded-xl cursor-pointer"
              onChange={handleChange}
            />
            
          </div>
          <div className="text-white font-bold text-center pt-2 text-3xl bg-yellow-600 h-16 rounded-xl cursor-pointer">
            <button className="cursor-pointer">Continue</button>
            <ToastContainer autoClose={1500} />
          </div>
          <div className="flex justify-around">
            <Link to="/forgotPassword">
              <p className="text-xl font-semibold cursor-pointer">
                Forgot Password ?{" "}
              </p>
            </Link>
            <Link to="/signUp">
              <p className="text-xl font-semibold cursor-pointer">Sign-up</p>
            </Link>
          </div>
        </div>
      </form>
    </div>
    <Footer/>
    </>
    
    
  );
}

export default SignIn;

