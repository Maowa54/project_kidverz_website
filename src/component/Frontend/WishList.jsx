import { useContext } from "react";
import { WishContext } from "./WishContext";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Link } from "react-router-dom";

const WishList = ({ isWishOpen, toggleWish, productId }) => {
  const { wishlist, removeFromWishlist } = useContext(WishContext);

  return (
    <div
      className={`fixed top-0 right-0 z-50 w-80 h-full bg-white shadow-lg transition-transform ${
        isWishOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="p-4 flex justify-between items-center border-b">
        <h2 className="text-2xl  font-bold">
          <span>
            <i className="fas fa-heart me-1"></i>
          </span>{" "}
          Your WishList{" "}
        </h2>
        <button
          onClick={toggleWish}
          className="text-gray-500 text-lg md:text-xl  hover:text-gray-800"
        >
          &times;
        </button>
      </div>
      <div className="p-4  space-y-4 overflow-y-auto ">
        {wishlist.map((product) => (
          <div key={product.id} className="flex  items-center border-b pb-4">
            <div className="flex justify-between">
              <Link
                onClick={toggleWish}
                to={`/singleproduct/${product.name}-${product.id}`}
              >
                <img
                  src={`https://admin.ezicalc.com/public/storage/product/${product.image}`}
                  alt={product.name || "Product"}
                  className="size-20 object-cover mr-4"
                />
              </Link>
              <div className="flex justify-center items-center">
                <h3 className="md:text-lg text-[#ED1D38] font-semibold">
                  {product.name}
                </h3>
              </div>
            </div>
            <button
              onClick={() => removeFromWishlist(product.id)}
              className=" ms-auto text-gray-500 hover:text-red-600"
            >
              <RiDeleteBin6Line className=" md:text-lg" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WishList;
