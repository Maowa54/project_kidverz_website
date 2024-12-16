import Footer from "../../component/Frontend/Footer";
import Section1 from "../../component/Frontend/Home/Section1";
import Section2 from "../../component/Frontend/Home/Section2";
import Section3 from "../../component/Frontend/Home/Section3";
import Section5 from "../../component/Frontend/Home/Section5";
import Section6 from "../../component/Frontend/Home/Section6";
import Section7 from "../../component/Frontend/Home/Section7";

const Home = () => {
  return (
    <div className="overflow-hidden pt-28">
      {/* First Section */}
      <Section1 />

      {/* Second Section */}

      <Section2 />

      {/* third Section */}

    <Section3/>

    {/* Fifth Section */}

    <Section5/>

    {/* Sixth Section */}

    <Section6/>


     {/* Seventh Section */}

     <Section7/>

 {/* Footer Section */}
 <Footer/>




    </div>
  );
};

export default Home;
