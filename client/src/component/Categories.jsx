import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import { categories } from "../assets/data";

const Categories = () => {
  const { navigate } = useContext(ShopContext);
  const colors = ["bg-[#aedae6]", "bg-[#fff6c9]", "bg-[#fddbdb]"];

  return (
    <section className="max-padd-container pt-16 pb-4">
      <Title
        title1={"Category"}
        title2={"List"}
        titleStyles={"pb-6"}
        paraStyles={"hidden"}
      />
      {/* Container */}
      <div className="flex flex-wrap justify-center gap-6">
        {categories.map((cat, index) => (
          <div
            key={index}
            onClick={() => navigate(`/shop/${cat.name.toLowerCase()}`)}
            className="flex flex-col items-center text-center cursor-pointer group transition-transform duration-300 hover:scale-105"
          >
            <div
              className={`relative flex items-center justify-center h-36 w-36 sm:h-40 sm:w-40 rounded-2xl overflow-hidden shadow-md transition-all duration-300 ${
                colors[index % 3]
              } group-hover:shadow-lg`}
            >
              <img
                src={cat.image}
                alt={cat.name}
                className="w-20 h-20 object-contain transition-transform duration-300 group-hover:scale-110"
              />

              {/* Optional overlay effect */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 rounded-2xl" />
            </div>

            <h5 className="mt-4 text-base font-semibold capitalize text-gray-800 group-hover:text-primary transition-colors">
              {cat.name}
            </h5>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Categories;
