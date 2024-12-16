import React from "react";

const Section5 = () => {
  return (
    <div className="px-6 md:px-12 mt-5 md:mt-10 py-3 md:py-6">
      <div className="grid grid-cols-1 md:grid-cols-2">
        <p className="text-3xl md:text-5xl font-semibold text-gray-800">
          Top Categories in Kids Fashion
        </p>

        <p className="md:text-lg text-gray-600 mt-2 md:mt-0">
          Let’s take a quick look at some of the most trending fashion styles
          when it comes to children’s fashion. These trends have been highly
          popular among kids in recent years. Check out each category for a
          clear idea.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-8 mt-2 md:mt-6">
        {/* Left Column */}
        <div className="p-4">
          {/* First Card */}
          <div className="md:mt-6 -skew-x-12">
            <div className="flex group gap-2 animated-border shadow-lg p-2 mt-6">
              <img src="/assets/images.jpg" alt="" className="w-16 md:w-24" />
              <div className="ml-2 md:ml-4   skew-x-12">
                <p className=" md:text-lg text-gray-800 font-semibold">
                  Winter Wear
                </p>
                <p className="text-gray-500 text-sm md:text-base">
                  Warm and stylish clothes perfect for the cold winter days.
                </p>
              </div>
            </div>
          </div>

          {/* Second Card */}
          <div className="mt-6 -skew-x-12">
            <div className="flex group gap-2 animated-border shadow-lg p-2 mt-6 ">
              <img
                src="/assets/ce6edf8be3281392142fb538d9b5219e2579c7f3_1024_1024.jpeg"
                alt=""
                className="w-16 md:w-24"
              />
              <div className="ml-2 md:ml-4   skew-x-12">
                <p className=" md:text-lg text-gray-800 font-semibold">
                  Summer Clothes
                </p>
                <p className="text-gray-500 text-sm md:text-base">
                  Comfortable clothes featuring breathable fabrics.
                </p>
              </div>
            </div>
          </div>

          {/* Third Card */}
          <div className="mt-6 -skew-x-12">
            <div className="flex group gap-2 animated-border shadow-lg p-2 mt-6 ">
            <img src="/assets/images.jpg" alt="" className="w-16 md:w-24" />
              <div className="ml-2 md:ml-4   skew-x-12">
                <p className="md:text-lg text-gray-800 font-semibold">
                  Footwear
                </p>
                <p className="text-gray-500 text-sm md:text-base">
                  Affordable shoes and sneakers made from high-quality material.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Middle Column (Center Image) */}
        <div className="hidden lg:flex justify-center items-center">
          <img src="/assets/cat-middle-bg.png" alt="" className="w-96" />
        </div>

        {/* Right Column */}
        <div className="p-4">
          {/* First Card */}
          <div className="lg:mt-6 -skew-x-12">
            <div className="flex group gap-2 animated-border shadow-lg p-2 mt-6">
              <img src="/assets/images.jpg" alt="" className="w-16 md:w-24" />
              <div className="ml-2 md:ml-4   skew-x-12">
                <p className=" md:text-lg text-gray-800 font-semibold">
                  Winter Wear
                </p>
                <p className="text-gray-500 text-sm md:text-base">
                  Warm and stylish clothes perfect for the cold winter days.
                </p>
              </div>
            </div>
          </div>

          {/* Second Card */}
          <div className="mt-6 -skew-x-12">
            <div className="flex group gap-2 animated-border shadow-lg p-2 mt-6 ">
              <img
                src="/assets/ce6edf8be3281392142fb538d9b5219e2579c7f3_1024_1024.jpeg"
                alt=""
                className="w-16 md:w-24"
              />
              <div className="ml-2 md:ml-4   skew-x-12">
                <p className=" md:text-lg text-gray-800 font-semibold">
                  Summer Clothes
                </p>
                <p className="text-gray-500 text-sm md:text-base">
                  Comfortable clothes featuring breathable fabrics.
                </p>
              </div>
            </div>
          </div>

          {/* Third Card */}
          <div className="mt-6 -skew-x-12">
            <div className="flex group gap-2 animated-border shadow-lg p-2 mt-6 ">
            <img src="/assets/images.jpg" alt="" className="w-16 md:w-24" />
              <div className="ml-2 md:ml-4   skew-x-12">
                <p className="md:text-lg text-gray-800 font-semibold">
                  Footwear
                </p>
                <p className="text-gray-500 text-sm md:text-base">
                  Affordable shoes and sneakers made from high-quality material.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Section5;
