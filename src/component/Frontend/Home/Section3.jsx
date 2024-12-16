import "@fortawesome/fontawesome-free/css/all.min.css";
import { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const Section3 = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 }); // Initialize AOS with a custom duration
  }, []);

  const [activeSection, setActiveSection] = useState("bestSelling");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const sections = [
    { id: "bestSelling", label: "Best Selling Products" },
    { id: "children", label: "Children's Outfit" },
    { id: "floralDress", label: "Girl's Floral Dress" },
    { id: "winterWear", label: "Kids Winter Wear" },
  ];

  return (
    <div>
      <div className="relative mt-5 lg:mt-20 md:py-8 ">
        <p className="text-3xl md:text-5xl px-12 md:px-24 lg:px-96 text-center font-bold text-gray-800">
          Popular Fashion Designs For Children
        </p>
        <p className="text-gray-600 text-center px-8 md:px-24 lg:px-80 md:text-lg mt-2 md:mt-4">
          KidVerz features a massive collection of stylish and colorful designs.
          Our products have been made according to the latest fashion trends.
          When it comes to the design of children’s clothing, KidVerz is the
          best option to choose.
        </p>

        <div className="absolute hidden lg:block bottom-0 left-8  ">
          <img
            src="https://kidverz.myshopify.com/cdn/shop/files/product-tab-bubble-01.png?v=1697103126&width=200"
            alt=""
            className="ping-animation"
          />
        </div>
        <div className="absolute top-0 right-8 hidden lg:block">
          <img
            src="https://kidverz.myshopify.com/cdn/shop/files/product-tab-bubble-02.png?v=1697103125&width=200"
            alt=""
            className="slow-bounce"
          />
        </div>
      </div>

      <div className="mb-6">
        {/* Dropdown for small screens */}
        <div className="px-4">
          <div className="sm:hidden border border-black relative mt-4">
            <button
              className=" w-full py-2 px-4 text-lg font-medium  text-gray-800 hover:bg-[#F65E17] hover:text-white flex justify-between items-center"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              <span>
                {
                  sections.find((section) => section.id === activeSection)
                    ?.label
                }
              </span>
              <span>
                {dropdownOpen ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 15l7-7 7 7"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                )}
              </span>
            </button>
            {dropdownOpen && (
              <div className="absolute z-10 mt-2   bg-white shadow-md rounded-md">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    className={`w-full py-2 px-4 text-left text-lg font-medium ${
                      activeSection === section.id
                        ? "bg-[#F65E17]  text-white"
                        : "bg-gray-300 text-gray-800"
                    } hover:bg-[#F65E17]   hover:text-white`}
                    onClick={() => {
                      setActiveSection(section.id);
                      setDropdownOpen(false);
                    }}
                  >
                    {section.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Buttons for medium and larger screens */}
        <div className="hidden sm:flex justify-center px-4 mt-2 text-nowrap lg:px-0 space-x-4">
          {sections.map((section) => (
            <button
              key={section.id}
              className={`py-2 px-2 lg:px-4 lg:text-lg font-medium ${
                activeSection === section.id
                  ? "bg-[#F65E17] text-white"
                  : "bg-gray-300 text-gray-800"
              } hover:bg-[#F65E17] hover:text-white`}
              onClick={() => setActiveSection(section.id)}
            >
              {section.label}
            </button>
          ))}
        </div>
      </div>

      {activeSection === "bestSelling" && (
        <div className="section-1 container mt-6 mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Product Card 1 */}
          <div className="border shadow flex flex-col relative">
            <div className="bg-gray-100 relative">
              <img
                src="/assets/2_476edbd5-b71b-46af-aa54-6f32fd4b678c.png"
                alt="Product 1"
                className="w-full"
              />
              <div className="absolute top-2 right-2 px-1 bg-gray-200 flex items-center">
                {/* Stars */}
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <i
                      key={i}
                      className="fas fa-star text-gray-400 text-xs"
                    ></i>
                  ))}
                </div>
                {/* Rating */}
                <span className="text-gray-800 ms-1">(0)</span>
              </div>

              {/* Icons */}
              <div className="absolute flex justify-center gap-2 bottom-4 w-full opacity-0 hover:opacity-100 transition-transform duration-300 transform translate-y-full hover:translate-y-1">
                {/* Cart Icon */}
                <div className="relative group">
                  <div className="w-10 h-10 bg-gray-800 flex justify-center items-center rounded hover:bg-[#F65E17] transition duration-300">
                    <i className="fa fa-shopping-cart text-white"></i>
                  </div>
                  {/* Tooltip */}
                  <span className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition text-nowrap">
                    Add to Cart
                  </span>
                </div>

                {/* Wishlist Icon */}
                <div className="relative group">
                  <div className="w-10 h-10 bg-gray-800 flex justify-center items-center rounded hover:bg-[#F65E17] transition duration-300">
                    <i className="far fa-heart text-white"></i>
                  </div>
                  {/* Tooltip */}
                  <span className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition text-nowrap">
                    Add to Wishlist
                  </span>
                </div>

                {/* View Icon */}
                <div className="relative group">
                  <div className="w-10 h-10 bg-gray-800 flex justify-center items-center rounded hover:bg-[#F65E17] transition duration-300">
                    <i className="far fa-eye text-white"></i>
                  </div>
                  {/* Tooltip */}
                  <span className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition text-nowrap">
                    View Product
                  </span>
                </div>

                {/* Comparison Icon */}
                <div className="relative group">
                  <div className="w-10 h-10 bg-gray-800 flex justify-center items-center rounded hover:bg-[#F65E17] transition duration-300">
                    <i className="fa fa-exchange-alt text-white"></i>
                  </div>
                  {/* Tooltip */}
                  <span className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition text-now">
                    Compare
                  </span>
                </div>
              </div>
            </div>

            {/* Product Info */}
            <div className="px-4 py-2">
              <h2 className="text-lg font-medium text-gray-800 md:text-xl">
                Product Name 1
              </h2>
              <p className="mt-1 text-lg font-semibold text-gray-800 md:text-xl">
                $20.00
              </p>
              <div className="mt-2 flex gap-2">
                {["red", "yellow", "purple", "green", "blue"].map((color) => (
                  <button
                    key={color}
                    className="rounded-full w-6 h-6 border-2 border-gray-400 flex justify-center items-center"
                  >
                    <div
                      className={`bg-${color}-500 rounded-full w-4 h-4`}
                    ></div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Product Card 2 */}
          <div className="border shadow flex flex-col relative">
            <div className="bg-gray-100 relative">
              <img
                src="/assets/3_c734eebd-04b1-41dd-9a2f-1207e4061d5f.png"
                alt="Product 1"
                className="w-full"
              />
              <div className="absolute top-2 right-2 px-1 bg-gray-200 flex items-center">
                {/* Stars */}
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <i
                      key={i}
                      className="fas fa-star text-gray-400 text-xs"
                    ></i>
                  ))}
                </div>
                {/* Rating */}
                <span className="text-gray-800 ms-1">(0)</span>
              </div>

              {/* Icons */}
              <div className="absolute flex justify-center gap-2 bottom-4 w-full opacity-0 hover:opacity-100 transition-transform duration-300 transform translate-y-full hover:translate-y-1">
                {/* Cart Icon */}
                <div className="relative group">
                  <div className="w-10 h-10 bg-gray-800 flex justify-center items-center rounded hover:bg-[#F65E17] transition duration-300">
                    <i className="fa fa-shopping-cart text-white"></i>
                  </div>
                  {/* Tooltip */}
                  <span className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition text-nowrap">
                    Add to Cart
                  </span>
                </div>

                {/* Wishlist Icon */}
                <div className="relative group">
                  <div className="w-10 h-10 bg-gray-800 flex justify-center items-center rounded hover:bg-[#F65E17] transition duration-300">
                    <i className="far fa-heart text-white"></i>
                  </div>
                  {/* Tooltip */}
                  <span className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition text-nowrap">
                    Add to Wishlist
                  </span>
                </div>

                {/* View Icon */}
                <div className="relative group">
                  <div className="w-10 h-10 bg-gray-800 flex justify-center items-center rounded hover:bg-[#F65E17] transition duration-300">
                    <i className="far fa-eye text-white"></i>
                  </div>
                  {/* Tooltip */}
                  <span className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition text-nowrap">
                    View Product
                  </span>
                </div>

                {/* Comparison Icon */}
                <div className="relative group">
                  <div className="w-10 h-10 bg-gray-800 flex justify-center items-center rounded hover:bg-[#F65E17] transition duration-300">
                    <i className="fa fa-exchange-alt text-white"></i>
                  </div>
                  {/* Tooltip */}
                  <span className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition text-now">
                    Compare
                  </span>
                </div>
              </div>
            </div>

            {/* Product Info */}
            <div className="px-4 py-2">
              <h2 className="text-lg font-medium text-gray-800 md:text-xl">
                Product Name 1
              </h2>
              <p className="mt-1 text-lg font-semibold text-gray-800 md:text-xl">
                $20.00
              </p>
              <div className="mt-2 flex gap-2">
                {["red", "yellow", "purple", "green", "blue"].map((color) => (
                  <button
                    key={color}
                    className="rounded-full w-6 h-6 border-2 border-gray-400 flex justify-center items-center"
                  >
                    <div
                      className={`bg-${color}-500 rounded-full w-4 h-4`}
                    ></div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Product Card 3 */}
          <div className="border shadow flex flex-col relative">
            <div className="bg-gray-100 relative">
              <img
                src="/assets/3_661895b7-64eb-4383-bd17-7e786014f024.png"
                alt="Product 1"
                className="w-full"
              />
              <div className="absolute top-2 right-2 px-1 bg-gray-200 flex items-center">
                {/* Stars */}
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <i
                      key={i}
                      className="fas fa-star text-gray-400 text-xs"
                    ></i>
                  ))}
                </div>
                {/* Rating */}
                <span className="text-gray-800 ms-1">(0)</span>
              </div>

              {/* Icons */}
              <div className="absolute flex justify-center gap-2 bottom-4 w-full opacity-0 hover:opacity-100 transition-transform duration-300 transform translate-y-full hover:translate-y-1">
                {/* Cart Icon */}
                <div className="relative group">
                  <div className="w-10 h-10 bg-gray-800 flex justify-center items-center rounded hover:bg-[#F65E17] transition duration-300">
                    <i className="fa fa-shopping-cart text-white"></i>
                  </div>
                  {/* Tooltip */}
                  <span className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition text-nowrap">
                    Add to Cart
                  </span>
                </div>

                {/* Wishlist Icon */}
                <div className="relative group">
                  <div className="w-10 h-10 bg-gray-800 flex justify-center items-center rounded hover:bg-[#F65E17] transition duration-300">
                    <i className="far fa-heart text-white"></i>
                  </div>
                  {/* Tooltip */}
                  <span className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition text-nowrap">
                    Add to Wishlist
                  </span>
                </div>

                {/* View Icon */}
                <div className="relative group">
                  <div className="w-10 h-10 bg-gray-800 flex justify-center items-center rounded hover:bg-[#F65E17] transition duration-300">
                    <i className="far fa-eye text-white"></i>
                  </div>
                  {/* Tooltip */}
                  <span className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition text-nowrap">
                    View Product
                  </span>
                </div>

                {/* Comparison Icon */}
                <div className="relative group">
                  <div className="w-10 h-10 bg-gray-800 flex justify-center items-center rounded hover:bg-[#F65E17] transition duration-300">
                    <i className="fa fa-exchange-alt text-white"></i>
                  </div>
                  {/* Tooltip */}
                  <span className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition text-now">
                    Compare
                  </span>
                </div>
              </div>
            </div>

            {/* Product Info */}
            <div className="px-4 py-2">
              <h2 className="text-lg font-medium text-gray-800 md:text-xl">
                Product Name 1
              </h2>
              <p className="mt-1 text-lg font-semibold text-gray-800 md:text-xl">
                $20.00
              </p>
              <div className="mt-2 flex gap-2">
                {["red", "yellow", "purple", "green", "blue"].map((color) => (
                  <button
                    key={color}
                    className="rounded-full w-6 h-6 border-2 border-gray-400 flex justify-center items-center"
                  >
                    <div
                      className={`bg-${color}-500 rounded-full w-4 h-4`}
                    ></div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Product Card 4 */}
          <div className="border shadow flex flex-col relative">
            <div className="bg-gray-100 relative">
              <img
                src="/assets/3_bf9b8b28-9464-454e-bd49-61f655d923d8.png"
                alt="Product 1"
                className="w-full"
              />
              <div className="absolute top-2 right-2 px-1 bg-gray-200 flex items-center">
                {/* Stars */}
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <i
                      key={i}
                      className="fas fa-star text-gray-400 text-xs"
                    ></i>
                  ))}
                </div>
                {/* Rating */}
                <span className="text-gray-800 ms-1">(0)</span>
              </div>

              {/* Icons */}
              <div className="absolute flex justify-center gap-2 bottom-4 w-full opacity-0 hover:opacity-100 transition-transform duration-300 transform translate-y-full hover:translate-y-1">
                {/* Cart Icon */}
                <div className="relative group">
                  <div className="w-10 h-10 bg-gray-800 flex justify-center items-center rounded hover:bg-[#F65E17] transition duration-300">
                    <i className="fa fa-shopping-cart text-white"></i>
                  </div>
                  {/* Tooltip */}
                  <span className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition text-nowrap">
                    Add to Cart
                  </span>
                </div>

                {/* Wishlist Icon */}
                <div className="relative group">
                  <div className="w-10 h-10 bg-gray-800 flex justify-center items-center rounded hover:bg-[#F65E17] transition duration-300">
                    <i className="far fa-heart text-white"></i>
                  </div>
                  {/* Tooltip */}
                  <span className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition text-nowrap">
                    Add to Wishlist
                  </span>
                </div>

                {/* View Icon */}
                <div className="relative group">
                  <div className="w-10 h-10 bg-gray-800 flex justify-center items-center rounded hover:bg-[#F65E17] transition duration-300">
                    <i className="far fa-eye text-white"></i>
                  </div>
                  {/* Tooltip */}
                  <span className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition text-nowrap">
                    View Product
                  </span>
                </div>

                {/* Comparison Icon */}
                <div className="relative group">
                  <div className="w-10 h-10 bg-gray-800 flex justify-center items-center rounded hover:bg-[#F65E17] transition duration-300">
                    <i className="fa fa-exchange-alt text-white"></i>
                  </div>
                  {/* Tooltip */}
                  <span className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition text-now">
                    Compare
                  </span>
                </div>
              </div>
            </div>

            {/* Product Info */}
            <div className="px-4 py-2">
              <h2 className="text-lg font-medium text-gray-800 md:text-xl">
                Product Name 1
              </h2>
              <p className="mt-1 text-lg font-semibold text-gray-800 md:text-xl">
                $20.00
              </p>
              <div className="mt-2 flex gap-2">
                {["red", "yellow", "purple", "green", "blue"].map((color) => (
                  <button
                    key={color}
                    className="rounded-full w-6 h-6 border-2 border-gray-400 flex justify-center items-center"
                  >
                    <div
                      className={`bg-${color}-500 rounded-full w-4 h-4`}
                    ></div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {activeSection === "children" && (
        <div className="section-2 container mt-6 mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Product Card 1 */}
          <div className="border shadow flex flex-col relative">
            <div className="bg-gray-100 relative">
              <img
                src="/assets/3_7386ead7-b74b-43ec-be8c-69e0262c58f0.png"
                alt="Product 1"
                className="w-full"
              />
              <div className="absolute top-2 right-2 px-1 bg-gray-200 flex items-center">
                {/* Stars */}
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <i
                      key={i}
                      className="fas fa-star text-gray-400 text-xs"
                    ></i>
                  ))}
                </div>
                {/* Rating */}
                <span className="text-gray-800 ms-1">(0)</span>
              </div>

              {/* Icons */}
              <div className="absolute flex justify-center gap-2 bottom-4 w-full opacity-0 hover:opacity-100 transition-transform duration-300 transform translate-y-full hover:translate-y-1">
                {/* Cart Icon */}
                <div className="relative group">
                  <div className="w-10 h-10 bg-gray-800 flex justify-center items-center rounded hover:bg-[#F65E17] transition duration-300">
                    <i className="fa fa-shopping-cart text-white"></i>
                  </div>
                  {/* Tooltip */}
                  <span className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition text-nowrap">
                    Add to Cart
                  </span>
                </div>

                {/* Wishlist Icon */}
                <div className="relative group">
                  <div className="w-10 h-10 bg-gray-800 flex justify-center items-center rounded hover:bg-[#F65E17] transition duration-300">
                    <i className="far fa-heart text-white"></i>
                  </div>
                  {/* Tooltip */}
                  <span className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition text-nowrap">
                    Add to Wishlist
                  </span>
                </div>

                {/* View Icon */}
                <div className="relative group">
                  <div className="w-10 h-10 bg-gray-800 flex justify-center items-center rounded hover:bg-[#F65E17] transition duration-300">
                    <i className="far fa-eye text-white"></i>
                  </div>
                  {/* Tooltip */}
                  <span className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition text-nowrap">
                    View Product
                  </span>
                </div>

                {/* Comparison Icon */}
                <div className="relative group">
                  <div className="w-10 h-10 bg-gray-800 flex justify-center items-center rounded hover:bg-[#F65E17] transition duration-300">
                    <i className="fa fa-exchange-alt text-white"></i>
                  </div>
                  {/* Tooltip */}
                  <span className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition text-now">
                    Compare
                  </span>
                </div>
              </div>
            </div>

            {/* Product Info */}
            <div className="px-4 py-2">
              <h2 className="text-lg font-medium text-gray-800 md:text-xl">
                Product Name 1
              </h2>
              <p className="mt-1 text-lg font-semibold text-gray-800 md:text-xl">
                $20.00
              </p>
              <div className="mt-2 flex gap-2">
                {["red", "yellow", "purple", "green", "blue"].map((color) => (
                  <button
                    key={color}
                    className="rounded-full w-6 h-6 border-2 border-gray-400 flex justify-center items-center"
                  >
                    <div
                      className={`bg-${color}-500 rounded-full w-4 h-4`}
                    ></div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Product Card 2 */}
          <div className="border shadow flex flex-col relative">
            <div className="bg-gray-100 relative">
              <img
                src="/assets/3_ba7fc3c5-8176-4e76-a006-e034e6a1552d.png"
                alt="Product 1"
                className="w-full"
              />
              <div className="absolute top-2 right-2 px-1 bg-gray-200 flex items-center">
                {/* Stars */}
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <i
                      key={i}
                      className="fas fa-star text-gray-400 text-xs"
                    ></i>
                  ))}
                </div>
                {/* Rating */}
                <span className="text-gray-800 ms-1">(0)</span>
              </div>

              {/* Icons */}
              <div className="absolute flex justify-center gap-2 bottom-4 w-full opacity-0 hover:opacity-100 transition-transform duration-300 transform translate-y-full hover:translate-y-1">
                {/* Cart Icon */}
                <div className="relative group">
                  <div className="w-10 h-10 bg-gray-800 flex justify-center items-center rounded hover:bg-[#F65E17] transition duration-300">
                    <i className="fa fa-shopping-cart text-white"></i>
                  </div>
                  {/* Tooltip */}
                  <span className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition text-nowrap">
                    Add to Cart
                  </span>
                </div>

                {/* Wishlist Icon */}
                <div className="relative group">
                  <div className="w-10 h-10 bg-gray-800 flex justify-center items-center rounded hover:bg-[#F65E17] transition duration-300">
                    <i className="far fa-heart text-white"></i>
                  </div>
                  {/* Tooltip */}
                  <span className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition text-nowrap">
                    Add to Wishlist
                  </span>
                </div>

                {/* View Icon */}
                <div className="relative group">
                  <div className="w-10 h-10 bg-gray-800 flex justify-center items-center rounded hover:bg-[#F65E17] transition duration-300">
                    <i className="far fa-eye text-white"></i>
                  </div>
                  {/* Tooltip */}
                  <span className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition text-nowrap">
                    View Product
                  </span>
                </div>

                {/* Comparison Icon */}
                <div className="relative group">
                  <div className="w-10 h-10 bg-gray-800 flex justify-center items-center rounded hover:bg-[#F65E17] transition duration-300">
                    <i className="fa fa-exchange-alt text-white"></i>
                  </div>
                  {/* Tooltip */}
                  <span className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition text-now">
                    Compare
                  </span>
                </div>
              </div>
            </div>

            {/* Product Info */}
            <div className="px-4 py-2">
              <h2 className="text-lg font-medium text-gray-800 md:text-xl">
                Product Name 1
              </h2>
              <p className="mt-1 text-lg font-semibold text-gray-800 md:text-xl">
                $20.00
              </p>
              <div className="mt-2 flex gap-2">
                {["red", "yellow", "purple", "green", "blue"].map((color) => (
                  <button
                    key={color}
                    className="rounded-full w-6 h-6 border-2 border-gray-400 flex justify-center items-center"
                  >
                    <div
                      className={`bg-${color}-500 rounded-full w-4 h-4`}
                    ></div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Product Card 3 */}
          <div className="border shadow flex flex-col relative">
            <div className="bg-gray-100 relative">
              <img
                src="/assets/3_87c64513-ec7e-4102-951a-1b3d78b652a5.png"
                alt="Product 1"
                className="w-full"
              />
              <div className="absolute top-2 right-2 px-1 bg-gray-200 flex items-center">
                {/* Stars */}
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <i
                      key={i}
                      className="fas fa-star text-gray-400 text-xs"
                    ></i>
                  ))}
                </div>
                {/* Rating */}
                <span className="text-gray-800 ms-1">(0)</span>
              </div>

              {/* Icons */}
              <div className="absolute flex justify-center gap-2 bottom-4 w-full opacity-0 hover:opacity-100 transition-transform duration-300 transform translate-y-full hover:translate-y-1">
                {/* Cart Icon */}
                <div className="relative group">
                  <div className="w-10 h-10 bg-gray-800 flex justify-center items-center rounded hover:bg-[#F65E17] transition duration-300">
                    <i className="fa fa-shopping-cart text-white"></i>
                  </div>
                  {/* Tooltip */}
                  <span className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition text-nowrap">
                    Add to Cart
                  </span>
                </div>

                {/* Wishlist Icon */}
                <div className="relative group">
                  <div className="w-10 h-10 bg-gray-800 flex justify-center items-center rounded hover:bg-[#F65E17] transition duration-300">
                    <i className="far fa-heart text-white"></i>
                  </div>
                  {/* Tooltip */}
                  <span className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition text-nowrap">
                    Add to Wishlist
                  </span>
                </div>

                {/* View Icon */}
                <div className="relative group">
                  <div className="w-10 h-10 bg-gray-800 flex justify-center items-center rounded hover:bg-[#F65E17] transition duration-300">
                    <i className="far fa-eye text-white"></i>
                  </div>
                  {/* Tooltip */}
                  <span className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition text-nowrap">
                    View Product
                  </span>
                </div>

                {/* Comparison Icon */}
                <div className="relative group">
                  <div className="w-10 h-10 bg-gray-800 flex justify-center items-center rounded hover:bg-[#F65E17] transition duration-300">
                    <i className="fa fa-exchange-alt text-white"></i>
                  </div>
                  {/* Tooltip */}
                  <span className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition text-now">
                    Compare
                  </span>
                </div>
              </div>
            </div>

            {/* Product Info */}
            <div className="px-4 py-2">
              <h2 className="text-lg font-medium text-gray-800 md:text-xl">
                Product Name 1
              </h2>
              <p className="mt-1 text-lg font-semibold text-gray-800 md:text-xl">
                $20.00
              </p>
              <div className="mt-2 flex gap-2">
                {["red", "yellow", "purple", "green", "blue"].map((color) => (
                  <button
                    key={color}
                    className="rounded-full w-6 h-6 border-2 border-gray-400 flex justify-center items-center"
                  >
                    <div
                      className={`bg-${color}-500 rounded-full w-4 h-4`}
                    ></div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Product Card 4 */}
          <div className="border shadow flex flex-col relative">
            <div className="bg-gray-100 relative">
              <img
                src="/assets/3_c18df65b-ea3b-41e9-9905-584507bdd54b.png"
                alt="Product 1"
                className="w-full"
              />
              <div className="absolute top-2 right-2 px-1 bg-gray-200 flex items-center">
                {/* Stars */}
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <i
                      key={i}
                      className="fas fa-star text-gray-400 text-xs"
                    ></i>
                  ))}
                </div>
                {/* Rating */}
                <span className="text-gray-800 ms-1">(0)</span>
              </div>

              {/* Icons */}
              <div className="absolute flex justify-center gap-2 bottom-4 w-full opacity-0 hover:opacity-100 transition-transform duration-300 transform translate-y-full hover:translate-y-1">
                {/* Cart Icon */}
                <div className="relative group">
                  <div className="w-10 h-10 bg-gray-800 flex justify-center items-center rounded hover:bg-[#F65E17] transition duration-300">
                    <i className="fa fa-shopping-cart text-white"></i>
                  </div>
                  {/* Tooltip */}
                  <span className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition text-nowrap">
                    Add to Cart
                  </span>
                </div>

                {/* Wishlist Icon */}
                <div className="relative group">
                  <div className="w-10 h-10 bg-gray-800 flex justify-center items-center rounded hover:bg-[#F65E17] transition duration-300">
                    <i className="far fa-heart text-white"></i>
                  </div>
                  {/* Tooltip */}
                  <span className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition text-nowrap">
                    Add to Wishlist
                  </span>
                </div>

                {/* View Icon */}
                <div className="relative group">
                  <div className="w-10 h-10 bg-gray-800 flex justify-center items-center rounded hover:bg-[#F65E17] transition duration-300">
                    <i className="far fa-eye text-white"></i>
                  </div>
                  {/* Tooltip */}
                  <span className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition text-nowrap">
                    View Product
                  </span>
                </div>

                {/* Comparison Icon */}
                <div className="relative group">
                  <div className="w-10 h-10 bg-gray-800 flex justify-center items-center rounded hover:bg-[#F65E17] transition duration-300">
                    <i className="fa fa-exchange-alt text-white"></i>
                  </div>
                  {/* Tooltip */}
                  <span className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition text-now">
                    Compare
                  </span>
                </div>
              </div>
            </div>

            {/* Product Info */}
            <div className="px-4 py-2">
              <h2 className="text-lg font-medium text-gray-800 md:text-xl">
                Product Name 1
              </h2>
              <p className="mt-1 text-lg font-semibold text-gray-800 md:text-xl">
                $20.00
              </p>
              <div className="mt-2 flex gap-2">
                {["red", "yellow", "purple", "green", "blue"].map((color) => (
                  <button
                    key={color}
                    className="rounded-full w-6 h-6 border-2 border-gray-400 flex justify-center items-center"
                  >
                    <div
                      className={`bg-${color}-500 rounded-full w-4 h-4`}
                    ></div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {activeSection === "floralDress" && (
        <div className="section-3 container mt-6 mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Product Card 1 */}
          <div className="border shadow flex flex-col relative">
            <div className="bg-gray-100 relative">
              <img src="/assets/2.png" alt="Product 1" className="w-full" />
              <div className="absolute top-2 right-2 px-1 bg-gray-200 flex items-center">
                {/* Stars */}
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <i
                      key={i}
                      className="fas fa-star text-gray-400 text-xs"
                    ></i>
                  ))}
                </div>
                {/* Rating */}
                <span className="text-gray-800 ms-1">(0)</span>
              </div>

              {/* Icons */}
              <div className="absolute flex justify-center gap-2 bottom-4 w-full opacity-0 hover:opacity-100 transition-transform duration-300 transform translate-y-full hover:translate-y-1">
                {/* Cart Icon */}
                <div className="relative group">
                  <div className="w-10 h-10 bg-gray-800 flex justify-center items-center rounded hover:bg-[#F65E17] transition duration-300">
                    <i className="fa fa-shopping-cart text-white"></i>
                  </div>
                  {/* Tooltip */}
                  <span className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition text-nowrap">
                    Add to Cart
                  </span>
                </div>

                {/* Wishlist Icon */}
                <div className="relative group">
                  <div className="w-10 h-10 bg-gray-800 flex justify-center items-center rounded hover:bg-[#F65E17] transition duration-300">
                    <i className="far fa-heart text-white"></i>
                  </div>
                  {/* Tooltip */}
                  <span className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition text-nowrap">
                    Add to Wishlist
                  </span>
                </div>

                {/* View Icon */}
                <div className="relative group">
                  <div className="w-10 h-10 bg-gray-800 flex justify-center items-center rounded hover:bg-[#F65E17] transition duration-300">
                    <i className="far fa-eye text-white"></i>
                  </div>
                  {/* Tooltip */}
                  <span className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition text-nowrap">
                    View Product
                  </span>
                </div>

                {/* Comparison Icon */}
                <div className="relative group">
                  <div className="w-10 h-10 bg-gray-800 flex justify-center items-center rounded hover:bg-[#F65E17] transition duration-300">
                    <i className="fa fa-exchange-alt text-white"></i>
                  </div>
                  {/* Tooltip */}
                  <span className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition text-now">
                    Compare
                  </span>
                </div>
              </div>
            </div>

            {/* Product Info */}
            <div className="px-4 py-2">
              <h2 className="text-lg font-medium text-gray-800 md:text-xl">
                Product Name 1
              </h2>
              <p className="mt-1 text-lg font-semibold text-gray-800 md:text-xl">
                $20.00
              </p>
              <div className="mt-2 flex gap-2">
                {["red", "yellow", "purple", "green", "blue"].map((color) => (
                  <button
                    key={color}
                    className="rounded-full w-6 h-6 border-2 border-gray-400 flex justify-center items-center"
                  >
                    <div
                      className={`bg-${color}-500 rounded-full w-4 h-4`}
                    ></div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Product Card 2 */}
          <div className="border shadow flex flex-col relative">
            <div className="bg-gray-100 relative">
              <img
                src="/assets/3_ba7fc3c5-8176-4e76-a006-e034e6a1552d.png"
                alt="Product 1"
                className="w-full"
              />
              <div className="absolute top-2 right-2 px-1 bg-gray-200 flex items-center">
                {/* Stars */}
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <i
                      key={i}
                      className="fas fa-star text-gray-400 text-xs"
                    ></i>
                  ))}
                </div>
                {/* Rating */}
                <span className="text-gray-800 ms-1">(0)</span>
              </div>

              {/* Icons */}
              <div className="absolute flex justify-center gap-2 bottom-4 w-full opacity-0 hover:opacity-100 transition-transform duration-300 transform translate-y-full hover:translate-y-1">
                {/* Cart Icon */}
                <div className="relative group">
                  <div className="w-10 h-10 bg-gray-800 flex justify-center items-center rounded hover:bg-[#F65E17] transition duration-300">
                    <i className="fa fa-shopping-cart text-white"></i>
                  </div>
                  {/* Tooltip */}
                  <span className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition text-nowrap">
                    Add to Cart
                  </span>
                </div>

                {/* Wishlist Icon */}
                <div className="relative group">
                  <div className="w-10 h-10 bg-gray-800 flex justify-center items-center rounded hover:bg-[#F65E17] transition duration-300">
                    <i className="far fa-heart text-white"></i>
                  </div>
                  {/* Tooltip */}
                  <span className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition text-nowrap">
                    Add to Wishlist
                  </span>
                </div>

                {/* View Icon */}
                <div className="relative group">
                  <div className="w-10 h-10 bg-gray-800 flex justify-center items-center rounded hover:bg-[#F65E17] transition duration-300">
                    <i className="far fa-eye text-white"></i>
                  </div>
                  {/* Tooltip */}
                  <span className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition text-nowrap">
                    View Product
                  </span>
                </div>

                {/* Comparison Icon */}
                <div className="relative group">
                  <div className="w-10 h-10 bg-gray-800 flex justify-center items-center rounded hover:bg-[#F65E17] transition duration-300">
                    <i className="fa fa-exchange-alt text-white"></i>
                  </div>
                  {/* Tooltip */}
                  <span className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition text-now">
                    Compare
                  </span>
                </div>
              </div>
            </div>

            {/* Product Info */}
            <div className="px-4 py-2">
              <h2 className="text-lg font-medium text-gray-800 md:text-xl">
                Product Name 1
              </h2>
              <p className="mt-1 text-lg font-semibold text-gray-800 md:text-xl">
                $20.00
              </p>
              <div className="mt-2 flex gap-2">
                {["red", "yellow", "purple", "green", "blue"].map((color) => (
                  <button
                    key={color}
                    className="rounded-full w-6 h-6 border-2 border-gray-400 flex justify-center items-center"
                  >
                    <div
                      className={`bg-${color}-500 rounded-full w-4 h-4`}
                    ></div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Product Card 3 */}
          <div className="border shadow flex flex-col relative">
            <div className="bg-gray-100 relative">
              <img
                src="/assets/3_c2a434c5-feaf-4dd4-b2d1-d608863472f9.png"
                alt="Product 1"
                className="w-full"
              />
              <div className="absolute top-2 right-2 px-1 bg-gray-200 flex items-center">
                {/* Stars */}
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <i
                      key={i}
                      className="fas fa-star text-gray-400 text-xs"
                    ></i>
                  ))}
                </div>
                {/* Rating */}
                <span className="text-gray-800 ms-1">(0)</span>
              </div>

              {/* Icons */}
              <div className="absolute flex justify-center gap-2 bottom-4 w-full opacity-0 hover:opacity-100 transition-transform duration-300 transform translate-y-full hover:translate-y-1">
                {/* Cart Icon */}
                <div className="relative group">
                  <div className="w-10 h-10 bg-gray-800 flex justify-center items-center rounded hover:bg-[#F65E17] transition duration-300">
                    <i className="fa fa-shopping-cart text-white"></i>
                  </div>
                  {/* Tooltip */}
                  <span className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition text-nowrap">
                    Add to Cart
                  </span>
                </div>

                {/* Wishlist Icon */}
                <div className="relative group">
                  <div className="w-10 h-10 bg-gray-800 flex justify-center items-center rounded hover:bg-[#F65E17] transition duration-300">
                    <i className="far fa-heart text-white"></i>
                  </div>
                  {/* Tooltip */}
                  <span className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition text-nowrap">
                    Add to Wishlist
                  </span>
                </div>

                {/* View Icon */}
                <div className="relative group">
                  <div className="w-10 h-10 bg-gray-800 flex justify-center items-center rounded hover:bg-[#F65E17] transition duration-300">
                    <i className="far fa-eye text-white"></i>
                  </div>
                  {/* Tooltip */}
                  <span className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition text-nowrap">
                    View Product
                  </span>
                </div>

                {/* Comparison Icon */}
                <div className="relative group">
                  <div className="w-10 h-10 bg-gray-800 flex justify-center items-center rounded hover:bg-[#F65E17] transition duration-300">
                    <i className="fa fa-exchange-alt text-white"></i>
                  </div>
                  {/* Tooltip */}
                  <span className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition text-now">
                    Compare
                  </span>
                </div>
              </div>
            </div>

            {/* Product Info */}
            <div className="px-4 py-2">
              <h2 className="text-lg font-medium text-gray-800 md:text-xl">
                Product Name 1
              </h2>
              <p className="mt-1 text-lg font-semibold text-gray-800 md:text-xl">
                $20.00
              </p>
              <div className="mt-2 flex gap-2">
                {["red", "yellow", "purple", "green", "blue"].map((color) => (
                  <button
                    key={color}
                    className="rounded-full w-6 h-6 border-2 border-gray-400 flex justify-center items-center"
                  >
                    <div
                      className={`bg-${color}-500 rounded-full w-4 h-4`}
                    ></div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Product Card 4 */}
          <div className="border shadow flex flex-col relative">
            <div className="bg-gray-100 relative">
              <img
                src="/assets/3_84cd0b80-c105-46de-a622-fe7963873cae.png"
                alt="Product 1"
                className="w-full"
              />
              <div className="absolute top-2 right-2 px-1 bg-gray-200 flex items-center">
                {/* Stars */}
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <i
                      key={i}
                      className="fas fa-star text-gray-400 text-xs"
                    ></i>
                  ))}
                </div>
                {/* Rating */}
                <span className="text-gray-800 ms-1">(0)</span>
              </div>

              {/* Icons */}
              <div className="absolute flex justify-center gap-2 bottom-4 w-full opacity-0 hover:opacity-100 transition-transform duration-300 transform translate-y-full hover:translate-y-1">
                {/* Cart Icon */}
                <div className="relative group">
                  <div className="w-10 h-10 bg-gray-800 flex justify-center items-center rounded hover:bg-[#F65E17] transition duration-300">
                    <i className="fa fa-shopping-cart text-white"></i>
                  </div>
                  {/* Tooltip */}
                  <span className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition text-nowrap">
                    Add to Cart
                  </span>
                </div>

                {/* Wishlist Icon */}
                <div className="relative group">
                  <div className="w-10 h-10 bg-gray-800 flex justify-center items-center rounded hover:bg-[#F65E17] transition duration-300">
                    <i className="far fa-heart text-white"></i>
                  </div>
                  {/* Tooltip */}
                  <span className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition text-nowrap">
                    Add to Wishlist
                  </span>
                </div>

                {/* View Icon */}
                <div className="relative group">
                  <div className="w-10 h-10 bg-gray-800 flex justify-center items-center rounded hover:bg-[#F65E17] transition duration-300">
                    <i className="far fa-eye text-white"></i>
                  </div>
                  {/* Tooltip */}
                  <span className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition text-nowrap">
                    View Product
                  </span>
                </div>

                {/* Comparison Icon */}
                <div className="relative group">
                  <div className="w-10 h-10 bg-gray-800 flex justify-center items-center rounded hover:bg-[#F65E17] transition duration-300">
                    <i className="fa fa-exchange-alt text-white"></i>
                  </div>
                  {/* Tooltip */}
                  <span className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition text-now">
                    Compare
                  </span>
                </div>
              </div>
            </div>

            {/* Product Info */}
            <div className="px-4 py-2">
              <h2 className="text-lg font-medium text-gray-800 md:text-xl">
                Product Name 1
              </h2>
              <p className="mt-1 text-lg font-semibold text-gray-800 md:text-xl">
                $20.00
              </p>
              <div className="mt-2 flex gap-2">
                {["red", "yellow", "purple", "green", "blue"].map((color) => (
                  <button
                    key={color}
                    className="rounded-full w-6 h-6 border-2 border-gray-400 flex justify-center items-center"
                  >
                    <div
                      className={`bg-${color}-500 rounded-full w-4 h-4`}
                    ></div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {activeSection === "winterWear" && (
        <div className="section-4 container mt-6 mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Product Card 1 */}
          <div className="border shadow flex flex-col relative">
            <div className="bg-gray-100 relative">
              <img
                src="/assets/3_87c64513-ec7e-4102-951a-1b3d78b652a5.png"
                alt="Product 1"
                className="w-full"
              />
              <div className="absolute top-2 right-2 px-1 bg-gray-200 flex items-center">
                {/* Stars */}
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <i
                      key={i}
                      className="fas fa-star text-gray-400 text-xs"
                    ></i>
                  ))}
                </div>
                {/* Rating */}
                <span className="text-gray-800 ms-1">(0)</span>
              </div>

              {/* Icons */}
              <div className="absolute flex justify-center gap-2 bottom-4 w-full opacity-0 hover:opacity-100 transition-transform duration-300 transform translate-y-full hover:translate-y-1">
                {/* Cart Icon */}
                <div className="relative group">
                  <div className="w-10 h-10 bg-gray-800 flex justify-center items-center rounded hover:bg-[#F65E17] transition duration-300">
                    <i className="fa fa-shopping-cart text-white"></i>
                  </div>
                  {/* Tooltip */}
                  <span className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition text-nowrap">
                    Add to Cart
                  </span>
                </div>

                {/* Wishlist Icon */}
                <div className="relative group">
                  <div className="w-10 h-10 bg-gray-800 flex justify-center items-center rounded hover:bg-[#F65E17] transition duration-300">
                    <i className="far fa-heart text-white"></i>
                  </div>
                  {/* Tooltip */}
                  <span className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition text-nowrap">
                    Add to Wishlist
                  </span>
                </div>

                {/* View Icon */}
                <div className="relative group">
                  <div className="w-10 h-10 bg-gray-800 flex justify-center items-center rounded hover:bg-[#F65E17] transition duration-300">
                    <i className="far fa-eye text-white"></i>
                  </div>
                  {/* Tooltip */}
                  <span className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition text-nowrap">
                    View Product
                  </span>
                </div>

                {/* Comparison Icon */}
                <div className="relative group">
                  <div className="w-10 h-10 bg-gray-800 flex justify-center items-center rounded hover:bg-[#F65E17] transition duration-300">
                    <i className="fa fa-exchange-alt text-white"></i>
                  </div>
                  {/* Tooltip */}
                  <span className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition text-now">
                    Compare
                  </span>
                </div>
              </div>
            </div>

            {/* Product Info */}
            <div className="px-4 py-2">
              <h2 className="text-lg font-medium text-gray-800 md:text-xl">
                Product Name 47
              </h2>
              <p className="mt-1 text-lg font-semibold text-gray-800 md:text-xl">
                $32.00
              </p>
              <div className="mt-2 flex gap-2">
                {["red", "yellow", "purple", "green", "blue"].map((color) => (
                  <button
                    key={color}
                    className="rounded-full w-6 h-6 border-2 border-gray-400 flex justify-center items-center"
                  >
                    <div
                      className={`bg-${color}-500 rounded-full w-4 h-4`}
                    ></div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Product Card 2 */}
          <div className="border shadow flex flex-col relative">
            <div className="bg-gray-100 relative">
              <img
                src="/assets/3_cdac32eb-a757-4ab0-aa3a-9ea359456543.png"
                alt="Product 1"
                className="w-full"
              />
              <div className="absolute top-2 right-2 px-1 bg-gray-200 flex items-center">
                {/* Stars */}
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <i
                      key={i}
                      className="fas fa-star text-gray-400 text-xs"
                    ></i>
                  ))}
                </div>
                {/* Rating */}
                <span className="text-gray-800 ms-1">(0)</span>
              </div>

              {/* Icons */}
              <div className="absolute flex justify-center gap-2 bottom-4 w-full opacity-0 hover:opacity-100 transition-transform duration-300 transform translate-y-full hover:translate-y-1">
                {/* Cart Icon */}
                <div className="relative group">
                  <div className="w-10 h-10 bg-gray-800 flex justify-center items-center rounded hover:bg-[#F65E17] transition duration-300">
                    <i className="fa fa-shopping-cart text-white"></i>
                  </div>
                  {/* Tooltip */}
                  <span className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition text-nowrap">
                    Add to Cart
                  </span>
                </div>

                {/* Wishlist Icon */}
                <div className="relative group">
                  <div className="w-10 h-10 bg-gray-800 flex justify-center items-center rounded hover:bg-[#F65E17] transition duration-300">
                    <i className="far fa-heart text-white"></i>
                  </div>
                  {/* Tooltip */}
                  <span className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition text-nowrap">
                    Add to Wishlist
                  </span>
                </div>

                {/* View Icon */}
                <div className="relative group">
                  <div className="w-10 h-10 bg-gray-800 flex justify-center items-center rounded hover:bg-[#F65E17] transition duration-300">
                    <i className="far fa-eye text-white"></i>
                  </div>
                  {/* Tooltip */}
                  <span className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition text-nowrap">
                    View Product
                  </span>
                </div>

                {/* Comparison Icon */}
                <div className="relative group">
                  <div className="w-10 h-10 bg-gray-800 flex justify-center items-center rounded hover:bg-[#F65E17] transition duration-300">
                    <i className="fa fa-exchange-alt text-white"></i>
                  </div>
                  {/* Tooltip */}
                  <span className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition text-now">
                    Compare
                  </span>
                </div>
              </div>
            </div>

            {/* Product Info */}
            <div className="px-4 py-2">
              <h2 className="text-lg font-medium text-gray-800 md:text-xl">
                Product Name 54
              </h2>
              <p className="mt-1 text-lg font-semibold text-gray-800 md:text-xl">
                $14.00
              </p>
              <div className="mt-2 flex gap-2">
                {["red", "yellow", "purple", "green", "blue"].map((color) => (
                  <button
                    key={color}
                    className="rounded-full w-6 h-6 border-2 border-gray-400 flex justify-center items-center"
                  >
                    <div
                      className={`bg-${color}-500 rounded-full w-4 h-4`}
                    ></div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Product Card 3 */}
          <div className="border shadow flex flex-col relative">
            <div className="bg-gray-100 relative">
              <img
                src="/assets/3_661895b7-64eb-4383-bd17-7e786014f024.png"
                alt="Product 1"
                className="w-full"
              />
              <div className="absolute top-2 right-2 px-1 bg-gray-200 flex items-center">
                {/* Stars */}
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <i
                      key={i}
                      className="fas fa-star text-gray-400 text-xs"
                    ></i>
                  ))}
                </div>
                {/* Rating */}
                <span className="text-gray-800 ms-1">(0)</span>
              </div>

              {/* Icons */}
              <div className="absolute flex justify-center gap-2 bottom-4 w-full opacity-0 hover:opacity-100 transition-transform duration-300 transform translate-y-full hover:translate-y-1">
                {/* Cart Icon */}
                <div className="relative group">
                  <div className="w-10 h-10 bg-gray-800 flex justify-center items-center rounded hover:bg-[#F65E17] transition duration-300">
                    <i className="fa fa-shopping-cart text-white"></i>
                  </div>
                  {/* Tooltip */}
                  <span className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition text-nowrap">
                    Add to Cart
                  </span>
                </div>

                {/* Wishlist Icon */}
                <div className="relative group">
                  <div className="w-10 h-10 bg-gray-800 flex justify-center items-center rounded hover:bg-[#F65E17] transition duration-300">
                    <i className="far fa-heart text-white"></i>
                  </div>
                  {/* Tooltip */}
                  <span className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition text-nowrap">
                    Add to Wishlist
                  </span>
                </div>

                {/* View Icon */}
                <div className="relative group">
                  <div className="w-10 h-10 bg-gray-800 flex justify-center items-center rounded hover:bg-[#F65E17] transition duration-300">
                    <i className="far fa-eye text-white"></i>
                  </div>
                  {/* Tooltip */}
                  <span className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition text-nowrap">
                    View Product
                  </span>
                </div>

                {/* Comparison Icon */}
                <div className="relative group">
                  <div className="w-10 h-10 bg-gray-800 flex justify-center items-center rounded hover:bg-[#F65E17] transition duration-300">
                    <i className="fa fa-exchange-alt text-white"></i>
                  </div>
                  {/* Tooltip */}
                  <span className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition text-now">
                    Compare
                  </span>
                </div>
              </div>
            </div>

            {/* Product Info */}
            <div className="px-4 py-2">
              <h2 className="text-lg font-medium text-gray-800 md:text-xl">
                Product Name 32
              </h2>
              <p className="mt-1 text-lg font-semibold text-gray-800 md:text-xl">
                $90.00
              </p>
              <div className="mt-2 flex gap-2">
                {["red", "yellow", "purple", "green", "blue"].map((color) => (
                  <button
                    key={color}
                    className="rounded-full w-6 h-6 border-2 border-gray-400 flex justify-center items-center"
                  >
                    <div
                      className={`bg-${color}-500 rounded-full w-4 h-4`}
                    ></div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Product Card 4 */}
          <div className="border shadow flex flex-col relative">
            <div className="bg-gray-100 relative">
              <img
                src="/assets/3_c18df65b-ea3b-41e9-9905-584507bdd54b.png"
                alt="Product 1"
                className="w-full"
              />
              <div className="absolute top-2 right-2 px-1 bg-gray-200 flex items-center">
                {/* Stars */}
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <i
                      key={i}
                      className="fas fa-star text-gray-400 text-xs"
                    ></i>
                  ))}
                </div>
                {/* Rating */}
                <span className="text-gray-800 ms-1">(0)</span>
              </div>

              {/* Icons */}
              <div className="absolute flex justify-center gap-2 bottom-4 w-full opacity-0 hover:opacity-100 transition-transform duration-300 transform translate-y-full hover:translate-y-1">
                {/* Cart Icon */}
                <div className="relative group">
                  <div className="w-10 h-10 bg-gray-800 flex justify-center items-center rounded hover:bg-[#F65E17] transition duration-300">
                    <i className="fa fa-shopping-cart text-white"></i>
                  </div>
                  {/* Tooltip */}
                  <span className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition text-nowrap">
                    Add to Cart
                  </span>
                </div>

                {/* Wishlist Icon */}
                <div className="relative group">
                  <div className="w-10 h-10 bg-gray-800 flex justify-center items-center rounded hover:bg-[#F65E17] transition duration-300">
                    <i className="far fa-heart text-white"></i>
                  </div>
                  {/* Tooltip */}
                  <span className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition text-nowrap">
                    Add to Wishlist
                  </span>
                </div>

                {/* View Icon */}
                <div className="relative group">
                  <div className="w-10 h-10 bg-gray-800 flex justify-center items-center rounded hover:bg-[#F65E17] transition duration-300">
                    <i className="far fa-eye text-white"></i>
                  </div>
                  {/* Tooltip */}
                  <span className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition text-nowrap">
                    View Product
                  </span>
                </div>

                {/* Comparison Icon */}
                <div className="relative group">
                  <div className="w-10 h-10 bg-gray-800 flex justify-center items-center rounded hover:bg-[#F65E17] transition duration-300">
                    <i className="fa fa-exchange-alt text-white"></i>
                  </div>
                  {/* Tooltip */}
                  <span className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition text-now">
                    Compare
                  </span>
                </div>
              </div>
            </div>
            {/* Product Info */}
            <div className="px-4 py-2">
              <h2 className="text-lg font-medium text-gray-800 md:text-xl">
                Product Name 1
              </h2>
              <p className="mt-1 text-lg font-semibold text-gray-800 md:text-xl">
                $20.00
              </p>
              <div className="mt-2 flex gap-2">
                {/* Red button */}
                <button className="rounded-full w-6 h-6 border-2 border-gray-400 flex justify-center items-center">
                  <div className="bg-red-500 rounded-full w-4 h-4"></div>
                </button>
                {/* Yellow button */}
                <button className="rounded-full w-6 h-6 border-2 border-gray-400 flex justify-center items-center">
                  <div className="bg-yellow-500 rounded-full w-4 h-4"></div>
                </button>
                {/* Purple button */}
                <button className="rounded-full w-6 h-6 border-2 border-gray-400 flex justify-center items-center">
                  <div className="bg-purple-500 rounded-full w-4 h-4"></div>
                </button>
                {/* Green button */}
                <button className="rounded-full w-6 h-6 border-2 border-gray-400 flex justify-center items-center">
                  <div className="bg-green-500 rounded-full w-4 h-4"></div>
                </button>
                {/* Blue button */}
                <button className="rounded-full w-6 h-6 border-2 border-gray-400 flex justify-center items-center">
                  <div className="bg-blue-500 rounded-full w-4 h-4"></div>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Section3;
