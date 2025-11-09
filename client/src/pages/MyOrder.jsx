import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../component/Title";
import { useState } from "react";
import { useEffect } from "react";

const MyOrder = () => {
  const { currency, user, axios } = useContext(ShopContext);
  const [orders, setOrders] = useState([]);

  const loadOrderData = async () => {
    if (!user) return; 
    try {
      const { data } = await axios.post("/api/order/userorders");
      if (data.success) {
        setOrders(data.orders);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadOrderData();
  }, [user]);

  return (
    <div className="max-padd-container py-16 pt-28">
      <Title title1="My Orders" title2="List" titleStyles="pb-10" />

      {orders.map((order) => (
        <div
          key={order._id}
          className="border border-gray-200 rounded-xl p-5 mb-8 bg-white shadow-sm hover:shadow-md transition-shadow duration-300"
        >
          {/* BOOK ITEMS */}
          <div className="space-y-4">
            {order.items.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-4 border-b border-gray-100 pb-3 last:border-none"
              >
                <img
                  src={item.product.image[0]}
                  alt={item.product.name}
                  className="h-20 w-20 object-contain rounded-lg border"
                />
                <div className="flex flex-col flex-1">
                  <h5 className="font-semibold text-gray-800 line-clamp-1">
                    {item.product.name}
                  </h5>
                  <p className="text-sm text-gray-500 mt-1">
                    Price: {currency}
                    {item.product.offerPrice.toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* ORDER SUMMARY */}
          <div className="mt-5 border-t border-gray-200 pt-4">
            <div className="grid sm:grid-cols-2 gap-y-2 text-sm text-gray-700">
              <p>
                <span className="font-medium">Order ID:</span>{" "}
                <span className="text-gray-500">{order._id}</span>
              </p>
              <p>
                <span className="font-medium">Payment:</span>{" "}
                <span
                  className={`${
                    order.isPaid ? "text-green-600" : "text-yellow-500"
                  }`}
                >
                  {order.isPaid ? "Done" : "Pending"}
                </span>
              </p>
              <p>
                <span className="font-medium">Method:</span>{" "}
                {order.paymentMethod}
              </p>
              <p className="flex items-center gap-2">
                <span className="font-medium">Status:</span>
                <span
                  className={`flex items-center gap-1 text-sm font-medium ${
                    order.status === "Delivered"
                      ? "text-green-600"
                      : order.status === "Pending"
                      ? "text-yellow-600"
                      : "text-gray-500"
                  }`}
                >
                  <span
                    className={`h-2 w-2 rounded-full ${
                      order.status === "Delivered"
                        ? "bg-green-500"
                        : order.status === "Pending"
                        ? "bg-yellow-400"
                        : "bg-gray-400"
                    }`}
                  ></span>
                  {order.status}
                </span>
              </p>
            </div>

            <div className="mt-5 flex justify-end">
              <button onClick={loadOrderData} className="btn-secondary text-sm px-4 py-1">
                Track Order
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyOrder;
