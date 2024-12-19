import { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "./CartContext";

const AddToCart = ({ isCartOpen, toggleCart }) => {
  const {
    cart,

    removeFromCart,
    updateCartItem,
    handleDecreaseQuantity,
    handleIncreaseQuantity,
  } = useContext(CartContext);

  return (
    <div
      className={`fixed top-0 right-0 z-50 w-80 h-full bg-white shadow-lg transition-transform ${
        isCartOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="p-4 flex justify-between items-center border-b">
        <h2 className="text-2xl font-bold">Your cart</h2>
        <button
          onClick={toggleCart}
          className="text-gray-500 hover:text-gray-800"
        >
          &times;
        </button>
      </div>
      <div className="p-4  space-y-4 overflow-y-auto h-[calc(100%-200px)]">
        {cart.map((product) => (
          <div key={product.id} className="flex  items-center border-b pb-4">
            <img
              src={`https://admin.ezicalc.com/public/storage/product/${product.image}`}
              alt={product.name || "Product"}
              className="size-20 object-cover mr-4"
            />
            <div className="flex-1">
              <h3 className="text-orange-600 font-semibold">{product.name}</h3>
              <p className="text-lg text-sky-600">
                ${product.price.toFixed(2)}
              </p>
              <div className="flex text-lg items-center mt-2">
                <button
                  onClick={() => handleDecreaseQuantity(product.id)}
                  className="size-6 text-gray-800"
                >
                  -
                </button>
                <span className="size-8 border bg-gray-100 flex justify-center items-center">
                {product.quantity}

                </span>
                <button
                  onClick={() => handleIncreaseQuantity(product.id)}
                  className="size-6 text-gray-800"
                >
                  +
                </button>
                <button
                  onClick={() => removeFromCart(product.id)}
                  className=" ms-auto text-gray-500 hover:text-red-600"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="20"
                    height="20"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M3 6h18M9 6V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2M4 6l1 14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2l1-14H4z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="p-4 border-t">
        <div className="flex justify-between items-center mb-4">
          <span className="text-lg font-bold">Subtotal</span>
          <span className="text-lg font-bold">$</span>
        </div>
        <Link to="checkout" className="flex ">
          {" "}
          <button
            onClick={toggleCart}
            className="flex-1 bg-orange-600 text-white py-2 rounded"
          >
            Checkout
          </button>
        </Link>
      </div>
    </div>
  );
};

export default AddToCart;
