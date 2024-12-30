import React, { createContext, useState, useEffect } from "react";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

export const WishContext = createContext();

export const WishProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);
  const [wishCount, setWishCount] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    // Initialize cart from localStorage
    const existingCart = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlist(existingCart);
    setWishCount(existingCart.reduce((acc, item) => acc + item.quantity, 0));
    setTotalPrice(existingCart.reduce((acc, item) => acc + item.price, 0));
  }, []);

  const addToWishlist = (
    product,
    qty,
    variation_id,
    variation,
    currentPrice
  ) => {
    // Determine the product ID to use (variation_id for variant or product.id for the base product)
    const productId = variation_id || product.id;
    const existingProductIndex = wishlist.findIndex(
      (item) => item.id === productId
    );

    const price = variation_id ? currentPrice : product.price || 0; // Use currentPrice if variant selected
    const v_values = variation_id ? variation.values : "";
    const quantityToAdd = qty || 1;

    let updatedWishlist = [...wishlist];

    if (existingProductIndex !== -1) {
      // Update the quantity and recalculate the price
      updatedWishlist[existingProductIndex].quantity += quantityToAdd;
      updatedWishlist[existingProductIndex].price =
        updatedWishlist[existingProductIndex].unitPrice *
        updatedWishlist[existingProductIndex].quantity;
    } else {
      // Add new product/variant with unitPrice and initial quantity
      const newCartItem = {
        ...product,
        id: productId,
        quantity: quantityToAdd,
        unitPrice: price,
        variation_values: v_values,
        price: price * quantityToAdd,
        variationDetails: variation_id ? variation : null,
      };
      updatedWishlist.push(newCartItem);
    }

    // Update localStorage, state, and UI feedback
    localStorage.setItem("cart", JSON.stringify(updatedWishlist));
    setWishlist(updatedWishlist);
    setWishCount(updatedWishlist.reduce((acc, item) => acc + item.quantity, 0));
    setTotalPrice(updatedWishlist.reduce((acc, item) => acc + item.price, 0));

    // // Show success message
    // toast.success('Added to Cart Successfully!', {
    //   position: "top-right",
    //   duration: 1000,
    // });
  };

  const updateCartItem = (updatedProduct) => {
    const updatedCart = wishlist.map((item) =>
      item.id === updatedProduct.id ? updatedProduct : item
    );
    setWishlist(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setWishCount(updatedCart.reduce((acc, item) => acc + item.quantity, 0));
    setTotalPrice(updatedCart.reduce((acc, item) => acc + item.price, 0));
    toast.success("Quantity Updated Successfully!", {
      position: "top-right",
      duration: 1000,
    });
  };

  const handleIncreaseQuantity = (productId) => {
    const product = wishlist.find((p) => p.id === productId);
    if (product) {
      const updatedProduct = {
        ...product,
        quantity: product.quantity + 1,
        price: product.unitPrice * (product.quantity + 1),
      };
      updateCartItem(updatedProduct);
    }
  };

  const handleDecreaseQuantity = (productId) => {
    const product = wishlist.find((p) => p.id === productId);
    if (product && product.quantity > 1) {
      const updatedProduct = {
        ...product,
        quantity: product.quantity - 1,
        price: product.unitPrice * (product.quantity - 1),
      };
      updateCartItem(updatedProduct);
    }
  };

  const removeFromCart = (productId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, remove it!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedCart = wishlist.filter((product) => product.id !== productId);
        setWishlist(updatedCart);
        setWishCount(updatedCart.reduce((acc, item) => acc + item.quantity, 0));
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        setTotalPrice(updatedCart.reduce((acc, item) => acc + item.price, 0));
        toast.success("Product Removed Successfully!", {
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
        wishCount,
        totalPrice,
        addToWishlist,
        removeFromCart,
        updateCartItem,
        handleIncreaseQuantity,
        handleDecreaseQuantity,
      }}
    >
      {children}
    </WishContext.Provider>
  );
};
