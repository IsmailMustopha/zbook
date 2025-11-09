import React, { useContext, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { IoClose } from "react-icons/io5";
import toast from "react-hot-toast";

const Login = () => {
  const { setShowUserLogin, navigate, axios, fetchUser } =
    useContext(ShopContext);
  const [mode, setMode] = useState("login");
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axios.post(`/api/user/${mode}`, {
        name: form.name,
        email: form.email,
        password: form.password,
      });
      if (data.success) {
        toast.success(
          `${mode === "login" ? "Login Successfully" : "Account Created"}`
        );
        if (mode === "register") {
          navigate("/login");
        }
        await fetchUser;
        setShowUserLogin(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fadeIn">
      <form
        onSubmit={onSubmitHandler}
        className="relative w-[90%] sm:w-[380px] bg-white rounded-2xl p-8 shadow-2xl border border-gray-100 animate-slideUp"
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={() => setShowUserLogin(false)}
          className="absolute top-4 right-4 text-gray-500 hover:text-black transition"
        >
          <IoClose size={22} />
        </button>

        {/* Title */}
        <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">
          {mode === "login" ? "Welcome Back 👋" : "Create Your Account"}
        </h2>

        {/* Name Field (Register Only) */}
        {mode === "register" && (
          <div className="w-full mb-3">
            <label className="text-sm font-medium text-gray-600">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="John Doe"
              className="mt-1 w-full rounded-lg border border-gray-200 focus:border-secondary focus:ring-1 focus:ring-secondary/50 p-2.5 outline-none transition"
              required
            />
          </div>
        )}

        {/* Email */}
        <div className="w-full mb-3">
          <label className="text-sm font-medium text-gray-600">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="example@email.com"
            className="mt-1 w-full rounded-lg border border-gray-200 focus:border-secondary focus:ring-1 focus:ring-secondary/50 p-2.5 outline-none transition"
            required
          />
        </div>

        {/* Password */}
        <div className="w-full mb-4">
          <label className="text-sm font-medium text-gray-600">Password</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="••••••••"
            className="mt-1 w-full rounded-lg border border-gray-200 focus:border-secondary focus:ring-1 focus:ring-secondary/50 p-2.5 outline-none transition"
            required
          />
        </div>

        {/* Switch between login/register */}
        <p className="text-center text-sm text-gray-600 mb-4">
          {mode === "login" ? (
            <>
              Don’t have an account?{" "}
              <span
                onClick={() => setMode("register")}
                className="text-secondary font-medium cursor-pointer hover:underline"
              >
                Register
              </span>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <span
                onClick={() => setMode("login")}
                className="text-secondary font-medium cursor-pointer hover:underline"
              >
                Login
              </span>
            </>
          )}
        </p>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-2.5 rounded-lg bg-gradient-to-r from-secondary to-primary text-white font-semibold hover:opacity-90 transition"
        >
          {mode === "login" ? "Login" : "Create Account"}
        </button>
      </form>
    </div>
  );
};

export default Login;
