import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import {
  TbHeart,
  TbShoppingBagPlus,
  TbStarFilled,
  TbStarHalfFilled,
  TbMinus,
  TbPlus,
} from "react-icons/tb";
import { FaTruckFast } from "react-icons/fa6";
import ProductDescription from "../component/ProductDescription";
import RelatedBook from "../component/RelatedBook";
import ProductFeatured from "../component/ProductFeatured";

const ProductDetails = () => {
  const { books, currency, addToCart, updateQuantity, cartItems } =
    useContext(ShopContext);
  const { id } = useParams();

  const book = books.find((b) => b._id === id);
  const [image, setImage] = useState(null);

  useEffect(() => {
    if (book?.image?.length) {
      setImage(book.image[0]);
    }
  }, [book]);

  if (!book) {
    return (
      <div className="max-padd-container py-24 text-center">
        <p className="text-lg text-gray-600">Product not found.</p>
      </div>
    );
  }

  // Get quantity in cart for this book
  const quantity = cartItems[book._id] || 0;

  return (
    <div className="max-padd-container py-16 pt-28">
      {/* Breadcrumb */}
      <p className="text-sm text-gray-500 mb-6">
        <Link to="/" className="hover:text-primary font-medium">
          Home
        </Link>{" "}
        <Link to="/shop" className="hover:text-primary font-medium">
          Shop
        </Link>{" "}
        /
        <Link
          to={`/shop/${book.category}`}
          className="hover:text-primary font-medium"
        >
          {book.category}
        </Link>{" "}
        / <span className="text-black font-semibold">{book.name}</span>
      </p>

      {/* PRODUCT DETAILS */}
      <div className="flex flex-col lg:flex-row gap-12 my-8">
        {/* IMAGE SECTION */}
        <div className="flex flex-col sm:flex-row gap-6 flex-1">
          {/* Thumbnails */}
          <div className="flex sm:flex-col gap-3 sm:w-[100px] justify-center">
            {book.image?.map((item, index) => (
              <img
                key={index}
                onClick={() => setImage(item)}
                src={item}
                alt={`book thumbnail ${index}`}
                className={`w-20 h-20 object-contain rounded-lg cursor-pointer border transition-all duration-300 bg-white aspect-square flex items-center justify-center
                ${
                  image === item
                    ? "border-primary ring-2 ring-primary/40"
                    : "border-gray-200 hover:border-primary/50"
                }`}
              />
            ))}
          </div>

          {/* Main Image */}
          <div className="flex-1 flex items-center justify-center bg-white rounded-2xl border border-gray-100 shadow-lg p-4 min-h-[500px]">
            <img
              src={image}
              alt={book.name}
              className="w-full h-full object-contain rounded-lg transition-transform duration-300 hover:scale-[1.03]"
            />
          </div>
        </div>

        {/* INFO SECTION */}
        <div className="flex-1 space-y-5 bg-white border border-gray-200 px-8 py-7 rounded-2xl shadow-lg">
          {/* Title */}
          <h1 className="text-3xl font-extrabold text-gray-900 leading-tight">
            {book.name}
          </h1>
          {/* Rating */}
          <div className="flex items-center gap-x-3 pb-2 border-b border-gray-100">
            <div className="flex gap-x-1 text-yellow-500 text-lg">
              <TbStarFilled />
              <TbStarFilled />
              <TbStarFilled />
              <TbStarFilled />
              <TbStarHalfFilled />
            </div>
            <p className="text-base font-medium text-gray-700">4.5</p>
            <p className="text-sm text-gray-500">(22 ratings)</p>
          </div>
          {/* Price Box */}
          <div className="bg-gray-50 border border-gray-100 p-5 rounded-xl inline-block shadow-inner">
            <div className="flex items-baseline gap-4">
              <h3 className="text-xl line-through text-secondary/80 font-normal">
                {currency}
                {book.price}.00
              </h3>
              <h4 className="text-4xl font-extrabold text-primary">
                {currency}
                {book.offerPrice}.00
              </h4>
            </div>
            <p className="text-sm text-red-500 font-medium mt-1">
              Save {currency}
              {(book.price - book.offerPrice || 0).toFixed(2)}
            </p>
          </div>
          {/* Description */}
          <p className="text-gray-800 leading-relaxed max-w-[555px] pt-2">
            {book.description || "No description available for this book."}
          </p>
          {/* Buttons */}
          <div className="flex items-center gap-x-4 mt-8">
            {quantity === 0 ? (
              // ADD TO CART
              <button
                onClick={() => addToCart(book._id)}
                className="btn-dark sm:w-2/3 flexCenter gap-x-2 capitalize rounded-full py-3 text-lg font-semibold tracking-wide hover:shadow-lg transition duration-300"
              >
                <TbShoppingBagPlus className="text-xl" /> Add to Cart
              </button>
            ) : (
              // QUANTITY CONTROLS
              <div className="flex items-center gap-4 sm:w-2/3 bg-white rounded-full border-2 border-primary/40 px-5 py-2 justify-between shadow-md">
                <button
                  onClick={() =>
                    updateQuantity(book._id, Math.max(quantity - 1, 0))
                  }
                  className="text-gray-600 text-2xl hover:text-black cursor-pointer rounded-full flexCenter hover:scale-105 border border-gray-200 transition-colors duration-200  w-12"
                >
                  <TbMinus />
                </button>
                <span className="font-bold text-xl text-black">{quantity}</span>

                <button
                  onClick={() => updateQuantity(book._id, quantity + 1)}
                  className="text-gray-600 text-2xl hover:text-black cursor-pointer rounded-full flexCenter hover:scale-105 border border-gray-200 transition-colors duration-200  w-12"
                >
                  <TbPlus />
                </button>
              </div>
            )}
            <button className="cursor-pointer rounded-full w-12 h-12 flexCenter hover:scale-105 transition-transform border border-gray-200">
              <TbHeart className="text-2xl text-red-500 z-10" />
            </button>
          </div>
          {/* Delivery Info */}
          <div className="flex items-center gap-x-3 mt-5 text-gray-700 p-3 rounded-lg border border-gray-100">
            <FaTruckFast className="text-xl text-purple-700" />
            <span className="text-base font-medium">
              Free delivery on orders over {currency}50,000
            </span>
          </div>
          <hr className="my-5 border-gray-200" /> {/* Trust & Policy */}
          <div className="mt-4 flex flex-col gap-2 text-base text-gray-700">
            <p className="font-medium">✅ Authenticity You Can Trust</p>
            <p className="font-medium">
              💵 Enjoy Cash on Delivery for Your Convenience
            </p>
            <p className="font-medium">
              🔁 Easy Returns & Exchanges Within 7 Days
            </p>
          </div>
        </div>
      </div>

      <ProductDescription />
      <ProductFeatured />
      <RelatedBook book={book} id={id} />
    </div>
  );
};

export default ProductDetails;
