import { useContext } from "react";
import { WishContext } from "./WishContext";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Link } from "react-router-dom";

const WishList = ({ isWishOpen, toggleWish }) => {
  const { wishlist, removeFromWishlist } = useContext(WishContext);

  return (
    <div
      className={`fixed top-0 right-0 z-50 w-full  md:w-80 px-2 h-full bg-white shadow-lg transition-transform duration-500 ${
        isWishOpen ? "translate-x-0" : "translate-x-full"
      }` }  style={{ zIndex: 1050 }}
    >
      <div className="p-4 flex justify-between items-center border-b">
        <h2 className="text-2xl font-bold">
          <span>
            <i className="fas fa-heart me-1"></i>
          </span>
          Your WishList
        </h2>
        <button
          onClick={toggleWish}
          className="text-gray-500 text-lg md:text-xl hover:text-gray-800"
          aria-label="Close wishlist"
        >
          &times;
        </button>
      </div>
      <div className="p-4 space-y-4 overflow-y-auto h-[calc(100%-100px)]">
        {wishlist.length === 0 ? (
          <div className="text-center mt-4 text-gray-500">
            <p>Your wishlist is empty.</p>
          </div>
        ) : (
          wishlist.map((product) => (
            <div key={product.id} className="flex items-center border-b pb-4">
              <Link
                onClick={toggleWish}
                to={`/singleproduct/${product.name}-${product.id}`}
              >
                <img
                    src={`https://pub-c053b04a208d402dac06392a3df4fd32.r2.dev/15/image/${product.image}`}
                    alt={product.name || "Product"}
                  className="w-20 h-20 object-cover mr-4"
                />
              </Link>
              <div className="flex flex-col justify-center">
                <h3 className="md:text-lg text-[#ED1D38] font-semibold truncate max-w-[180px]">
                  {product.name}
                </h3>
              </div>
              <button
                onClick={() => removeFromWishlist(product.id)}
                className="ms-auto text-gray-500 hover:text-red-600"
              >
                <RiDeleteBin6Line className="md:text-lg" />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default WishList;
