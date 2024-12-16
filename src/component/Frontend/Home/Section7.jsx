import React, { useState } from "react";

const Section7 = () => {
  const products = [
    { id: 1, image: "/assets/2_476edbd5-b71b-46af-aa54-6f32fd4b678c.png" },
    { id: 2, image: "/assets/3_c734eebd-04b1-41dd-9a2f-1207e4061d5f.png" },
    { id: 3, image: "/assets/3_c2a434c5-feaf-4dd4-b2d1-d608863472f9.png" },
    { id: 4, image: "/assets/3_87c64513-ec7e-4102-951a-1b3d78b652a5.png" },
    { id: 5, image: "/assets/3_84cd0b80-c105-46de-a622-fe7963873cae.png" },
    { id: 6, image: "/assets/3_cdac32eb-a757-4ab0-aa3a-9ea359456543.png" },
  ];

  const [visibleProducts, setVisibleProducts] = useState(0);

  // Function to move to the next set of cards
  const handleNext = () => {
    if (visibleProducts + 3 < products.length) {
      setVisibleProducts(visibleProducts + 3); // Show 3 more products
    }
  };

  // Function to move to the previous set of cards
  const handlePrev = () => {
    if (visibleProducts - 3 >= 0) {
      setVisibleProducts(visibleProducts - 3); // Go back by 3 products
    }
  };

  return (
    <div>
      <div className="bg-orange-100 font-semibold tracking-wider text-orange-500 text-lg my-8 p-4">
        <div className="scrolling-container">
          <div className="scrolling-text-wrapper">
            <div className="scrolling-text">
              &bull; Welcome to KidVerz Where Imagination Meets Style! &bull;
              Explore Our Collection Crafted for Young Adventurers Blending
              Comfort with the Latest Trends &bull; Your Little Ones Will Not
              Only Look Their Best but Also Feel Their Best in KidVerz Fashion
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 px-12 py-4 gap-4">
        <div>
          <p className="text-orange-500 font-bold md:text-lg my-2">New</p>
          <p className="text-3xl md:text-5xl font-semibold text-gray-800">
            Get 20% Off on Summer Sale Items{" "}
          </p>

          <p className="my-2 text-xl md:text-3xl text-gray-800 font-semibold">
            Summer special dress with sunglasses
          </p>
          <p className="text-sm md:text-base text-gray-600">
            Welcome to the vibrant world of kidverz, where imagination meets
            style! Our collection is crafted with young adventurers in mind,
            blending comfort with the latest trends to ensure your little ones
            not only look their best but also feel their best.
          </p>
          <button className="py-2 mt-4 px-6 textlg md:text-xl font-medium text-white bg-orange-500 hover:bg-indigo-400">
            See Details
          </button>
        </div>

        <div className="relative">
          <div className="grid grid-cols-2 ">
            {/* Display three images at a time */}
            {products
              .slice(visibleProducts, visibleProducts + 2)
              .map((product) => (
                <div
                  key={product.id}
                  className="border shadow flex flex-col group relative"
                >
                  <div className="bg-gray-100 relative">
                    <img
                      src={product.image}
                      alt={`Product ${product.id}`}
                      className="w-full " // Ensure fixed height and proper fit
                    />
                  </div>
                </div>
              ))}
          </div>

          {/* Navigation Arrows */}
          <div className="absolute top-36 -left-5">
            <button
              onClick={handlePrev}
              className="w-12 h-12 bg-white border-2 group border-gray-400 rounded-full flex justify-center items-center hover:bg-[#F65E17] transition duration-300"
            >
              <i className="fas fa-arrow-left md:text-lg group-hover:text-white text-gray-800"></i>
            </button>
          </div>
          <div className="absolute top-36 -right-5">
            <button
              onClick={handleNext}
              className="w-12 h-12 bg-white border-2 group border-gray-400 rounded-full flex justify-center items-center hover:bg-[#F65E17] transition duration-300"
            >
              <i className="fas fa-arrow-right md:text-lg group-hover:text-white text-gray-800"></i>
            </button>
          </div>
        </div>
      </div>

      <div className="bg-orange-100 font-semibold tracking-wider text-orange-500 text-lg mt-8 p-4">
        <div className="scrolling-container">
          <div className="scrolling-text-wrapper">
            <div className="scrolling-text">
              &bull; Welcome to KidVerz Where Imagination Meets Style! &bull;
              Explore Our Collection Crafted for Young Adventurers Blending
              Comfort with the Latest Trends &bull; Your Little Ones Will Not
              Only Look Their Best but Also Feel Their Best in KidVerz Fashion
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Section7;
