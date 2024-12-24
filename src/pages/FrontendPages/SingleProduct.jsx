import { useState, useContext, useEffect, useRef } from "react";
import Progressbar from "../../component/Frontend/Singleproduct/Progressbar";
import ImageSlider from "../../component/Frontend/Singleproduct/ImageSlider";
import ProductInfo from "../../component/Frontend/Singleproduct/ProductInfo";
import Footer from "../../component/Frontend/Footer";
import { Link, useNavigate, useParams } from "react-router-dom";
import { CartContext } from "../../component/Frontend/CartContext";
import { WishContext } from "../../component/Frontend/WishContext";

import { FaMinus, FaPlus, FaTimesCircle } from "react-icons/fa";

import { BsArrowUpSquare } from "react-icons/bs";
import Carticon from "../../component/Frontend/Carticon";

const SingleProduct = ({ products = [] }) => {
  const { addToCart } = useContext(CartContext);
  const { addToWishlist } = useContext(WishContext);
  const [modalOpen, setModalOpen] = useState(false);

  const [selectedImage, setSelectedImage] = useState(
    "/assets/shopify-image-Recovered_deff5341-e76f-4831-ae3f-94cfb9cb51c3.png"
  );

  const { cartCount } = useContext(CartContext);

  const [product, setProduct] = useState(null);

  const [isCartOpen, setIsCartOpen] = useState(false); // State to toggle the cart sidebar
  const [quantity, setQuantity] = useState(1);
  const [selectedVariations, setSelectedVariations] = useState({});
  const [currentId, setCurrentId] = useState("");

  const [min, setMin] = useState("");

  const [currentVariation, setCurrentVariation] = useState([]);

  const [currentPrice, setCurrentPrice] = useState("");
  const [oldPrice, setOldPrice] = useState("");

  const [isToastVisible, setIsToastVisible] = useState(false);

  // Modal
  const [selectedProduct, setSelectedProduct] = useState(null);

  const { product_info } = useParams();

  const lastIndex = product_info.lastIndexOf("-");
  const product_name = product_info.substring(0, lastIndex);
  const product_id = parseInt(product_info.substring(lastIndex + 1), 10);

  const navigate = useNavigate();

  const [progressBarWidth, setProgressBarWidth] = useState(80); // Set initial value to 80%

  useEffect(() => {
    if (currentVariation?.stock) {
      const maxStock = 100; // Assuming 100 is the full stock (you can adjust this to be the max stock for the product)
      const stockPercentage = (currentVariation.stock / maxStock) * 100;
      setProgressBarWidth(stockPercentage);
    }
  }, [currentVariation]);

  const handleImageClick = (imageSrc) => {
    setSelectedImage(imageSrc);
  };

  useEffect(() => {
    if (products.length > 0 && product_id) {
      const filtered = products.filter((p) => p.id == product_id);
      if (filtered.length > 0) {
        setProduct(filtered[0]);
        setSelectedProduct(filtered[0]);
        // Reset ALL
        setSelectedVariations({});
        setCurrentId("");
        setQuantity(1);
        setCurrentVariation([]);
        setIsToastVisible(false);
        setCurrentPrice("");
      } else {
        navigate(`/`);
      }
    }
  }, [products, product_id]);

  const incrementCount = () => setQuantity(quantity + 1);
  const decrementCount = () => setQuantity(quantity > 1 ? quantity - 1 : 1);

  const handleCartToggle = () => {
    if (cartCount < 1) {
      toast("Your cart is empty", {
        icon: "⚠️",
        style: {
          border: "1px solid #CA3433",
          padding: "16px",
          color: "#CA3433",
        },
      });
    } else {
      setIsCartOpen((prevState) => !prevState);
    }
  };
  const cartAnimation = cartCount >= 0 ? "animate-bubble" : "";

  const handleVariationChange = (variationType, value) => {
    // If there are no variations, we don't need to update the selected variations
    if (product.has_variation === 0) {
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

  const [imageFly, setimageFly] = useState(false);

  const varientErr = document.getElementById("error");

  const handleAddToCart = (e) => {
    e.preventDefault();

    if (product.has_variation == 1) {
      if (
        Object.keys(selectedVariations).length <
        Object.keys(product.product_variation).length
      ) {
        setIsToastVisible(true);
        if (varientErr && !modalOpen) {
          varientErr.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      } else {
        setIsToastVisible(false);
        // image fly animation
        setimageFly(false);
        requestAnimationFrame(() => {
          setimageFly(true);
        });
        addToCart(product, quantity, currentId, currentVariation, currentPrice);
      }
    } else {
      // image fly animation
      setimageFly(false);
      requestAnimationFrame(() => {
        setimageFly(true);
      });
      addToCart(product, quantity, currentId, currentVariation, currentPrice);
    }
  };

  // Modal..............

  const openModal = (product) => {
    setProduct(product);
    setModalOpen(true);
    setSelectedVariations({});
    setCurrentId("");
    setQuantity(1);
    setCurrentVariation([]);
    setIsToastVisible(false);
    setCurrentPrice("");
  };

  const closeModal = () => {
    setModalOpen(false);
    setProduct(selectedProduct);
    setQuantity(1);
    setSelectedVariations({});
    setCurrentId("");
    setCurrentVariation([]);
    setIsToastVisible(false);
    setCurrentPrice("");
    setimageFly(false);
  };

  const modalRef = useRef(null); // Reference for the modal container

  // Close the modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      // If the click is outside the modalRef, close the modal
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setModalOpen(false); // Close the modal
      }
    };

    // Add event listener if the modal is open
    if (modalOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    // Cleanup on component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [modalOpen, setModalOpen]); // Re-run the effect when modalOpen changes

  return (
    <div className="overflow-hidden">
      <Carticon />
      <div className="container  mx-auto">
        <div className="text-sm mt-4 px-6  ">
          <a href="/" className="text-[#d431bc] hover:underline">
            Home
          </a>{" "}
          &gt;{" "}
          <a href="/product" className="text-[#d431bc] hover:underline">
            Product Name
          </a>
        </div>

        {product ? (
          <div className="bg-white mt-2 px-4 md:px-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Images Section */}
            <div className="flex mt-2 gap-4">
              {/* Thumbnail Images */}
              <div className="flex flex-col space-y-3">
                {[
                  `https://admin.ezicalc.com/public/storage/product/${product?.image}`,
                  `https://admin.ezicalc.com/public/storage/product/${product?.image}`,
                  `https://admin.ezicalc.com/public/storage/product/${product?.image}`,
                  `https://admin.ezicalc.com/public/storage/product/${product?.image}`,
                ].map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Thumbnail ${index + 1}`}
                    className={`border w-16 md:w-24 cursor-pointer ${
                      selectedImage === image
                        ? "border-orange-500"
                        : "hover:border-orange-500"
                    }`}
                    onClick={() => handleImageClick(image)} // Ensure it sets the clicked image as selected
                  />
                ))}
              </div>

              {/* Selected Image */}
              <div className=" justify-center items-center">
                <img
                  src={`https://admin.ezicalc.com/public/storage/product/${product.image}`}
                  alt="Product"
                  className="w-full h-auto object-cover "
                />
                <img
                  src={`https://admin.ezicalc.com/public/storage/product/${product.image}`}
                  alt="Product"
                  className={`w-[300px] fixed h-[400px] hidden opacity-0 invisible z-50 ${
                    imageFly &&
                    !modalOpen &&
                    "single-mobile-flying-div  single-flying-div"
                  }`}
                  onAnimationEnd={() => setimageFly(false)}
                />
              </div>
            </div>
            {/* Add to Cart Product Section */}
            <div className=" md:px-4">
              <div className="flex justify-between  text-gray-800 ">
                <div className=" flex items-center">
                  {/* Stars */}

                  {[...Array(5)].map((_, i) => (
                    <i
                      key={i}
                      className="fas fa-star text-gray-400 text-xs"
                    ></i>
                  ))}

                  {/* Rating */}
                  <span className="text-gray-800 ms-2">(0 Reviews)</span>
                </div>{" "}
                <div className="flex space-x-2">
                  {/* Comparison Icon */}
                  <button className="flex w-8 h-8 md:w-10 md:h-10  bg-gray-100  rounded-full justify-center items-center  transition duration-300">
                    <i className="fa fa-exchange-alt"></i>
                  </button>

                  {/* Wishlist Icon */}
                  <button onClick={addToWishlist} className="flex hover:bg-black hover:text-white  w-8 h-8 md:w-10 md:h-10  bg-gray-100 rounded-full  justify-center items-center  transition duration-300">
                    <i className="far fa-heart"></i>
                  </button>

                  {/* Cart Icon */}
                  <button className=" w-8 h-8 md:w-10 md:h-10 flex bg-gray-100  rounded-full justify-center items-center  transition duration-300">
                    <i className="fas fa-share-alt"></i>
                  </button>
                </div>
              </div>
              <div className="text-gray-800">
                <p className="text-2xl md:text-2xl font-semibold">
                  {product.name}
                </p>

                <p className="text-sm md:text-base text-gray-500 mt-0 md:mt-2">
                  SKU: {product.code}
                </p>

                <div className="flex md:items-center space-x-0 md:space-x-4 mt-1 flex-col md:flex-row">
                  {currentPrice ? (
                    <h2 className="text-lg md:text-3xl font-bold text-[#ED1D38]">
                      Price: <span className="md:text-2xl">৳</span>{" "}
                      {currentPrice} {oldPrice && <s>{oldPrice}</s>}
                    </h2>
                  ) : (
                    <div className="text-lg md:text-3xl font-bold text-[#ED1D38]">
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
                                Price: <span className="md:text-2xl">৳</span>{" "}
                                {minPrice}{" "}
                              </h2>
                            ) : (
                              <h2>
                                Price: <span className="md:text-2xl">৳</span>{" "}
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
                                Price: <span className="md:text-2xl">৳</span>{" "}
                                {maxPrice}
                              </h2>
                            ) : (
                              <h2>
                                Price: <span className="md:text-2xl">৳</span>{" "}
                                {minPrice} -{" "}
                                <span className="md:text-2xl">৳</span>{" "}
                                {maxPrice}
                              </h2>
                            );
                          }
                        })()
                      ) : (
                        <h2>
                          Price: <span className="md:text-2xl">৳</span>{" "}
                          {product.price}
                        </h2>
                      )}
                    </div>
                  )}
                </div>

                <div className="my-2 grid grid-cols-12 gap-2  md:text-lg">
                  <div className="col-span-3 font-semibold">Vendor</div>
                  <div className="col-span-9 font-normal">AZMAIN FASHION</div>

                  <div className="col-span-3 font-semibold">Category</div>
                  <div className="col-span-9 font-normal">
                    {product.category.name}
                  </div>
                </div>

                <ul className="space-y-4 mt-3">
                  {product.product_variation?.length > 0 ? (
                    product.product_variation.map((variation) => (
                      <div key={variation.id}>
                        <div className="flex flex-wrap gap-3">
                          {variation.variaton_values
                            .split(",")
                            .map((value, i) => (
                              <button
                                key={i}
                                onClick={() =>
                                  handleVariationChange(
                                    variation.variation.name,
                                    value,
                                    i
                                  )
                                }
                                className={`py-1 px-3  rounded ${
                                  selectedVariations[
                                    variation.variation.name
                                  ] === value
                                    ? "bg-[#31a0d4] text-white"
                                    : "bg-[#ED1D38] hover:bg-[#31a0d4] text-white"
                                }`}
                              >
                                {value}
                              </button>
                            ))}
                        </div>
                      </div>
                    ))
                  ) : (
                    <li>No variations available</li>
                  )}
                </ul>

                <div id="error">
                  {isToastVisible && (
                    <span className="mt-4 text-red-600 flex items-center gap-2 font-medium text-sm">
                      Please choose variant. <BsArrowUpSquare size={23} />
                    </span>
                  )}
                </div>

                <div className="mt-4 py-2  md:text-lg  border-gray-200">
                  <p className=" font-semibold mb-2  text-gray-800 ">
                    Description :
                  </p>
                  <p className="text-sm md:text-base text-gray-600">
                    {product.short_desc}
                  </p>
                </div>

                {/* Progress Bar for the selected variation */}
                <div className="w-full my-3">
                  {/* Stock message */}
                  <div className="flex items-center text-red-600 font-semibold mb-2">
                    <span className="text-lg mr-2">🔥</span>

                    <p>
                      {currentVariation && currentVariation.stock === 0
                        ? " Stock Out"
                        : `HURRY! ONLY ${
                            currentVariation?.stock || 80
                          } ITEMS LEFT IN STOCK`}
                    </p>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full bg-gray-200 rounded h-4 relative overflow-hidden">
                    {/* Dynamic progress bar */}
                    <div
                      className="h-full bg-gradient-to-r from-red-500 to-orange-400"
                      style={{
                        width: `${progressBarWidth}%`, // Set the width with calculated progressBarWidth
                      }}
                    >
                      {/* Striped overlay */}
                      <div className="h-full bg-stripes"></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-12 gap-2 mt-6 py-2">
                {/* Quantity Control Section */}
                <div className="col-span-12 w-1/4 md:w-full md:col-span-2 px-4">
                  <div className="flex justify-between">
                    {" "}
                    <div className="py-2 md:text-lg font-semibold ">
                      {quantity}
                    </div>
                    <div className="flex flex-col gap-1">
                      {/* Increment Button */}
                      <button
                        onClick={incrementCount}
                        className=""
                        aria-label="Increase quantity"
                      >
                        <i className="fas fa-chevron-up"></i>
                      </button>

                      {/* Decrement Button */}
                      <button
                        onClick={decrementCount}
                        aria-label="Decrease quantity"
                      >
                        <i className="fas fa-chevron-down"></i>
                      </button>
                    </div>
                  </div>
                  <hr className="border-black " />
                </div>

                {/* Add to Cart Button */}
                <div className="col-span-6 md:col-span-5">
                  <button
                    onClick={handleAddToCart}
                    className="py-2 w-full md:text-lg font-semibold bg-[#ED1D38] text-white rounded hover:bg-[#ff3d57] ${
                    "
                    // Visually indicate inactive state, but still keep the button clickable.
                  >
                    Add To Cart
                  </button>
                </div>

                {/* Buy Now Button */}
                <Link to="checkout" className="col-span-6 md:col-span-5">
                  <button
                    onClick={handleAddToCart}
                    className="py-2 w-full md:text-lg font-semibold bg-[#31a0d4] text-white rounded hover:bg-[#2c89b4] "
                  >
                    Buy Now
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex sm:flex-row flex-col gap-12 border-gray-300 mx-auto px-4 py-5 sm:py-[100px] border rounded animate-pulse">
            <div className="bg-slate-200 p-4 rounded sm:w-1/2 hidden sm:block"></div>
            <div className="flex-1 space-y-6 py-1 sm:w-1/2">
              <div className="bg-slate-200 rounded h-40"></div>
              <div className="space-y-3">
                <div className="gap-4 grid grid-cols-3">
                  <div className="col-span-2 bg-slate-200 rounded h-20"></div>
                  <div className="col-span-1 bg-slate-200 rounded h-20"></div>
                </div>
                <div className="bg-slate-200 rounded h-40"></div>
              </div>
            </div>
          </div>
        )}

        <div>
          <ProductInfo />
        </div>

        <div className="my-8 px-4 md:px-2">
          <h1 className="font-semibold text-2xl text-gray-800 md:text-4xl ">
            You May Also Like
          </h1>
          <ImageSlider
            products={products}
            product={product}
            imageFly={imageFly}
            currentPrice={currentPrice}
            selectedVariations={selectedVariations}
            isToastVisible={isToastVisible}
            setimageFly={setimageFly}
            handleVariationChange={handleVariationChange}
            oldPrice={oldPrice}
            decrementCount={decrementCount}
            incrementCount={incrementCount}
            selectedProduct={selectedProduct}
            openModal={openModal} // Passing functions as props
            closeModal={closeModal} // Passing functions as props
            handleAddToCart={handleAddToCart}
            modalOpen={modalOpen}
            setModalOpen={setModalOpen} // Passing functions as props
            quantity={quantity}

          />
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 z-30 md:hidden flex flex-col space-y-2 w-full">
        <div className="mx-2 p-2 rounded-md bg-gray-300 w-fit">
          <a
            href="tel:+8801632460342"
            className="flex items-center text-teal-800 font-semibold"
          >
            <i className="fas fa-phone mr-2 text-red-600"></i>
            01632460342
          </a>
        </div>

        <div className="flex justify-between w-full">
          <button
            className="py-3 w-full text-white  text-lg  bg-[#EB1E39] font-semibold"
            onClick={handleAddToCart}
          >
            <i className="fas fa-shopping-cart mr-2"></i>Add To Cart
          </button>

          <Link
            to="/checkout"
            onClick={handleAddToCart}
            className="w-full relative text-white flex text-lg justify-center items-center text-nowrap font-semibold bg-[#31a0d4]"
          >
            <span className="absolute border-r-[24px] border-l-transparent border-r-transparent border-t-[50px] border-[#EB1E39] left-0 top-0"></span>
            <i className="fas fa-shopping-bag mr-2"></i>Buy Now
          </Link>
        </div>
      </div>
      {/* Footer Section */}
      <Footer />
    </div>
  );
};

export default SingleProduct;
