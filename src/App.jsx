import { useState, useEffect } from "react";
import Navbar from "./component/Frontend/Navbar";
import Home from "./pages/FrontendPages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SingleProduct from "./pages/FrontendPages/SingleProduct";
import ScrollToTopButton from "./component/Frontend/ScrollToTopButton";
import Checkout from "./pages/FrontendPages/Checkout";
import axios from "axios";
import ScrollToTop from "./component/Frontend/ScrollToTop";
import AllProduct from "./pages/FrontendPages/AllProduct";
import ThankYouPage from "./pages/FrontendPages/ThankYouPage";
import Shop from "./pages/FrontendPages/Shop";
import Collection from "./pages/FrontendPages/Collection";

const App = () => {
  const [products, setProducts] = useState([]);

  const fetchApiData = async () => {
    // const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiM2EyNmU4ZDE2ODI1NjlkZjI4NjQyYjE5ZDE5ZTMwMzQxMmU4MGY3ODU0ZGI5ZTBiMTI4ZDUwMWM0MGNjOGM4YjU3NzUyZWQ3MjFiYzEwNzUiLCJpYXQiOjE3MzMyOTU2MTAuNTExNzM1OTE2MTM3Njk1MzEyNSwibmJmIjoxNzMzMjk1NjEwLjUxMTczOTAxNTU3OTIyMzYzMjgxMjUsImV4cCI6MTc2NDgzMTYxMC41MDcxNjIwOTQxMTYyMTA5Mzc1LCJzdWIiOiI3Iiwic2NvcGVzIjpbXX0.Jr2pwTJ9fCQlA3gi_KMfr6t5WjMM7zm5Ya9ksiOQaWEfwxbAQlf9vhPVXcuL3wBNMvHmBNXHSwrQrKBXTEiTolSJSlpKKfiJtyQ8vt5OPBaskWs9LwKR2LseX4c4zKtC8ITywIpAnM8kr5lAAYnYEGW05e1Di69vdqLRdjyswZTsQvZdCxNkJ1uONnNkBX9S447flQvegpI-V8iMxSevNvcEWAiRgySZ3A9J8pWYCkaus9nFg-_5UvCZFiNY06ZkTgXLlt7hbU-SH77V89lDokpSJ25ispEhFb9ROvBQDLuvxKovyZV3Xs7oAVo55uu4XMXE7laJOFFsngow_G0LyAUKa0-tJQZcM52qDoBJSzac7pE6aeUFSfgCBjU5Pn_ZZaLkWZnVRokq-qrZlATJpGGzFsMqIIdcQqm2MDf82kbJKjKDGzAkVp26fGGUE0Y3PCwk45UprR24XPvLm6wnlXN0thUR3hUvm-CZZokYYnvq5jCKpf4c_M-0b2XzgRIK-mURhQCgVmuq3mPlJE6pSqW9413z-MB0RWK_DTgQCMvn9BpA2x8zY6Q9fX9ZL3rSkZAgpkMa2hEHWALnqmeTs45z2aQHTVqN-vFXlJKd_hccKrfOYKXQ5q8XfLgotlRceTjOShq155DvvA1GujnIAxYYdPlT0wNl0PTDedRMBrk';

    try {
      const response = await axios.get(
        "https://admin.ezicalc.com/api/public/business/products/get/21"
      );

      if (response.data.status) {
        const fetchedProducts = response.data.data.data;

        // Cache fetched data and timestamp
        // localStorage.setItem(cacheKey, JSON.stringify(fetchedProducts));
        // localStorage.setItem(cacheTimeKey, now.toString());

        setProducts(fetchedProducts);
      }
    } catch (error) {
      console.error("Error fetching API data:", error);
    }
  };

  useEffect(() => {
    fetchApiData();
  }, []);

  // console.log(products);
  return (
    <div>
      <Router>
        <ScrollToTop /> {/* Add ScrollToTop component here */}
        <Routes>
          <Route path="/" element={<Home products={products} />} />
          <Route
            path="/singleproduct/:product_info"
            element={<SingleProduct products={products} />}
          />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/allproduct/:age" element={<AllProduct products={products} />} />
          <Route path="/thankyou/:order_id" element={<ThankYouPage />} />
          <Route path="/shop" element={<Shop products={products} />} />
          <Route path="/collection" element={<Collection products={products} />} />



        </Routes>
        <ScrollToTopButton />
      </Router>
    </div>
  );
};

export default App;
