import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import toast from "react-hot-toast";

const CartTotal = () => {
  const {
    navigate,
    currency,
    method,
    setMethod,
    getCartAmount,
    getCartCount,
    delivery_charges,
    axios,
    user,
    cartItems,
    books,
    setCartItems,
  } = useContext(ShopContext);

  const [addresses, setAddresses] = useState([]);
  const [showAddress, setShowAddress] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);

  const subtotal = getCartAmount();
  const tax = (subtotal * 2) / 100;
  const total = subtotal + delivery_charges + tax;

  const getAddress = async () => {
    try {
      const { data } = await axios.get("/api/address/get");
      if (data.success) {
        setAddresses(data.addresses);
        if (data.addresses.length > 0) {
          setSelectedAddress(data.addresses[0]);
        }
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const placeOrder = async () => {
    try {
      if (!selectedAddress) {
        return toast.error("Please select an address");
      }

      let orderItems = [];
      for (const itemId in cartItems) {
        const book = books.find((item) => item._id === itemId);
        book.quantity = cartItems[itemId];
        orderItems.push(book);
      }
      // Convert orderItems to items array for backend
      let items = orderItems.map((item) => ({
        product: item._id,
        quantity: item.quantity,
      }));

      // Place Order using COD
      if (method === "COD") {
        const { data } = await axios.post("/api/order/cod", {
          items,
          address: selectedAddress._id,
        });
        if (data.success) {
          toast.success(data.message);
          setCartItems({});
          navigate("/my-orders");
        } else {
          toast.error(data.message);
        }
      } else{
        const { data } = await axios.post("/api/order/online", {
          items,
          address: selectedAddress._id,
        });
        if (data.success) {
          window.location.replace(data.checkoutLink);
        } else {
          toast.error(data.message);
        }

      }
    } catch (error) {
      toast.error(error.message);
    }
  };

    useEffect(() => {
      if (user) {
        getAddress()
      }
    }, [user]);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Order Details</h3>
        <span className="text-sm text-gray-500">({getCartCount()}) Items</span>
      </div>
      <hr className="border-gray-200 mb-6" />
      {/* SHIPPING ADDRESS */}
      <div className="space-y-3 mb-6">
        {/* Title: Clearer text and a hint of an icon for location */}
        <h4 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
          {/* Replace FaMapMarkerAlt with a suitable icon from your library */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-5 w-5 text-secondary-600`}
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
              clipRule="evenodd"
            />
          </svg>
          Shipping Destination
        </h4>

        {/* Selected Address Display: Use a light, bordered card for clarity */}
        <div className="border border-gray-200 rounded-xl p-4 bg-white shadow-sm transition-all duration-300">
          <div className="flex justify-between items-start">
            <p className="text-base text-gray-700 font-medium leading-relaxed">
              {selectedAddress ? (
                <>
                  {/* Highlight recipient name if available */}
                  <span className="font-semibold text-gray-900">
                    {selectedAddress.name || "Default Address"} {": "}
                  </span>
                  <br className="sm:hidden" />
                  {/* Display address details */}
                  {selectedAddress.street}, {selectedAddress.city},{" "}
                  {selectedAddress.state}, {selectedAddress.country}
                </>
              ) : (
                <span className="text-red-500">
                  No address found. Please add one.
                </span>
              )}
            </p>

            {/* Change Button: Move it outside the address block for better visibility */}
            <button
              onClick={() => setShowAddress(!showAddress)}
              className={`text-sm font-semibold text-secondary-600 hover:text-secondary-700 whitespace-nowrap ml-4 transition-colors`}
            >
              {showAddress ? "Hide Options" : "Change"}
            </button>
          </div>

          {/* Address List Dropdown: Use max-h for a smooth open/close transition */}
          <div
            className={`overflow-hidden transition-all duration-300 ease-in-out ${
              showAddress
                ? "max-h-96 opacity-100 pt-4 mt-4 border-t border-gray-100"
                : "max-h-0 opacity-0"
            }`}
          >
            <div className="space-y-3">
              {addresses.map((address, index) => (
                <div
                  key={index}
                  onClick={() => {
                    setSelectedAddress(address);
                    setShowAddress(false);
                  }}
                  className={`cursor-pointer text-sm p-3 border-2 rounded-lg transition shadow-sm ${
                    selectedAddress === address
                      ? `border-secondary-400 bg-secondary-50 text-secondary-800 font-medium ring-2 ring-secondary-100`
                      : "border-gray-200 hover:bg-gray-50 text-gray-700"
                  }`}
                >
                  {/* Nicer display for the individual address options */}
                  <p className="font-semibold">
                    {address.name || `Address ${index + 1}`}
                  </p>
                  <p className="text-xs">
                    {address.street}, {address.city}
                  </p>
                </div>
              ))}

              <button
                onClick={() => navigate("/address-form")}
                className={`text-sm font-medium text-indigo-600 hover:underline pt-1 transition-colors`}
              >
                + Add New Address
              </button>
            </div>
          </div>
        </div>
      </div>
      <hr className="border-gray-200 my-5" />
      <div className="my-6">
        <h4 className="h4 mb-5">Payment Method?</h4>

        <div className="flex gap-3 justify-between">
          <div
            onClick={() => setMethod("COD")}
            className={`
        ${method === "COD" ? "btn-secondary" : "btn-white"}
        py-2 px-4 text-xs sm:text-sm rounded-md cursor-pointer 
        border transition-all duration-200
      `}
          >
            Cash on Delivery
          </div>

          <div
            onClick={() => setMethod("stripe")}
            className={`
        ${method === "stripe" ? "btn-secondary" : "btn-white"}
        py-2 px-4 text-xs sm:text-sm rounded-md cursor-pointer 
        border transition-all duration-200
      `}
          >
            Stripe
          </div>
        </div>
      </div>
      <hr className="border-gray-200 my-5" />
      {/* SUMMARY */}
      <div className="space-y-3 text-sm">
        <div className="flex justify-between">
          <span>Price</span>
          <span className="font-semibold">
            {currency}
            {subtotal.toFixed(2)}
          </span>
        </div>

        <div className="flex justify-between">
          <span>Shipping Fee</span>
          <span className="font-semibold">
            {subtotal === 0 ? "0.00" : `${currency}${delivery_charges}.00`}
          </span>
        </div>

        <div className="flex justify-between">
          <span>Tax (2%)</span>
          <span className="font-semibold">
            {currency}
            {tax.toFixed(2)}
          </span>
        </div>

        <hr className="border-gray-200" />

        <div className="flex justify-between text-base font-medium">
          <span>Total Amount</span>
          <span>
            {subtotal === 0 ? "0.00" : `${currency}${total.toFixed(2)}`}
          </span>
        </div>
      </div>
      <button
        onClick={placeOrder}
        disabled={subtotal === 0}
        className="btn-dark w-full mt-8 py-3 rounded-md disabled:bg-gray-300 disabled:cursor-not-allowed"
      >
        Proceed to Order
      </button>
    </div>
  );
};

export default CartTotal;
