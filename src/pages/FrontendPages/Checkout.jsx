import { useState, useContext } from "react";
// import CheckOutOrder from "../../../Component/Frontend/CheckOutOrder";
import { useNavigate } from "react-router-dom";
// import Header from "../../../Component/Frontend/Header";
import axios from "axios";
import { CartContext } from "../../component/Frontend/CartContext";
import { ImSpinner10 } from "react-icons/im";
import CustomSelect from "../../component/Frontend/Checkout/CustomSelect";
import Carticon from "../../component/Frontend/Carticon";
import Navbar from "../../component/Frontend/Navbar";
import Footer from "../../component/Frontend/Footer";
const Checkout = () => {
  const navigate = useNavigate();

  const { cart } = useContext(CartContext);

  // console.log(ttt)
  const [errors, setErrors] = useState({});

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const [note, setNote] = useState("");

  const [loading, setLoading] = useState(false);

  const [deliveryCharge, setDeliveryCharge] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("");

  const handleDeliveryChange = (e) => {
    const charge = e.target.value === "insideDhaka" ? 80 : 130;
    setDeliveryCharge(charge);
  };
  // console.log(name);

  // console.log(phone);
  // console.log(address);
  // console.log(codAmount);

  const totalPrice = cart.reduce((acc, product) => {
    const count = product.quantity ?? 1;
    const discountedPrice = product.price - (product.discount_amount ?? 0);
    return acc + discountedPrice * count; // Accumulate discounted total
  }, 0);

  const totalAmountWithDelivery =
    cart.reduce((acc, product) => {
      const count = product.quantity ?? 1;
      const discountedPrice = product.price - (product.discount_amount ?? 0);
      return acc + discountedPrice * count;
    }, 0) + deliveryCharge;

  const [isPopupVisible, setIsPopupVisible] = useState(false);

  // Delivery Charge Logic Start

  // Delivery Charge Logic End

  const closePopup = () => {
    // Hide the popup
    setIsPopupVisible(false);
  };

  const sProductQty = cart
    .filter((product) => product.has_variation === 0)
    .map((product) => product.quantity);

  const vProductQty = cart
    .filter((product) => product.has_variation === 1)
    .map((product) => product.quantity);
  // Create an axios instance for common configuration

  const handleSave = async (e) => {
    e.preventDefault();

    // Perform field validation before submitting
    const newErrors = {};

    // Check if required fields are filled
    if (!name) newErrors.name = ["Name is required."];
    if (!phone) newErrors.phone = ["Phone number is required."];
    if (!address) newErrors.address = ["Address is required."];
    if (!deliveryCharge)
      newErrors.deliveryCharge = ["Please select a delivery charge option."];

    if (Object.keys(newErrors).length > 0) {
      // If there are errors, set them and stop submission
      setErrors(newErrors);
      return;
    }

    // Clear previous errors if validation passed
    setErrors({});

    const formData = new FormData();

    formData.append("client_id", 15);
    formData.append(
      "product_ids",
      cart.map((product) => product.id)
    );
    formData.append(
      "s_product_qty",
      sProductQty.length > 0 ? sProductQty : null
    );
    formData.append(
      "v_product_qty",
      vProductQty.length > 0 ? vProductQty.join(",") : null
    );
    formData.append("business_id", 21);
    formData.append("name", name);
    formData.append("phone", phone);
    formData.append("note", note);

    formData.append("address", address);
    formData.append("delivery_charge", deliveryCharge);
    formData.append("cod_amount", totalAmountWithDelivery);
    for (let [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }

    setLoading(true);
    try {
      const response = await axios.post(
        "https://admin.ezicalc.com/api/public/order/create",
        formData,
        {}
      );

      if (response.data.status) {
        // Reset form fields
        setName("");
        setPhone("");
        setAddress("");
        setErrors({});
        setDeliveryCharge("");
        setNote("");

        localStorage.removeItem("cart");

        navigate(`/thankyou/${response.data.data.id}`);
      } else {
        const responseErrors = response.data.error || {};
        setErrors(responseErrors);
      }
    } catch (error) {
      console.error(
        "Error saving Order:",
        error.response ? error.response.data : error.message
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" overflow-hidden">
      <Navbar />
      <Carticon />
      <div className="px-4 lg:px-0 mt-6 container mx-auto">
        {/* Grid Layout */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Left Column - 8 columns wide */}
          <div className="hidden md:block">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="text-rose-600 px-2 py-3 font-semibold text-xl text-left">
                    Your Products
                  </th>
                  <th className="text-rose-600 px-2 py-3 font-semibold text-xl text-right">
                    Subtotal
                  </th>
                </tr>
              </thead>
              <tbody>
                {cart.map((product) => {
                  const count = product.quantity ?? 1; // Assume count is part of product or default to 1
                  const productTotalPrice =
                    (product.price - (product.discount_amount ?? 0)) * count; // Calculate individual product total

                  return (
                    <tr key={product.id} className="hover:bg-teal-50 border-b">
                      <td className="p-2  my-4 flex items-center">
                        <div className="relative">
                          <div className="absolute -top-4 -right-2">
                            <p className="flex items-center justify-center rounded-full bg-red-500 size-2 p-2 md:p-3 text-sm text-white">
                              {product.quantity}
                            </p>
                          </div>
                          <img
                            src={`https://pub-c053b04a208d402dac06392a3df4fd32.r2.dev/15/image/${product.image}`}
                            className="size-16 md:size-20"
                            alt={product?.name}
                          />
                        </div>
                        <div className="ms-2 md:ms-4">
                          <p className="mb-1 font-semibold">{product.name}</p>
                          <p className="font-meidum ">
                            Price: {product.price}৳
                          </p>
                          {product.discount_amount && (
                            <p className="text-red-700 text-sm">
                              Discount: {product.discount_amount}৳
                            </p>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-2 text-base text-black font-medium text-right">
                        {productTotalPrice}৳
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <form onSubmit={handleSave} className="">
            <div className=" border bg-rose-50 py-4 px-6 space-y-4 shadow-md rounded">
              {/* Title */}
              <h2 className="text-2xl font-semibold mb-4 text-rose-600">
                Order Details
              </h2>

              {/* Input Fields */}
              {/* Name Input */}
              <div>
                <label
                  htmlFor="name"
                  className="block font-semibold text-lg text-gray-800"
                >
                  <i className="fas fa-user mr-2 text-rose-500"></i>Name
                </label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  id="customerName"
                  placeholder="Enter Your Name"
                  className="mt-2 block w-full rounded-md border border-gray-300 shadow-sm p-3 focus:ring-2 focus:ring-rose-400"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm">{errors.name[0]}</p>
                )}
              </div>

              {/* Phone Number Input */}
              <div>
                <label
                  htmlFor="phone"
                  className="block font-semibold text-lg text-gray-800"
                >
                  <i className="fas fa-phone mr-2 text-rose-500"></i>Phone
                  Number
                </label>
                <input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  type="tel"
                  id="phoneNumber"
                  placeholder="Enter Your Phone Number"
                  className="mt-2 block w-full rounded-md border border-gray-300 shadow-sm p-3 focus:ring-2 focus:ring-rose-400"
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm">{errors.phone[0]}</p>
                )}
              </div>

              {/* Delivery Address Input */}
              <div>
                <label
                  htmlFor="address"
                  className="block font-semibold text-lg text-gray-800"
                >
                  <i className="fas fa-map-marker-alt mr-2 text-rose-500"></i>
                  Delivery Address
                </label>
                <textarea
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  id="address"
                  rows="4"
                  placeholder="Enter Your Delivery Address"
                  className="mt-2 block w-full rounded-md border border-gray-300 shadow-sm p-3 focus:ring-2 focus:ring-rose-400"
                ></textarea>
                {errors.address && (
                  <p className="text-red-500 text-sm">{errors.address[0]}</p>
                )}
              </div>

              {/* Delivery Fee Options */}
              <div>
                <p className="block font-semibold text-lg text-gray-800 mb-2">
                  <i className="fas fa-truck mr-2 text-rose-500"></i>Delivery
                  Fee
                </p>
                <div className="flex flex-col md:flex-row space-x-0 space-y-2 md:space-y-0 md:space-x-4">
                  {/* Inside Dhaka Option */}
                  <label className="flex items-center text-gray-800">
                    <input
                      type="radio"
                      className="form-radio required mr-2 accent-rose-500"
                      name="deliveryCharge"
                      value="insideDhaka"
                      required
                      onChange={handleDeliveryChange}
                    />
                    Inside Dhaka (80 TK)
                  </label>

                  {/* Outside Dhaka Option */}
                  <label className="flex items-center text-gray-800">
                    <input
                      type="radio"
                      className="form-radio required mr-2 accent-rose-500"
                      name="deliveryCharge"
                      value="outsideDhaka"
                      required
                      onChange={handleDeliveryChange}
                    />
                    Outside Dhaka (130 TK)
                  </label>
                </div>

                {/* Display error message for delivery charge */}
                {errors.deliveryCharge && (
                  <p className="text-red-500 text-sm">
                    {errors.deliveryCharge[0]}
                  </p>
                )}
              </div>

              {/* Payment Method */}

              <div className="mb-2">
                <label
                  className="block font-semibold text-lg text-gray-800"
                  htmlFor="paymentMethod"
                >
                  <i className="fas fa-wallet mr-2 text-rose-500"></i>
                  Payment Method
                </label>
                <div className="flex items-center gap-3 mt-2  p-4 border bg-white border-gray-300 rounded-lg">
                  <div className="flex items-center justify-center w-5 h-5 text-xs rounded-full bg-green-500">
                    <i className="fas fa-check text-white"></i>
                  </div>
                  <p className="text-gray-700 font-medium">Cash on Delivery</p>
                </div>
              </div>

              {/* Order Note Input */}
              <div>
                <label
                  htmlFor="orderNote"
                  className="block font-semibold text-lg text-gray-800"
                >
                  <i className="fas fa-sticky-note mr-2 text-rose-500"></i>
                  Order Note
                </label>
                <textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  id="note"
                  rows="3"
                  placeholder="Enter Your Note (if any)"
                  className="mt-2 block w-full rounded-md border border-gray-300 shadow-sm p-3 focus:ring-2 focus:ring-rose-400"
                ></textarea>
              </div>
              {/* Order Summary Section */}
              <div className="mt-6 border-t pt-4">
                <h2 className="text-2xl font-semibold mb-4 text-rose-600">
                  Order Summary
                </h2>

                <div className="mb-2 block md:hidden ">
                  {cart.map((product) => (
                    <div
                      key={product.id}
                      className="flex font-medium justify-between mb-2"
                    >
                      <p className="flex gap-2">
                        {product.name} <span>X {product.quantity}</span>
                      </p>
                      <p className="font-medium">{product.price}৳</p>
                    </div>
                  ))}
                </div>

                {/* Subtotal */}
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium"> ৳{totalPrice}</span>
                </div>

                {/* Delivery Charge */}
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">Delivery Charge</span>
                  <span className="font-medium">৳{deliveryCharge}</span>
                </div>

                {/* Total */}
                <div className="flex justify-between items-center border-t pt-3 mt-3">
                  <span className="text-gray-800 md:text-lg font-semibold">
                    Total
                  </span>
                  <span className="text-xl font-bold text-rose-500">
                    ৳{totalAmountWithDelivery}
                  </span>
                </div>
              </div>

              {/* Submit Button */}
              <button
                disabled={loading} // Disable button while loading
                onClick={handleSave}
                type="submit"
                className="w-full bg-rose-500 text-white py-3 px-4 rounded-lg shadow-lg hover:bg-rose-700 transition-all duration-200"
              >
                {loading ? (
                  <div className="flex justify-center w-full">
                    <ImSpinner10
                      className="animate-spin text-white"
                      size={20}
                    />
                    <span className="px-2">Processing...</span>
                  </div>
                ) : (
                  <>
                    <i className="fas fa-check-circle mr-2"></i>Confirm Order
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
      <div
        className="gap-2 mx-auto  md:hidden fixed flex flex-col items-center justify-center bottom-0 w-full bg-gradient-to-t from-gray-50 to-white shadow-lg z-30 
       px-6 py-4"
      >
        <p className="flex justify-between text-lg md:text-xl font-semibold ">
          <span>Total Amount:</span>
          <span className="text-sky-600">৳{totalAmountWithDelivery}</span>
        </p>

        <button
          type="submit"
          className="block mx-auto md:hidden  bg-rose-500 text-white font-semibold py-2 px-6 text-lg rounded-full w-full"
          disabled={loading} // Disable button while loading
          onClick={handleSave}
        >
          {loading ? (
            <div className="flex justify-center w-full">
              <ImSpinner10 className="animate-spin text-white" size={20} />
              <span className="px-2">Processing...</span>
            </div>
          ) : (
            <>
              <span className="me-2">Place Order</span>
              <i className="fas fa-shopping-bag text-white text-lg animate-bounce"></i>
            </>
          )}
        </button>
      </div>

      <div className="hidden md:block">
        <Footer />
      </div>
    </div>
  );
};

export default Checkout;
