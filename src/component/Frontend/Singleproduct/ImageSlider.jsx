import { useState } from "react";

const Section6 = () => {
  const products = [
    {
      id: 1,
      image: "/assets/2_476edbd5-b71b-46af-aa54-6f32fd4b678c.png",
      name: "Product Name 1",
      price: "$20.00",
      rating: 0,
    },
    {
      id: 2,
      image: "/assets/3_c734eebd-04b1-41dd-9a2f-1207e4061d5f.png",
      name: "Product Name 2",
      price: "$25.00",
      rating: 4,
    },
    {
      id: 3,
      image: "/assets/3_c2a434c5-feaf-4dd4-b2d1-d608863472f9.png",
      name: "Product Name 3",
      price: "$20.00",
      rating: 0,
    },
    {
      id: 4,
      image: "/assets/3_87c64513-ec7e-4102-951a-1b3d78b652a5.png",
      name: "Product Name 4",
      price: "$25.00",
      rating: 4,
    },
    {
      id: 5,
      image: "/assets/3_84cd0b80-c105-46de-a622-fe7963873cae.png",
      name: "Product Name 5",
      price: "$20.00",
      rating: 0,
    },
    {
      id: 6,
      image: "/assets/3_cdac32eb-a757-4ab0-aa3a-9ea359456543.png",
      name: "Product Name 6",
      price: "$25.00",
      rating: 4,
    },
    // Add more products as needed
  ];

  const [visibleProducts, setVisibleProducts] = useState(0);

  // Function to move to the next set of cards
  const handleNext = () => {
    if (visibleProducts + 1 < products.length - 3) {
      setVisibleProducts(visibleProducts + 1); // Shift by 1
    }
  };

  // Function to move to the previous set of cards
  const handlePrev = () => {
    if (visibleProducts - 1 >= 0) {
      setVisibleProducts(visibleProducts - 1); // Shift by 1
    }
  };

  return (
    <div className="relative">
    

      {/* Product Cards Section */}
      <div className="mt-8 ">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.slice(visibleProducts, visibleProducts + 4).map((product) => (
            <div key={product.id} className="border shadow flex flex-col group relative">
              <div className="bg-gray-100 relative">
                <img src={product.image} alt={product.name} className="w-full" />
                <div className="absolute right-1 top-2 px-1 bg-gray-200 flex items-center">
                  {/* Stars */}
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <i
                        key={i}
                        className={`fas fa-star text-${i < product.rating ? 'yellow' : 'gray'}-400 text-xs`}
                      ></i>
                    ))}
                  </div>
                  {/* Rating */}
                  <span className="text-gray-800 ms-1">({product.rating})</span>
                </div>
                {/* Icons */}
                <div className="absolute flex justify-center gap-2 bottom-4 w-full opacity-0 group-hover:opacity-100 transition-transform duration-300 transform translate-y-full group-hover:translate-y-1">
                  {/* Cart Icon */}
                  <div className="">
                    <div className="w-10 h-10 bg-gray-800 flex justify-center items-center rounded hover:bg-[#F65E17] transition duration-300">
                      <i className="fa fa-shopping-cart text-white"></i>
                    </div>
                  </div>
                  {/* Wishlist Icon */}
                  <div className="">
                    <div className="w-10 h-10 bg-gray-800 flex justify-center items-center rounded hover:bg-[#F65E17] transition duration-300">
                      <i className="far fa-heart text-white"></i>
                    </div>
                  </div>
                  {/* View Icon */}
                  <div className="">
                    <div className="w-10 h-10 bg-gray-800 flex justify-center items-center rounded hover:bg-[#F65E17] transition duration-300">
                      <i className="far fa-eye text-white"></i>
                    </div>
                  </div>
                  {/* Comparison Icon */}
                  <div className="">
                    <div className="w-10 h-10 bg-gray-800 flex justify-center items-center rounded hover:bg-[#F65E17] transition duration-300">
                      <i className="fa fa-exchange-alt text-white"></i>
                    </div>
                  </div>
                </div>
              </div>

              {/* Product Info */}
              <div className="px-4 py-2">
                <h2 className="text-lg font-medium text-gray-800 md:text-xl">
                  {product.name}
                </h2>
                <p className="mt-1 text-lg font-semibold text-gray-800 md:text-xl">
                  {product.price}
                </p>
                <div className="mt-2 flex gap-2">
                  {["red", "yellow", "purple", "green", "blue"].map((color) => (
                    <button
                      key={color}
                      className="rounded-full w-6 h-6 border-2 border-gray-400 flex justify-center items-center"
                    >
                      <div className={`bg-${color}-500 rounded-full w-4 h-4`}></div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    
      {/* Navigation Arrows */}
      <div className="absolute top-36 -left-4 ">
      <button
          onClick={handlePrev}
          className="w-16 h-16 bg-white border-2 group border-gray-400 rounded-full flex justify-center items-center  hover:bg-[#F65E17] transition duration-1000"
        >
          <i className="fas fa-arrow-left md:text-lg group-hover:text-white text-gray-800"></i>
        </button>
        </div>
        <div className="absolute top-36 -right-4 ">
        <button
          onClick={handleNext}
          className="w-16 h-16 bg-white border-2 group border-gray-400 rounded-full flex justify-center items-center  hover:bg-[#F65E17] transition duration-1000"
        >
          <i className="fas fa-arrow-right md:text-lg group-hover:text-white text-gray-800"></i>
        </button>
        </div>
    </div>
  );
};

export default Section6;