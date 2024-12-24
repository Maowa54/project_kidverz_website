import React, { useContext, useEffect, useState } from 'react';
import { WishContext } from "../../component/Frontend/WishContext";
import { Link, useParams, } from 'react-router-dom';

const AllProduct = ({ products = [] }) => {
  const { addToWishlist } = useContext(WishContext);

  const { age } = useParams();

  return (
    <div>
      <h1 className='my-8 px-8 text-2xl font-semibold'>
        Products For {age} Years
      </h1>
      <div className="section-2 container mt-4 mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {[...products].sort(() => Math.random() - 0.5).map((product) => (
          <div key={product.id} className="border shadow flex flex-col relative group">
            <div className="bg-gray-100 relative">
              <Link to={`/singleproduct/${product.name}-${product.id}`}>
                <img
                  src={`https://admin.ezicalc.com/public/storage/product/${product.image}`}
                  alt={product.name}
                  className="w-full h-96"
                />
              </Link>
              <div className="absolute top-2 right-2 px-1 bg-gray-200 flex items-center">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <i key={i} className="fas fa-star text-gray-400 text-xs"></i>
                  ))}
                </div>
                <span className="text-gray-800 ms-1">(0)</span>
              </div>

              <div className="absolute flex justify-center gap-2 bottom-4 w-full opacity-0 group-hover:opacity-100 transition duration-300 transform translate-y-full group-hover:translate-y-1">
                {[
                  "fas fa-shopping-cart",
                  "far fa-heart",
                  "far fa-eye",
                  "fa fa-exchange-alt",
                ].map((icon, index) => (
                  <div
                    key={index}
                    className="w-10 h-10 bg-gray-800 flex justify-center items-center rounded hover:bg-[#EB1E39] transition duration-300"
                  >
                    {icon === "fas fa-shopping-cart" ? (
                      <button className="flex justify-center items-center w-full h-full">
                        <i className={`${icon} text-white`}></i>
                      </button>
                    ) : icon === "far fa-heart" ? (
                      <button onClick={() => addToWishlist(product)} className="flex justify-center items-center w-full h-full">
                        <i className={`${icon} text-white`}></i>
                      </button>
                    ) : icon === "far fa-eye" ? (
                      <Link to={`/singleproduct/${product.name}-${product.id}`} className="flex justify-center items-center w-full h-full">
                        <i className={`${icon} text-white`}></i>
                      </Link>
                    ) : (
                      <i className={`${icon} text-white`}></i>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="px-4 py-2">
              <h2 className="text-lg font-medium text-gray-800 md:text-xl">
                {product.name}
              </h2>
              <p className="mt-1 text-lg font-semibold text-gray-800 md:text-xl">
                ৳{" "}
                {product.variation_combinations && product.variation_combinations.length > 0
                  ? product.variation_combinations[0].price
                  : product.price}
              </p>

              <div className="mt-2 flex gap-2">
                {["bg-red-500", "bg-yellow-500", "bg-purple-500", "bg-green-500", "bg-blue-500"].map((color, index) => (
                  <button
                    key={index}
                    className={`rounded-full w-6 h-6 border-2 border-gray-400 flex justify-center items-center`}
                  >
                    <div className={`${color} rounded-full w-4 h-4`}></div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllProduct;
