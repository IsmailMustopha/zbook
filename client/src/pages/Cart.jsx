import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../component/Title";
import { FaMinus, FaPlus } from "react-icons/fa6";
import CartTotal from "../component/CartTotal";

const Cart = () => {
  const { navigate, books, currency, cartItems, updateQuantity } =
    useContext(ShopContext);

  return books && cartItems ? (
    <div className="max-padd-container py-16 pt-28">
      <div className="flex flex-col xl:flex-row gap-16 xl:gap-24">
        {/* LEFT SIDE */}
        <div className="flex-1">
          <Title title1="Cart" title2="Overview" titleStyles="pb-5" />

          {/* Table Header */}
          <div className="hidden md:grid grid-cols-[6fr_2fr_2fr] text-base font-semibold bg-gray-100 text-gray-700 p-3 rounded-lg shadow-sm uppercase tracking-wide">
            <h5 className="text-left">Product</h5>
            <h5 className="text-center">Subtotal</h5>
            <h5 className="text-center">Action</h5>
          </div>

          {/* Cart Items */}
          <div className="mt-4 space-y-4">
            {books.map((book) => {
              const quantity = cartItems[book._id];
              if (quantity > 0) {
                return (
                  <div
                    key={book._id}
                    className="grid grid-cols-1 md:grid-cols-[6fr_2fr_2fr] items-center gap-4 bg-white p-4 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
                  >
                    {/* Product Info */}
                    <div className="flex items-center gap-4">
                      <img
                        src={
                          Array.isArray(book.image) ? book.image[0] : book.image
                        }
                        alt={book.name}
                        className="w-20 h-24 object-contain rounded-lg border border-gray-200 bg-gray-50"
                      />
                      <div>
                        <h5 className="font-semibold text-gray-800 text-lg line-clamp-1">
                          {book.name}
                        </h5>
                        <p className="text-sm text-gray-500 mt-1">
                          Category:{" "}
                          <span className="text-gray-700 font-medium">
                            {book.category}
                          </span>
                        </p>

                        {/* Quantity Controls */}
                        <div className="mt-3 flex items-center gap-3 bg-gray-50 rounded-full border border-gray-200 px-3 py-1.5 w-fit">
                          <button
                            onClick={() =>
                              updateQuantity(
                                book._id,
                                Math.max(quantity - 1, 0)
                              )
                            }
                            className="p-1.5 bg-primary text-white rounded-full hover:bg-primary/90 transition"
                          >
                            <FaMinus className="text-xs" />
                          </button>
                          <p className="text-base font-semibold text-gray-700 min-w-[25px] text-center">
                            {quantity}
                          </p>
                          <button
                            onClick={() =>
                              updateQuantity(book._id, quantity + 1)
                            }
                            className="p-1.5 bg-primary text-white rounded-full hover:bg-primary/90 transition"
                          >
                            <FaPlus className="text-xs" />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Subtotal */}
                    <p className="text-center text-lg font-bold text-gray-800">
                      {currency}
                      {(book.offerPrice * quantity).toFixed(2)}
                    </p>

                    {/* Delete */}
                    <button
                      onClick={() => updateQuantity(book._id, 0)}
                      className="mx-auto text-red-600 font-medium hover:text-red-700 transition"
                    >
                      Remove
                    </button>
                  </div>
                );
              }
              return null;
            })}
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex-1 max-w-[400px] mx-auto xl:mx-0">
          <div className="sticky top-28 bg-white border border-gray-200 rounded-2xl p-6 shadow-lg">
            <CartTotal />
          </div>
        </div>
      </div>
    </div>
  ) : null;
};

export default Cart;
