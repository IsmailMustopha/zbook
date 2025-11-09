import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

// eslint-disable-next-line react-refresh/only-export-components
export const ShopContext = createContext();

const ShopContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const [user, setUser] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [cartItems, setCartItems] = useState({});
  const [method, setMethod] = useState("COD");
  const [showUserLogin, setShowUserLogin] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const delivery_charges = 500;

  const currency = import.meta.env.VITE_CURRENCY;

  // Fetch all books
  const fetchBooks = async () => {
    try {
      const { data } = await axios.get("/api/product/list");
      if (data.success) {
        setBooks(data.products);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Fetch Admin
  const fetchAdmin = async () => {
    try {
      const { data } = await axios.get("/api/admin/is-auth");
      setIsAdmin(data.success);
    } catch {
      setIsAdmin(false);
    }
  };

  // Fetch User
  const fetchUser = async () => {
    try {
      const { data } = await axios.get("/api/user/is-auth");
      if (data.success) {
        setUser(data.user);
        setCartItems(data.user.cartData);
      } else {
        setUser(null);
        setCartItems({});
      }
    } catch {
      setUser(null);
      setCartItems({});
    }
  };

  // Logout User
  const logoutUser = async () => {
    try {
      const { data } = await axios.post("/api/user/logout");
      if (data.success) {
        toast.success(data.message);
        setUser(null);
        setCartItems({});
        navigate("/");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Adding items to cart
  const addToCart = async (itemId) => {
    const cartData = { ...cartItems }; // Use shallow copy

    if (cartData[itemId]) {
      cartData[itemId] += 1;
    } else {
      cartData[itemId] = 1;
    }
    setCartItems(cartData);

    if (user) {
      try {
        const { data } = await axios.post("/api/cart/add", { itemId });
        data.success ? toast.success(data.message) : toast.error(data.message);
      } catch (error) {
        toast.error(error.message);
      }
    }
  };

  // Getting total cart Items
  const getCartCount = () => {
    let totalCount = 0;
    for (const itemId in cartItems) {
      try {
        if (cartItems[itemId] > 0) {
          totalCount += cartItems[itemId];
        }
      } catch (error) {
        console.log(error);
      }
    }
    return totalCount;
  };

  // Update the Quantity of item
  // const updateQuantity = (itemId, quantity) => {
  //   const cartData = { ...cartItems };
  //   cartData[itemId] = quantity;
  //   setCartItems(cartData);
  // };

  // Update the Quantity of item
  const updateQuantity = async (itemId, quantity) => {
    const cartData = { ...cartItems };
    if (quantity <= 0) {
      delete cartData[itemId];
    } else {
      cartData[itemId] = quantity;
    }

    if (user) {
      try {
        const { data } = await axios.post("/api/cart/update", {
          itemId,
          quantity,
        });
        data.success ? toast.success(data.message) : toast.error(data.message);
      } catch (error) {
        toast.error(error.message);
      }
    }
  };

  // Getting total cart amount
  const getCartAmount = () => {
    let totalAmount = 0;
    for (const itemId in cartItems) {
      if (cartItems[itemId] > 0) {
        let itemInfo = books.find((book) => book._id === itemId);
        if (itemInfo) {
          totalAmount += itemInfo.offerPrice * cartItems[itemId];
        }
      }
    }
    return totalAmount;
  };

  useEffect(() => {
    fetchBooks();
    fetchAdmin();
    fetchUser();
  }, []);

  const value = {
    books,
    navigate,
    user,
    setUser,
    currency,
    searchQuery,
    setSearchQuery,
    cartItems,
    setCartItems,
    addToCart,
    updateQuantity,
    getCartAmount,
    getCartCount,
    method,
    setMethod,
    delivery_charges,
    showUserLogin,
    setShowUserLogin,
    isAdmin,
    setIsAdmin,
    axios,
    fetchBooks,
    fetchUser,
    logoutUser,
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};

export default ShopContextProvider;
