import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../../context/ShopContext";
import toast from 'react-hot-toast'

const AdminLogin = () => {
  const { isAdmin, setIsAdmin, navigate, axios } = useContext(ShopContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axios.post("/api/admin/login", {
        email,
        password,
      });
      if (data.success) {
        setIsAdmin(true);
        navigate("/admin");
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (isAdmin) {
      navigate("/admin");
    }
  }, [isAdmin]);

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fadeIn text-[85%]">
      <form
        onSubmit={onSubmitHandler}
        className="relative w-[90%] sm:w-[380px] bg-white rounded-2xl p-8 shadow-2xl border border-gray-100 animate-slideUp"
      >
        <h3 className="bold-28 mx-auto mb-3 text-center">
          <span className="text-secondary capitalize">Admin</span>{" "}
          <span className="capitalize">Login</span>
        </h3>

        <div className="w-full mb-3">
          <label className="text-sm font-medium text-gray-600">
            Email Address
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="example@email.com"
            className="mt-1 w-full rounded-lg border border-gray-200 focus:border-secondary focus:ring-1 focus:ring-secondary/50 p-2.5 outline-none transition"
            required
          />
        </div>

        <div className="w-full mb-4">
          <label className="text-sm font-medium text-gray-600">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="mt-1 w-full rounded-lg border border-gray-200 focus:border-secondary focus:ring-1 focus:ring-secondary/50 p-2.5 outline-none transition"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full py-2.5 rounded-lg bg-gradient-to-r from-secondary to-primary text-white font-semibold hover:opacity-90 transition"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;
