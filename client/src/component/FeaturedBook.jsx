import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import { TbShoppingBagPlus } from "react-icons/tb";
import featuredBooksImg from "../assets/featured-books.png";

const FeaturedBook = () => {
  const { books, currency, addToCart } = useContext(ShopContext);
  const book = books[21];

  if (!book) {
    return null;
  }

  const { id, image, name, category, offerPrice, price, description } = book;

  const publishedYear = "2023";
  const pages = "300";
  const language = "English";
  const stock = "In Stock";
  const saveAmount = price - offerPrice;

  return (
    <section className="max-padd-container py-8 sm:py-10 bg-primary">
      {/* CONTAINER: Still flex, but ensures vertical stacking on smaller screens */}
      <div className="flex flex-col xl:flex-row gap-8 xl:gap-10">
        {/* LEFT SIDE: Featured Book Details */}
        <div className="flex-1">
          <Title
            title1={"Featured"}
            title2={"Books"}
            titleStyles={"pb-6 sm:pb-8"}
            para={
              "Browse featured books carefully selected for quality, imagination, storytelling, and unique characters"
            }
          />

          {/* BOOK CARD AND DETAILS */}
          {/* CRITICAL CHANGE: Default to 'flex-col' and switch to 'sm:flex-row' only on small screens and up */}
          <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 bg-white p-4 sm:p-6 rounded-lg shadow-xl">
            {/* BOOK IMAGE */}
            <div className="flex-shrink-0 flex justify-center sm:justify-start">
              {/* Added 'flex justify-center' to center image on mobile */}
              <img
                src={image}
                alt={name}
                className="h-60 w-44 object-cover rounded-md shadow-md"
              />
            </div>

            {/* BOOK INFO */}
            <div className="flex flex-col justify-between">
              <div>
                {/* Reduced text size for mobile */}
                <h3 className="text-2xl sm:text-3xl font-bold text-gray-900">
                  {name}
                </h3>
                <p className="text-md sm:text-lg font-medium text-secondary mb-3 sm:mb-4">
                  {category}
                </p>

                {/* PRICE INFO */}
                <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                  <h4 className="text-xl sm:text-2xl font-bold text-black">
                    {currency}
                    {offerPrice.toFixed(2)}
                  </h4>
                  <p className="text-md sm:text-lg line-through text-gray-500">
                    {currency}
                    {price.toFixed(2)}
                  </p>
                  <span className="bg-red-500 text-white text-xs sm:text-sm font-semibold px-2 py-0.5 rounded-full">
                    Save {currency}
                    {saveAmount.toFixed(2)}
                  </span>
                </div>

                {/* META DATA */}
                {/* Changed to 'grid-cols-1' for mobile, switches to 'sm:grid-cols-2' on small screens and up */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 text-sm mb-4">
                  <p>
                    <span className="font-medium text-gray-700">
                      Published:
                    </span>{" "}
                    {publishedYear}
                  </p>
                  <p>
                    <span className="font-medium text-gray-700">Pages:</span>{" "}
                    {pages}
                  </p>
                  <p>
                    <span className="font-medium text-gray-700">Language:</span>{" "}
                    {language}
                  </p>
                  <p>
                    <span className="font-medium text-gray-700">Stock:</span>{" "}
                    <span className="text-green-600 font-semibold">
                      {stock}
                    </span>
                  </p>
                </div>

                {/* DESCRIPTION */}
                {/* Reduced line-clamp to 3 for mobile to save vertical space */}
                <p className="text-gray-600 mb-4 sm:mb-6 line-clamp-3 sm:line-clamp-4">
                  {description}
                </p>
              </div>

              {/* ADD TO CART BUTTON */}
              <button
                className="btn-secondary flex items-center justify-center gap-2 mt-2 sm:mt-4 self-start"
                onClick={() => addToCart(book?._id)}
              >
                <TbShoppingBagPlus className="text-xl" />
                Add to Cart
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE: FEATURED IMAGE (Hidden on mobile, appears on xl screens) */}
        <div
          className="hidden xl:flex flex-1 rounded-lg bg-center bg-cover bg-no-repeat shadow-xl min-h-[500px]"
          style={{ backgroundImage: `url(${featuredBooksImg})` }}
        ></div>
      </div>
    </section>
  );
};

export default FeaturedBook;


// import React, { useContext } from "react";
// import { ShopContext } from "../context/ShopContext";
// import Title from "./Title";
// import { TbShoppingBagPlus } from "react-icons/tb";
// import featuredBooksImg from "../assets/featured-books.png";

// const FeaturedBook = () => {
//   // 1. Destructure all needed context values
//   const { books, currency, addToCart } = useContext(ShopContext);

//   // Get the 21st index book (index 21)
//   const book = books[21];

//   // 2. Handle case where the book might not exist (optional)
//   if (!book) {
//     return null; // Or return a loading/not found message
//   }

//   // 3. Destructure book properties for cleaner access
//   const { id, image, name, category, offerPrice, price, description } = book;

//   // Static details (could be dynamic in a real app)
//   const publishedYear = "2023";
//   const pages = "300";
//   const language = "English";
//   const stock = "In Stock";
//   const saveAmount = price - offerPrice;

//   return (
//     <section className="max-padd-container py-10 max-sm:bg-primary">
//       {/* CONTAINER: Use a flex container for the main layout */}
//       <div className="flex flex-col xl:flex-row gap-10">
//         {/* LEFT SIDE: Featured Book Details */}
//         <div className="flex-1">
//           <Title
//             title1={"Featured"}
//             title2={"Books"}
//             titleStyles={"pb-8"}
//             para={
//               "Browse featured books carefully selected for quality, imagination, storytelling, and unique characters"
//             }
//           />

//           {/* BOOK CARD AND DETAILS */}
//           <div className="flex flex-col sm:flex-row gap-8 bg-white p-4 rounded-lg shadow-lg">
//             {/* BOOK IMAGE */}
//             <div className="flex-shrink-0">
//               <img
//                 src={image}
//                 alt={name}
//                 className="h-72 w-52 object-cover rounded-md shadow-md"
//               />
//             </div>

//             {/* BOOK INFO */}
//             <div className="flex flex-col justify-between">
//               <div>
//                 <h3 className="text-3xl font-bold text-gray-900">{name}</h3>
//                 <p className="text-lg font-medium text-secondary mb-4">
//                   {category}
//                 </p>

//                 {/* PRICE INFO */}
//                 <div className="flex items-center gap-3 mb-4">
//                   <h4 className="text-2xl font-bold text-primary">
//                     {currency}
//                     {offerPrice.toFixed(2)}
//                   </h4>
//                   <p className="text-lg line-through text-gray-500">
//                     {currency}
//                     {price.toFixed(2)}
//                   </p>
//                   <span className="bg-red-500 text-white text-sm font-semibold px-2 py-1 rounded-full">
//                     Save {currency}
//                     {saveAmount.toFixed(2)}
//                   </span>
//                 </div>

//                 {/* META DATA */}
//                 <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm mb-4">
//                   <p>
//                     <span className="font-medium text-gray-700">
//                       Published:
//                     </span>{" "}
//                     {publishedYear}
//                   </p>
//                   <p>
//                     <span className="font-medium text-gray-700">Pages:</span>{" "}
//                     {pages}
//                   </p>
//                   <p>
//                     <span className="font-medium text-gray-700">Language:</span>{" "}
//                     {language}
//                   </p>
//                   <p>
//                     <span className="font-medium text-gray-700">Stock:</span>{" "}
//                     <span className="text-green-600 font-semibold">
//                       {stock}
//                     </span>
//                   </p>
//                 </div>

//                 {/* DESCRIPTION */}
//                 <p className="text-gray-600 mb-6 line-clamp-4">{description}</p>
//               </div>

//               {/* ADD TO CART BUTTON */}
//               {/* 1. Add onClick handler to call addToCart */}
//               <button
//                 className="btn-secondary flex items-center justify-center gap-2 mt-4 self-start"
//                 onClick={() => addToCart(id)} // Assuming your context accepts the book 'id'
//               >
//                 <TbShoppingBagPlus className="text-xl" />
//                 Add to Cart
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* RIGHT SIDE: FEATURED IMAGE (Full-width for larger screens) */}
//         <div
//           className="hidden xl:flex flex-1 rounded-lg bg-center bg-cover bg-no-repeat shadow-xl min-h-[500px]"
//           style={{ backgroundImage: `url(${featuredBooksImg})` }}
//         >
//           {/* Empty div for cover effect, already present in original code */}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default FeaturedBook;

// import React, { useContext } from 'react'
// import { ShopContext } from '../context/ShopContext'
// import Title from './Title'
// import { TbShoppingBagPlus } from 'react-icons/tb'
// import featuredBooksImg from "../assets/featured-books.png";

// const FeaturedBook = () => {

//   const { books, currency } = useContext(ShopContext)
//   const book = books[21] // Get the 21 index book

//   return (
//     <section className="max-padd-container max-sm:bg-primary">
//       {/* CONTAINER */}
//       <div className="">
//         {/* LEFT SIDE */}
//         <div>
//           <div>
//             <Title
//               title1={"Featured"}
//               title2={"Books"}
//               titleStyles={"pb-8"}
//               para={
//                 "Browse featured books carefully selected for quality, imagination, storytelling, and unique characters"
//               }
//             />
//             {/* BOOK CARD */}
//             <div>
//               <div>
//                 <img
//                   src={book?.image}
//                   alt={book?.name}
//                   className="h-64 w-44 object-cover"
//                 />
//               </div>
//               <div>
//                 <div>
//                   <h3>{book?.name}</h3>
//                   <p>{book?.category}</p>
//                 </div>
//                 <div>
//                   <h4>
//                     {currency}
//                     {book?.offerPrice}.00
//                   </h4>
//                   <p>
//                     {currency}
//                     {book?.price}.00
//                   </p>
//                   <span>Save 5</span>
//                 </div>
//               </div>

//               <p>
//                 <span className="font-medium text-gray-700">Published:</span>{" "}
//                 2023
//               </p>
//               <p>
//                 <span className="font-medium text-gray-700">Pages:</span> 300
//               </p>
//               <p>
//                 <span className="font-medium text-gray-700">Language:</span>{" "}
//                 English
//               </p>
//               <p>
//                 <span className="font-medium text-gray-700">Stock:</span> In
//                 Stock
//               </p>

//               <p>{book?.description}</p>
//               <button className="btn-secondary">
//                 <TbShoppingBagPlus className="text-lg" />
//                 Add to Cart
//               </button>
//             </div>
//           </div>
//         </div>
//         <div
//           className="hidden xl:flex flex-1 bg-center bg-cover bg-no-repeat"
//           style={{ backgroundImage: `url(${featuredBooksImg})` }}
//         >
//           <div classNameName="" />
//         </div>
//       </div>
//     </section>
//   );
// }

// export default FeaturedBook
