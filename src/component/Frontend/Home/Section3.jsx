import "@fortawesome/fontawesome-free/css/all.min.css";
import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../../Frontend/CartContext";

const Section3 = ({ products = [] }) => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [loading, setLoading] = useState(true); // Add loading state
  const [visibleCount, setVisibleCount] = useState(8); // Track number of visible products
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    if (products.length > 0) {
      const firstCategory = products[0].category.name;
      setSelectedCategory(firstCategory);
      setLoading(false); // Set loading to false once data is available
    }
  }, [products]);

  const uniqueCategories = [
    ...new Set(products.map((product) => product.category.name)),
  ];

  const filteredProducts = products.filter(
    (product) => product.category.name === selectedCategory
  );

  if (loading) {
    return <div>Loading...</div>; // Show loading message while products are being loaded
  }

  const handleViewMore = () => {
    setVisibleCount((prevCount) => prevCount + 8); // Increase visible products by 8
  };

  return (
    <div>
      <div className="relative mt-5 lg:mt-20 md:py-8">
        <p className="text-3xl md:text-5xl px-12 md:px-24 lg:px-96 text-center font-bold text-gray-800">
          Popular Fashion Designs For Children
        </p>
        <p className="text-gray-600 text-center px-8 md:px-24 lg:px-80 md:text-lg mt-2 md:mt-4">
          KidVerz features a massive collection of stylish and colorful designs.
          Our products have been made according to the latest fashion trends.
          When it comes to the design of children’s clothing, KidVerz is the
          best option to choose.
        </p>

        <div className="absolute hidden lg:block bottom-0 left-8">
          <img
            src="/public/assets/Cute-Baby-Onesie-Clipart-75866179-1.png"
            alt=""
            className="ping-animation w-24"
          />
        </div>
        <div className="absolute top-0 right-8 hidden lg:block">
          <img
            src="/public/assets/frock.png"
            alt=""
            className="ping-animation w-16"
          />
        </div>
      </div>

      <div className="mb-6">
        {/* Dropdown for small screens */}
        <div className="px-4">
          <div className="sm:hidden border border-black relative mt-4">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full py-2 px-4 border rounded"
            >
              {uniqueCategories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Buttons for medium and larger screens */}
      <div className="hidden md:flex justify-center mx-auto mt-4 items-center text-center space-x-4">
        {uniqueCategories.map((category) => (
          <button
            key={category}
            className={`py-2 px-4 lg:text-lg font-medium ${
              selectedCategory === category
                ? "bg-[#F65E17] text-white"
                : "bg-gray-300 text-gray-800"
            } hover:bg-[#F65E17] hover:text-white`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="section-2 container mt-6 mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {filteredProducts.slice(0, visibleCount).map((product) => (
          <div
            key={product.id}
            className="border shadow flex flex-col relative group"
          >
            <div className="bg-gray-100 relative">
              <Link to={`/singleproduct/${product.name}-${product.id}`}>
                <img
                  src={`https://admin.ezicalc.com/public/storage/product/${product.image}`}
                  alt={product.name}
                  className="w-full"
                />
              </Link>
              <div className="absolute top-2 right-2 px-1 bg-gray-200 flex items-center">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <i
                      key={i}
                      className="fas fa-star text-gray-400 text-xs"
                    ></i>
                  ))}
                </div>
                <span className="text-gray-800 ms-1">(0)</span>
              </div>

              <div className="absolute flex justify-center gap-2 bottom-4 w-full opacity-0 group-hover:opacity-100 transition duration-300">
                {[
                  "fas fa-shopping-cart",
                  "far fa-heart",
                  "far fa-eye",
                  "fa fa-exchange-alt",
                ].map((icon, index) => (
                  <div
                    key={index}
                    className="w-10 h-10 bg-gray-800 flex justify-center items-center rounded hover:bg-[#F65E17] transition duration-300"
                  >
                    {icon === "fas fa-shopping-cart" ? (
                      <button
                        onClick={() => addToCart(product, )}
                        className="flex justify-center items-center w-full h-full"
                      >
                        <i className={`${icon} text-white`}></i>
                      </button>
                    ) : icon === "far fa-eye" ? (
                      <Link
                        to={`/singleproduct/${product.name}-${product.id}`}
                        className="flex justify-center items-center w-full h-full"
                      >
                        <i className={`${icon} text-white`}></i>
                      </Link>
                    ) : (
                      <i className={`${icon} text-white`}></i>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="px-4 py-2">
              <h2 className="text-lg font-medium text-gray-800 md:text-xl">
                {product.name}
              </h2>
              <p className="mt-1 text-lg font-semibold text-gray-800 md:text-xl">
                {product.price}
              </p>
              <div className="mt-2 flex gap-2">
                {[
                  "bg-red-500",
                  "bg-yellow-500",
                  "bg-purple-500",
                  "bg-green-500",
                  "bg-blue-500",
                ].map((color, index) => (
                  <button
                    key={index}
                    className={`rounded-full w-6 h-6 border-2 border-gray-400 flex justify-center items-center`}
                  >
                    <div className={`${color} rounded-full w-4 h-4`}></div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {visibleCount < filteredProducts.length && (
        <div className="text-center mt-6">
          <button
            className="bg-[#F65E17] text-white py-2 px-6 rounded hover:bg-[#d54b14] transition"
            onClick={handleViewMore}
          >
            View More
          </button>
        </div>
      )}
    </div>
  );
};

export default Section3;
