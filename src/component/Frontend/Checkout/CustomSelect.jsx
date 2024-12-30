import { useState } from 'react';

const CustomSelect = ({ selectedOption, setSelectedOption, error }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (value) => {
    setSelectedOption(value);
    setIsOpen(false); // Close the dropdown after selecting an option
  };

  return (
    <div className="relative inline-block w-full mb-2">
      <p
        onClick={() => setIsOpen(!isOpen)}
        className={`cursor-pointer w-full px-4 py-2 bg-white border text-sm md:text-base rounded-md flex justify-between items-center focus:outline-none focus:ring-2 ${
          error ? 'border-red-500' : 'border-gray-300'
        }`}
      >
        {selectedOption || 'Select an option'}
        <span
          className={`ml-2 transform transition-transform ${
            isOpen ? 'rotate-180' : 'rotate-0'
          }`}
        >
          ▼
        </span>
      </p>
      {isOpen && (
        <div className="absolute w-full mt-2 bg-white border text-sm md:text-base border-gray-300 rounded-md shadow-lg">
          <div
            onClick={() => handleSelect('Cash on Delivery')}
            className="hover:bg-rose-600 hover:text-white text-gray-800 px-4 py-2 cursor-pointer"
          >
            Cash on Delivery
          </div>
          <div
            onClick={() => handleSelect('Paid')}
            className="hover:bg-rose-600 hover:text-white text-gray-800 px-4 py-2 cursor-pointer"
          >
            Paid
          </div>
        </div>
      )}
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};

export default CustomSelect;
