import React, { useContext, useState } from "react";
import upload_icon from "../../assets/upload_icon.png";
import { ShopContext } from "../../context/ShopContext";
import toast from "react-hot-toast";

const AddProduct = () => {
  const { axios } = useContext(ShopContext);
  const [files, setFiles] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("10");
  const [offerPrice, setOfferPrice] = useState("10");
  const [category, setCategory] = useState("Academic");
  const [popular, setPopular] = useState(false);

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const productData = {
        name,
        description,
        category,
        price,
        offerPrice,
        popular,
      };

      const formData = new FormData();

      formData.append("productData", JSON.stringify(productData));
      for (let i = 0; i < files.length; i++) {
        formData.append("images", files[i]);
      }

      const { data } = await axios.post("/api/product/add", formData);
      if (data.success) {
        toast.success(data.message);
        setName("");
        setDescription("");
        setFiles([]);
        setPrice("500");
        // navigate("/admin")
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    // Enhanced outer container: added shadow, slightly more padding/margin, and better h-fit control
    <div className="px-6 sm:px-10 py-8 bg-primary w-full lg:w-4/5 rounded-xl shadow-lg border border-gray-100 overflow-y-auto mt-2 h-screen">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-3">
        Add New Product
      </h2>
      <form
        onSubmit={onSubmitHandler}
        // Increased overall gap for better section separation, applied font styling here
        className="flex flex-col gap-y-6 text-base font-medium"
      >
        {/* === Text Inputs Section === */}
        <div className="space-y-4">
          <div className="w-full">
            <h5 className="h5 font-semibold text-gray-700 mb-1">
              Product Name
            </h5>
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              type="text"
              placeholder="Write here..."
              // Refined input styling: increased padding, softer ring, focus effect
              className="px-4 py-2.5 ring-1 ring-slate-300 rounded-lg bg-white w-full max-w-xl focus:ring-2 focus:ring-gray-400/50 transition"
            />
          </div>
          <div className="w-full">
            <h5 className="h5 font-semibold text-gray-700 mb-1">
              Product Description
            </h5>
            <textarea
              rows={5}
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              type="text"
              placeholder="Write here..."
              // Refined textarea styling: increased padding, softer ring, focus effect, added resize control
              className="px-4 py-2.5 ring-1 ring-slate-300 rounded-lg bg-white w-full max-w-xl focus:ring-2 focus:ring-gray-400/50 transition resize-y"
            />
          </div>
        </div>

        {/* --- */}

        {/* === Pricing & Category Section (Restructured for better layout) === */}
        {/* This div wraps the three price/category fields. Using flex for a side-by-side layout. */}
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-1/3">
            {" "}
            {/* Category takes up 1/3 of the row */}
            <h5 className="h5 font-semibold text-gray-700 mb-1">
              Product Category
            </h5>
            <select
              onChange={(e) => setCategory(e.target.value)}
              // Refined select styling: consistent padding, full width, border/ring
              className="w-full px-4 py-2.5 text-gray-700 ring-1 ring-slate-300 rounded-lg bg-white focus:ring-2 focus:ring-gray-400/50 transition"
            >
              <option value="Academic">Academic</option>
              <option value="Children">Children</option>
              <option value="Health">Health</option>
              <option value="Horror">Horror</option>
              <option value="Business">Business</option>
              <option value="History">History</option>
              <option value="Adventure">Adventure</option>
            </select>
          </div>
          <div className="w-full md:w-1/3">
            {" "}
            {/* Price takes up 1/3 of the row */}
            <h5 className="h5 font-semibold text-gray-700 mb-1">
              Product Price
            </h5>
            <input
              onChange={(e) => setPrice(e.target.value)}
              value={price}
              type="number"
              placeholder="10"
              // Refined input styling: consistent padding, full width, border/ring
              className="w-full px-4 py-2.5 ring-1 ring-slate-300 rounded-lg bg-white focus:ring-2 focus:ring-gray-400/50 transition"
            />
          </div>
          <div className="w-full md:w-1/3">
            {" "}
            {/* Offer Price takes up 1/3 of the row */}
            <h5 className="h5 font-semibold text-gray-700 mb-1">Offer Price</h5>
            <input
              onChange={(e) => setOfferPrice(e.target.value)}
              value={offerPrice}
              type="number"
              placeholder="10"
              // Refined input styling: consistent padding, full width (not max-w-24), border/ring
              className="w-full px-4 py-2.5 ring-1 ring-slate-300 rounded-lg bg-white focus:ring-2 focus:ring-gray-400/50 transition"
            />
          </div>
        </div>

        {/* --- */}

        {/* === Images Section === */}
        <div className="space-y-3">
          <h5 className="h5 font-semibold text-gray-700">
            Product Images (Max 4)
          </h5>
          {/* This div contains the image upload grid. Used flex and gap for clean layout. */}
          <div className="flex gap-4">
            {Array(4)
              .fill("")
              .map((_, index) => (
                <label
                  htmlFor={`image${index}`}
                  // Enhanced image placeholder/upload area: larger size, cleaner border, hover effect
                  className="ring-2 ring-slate-300 hover:ring-slate-500 rounded-xl overflow-hidden cursor-pointer p-2 transition duration-200"
                  key={index} // Added key for list mapping
                >
                  <input
                    onChange={(e) => {
                      const updatedFiles = [...files];
                      updatedFiles[index] = e.target.files[0];
                      setFiles(updatedFiles);
                    }}
                    type="file"
                    id={`image${index}`}
                    hidden
                  />

                  <img
                    src={
                      files[index]
                        ? URL.createObjectURL(files[index])
                        : upload_icon // Assuming upload_icon is imported/defined
                    }
                    alt="uploadArea"
                    // Increased size for better tap target and visibility
                    height={96}
                    width={96}
                    // Adjusted sizing/aspect for better look
                    className="bg-white overflow-hidden aspect-square object-cover w-24 h-24 rounded-lg"
                  />
                </label>
              ))}
          </div>
        </div>

        {/* --- */}

        {/* === Popular Checkbox Section === */}
        <div className="flex items-center gap-3 mt-2">
          {" "}
          {/* Used items-center for vertical alignment and increased gap */}
          <input
            onChange={() => setPopular((prev) => !prev)}
            checked={popular}
            type="checkbox"
            id="popular"
            // Styled checkbox for slight visual enhancement
            className="w-4 h-4 ring-1 ring-slate-900/10 rounded"
          />
          <label
            htmlFor="popular"
            className="cursor-pointer text-gray-700 font-semibold"
          >
            Add to Popular Products
          </label>
        </div>

        {/* --- */}

        {/* === Submit Button === */}
        <button
          type="submit"
          // Enhanced button style: larger, shadow, hover effect
          className="btn-dark mt-4 max-w-56 rounded-xl py-3 px-6 shadow-md hover:shadow-lg transition duration-200"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
