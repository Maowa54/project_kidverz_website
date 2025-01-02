import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
const Section1Slider = ({ products = [] }) => {
  const [showsText, setshowsText] = useState({});
  const textsRefs = useRef({});

  const itemsData = [
    {
      id: products[0]?.id,
      bgGradient: "bg-gradient-to-l from-yellow-300 to-[rgb(255,213,63)]",
      imageSrc: "/assets/248-2485262_kids-girl-kids-wear-png.png",
      title: products[0]?.name,
      price:
        products[0]?.variation_combinations?.[0]?.price || products[0]?.price,

      imageWidth: "w-[120px]",
      width: "w-[400px]",
      height: "h-68",
    },

    {
      id: products[1]?.id,
      bgGradient: "bg-gradient-to-b from-[#c1ecb5] to-[#aef19b]",
      imageSrc:
        "/assets/WhatsApp_Image_2024-12-10_at_2.10.09_PM-removebg-preview.png",
      title: products[1]?.name,
      price:
        products[1]?.variation_combinations?.[0]?.price || products[1]?.price,
      imageWidth: "w-[180px]",
      width: "w-[400px]",
      height: "h-68",
    },

    {
      id: products[2]?.id,
      bgGradient: "bg-gradient-to-b from-[#eeafde] to-[#f599f5]",
      imageSrc: "/assets/kids1.png",
      title: products[2]?.name,
      price:
        products[2]?.variation_combinations?.[0]?.price || products[2]?.price,

      imageWidth: "h-[290px]",
      width: "w-[400px]",
      height: "h-68",
    },
    {
      id: products[3]?.id,
      bgGradient: "bg-gradient-to-b from-[#fffd6f] to-[#f3ff50]",
      imageSrc:
        "/assets/png-transparent-girl-cute-little-girl-child-fashion-girl-hat-thumbnail-removebg-preview.png",
      title: products[3]?.name,
      price:
        products[3]?.variation_combinations?.[0]?.price || products[3]?.price,
      imageWidth: "w-[180px]",
      width: "w-[400px]",
      height: "h-68",
    },
    {
      id: products[4]?.id,
      bgGradient: "bg-gradient-to-r from-sky-200 to-sky-300",
      imageSrc:
        "/assets/pngtree-a-baby-girl-in-beautiful-pink-dress-with-face-png-image_11674562-removebg-preview.png",
      title: products[4]?.name,
      price:
        products[4]?.variation_combinations?.[0]?.price || products[4]?.price,
      imageWidth: "h-[250px]",
      width: "w-[400px]",
      height: "h-68",
    },
    {
      id: products[5]?.id,
      bgGradient: "bg-pink-300",
      imageSrc: "/assets/kids2.png",
      title: products[5]?.name,
      price:
        products[5]?.variation_combinations?.[0]?.price || products[5]?.price,
      imageWidth: "h-[300px]",
      width: "w-[400px]",
      height: "h-68",
    },
    {
      id: products[6]?.id,
      bgGradient: "bg-gradient-to-r from-[#aaccec] to-[#85b0d8]",
      imageSrc: "/assets/kids3.png",
      title: products[6]?.name,
      price:
        products[6]?.variation_combinations?.[0]?.price || products[6]?.price,
      imageWidth: "h-[280px]",
      width: "w-[400px]",
      height: "h-68",
    },
    {
      id: products[7]?.id,
      bgGradient: "bg-gradient-to-r from-[#ffabae] to-[#fa737a]",
      imageSrc:
        "/assets/pngtree-little-suits-traditional-tuxedo-dresses-for-baby-boys-png-image_13305026-removebg-preview.png",
      title: products[7]?.name,
      price:
        products[7]?.variation_combinations?.[0]?.price || products[7]?.price,
      imageWidth: "h-[270px]",
      width: "w-[400px]",
      height: "h-68",
    },
  ];

  // Function to handle click on the plus button
  const handlesClick = (id) => {
    setshowsText((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  // Function to close the popup
  const handlesClose = (id) => {
    setshowsText((prevState) => ({
      ...prevState,
      [id]: false,
    }));
  };

  // Close popup when clicking outside
  useEffect(() => {
    const handlesClickOutside = (event) => {
      // Check if the click is outside of the popup
      for (let id in textsRefs.current) {
        if (
          textsRefs.current[id] &&
          !textsRefs.current[id].contains(event.target)
        ) {
          handlesClose(id);
        }
      }
    };

    // Add the event listener
    document.addEventListener("click", handlesClickOutside);

    // Cleanup the event listener on component unmount
    return () => {
      document.removeEventListener("click", handlesClickOutside);
    };
  }, []);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const slideInterval = 3000;

  const handleNext = () => {
    console.log("Next Slide Triggered");
    setCurrentIndex((prevIndex) => (prevIndex + 1) % itemsData.length);
  };

  const handlePrev = () => {
    console.log("Previous Slide Triggered");
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + itemsData.length) % itemsData.length
    );
  };

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      console.log("Sliding to next...");
      handleNext();
    }, slideInterval);

    return () => {
      console.log("Clearing interval...");
      clearInterval(interval);
    };
  }, [isPaused]);


 

  return (
    <div>
      <div className="container mx-auto mt-2 relative">
        {/* Navigation Arrows */}
        <div className="">
          <div className="absolute top-40 z-10 left-6">
            <button
              onClick={handlePrev}
              className="size-10 md:size-14 bg-white border-2 group border-gray-400 rounded-full flex justify-center items-center hover:bg-[#EB1E39] "
            >
              <i className="fas fa-arrow-left md:text-lg group-hover:text-white text-gray-800"></i>
            </button>
          </div>
          <div className="absolute top-40 z-10 right-6">
            <button
              onClick={handleNext}
              className="size-10 md:size-14 bg-white border-2 group border-gray-400 rounded-full flex justify-center items-center hover:bg-[#EB1E39] "
            >
              <i className="fas fa-arrow-right md:text-lg group-hover:text-white text-gray-800"></i>
            </button>
          </div>
        </div>

        <div
          className="p-8"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="flex h-72 justify-between px-4">
            {itemsData.slice(currentIndex, currentIndex + 1).map((item) => (
              <div
                key={item.id}
                // ref={(el) => (buttonRefs.current[item.id] = el)}
                className={` ${item.bgGradient} ${item.width} ${item.marginRight} ${item.marginTop} ${item.height} -skew-x-12 flex justify-center items-end `}
              >
                {/* Plus Sign */}
                <div
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent the click event from propagating to the parent div
                    handlesClick(item.id); // Toggle the text
                  }}
                  className="skew-x-6 absolute z-20 p-1 animate-ping-border rounded-full bottom-4 left-2  flex items-center justify-center"
                >
                  <button className="text-white  bg-black rounded-full pb-1 size-8 text-xl font-semibold transform-none flex items-center justify-center">
                    +
                  </button>
                </div>

                {/* Image */}
                <img
                  src={item.imageSrc}
                  alt=""
                  className={`${item.imageWidth} object-cover skew-x-12`}
                />

                {/* Display Text */}
                {showsText[item.id] && (
                  <div className="absolute z-50 top-28 left-32 transform -translate-x-1/2 -translate-y-0 ">
                    <div
                      ref={(el) => (textsRefs.current[item.id] = el)}
                      className=" skew-x-12 w-48 bg-gray-100 p-3 rounded"
                    >
                      <div className="flex justify-between">
                        <p className="text-gray-600">Azmain Kids Mart</p>
                        <div className="bg-gray-300 rounded-full size-6 flex justify-center items-center">
                          <i
                            className="fas fa-close cursor-pointer"
                            onClick={() => handlesClose(item.id)}
                          ></i>
                        </div>
                      </div>
                      <p className="font-semibold text-gray-800">
                        {item.title}
                      </p>
                      <div className="flex">
                        <div className="flex mt-2">
                          {[...Array(5)].map((_, i) => (
                            <i
                              key={i}
                              className="fas fa-star text-yellow-500 text-xs"
                            ></i>
                          ))}
                        </div>
                        <p className="text-gray-800 ms-1 mt-1">(5)</p>
                      </div>
                      <p className="font-semibold text-gray-800">
                        ৳ {item.price}
                      </p>
                      <Link to={`/singleproduct/${item.title}-${item.id}`}>
                        <button className="bg-orange-600 mt-2 hover:bg-orange-500 px-2 py-1 text-white rounded text-sm">
                          View Details
                        </button>
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Section1Slider;
