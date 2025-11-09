import React, { useState, useEffect } from "react";
import { FaUsersLine } from "react-icons/fa6";
import { RiSecurePaymentLine, RiSoundModuleLine } from "react-icons/ri";
import { TbLocation } from "react-icons/tb";
import Title from "./Title";

// Helper component for the counting animation
const Counter = ({ targetValue, duration = 2000 }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTimestamp;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = timestamp - startTimestamp;
      const percentage = Math.min(progress / duration, 1);

      setCount(Math.floor(percentage * targetValue));

      if (progress < duration) {
        window.requestAnimationFrame(step);
      }
    };

    window.requestAnimationFrame(step);
  }, [targetValue, duration]);

  return (
    <h3 className="text-4xl sm:text-5xl font-bold text-secondary">{count}</h3>
  );
};

const Achievements = () => {
  const statistics = [
    // Added a '+' to values over 100 for better display
    {
      label: "Happy Clients",
      value: 1500,
      displayValue: "1.5K+",
      icon: <FaUsersLine />,
    },
    {
      label: "Book Titles",
      value: 2900,
      displayValue: "2.9K+",
      icon: <RiSoundModuleLine />,
    },
    {
      label: "Total Sales",
      value: 45000,
      displayValue: "45K+",
      icon: <RiSecurePaymentLine />,
    },
  ];

  const features = [
    {
      icon: <RiSecurePaymentLine />,
      title: "Secure Payments",
      description: "All transactions are fully encrypted.",
    },
    {
      icon: <RiSoundModuleLine />,
      title: "Advance Filtering",
      description: "Find books quickly with smart options.",
    },
    {
      icon: <FaUsersLine />,
      title: "Trusted Reviews",
      description: "Read honest ratings & feedback.",
    },
    {
      icon: <TbLocation />,
      title: "Live Order Tracking",
      description: "Check your order status instantly.",
    },
  ];

  return (
    <section className="max-padd-container py-12 md:py-24 bg-primary/10">
      {/* MAIN CONTAINER: Two-column grid layout for medium screens and up */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
        {/* LEFT SIDE: Journey and Statistics */}
        <div className="space-y-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight">
            Our <span className="text-secondary">Journey</span> So Far 🚀
          </h2>
          <p className="text-gray-600 text-lg">
            From a small idea to a growing library, our journey has been fueled
            by a love for stories, knowledge, and the joy of sharing books with
            readers from all walks of life.
          </p>

          {/* STATISTICS CONTAINER */}
          {/* CRITICAL CHANGE: Flex layout for statistics */}
          <div className="flex justify-between items-center flex-wrap gap-6 pt-4">
            {statistics.map((statistic, index) => (
              <div
                key={index}
                className="text-center w-full xs:w-auto p-4 bg-white shadow-lg rounded-xl flex-1 min-w-[120px] transition-all duration-300 hover:scale-[1.02]"
              >
                {/* Use the Counter component for animation */}
                <Counter targetValue={statistic.value} />
                <h4 className="text-base sm:text-lg font-semibold text-gray-800 mt-1">
                  {statistic.displayValue}
                </h4>
                <p className="text-xs text-gray-500 font-medium">
                  {statistic.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT SIDE: Features/Services */}
        <div className="pt-8 md:pt-0">
          <Title
            title1={"Why Choose"}
            title2={"Us?"}
            titleStyles={"pb-6"}
            para={
              "Beyond books, we offer a seamless and trusted shopping experience."
            }
          />

          {/* FEATURES GRID: Two-column grid for features */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex gap-4 p-4 bg-white rounded-lg shadow-md border-t-4 border-secondary/70 transition-shadow hover:shadow-xl"
              >
                <div className="text-3xl text-secondary flex-shrink-0 mt-1">
                  {feature.icon}
                </div>
                <div>
                  <h5 className="text-xl font-bold text-gray-900">
                    {feature.title}
                  </h5>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Achievements;

// import React, { useState } from "react";
// import { FaUsersLine } from "react-icons/fa6";
// import { RiSecurePaymentLine, RiSoundModuleLine } from "react-icons/ri";
// import { TbLocation } from "react-icons/tb";
// import Title from "./Title";

// const Achievements = () => {
//   const statistics = [
//     { label: "Happy clients", value: 15 },
//     { label: "Book Stock", value: 29 },
//     { label: "Total Sales", value: 45 },
//   ];

//   return (
//     <section>
//       <div>
//         {/* LEFT SIDE */}
//         <div>
//           <h2>Our Journey So Far</h2>
//           <p>
//             From a small idea to a growing library, our journey has been fueled
//             by a love for stories, knowledge, and the joy of sharing books with
//             readers from all walks of life.
//           </p>
//           {/* STATISTICS CONTAINER */}
//           <div>
//             {statistics.map((statistic, index) => (
//               <div key={index}>
//                 <h3>{statistic.value}</h3>
//                 <h4>{statistic.label}</h4>
//                 <p className="">{statistic.value}</p>
//               </div>
//             ))}
//           </div>
//           {/* RIGHT SIDE */}
//           <div className="">
//             <div>
//               <Title
//                 title1={"New"}
//                 title2={"Arrivals"}
//                 titleStyles={"pb-10"}
//                 paraStyles={"hidden"}
//               />
//               <div className="flex flex-col items-start">
//                 <div className="flexCenter gap-3 mb-3">
//                   <RiSecurePaymentLine className="text-xl" />
//                   <div>
//                     <h5 className="h5">Fast & Secure</h5>
//                     <p>Optimized performance</p>
//                   </div>
//                 </div>
//                 <div className="flexCenter gap-3 mb-3">
//                   <RiSoundModuleLine className="text-xl" />
//                   <div>
//                     <h5 className="h5">Advance Filtering</h5>
//                     <p>Find items quickly</p>
//                   </div>
//                 </div>
//                 <div className="flexCenter gap-3 mb-3">
//                   <FaUsersLine className="text-xl" />
//                   <div>
//                     <h5 className="h5">User Reviews</h5>
//                     <p>Ratings & Feedback</p>
//                   </div>
//                 </div>
//                 <div className="flexCenter gap-3 mb-3">
//                   <TbLocation className="text-xl" />
//                   <div>
//                     <h5 className="h5">Order Tracking</h5>
//                     <p>Live order status</p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Achievements;
