import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { Toaster } from "react-hot-toast";

import App from './App.jsx';
import { CartProvider } from './component/Frontend/CartContext.jsx';
import { WishProvider } from './component/Frontend/WishContext.jsx'; // Import WishProvider

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Toaster />
    <CartProvider>
      <WishProvider> {/* Wrap App with both providers */}
        <App />
      </WishProvider>
    </CartProvider>
  </StrictMode>
);
