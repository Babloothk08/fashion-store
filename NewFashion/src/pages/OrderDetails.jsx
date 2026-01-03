import { CheckCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import publicApi from "../pages/api/publicApi.js"

function Order() {
  const [data, setData] = useState([]);
  const token = localStorage.getItem("token");

  const navigate = useNavigate();
  

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }
    const fetchOrders = async () => {
      const res = await publicApi.get("/api/orderDetails", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      console.log("result", res.data);

      setData(res.data.data);
    };
    fetchOrders();
  }, [token, navigate]);

  // const totalPrice = (items = []) =>
  //   items.reduce(
  //     (acc, item) => acc + (item.product?.price || 0) * item.quantity,
  //     0
  //   );

    if (!token) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p className="text-lg font-semibold">Please login to view orders</p>
      </div>
    );
  }

  return (
    <>

      <div className="max-w-9xl mx-auto px-4 py-10 mt-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-stretch">
          {/* LEFT SIDE – ORDERS */}
          <div className="md:col-span-4 h-full">
            <div className="bg-white p-8 rounded-xl shadow h-full flex flex-col">
              <h2 className="text-xl font-bold mb-4">Your Orders</h2>

              <div className="space-y-4 flex-1 overflow-y-auto">
                {data.map((order) =>
                  order.items.map((item) => (
                    <div
                      key={item._id}
                      className="grid md:grid-cols-[auto_1fr_1fr_1.5fr] md:gap-x-4 md:gap-y-4 gap-4 items-center border p-6 rounded-lg w-full"
                    >
                      {/*  Image */}
                      <img
                        src={item.product?.avatar}
                        className="h-20 w-20 object-cover rounded"
                        alt={item.product?.heading}
                      />

                      {/*  Product Details */}
                      <div className="flex-1">
                        <p className="font-semibold">{item.product?.heading}</p>
                        <p>Price: ₹{item.product?.price}</p>
                        <p>Quantity: {item.quantity}</p>
                      </div>

                      {/*  Order Info */}
                      <div className="text-green-600 font-semibold text-sm">
                        {order.status}
                        <p className="text-gray-500">
                          Ordered on: {new Date(order.createdAt).toDateString()}
                        </p>
                        <p className="text-gray-500">
                          Expected Delivery:{" "}
                          {new Date(
                            new Date(order.createdAt).setDate(
                              new Date(order.createdAt).getDate() + 4
                            )
                          ).toDateString()}
                        </p>
                      </div>
                      
                        {order.addressId ? (
                          <div>
                            <h1 className="font-semibold">Delivery Address</h1>
                            <p className="text-gray-400 font-semibold">
                              {order.addressId.name}, {order.addressId.phone}{" "}
                              <br />
                              {order.addressId.address}, {order.addressId.city},{" "}
                              {order.addressId.state} -{" "}
                              {order.addressId.pincode}
                            </p>
                          </div>
                        ) : (
                          <p className="text-red-500 font-semibold">
                            Address not available
                          </p>
                        )}
                     
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Order;
