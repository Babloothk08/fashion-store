import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
// import { useSelector, useDispatch } from "react-redux"

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
      const response = await axios.post(
        "http://localhost:8080/api/signIn",
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
          navigate("/productAccess");
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
      // role : "",
    });
  };

  return (
    <div className=" w-full min-h-screen px-4 py-10 pt-30  p-25 flex flex-col justify-center  items-center shadow-md bg-[url('https://im.uniqlo.com/global-cms/spa/res417390df1624974374e1a543fc9a7e32fr.jpg')] bg-cover bg-center">
      <form onSubmit={handleSubmit}>
        <div className="w-full max-w-[500px] rounded-lg shadow-2xl bg-white p-8 flex flex-col justify-start gap-7 ">
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
            {/* <select 
            name="role"
            value={change.role}
            onChange={handleChange}
            className="border-1 h-12 px-4 text-xl rounded-xl cursor-pointer"
            >
              <option value="user">User</option>
              <option value="manager">Manager</option>
              <option value="admin">Admin</option>
            </select> */}
          </div>
          {/* {msg && <p className='text-red-600 text-lg'>{msg}</p>} */}
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
  );
}

export default SignIn;

// const handleSubmit = async (e) => {
//   e.preventDefault();
//   try {
//     const response = await axios.post(
//       "http://localhost:8080/api/signIn",
//       change,
//       { headers: { "Content-Type": "application/json" } }
//     );

//     console.log("RES", response.data);

//     // ✅ Store token
//     localStorage.setItem("token", response.data.token);

//     toast.success("Login Successful", {
//       onClose: () => navigate('/')
//     });

//   } catch (error) {
//     if(error.response?.data?.message){
//       toast.error(error.response.data.message)
//     } else {
//       toast.error("Email Not Registered")
//     }
//   }
// };
