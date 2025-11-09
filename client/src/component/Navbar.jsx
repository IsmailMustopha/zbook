import { TbBrandBlogger, TbHome } from "react-icons/tb";
import { IoLibraryOutline } from "react-icons/io5";
import { PiEnvelopeDuotone } from "react-icons/pi";
import { NavLink } from "react-router-dom";

const Navbar = ({ containerStyles, setMenuOpened }) => {
  const navItems = [
    { to: "/", label: "Home", icon: TbHome },
    { to: "/shop", label: "Shop", icon: IoLibraryOutline },
    { to: "/blog", label: "Blog", icon: TbBrandBlogger },
    { to: "mailto:info@ziboka.com", label: "Contact", icon: PiEnvelopeDuotone },
  ];

  return (
    <nav className={containerStyles}>
      {navItems.map(({ to, label, icon: Icon }) => (
        <div key={label}>
          <NavLink
            to={to}
            className={({ isActive }) =>
              `${isActive ? "bg-white ring-1 ring-slate-900/10" : ""} 
              flexCenter gap-x-2 px-3 py-1.5 rounded-full  bg-primary`
            }
          >
            <Icon className="text-xl" />
            <span className="medium-16">{label}</span>
          </NavLink>
        </div>
      ))}
    </nav>
  );
};

export default Navbar;
// import { TbBrandBlogger, TbHome } from "react-icons/tb";
// import { IoLibraryOutline } from "react-icons/io5";
// import { PiEnvelopeDuotone } from "react-icons/pi";
// import { NavLink } from "react-router-dom";

// const Navbar = ({ containerStyles = "", setMenuOpened }) => {
//   const navItems = [
//     { to: "/", label: "Home", icon: TbHome },
//     { to: "/shop", label: "Shop", icon: IoLibraryOutline },
//     { to: "/blog", label: "Blog", icon: TbBrandBlogger },
//     { to: "mailto:info@ziboka.com", label: "Contact", icon: PiEnvelopeDuotone },
//   ];

//   return (
//     <nav
//       className={`flex items-center justify-center gap-4 md:gap-6 text-gray-700 ${containerStyles}`}
//     >
//       {navItems.map(({ to, label, icon: Icon }) => (
//         <NavLink
//           key={label}
//           to={to}
//           onClick={() => setMenuOpened?.(false)}
//           className={({ isActive }) =>
//             `flex items-center gap-x-2 px-4 py-2 rounded-full transition-all duration-200
//             ${
//               isActive
//                 ? "bg-white shadow-md text-black ring-1 ring-slate-200"
//                 : "hover:bg-slate-100 hover:text-black"
//             }`
//           }
//         >
//           <Icon className="text-lg md:text-xl" />
//           <span className="font-medium text-sm md:text-base">{label}</span>
//         </NavLink>
//       ))}
//     </nav>
//   );
// };

// export default Navbar;
