import { useState, useEffect } from "react"; // for React state if using React
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";
import { Link } from "react-router-dom";

const Footer = () => {
  const [isCategoriesOpen, setCategoriesOpen] = useState(false);
  const [isCustomerServiceOpen, setCustomerServiceOpen] = useState(false);
  const [isFollowUsOpen, setFollowUsOpen] = useState(false);

  useEffect(() => {
    AOS.init({
      once: false, // Ensures animations trigger every time the element comes into view
    });
  }, []);

  return (
    <div>
      <div className="bg-[#FDEAE1] mt-8 p-8 ">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
          {/* Logo and Social Links */}
          <div className="flex flex-col">
            <Link to="/">
              {" "}
              <img
                src="/assets/Logo2.png"
                alt="Logo"
                className="w-20 md:w-28"
              />
            </Link>
            <p className="text-gray-600 mt-1 mr-6">
              Dress your little ones in the most fashionable clothes for every
              occasion in our kids' clothing collection.
            </p>
            <div className="-ml-2 flex gap-2 mt-3">
              <div className="group border-2 border-[#41C2CB] border-opacity-0 p-1 rounded-full transition-opacity duration-300 ease-in-out hover:border-opacity-100">
                <a
                  href="https://www.facebook.com/azmainkidsmart/"
                  target="_blank"
                  aria-label="Facebook"
                  className="flex items-center justify-center size-8 md:size-9 rounded-full bg-[#EB1E39] text-white group-hover:bg-[#41C2CB] transition duration-300 ease-in-out"
                >
                  <FaFacebookF />
                </a>
              </div>

              <div className="group border-2 border-[#41C2CB] border-opacity-0 p-1 rounded-full transition-opacity duration-300 ease-in-out hover:border-opacity-100">
                <a
                  href="https://www.instagram.com/azmainkidsmart/p/DEFoiVGyiNh/"
                  target="_blank"
                  aria-label="Instagram"
                  className="flex items-center justify-center size-8 md:size-9 rounded-full bg-[#EB1E39] text-white group-hover:bg-[#41C2CB] transition duration-300 ease-in-out"
                >
                  <FaInstagram />
                </a>
              </div>
            </div>

            <hr className="mt-4 md:mt-0 md:border-none border-black" />
          </div>

          {/* Categories */}
          <div className="text-gray-600">
            <div className="flex justify-between items-center">
              <h1 className="text-gray-800 text-xl font-semibold">
                Categories
              </h1>
              <button
                onClick={() => setCategoriesOpen(!isCategoriesOpen)}
                className="text-[#F65E17] text-2xl sm:block md:hidden"
              >
                {isCategoriesOpen ? "-" : "+"}
              </button>
            </div>
            <div
              className={`${
                isCategoriesOpen ? "block" : "hidden"
              } sm:block md:block`}
            >
              <ul className="mt-4 space-y-3">
                {[
                  "Boys Clothing",
                  "Girls Clothing",
                  "Baby Wear",
                  "New Arrivals",
                  "Sale",
                ].map((category, idx) => (
                  <li key={idx} className="relative group cursor-pointer">
                    <span className="relative inline-block hover:text-[#F65E17]">
                      {category}
                      <span className="absolute left-0 bottom-0 w-0 h-[1px] bg-[#F65E17] group-hover:w-full transition-all duration-300 ease-in-out"></span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <hr className="mt-4 md:mt-0 md:border-none border-black" />
          </div>

          {/* Customer Service */}
          <div className="text-gray-600">
            <div className="flex justify-between items-center">
              <h1 className="text-gray-800 text-xl font-semibold">
                Customer Service
              </h1>
              <button
                onClick={() => setCustomerServiceOpen(!isCustomerServiceOpen)}
                className="text-[#F65E17] text-2xl sm:block md:hidden"
              >
                {isCustomerServiceOpen ? "-" : "+"}
              </button>
            </div>
            <div
              className={`${
                isCustomerServiceOpen ? "block" : "hidden"
              } sm:block md:block`}
            >
              <ul className="mt-4 space-y-3">
                {[
                  "Track Order",
                  "Shipping & Delivery",
                  "Returns & Exchanges",
                  "FAQs",
                  "Contact Us",
                ].map((service, idx) => (
                  <li key={idx} className="relative group cursor-pointer">
                    <span className="relative inline-block hover:text-[#F65E17]">
                      {service}
                      <span className="absolute left-0 bottom-0 w-0 h-[1px] bg-[#F65E17] group-hover:w-full transition-all duration-300 ease-in-out"></span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <hr className="mt-4 md:mt-0 md:border-none border-black" />
          </div>

          {/* Follow Us */}
          <div className="text-gray-600">
            <div className="flex justify-between items-center">
              <h1 className="text-gray-800 text-xl font-semibold">Follow Us</h1>
              <button
                onClick={() => setFollowUsOpen(!isFollowUsOpen)}
                className="text-[#F65E17] text-2xl sm:block md:hidden"
              >
                {isFollowUsOpen ? "-" : "+"}
              </button>
            </div>
            <div
              className={`${
                isFollowUsOpen ? "block" : "hidden"
              } sm:block md:block`}
            >
<ul className="mt-4 space-y-3">
  <li className="relative group cursor-pointer">
    <a
      href="https://www.facebook.com/azmainkidsmart/"
      target="_blank"
      className="relative inline-block hover:text-[#F65E17]"
    >
      Facebook
      <span className="absolute left-0 bottom-0 w-0 h-[1px] bg-[#F65E17] group-hover:w-full transition-all duration-300 ease-in-out"></span>
    </a>
  </li>
  
  <li className="relative group cursor-pointer">
    <a
      href="https://www.instagram.com/azmainkidsmart/p/DEFoiVGyiNh/"
      target="_blank"
      className="relative inline-block hover:text-[#F65E17]"
    >
      Instagram
      <span className="absolute left-0 bottom-0 w-0 h-[1px] bg-[#F65E17] group-hover:w-full transition-all duration-300 ease-in-out"></span>
    </a>
  </li>
</ul>


            </div>
          </div>
        </div>

        {/* Copyright & Logos */}
        <div className="hidden md:flex justify-between mt-6">
          <div data-aos="fade-right">
            <img
              src="/assets/footer-3.png"
              alt="Copyright"
              className="w-32 mt-4"
            />
          </div>
          <div data-aos="fade-up">
            <img src="/assets/footer-2.png" className="w-48" alt="Copyright" />
          </div>
          <div data-aos="fade-left">
            <img src="/assets/footer-1.png" alt="Copyright" className="w-48" />
          </div>
        </div>
      </div>

      <div className="bg-[#FDEAE1] md:px-8 pb-8">
        <div className="responsive-box p-4 md:p-8 flex flex-col md:flex-row justify-center md:justify-between mt-2 md:mt-0 md:items-center bg-gray-800">
          {/* Left Section: Footer Text */}
          <p className="text-white text-sm md:text-base ">
            © {new Date().getFullYear()}, Azmain Kids Mart - Baby Clothing
            Store. Powered by{" "}
            <a
              href="https://ezicalc.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="ml-1 font-bold tracking-wide font-pollinator text-xl text-[#498bdd]">
                ezi <span className="-ml-2  text-[#3a4783]">calc</span>
              </span>
            </a>
          </p>

          {/* Right Section: Payment Logos */}
          <div className="flex space-x-4">
            <p className="text-sm md:text-base text-white">
              Courier Partnership With
            </p>
            <a href="https://steadfast.com.bd/" target="_blank">
              {" "}
              <img src="/assets/logo.svg" alt="" className="w-28" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
