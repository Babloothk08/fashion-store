import React, { useEffect, useState } from "react";
import Navbar from "../component/Navbar";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function CheckOut() {
  const [error, setError] = useState("");
  const [selectedPayment, setSelectedPayment] = useState("");
  const [showForm, setShowForm] = useState(true);
  const [addresses, setAddress] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  
  
  const [cartItem, setCartItems] = useState([]);
  // console.log("cart",cartItem);
  
  const [change, setChange] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

 
 

  // console.log("selectedPayment", selectedPayment);

  const paymentMethods = [
    {
      id: "phonepe",
      img: "https://www.phonepe.com/webstatic/12703/static/PhonePe_vertical-16158be8710408f3561e1d07d01d5d89.png",
    },
    {
      id: "gpay",
      img: "https://animationvisarts.com/wp-content/uploads/2023/11/Frame-43-1.png",
    },
    {
      id: "paytm",
      img: "https://images.yourstory.com/cs/images/companies/27885286451954976638490961843543461413864123n-1684328448765.jpg",
    },
  ];

  const navigate = useNavigate();
  // console.log("addresses",addresses);

  const token = localStorage.getItem("token"); // 🔥 Token lo

  const formChange = () => {
    setShowForm(!showForm);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setChange({ ...change, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("change", change);

    try {
      const AddResponse = await axios.post(
        "http://localhost:8080/api/address",
        change,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json", // 🔥 TOKEN YAHAN BHEJO
          },
        }
      );

      console.log("AddResponse", AddResponse.data);
      await getResponse()
      setShowForm(false);
      // getResponse;
    } catch (error) {
      console.log(error);
    }
  };

  const getCart = async () => {
    const getCartItem = await axios.get("http://localhost:8080/api/cart/get", {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    // console.log("cartResponseItem", getCartItem.data.data.items);
    const cartData = getCartItem.data.data.items;
    setCartItems(cartData);
    console.log("cartItem", cartItem);

    // console.log("A",cartData);
  };

  useEffect(() => {
    getCart();
    getResponse();
  }, []);

  console.log(addresses);

  const getResponse = async () => {

    const response = await axios.get("http://localhost:8080/api/address", {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    // console.log("response 1111111", response);
    setAddress(response.data.data);
  };



  const handlePayementSelect = (id) => {
    if (!selectedId) {
      setError("please select address first");
      console.log("please select address first");

      return;
    }
    setError("");
    setSelectedPayment(id);
  };



  
 const deletedAddress = async(addressId) => {
  const token = localStorage.getItem("token")
 try {
   const res = await axios.delete(`http://localhost:8080/api/address/removeAddress/${addressId}`,{
     headers : {
       Authorization : `Bearer ${token}`,
       "Content-Type" : "application/json"
     }
     
   })
   setAddress(prev =>
  prev.filter(adr => adr._id !== addressId)
);
   console.log("resDel",res);
   console.log("Token", token);
   
 } catch (error) {
  console.log(error.response?.data || error.message)
 } 
 }
 

  
  
  

  const handlePlaceOrder = async() => {
    if(!selectedId || !selectedPayment){
      setError("Please select address and Payment option first")
      return;
    }
    const orderData ={
    addressId: selectedId,
    selectedPayment: selectedPayment,
  }
    try {
      const postOrder = await axios.post("http://localhost:8080/api/order",orderData,{
        headers : {
          Authorization : `Bearer ${token}`,
          "Content-Type" : "application/json"
        }
      })
      console.log("Adding Order", postOrder.data);
      
      setCartItems([])
      setSelectedPayment("")
      setSelectedId(null)
      navigate("/order");
    } catch (error) {
      console.log(error.response?.data || error.message)
    }
  }
  
  
  return (
    <>
      
      <div className="">
        <form
          onSubmit={handleSubmit}
          className="flex max-sm:flex-col max-md:flex-col max-lg:flex-col md:mx-20 max-sm:mx-5  mt-25 gap-5"
        >
          <div className="md:w-2/2 flex flex-col  shadow-2xl rounded-2xl   gap-2">
            <div className="flex max-sm:flex-col md:justify-between py-5 bg-white w-full px-5 shadow-2xl rounded-lg">
              <h1 className="flex font-semibold text-2xl">
                1. Delevering to {change.name}
              </h1>
              <button
                onClick={formChange}
                className="max-sm:flex sm:flex max-sm:pl-6 sm:pl-6 text-blue-800 cursor-pointer"
              >
                Change
              </button>
            </div>
            {showForm && (
              <div className=" py-5 bg-white w-full px-5 shadow-2xl rounded-lg flex flex-col gap-8">
                <h1 className="flex font-semibold text-2xl">
                  2. Delevery Address
                </h1>
                <div className="flex-1 outline-none border p-2 rounded">
                  <h1>Name</h1>
                  <input
                    className="w-full outline-none"
                    name="name"
                    type="text"
                    placeholder="Enter Your Full Name"
                    value={change.name}
                    onChange={handleChange}
                  ></input>
                </div>
                <div className="flex-1 outline-none border p-2 rounded">
                  <h1>Phone</h1>
                  <input
                    className="w-full outline-none"
                    name="phone"
                    type="number"
                    placeholder="Enter Your Phone Number"
                    value={change.phone}
                    onChange={handleChange}
                  ></input>
                </div>
                <div className="flex-1 outline-none border p-2 rounded">
                  <h1>Address</h1>
                  <input
                    className="w-full outline-none"
                    name="address"
                    type="text"
                    placeholder="Enter Your Full Address"
                    value={change.address}
                    onChange={handleChange}
                  ></input>
                </div>
                <div className="flex-1 outline-none border p-2 rounded">
                  <h1>City</h1>
                  <input
                    className="w-full outline-none"
                    name="city"
                    type="text"
                    placeholder="Enter Your Full Address"
                    value={change.city}
                    onChange={handleChange}
                  ></input>
                </div>
                <div className="flex-1 outline-none border p-2 rounded">
                  <h1>State</h1>
                  <input
                    className="w-full outline-none"
                    name="state"
                    type="text"
                    placeholder="Enter Your Full Address"
                    value={change.state}
                    onChange={handleChange}
                  ></input>
                </div>
                <div className="flex-1 outline-none border p-2 rounded">
                  <h1>Pincode</h1>
                  <input
                    className="w-full outline-none"
                    name="pincode"
                    type="number"
                    placeholder="Enter Your Full Address"
                    value={change.pincode}
                    onChange={handleChange}
                  ></input>
                </div>
                <div className="flex-1 outline-none border p-2 rounded">
                  <button
                    type="submit"
                    className="mt-5 bg-green-600 text-white px-5 py-2 rounded-lg cursor-pointer"
                  >
                    {/* {" "} */}
                    Use This Address
                  </button>
                </div>
              </div>
            )}

            {/* ..........................................hide/unhide part..................................................... */}
            {!showForm && (
              <div className="mx-10 mt-5 flex flex-col gap-5">
                {addresses.map((item) => (
                  <div key={item._id} className="py-5">
                    <input
                      type="radio"
                      name="selectedAddress"
                      value={item._id}
                      checked={selectedId === item._id}
                      onChange={() => {
                        console.log("Selected:", item._id);
                        setSelectedId(item._id);
                      }}
                      className="mt-1, cursor-pointer"
                    />
                    <div className="flex max-sm:flex-col max-sm:gap-5 justify-between">
                      <div>
                        <p className=" font-bold">
                          {item.name}, {item.phone}
                        </p>
                        <br />
                        <p>
                          {item.address}, {item.city}, {item.state},{" "}
                          {item.pincode}
                        </p>
                      </div>
                      <button onClick={()=>deletedAddress(item._id)} className="bg-amber-600 text-white md:text-lg font-bold h-7 w-25 rounded-xl mt-2 cursor-pointer">
                        Delete
                      </button>
                    </div>
                  </div>
                ))}

                <button type="button" onClick={formChange} className="mt-5 bg-green-600 text-white px-5 py-2 rounded-lg cursor-pointer">
                  Add / Edit Address
                </button>
              </div>
            )}
          </div>

          {/*...............................................................Right Part...................................  */}
          <div className="w-full md:w-1/2 shadow-xl rounded-xl p-5 h-fit sticky top-20 px-5 flex flex-col gap-5 ">
            {cartItem.map((item) => (
              <div
                key={item._id}
                className="flex justify-around text-center items-center gap-5 border-0 shadow-2xl max-sm:flex-row max-md:flex-row"
              >
                <div className="w-25">
                  <img src={item.product.avatar} />
                  <h1>{item.product.name}</h1>
                </div>
                <div>
                  <p>Price ₹{item.product.price}</p>
                  <p>Quantity - {item.quantity}</p>
                </div>
              </div>
            ))}

            <div className=" w-full">
              <h2 className="text-xl font-bold mt-5">Payment Method</h2>

            {error && (
              <p className="text-red-600 font-semibold mt-3">{error}</p>
            )}
            <div className="flex gap-5">
              {paymentMethods.map((item) => (
                <label
                  key={item._id}
                  className={`cursor-pointer border-4 rounded-xl p-5  mt-5 shadow-2xl ${
                    selectedPayment === item.id
                      ? "border-amber-600"
                      : "border-gray-300"
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value={item.id}
                    checked={selectedPayment === item.id}
                    onChange={() => handlePayementSelect(item.id)}
                    className="hidden"
                  />

                  <img src={item.img} className="h-20 w-20 object-contain " />
                </label>
              ))}
            </div>

            <button type="button"
              onClick={handlePlaceOrder}
              disabled={!selectedId || !selectedPayment}
              className={`w-full mt-5 bg-amber-500 text-white py-2 rounded-lg text-lg cursor-pointer ${
                !selectedId || !selectedPayment
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-amber-500 text-white cursor-pointer"
              }`}
            >
              Total Payable Amount →
            </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default CheckOut;
