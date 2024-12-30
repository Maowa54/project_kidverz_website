import React from "react";
import Navbar from "../../component/Frontend/Navbar";
import { useState, useEffect, useContext, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../../component/Frontend/CartContext";
import { WishContext } from "../../component/Frontend/WishContext";
import { BsArrowUpSquare } from "react-icons/bs";
import { FaMinus, FaPlus } from "react-icons/fa";
import Footer from "../../component/Frontend/Footer";
import Carticon from "../../component/Frontend/Carticon";
import { Tooltip as ReactTooltip } from "react-tooltip";

const Shop = ({ products = [] }) => {
  const { addToCart } = useContext(CartContext);
  const { addToWishlist } = useContext(WishContext);
  const [modalOpen, setModalOpen] = useState(false);

  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedVariations, setSelectedVariations] = useState({});
  const [currentId, setCurrentId] = useState("");
  const [currentVariation, setCurrentVariation] = useState([]);
  const [currentPrice, setCurrentPrice] = useState("");
  const [oldPrice, setOldPrice] = useState("");
  const [isToastVisible, setIsToastVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [availabilityOpen, setAvailabilityOpen] = useState(true);
  const [categoryOpen, setCategoryOpen] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [filterOpen, setFilterOpen] = useState(false);

  // Initialize state for selected options
  const [selectedOptions, setSelectedOptions] = useState(
    products.reduce((acc, product) => {
      const defaultOption = product.variation_combinations?.[0]?.id || null;
      return { ...acc, [product.id]: defaultOption };
    }, {})
  );

  // Handle option selection
  const handleOptionChange = (productId, optionId) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [productId]: optionId,
    }));
  };

  // Extract unique categories from the product data
  const categories = [
    ...new Set(products.map((product) => product.category.name)),
  ];

  // Handle category selection
  const handleCategoryChange = (category) => {
    // If the category is already selected, unselect it; otherwise, select it
    setSelectedCategory((prevCategory) =>
      prevCategory === category ? null : category
    );
  };

  // Filter products based on the selected category
  useEffect(() => {
    if (selectedCategory) {
      setFilteredProducts(
        products.filter((product) => product.category.name === selectedCategory)
      );
    } else {
      setFilteredProducts(products); // Show all if no category is selected
    }
  }, [selectedCategory, products]);

  const [viewMode, setViewMode] = useState("grid"); // Default to grid view

  // Function to toggle between grid and details view
  const toggleView = (mode) => {
    setViewMode(mode);
  };

  useEffect(() => {
    // Automatically set selected product if product is available
    if (selectedProduct) {
      setProduct(selectedProduct);
      // Reset states related to variations and prices
      setSelectedVariations({});
      setCurrentId("");
      setQuantity(1);
      setCurrentVariation([]);
      setIsToastVisible(false);
      setCurrentPrice("");
    }
  }, [selectedProduct]);

  const incrementCount = () => setQuantity(quantity + 1);
  const decrementCount = () => setQuantity(quantity > 1 ? quantity - 1 : 1);

  const handleVariationChange = (variationType, value) => {
    // If there are no variations, we don't need to update the selected variations
    if (product?.has_variation === 0) {
      setIsToastVisible(true); // Show a toast if no variations are available
      return; // Exit early if there are no variations to handle
    }

    // Update the selected variations
    const updatedVariations = { ...selectedVariations, [variationType]: value };
    setSelectedVariations(updatedVariations);

    // Combine selected values in sorted order
    const sortedSelectedValues = Object.values(updatedVariations)
      .sort()
      .join(",");

    // Look for a matching combination in the variation_combinations
    const combination = product.variation_combinations.find(
      (combo) =>
        combo.values.split(",").sort().join(",") === sortedSelectedValues
    );

    if (combination) {
      const newId = `v${combination.id}`;
      setCurrentId(newId);
      setCurrentVariation(combination);

      const variationDiscountEndDate = new Date(combination.discount_date);
      const currentDate = new Date();
      const isDiscountActive =
        combination.discount > 0 && variationDiscountEndDate >= currentDate;

      if (isDiscountActive) {
        const priceToDisplay = combination.price - combination.discount;
        setCurrentPrice(priceToDisplay);
        setOldPrice(combination.price);
      } else {
        const priceWithoutDiscount = combination.price;
        setCurrentPrice(priceWithoutDiscount);
        setOldPrice(null);
      }
    } else {
      // Reset variation if no combination is found
      setCurrentVariation(null);

      // If no variation combinations, use default price (from product)
      setCurrentPrice(product.price);
    }

    setIsToastVisible(false);
  };

  const [imageFly, setImageFly] = useState(false);

  // Add to Cart Handler
  const handleAddToCart = (e, isBuyNow = false) => {
    e.preventDefault();

    if (product?.has_variation === 1) {
      if (
        Object.keys(selectedVariations).length <
        Object.keys(product.product_variation).length
      ) {
        setIsToastVisible(true); // Show toast if variations are incomplete
        return; // Stop further execution
      } else {
        setIsToastVisible(false);
        setImageFly(false); // Reset animation
        requestAnimationFrame(() => setImageFly(true)); // Trigger animation
        addToCart(product, quantity, currentId, currentVariation, currentPrice);
      }
    } else {
      setImageFly(false); // Reset animation
      requestAnimationFrame(() => setImageFly(true)); // Trigger animation
      addToCart(product, quantity, currentId, currentVariation, currentPrice);
    }

    // Navigate to checkout if "Buy Now" button is clicked
    if (isBuyNow) {
      navigate("/checkout");
    }
  };

  // Open Modal Function
  const openModal = (product) => {
    setProduct(product); // Set the current product
    setModalOpen(true); // Open the modal
    setSelectedVariations({}); // Reset selected variations
    setCurrentId(""); // Reset current ID
    setQuantity(1); // Reset quantity to default
    setCurrentVariation([]); // Reset variations
    setIsToastVisible(false); // Hide any toasts
    setImageFly(false); // Ensure the imageFly state is reset
    setCurrentPrice(""); // Reset the current price
  };

  // Close Modal Function
  const closeModal = () => {
    setModalOpen(false); // Close the modal
    setProduct(null); // Clear the product
    setQuantity(1); // Reset quantity
    setSelectedVariations({}); // Reset variations
    setCurrentId(""); // Reset ID
    setCurrentVariation([]); // Clear current variation
    setIsToastVisible(false); // Hide toast
    setImageFly(false); // Reset animation state
    setCurrentPrice(""); // Clear price
  };

  const modalRef = useRef(null); // Reference for the modal container
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Check if click is outside the modalRef
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setModalOpen(false); // Close the modal
      }
    };

    const addEventListeners = () => {
      document.addEventListener("mousedown", handleClickOutside);
    };

    const removeEventListeners = () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };

    if (modalOpen) {
      addEventListeners();
    } else {
      removeEventListeners();
    }

    // Cleanup event listener on unmount
    return removeEventListeners;
  }, [modalOpen, setModalOpen]);

  console.log(products);
  // Adjust the number of products to show based on screen size

  const [visibleCount, setVisibleCount] = useState(8); // Track number of visible products
  const handleViewMore = () => {
    setVisibleCount((prevCount) => prevCount + 8); // Increase visible products by 8
  };

  return (
    <div className=" overflow-hidden">
      <div style={{ backgroundImage: "url('/assets/banner2.png')" }}>
        <Navbar />
      </div>
      <Carticon />
      <div
        className="  bottom-border "
        style={{ backgroundImage: "url('/assets/banner2.png')" }}
      >
        {/* Overlay for background image opacity */}
        <div className="absolute z-0 inset-0 bg-rose-100 opacity-70"></div>

        {/* Your header content */}
        <div className="relative z-50 text-white pt-4 pb-16 ">
          <h1 className="text-3xl md:text-5xl mt-10 text-rose-600 text-center font-bold">
            Products
          </h1>
          <div className="md:text-lg text-center  mt-4 px-6  ">
            <a href="/" className="text-rose-500  hover:underline">
              Home
            </a>{" "}
            <span className="px-2 text-rose-600"> &gt; </span>
            <a
              href="/product"
              className="text-rose-500 font-semibold hover:underline"
            >
              Products
            </a>
          </div>{" "}
        </div>
      </div>

      <div className="grid grid-cols-12">
        {/* Left Section */}
        <div className="col-span-12 md:col-span-3 px-8 mt-4 md:mt-6 py-4">
          {/* Filter Section Header */}
          <h3 className="text-3xl hidden md:block  font-bold mb-6">Filter :</h3>

          {/* Filter Icon (Visible only on small screens) */}
          <div className="md:hidden  flex justify-between">
            <button
              onClick={() => setFilterOpen(!filterOpen)}
              className="text-2xl p-2 rounded bg-rose-500  "
            >
              <img
                src="/assets/filter.png"
                alt=""
                className="size-5 filter invert"
              />{" "}
            </button>
            <p className="text-gray-800 flex justify-center items-center font-semibold ">
              {filteredProducts.length === products.length
                ? `${products.length} products`
                : `${filteredProducts.length} of ${products.length} products`}
            </p>
          </div>

          {/* Filter Section (Visible on md and larger, or when toggled on small screens) */}
          {(filterOpen || window.innerWidth >= 768) && (
            <>
              <h3 className="text-2xl mt-4 md:hidden block font-bold mb-2">
                Filter :
              </h3>

              {/* Availability Filter */}
              <div className="mb-2 pb-4">
                <div className="flex justify-between text-xl md:text-2xl pb-1 md:pb-2 border-b items-center">
                  <span className=" ">Availability</span>
                  <button
                    onClick={() => setAvailabilityOpen(!availabilityOpen)}
                    className=" p-2"
                  >
                    {availabilityOpen ? "-" : "+"}
                  </button>
                </div>
                {availabilityOpen && (
                  <div className="mt-2 md:text-lg">
                    {/* Options */}
                    <label className="block">
                      <input type="checkbox" className="mr-2" /> In Stock
                    </label>
                    <label className="block">
                      <input
                        type="checkbox"
                        className="mr-2 cursor-not-allowed opacity-50"
                        disabled
                      />
                      <span className="text-gray-600">Out of Stock</span>
                    </label>
                  </div>
                )}
              </div>

              {/* Category Filter */}
              <div className="mb-4 pb-4">
                <div className="flex justify-between items-center pb-1 md:pb-2  text-xl md:text-2xl border-b">
                  <span className="">Categories</span>
                  <button
                    onClick={() => setCategoryOpen(!categoryOpen)}
                    className=" p-2"
                  >
                    {categoryOpen ? "-" : "+"}
                  </button>
                </div>
                {categoryOpen && (
                  <div className="mt-3 md:text-lg">
                    {/* Dynamic category checkboxes */}
                    {categories.map((category, index) => (
                      <label key={index} className="block">
                        <input
                          type="checkbox"
                          className="mr-2 cursor-pointer mb-3"
                          checked={selectedCategory === category} // Check if this category is selected
                          onChange={() => handleCategoryChange(category)} // Handle category selection
                        />
                        {category}
                      </label>
                    ))}
                  </div>
                )}
              </div>
            </>
          )}
        </div>

        {/* Right Section */}
        <div className="col-span-12 md:col-span-9 px-8 mt-2 md:mt-6 md:py-4">
          <div className="flex justify-between">
            <p className="text-gray-8 hidden md:block text-xl">
              {filteredProducts.length === products.length
                ? `${products.length} products`
                : `${filteredProducts.length} of ${products.length} products`}
            </p>

            <div className="hidden md:block">
              {/* View toggle buttons */}
              <button
                onClick={() => toggleView("grid")}
                className={`text-white bg-sky-400 rounded p-2 hover:bg-rose-500 ${
                  viewMode === "grid" ? "font-bold" : ""
                }`}
                data-tooltip-id="grid-tooltip"
              >
                <img
                  src="/assets/category.png"
                  alt="Category View"
                  className="size-5 filter invert"
                />
              </button>

              <button
                onClick={() => toggleView("details")}
                className={`ml-2 text-white bg-sky-400 rounded p-2 hover:bg-rose-500 ${
                  viewMode === "details" ? "font-bold" : ""
                }`}
                data-tooltip-id="details-tooltip"
              >
                <img
                  src="/assets/grid.png"
                  alt="Details View"
                  className="size-5 filter invert"
                />
              </button>

              {/* Tooltips */}
              <ReactTooltip
                id="grid-tooltip"
                place="top"
                content="Grid View"
                style={{
                  fontSize: "13px", // Adjust text size
                  padding: "6px 8px", // Adjust padding
                }}
              />
              <ReactTooltip
                id="details-tooltip"
                place="top"
                content="Detailed View"
                style={{
                  fontSize: "13px", // Adjust text size
                  padding: "6px 8px", // Adjust padding
                }}
              />
            </div>
          </div>

          {/* Product Cards Section */}
          <div className="mt-4">
            {/* Grid view */}
            {viewMode === "grid" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {filteredProducts.slice(0, visibleCount).map((product) => {
                  const prices =
                    product.variation_combinations?.length > 0 // Check for variations
                      ? product.variation_combinations.map((comb) => comb.price) // Map combination prices
                      : [product.price]; // Fallback to base price if no variations

                  const highPrice = Math.max(...prices); // Get maximum price
                  const lowPrice = Math.min(...prices); // Get minimum price
                  const isProductNew = (createdAt) => {
                    const currentDate = new Date();
                    const createdDate = new Date(createdAt);
                    const timeDifference = currentDate - createdDate;
                    const daysDifference = timeDifference / (1000 * 3600 * 24); // Convert ms to days
                    return daysDifference <= 7; // If the product was created in the last 7 days
                  };

                  const newProduct = isProductNew(product.created_at);

                  const cartTooltipId = `cart-tooltip-${product.id}`;
                  const wishlistTooltipId = `wishlist-tooltip-${product.id}`;
                  const viewTooltipId = `view-tooltip-${product.id}`;

                  return (
                    <div
                      key={product.id}
                      className="border shadow flex flex-col group relative"
                    >
                      <div className="group bg-gray-100 relative">
                        <Link
                          to={`/singleproduct/${product.name}-${product.id}`}
                        >
                          <img
                            src={`https://admin.ezicalc.com/public/storage/product/${product.image}`}
                            alt={product.name}
                            className="w-full h-72"
                          />
                        </Link>

                        <div className="absolute right-1 top-2 px-1 bg-gray-200 flex items-center">
                          {/* Stars */}
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <i
                                key={i}
                                className={`fas fa-star text-${
                                  i < product.rating ? "yellow" : "gray"
                                }-400 text-xs`}
                              ></i>
                            ))}
                          </div>
                          {/* Rating */}
                          <span className="text-gray-800 ms-1">(4)</span>
                        </div>

                        {/* New Product Badge */}
                        {/* New Product Badge */}
                        {newProduct && (
                          <div className="absolute top-2 left-2 bg-yellow-500 starburst flex justify-center items-center text-white  px-2 py-1 rounded">
                            New
                          </div>
                        )}

                        {/* Icons */}

                        <div className="absolute flex justify-center gap-2 bottom-4 w-full opacity-0 group-hover:opacity-100 transition-transform duration-300 transform translate-y-full group-hover:translate-y-1">
                          <button
                            data-tooltip-id={cartTooltipId}
                            onClick={() => openModal(product)}
                            className="size-8 md:size-10 bg-gray-800 flex justify-center items-center rounded hover:bg-[#EB1E39] transition duration-300"
                          >
                            <i className="text-white fas fa-shopping-cart"></i>
                          </button>
                          <ReactTooltip
                            id={cartTooltipId}
                            place="top"
                            content="Add to Cart"
                            style={{
                              fontSize: "12px", // Adjust text size
                              padding: "6px 8px", // Adjust padding
                            }}
                          />

                          <button
                            data-tooltip-id={wishlistTooltipId}
                            onClick={() => addToWishlist(product)}
                            className="size-8 md:size-10 bg-gray-800 flex justify-center items-center rounded hover:bg-[#EB1E39] transition duration-300"
                          >
                            <i className="text-white far fa-heart"></i>
                          </button>
                          <ReactTooltip
                            id={wishlistTooltipId}
                            place="top"
                            content="Add to Wishlist"
                            style={{
                              fontSize: "12px", // Adjust text size
                              padding: "6px 8px", // Adjust padding
                            }}
                          />

                          <Link
                            data-tooltip-id={viewTooltipId}
                            to={`/singleproduct/${product.name}-${product.id}`}
                            className="size-8 md:size-10 bg-gray-800 flex justify-center items-center rounded hover:bg-[#EB1E39] transition duration-300"
                          >
                            <i className="text-white far fa-eye"></i>
                          </Link>
                          <ReactTooltip
                            id={viewTooltipId}
                            place="top"
                            content="View Details"
                            style={{
                              fontSize: "12px", // Adjust text size
                              padding: "6px 8px", // Adjust padding
                            }}
                          />
                        </div>
                      </div>

                      {/* Product Info */}
                      <div className="px-4 py-2">
                        <h2 className="text-lg font-medium text-gray-800 md:text-xl">
                          {product.name}
                        </h2>
                        <p className="md:mt-1 font-semibold text-gray-800 md:text-lg">
                          {product.variation_combinations.length > 0 ? (
                            <div className="text-gray-700">
                              {lowPrice === highPrice ? (
                                <span className="text-rose-600 font-bold">
                                  {highPrice} <span className="">৳</span>
                                </span>
                              ) : (
                                <>
                                  <span className="text-rose-600 font-bold">
                                    {lowPrice} <span className="">৳</span>
                                  </span>
                                  <span className="text-rose-500">-</span>
                                  <span className="text-rose-600 font-bold">
                                    {highPrice} <span className="">৳</span>
                                  </span>
                                </>
                              )}
                            </div>
                          ) : (
                            <div className="text-rose-600 font-bold">
                              {product.price} <span className="">৳</span>
                            </div>
                          )}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Detailed view */}
            {viewMode === "details" && (
              <div className="space-y-6">
                {filteredProducts.slice(0, visibleCount).map((product) => {
                  const selectedOptionId = selectedOptions[product.id];
                  const selectedOption = product.variation_combinations.find(
                    (option) => option.id === selectedOptionId
                  );

                  const isProductNew = (createdAt) => {
                    const currentDate = new Date();
                    const createdDate = new Date(createdAt);
                    const timeDifference = currentDate - createdDate;
                    const daysDifference = timeDifference / (1000 * 3600 * 24); // Convert ms to days
                    return daysDifference <= 7; // If the product was created in the last 7 days
                  };

                  const newProduct = isProductNew(product.created_at);

                  const cartTooltipId = `cart-tooltip-${product.id}`;
                  const wishlistTooltipId = `wishlist-tooltip-${product.id}`;
                  const viewTooltipId = `view-tooltip-${product.id}`;

                  return (
                    <div
                      key={product.id}
                      className="flex gap-4 border shadow p-4 hover:shadow-xl transition-all duration-300"
                    >
                      <div className="bg-gray-100 relative group">
                        <Link
                          to={`/singleproduct/${product.name}-${product.id}`}
                        >
                          <img
                            src={`https://admin.ezicalc.com/public/storage/product/${product.image}`}
                            alt={product.name}
                            className="w-[200px] h-48 object-cover"
                          />
                        </Link>

                        {/* Stars */}
                        <div className="absolute right-1 top-2 px-1 bg-gray-300 flex items-center">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <i
                                key={i}
                                className={`fas fa-star text-${
                                  i < product.rating ? "yellow" : "gray"
                                }-400 text-[0.5rem]`}
                              ></i>
                            ))}
                          </div>
                          <span className="text-gray-800 ms-1">(4)</span>
                        </div>

                        {/* New Product Badge */}
                        {newProduct && (
                          <div className="absolute top-2 left-2 bg-yellow-500 starburst flex justify-center items-center text-white  px-2 py-1 rounded">
                            New
                          </div>
                        )}
                        {/* Icons */}

                        <div className="absolute flex justify-center gap-2 bottom-4 w-full opacity-0 group-hover:opacity-100 transition-transform duration-300 transform translate-y-full group-hover:translate-y-1">
                          <button
                            data-tooltip-id={cartTooltipId}
                            onClick={() => openModal(product)}
                            className="size-8 md:size-10 bg-gray-800 flex justify-center items-center rounded hover:bg-[#EB1E39] transition duration-300"
                          >
                            <i className="text-white fas fa-shopping-cart"></i>
                          </button>
                          <ReactTooltip
                            id={cartTooltipId}
                            place="top"
                            content="Add to Cart"
                            style={{
                              fontSize: "12px", // Adjust text size
                              padding: "6px 8px", // Adjust padding
                            }}
                          />

                          <button
                            data-tooltip-id={wishlistTooltipId}
                            onClick={() => addToWishlist(product)}
                            className="size-8 md:size-10 bg-gray-800 flex justify-center items-center rounded hover:bg-[#EB1E39] transition duration-300"
                          >
                            <i className="text-white far fa-heart"></i>
                          </button>
                          <ReactTooltip
                            id={wishlistTooltipId}
                            place="top"
                            content="Add to Wishlist"
                            style={{
                              fontSize: "12px", // Adjust text size
                              padding: "6px 8px", // Adjust padding
                            }}
                          />

                          <Link
                            data-tooltip-id={viewTooltipId}
                            to={`/singleproduct/${product.name}-${product.id}`}
                            className="size-8 md:size-10 bg-gray-800 flex justify-center items-center rounded hover:bg-[#EB1E39] transition duration-300"
                          >
                            <i className="text-white far fa-eye"></i>
                          </Link>
                          <ReactTooltip
                            id={viewTooltipId}
                            place="top"
                            content="View Details"
                            style={{
                              fontSize: "12px", // Adjust text size
                              padding: "6px 8px", // Adjust padding
                            }}
                          />
                        </div>
                      </div>

                      <div className="md:ml-4 flex flex-col  flex-1">
                        <h2 className="text-lg font-semibold text-gray-800">
                          {product.name}
                        </h2>
                        <p className="text-sm mt-1 md:text-sm text-gray-600">
                          {product.short_desc}
                        </p>

                        <div>
                          <p className="text-rose-500 text-lg md:text-xl font-semibold mt-1">
                            Price:{" "}
                            {selectedOption
                              ? `$${selectedOption.price}`
                              : // Calculate min and max prices if no variation is selected
                                (() => {
                                  const minPrice = Math.min(
                                    ...product.variation_combinations.map(
                                      (option) => option.price
                                    )
                                  );
                                  const maxPrice = Math.max(
                                    ...product.variation_combinations.map(
                                      (option) => option.price
                                    )
                                  );
                                  return minPrice === maxPrice
                                    ? `$${minPrice}`
                                    : `$${minPrice} - $${maxPrice}`;
                                })()}
                          </p>
                          <div className="flex flex-wrap gap-3 mt-2">
                            {product.variation_combinations.map((option) => (
                              <button
                                key={option.id}
                                onClick={() =>
                                  handleOptionChange(product.id, option.id)
                                }
                                className={`py-1 px-4 text-sm border rounded-md focus:outline-none transition ${
                                  selectedOptionId === option.id
                                    ? "bg-rose-500 text-white"
                                    : "bg-gray-200 text-gray-800"
                                }`}
                              >
                                {option.values}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {modalOpen &&
            (() => {
              return (
                <div className="fixed inset-0 flex justify-center z-50 items-center">
                  <div className="relative w-full px-5 sm:px-0 h-full flex justify-center items-center">
                    <div
                      ref={modalRef}
                      className="bg-white p-2 md:p-5 rounded shadow-lg w-96 sm:w-[500px]"
                    >
                      <div className="grid grid-cols-2 md:grid-cols-3 justify-center items-center gap-3">
                        <div className="">
                          <img
                            src={`https://admin.ezicalc.com/public/storage/product/${product.image}`}
                            alt={product.name}
                            className="w-full h-auto rounded-lg"
                          />

                          <img
                            src={`https://admin.ezicalc.com/public/storage/product/${product.image}`}
                            alt="Product"
                            className={`md:left-10 w-[100px] h-[120px] md:absolute hidden opacity-0 invisible z-50 ${
                              imageFly
                                ? "popup-flying-div popup-mobile-flying-div"
                                : ""
                            }`}
                            onAnimationEnd={() => setImageFly(false)} // Reset animation after it finishes
                          />
                        </div>

                        <div className="md:col-span-2 flex-1 sm:space-y-2">
                          <div className="flex justify-between">
                            <h2 className="text-xl font-semibold text-wrap capitalize">
                              {product.name}
                            </h2>
                            <button
                              onClick={closeModal}
                              className="hover:text-red-600"
                            >
                              <i className="fas fa-close"></i>
                            </button>
                          </div>
                          {currentPrice ? (
                            <h2 className="md:text-2xl font-bold text-[#ED1D38]">
                              Price: <span className="md:text-2xl">৳</span>{" "}
                              {currentPrice} {oldPrice && <s>{oldPrice}</s>}
                            </h2>
                          ) : (
                            <div className="md:text-2xl font-bold text-[#ED1D38]">
                              {product.variation_combinations &&
                              product.variation_combinations.length > 0 ? (
                                (() => {
                                  // Filter valid variations with active discounts
                                  const validCombinations =
                                    product.variation_combinations.filter(
                                      (combination) => {
                                        const variationDiscountEndDate =
                                          new Date(combination.discount_date);
                                        return (
                                          combination.discount > 0 &&
                                          variationDiscountEndDate >= new Date()
                                        );
                                      }
                                    );

                                  if (validCombinations.length > 0) {
                                    const minPrice = Math.min(
                                      ...validCombinations.map(
                                        (combination) =>
                                          combination.price -
                                          combination.discount
                                      )
                                    );
                                    const maxPrice = Math.max(
                                      ...validCombinations.map(
                                        (combination) =>
                                          combination.price -
                                          combination.discount
                                      )
                                    );

                                    return minPrice === maxPrice ? (
                                      <h2>
                                        Price:{" "}
                                        <span className="md:text-2xl">৳</span>{" "}
                                        {minPrice}{" "}
                                      </h2>
                                    ) : (
                                      <h2>
                                        Price:{" "}
                                        <span className="md:text-2xl">৳</span>{" "}
                                        {minPrice} -{" "}
                                        <span className="md:text-2xl">৳</span>{" "}
                                        {maxPrice}{" "}
                                      </h2>
                                    );
                                  } else {
                                    // No active discounts, just show the price
                                    const minPrice = Math.min(
                                      ...product.variation_combinations.map(
                                        (combination) => combination.price
                                      )
                                    );
                                    const maxPrice = Math.max(
                                      ...product.variation_combinations.map(
                                        (combination) => combination.price
                                      )
                                    );

                                    return minPrice === maxPrice ? (
                                      <h2>
                                        Price:{" "}
                                        <span className="md:text-2xl">৳</span>{" "}
                                        {maxPrice}
                                      </h2>
                                    ) : (
                                      <h2>
                                        Price:{" "}
                                        <span className="md:text-2xl">৳</span>{" "}
                                        {minPrice} -{" "}
                                        <span className="md:text-2xl">৳</span>{" "}
                                        {maxPrice}
                                      </h2>
                                    );
                                  }
                                })()
                              ) : (
                                <h2>
                                  Price:{" "}
                                  <span className="text-lg md:text-2xl">৳</span>{" "}
                                  {product.price}
                                </h2>
                              )}
                            </div>
                          )}
                          {product.product_variation?.length > 0 ? (
                            product.product_variation.map((variation) => (
                              <div key={variation.id}>
                                <h3 className="text-sm my-1 font-semibold">
                                  {variation.variation.name}
                                </h3>
                                <div className="grid grid-cols-2 gap-3">
                                  {variation.variaton_values
                                    .split(",")
                                    .map((value, i) => (
                                      <button
                                        key={i}
                                        onClick={() =>
                                          handleVariationChange(
                                            variation.variation.name,
                                            value
                                          )
                                        }
                                        className={`py-1 text-sm rounded ${
                                          selectedVariations[
                                            variation.variation.name
                                          ] === value
                                            ? "bg-[#ED1D38] text-white"
                                            : "bg-gray-200 border hover:text-white hover:bg-[#ED1D38] "
                                        }`}
                                      >
                                        {value}
                                      </button>
                                    ))}
                                </div>
                              </div>
                            ))
                          ) : (
                            <span>No variations available</span>
                          )}

                          {isToastVisible && (
                            <div className="mt-4 text-red-600 flex items-center gap-2 font-medium text-sm">
                              Please choose variant.{" "}
                              <BsArrowUpSquare size={23} />
                            </div>
                          )}

                          <div className="flex justify-around bg-gray-200 py-2 rounded items-center mt-3 md:mt-5">
                            <button
                              onClick={decrementCount}
                              className="bg-slate-200 text-gray-800 hover:scale-125"
                            >
                              <FaMinus size={10} />
                            </button>
                            <span className="text-sm">{quantity}</span>
                            <button
                              onClick={incrementCount}
                              className="bg-slate-200 text-gray-800 hover:scale-125"
                            >
                              <FaPlus size={10} />
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-3 text-center mt-2 sm:mt-5">
                        <button
                          className=" bg-rose-600 py-2 w-full text-white rounded-lg flex items-center justify-center"
                          onClick={(e) => handleAddToCart(e, false)} // isBuyNow = false
                        >
                          {/* <FaTimesCircle className="md:mr-2" size={24} /> <span>ক্যান্সেল করুন</span> */}
                          Add To Cart
                        </button>
                        <Link
                          className="/checkout"
                          onClick={(e) => handleAddToCart(e, true)} // isBuyNow = true
                        >
                          <button className=" bg-[#31a0d4] py-2 w-full text-white rounded-lg">
                            Buy Now{" "}
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })()}

          {visibleCount < filteredProducts.length && (
            <div className="text-center mt-6">
              <button
                className="bg-[#EB1E39] text-white py-2 px-6 rounded hover:bg-[#d54b14] transition"
                onClick={handleViewMore}
              >
                View More
              </button>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Shop;
