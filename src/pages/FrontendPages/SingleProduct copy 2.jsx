import { useState, useContext, useEffect } from "react";
import Progressbar from "../../component/Frontend/Singleproduct/Progressbar";
import ImageSlider from "../../component/Frontend/Singleproduct/ImageSlider";
import ProductInfo from "../../component/Frontend/Singleproduct/ProductInfo";
import Footer from "../../component/Frontend/Footer";
import { Link, useParams } from "react-router-dom";
import { CartContext } from "../../component/Frontend/CartContext";

const SingleProduct = ({ products = [] }) => {
  useEffect(() => {
    const interval = setInterval(() => {
      // setStock((prevStock) => (prevStock > 0 ? prevStock - 1 : 0));
    }, 2000); // Decrease stock every 2 seconds
    return () => clearInterval(interval);
  }, []);

  const [CategoryProducts, setCategoryProducts] = useState([]);

  const [selectedImage, setSelectedImage] = useState(
    "/assets/shopify-image-Recovered_deff5341-e76f-4831-ae3f-94cfb9cb51c3.png"
  );

  const { addToCart } = useContext(CartContext);

  const handleImageClick = (imageSrc) => {
    setSelectedImage(imageSrc);
  };

  const [selectedVariation, setSelectedVariation] = useState(null);

  const handleVariationSelect = (value) => {
    const selected = product.variation_combinations.find(
      (combination) => combination.values === value
    );
    setSelectedVariation(selected);
  };

  const [count, setCount] = useState(1); // Default quantity

  // Functions to handle quantity increment and decrement
  const increment = () => setCount((prev) => prev + 1);
  const decrement = () => setCount((prev) => (prev > 1 ? prev - 1 : 1));

  const [product, setProduct] = useState(null);
  const { product_info } = useParams();

  const lastIndex = product_info.lastIndexOf("-");
  const product_name = product_info.substring(0, lastIndex);
  const product_id = parseInt(product_info.substring(lastIndex + 1), 10);

  useEffect(() => {
    if (products.length > 0 && product_id) {
      // Filter the products by matching id
      const filtered = products.filter((p) => p.id === Number(product_id));
      if (filtered.length > 0) {
        setProduct(filtered[0]);
      } else {
        console.log("Product not found");
        setProduct(null);
      }
    }
  }, [products, product_id]);
  console.log(product_id);
  console.log(product);

  useEffect(() => {
    if (product) {
      const filtered = products.filter(
        (p) => p.category_id === product.category_id
      );
      setCategoryProducts(filtered);
    }
  }, [products, product]);

  console.log(CategoryProducts);

  const stock = selectedVariation?.stock ?? 0;
  const totalStock = selectedVariation?.totalStock ?? 1; // Avoid division by zero

  const progressBarWidth = stock / totalStock;

  console.log(selectedVariation?.stock, selectedVariation?.totalStock);

  const handleAddToCart = () => {
    if (product) {
      const variation_id = selectedVariation?.id; // If a variation is selected
      const variation = selectedVariation; // Selected variation details
      const currentPrice = selectedVariation?.price || product.price; // Use variation price if available, otherwise use the product price

      addToCart(product, count, variation_id, variation, currentPrice); // Call the addToCart function from CartContext
    }
  };
  return (
    <div className="overflow-hidden">
      <div className="container  mx-auto">
        <div className="bg-white mt-4 p-4 md:p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Left Section */}
          <div className="">
            {/* Breadcrumb */}
            <div className="text-sm mb-4">
              <a href="/" className="text-[#d431bc] hover:underline">
                Home
              </a>{" "}
              &gt;{" "}
              <a href="/product" className="text-[#d431bc] hover:underline">
                Product Name
              </a>
            </div>

            {/* Images Section */}
            <div className="flex gap-4">
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
              <div className="flex-grow bg-gray-100 flex justify-center items-center">
                {product?.image ? (
                  <img
                    src={`https://admin.ezicalc.com/public/storage/product/${product.image}`}
                    alt="Product"
                    className="w-full h-auto object-cover rounded-md"
                  />
                ) : (
                  <div className="w-full h-64 flex justify-center items-center text-gray-700">
                    <span>No image available</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Section */}
          <div className="md:px-4">
            <div className="flex justify-between mt-9 text-gray-800 ">
              <div className=" flex items-center">
                {/* Stars */}
                <div className="flex space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <i
                      key={i}
                      className="fas fa-star text-gray-400 text-xs"
                    ></i>
                  ))}
                </div>
                {/* Rating */}
                <span className="text-gray-800 ms-2">(0 Reviews)</span>
              </div>{" "}
              <div className="flex space-x-2">
                {/* Comparison Icon */}
                <button className="flex w-8 h-8 md:w-10 md:h-10  bg-gray-100  rounded-full justify-center items-center  transition duration-300">
                  <i className="fa fa-exchange-alt"></i>
                </button>

                {/* Wishlist Icon */}
                <button className="flex   w-8 h-8 md:w-10 md:h-10  bg-gray-100 rounded-full  justify-center items-center  transition duration-300">
                  <i className="far fa-heart"></i>
                </button>

                {/* Cart Icon */}
                <button className=" w-8 h-8 md:w-10 md:h-10 flex bg-gray-100  rounded-full justify-center items-center  transition duration-300">
                  <i className="fas fa-share-alt"></i>
                </button>
              </div>
            </div>

            <div className="mt-1 text-gray-800">
              {product ? (
                <>
                  <p className="text-2xl md:text-4xl font-semibold">
                    {product.name}
                  </p>
                  <p className="text-sm md:text-base text-gray-500 mt-0 md:mt-2">
                    SKU: {product.code}
                  </p>
                  <p className="text-2xl md:text-4xl font-medium mt-2">
                    ৳{" "}
                    {selectedVariation
                      ? selectedVariation.price
                      : product.variation_combinations[0]?.price}
                  </p>

                  <div className="my-4 grid grid-cols-12 gap-4 text-base md:text-lg">
                    <div className="col-span-3 font-semibold">Vendor</div>
                    <div className="col-span-9 font-normal">AZMAIN FASHION</div>

                    <div className="col-span-3 font-semibold">Category</div>
                    <div className="col-span-9 font-normal">
                      {product.category.name}
                    </div>
                  </div>

                  {/* Loop through variations */}
                  {product.product_variation.map((variation) => (
                    <div key={variation.id}>
                      {!selectedVariation && (
                        <p className="text-red-600 text-sm mt-2">
                          Please select an option first.
                        </p>
                      )}

                      <div className="mt-2 flex flex-wrap gap-2">
                        {variation.variaton_values
                          .split(",")
                          .map((value, i) => (
                            <button
                              key={i}
                              onClick={() => handleVariationSelect(value)}
                              className={`py-1 px-4 rounded text-white ${
                                selectedVariation?.values === value
                                  ? "bg-[#d431bc]"
                                  : "bg-[#ED1D38] hover:bg-[#e24acb] hover:text-white"
                              }`}
                            >
                              {value}
                            </button>
                          ))}
                      </div>

                      {/* Progress Bar for the selected variation */}
                      <div className="w-full my-4">
                        {/* Stock message */}
                        <div className="flex items-center text-red-600 font-semibold mb-2">
                          <span className="text-lg mr-2">🔥</span>

                          <p>
                            {selectedVariation && selectedVariation.stock === 0
                              ? " Stock Out"
                              : `HURRY! ONLY ${
                                  selectedVariation?.stock || 0
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
                  ))}

                  <p className="md:text-lg text-gray-600 mt-3">
                    Main fabric: Cotton 80%, Polyester 20% Season: Autumn-Winter
                    Discipline: sportstyle Fit: Regular Length: long Pockets:
                    with pockets, open
                  </p>
                </>
              ) : (
                <div className="py-10">
                  <span className="loading loading-ring loading-sm"></span>
                </div>
              )}

              <div className="grid grid-cols-12 gap-2 mt-5 py-2">
                {/* Quantity Control Section */}
                <div className="col-span-12 w-1/4 md:w-full md:col-span-2 px-4">
                  <div className="flex justify-between">
                    {" "}
                    <div className="py-2 md:text-lg font-semibold ">
                      {count}
                    </div>
                    <div className="flex flex-col gap-1">
                      {/* Increment Button */}
                      <button
                        onClick={increment}
                        className=""
                        aria-label="Increase quantity"
                      >
                        <i className="fas fa-chevron-up"></i>
                      </button>

                      {/* Decrement Button */}
                      <button
                        onClick={decrement}
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
                    className={`py-2 w-full md:text-lg font-semibold rounded hover:bg-[#ff3d57] ${
                      !selectedVariation
                        ? "bg-gray-300 cursor-not-allowed"
                        : "bg-[#ED1D38] text-white"
                    }`}
                    disabled={!selectedVariation} // Visually indicate inactive state, but still keep the button clickable.
                  >
                    Add To Cart
                  </button>
                </div>

                {/* Buy Now Button */}
                <Link
                  to={selectedVariation ? "/checkout" : "#"}
                  className="col-span-6 md:col-span-5"
                >
                  <button
                    onClick={handleAddToCart}
                    className={`py-2 w-full md:text-lg font-semibold rounded hover:bg-[#ee3bd3] ${
                      !selectedVariation
                        ? "bg-gray-300 cursor-not-allowed"
                        : "bg-[#d431bc] text-white"
                    }`}
                  >
                    Buy Now
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div>
          <ProductInfo />
        </div>

        <div className="my-8 px-4 md:px-2">
          <h1 className="font-semibold text-2xl text-gray-800 md:text-4xl ">
            You May Also Like
          </h1>
          <ImageSlider products={CategoryProducts} product={product} />
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
            onClick={() => addToCart(product, count)}
            className="w-full relative text-white flex text-lg justify-center items-center text-nowrap font-semibold bg-[#E20ABC]"
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
