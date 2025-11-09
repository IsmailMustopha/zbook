import React, { useContext } from "react";
import toast from "react-hot-toast";
import { ShopContext } from "../../context/ShopContext";

const ProductList = () => {
  const { books, currency, axios, fetchBooks } = useContext(ShopContext);

  const toggleStock = async (productId, inStock) => {
    try {
      const { data } = await axios.post("/api/product/stock", {
        productId,
        inStock,
      });
      if (data.success) {
        fetchBooks();
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="px-4 sm:px-8 py-6 mt-2 h-screen bg-primary overflow-y-auto w-full lg:w-4/5 rounded-xl shadow-sm">
      {/* Table Header */}
      <div className="grid grid-cols-5 text-sm font-semibold text-gray-800 border-b border-slate-300 pb-2 mb-3">
        <h5 className="text-left">Image</h5>
        <h5 className="text-left">Name</h5>
        <h5 className="text-left">Category</h5>
        <h5 className="text-left">Price</h5>
        <h5 className="text-left">In Stock</h5>
      </div>

      {/* PRODUCT LIST */}
      <div className="flex flex-col gap-3">
        {books.map((book) => (
          <div
            key={book._id}
            className="grid grid-cols-5 items-center bg-white rounded-lg p-2 hover:shadow-sm transition-all duration-200 ring-1 ring-slate-900/10"
          >
            {/* Image */}
            <div className="flex items-center justify-start">
              <img
                src={book.image[0]}
                alt={book.name}
                className="w-12 h-12 object-cover rounded bg-primary ring-1 ring-slate-900/5"
              />
            </div>

            {/* Name */}
            <h5 className="text-sm font-semibold truncate">{book.name}</h5>

            {/* Category */}
            <p className="text-sm font-medium text-gray-700">{book.category}</p>

            {/* Price */}
            <div className="text-sm font-semibold text-gray-800">
              {currency} {book.offerPrice}
            </div>

            {/* In Stock Toggle */}
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                onChange={() => toggleStock(book._id, !book.inStock)}
                type="checkbox"
                defaultChecked={book.inStock}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:bg-green-500 transition-all duration-300"></div>
              <div className="absolute left-[2px] top-[2px] bg-white w-5 h-5 rounded-full transition-all duration-300 peer-checked:translate-x-full"></div>
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
