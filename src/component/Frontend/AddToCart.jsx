import { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "./CartContext";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";

const AddToCart = ({ isCartOpen, toggleCart, productId }) => {
  const {
    cart,
    removeFromCart,
    updateCartItem,
    handleDecreaseQuantity,
    handleIncreaseQuantity,
  } = useContext(CartContext);

  return (
    <div
      className={`fixed px-2 top-0 right-0 z-50 w-full md:w-96 h-full bg-white shadow-lg transition-transform duration-500 ${
        isCartOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="p-4 flex justify-between items-center border-b">
        <h2 className="text-2xl font-bold">
          <span>
            <i className="fas fa-shopping-cart me-1"></i>
          </span>{" "}
          Your cart
        </h2>
        <button
          onClick={toggleCart}
          className="text-gray-500 text-lg md:text-xl hover:text-gray-800"
        >
          &times;
        </button>
      </div>
      <div className="p-4 space-y-4 overflow-y-auto h-[calc(100%-200px)]">
        {cart.length === 0 ? (
          <div className="text-center text-gray-600">
            <h3 className="text-lg font-semibold">Your cart is empty</h3>
            <p className="mt-2">Add some products to your cart!</p>
          </div>
        ) : (
          cart.map((product) => (
            <div key={product.id} className="flex items-center border-b pb-4">
              <img
                src={`https://admin.ezicalc.com/public/storage/product/${product.image}`}
                alt={product.name || "Product"}
                className="size-20 object-cover mr-4"
              />
              <div className="flex-1">
                <h3 className="md:text-lg text-[#ED1D38] font-semibold">
                  {product.name}
                  <span className="text-gray-600 text-base ml-2">
                    ({product.variation_values || ""})
                  </span>
                </h3>

                <div className="flex justify-between">
                  <p className="font-semibold text-gray-800">৳{product.unitPrice}</p>
                  <p>X</p>
                  <div className="flex">
                    <button
                      onClick={() => handleDecreaseQuantity(product.id)}
                      className="size-6 p-1 flex justify-center items-center border text-gray-800"
                    >
                      -
                    </button>
                    <span className="size-6 text-sm md:text-base border flex justify-center items-center">
                      {product.quantity}
                    </span>
                    <button
                      onClick={() => handleIncreaseQuantity(product.id)}
                      className="size-6 flex justify-center items-center p-1 border text-gray-800"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="flex justify-between mt-1">
                  <p className="font-semibold text-[#3B82F6]">
                    ৳{product.unitPrice * product.quantity}
                  </p>
                  <button
                    onClick={() => removeFromCart(product.id)}
                    className="ms-auto text-red-600 hover:text-red-800"
                  >
                    <RiDeleteBin6Line className="md:text-lg" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      <div className="p-4 border-t">
      
          <div className="flex justify-between items-center text-lg md:text-xl text-gray-800 mb-4">
            <span className="font-bold">Subtotal</span>
            <span className="font-bold">
              ৳ {cart.reduce((acc, product) => acc + product.price * product.quantity, 0)}
            </span>
          </div>
       
        <Link
          onClick={toggleCart}
          to="/checkout"
          className=" text-center font-semibold py-3 rounded-md bg-[#ED1D38] hover:bg-[#e0344b] text-white flex gap-3 justify-center items-center text-lg md:text-xl"
        >
          Check Out
          <span className="animate-icon">
            <MdKeyboardDoubleArrowRight color="white" className="text-2xl md:text-3xl" />
          </span>
        </Link>
      </div>
    </div>
  );
};

export default AddToCart;
