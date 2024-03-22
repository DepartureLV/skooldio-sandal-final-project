import Footer from "../components/Footer";
import Navbar from "../components/Navbar/Navbar";
import Carousel from "../components/ProductDetailComponents/Carousel";
import ProductDetailRight from "../components/ProductDetailComponents/ProductDetailRight";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

// import Modal from "../components/ProductDetailComponents/Modal/Modal";

export default function ProductDetail() {
  const BASE_URL = "https://api.storefront.wdb.skooldio.dev/";
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const { permalink } = useParams();

  useEffect(() => {
    setLoading(true);
    fetch(`${BASE_URL}products/${permalink}`)
      .then(async (res) => {
        console.log("resres", res);
        let data = await res.json();
        setProducts(data);
      })
      .catch((err) => console.log("error ", err));
  }, []);

  return (
    <div className="section ">
      <Navbar />
      <div className="flex flex-col min-w-[375px]  mt-10 mx-4 mb-20 laptop:mt-24 desktop:flex-row desktop:mx-40  desktop:justify-around ">
        <Carousel {...products} />
        <ProductDetailRight {...products} />
      </div>
      <Footer />
    </div>
  );
}
