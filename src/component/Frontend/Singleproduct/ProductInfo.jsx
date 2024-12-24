import React, { useState } from "react";

const ProductInfo = () => {
  const [activeSection, setActiveSection] = useState("description");

  const sections = {
    description: (
      <div className="my-4 grid grid-cols-12 px-4 md:px-2">
        <div className="col-span-12 md:col-span-4">
          <h1 className="text-xl md:text-3xl font-semibold text-gray-800 tracking-wide mb-2 hidden md:block">
            Product Description
          </h1>
        </div>
        <div className="col-span-12 md:text-lg md:col-span-8">
          Soft and comfortable set with brushed interior. Sweatshirt has large
          print on the front. Warm and comfortable sweatshirt and sweatpants
          that are perfect for active children. The pattern is hand-drawn by a
          children's book illustrator and printed with water-based dyes. This
          set includes a sweatshirt and a sweatpants as in the pictures. The
          soft trousers have an elasticated waist with a fixed tie cord (approx.
          13cm). 100% GOTS certified organic cotton Machine wash 30°C / 86°F /
          warm The Global Organic Textile Standard is a strict standard for
          processing textiles that requires the producer to respect rigid
          environmental and social criteria throughout the supply chain,
          including the use of chemicals.
        </div>
      </div>
    ),
    shipping: (
      <div className="my-4 grid grid-cols-12 px-4 md:px-0">
        <div className="col-span-12 md:col-span-4">
          <h1 className="text-xl md:text-3xl font-semibold text-gray-800 tracking-wide mb-2 hidden md:block">
            Shipping & Return
          </h1>
        </div>
        <div className="col-span-12 md:text-lg md:col-span-8">
          We offer worldwide shipping to ensure that our products reach
          customers wherever they are. Shipping costs and delivery times may
          vary depending on the destination and shipping method chosen during
          checkout. Orders are typically processed within 1-3 business days, and
          you will receive a confirmation email with tracking information once
          your order has been shipped. Please note that additional customs
          duties or taxes may apply for international orders.
        </div>
      </div>
    ),
    privacy: (
      <div className="my-4 grid grid-cols-12 px-4 md:px-0">
        <div className="col-span-12 md:col-span-4">
          <h1 className="text-xl md:text-3xl font-semibold text-gray-800 tracking-wide mb-2 hidden md:block">
            Privacy Policy
          </h1>
        </div>
        <div className="col-span-12 md:text-lg md:col-span-8">
          We offer worldwide shipping to ensure that our products reach
          customers wherever they are.Shipping costs and delivery times may vary
          depending on the destination and shipping method chosen during
          checkout.Orders are typically processed within 1-3 business days, and
          you will receive a confirmation email with tracking information once
          your order has been shipped.We partner with reputable shipping
          carriers to ensure reliable and timely delivery of your items.Please
          note that additional customs duties or taxes may apply for
          international orders, and it is the responsibility of the customer to
          cover these fees.
        </div>
      </div>
    ),
    review: (
      <div className="my-4 grid grid-cols-12 px-4 md:px-0">
        <div className="col-span-12 md:col-span-4">
          <h1 className="text-xl md:text-3xl font-semibold text-gray-800 tracking-wide mb-2 hidden md:block">
            Review
          </h1>
        </div>
        <div className="col-span-12 text-center md:col-span-8">
          <p className="text-lg md:text-xl font-semibold">Customer Reviews</p>
          <div className="flex justify-center mt-4 gap-6">
            <div>
              <div className="flex space-x-1">
                {[...Array(5)].map((_, i) => (
                  <i
                    key={i}
                    className="far fa-star text-yellow-400 md:text-lg"
                  ></i>
                ))}
              </div>
              <p className="mt-2">Be the first to write a review</p>
            </div>
            <div>
              <button className="bg-[#E00BBA] hover:bg-[#EB1E39] py-2 px-12 mt-2 rounded-sm text-white">
                Write a review
              </button>
            </div>
          </div>
        </div>
      </div>
    ),
  };

  return (
    <div>
      <div>
        <h1 className="text-2xl md:text-4xl mt-8 py-4 md:py-8 px-4 md:px-2 font-semibold text-gray-800 tracking-wide">
         Description
        </h1>
        <hr className="border-black" />
      </div>

      {/* Dropdown for small screens */}
      <div className="block md:hidden my-4 px-2">
        <select
          onChange={(e) => setActiveSection(e.target.value)}
          className="w-full p-2 border rounded-md text-lg font-medium text-gray-800"
          value={activeSection}
        >
          <option value="description">Product Description</option>
          <option value="shipping">Shipping & Return</option>
          <option value="privacy">Privacy Policy</option>
          <option value="review">Review</option>
        </select>
      </div>

      {/* Content for small screens */}
      <div className="block md:hidden">{sections[activeSection]}</div>

      {/* Full display for medium and large screens */}
      <div className="hidden md:block">
        {Object.values(sections).map((content, index) => (
          <div key={index}>
            {content}
            <hr className="border-black" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductInfo;
