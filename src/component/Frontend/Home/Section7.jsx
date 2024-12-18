import  { useState,useEffect } from "react";

const Section7 = () => {
  const products = [
    { id: 1, image: "/assets/2_476edbd5-b71b-46af-aa54-6f32fd4b678c.png" },
    { id: 2, image: "/assets/3_c734eebd-04b1-41dd-9a2f-1207e4061d5f.png" },
    { id: 3, image: "/assets/3_c2a434c5-feaf-4dd4-b2d1-d608863472f9.png" },
    { id: 4, image: "/assets/3_87c64513-ec7e-4102-951a-1b3d78b652a5.png" },
    { id: 5, image: "/assets/3_84cd0b80-c105-46de-a622-fe7963873cae.png" },
    { id: 6, image: "/assets/3_cdac32eb-a757-4ab0-aa3a-9ea359456543.png" },
  ];

  const [visibleProducts, setVisibleProducts] = useState(0); // Starting index of visible products
  const [productsToShow, setProductsToShow] = useState(2); // Default to 2 products on lg/md screens

  // Adjust the number of products to show based on screen size
  const updateProductsToShow = () => {
    const screenWidth = window.innerWidth;

    if (screenWidth >= 1024) {
      setProductsToShow(2); // Large screens (lg) - 2 products
    } else if (screenWidth >= 768) {
      setProductsToShow(2); // Medium screens (md) - 2 products
    } else {
      setProductsToShow(1); // Small screens (sm) - 1 product
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
      setVisibleProducts(visibleProducts + productsToShow); // Show 'productsToShow' more products
    }
  };

  // Handle previous button
  const handlePrev = () => {
    if (visibleProducts - productsToShow >= 0) {
      setVisibleProducts(visibleProducts - productsToShow); // Show 'productsToShow' fewer products
    }
  };

  return (
    <div>
      <div className="bg-orange-100 font-semibold tracking-wider text-orange-500 md:text-lg my-4 md:my-8 p-4">
        <div className="scrolling-container">
          <div className="scrolling-text-wrapper reverse">
            <div className="scrolling-text">
              &bull; Welcome to KidVerz Where Imagination Meets Style! &bull;
              Explore Our Collection Crafted for Young Adventurers Blending
              Comfort with the Latest Trends &bull; Your Little Ones Will Not
              Only Look Their Best but Also Feel Their Best in KidVerz Fashion
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 px-4 md:px-12 md:py-4 gap-4">
        <div>
          <p className="text-orange-500 font-bold md:text-lg my-2">New</p>
          <p className="text-2xl md:text-3xl lg:text-5xl font-semibold text-gray-800">
            Get 20% Off on Summer Sale Items{" "}
          </p>

          <p className="my-2 text-lg md:text-xl lg:text-3xl text-gray-800 font-semibold">
            Summer special dress with sunglasses
          </p>
          <p className="text-sm md:text-base text-gray-600">
            Welcome to the vibrant world of kidverz, where imagination meets
            style! Our collection is crafted with young adventurers in mind,
            blending comfort with the latest trends to ensure your little ones
            not only look their best but also feel their best.
          </p>
          <button className="py-2 mt-4 px-6 textlg lg:text-xl font-medium text-white bg-orange-500 hover:bg-indigo-400">
            See Details
          </button>
        </div>

        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-2 ">
            {/* Display three images at a time */}
            {products.slice(visibleProducts, visibleProducts + productsToShow).map((product) => (

                <div
                  key={product.id}
                  className=" shadow flex flex-col group relative"
                >
                  <div className="bg-gray-100 relative ">
                    <img
                      src={product.image}
                      alt={`Product ${product.id}`}
                      className="w-full h-full object-cover" // Ensure fixed height and proper fit
                    />
                  </div>
                </div>
              ))}
          </div>

          {/* Navigation Arrows */}
          <div className="absolute top-36 -left-4">
            <button
              onClick={handlePrev}
              className="size-10 md:size-12 bg-white border-2 group border-gray-400 rounded-full flex justify-center items-center hover:bg-[#F65E17] transition duration-300"
            >
              <i className="fas fa-arrow-left md:text-lg group-hover:text-white text-gray-800"></i>
            </button>
          </div>
          <div className="absolute top-36 -right-4">
            <button
              onClick={handleNext}
              className="size-10 md:size-12 bg-white border-2 group border-gray-400 rounded-full flex justify-center items-center hover:bg-[#F65E17] transition duration-300"
            >
              <i className="fas fa-arrow-right md:text-lg group-hover:text-white text-gray-800"></i>
            </button>
          </div>
        </div>
      </div>

      <div className="bg-orange-100 font-semibold tracking-wider text-orange-500 md:text-lg mt-6 md:mt-8 p-4">
        <div className="scrolling-container">
          <div className="scrolling-text-wrapper normal">
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
