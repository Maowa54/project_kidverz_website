import { useState, useContext, useEffect } from "react";
import Progressbar from "../../component/Frontend/Singleproduct/Progressbar";
import ImageSlider from "../../component/Frontend/Singleproduct/ImageSlider";
import ProductInfo from "../../component/Frontend/Singleproduct/ProductInfo";
import Footer from "../../component/Frontend/Footer";
import { Link, useParams } from "react-router-dom";
import { CartContext } from "../../component/Frontend/CartContext";

const SingleProduct = ({ products }) => {
  const [selectedImage, setSelectedImage] = useState(
    "/assets/shopify-image-Recovered_deff5341-e76f-4831-ae3f-94cfb9cb51c3.png"
  );

  const { addToCart } = useContext(CartContext);

  const handleImageClick = (imageSrc) => {
    setSelectedImage(imageSrc);
  };

  const [selectedColor, setSelectedColor] = useState("Blue"); // Default color

  // Function to handle button selection
  const handleColorSelect = (color) => {
    setSelectedColor(color);
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

  return (
    <div className="overflow-hidden">
      <div className="container  mx-auto">
        <div className="bg-white mt-4 p-4 md:p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Left Section */}
          <div className="">
            {/* Breadcrumb */}
            <div className="text-sm mb-4">
              <a href="/" className="text-blue-500 hover:underline">
                Home
              </a>{" "}
              &gt;{" "}
              <a href="/product" className="text-blue-500 hover:underline">
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
                  <p className="text-2xl md:text-4xl font-medium mt-2">
                    ৳{" "}
                    {product.variation_combinations &&
                    product.variation_combinations.length > 0
                      ? product.variation_combinations[0].price
                      : product.price}
                  </p>

                  <div className="my-4 grid grid-cols-12 gap-4 text-base md:text-lg">
                    <div className="col-span-3 font-semibold">Vendor</div>
                    <div className="col-span-9 font-normal">AZMAIN FASHION</div>

                    <div className="col-span-3 font-semibold">Availability</div>
                    <div className="col-span-9 font-normal">In stock</div>

                    <div className="col-span-3 font-semibold">Category</div>
                    <div className="col-span-9 font-normal">
                      {product.category.name}
                    </div>
                  </div>

                  <p className=" md:text-lg text-gray-600 mt-2">
                    Main fabric: Cotton 80%, Polyester 20%Season:
                    Autumn-WinterDiscipline: sportstyleFit: RegularLength:
                    longPockets: with pockets, open
                  </p>
                </>
              ) : (
                <div className="py-10">
                  <span className="loading loading-ring loading-sm"></span>
                </div>
              )}

              {/* colors */}
              <Progressbar />
              <div>
                <p className="mt-4 md:text-lg">Color: {selectedColor}</p>

                <div className="mt-2 flex gap-2">
                  {["Red", "Purple", "Green", "Blue", "Yellow"].map((color) => (
                    <button
                      key={color}
                      className={`size-8 rounded p-1  focus:outline-none ${
                        selectedColor.toLowerCase() === color.toLowerCase()
                          ? "ring-2 ring-red-600 ring-offset-2 ring-offset-white"
                          : ""
                      }`}
                      style={{ backgroundColor: color.toLowerCase() }}
                      onClick={() => handleColorSelect(color)}
                    ></button>
                  ))}
                </div>
              </div>
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
                    onClick={() => {
                      addToCart(product, count);
                    }}
                    className="py-2  w-full md:text-lg bg-orange-600 text-white font-semibold rounded hover:bg-orange-500"
                  >
                    Add To Cart
                  </button>
                </div>

                {/* Buy Now Button */}
                <Link to="/checkout" className="col-span-6 md:col-span-5">
                  <button className="py-2  w-full md:text-lg bg-indigo-600 text-white font-semibold rounded hover:bg-indigo-500">
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
          <ImageSlider />
        </div>
      </div>

      {/* Footer Section */}
      <Footer />
    </div>
  );
};

export default SingleProduct;
