import React, { createContext, useState, useEffect } from "react";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

export const WishContext = createContext();

export const WishProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    try {
      const existingWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
      setWishlist(existingWishlist);
    } catch (error) {
      console.error("Failed to parse wishlist from localStorage", error);
      setWishlist([]);
    }
  }, []);

  const addToWishlist = (product) => {
    const exists = wishlist.some((item) => item.id === product.id);

    if (!exists) {
      const updatedWishlist = [...wishlist, product];
      setWishlist(updatedWishlist);
      localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));

      toast.success("Added to Wishlist!", {
        position: "top-right",
        duration: 1000,
      });
    } else {
      toast("Product already in Wishlist", {
        icon: "ℹ️",
        style: {
          border: "1px solid #007bff",
          padding: "16px",
          color: "#007bff",
        },
        position: "top-right",
        duration: 1000,
      });
    }
  };

  const removeFromWishlist = (productId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, remove it!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedWishlist = wishlist.filter((product) => product.id !== productId);
        setWishlist(updatedWishlist);
        localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));

        toast.success("Product Removed from Wishlist!", {
          position: "top-right",
          duration: 1000,
        });
      }
    });
  };

  return (
    <WishContext.Provider
      value={{
        wishlist,
        wishCount: wishlist.length, // Derived dynamically from wishlist
        addToWishlist,
        removeFromWishlist,
      }}
    >
      {children}
    </WishContext.Provider>
  );
};
