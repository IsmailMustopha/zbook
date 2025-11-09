import { Link } from "react-router-dom";
import logoImg from "../assets/logo.png";
// Import icons for the 'Follow Us' section for a better visual
import { FaInstagram, FaTwitter, FaFacebookF, FaYoutube } from "react-icons/fa"; 

const Footer = () => {
  const linkSections = [
    {
      title: "Quick Links",
      links: ["Home", "Best Sellers", "Offers & Deals", "Contact Us", "FAQs"],
    },
    {
      title: "Need Help?",
      links: [
        "Delivery Information",
        "Return & Refund Policy",
        "Payment Methods",
        "Track Your Order",
        "Contact Us",
      ],
    },
    // The links here will be rendered as icons, so the structure is slightly different
    {
      title: "Follow Us",
      isSocial: true,
      socialLinks: [
        { name: "Instagram", icon: <FaInstagram /> },
        { name: "Twitter", icon: <FaTwitter /> },
        { name: "Facebook", icon: <FaFacebookF /> },
        { name: "YouTube", icon: <FaYoutube /> },
      ],
    },
  ];
  
  return (
    // Use a solid dark background for a standard footer look
    // <footer className="max-padd-container bg-gray-800 text-white mt-12">
    <footer className="max-padd-container bg-gradient-to-t from-gray-800 via-gray-800 to-gray-800">
      <div className="flex flex-col md:flex-row items-start justify-between gap-10 py-10 border-b border-gray-600">
        {/* LEFT SECTION: LOGO and Description */}
        {/* Increased flex base for better space distribution */}
        <div className="flex flex-col flex-1 max-w-sm">
          {/* Logo Link */}
          <Link
            to={"/"}
            className="bold-22 xl:bold-28 flex items-center gap-2 mb-4 text-white"
          >
            <img src={logoImg} alt="ZiBooka logo" className="h-8 md:h-9" />
            <div className="font-extrabold text-2xl md:text-3xl">
              ZiBook<span className="text-secondary">a.</span>
            </div>
          </Link>

          {/* CRITICAL CHANGE: Corrected description for a book store */}
          <p className="text-gray-400 text-sm">
            Discover your next adventure in our curated selection of books,
            from bestsellers and new releases to rare classics. We fuel
            imagination and knowledge for every reader.
          </p>
        </div>

        {/* RIGHT SECTION: Link Columns */}
        {/* Adjusted w-full and gap for better flow on all screens */}
        <div className="flex flex-wrap justify-between w-full md:w-[60%] lg:w-[50%] gap-8 sm:gap-12">
          {linkSections.map((section, index) => (
            <div key={index} className="flex-1 min-w-[120px]">
              {/* Section Title */}
              <h3 className="font-bold text-lg text-white mb-3">
                {section.title}
              </h3>

              {/* Check if it's the Social Links section */}
              {section.isSocial ? (
                // Social Media Icons
                <div className="flex gap-4 text-2xl mt-4">
                  {section.socialLinks.map((social, i) => (
                    <a
                      key={i}
                      href={``}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-secondary transition-colors"
                      aria-label={social.name}
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              ) : (
                // Standard Links
                <ul className="text-sm space-y-2">
                  {section.links.map((link, i) => (
                    <li key={i}>
                      <Link
                        to={`/${link
                          .toLowerCase()
                          .replace(/ & /g, "-")
                          .replace(/ /g, "-")}`}
                        className="text-gray-400 hover:text-secondary transition-colors text-base"
                      >
                        {link}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* BOTTOM SECTION: Copyright */}
      <p className="py-4 text-center text-gray-500 text-sm">
        Copyright {new Date().getFullYear()} © ZiBooka. All Rights Reserved.
      </p>
    </footer>
  );
};

export default Footer;









// import { Link } from "react-router-dom";
// import logoImg from "../assets/logo.png";

// const Footer = () => {
//   const linkSections = [
//     {
//       title: "Quick Links",
//       links: ["Home", "Best Sellers", "Offers & Deals", "Contact Us", "FAQs"],
//     },
//     {
//       title: "Need Help?",
//       links: [
//         "Delivery Information",
//         "Return & Refund Policy",
//         "Payment Methods",
//         "Track Your Order",
//         "Contact Us",
//       ],
//     },
//     {
//       title: "Follow Us",
//       links: ["Instagram", "Twitter", "Facebook", "YouTube"],
//     },
//   ];
//   return (
//     <footer className="max-padd-container bg-gradient-to-t from-primary via-white to-primary">
//       <div className="flex flex-col md:flex-row items-start justify-between gap-10 py-10 border-b border-gray-500/30">
//         {/* LOGO */}
//         <div className="flex flex-1">
//           <Link to={"/"} className="bold-22 xl:bold-28 flex items-end gap-1">
//             <img src={logoImg} alt="logoImg" className="h-9" />
//             <div className="relative top-1.5">
//               ZiBook<span className="text-secondary">a.</span>
//             </div>
//           </Link>
//           <p className="max-w-[410px] mt-6">
//             Discover stylish clothing and shoes online, crafted for comfort and
//             quality. Shop fashion-forward designs that elevate your look and fit
//             every lifestyle.
//           </p>
//         </div>

//         <div className="flex flex-wrap justify-between w-full md:w-[45%] gap-5">
//           {linkSections.map((section, index) => (
//             <div key={index}>
//               <h3 className="font-semibold text-base md:mb-5 mb-2">
//                 {section.title}
//               </h3>
//               <ul className="text-sm space-y-2">
//                 {section.links.map((link, i) => (
//                   <li key={i}>
//                     <a href="#" className="hover:underline transition">
//                       {link}
//                     </a>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           ))}
//         </div>
//       </div>
//       <p className="py-4 text-center">
//         Copyright 2025 © CodeAtUsman All Right Reserved.
//       </p>
//     </footer>
//   );
// };

// export default Footer;
