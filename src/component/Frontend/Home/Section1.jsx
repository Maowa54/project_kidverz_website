import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
const Section1 = () => {
  // State to track which content should be shown
  const [showText, setShowText] = useState({});
  const textRefs = useRef({}); // To keep track of multiple text divs
  const buttonRefs = useRef({}); // To keep track of multiple button divs

  const handleClick = (id) => {
    setShowText((prev) => ({
      ...prev,
      [id]: !prev[id], // Toggle visibility for the clicked product
    }));
  };

  // const handleClose = (id) => {
  //   setShowText((prev) => ({
  //     ...prev,
  //     [id]: false, // Hide the text for the specified product
  //   }));
  // };

  useEffect(() => {
    // Close when clicking outside of any text div
    const handleClickOutside = (event) => {
      const clickedOutside = Object.keys(textRefs.current).every(
        (key) =>
          textRefs.current[key] &&
          !textRefs.current[key].contains(event.target) &&
          (!buttonRefs.current[key] ||
            !buttonRefs.current[key].contains(event.target))
      );

      if (clickedOutside) {
        setShowText({}); // Close all text boxes if clicked outside
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const productData = [
    {
      id: "1",
      bgGradient: "bg-gradient-to-l from-yellow-300 to-[rgb(255,213,63)]",
      width: "w-[50%] md:w-[20%]",
      height: "h-[80px] md:h-[250px]",
      imageSrc: "/assets/248-2485262_kids-girl-kids-wear-png.png",
      imageWidth: "w-[30px] md:w-[100px]",
      textPosition: "absolute top-20 left-20",
      title: "Pink Dress",
      price: "$22",
      marginTop: "mt-[40px] md:mt-[100px]",
    },
    {
      id: "2",
      bgGradient: "bg-gradient-to-b from-[#c1ecb5] to-[#aef19b]",
      width: "w-[70%] md:w-[30%]",
      height: "h-[120px] md:h-[350px]",
      imageSrc:
        "/assets/WhatsApp_Image_2024-12-10_at_2.10.09_PM-removebg-preview.png",
      imageWidth: "w-[220px]",
      textPosition: "absolute top-20 left-48",
      title: "Shirt",
      price: "$10",
    },
    {
      id: "3",
      bgGradient: "bg-gradient-to-b from-[#eeafde] to-[#f599f5]",
      width: "w-[70%] md:w-[30%]",
      height: "h-[120px] md:h-[350px]",
      imageSrc:
        "/assets/WhatsApp_Image_2024-12-10_at_2.10.08_PM-removebg-preview.png",
      imageWidth: " h-[120px] md:h-[360px]",
      textPosition: "absolute top-20 -right-14",
      title: "Suit",
      price: "$30",
    },
    {
      id: "4",
      bgGradient: "bg-gradient-to-b from-[#fffd6f] to-[#f3ff50]",
      width: "w-[50%] md:w-[20%]",
      height: "h-[80px] md:h-[250px]",
      imageSrc:
        "/assets/png-transparent-girl-cute-little-girl-child-fashion-girl-hat-thumbnail-removebg-preview.png",
      imageWidth: "w-[80px] md:w-[160px]",
      textPosition: "absolute top-20 -right-16",
      title: "Yellow Dress",
      price: "$22",
      marginTop: "mt-[40px] md:mt-[100px]",
    },
    {
      id: "5",
      bgGradient: "bg-gradient-to-r from-sky-200 to-sky-300",
      width: "w-[50%] md:w-[20%]",
      height: "h-[80px] md:h-[250px]",
      imageSrc:
        "/assets/pngtree-a-baby-girl-in-beautiful-pink-dress-with-face-png-image_11674562-removebg-preview.png",
      imageWidth: "w-[180px]",
      textPosition:
        "absolute -bottom-4 left-20 z-20 w-52 bg-gray-50 p-3 rounded",
      title: "Baby Dress",
      price: "$15",
    },
    {
      id: "6",
      bgGradient: "bg-pink-300",
      width: "w-[70%] md:w-[30%]",
      height: "h-[120px] md:h-[350px]",
      imageSrc:
        "/assets/WhatsApp_Image_2024-12-10_at_2.10.09_PM__2_-removebg-preview.png",
      imageWidth: " h-[120px] md:h-[360px]",
      textPosition:
        "absolute bottom-20 left-56 z-50 w-52 bg-gray-50 p-3 rounded",
      title: "Punjabi",
      price: "$10",
    },
    {
      id: "7",
      bgGradient: "bg-gradient-to-r from-[#aaccec] to-[#85b0d8]",
      width: "w-[70%] md:w-[30%]",
      height: "h-[120px] md:h-[350px]",
      imageSrc:
        "/assets/WhatsApp_Image_2024-12-10_at_2.10.09_PM__1_-removebg-preview.png",
      imageWidth: "h-[120px] md:h-[360px]",
      textPosition:
        "absolute bottom-20 -right-14 z-50 w-52 bg-gray-50 p-3 rounded",
      title: "Punjabi",
      price: "$10",
    },
    {
      id: "8",
      bgGradient: "bg-gradient-to-r from-[#ffabae] to-[#fa737a]",
      width: "w-[50%] md:w-[20%]",
      height: "h-[80px] md:h-[250px]",
      imageSrc:
        "/assets/pngtree-little-suits-traditional-tuxedo-dresses-for-baby-boys-png-image_13305026-removebg-preview.png",
      imageWidth: "h-[80px] md:h-[280px]",
      textPosition: "absolute -bottom-4 -right-14 w-52 bg-gray-50 p-3 rounded",
      title: "Black Suit",
      price: "$20",
    },
  ];

  return (
    <div>
      <div className="container mx-auto my-2 md:my-6 md:py-4 relative">
        <div className="absolute top-6 left-28 hidden md:block">
          <img
            src="/assets/cute-baby-cartoon-sleeping-moon-illustration-39807185.png"
            alt=""
            className="w-24 slow-bounce"
          />
        </div>

        <div className="absolute top-8 right-10 hidden md:block">
          <img
            src="/public/assets/cartoon-baby-star-vector-illustration_444196-1129.png"
            alt=""
            className="w-28 slow-bounce"
          />
        </div>

        <div className="absolute bottom-0 right-10 hidden md:block">
          <img
            src="/assets/cute-flower-cartoon-vector-illustration2_877459-322.png"
            alt=""
            className="w-20 ping-animation"
          />
        </div>

        <div className="p-8">
          {/* First Row */}
          <div className="flex w-full justify-between space-x-2 md:space-x-6">
            {productData.slice(0, 4).map((product) => (
              <div
                key={product.id}
                ref={(el) => (buttonRefs.current[product.id] = el)}
                className={`relative ${product.bgGradient} ${product.width} ${product.marginRight} ${product.marginTop} ${product.height} -skew-x-12 flex justify-center items-end `}
              >
                {/* Plus Sign */}
                <div
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent the click event from propagating to the parent div
                    handleClick(product.id); // Toggle the text
                  }}
                  className="skew-x-6 absolute z-20 p-[2px] md:p-1 animate-ping-border rounded-full top-2 md:top-8 right-0 md:right-6 flex items-center justify-center"
                >
                  <button className="text-white text-sm bg-black rounded-full pb-1 size-4 md:size-8 md:text-xl font-bold transform-none flex items-center justify-center">
                    +
                  </button>
                </div>

                {/* Image */}
                <img
                  src={product.imageSrc}
                  alt=""
                  className={`${product.imageWidth} object-cover skew-x-12`}
                />

                {/* Display Text */}
                {showText[product.id] && (
                  <div
                    ref={(el) => (textRefs.current[product.id] = el)}
                    className={`${product.textPosition} skew-x-12 z-50 w-52 bg-gray-50 p-3 rounded`}
                  >
                    <div className="flex justify-between">
                      <p className="text-gray-600 md:text-lg">kidverz</p>
                      <div className="bg-gray-300 rounded-full size-4 md:size-8 flex justify-center items-center">
                        <i
                          className="fas fa-close cursor-pointer"
                          onClick={() => handleClose(product.id)}
                        ></i>
                      </div>
                    </div>
                    <p className="font-semibold text-lg md:text-xl text-gray-800">
                      {product.title}
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
                    <p className="font-semibold text-lg md:text-xl text-gray-800">
                      {product.price}
                    </p>
                    <Link>
                      <button className="bg-orange-600 mt-2 hover:bg-orange-500 p-2 text-white rounded text-sm">
                        Select Options
                      </button>
                    </Link>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Second Row */}
          <div className="flex w-full justify-between mt-6 space-x-2 md:space-x-6">
            {productData.slice(4).map((product) => (
              <div
                key={product.id}
                ref={(el) => (buttonRefs.current[product.id] = el)}
                className={`relative ${product.bgGradient} ${product.width} ${product.marginRight} ${product.marginTop} ${product.height} -skew-x-12 flex justify-center items-end overflow-hidden`}
              >
                {/* Plus Sign */}
                <div
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent the click event from propagating to the parent div
                    handleClick(product.id); // Toggle the text
                  }}
                  className="skew-x-6 absolute z-20 p-[2px] md:p-1 animate-ping-border rounded-full top-2 md:top-8 right-0 md:right-6 flex items-center justify-center"
                >
                  <button className="text-white bg-black rounded-full pb-1 size-4 md:size-8 text-sm md:text-xl font-bold transform-none flex items-center justify-center">
                    +
                  </button>
                </div>

                {/* Image */}
                <img
                  src={product.imageSrc}
                  alt=""
                  className={`${product.imageWidth} object-cover skew-x-12`}
                />

                {/* Display Text */}
                {showText[product.id] && (
                  <div
                    ref={(el) => (textRefs.current[product.id] = el)}
                    className={`${product.textPosition} skew-x-12 z-50 w-52 bg-gray-50 p-3 rounded`}
                  >
                    <div className="flex justify-between">
                      <p className="text-gray-600 md:text-lg">kidverz</p>
                      <div className="bg-gray-300 rounded-full size-8 flex justify-center items-center">
                        <i
                          className="fas fa-close cursor-pointer"
                          onClick={() => handleClose(product.id)}
                        ></i>
                      </div>
                    </div>
                    <p className="font-semibold text-lg md:text-xl text-gray-800">
                      {product.title}
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
                    <p className="font-semibold text-lg md:text-xl text-gray-800">
                      {product.price}
                    </p>
                    <Link>
                      <button className="bg-orange-600 mt-2 hover:bg-orange-500 p-2 text-white rounded text-sm">
                        Select Options
                      </button>
                    </Link>
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

export default Section1;
