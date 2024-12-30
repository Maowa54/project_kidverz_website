import { useState, useEffect, useContext, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../../Frontend/CartContext";
import { WishContext } from "../../Frontend/WishContext";
import { BsArrowUpSquare } from "react-icons/bs";
import { FaMinus, FaPlus } from "react-icons/fa";
import { Tooltip as ReactTooltip } from "react-tooltip";

const Section6 = ({ products = [] }) => {
  const [visibleProducts, setVisibleProducts] = useState(0); // Starting index of visible products
  const [productsToShow, setProductsToShow] = useState(4); // Number of products to show

  const { addToCart } = useContext(CartContext);
  const { addToWishlist } = useContext(WishContext);
  const [modalOpen, setModalOpen] = useState(false);
  const { cartCount } = useContext(CartContext);
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
  const updateProductsToShow = () => {
    const screenWidth = window.innerWidth;

    if (screenWidth >= 1024) {
      setProductsToShow(4); // Large screens (lg)
    } else if (screenWidth >= 768) {
      setProductsToShow(2); // Medium screens (md)
    } else {
      setProductsToShow(1); // Small screens (sm)
    }
  };

  // Run on mount and screen resize
  useEffect(() => {
    updateProductsToShow(); // Set initial value
    window.addEventListener("resize", updateProductsToShow);

    return () => {
      window.removeEventListener("resize", updateProductsToShow);
    };
  }, []);

  // Handle next button
  const handleNext = () => {
    if (visibleProducts + productsToShow < products.length) {
      setVisibleProducts(visibleProducts + productsToShow);
    }
  };

  // Handle previous button
  const handlePrev = () => {
    if (visibleProducts - productsToShow >= 0) {
      setVisibleProducts(visibleProducts - productsToShow);
    }
  };

  const allproducts = products.slice(
    visibleProducts,
    visibleProducts + productsToShow
  ); //

  return (
    <div>
      {/* Blue Section */}
      <div className="bg-[#41C1CA] py-4 md:py-16 mt-2 md:mt-8 relative">
        <div className="px-8 h-48">
          <h1 className="text-white text-nowrap text-3xl md:text-5xl font-semibold tracking-wider">
            Trending Products
          </h1>
        </div>

        {/* Navigation Arrows */}
        <div className="absolute z-10 top-16 right-8 hidden md:flex gap-4">
          <button
            onClick={handlePrev}
            className="size-10 md:size-14 bg-white border-2 group border-gray-400 rounded-full flex justify-center items-center hover:bg-[#EB1E39] "
          >
            <i className="fas fa-arrow-left md:text-lg group-hover:text-white text-gray-800"></i>
          </button>
          <button
            onClick={handleNext}
            className="size-10 md:size-14 bg-white border-2 group border-gray-400 rounded-full flex justify-center items-center hover:bg-[#EB1E39] "
          >
            <i className="fas fa-arrow-right md:text-lg group-hover:text-white text-gray-800"></i>
          </button>
        </div>

        <div className="md:hidden block">
          {/* Navigation Arrows */}
          <div className="absolute top-60 z-10 left-2">
            <button
              onClick={handlePrev}
              className="size-10 md:size-14 bg-white border-2 group border-gray-400 rounded-full flex justify-center items-center hover:bg-[#EB1E39] "
            >
              <i className="fas fa-arrow-left md:text-lg group-hover:text-white text-gray-800"></i>
            </button>
          </div>
          <div className="absolute top-60 z-10 right-2">
            <button
              onClick={handleNext}
              className="size-10 md:size-14 bg-white border-2 group border-gray-400 rounded-full flex justify-center items-center hover:bg-[#EB1E39] "
            >
              <i className="fas fa-arrow-right md:text-lg group-hover:text-white text-gray-800"></i>
            </button>
          </div>
        </div>
      </div>

      {/* Product Cards Section */}
      <div className="px-8 -mt-36 md:-mt-40">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {allproducts.map((product) => {
            const prices =
              product.variation_combinations?.length > 0 // Check for variations
                ? product.variation_combinations.map((comb) => comb.price) // Map combination prices
                : [product.price]; // Fallback to base price if no variations

            const highPrice = Math.max(...prices); // Get maximum price
            const lowPrice = Math.min(...prices); // Get minimum price
            // Check if product is new
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
                <div className="bg-gray-100 relative">
                  <Link to={`/singleproduct/${product.name}-${product.id}`}>
                    <img
                      src={`https://admin.ezicalc.com/public/storage/product/${product.image}`}
                      alt={product.name}
                      className="w-full h-96"
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
                    <span className="text-gray-800 ms-1">
                      ({product.rating})
                    </span>
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

                {/* Product Info */}
                <div className="px-4 py-2">
                  <h2 className="text-lg font-medium text-gray-800 md:text-xl">
                    {product.name}
                  </h2>
                  <p className="md:mt-1 text-lg font-semibold text-gray-800 md:text-xl">
                    {product.variation_combinations.length > 0 ? (
                      <div className="text-gray-700">
                        {lowPrice === highPrice ? (
                          <span className="text-rose-600 font-bold">
                            {highPrice}{" "}
                            <span className="text-2xl">
                              <span className="text-2xl">৳</span>
                            </span>
                          </span>
                        ) : (
                          <>
                            <span className="text-rose-600 font-bold">
                              {lowPrice}{" "}
                              <span className="text-2xl">
                                <span className="text-2xl">৳</span>
                              </span>{" "}
                            </span>
                            -{" "}
                            <span className="text-rose-600 font-bold">
                              {highPrice}{" "}
                              <span className="text-2xl">
                                <span className="text-2xl">৳</span>
                              </span>{" "}
                            </span>
                          </>
                        )}
                      </div>
                    ) : (
                      <div className="text-rose-600 font-bold">
                        {product.price}{" "}
                        <span className=" text-2xl">
                          <span className="text-2xl">৳</span>
                        </span>{" "}
                      </div>
                    )}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
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
                                    const variationDiscountEndDate = new Date(
                                      combination.discount_date
                                    );
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
                                      combination.price - combination.discount
                                  )
                                );
                                const maxPrice = Math.max(
                                  ...validCombinations.map(
                                    (combination) =>
                                      combination.price - combination.discount
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
                          Please choose variant. <BsArrowUpSquare size={23} />
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
    </div>
  );
};

export default Section6;
