import { useEffect } from "react";
import Navbar from "./component/Frontend/Navbar";
import Home from "./pages/FrontendPages/Home";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import SingleProduct from "./pages/FrontendPages/SingleProduct";
import ScrollToTopButton from "./component/Frontend/ScrollToTopButton";
// Scroll to top component to ensure page scrolls to top on route change
const ScrollToTop = () => {
  const location = useLocation(); // Get current location (path)

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top when route changes
  }, [location]); // Trigger effect when location changes

  return null;
};

const App = () => {
  return (
    <div>
      <Router>
        <ScrollToTop /> {/* Add ScrollToTop component here */}
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/singleproduct" element={<SingleProduct />} />

        </Routes>
<ScrollToTopButton/>        
      </Router>
    </div>
  );
};

export default App;
