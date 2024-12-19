import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom'; // Import useLocation from react-router-dom

const ScrollToTop = () => {
  const location = useLocation(); // Get current location (path)

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top when route changes
  }, [location]); // Trigger effect when location changes

  return null;
};

export default ScrollToTop;
