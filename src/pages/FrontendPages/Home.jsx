import Carticon from "../../component/Frontend/Carticon";
import Footer from "../../component/Frontend/Footer";
import Section1 from "../../component/Frontend/Home/Section1";
import Section2 from "../../component/Frontend/Home/Section2";
import Section3 from "../../component/Frontend/Home/Section3";
import Section5 from "../../component/Frontend/Home/Section5";
import Section6 from "../../component/Frontend/Home/Section6";
import Section7 from "../../component/Frontend/Home/Section7";
import Navbar from "../../component/Frontend/Navbar";

const Home = ({products}) => {


  console.log(products);

  
  return (
    <div className="overflow-hidden ">
              <Navbar />

        <Carticon />
      {/* First Section */}
      <Section1 products={products}/>

      {/* Second Section */}

      <Section2 products={products}/>

      {/* third Section */}

    <Section3 products={products}/>

    {/* Fifth Section */}

    <Section5 products={products}/>

    {/* Sixth Section */}

    <Section6 products={products}/>


     {/* Seventh Section */}

     <Section7 products={products}/>

 {/* Footer Section */}
 <Footer/>




    </div>
  );
};

export default Home;
