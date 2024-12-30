import { Link } from "react-router-dom";

const Section2 = ({ products = [] }) => {
  return (
    <div className="mt-4 md:mt-20 md:py-6 grid grid-cols-1 md:grid-cols-2 gap-2">
      <div className="w-[200px] h-60 md:w-[300px] lg:w-[450px] md:h-full bg-[#40C2CA] flex justify-end items-center">
        <div className="-skew-x-12 -mr-16 md:-mr-24 lg:-mr-36">
          <img
            src="/assets/kids2.png"
            alt=""
            className="w-[180px] md:w-[350px] lg:w-[400px] bg-pink-300"
          />
        </div>
      </div>

      <div className="md:px-6 px-0 mt-4 md:mt-0">
        <div className="px-2 md:px-6">
          <p className="text-3xl font-galada text-gray-800 md:text-5xl font-bold">
            ফ্যাশন সবার জন্য{" "}
          </p>
          <p className="mt-1 md:mt-4 font-galada md:text-lg text-gray-500">
            আজমাইন কিডস মার্টে আপনাকে স্বাগত! এখানে প্রত্যেক বয়সের জন্য রয়েছে
            ফ্যাশনের ভিন্ন মাত্রা। আমাদের সংগ্রহে রয়েছে আরামের সাথে আধুনিক
            স্টাইলের চমৎকার মিশ্রণ, যা আপনার ছোট্ট সোনামণিদের দেবে সেরা অনুভূতি
            এবং স্টাইলিশ লুক।
          </p>
        </div>

        {/* Desktop Cards */}
        <div className="hidden md:block mt-6 space-y-2 md:pr-6 lg:pr-20 -skew-x-12">
          <Link
            to="/allproduct/0-6"
            className="flex group gap-2 animated-border shadow-lg p-2 mt-6"
          >
            <img src="/assets/blazer.png" alt="" className="w-16 md:w-[90px]" />
            <div className="ml-2 md:ml-4 skew-x-12">
              <p className="text-gray-800 font-semibold text-base md:text-2xl">
                0-6 Years
              </p>
              <p className="text-gray-500 text-sm md:text-base">
                Fun and comfy styles for the little ones!
              </p>
            </div>
            <div className="skew-x-12 hidden group-hover:flex flex-col justify-center items-center">
              <button className="text-pink-700">Explore</button>
              <svg
                width="24"
                height="24"
                xmlns="http://www.w3.org/2000/svg"
                className="fill-pink-700"
              >
                <path d="M21.883 12l-7.527 6.235.644.765 9-7.521-9-7.479-.645.764 7.529 6.236h-21.884v1h21.883z" />
              </svg>
            </div>
          </Link>

          <Link
            to="/allproduct/6-12"
            className="flex group gap-2 animated-border shadow-lg p-2 mt-6"
          >
            <img src="/assets/coat.png" alt="" className="w-16 md:w-[90px]" />
            <div className="ml-2 md:ml-4 skew-x-12">
              <p className="text-gray-800 font-semibold text-base md:text-2xl">
                6-12 Years Old
              </p>
              <p className="text-gray-500 text-sm md:text-base">
                Stylish and comfy, made for young explorers!
              </p>
            </div>

            <div className="skew-x-12 hidden group-hover:flex flex-col justify-center items-center">
              <button className="text-pink-700">Explore</button>
              <svg
                width="24"
                height="24"
                xmlns="http://www.w3.org/2000/svg"
                className="fill-pink-700"
              >
                <path d="M21.883 12l-7.527 6.235.644.765 9-7.521-9-7.479-.645.764 7.529 6.236h-21.884v1h21.883z" />
              </svg>
            </div>
          </Link>

          <Link
            to="/allproduct/13-18"
            className="flex group gap-2 animated-border shadow-lg p-2 mt-6"
          >
            <img
              src="/assets/Punjabi.png"
              alt=""
              className="w-16 md:w-[90px]"
            />
            <div className="ml-2 md:ml-4 skew-x-12">
              <p className="text-gray-800 font-semibold text-base md:text-2xl">
                13-18 Years
              </p>
              <p className="text-gray-500 text-sm md:text-base">
                Bold styles for the adventurous spirit!
              </p>
            </div>
            <div className="skew-x-12 hidden group-hover:flex flex-col justify-center items-center">
              <button className="text-pink-700">Explore</button>
              <svg
                width="24"
                height="24"
                xmlns="http://www.w3.org/2000/svg"
                className="fill-pink-700"
              >
                <path d="M21.883 12l-7.527 6.235.644.765 9-7.521-9-7.479-.645.764 7.529 6.236h-21.884v1h21.883z" />
              </svg>
            </div>
          </Link>
        </div>

        {/* Mobile Cards */}
        <div className="block md:hidden p-4">
          <Link to="/allproduct/0-6">
            <div className="mt-2 -skew-x-12">
              <div className="flex group gap-2 animated-border shadow-lg p-2 mt-6">
                <img
                  src="/assets/blazer.png"
                  alt=""
                  className="w-16 md:w-[100px]"
                />
                <div className="ml-2 md:ml-4 skew-x-12">
                  <p className="text-gray-800 font-semibold text-base md:text-2xl">
                    0-6 Years
                  </p>
                  <p className="text-gray-500 text-sm md:text-base">
                    Fun and comfy styles for the little ones!
                  </p>
                </div>
              </div>
            </div>
          </Link>
          <Link to="/allproduct/0-6">
            <div className="mt-2 -skew-x-12">
              <div className="flex group gap-2 animated-border shadow-lg p-2 mt-6">
                <img
                  src="/assets/coat.png"
                  alt=""
                  className="w-16 md:w-[100px]"
                />
                <div className="ml-2 md:ml-4 skew-x-12">
                  <p className="text-gray-800 font-semibold text-base md:text-2xl">
                    6-12 Years Old
                  </p>
                  <p className="text-gray-500 text-sm md:text-base">
                    Stylish and comfy, made for young explorers!
                  </p>
                </div>
              </div>
            </div>
          </Link>

          <Link to="/allproduct/0-6">
            <div className="mt-2 -skew-x-12">
              <div className="flex group gap-2 animated-border shadow-lg p-2 mt-6">
                <img
                  src="/assets/Punjabi.png"
                  alt=""
                  className="w-16 md:w-[100px]"
                />
                <div className="ml-2 md:ml-4 skew-x-12">
                  <p className="text-gray-800 font-semibold text-base md:text-2xl">
                    13-18 Years
                  </p>
                  <p className="text-gray-500 text-sm md:text-base">
                    Bold styles for the adventurous spirit!
                  </p>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Section2;
