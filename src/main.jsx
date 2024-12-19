import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Toaster } from "react-hot-toast";

import App from './App.jsx'
import { CartProvider } from './component/Frontend/CartContext.jsx';

createRoot(document.getElementById('root')).render(
  <>
  <Toaster />
  <CartProvider>
    <App />
  </CartProvider>
  
</>
    
)
