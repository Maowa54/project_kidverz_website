import { useState } from "react";
import Progressbar from "../../component/Frontend/Singleproduct/Progressbar";
import ImageSlider from "../../component/Frontend/Singleproduct/ImageSlider";
import ProductInfo from "../../component/Frontend/Singleproduct/ProductInfo";
import Footer from "../../component/Frontend/Footer";
import { Link } from "react-router-dom";
const SingleProduct = () => {
  const [selectedImage, setSelectedImage] = useState(
    "/assets/shopify-image-Recovered_deff5341-e76f-4831-ae3f-94cfb9cb51c3.png"
  );

  const handleImageClick = (imageSrc) => {
    setSelectedImage(imageSrc);
  };

  const [selectedColor, setSelectedColor] = useState("Blue"); // Default color

  // Function to handle button selection
  const handleColorSelect = (color) => {
    setSelectedColor(color);
  };

  const [quantity, setQuantity] = useState(1); // Default quantity

  // Functions to handle quantity increment and decrement
  const increment = () => setQuantity((prev) => prev + 1);
  const decrement = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  return (
    <div className="overflow-hidden">
      <div className="container pt-20 md:pt-28 mx-auto">
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
                  "/public/assets/2.png",
                  "/public/assets/2_476edbd5-b71b-46af-aa54-6f32fd4b678c.png",
                  "/public/assets/3_7386ead7-b74b-43ec-be8c-69e0262c58f0.png",
                  "/public/assets/3_bf9b8b28-9464-454e-bd49-61f655d923d8.png",
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
                    onClick={() => handleImageClick(image)}
                  />
                ))}
              </div>

              {/* Selected Image */}
              <div className="flex-grow bg-gray-100 flex justify-center items-center">
                <img
                  src={selectedImage}
                  alt="Selected"
                  className="w-full h-[200px] md:h-[600px] object-contain"
                />
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

            <div className="mt-4 text-gray-800">
              <p className="text-2xl md:text-4xl font-semibold">
                Sweatshirt Set
              </p>
              <p className="text-2xl md:text-4xl font-medium mt-2">$6.99</p>

              <div className="my-4 grid grid-cols-12 gap-4 text-base md:text-lg">
                <div className="col-span-3 font-semibold">Vendor</div>
                <div className="col-span-9 font-normal">KidVerz</div>

                <div className="col-span-3 font-semibold">Availability</div>
                <div className="col-span-9 font-normal">In stock</div>

                <div className="col-span-3 font-semibold">Category</div>
                <div className="col-span-9 font-normal">
                  Fashion Best Selling Product Kids Winter Wear
                </div>
              </div>

              <p className=" md:text-lg text-gray-600 mt-2">
                Main fabric: Cotton 80%, Polyester 20%Season:
                Autumn-WinterDiscipline: sportstyleFit: RegularLength:
                longPockets: with pockets, open
              </p>

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
                      {quantity}
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
                  <button className="py-2  w-full md:text-lg bg-orange-600 text-white font-semibold rounded hover:bg-orange-500">
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

        <div className="my-8">
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
