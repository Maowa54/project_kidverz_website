import { useState, useEffect } from "react"; // for React state if using React
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
} from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";

const Footer = () => {
  const [isEducationalKitsOpen, setEducationalKitsOpen] = useState(false);
  const [isPaperNotebooksOpen, setPaperNotebooksOpen] = useState(false);
  const [isOrigamiToolsOpen, setOrigamiToolsOpen] = useState(false);

  useEffect(() => {
    AOS.init({
      once: false, // Ensures animations trigger every time the element comes into view
    });
  }, []);

  return (
    <div className="bg-[#FDEAE1] mt-8 p-8 md:p-16">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
        {/* Logo and Social Links */}
        <div className="flex flex-col ">
          <img src="/assets/logo.png" alt="Logo" className="w-52" />
          <p className="text-gray-600 mt-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <div className="-ml-2 flex gap-2 mt-3">
            {[FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn].map(
              (Icon, idx) => (
                <div
                  key={idx}
                  className="group border-2 border-[#41C2CB] border-opacity-0 p-1 rounded-full transition-opacity duration-300 ease-in-out hover:border-opacity-100"
                >
                  <a
                    href={`https://www.${Icon.name.toLowerCase()}.com`}
                    aria-label={Icon.name}
                    className="flex items-center justify-center size-8 md:size-9 rounded-full bg-[#F65E17] text-white group-hover:bg-[#41C2CB] transition duration-300 ease-in-out"
                  >
                    <Icon />
                  </a>
                </div>
              )
            )}
          </div>
          <hr className="mt-4 md:mt-0 md:border-none border-black" />
        </div>

        {/* Educational Kits */}
        <div className="text-gray-600 ">
          <div className="flex justify-between items-center">
            <h1 className="text-gray-800 text-xl  font-semibold">
              Educational Kits
            </h1>
            {/* Show the toggle only on small screens */}
            <button
              onClick={() => setEducationalKitsOpen(!isEducationalKitsOpen)}
              className="text-[#F65E17] text-2xl sm:block md:hidden"
            >
              {isEducationalKitsOpen ? "-" : "+"}
            </button>
          </div>
          {/* Only show list if it's open on small screens */}
          <div
            className={`${
              isEducationalKitsOpen ? "block" : "hidden"
            } sm:block md:block`}
          >
            <ul className="mt-4 space-y-3">
              {[
                "Electronics Kits",
                "Astronomy Kits",
                "Microscope Kits",
                "Math Puzzle Kits",
                "Robotics Kits",
              ].map((kit, idx) => (
                <li key={idx} className="relative group cursor-pointer">
                  <span className="relative inline-block hover:text-[#F65E17]">
                    {kit}
                    <span className="absolute left-0 bottom-0 w-0 h-[1px] bg-[#F65E17] group-hover:w-full transition-all duration-300 ease-in-out"></span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <hr className="mt-4 md:mt-0 md:border-none border-black" />
        </div>

        {/* Paper & Notebooks */}
        <div className="text-gray-600">
          <div className="flex justify-between items-center">
            <h1 className="text-gray-800 text-xl font-semibold">
              Paper & Notebooks
            </h1>
            {/* Show the toggle only on small screens */}
            <button
              onClick={() => setPaperNotebooksOpen(!isPaperNotebooksOpen)}
              className="text-[#F65E17] text-2xl sm:block md:hidden"
            >
              {isPaperNotebooksOpen ? "-" : "+"}
            </button>
          </div>
          {/* Only show list if it's open on small screens */}
          <div
            className={`${
              isPaperNotebooksOpen ? "block" : "hidden"
            } sm:block md:block`}
          >
            <ul className="mt-4 space-y-3">
              {[
                "Composition Notebooks",
                "Hardcover Sketchbooks",
                "Scrapbooking Paper Pads",
                "Hardcover Notebooks",
                "Parchment Paper",
              ].map((notebook, idx) => (
                <li key={idx} className="relative group cursor-pointer">
                  <span className="relative inline-block hover:text-[#F65E17]">
                    {notebook}
                    <span className="absolute left-0 bottom-0 w-0 h-[1px] bg-[#F65E17] group-hover:w-full transition-all duration-300 ease-in-out"></span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <hr className="mt-4 md:mt-0 md:border-none border-black" />
        </div>

        {/* Origami Tools */}
        <div className="text-gray-600">
          <div className="flex justify-between items-center">
            <h1 className="text-gray-800 text-xl font-semibold">
              Origami Tools
            </h1>
            {/* Show the toggle only on small screens */}
            <button
              onClick={() => setOrigamiToolsOpen(!isOrigamiToolsOpen)}
              className="text-[#F65E17] text-2xl sm:block md:hidden"
            >
              {isOrigamiToolsOpen ? "-" : "+"}
            </button>
          </div>
          {/* Only show list if it's open on small screens */}
          <div
            className={`${
              isOrigamiToolsOpen ? "block" : "hidden"
            } sm:block md:block`}
          >
            <ul className="mt-4 space-y-3">
              {["About Us", "Contact", "News", "Compare", "Wishlist"].map(
                (item, idx) => (
                  <li key={idx} className="relative group cursor-pointer">
                    <span className="relative inline-block hover:text-[#F65E17]">
                      {item}
                      <span className="absolute left-0 bottom-0 w-0 h-[1px] bg-[#F65E17] group-hover:w-full transition-all duration-300 ease-in-out"></span>
                    </span>
                  </li>
                )
              )}
            </ul>
          </div>
        </div>
      </div>
      <div className="hidden md:flex justify-between">
        <div data-aos="fade-right">
          <img
            src="https://kidverz.myshopify.com/cdn/shop/files/copyright-image-01.png?v=1697103126"
            alt=""
          />
        </div>
        <div data-aos="fade-up">
          <img
            src="https://kidverz.myshopify.com/cdn/shop/files/copyright-image-02.png?v=1697103126&width=420"
            alt=""
          />
        </div>
        <div data-aos="fade-left">
          <img
            src="https://kidverz.myshopify.com/cdn/shop/files/copyright-image-03.png?v=1697103126"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default Footer;
