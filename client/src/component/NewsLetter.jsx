import React from "react";
import { FaDribbble, FaFacebookF, FaInstagram } from "react-icons/fa6";

const NewsLetter = () => {
  // Common style for social media icons
  const socialIconStyle =
    "text-xl text-white hover:text-secondary transition-colors cursor-pointer";

  return (
    <section className="max-padd-container py-6 md:py-8 bg-gray-100 border-t border-b border-gray-300">
      <div className="flex flex-col lg:flex-row justify-between items-center gap-6 md:gap-10">
        {/* LEFT SIDE: Heading and Sub-text */}
        <div className="text-center lg:text-left">
          {/* Main Heading */}
          <h4 className="text-lg md:text-xl font-bold uppercase tracking-wider text-gray-800">
            Get latest information on Events, Sales & Offers
          </h4>
          {/* Sub-text (reused text, simplified styling) */}
          <p className="text-sm text-gray-600 mt-1">
            Subscribe to our newsletter for exclusive updates.
          </p>
        </div>

        {/* CENTER: Email Subscription Form */}
        <div>
          {/* Use a form element for semantic correctness */}
          <form className="flex bg-white rounded-full shadow-md overflow-hidden border border-gray-300">
            <input
              type="email"
              placeholder="Enter your email address..."
              // Use proper Tailwind width classes and text styling
              className="p-3 md:p-4 w-64 sm:w-80 outline-none text-sm text-gray-700 placeholder-gray-500 bg-transparent"
              aria-label="Email address for newsletter"
            />
            {/* Submit Button */}
            <button
              type="submit"
              className="bg-secondary text-white px-4 md:px-6 py-3 font-semibold text-sm transition-colors hover:bg-primary-dark"
            >
              Subscribe
            </button>
          </form>
        </div>

        {/* RIGHT SIDE: Social Media Icons */}
        {/* CRITICAL CHANGE: Applied flex layout to the social icons container */}
        <div className="flex gap-6 p-2 rounded-full bg-gray-500 shadow-lg">
          {/* Facebook Icon */}
          <a
            href=""
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
          >
            <FaFacebookF className={socialIconStyle} />
          </a>
          {/* Instagram Icon */}
          <a
            href=""
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
          >
            <FaInstagram className={socialIconStyle} />
          </a>
          {/* Dribbble Icon */}
          <a
            href=""
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Dribbble"
          >
            <FaDribbble className={socialIconStyle} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default NewsLetter;

// import React from "react";
// import { FaDribbble, FaFacebookF, FaInstagram } from "react-icons/fa6";

// const NewsLetter = () => {
//   return (
//     <section className="max-padd-container py-8 mt-2">
//       <div className="flexBetween flex-wrap gap-7">
//         <div>
//           <h4
//             className="bold-14 uppercase
//             tracking-wider"
//           >
//             Get latest information on Events, Sales & Offers.
//           </h4>
//           <p>Get latest information on Events, Sales & Offers.</p>
//         </div>

//         <div>
//           <div className="flex bg-primary">
//             <input
//               type="email"
//               placeholder="Email
//               Address.."
//               className="p-4 bg-primary w-
//               [222px] sm:w-[266px] outline-none text-
//               [13px]"
//             />
//             <button className="">Submit</button>
//           </div>
//         </div>

//         <div>
//           <div className="">
//             <FaFacebookF />
//           </div>
//           <div className="">
//             <FaInstagram />
//           </div>
//           <div className="">
//             <FaDribbble />
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default NewsLetter;
