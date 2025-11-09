import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../../context/ShopContext";
import toast from "react-hot-toast";

const Orders = () => {
  const { currency, axios } = useContext(ShopContext);
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    try {
      const { data } = await axios.post("/api/order/list");
      if (data.success) {
        setOrders(data.orders);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const statusHandler = async (event, orderId) => {
    try {
      const { data } = await axios.post("/api/order/status", {
        orderId,
        status: event.target.value,
      });
      if (data.success) {
        await fetchAllOrders();
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAllOrders();
    console.log(orders);
  }, []);

  return (
    <div className="px-2 sm:px-6 py-12 m-2 h-[97vh] bg-primary overflow-y-scroll lg:w-4/5 rounded-xl">
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
                    order.isPaid ? "textwgreen-600" : "text-yellow-500"
                  }`}
                >
                  {order.isPaid ? "Done" : "Pending"}
                </span>
              </p>
              <div className="flex gap-4">
                <div className="flex items-center gap-x-2">
                  <h5 className="medium-14">Customer:</h5>
                  <p className="text-xs">
                    {order.address.firstName} {order.address.lastName}
                  </p>
                </div>
                <div className="flex items-center gap-x-2">
                  <h5 className="medium-14">Phone:</h5>
                  <p className="text-xs">{order.address.phone}</p>
                </div>
              </div>
              <div className="flex items-center gap-x-2">
                <h5 className="medium-14">Address:</h5>
                <p className="text-xs">
                  {" "}
                  {order.address.street}, {order.address.city},{" "}
                  {order.address.state}, {order.address.country},{" "}
                  {order.address.zipcode}
                </p>
              </div>
              <p>
                <span className="font-medium">Method:</span>{" "}
                {order.paymentMethod}
              </p>
              <p>
                <span className="font-medium">Amount:</span>{" "}
                {currency}{order.amount}
              </p>
            </div>
          </div>
            <div className="flex items-center gap-2 mt-4  mx-auto">
              <h5 className="medium-14">Status:</h5>
              <select
                onChange={(event)=> statusHandler(event, order._id)}
                value={order.status}
                className="text-xs font-semibold p-1 ring-1 ring-slate-900/5 rounded max-w-36 bg-primary"
              >
                <option value="Order Placed">Order Placed</option>
                <option value="Packing">Packing</option>
                <option value="Shipped">Shipped</option>
                <option value="Out for delivery">Out for delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
        </div>
      ))}
    </div>
  );
};

export default Orders;
