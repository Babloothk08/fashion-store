
import { CheckCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import publicApi from "../pages/api/publicApi.js"

function Order() {
  const[data, setData] = useState([])
  console.log(data);
  
  const token = localStorage.getItem("token")
  
  useEffect(() => {
    if(!token){
      return
    }
    const fetchOrder = async() => {
      const res = await publicApi.get("/api/orderDetails",{
        headers : {
          Authorization : `Bearer ${token}`,
          "Content-Type" : "application/json"
        }
      })
      console.log("res",res.data.data);  
      setData(res.data.data)
    }
    fetchOrder()
  },[token])
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-bl from-amber-200  px-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 text-center animate-fade-in">

      
        <div className="flex justify-center">
          <CheckCircle className="text-emerald-500 w-20 h-20" />
        </div>

      
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mt-4">
          Order Placed Successfully 🎉
        </h1>

       
        {data.length > 0 && (
          <p className="mt-2 text-gray-600">
            Order ID:
            <span className="font-semibold">
              {" "}#{data[0]._id}
            </span>
          </p>
        )}
      
        <div className="bg-emerald-50 rounded-xl p-4 mt-4">
          <p className="text-gray-700">
            Thank you for your purchase! Your order has been confirmed and will
            be delivered soon.
          </p>
        </div>

     
        <div className="flex flex-col sm:flex-row gap-3 mt-6">
          <Link
            to="/home"
            className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-2 rounded-lg font-semibold transition"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Order;
