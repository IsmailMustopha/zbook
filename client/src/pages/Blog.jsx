import React from "react";
import { blogs } from "../assets/data";

const Blog = () => {
  return (
    <section className="max-padd-container py-20 bg-gradient-to-b from-white to-slate-50">
      {/* HEADING */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-3">
          Latest from Our Blog
        </h2>
        <p className="text-gray-600 text-sm sm:text-base">
          Explore insights, recommendations, and inspiring reads from our book
          community.
        </p>
      </div>

      {/* BLOG GRID */}
      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 
        gap-8 gap-y-12 pt-6"
      >
        {blogs.map((blog) => (
          <article
            key={blog.title}
            className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
          >
            {/* IMAGE */}
            <div className="relative overflow-hidden">
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <span
                className="absolute top-4 left-4 bg-primary/90 text-black text-xs 
                uppercase font-semibold px-3 py-1 rounded-full"
              >
                {blog.category}
              </span>
            </div>

            {/* CONTENT */}
            <div className="p-5">
              <h5
                className="font-semibold text-lg text-gray-900 mb-2 
                group-hover:text-primary line-clamp-1"
              >
                {blog.title}
              </h5>
              <p className="text-sm text-gray-600 leading-relaxed line-clamp-3">
                {blog.description ||
                  "Discover books that spark curiosity, deliver quality, and bring inspiration to your everyday reading."}
              </p>

              {/* CTA */}
              <button
                className="mt-4 inline-flex items-center gap-1 text-sm font-semibold 
                text-primary hover:text-secondary underline transition-colors"
              >
                Continue reading
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                  />
                </svg>
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Blog;
