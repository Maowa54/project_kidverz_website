import { useEffect, useRef, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { WishContext } from "./WishContext";
import Wishlist from "./WishList";

const Navbar = () => {
  const { wishCount } = useContext(WishContext);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSubMenu, setActiveSubMenu] = useState(null);
  const [isWishOpen, setisWishOpen] = useState(false); // State for the cart

  const sidePanelRef = useRef(null);
  const wishRef = useRef(null);
  // Create a reference to the side panel

  // Toggle the main menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Toggle sub-menu items
  const toggleSubMenu = (menu) => {
    setActiveSubMenu(activeSubMenu === menu ? null : menu);
  };
  const toggleWish = () => {
    setisWishOpen(!isWishOpen);
  };

  // Close the menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        sidePanelRef.current &&
        !sidePanelRef.current.contains(event.target)
      ) {
        setIsMenuOpen(false); // Close the side panel if clicked outside
      }
      if (wishRef.current && !wishRef.current.contains(event.target)) {
        setisWishOpen(false);
      }
    };

    // Add event listener for clicks outside
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup the event listener when the component is unmounted
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <div className={`lg:px-0 pt-4 px-2 container mx-auto  `}>
      <div className="box  lg px-6 py-4 lg:py-0 flex justify-between items-center text-gray-800">
        {/* Left: Logo */}
        <div className="flex justify-center items-center lg:space-x-4 ">
          <Link to="/">
            <div className="hidden lg:flex flex-col font-neucha items-center px-3 -space-y-3 text-white">
              {/* First Row */}
              <div className="text-xl font-semibold flex rotate-[3deg] tracking-widest ">
                <p>Azmain</p>
              </div>

              {/* Second Row */}
              <div className="text-5xl tracking-tight  font-sans font-bold flex ">
                {[
                  { letter: "K", rotation: -25 },
                  { letter: "i", rotation: 0 },
                  { letter: "D", rotation: 10 },
                  { letter: "S", rotation: 16 },
                ].map(({ letter, rotation }, index) => (
                  <span
                    key={index}
                    style={{
                      transform: `rotate(${rotation}deg)`,
                      display: "inline-block",
                    }}
                  >
                    {letter}
                  </span>
                ))}
              </div>

              {/* Third Row */}
              <div className="text-xl pt-1 font-semibold flex rotate-[4deg] tracking-widest ">
                <p>Mart</p>
              </div>
            </div>
          </Link>
          <div className="hidden lg:block w-[2px] h-16 "></div>
          {/* Hamburger Menu Icon */}
          <button onClick={toggleMenu} className="block lg:hidden text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
        <div className="  hidden lg:block w-[2px] h-16 bg-white"></div>

        {/* Center: Search Box and Navigation Items */}
        <div className="flex-1 hidden lg:flex flex-col py-3 px-8">
          {/* Search Box */}
          <div className="relative w-full my-2">
            <input
              type="text"
              placeholder="Search..."
              className="w-full p-2 pr-10 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-4.35-4.35m1.4-5.4a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>

          {/* Navigation Items */}
          <div className="flex mb-2 justify-center space-x-6">
            <Link
              to="/"
              className="text-white font-semibold tracking-wider hover:text-blue-500"
            >
              Home <span className="border-white border-r-2 ml-6"></span>
            </Link>
            <Link
              to="/shop"
              className="text-white   font-semibold tracking-wider hover:text-blue-500"
            >
              Shop <span className="border-white border-r-2 ml-6"></span>
            </Link>
            <Link
              to="/collection"
              className="text-white font-semibold tracking-wider hover:text-blue-500"
            >
              Collections
            </Link>
          </div>
        </div>

        <div className="lg:hidden block">
          {/* Logo centered in mobile view */}
          <Link to="/">
            <div className="flex flex-col font-neucha items-center md:px-3 -space-y-3 text-white">
              {/* First Row */}
              <div className=" md:text-xl font-semibold flex rotate-[3deg] tracking-widest ">
                <p>Azmain</p>
              </div>

              {/* Second Row */}
              <div className="text-3xl md:text-5xl tracking-tight  font-sans font-bold flex ">
                {[
                  { letter: "K", rotation: -25 },
                  { letter: "i", rotation: 0 },
                  { letter: "D", rotation: 10 },
                  { letter: "S", rotation: 16 },
                ].map(({ letter, rotation }, index) => (
                  <span
                    key={index}
                    style={{
                      transform: `rotate(${rotation}deg)`,
                      display: "inline-block",
                    }}
                  >
                    {letter}
                  </span>
                ))}
              </div>

              {/* Third Row */}
              <div className=" md:text-xl pt-1 font-semibold flex rotate-[4deg] tracking-widest ">
                <p>Mart</p>
              </div>
            </div>
          </Link>
        </div>

        {/* Right: Icons */}
        <div className="flex items-center gap-4">
          <div className="  hidden lg:block w-[2px] h-16 bg-white"></div>

          {/* Comparison Icon */}
          {/* <div className="hidden md:flex  relative w-8 h-8 md:w-10 md:h-10  bg-white  justify-center items-center rounded transition duration-300">
            <i className="fa fa-exchange-alt"></i>
            <span className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 bg-black text-white text-xs w-5 h-5 flex justify-center items-center rounded-full">
              3
            </span>
          </div> */}

          {/* Wishlist Icon */}
          <button
            onClick={toggleWish}
            className="relative w-8 h-8 md:w-10 md:h-10 flex bg-white  justify-center items-center rounded transition duration-300"
          >
            <i className="far fa-heart"></i>
            <span className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 bg-black text-white text-xs w-5 h-5 flex justify-center items-center rounded-full">
              {wishCount}
            </span>
          </button>

          {/* Search Icon for md */}
          <div className="hidden md:flex lg:hidden  relative w-8 h-8 md:w-10 md:h-10  bg-white justify-center items-center rounded transition duration-300">
            <i className="fas fa-search"></i>
          </div>
        </div>
      </div>
      {/* Side Panel */}
      <div
        ref={sidePanelRef}
        className={`fixed z-50 top-0 left-0 w-64 md:w-80 h-full bg-[#EB1E39] text-white transition-transform transform ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center p-4 border-b border-white">
          <Link to="/">
            <div className="flex flex-col font-neucha items-center md:px-3 -space-y-3 text-white">
              {/* First Row */}
              <div className=" md:text-xl font-semibold flex rotate-[3deg] tracking-widest ">
                <p>Azmain</p>
              </div>

              {/* Second Row */}
              <div className="text-3xl md:text-5xl tracking-tight  font-sans font-bold flex ">
                {[
                  { letter: "K", rotation: -25 },
                  { letter: "i", rotation: 0 },
                  { letter: "D", rotation: 10 },
                  { letter: "S", rotation: 16 },
                ].map(({ letter, rotation }, index) => (
                  <span
                    key={index}
                    style={{
                      transform: `rotate(${rotation}deg)`,
                      display: "inline-block",
                    }}
                  >
                    {letter}
                  </span>
                ))}
              </div>

              {/* Third Row */}
              <div className=" md:text-xl pt-1 font-semibold flex rotate-[4deg] tracking-widest ">
                <p>Mart</p>
              </div>
            </div>
          </Link>{" "}
          <button onClick={toggleMenu} className="text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="flex flex-col pb-3  text-lg md:text-2xl font-semibold space-y-4 px-2 py-4">
          <Link to="/" className="border-b px-2 pb-4">
            Home
          </Link>
          <Link to="/shop" className="border-b px-2 pb-4">
            Shop
          </Link>

          <Link to="/collection" className="border-b px-2 pb-4">
            Collections
          </Link>
        </div>
      </div>
      {/* Cart Content */}
      <div ref={wishRef}>
        <Wishlist isWishOpen={isWishOpen} toggleWish={toggleWish} />
      </div>{" "}
    </div>
  );
};

export default Navbar;
