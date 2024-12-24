import { useEffect, useRef, useState, useContext } from "react";
import { CartContext } from "./CartContext";
import AddToCart from "./AddToCart";

const Carticon = () => {
   const { cartCount } = useContext(CartContext);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSubMenu, setActiveSubMenu] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false); // State for the cart

  const sidePanelRef = useRef(null);
  const cartRef = useRef(null);
  // Create a reference to the side panel

  // Toggle the main menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Toggle sub-menu items
  const toggleSubMenu = (menu) => {
    setActiveSubMenu(activeSubMenu === menu ? null : menu);
  };
  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
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
      if (cartRef.current && !cartRef.current.contains(event.target)) {
        setIsCartOpen(false);
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
    <div>
      {/* Cart Icon */}
      <button
        onClick={toggleCart}
        className="fixed top-1/2 right-4 transform -translate-y-1/2 w-12 h-12 md:w-10 md:h-10 flex text-white bg-rose-600 justify-center items-center rounded  shadow-lg transition duration-300 z-30"
      >
        <i className="fa fa-shopping-cart text-lg md:text-xl"></i>
        <span className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 bg-black text-white text-xs md:text-sm w-5 h-5 md:w-6 md:h-6 flex justify-center items-center rounded-full">
          {cartCount}
        </span>
      </button>

       {/* Cart Content */}
       <div ref={cartRef}>
        <AddToCart isCartOpen={isCartOpen} toggleCart={toggleCart} />
      </div>{" "}
    </div>
  );
};

export default Carticon;
