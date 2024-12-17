import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
const Section1 = () => {
  // State to track which content should be shown
  const [showText, setShowText] = useState({});
  const textRefs = useRef({}); // To keep track of multiple text divs
  const buttonRefs = useRef({}); // To keep track of multiple button divs

  const handleClick = (id) => {
    setShowText((prevState) => ({
      ...prevState,
      [id]: !prevState[id], // Toggle visibility based on the id
    }));
  };

  const handleClose = (id) => {
    setShowText((prevState) => ({
      ...prevState,
      [id]: false, // Close the text div based on the id
    }));
  };

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

  return (
    <div>
      <div className="container mx-auto my-6 py-4 relative">
        <div className="absolute top-6 left-20">
          <img src="/assets/cloud.png" alt="" className="w-52 slow-bounce" />
        </div>

        <div className="absolute top-10 right-10">
          <img src="/assets/stars.jpg" alt="" className="w-36 slow-bounce" />
        </div>

        <div className="absolute bottom-0 right-10">
          <img
            src="https://kidverz.myshopify.com/cdn/shop/files/banner-bubble-04.png?v=1697103125&width=170"
            alt=""
            className="w-36 ping-animation"
          />
        </div>

        {/* First row */}
        <div className="flex w-full justify-between p-8 space-x-6">
          {/* First Div */}
          <div className="mt-[100px] me-4 bg-gradient-to-l from-yellow-300 to-[rgb(255,213,63)] w-[20%] h-[250px] -skew-x-12 flex justify-center items-end  overflow-hidden relative">
            {/* Plus Sign */}
            <div className="skew-x-6 absolute  p-1 animate-ping-border  rounded-full  top-6 right-4 flex items-center justify-center">
              <div className="text-white bg-black rounded-full pb-1 size-8 text-xl font-bold transform-none flex items-center justify-center">
                +
              </div>
            </div>

            {/* Image */}
            <img
              src="/assets/248-2485262_kids-girl-kids-wear-png.png"
              alt=""
              className="w-[100px] object-contain skew-x-12"
            />
          </div>

          {/* Second Div */}
          <div className="relative bg-gradient-to-b from-[#c1ecb5] to-[#aef19b] w-[30%] h-[350px] -skew-x-12 flex justify-center items-center  overflow-hidden">
            <div
              ref={(el) => (buttonRefs.current["1"] = el)}
              onClick={() => handleClick("1")}
              className="skew-x-6 absolute  p-1 animate-ping-border  rounded-full  top-8 right-6 flex items-center justify-center"
            >
              <button className="relative text-white bg-black rounded-full pb-1 size-8 text-xl font-bold transform-none flex items-center justify-center">
                +
              </button>
            </div>

            <img
              src="/assets/WhatsApp_Image_2024-12-10_at_2.10.09_PM-removebg-preview.png"
              alt=""
              className="w-[220px] object-contain skew-x-12"
            />
          </div>
          {/* Display Text for Second Div */}
          {showText["1"] && (
            <div
              ref={(el) => (textRefs.current["1"] = el)}
              className="absolute top-32 left-[500px] z-30 w-52 bg-gray-50 p-3 rounded"
            >
              <div className="flex justify-between">
                <p className="text-gray-600 md:text-lg">kidverz</p>
                <div className="bg-gray-300 rounded-full size-8  flex justify-center items-center">
                  <i
                    className="fas fa-close cursor-pointer "
                    onClick={() => handleClose("1")}
                  ></i>
                </div>
              </div>
              <p className="font-semibold text-lg md:text-xl text-gray-800">
                Shirt
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
                $10
              </p>
              <Link to="/singleproduct">
                <button className="bg-orange-600 mt-2 hover:bg-orange-500 p-2 text-white rounded text-sm">
                  Select Options
                </button>
              </Link>
            </div>
          )}

          {/* Third Div */}
          <div className="relative bg-gradient-to-b from-[#eeafde] to-[#f599f5] w-[30%] h-[350px] -skew-x-12 flex justify-center items-center  overflow-hidden">
            <div
              ref={(el) => (buttonRefs.current["2"] = el)}
              onClick={() => handleClick("2")}
              className="skew-x-6 absolute  p-1 animate-ping-border  rounded-full  top-16 right-6 flex items-center justify-center"
            >
              <button className="text-white bg-black rounded-full pb-1 size-8 text-xl font-bold transform-none flex items-center justify-center">
                +
              </button>
            </div>
            <img
              src="/assets/WhatsApp_Image_2024-12-10_at_2.10.08_PM-removebg-preview.png"
              alt=""
              className="w-[500px] object-contain skew-x-12"
            />
          </div>
          {/* Display Text for Second Div */}
          {showText["2"] && (
            <div
              ref={(el) => (textRefs.current["2"] = el)}
              className="absolute top-40 right-48 z-30 w-52 bg-gray-50 p-3 rounded"
            >
              <div className="flex justify-between">
                <p className="text-gray-600 md:text-lg">kidverz</p>
                <div className="bg-gray-300 rounded-full size-8  flex justify-center items-center">
                  <i
                    className="fas fa-close cursor-pointer "
                    onClick={() => handleClose("2")}
                  ></i>
                </div>
              </div>
              <p className="font-semibold text-lg md:text-xl text-gray-800">
                Suit
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
                $30
              </p>
              <Link to="/singleproduct">
                <button className="bg-orange-600 mt-2 hover:bg-orange-500 p-2 text-white rounded text-sm">
                  Select Options
                </button>
              </Link>
            </div>
          )}

          {/* Last Div */}
          <div className="relative mt-[100px] bg-gradient-to-b from-[#fffd6f] to-[#f3ff50] w-[20%] h-[250px] -skew-x-12 flex justify-center items-end overflow-hidden">
            <div className="skew-x-6 absolute  p-1 animate-ping-border  rounded-full  top-8 right-2 flex items-center justify-center">
              <div className="text-white bg-black rounded-full pb-1 size-8 text-xl font-bold transform-none flex items-center justify-center">
                +
              </div>
            </div>
            <img
              src="/assets/png-transparent-girl-cute-little-girl-child-fashion-girl-hat-thumbnail-removebg-preview.png"
              alt=""
              className="w-[180px] object-contain"
            />
          </div>
        </div>

        {/* second row */}
        <div className="flex w-full justify-between px-8 space-x-6">
          {/* First Div */}
          <div className="relative bg-gradient-to-r from-sky-200 to-sky-300 w-[20%] h-[250px] -skew-x-12 flex justify-center items-end  overflow-hidden">
            <div className="skew-x-6 absolute  p-1 animate-ping-border  rounded-full  top-8 right-4 flex items-center justify-center">
              <div className="text-white bg-black rounded-full pb-1 size-8 text-xl font-bold transform-none flex items-center justify-center">
                +
              </div>
            </div>
            <img
              src="/assets/WhatsApp_Image_2024-12-10_at_2.10.09_PM__1_-removebg-preview.png"
              alt=""
              className="w-[200px] object-contain skew-x-12"
            />
          </div>

          {/* Second Div */}
          <div className="relative bg-pink-300 w-[30%] h-[350px] -skew-x-12 flex justify-center items-center  overflow-hidden">
            <div className="skew-x-6 absolute  p-1 animate-ping-border  rounded-full  top-16 right-6 flex items-center justify-center">
              <div className="text-white bg-black rounded-full pb-1 size-8 text-xl font-bold transform-none flex items-center justify-center">
                +
              </div>
            </div>

            <img
              src="/assets/WhatsApp_Image_2024-12-10_at_2.10.09_PM__2_-removebg-preview.png"
              alt=""
              className="w-[300px] object-contain skew-x-12"
            />
          </div>

          {/* Third Div */}
          <div className="relative bg-gradient-to-r  from-[#aaccec] to-[#85b0d8] w-[30%] h-[350px] -skew-x-12 flex justify-center items-center  overflow-hidden">
            <div className="skew-x-6 absolute  p-1 animate-ping-border  rounded-full  top-16 right-6 flex items-center justify-center">
              <div className="text-white bg-black rounded-full pb-1 size-8 text-xl font-bold transform-none flex items-center justify-center">
                +
              </div>
            </div>
            <img
              src="/assets/pngtree-a-baby-girl-in-beautiful-pink-dress-with-face-png-image_11674562-removebg-preview.png"
              alt=""
              className="w-[270px] object-contain skew-x-12"
            />
          </div>

          {/* Last Div */}
          <div className="relative bg-gradient-to-r from-[#ffabae]  to-[#fa737a] w-[20%] h-[250px] -skew-x-12 flex justify-center items-end  overflow-hidden">
            <div className="skew-x-6 absolute  p-1 animate-ping-border  rounded-full  top-8 right-4 flex items-center justify-center">
              <div className="text-white bg-black rounded-full pb-1 size-8 text-xl font-bold transform-none flex items-center justify-center">
                +
              </div>
            </div>
            <img
              src="/assets/pngtree-little-suits-traditional-tuxedo-dresses-for-baby-boys-png-image_13305026-removebg-preview.png"
              alt=""
              className="w-[300px] object-contain skew-x-12"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Section1;
