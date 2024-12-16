import React, { useState, useEffect } from "react";

const Progressbar = () => {
  const [stock, setStock] = useState(75); // Initial stock value

  // Optional logic to simulate stock depletion
  useEffect(() => {
    const interval = setInterval(() => {
      // setStock((prevStock) => (prevStock > 0 ? prevStock - 1 : 0));
    }, 2000); // Decrease stock every 2 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full my-4 ">
      {/* Items sold */}
      <p className="text-sm md:text-base text-gray-600 mb-2">
        <span className="text-blue-500 font-semibold">1</span> Items have been
        sold in the last{" "}
        <span className="text-blue-500 font-semibold">24</span> hours.
      </p>

      {/* Stock message */}
      <div className="flex items-center text-red-600 font-semibold mb-2">
        <span className="text-lg mr-2">🔥</span>
        <p>HURRY! ONLY {stock} ITEMS ARE LEFT IN STOCK</p>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-gray-200 rounded h-4 relative overflow-hidden">
        {/* Dynamic progress bar */}
        <div
          className="h-full bg-gradient-to-r from-red-500 to-orange-400"
          style={{ width: `${stock }%` }}
        >
          {/* Striped overlay */}
          <div className="h-full bg-stripes"></div>
        </div>
      </div>
    </div>
  );
};

export default Progressbar;
