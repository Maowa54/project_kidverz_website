import React from "react";
import { Link } from "react-router-dom";

const CartContent = ({ isCartOpen, toggleCart }) => {
  const cartItems = [
    {
      id: 1,
      name: "Autumn Girl Dress - Green",
      price: 16.99,
      quantity: 1,
      image: "/public/assets/2_476edbd5-b71b-46af-aa54-6f32fd4b678c.png", // Replace with actual image path
    },
    {
      id: 2,
      name: "Raglan Sweater - Purple",
      price: 48.99,
      quantity: 1,
      image: "/public/assets/3_c18df65b-ea3b-41e9-9905-584507bdd54b.png", // Replace with actual image path
    },
    {
      id: 3,
      name: "Sweatshirt Set - Yellow",
      price: 6.99,
      quantity: 3,
      image: "/public/assets/3_7386ead7-b74b-43ec-be8c-69e0262c58f0.png", // Replace with actual image path
    },
    {
      id: 4,
      name: "Raglan Sweater - Purple",
      price: 48.99,
      quantity: 1,
      image: "/public/assets/3_c18df65b-ea3b-41e9-9905-584507bdd54b.png", // Replace with actual image path
    },
    {
      id: 5,
      name: "Sweatshirt Set - Yellow",
      price: 6.99,
      quantity: 3,
      image: "/public/assets/3_7386ead7-b74b-43ec-be8c-69e0262c58f0.png", // Replace with actual image path
    },
  ];

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div
      className={`fixed top-0 right-0 w-80 h-full bg-white shadow-lg transition-transform ${
        isCartOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="p-4 flex justify-between items-center border-b">
        <h2 className="text-2xl font-bold">Your cart ({cartItems.length})</h2>
        <button
          onClick={toggleCart}
          className="text-gray-500 hover:text-gray-800"
        >
          &times;
        </button>
      </div>
      <div className="p-4  space-y-4 overflow-y-auto h-[calc(100%-200px)]">
        {cartItems.map((item) => (
          <div key={item.id} className="flex  items-center border-b pb-4">
            <img
              src={item.image}
              alt={item.name}
              className="size-20 object-cover mr-4"
            />
            <div className="flex-1">
              <h3 className="text-orange-600 font-semibold">{item.name}</h3>
              <p className="text-lg text-sky-600">${item.price.toFixed(2)}</p>
              <div className="flex text-lg items-center mt-2">
                <button className="size-6 text-gray-800">-</button>
                <span className="size-8 border bg-gray-100 flex justify-center items-center">
                  3
                </span>
                <button className="size-6 text-gray-800">+</button>
                <button className=" ms-auto text-gray-500 hover:text-red-600">
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
          <span className="text-lg font-bold">${subtotal.toFixed(2)}</span>
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

export default CartContent;
