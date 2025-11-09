import React, { useContext, useEffect, useState, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import logoImg from "../assets/logo.png";
import userImg from "../assets/user.png";
import { FaBars, FaTimes, FaSearch, FaShoppingCart } from "react-icons/fa"; // Added FaShoppingCart
import { RiUserLine, RiLogoutBoxRLine } from "react-icons/ri"; // Added RiLogoutBoxRLine
import Navbar from "./Navbar";
import { ShopContext } from "../context/ShopContext";

const Header = () => {
  const [menuOpened, setMenuOpened] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false); 

  const {
    navigate,
    user,
    searchQuery,
    setSearchQuery,
    getCartCount,
    setShowUserLogin,
    logoutUser,
  } = useContext(ShopContext); // Destructured getCartCount (assuming this comes from context)

  const isShopPage = useLocation().pathname.endsWith("/shop");

  const toggleMenu = useCallback(() => {
    setMenuOpened((prev) => !prev);
    setShowUserDropdown(false); // Close other menus on toggle
  }, []);

  // Effect to navigate to shop page when search query changes
  useEffect(() => {
    if (searchQuery.length > 0 && !isShopPage) {
      navigate("/shop");
    }
  }, [searchQuery, isShopPage, navigate]);

  return (
    <header className="w-full flex items-center justify-between px-4 sm:px-8 py-3 bg-white shadow-lg fixed top-0 left-0 z-50 transition-all duration-300">
      {/* LOGO */}
      <div className="flex items-center gap-2 flex-1">
        <Link to="/" className="flex items-center gap-1 text-xl font-bold">
          <img src={logoImg} alt="logo" className="h-8 sm:h-9" />
          <span className="tracking-tight text-gray-900 font-extrabold text-2xl">
            ZiBook<span className="text-secondary">a.</span>
          </span>
        </Link>
      </div>

      {/* NAVBAR (Desktop Only) */}
      <div className="hidden lg:flex flex-1 justify-center">
        <Navbar
          setMenuOpened={setMenuOpened}
          containerStyles="flex gap-x-8 text-[16px] font-medium text-gray-700"
        />
      </div>

      {/* ACTION ICONS/BARS (Right Side) */}
      <div className="flex items-center justify-end gap-3 sm:gap-4 flex-1">
        {/* UNIVERSAL SEARCH TOGGLE/INPUT */}
        {/* <div className="relative flex items-center">
          {/* SEARCH INPUT (Hidden on mobile, appears on XL, or toggles on all screens) */}

        {/* SEARCH AREA */}
        <div className="relative flex items-center">
          {/* Input (toggle visibility with showSearch) */}
          <input
            type="text"
            placeholder="Search book..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`transition-all duration-300 ease-in-out rounded-full ring-1 ring-slate-900/10 text-sm placeholder:text-gray-400 outline-none
      ${showSearch ? "w-48 px-4 py-2 opacity-100" : "w-0 px-0 opacity-0"}
    `}
          />

          {/* Search Icon Toggle */}
          <button
            onClick={() => setShowSearch((prev) => !prev)}
            className="absolute right-0 bg-primary text-white p-2.5 rounded-full hover:bg-primary/90 transition-all"
          >
            <FaSearch className="text-xl" />
          </button>
        </div>

        {/* CART LINK (Hidden on XS, Visible on SM+) */}
        <Link
          to="/cart"
          className="relative hidden sm:flex items-center text-sm font-medium text-gray-700 hover:text-primary transition-colors"
        >
          <FaShoppingCart className="text-2xl" />
          {/* Cart Item Count */}
          <span className="absolute -top-1 -right-2 bg-secondary text-white text-xs font-semibold rounded-full w-5 h-5 flex items-center justify-center">
            {/* Display actual count from context or 0 */}
            {getCartCount() || 0}
          </span>
        </Link>

        {/* USER / LOGIN */}
        <div className="relative">
          {user ? (
            <div
              className="flex items-center gap-2 cursor-pointer relative"
              onClick={() => setShowUserDropdown((prev) => !prev)}
            >
              <img
                src={userImg}
                alt="user"
                className="h-9 w-9 rounded-full border-2 border-primary object-cover"
              />
            </div>
          ) : (
            // Login Button
            <button
              className="flex items-center gap-1 bg-primary text-white px-3 py-1.5 rounded-full text-sm font-medium hover:bg-primary/90 transition"
              onClick={() => setShowUserLogin(true)} // Navigate to login page
            >
              Login <RiUserLine className="text-lg" />
            </button>
          )}

          {/* USER DROPDOWN MENU */}
          {user && showUserDropdown && (
            <ul className="absolute right-0 top-11 mt-2 bg-white shadow-xl rounded-lg overflow-hidden w-40 border border-gray-100 z-50">
              <li
                onClick={() => {
                  navigate("/my-profile");
                  setShowUserDropdown(false);
                }}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm flex items-center gap-2"
              >
                <RiUserLine /> Profile
              </li>
              <li
                onClick={() => {
                  navigate("/my-orders");
                  setShowUserDropdown(false);
                }}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm flex items-center gap-2"
              >
                <FaShoppingCart /> Orders
              </li>
              <hr className="my-1 border-gray-100" />
              <li
                onClick={logoutUser}
                className="px-4 py-2 hover:bg-red-50 cursor-pointer text-sm text-red-600 font-medium flex items-center gap-2"
              >
                <RiLogoutBoxRLine /> Logout
              </li>
            </ul>
          )}
        </div>

        {/* MOBILE MENU TOGGLE (Visible on LG screens and down) */}
        <div className="lg:hidden flex items-center ml-3">
          {menuOpened ? (
            <FaTimes
              onClick={toggleMenu}
              className="text-2xl cursor-pointer text-gray-700 hover:text-primary transition-colors"
            />
          ) : (
            <FaBars
              onClick={toggleMenu}
              className="text-2xl cursor-pointer text-gray-700 hover:text-primary transition-colors"
            />
          )}
        </div>
      </div>

      {/* MOBILE NAV MENU (Full Screen Overlay Recommended for better UX) */}
      {menuOpened && (
        // Overlay for mobile menu
        <div
          className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          onClick={toggleMenu}
        >
          {/* Menu Panel */}
          <div
            className="absolute top-0 right-0 h-full bg-white shadow-2xl p-6 w-64 ring-1 ring-slate-900/5 flex flex-col gap-6 transform transition-transform duration-300 ease-out animate-in slide-in-from-right"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center pb-4 border-b">
              <span className="text-xl font-bold">Navigation</span>
              <FaTimes
                onClick={toggleMenu}
                className="text-2xl cursor-pointer text-gray-700"
              />
            </div>

            <Navbar
              setMenuOpened={setMenuOpened}
              // Added gap for better touch targets
              containerStyles="flex flex-col gap-5 text-gray-700 text-[16px] font-medium"
            />
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;

// import React, { useContext, useEffect, useState } from "react";
// import { Link, useLocation } from "react-router-dom";
// import logoImg from "../assets/logo.png";
// import userImg from "../assets/user.png";
// import { FaBars, FaTimes, FaSearch } from "react-icons/fa";
// import { RiUserLine } from "react-icons/ri";
// import Navbar from "./Navbar";
// import { ShopContext } from "../context/ShopContext";

// const Header = () => {
//   const [menuOpened, setMenuOpened] = useState(false);
//   const [showSearch, setShowSearch] = useState(false);
//   const { navigate, user, setUser, searchQuery, setSearchQuery } =
//     useContext(ShopContext);
//   const isShopPage = useLocation().pathname.endsWith("/shop");

//   const toggleMenu = () => setMenuOpened((prev) => !prev);

//   useEffect(() => {
//     if (searchQuery.length > 0 && !isShopPage) {
//       navigate("/shop");
//     }
//   }, [searchQuery]);

//   return (
//     <header className="w-full flex items-center justify-between px-4 sm:px-8 py-3 bg-white shadow-sm fixed top-0 left-0 z-50">
//       {/* // <header className="max-padd-container flexBetween gap-4 py-2 absolute top-0 left-0 right-0"> */}
//       {/* LOGO */}
//       <div className="flex items-center gap-2 flex-1">
//         <Link to="/" className="flex items-center gap-1 text-xl font-bold">
//           <img src={logoImg} alt="logo" className="h-9 hidden sm:block" />
//           <span className="tracking-tight">
//             Zibook<span className="text-secondary">a.</span>
//           </span>
//         </Link>
//       </div>
//       {/* NAVBAR */}
//       <div className="hidden lg:flex flex-1 justify-center">
//         <Navbar
//           setMenuOpened={setMenuOpened}
//           containerStyles="flex gap-x-6 text-[15px] font-medium text-gray-700"
//         />
//       </div>
//       {/* SEARCH BAR */}
//       <div className="relative hidden xl:flex items-center">
//         {/* Toggle input */}
//         <div
//           className={`bg-white ring-1 ring-slate-900/10 rounded-full overflow-hidden transition-all duration-300 ease-in-out ${
//             showSearch
//               ? "w-[266px] opacity-100 px-4 py-2.5"
//               : "w-0 opacity-0 p-0"
//           }`}
//         >
//           <input
//             onChange={(e) => setSearchQuery(e.target.value)}
//             type="text"
//             placeholder="Search book..."
//             className="bg-transparent w-full text-sm outline-none pr-10 placeholder:text-gray-400"
//           />
//         </div>

//         {/* Toggle button */}
//         <div
//           onClick={() => setShowSearch((prev) => !prev)}
//           className="absolute right-0.5 bg-primary p-2.5 rounded-full cursor-pointer z-10"
//         >
//           <FaSearch className="text-xl" />
//         </div>
//       </div>
//       {/* CART */}
//       <Link
//         to="/cart"
//         className="relative mx-3 hidden sm:flex items-center text-sm font-medium text-gray-700 hover:text-primary"
//       >
//         Cart
//         <span className="absolute -top-2 -right-3 bg-primary text-white text-xs font-semibold rounded-full px-2">
//           0
//         </span>
//       </Link>
//       {/* USER / LOGIN */}
//       <div className="relative">
//         {user ? (
//           <div className="flex items-center gap-2 cursor-pointer">
//             <img
//               src={userImg}
//               alt="user"
//               className="h-9 w-9 rounded-full border object-cover"
//             />
//           </div>
//         ) : (
//           <button className="flex items-center gap-2 bg-primary text-white px-3 py-1.5 rounded-full text-sm font-medium hover:bg-primary/90 transition">
//             Login <RiUserLine className="text-lg" />
//           </button>
//         )}

//         {/* DROPDOWN */}
//         {user && (
//           <ul className="absolute right-0 mt-2 bg-white shadow-md rounded-md overflow-hidden w-36 border">
//             <li
//               onClick={() => navigate("/my-orders")}
//               className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
//             >
//               Orders
//             </li>
//             <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm">
//               Logout
//             </li>
//           </ul>
//         )}
//       </div>
//       {/* MOBILE MENU TOGGLE */}
//       {/* MOBILE MENU TOGGLE */}
//       <div className="lg:hidden flex items-center ml-3">
//         {menuOpened ? (
//           <FaTimes
//             onClick={toggleMenu}
//             className="text-2xl cursor-pointer text-gray-700"
//           />
//         ) : (
//           <FaBars
//             onClick={toggleMenu}
//             className="text-2xl cursor-pointer text-gray-700"
//           />
//         )}
//       </div>
//       {/* MOBILE NAV MENU */}
//       {menuOpened && (
//         <div className="lg:hidden absolute top-16 right-4 bg-white shadow-lg rounded-xl p-6 w-56 ring-1 ring-slate-900/5 flex flex-col gap-5 animate-in slide-in-from-top">
//           <Navbar
//             setMenuOpened={setMenuOpened}
//             containerStyles="flex flex-col gap-4 text-gray-700 text-[15px]"
//           />
//         </div>
//       )}
//     </header>
//   );
// };

// export default Header;
