import React, { createContext, useState, useEffect } from "react";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    // Initialize cart from localStorage
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(existingCart);
    setCartCount(existingCart.reduce((acc, item) => acc + item.quantity, 0));
    setTotalPrice(existingCart.reduce((acc, item) => acc + item.price, 0));
  }, []);

  const addToCart = (product, qty, variation_id, variation, currentPrice) => {
    // Determine the product ID to use (variation_id for variant or product.id for the base product)
    const productId = variation_id || product.id;
    const existingProductIndex = cart.findIndex((item) => item.id === productId);
  
    const price = variation_id ? currentPrice : product.price || 0; // Use currentPrice if variant selected
    const v_values = variation_id ? variation.values : "";
    const quantityToAdd = qty || 1;
  
    let updatedCart = [...cart];
  
    if (existingProductIndex !== -1) {
      // Update the quantity and recalculate the price
      updatedCart[existingProductIndex].quantity += quantityToAdd;
      updatedCart[existingProductIndex].price =
        updatedCart[existingProductIndex].unitPrice * updatedCart[existingProductIndex].quantity;
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
      updatedCart.push(newCartItem);
    }
  
    // Update localStorage, state, and UI feedback
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCart(updatedCart);
    setCartCount(updatedCart.reduce((acc, item) => acc + item.quantity, 0));
    setTotalPrice(updatedCart.reduce((acc, item) => acc + item.price, 0));
  
    // // Show success message
    // toast.success('Added to Cart Successfully!', {
    //   position: "top-right",
    //   duration: 1000,
    // });
  };
  

  const updateCartItem = (updatedProduct) => {
    const updatedCart = cart.map((item) =>
      item.id === updatedProduct.id ? updatedProduct : item
    );
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCartCount(updatedCart.reduce((acc, item) => acc + item.quantity, 0));
    setTotalPrice(updatedCart.reduce((acc, item) => acc + item.price, 0));
    toast.success('Quantity Updated Successfully!', {
      position: "top-right",
      duration: 1000,
    });
  };

  const handleIncreaseQuantity = (productId) => {
    const product = cart.find((p) => p.id === productId);
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
    const product = cart.find((p) => p.id === productId);
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
    const updatedCart = cart.filter((product) => product.id !== productId);
    setCart(updatedCart);
    setCartCount(updatedCart.reduce((acc, item) => acc + item.quantity, 0));
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setTotalPrice(updatedCart.reduce((acc, item) => acc + item.price, 0));
  
    toast.success('Product Removed Successfully!', {
      position: "top-right",
      duration: 1000,
    });
  };
  

  return (
    <CartContext.Provider
      value={{
        cart,
        cartCount,
        totalPrice,
        addToCart,
        removeFromCart,
        updateCartItem,
        handleIncreaseQuantity,
        handleDecreaseQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
