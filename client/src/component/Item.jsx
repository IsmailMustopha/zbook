/* eslint-disable react-hooks/rules-of-hooks */
import React, { useContext, useEffect } from "react";
import { TbShoppingBagPlus } from "react-icons/tb";
import { ShopContext } from "../context/ShopContext";

const Item = ({ book, fromHero }) => {
  const { navigate, addToCart, cartItems } = useContext(ShopContext);

  if (!book) {
    return (
      <div className="p-5 text-red-600 text-sm rounded-md bg-red-50">
        No book found.
      </div>
    );
  }

  useEffect(() => {
    console.log(cartItems);
  }, [addToCart]);

  return (
    <div
      onClick={() => {
        navigate(`/shop/${book.category}/${book._id}`);
        scrollTo(0, 0);
      }}
      className={`group relative flex flex-col overflow-hidden rounded-2xl shadow-md transition-all duration-300 cursor-pointer hover:shadow-xl ${
        fromHero ? "bg-white" : "bg-primary/5 backdrop-blur-sm"
      }`}
    >
      {/* IMAGE CONTAINER */}
      <div className="relative w-full aspect-[3/4] overflow-hidden rounded-t-2xl">
        <img
          src={book.image[0]}
          alt={book.name}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute top-3 right-3 z-10">
          <button
            // onClick={(e) => {
            //   e.stopPropagation();
            //   // Add to cart action here
            // }}
            onClick={(e) => {
              addToCart(book._id);
              e.stopPropagation();
            }}
            className="rounded-full bg-white/80 p-2 text-gray-700 shadow-md backdrop-blur-sm hover:bg-primary hover:text-white transition-colors"
          >
            <TbShoppingBagPlus className="text-xl" />
          </button>
        </div>
      </div>

      {/* INFO */}
      <div className="flex flex-col flex-1 p-4 space-y-2">
        <h4 className="text-lg font-semibold text-gray-800 line-clamp-1 group-hover:text-primary transition-colors">
          {book.name}
        </h4>

        <p className="text-sm text-gray-600 line-clamp-2">{book.description}</p>

        <div className="mt-auto flex items-center justify-between pt-2">
          <p className="text-base font-bold text-black">
            ₦{book.offerPrice}.00
          </p>
          <button
            onClick={(e) => {
              addToCart(book._id);
              e.stopPropagation();
            }}
            className="flex items-center gap-1 rounded-lg bg-primary text-black text-sm font-medium px-3 py-2 shadow hover:bg-primary/90 transition-colors"
          >
            <TbShoppingBagPlus className="text-lg" />
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default Item;

// import React, { useContext } from "react";
// import { TbShoppingBagPlus } from "react-icons/tb";
// import { ShopContext } from "../context/ShopContext";

// const Item = ({ book, fromHero }) => {
//   const { navigate, currency } = useContext(ShopContext);

// return book ? (
//   <div
//     className={`overflow-hidden sm:p-4 ${
//       fromHero ? "bg-white" : "sm:bg-primary"
//     } rounded-xl`}
//   >
//     {/* IMAGE */}
//     <div className="overflow-hidden rounded-xl shadow-[0px_2px_8px_rgba(0,_0,_0,_0.1)]">
//       <img src={book.image} alt={book.name} className="rounded-lg" />
//     </div>
//     {/* INFO */}
//     <div className="pt-4">
//       <div>
//         <div>
//           <h4>{book.name}</h4>
//           <p>
//             {currency}
//             {book.offerPrice}.00
//           </p>
//         </div>
//       </div>

//       <p>{book.description}</p>
//       <button>
//         <TbShoppingBagPlus className="text-xl" />
//       </button>
//     </div>
//   </div>
// ) : (
//   <div className="p-5 text-red-600 text-sm rounded-md">No book found.</div>
// );
// };

// export default Item;
