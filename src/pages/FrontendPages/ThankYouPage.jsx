import Footer from "../../component/Frontend/Footer";
import Navbar from "../../component/Frontend/Navbar";

const ThankYouPage = () => {
  return (
    <div>
      {/* Navbar */}
      <Navbar />

      <div className=" flex flex-col">
        {/* Content */}
        <div className="flex-grow flex flex-col items-center justify-center py-8 md:py-24 px-4 md:px-8">
          {/* Baby Icons */}
          <div className="flex justify-center space-x-4 mb-6">
            <i className="fas fa-baby-carriage text-sky-500 text-6xl animate-bounce"></i>
          </div>

          {/* Thank You Message */}
          <h1 className="text-3xl md:text-5xl font-semibold text-sky-500 mb-4 text-center">
            Thank You for Your Order!
          </h1>
          <p className="text-gray-700 mb-6 text-sm md:text-base text-center max-w-lg">
            Your order has been successfully placed. We are processing it and
            will send you a confirmation email soon.
          </p>

          {/* Buttons */}
          <div className="space-x-4 mb-6 flex flex-col sm:flex-row gap-2">
            <a
              href="/"
              className="inline-block px-6 py-3 text-white text-sm md:text-base hover:scale-105 bg-rose-500 font-semibold rounded-full hover:bg-rose-600 transition duration-300 text-center"
            >
              Continue Shopping
            </a>
            <a
              href="/checkout"
              className="inline-block px-8 py-2 md:py-3 text-sm md:text-base hover:scale-105 text-white bg-sky-500 font-semibold rounded-full hover:bg-sky-600 transition duration-300 text-center"
            >
              Go Back
            </a>
          </div>

          {/* Social Media Icons */}
          <div className="flex justify-center space-x-6 text-gray-600">
            <a
              href="https://www.facebook.com/azmainkidsmart/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xl md:text-2xl text-rose-500 hover:text-sky-500"
            >
              <i className="fab fa-facebook"></i>
            </a>
            <a
              href="https://www.instagram.com/azmainkidsmart/p/DEFoiVGyiNh/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xl md:text-2xl text-rose-500 hover:text-sky-500"
            >
              <i className="fab fa-instagram"></i>
            </a>
          </div>
        </div>

        {/* Footer */}
        <div className="hidden md:block">
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default ThankYouPage;
