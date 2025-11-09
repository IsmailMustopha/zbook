import React, { useContext } from "react";
import { ShopContext } from "../../context/ShopContext";
import { FaSquarePlus } from "react-icons/fa6";
import { FaListAlt } from "react-icons/fa";
import { MdFactCheck } from "react-icons/md";
import { BiLogOut } from "react-icons/bi";
import { Link, NavLink, Outlet } from "react-router-dom";
import toast from 'react-hot-toast'

const Sidebar = () => {
  const { navigate, axios } = useContext(ShopContext);

  const navItems = [
    { path: "/admin", label: "Add Item", icon: <FaSquarePlus /> },
    { path: "/admin/list", label: "List", icon: <FaListAlt /> },
    { path: "/admin/orders", label: "Orders", icon: <MdFactCheck /> },
  ];

  const logout = async () => {
      try {
        const { data } = await axios.post("/api/admin/logout");
        if(data.success) {
          toast.success(data.message)
          navigate('/')
        }
      } catch (error) {
        toast.error(error.message)
      }
    };

  return (
    <div className="mx-auto max-w-[1440px] flex flex-col sm:flex-row">
      {/* SIDEBAR */}
      <div className="max-sm:flexCenter max-sm:pb-3 bg-primary text-white pb-3 m-2 sm:min-h-[97vh] rounded-2xl sm:min-w-[20%] flex flex-col justify-between p-4 shadow-lg transition-all duration-300">
        {/* TOP SECTION */}
        <div>
          {/* LOGO */}
          <Link
            to={"/admin"}
            className="block text-center sm:text-left mb-8 font-paci text-3xl tracking-wide"
          >
            <span className="text-secondary font-bold">Zibooka</span>
          </Link>

          {/* NAV LINKS */}
          <nav className="flex flex-col gap-y-3">
            {navItems.map((link) => (
              <NavLink
                key={link.label}
                to={link.path}
                end={link.path === "/admin"}
                className={({ isActive }) =>
                  `flex items-center gap-x-3 px-5 py-3 rounded-xl text-base font-medium transition-all duration-300 
                  ${
                    isActive
                      ? "bg-white text-secondary shadow-md translate-x-1"
                      : "text-black hover:bg-white/10 hover:translate-x-1"
                  }`
                }
              >
                <span className="text-lg">{link.icon}</span>
                <span className="hidden sm:flex">{link.label}</span>
              </NavLink>
            ))}
          </nav>
        </div>

        {/* LOGOUT BUTTON */}
        <button
          onClick={logout}
          className="flex items-center gap-x-3 mt-8 px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-black cursor-pointer transition-all duration-300"
        >
          <BiLogOut className="text-lg" />
          <span className="hidden sm:flex">Logout</span>
        </button>
      </div>
      <Outlet />
    </div>
  );
};

export default Sidebar;
