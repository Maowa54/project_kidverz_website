import Footer from "../../component/Frontend/Footer";

const Checkout = () => {
  return (
    <div className=" overflow-hidden">
      <div className="px-4 lg:px-0 container mx-auto">
        {/* Grid Layout */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Left Column - 8 columns wide */}
          <div className="">
            <div className="bg-[#F65E17] rounded-t border-white ">
              <h1 className="font-semibold text-xl md:text-2xl p-4 tracking-wide text-white ">
               <span><i className="fas fa-shopping-cart me-2"></i></span>
                Your Shopping
              </h1>
            </div>

            <div className="flex items-center p-3 border-b-2 space-x-4">
              {/* Product Image */}
              <img
                src="/assets/2.png"
                alt="Product"
                className="w-24 h-24 object-cover rounded border border-gray-300"
              />

              {/* Product Info (Name, Price, Quantity) */}
              <div className="flex flex-col space-y-2">
                <p className="font-semibold text-lg">Product Name</p>
                <p className=" text-md">$20.00</p>
                <div className="flex items-center space-x-2">
                  <label htmlFor="quantity" className="">
                    Quantity:
                  </label>
                  <input
                    type="number"
                    id="quantity"
                    className="w-12 p-1 text-center rounded border border-gray-300"
                    defaultValue="1"
                    min="1"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center p-4  border-b-2 space-x-4">
              {/* Product Image */}
              <img
                src="/assets/2.png"
                alt="Product"
                className="w-24 h-24 object-cover rounded border border-gray-300"
              />

              {/* Product Info (Name, Price, Quantity) */}
              <div className="flex flex-col space-y-2">
                <p className="font-semibold text-lg">Product Name</p>
                <p className=" text-md">$20.00</p>
                <div className="flex items-center space-x-2">
                  <label htmlFor="quantity" className="">
                    Quantity:
                  </label>
                  <input
                    type="number"
                    id="quantity"
                    className="w-12 p-1 text-center rounded border border-gray-300"
                    defaultValue="1"
                    min="1"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className=" border bg-orange-50 py-4 px-6 shadow-md rounded">
            {/* Title */}
            <h2 className="text-2xl font-semibold mb-4 text-orange-700">
              Order Details
            </h2>
            {/* <ul className="list-disc list-inside text-gray-600 mb-4">
    <li>Provide your name, address, and phone number.</li>
    <li>Choose your delivery location (Inside/Outside Dhaka).</li>
    <li>Click on the "Confirm Order" button to proceed.</li>
  </ul>
  <p className="text-gray-600 my-2">
 To confirm your order, enter your name, address, and mobile number, then click the "Confirm Order" button.</p> */}

            {/* Input Fields */}
            <form className="space-y-4">
              {/* Name Input */}
              <div>
                <label
                  htmlFor="name"
                  className="block font-semibold text-lg text-gray-800"
                >
                  <i className="fas fa-user mr-2 text-orange-500"></i>Name
                </label>
                <input
                  type="text"
                  id="name"
                  placeholder="Enter Your Name"
                  className="mt-2 block w-full rounded-md border border-gray-300 shadow-sm p-3 focus:ring-2 focus:ring-orange-400"
                />
              </div>

              {/* Phone Number Input */}
              <div>
                <label
                  htmlFor="phone"
                  className="block font-semibold text-lg text-gray-800"
                >
                  <i className="fas fa-phone mr-2 text-orange-500"></i>Phone
                  Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  placeholder="Enter Your Phone Number"
                  className="mt-2 block w-full rounded-md border border-gray-300 shadow-sm p-3 focus:ring-2 focus:ring-orange-400"
                />
              </div>

              {/* Delivery Address Input */}
              <div>
                <label
                  htmlFor="address"
                  className="block font-semibold text-lg text-gray-800"
                >
                  <i className="fas fa-map-marker-alt mr-2 text-orange-500"></i>
                  Delivery Address
                </label>
                <textarea
                  id="address"
                  rows="4"
                  placeholder="Enter Your Delivery Address"
                  className="mt-2 block w-full rounded-md border border-gray-300 shadow-sm p-3 focus:ring-2 focus:ring-orange-400"
                ></textarea>
              </div>

              {/* Delivery Fee Options */}
              <div>
                <p className="block font-semibold text-lg text-gray-800 mb-2">
                  <i className="fas fa-truck mr-2 text-orange-500"></i>Delivery
                  Fee
                </p>
                <div className="flex flex-col space-y-2">
                  {/* Inside Dhaka Option */}
                  <label className="flex items-center text-gray-800">
                    <input
                      type="radio"
                      name="deliveryFee"
                      value="insideDhaka"
                      className="mr-2 accent-orange-500"
                    />
                    Inside Dhaka (80 TK)
                  </label>

                  {/* Outside Dhaka Option */}
                  <label className="flex items-center text-gray-800">
                    <input
                      type="radio"
                      name="deliveryFee"
                      value="outsideDhaka"
                      className="mr-2 accent-orange-500"
                    />
                    Outside Dhaka (150 TK)
                  </label>
                </div>
              </div>

              {/* Order Note Input */}
              <div>
                <label
                  htmlFor="orderNote"
                  className="block font-semibold text-lg text-gray-800"
                >
                  <i className="fas fa-sticky-note mr-2 text-orange-500"></i>
                  Order Note
                </label>
                <textarea
                  id="orderNote"
                  rows="3"
                  placeholder="Enter Your Note (if any)"
                  className="mt-2 block w-full rounded-md border border-gray-300 shadow-sm p-3 focus:ring-2 focus:ring-orange-400"
                ></textarea>
              </div>
              {/* Order Summary Section */}
              <div className="mt-6 border-t pt-4">
              <h2 className="text-2xl font-semibold mb-4 text-orange-700">
              Order Summary
            </h2>

                {/* Subtotal */}
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">$200.00</span>
                </div>

                {/* Delivery Charge */}
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">Delivery Charge</span>
                  <span className="font-medium">80 TK</span>
                </div>

                {/* Total */}
                <div className="flex justify-between items-center border-t pt-3 mt-3">
                  <span className="text-gray-800 md:text-lg font-semibold">
                    Total
                  </span>
                  <span className="text-xl font-bold text-orange-600">
                    $280.00
                  </span>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-orange-600 text-white py-3 px-4 rounded-lg shadow-lg hover:bg-orange-700 transition-all duration-200"
              >
                <i className="fas fa-check-circle mr-2"></i>Confirm Order
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
