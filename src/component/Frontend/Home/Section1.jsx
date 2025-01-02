import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Section1Slider from "./Section1Slider";
const Section1 = ({ products = [] }) => {
  const [showText, setShowText] = useState({});
  const textRefs = useRef({});

  const itemData = [
    {
      id: products[0]?.id,
      bgGradient: "bg-gradient-to-l from-yellow-300 to-[rgb(255,213,63)]",
      width: "w-[50%] md:w-[20%]",
      height: "h-[80px] md:h-[250px]",
      imageSrc: "/assets/248-2485262_kids-girl-kids-wear-png.png",
      imageWidth: "w-[30px] md:w-[100px]",
      title: products[0]?.name,
      price:
        products[0]?.variation_combinations?.[0]?.price || products[0]?.price,
      marginTop: "mt-[40px] md:mt-[100px]",
    },
    {
      id: products[1]?.id,
      bgGradient: "bg-gradient-to-b from-[#c1ecb5] to-[#aef19b]",
      width: "w-[70%] md:w-[30%]",
      height: "h-[120px] md:h-[350px]",
      imageSrc:
        "/assets/WhatsApp_Image_2024-12-10_at_2.10.09_PM-removebg-preview.png",
      imageWidth: " h-[110px] md:h-[340px]",
      title: products[1]?.name,
      price:
        products[1]?.variation_combinations?.[0]?.price || products[1]?.price,
    },
    {
      id: products[2]?.id,
      bgGradient: "bg-gradient-to-b from-[#eeafde] to-[#f599f5]",
      width: "w-[70%] md:w-[30%]",
      height: "h-[120px] md:h-[350px]",
      imageSrc: "/assets/kids1.png",
      imageWidth: " h-[120px] md:h-[360px]",
      title: products[2]?.name,
      price:
        products[2]?.variation_combinations?.[0]?.price || products[2]?.price,
    },
    {
      id: products[3]?.id,
      bgGradient: "bg-gradient-to-b from-[#fffd6f] to-[#f3ff50]",
      width: "w-[50%] md:w-[20%]",
      height: "h-[80px] md:h-[250px]",
      imageSrc:
        "/assets/png-transparent-girl-cute-little-girl-child-fashion-girl-hat-thumbnail-removebg-preview.png",
      imageWidth: "w-[80px] md:w-[150px]",
      title: products[3]?.name,
      price:
        products[3]?.variation_combinations?.[0]?.price || products[3]?.price,
      marginTop: "mt-[40px] md:mt-[100px]",
    },
    {
      id: products[4]?.id,
      bgGradient: "bg-gradient-to-r from-sky-200 to-sky-300",
      width: "w-[50%] md:w-[20%]",
      height: "h-[80px] md:h-[250px]",
      imageSrc:
        "/assets/pngtree-a-baby-girl-in-beautiful-pink-dress-with-face-png-image_11674562-removebg-preview.png",
      imageWidth: "w-[180px]",

      title: products[4]?.name,
      price:
        products[4]?.variation_combinations?.[0]?.price || products[4]?.price,
    },
    {
      id: products[5]?.id,
      bgGradient: "bg-pink-300",
      width: "w-[70%] md:w-[30%]",
      height: "h-[120px] md:h-[350px]",
      imageSrc: "/assets/kids2.png",
      imageWidth: " h-[120px] md:h-[360px]",
      title: products[5]?.name,
      price:
        products[5]?.variation_combinations?.[0]?.price || products[5]?.price,
    },
    {
      id: products[6]?.id,

      bgGradient: "bg-gradient-to-r from-[#aaccec] to-[#85b0d8]",
      width: "w-[70%] md:w-[30%]",
      height: "h-[120px] md:h-[350px]",
      imageSrc: "/assets/kids3.png",
      imageWidth: "h-[120px] md:h-[360px]",

      title: products[6]?.name,
      price:
        products[6]?.variation_combinations?.[0]?.price || products[6]?.price,
    },
    {
      id: products[7]?.id,
      bgGradient: "bg-gradient-to-r from-[#ffabae] to-[#fa737a]",
      width: "w-[50%] md:w-[20%]",
      height: "h-[80px] md:h-[250px]",
      imageSrc:
        "/assets/pngtree-little-suits-traditional-tuxedo-dresses-for-baby-boys-png-image_13305026-removebg-preview.png",
      imageWidth: "h-[80px] md:h-[260px]",

      title: products[7]?.name,
      price:
        products[7]?.variation_combinations?.[0]?.price || products[7]?.price,
    },
  ];

  // Function to handle click on the plus button
  const handleClick = (id) => {
    setShowText((prevState) => {
      const newState = {};
      // Close all other popups and toggle the current one
      for (let key in prevState) {
        newState[key] = false;
      }
      newState[id] = !prevState[id];
      return newState;
    });
  };

  // Function to close the popup
  const handleClose = (id) => {
    setShowText((prevState) => ({
      ...prevState,
      [id]: false,
    }));
  };

  // Close popup when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Check if the click is outside of the popup
      for (let id in textRefs.current) {
        if (
          textRefs.current[id] &&
          !textRefs.current[id].contains(event.target)
        ) {
          handleClose(id);
        }
      }
    };

    // Add the event listener
    document.addEventListener("click", handleClickOutside);

    // Cleanup the event listener on component unmount
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div>
      <div className="hidden md:block container mx-auto my-6 py-4 ">
        <div className="absolute top-44 left-28 hidden md:block">
          <img
            src="/assets/cute-baby-cartoon-sleeping-moon-illustration-39807185.png"
            alt=""
            className="w-24 slow-bounce"
          />
        </div>

        <div className="absolute top-44 right-10 hidden md:block">
          <img
            src="/public/assets/cartoon-baby-star-vector-illustration_444196-1129.png"
            alt=""
            className="w-28 slow-bounce"
          />
        </div>

        <div className="absolute -bottom-96 right-10 hidden md:block">
          <img
            src="/assets/cute-flower-cartoon-vector-illustration2_877459-322.png"
            alt=""
            className="w-20 ping-animation"
          />
        </div>

        <div className="p-8">
          {/* First Row */}
          <div className="flex w-full justify-between space-x-6">
            {itemData.slice(0, 4).map((item) => (
              <div
                key={item.id}
                // ref={(el) => (buttonRefs.current[item.id] = el)}
                className={`relative ${item.bgGradient} ${item.width} ${item.marginRight} ${item.marginTop} ${item.height} -skew-x-12 flex justify-center items-end `}
              >
                {/* Plus Sign */}
                <div
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent the click event from propagating to the parent div
                    handleClick(item.id); // Toggle the text
                  }}
                  className="skew-x-6 absolute z-10 p-1 animate-ping-border rounded-full bottom-4 left-6 flex items-center justify-center"
                >
                  <button className="text-white bg-black rounded-full pb-1 size-8 text-xl font-bold transform-none flex items-center justify-center">
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
                {showText[item.id] && (
                  <div
                    ref={(el) => (textRefs.current[item.id] = el)}
                    className="absolute bottom-3.5 left-1/2 transform -translate-x-1/2 -translate-y-0 skew-x-12 z-50 w-36 md:w-48 bg-gray-100 p-3 rounded"
                  >
                    <div className="flex justify-between">
                      <p className="text-gray-600">Azmain Kids Mart</p>
                      <div className="bg-gray-300 rounded-full size-6 flex justify-center items-center">
                        <i
                          className="fas fa-close cursor-pointer"
                          onClick={() => handleClose(item.id)}
                        ></i>
                      </div>
                    </div>
                    <p className="font-semibold text-gray-800 text-lg">{item.title}</p>
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
                    <p className="font-semibold text-lg text-gray-800">
                      ৳ {item.price}
                    </p>
                    <Link to={`/singleproduct/${item.title}-${item.id}`}>
                      <button className="bg-orange-600 mt-2 hover:bg-orange-500 p-2 text-white rounded text-sm">
                       View Details
                      </button>
                    </Link>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Second Row */}
          <div className="flex w-full justify-between mt-6 space-x-2 md:space-x-6">
            {itemData.slice(4, 8).map((item) => (
              <div
                key={item.id}
                // ref={(el) => (buttonRefs.current[item.id] = el)}
                className={`relative ${item.bgGradient} ${item.width} ${item.marginRight} ${item.marginTop} ${item.height} -skew-x-12 flex justify-center items-end `}
              >
                {/* Plus Sign */}
                <div
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent the click event from propagating to the parent div
                    handleClick(item.id); // Toggle the text
                  }}
                  className="skew-x-6 absolute z-10 p-[2px] md:p-1 animate-ping-border rounded-full bottom-4 left-6  flex items-center justify-center"
                >
                  <button className="text-white text-sm bg-black rounded-full pb-1 size-4 md:size-8 md:text-xl font-bold transform-none flex items-center justify-center">
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
                {showText[item.id] && (
                  <div
                    ref={(el) => (textRefs.current[item.id] = el)}
                    className="absolute  bottom-3.5 left-1/2  transform -translate-x-1/2 -translate-y-0 skew-x-12 z-50 w-48 bg-gray-100 p-3 rounded"
                  >
                    <div className="flex justify-between">
                      <p className="text-gray-600">Azmain Kids Mart</p>
                      <div className="bg-gray-300 rounded-full size-6 flex justify-center items-center">
                        <i
                          className="fas fa-close cursor-pointer"
                          onClick={() => handleClose(item.id)}
                        ></i>
                      </div>
                    </div>
                    <p className="font-semibold text-gray-800 text-lg">{item.title}</p>
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
                    <p className="font-semibold text-gray-800 text-lg">{item.price}</p>
                    <Link to={`/singleproduct/${item.title}-${item.id}`}>
                      <button className="bg-orange-600 mt-2 hover:bg-orange-500 p-2 text-white rounded text-sm">
                       View Details
                      </button>
                    </Link>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="block md:hidden">
        <Section1Slider products={products} />
      </div>
    </div>
  );
};

export default Section1;
