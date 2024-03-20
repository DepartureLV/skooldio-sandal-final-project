import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import Accordion from "../components/Accordion";

// import ProductsDetail from "../hooks/ProductDetailMock";
import Navbar from "../components/Navbar/Navbar";

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [catagoriesInclude, setCatagoriesInclude] = useState([]);
  const [categoriesExclude, setCategoriesExclude] = useState([]);

  const url = window.location.href;
  // const pId = url.split("=")[1];
  const pId = "all-ladies";
  const BASE_URL =
    "https://api.storefront.wdb.skooldio.dev/products?categories=" + pId;

  useEffect(() => {
    setLoading(true);
    fetch(`${BASE_URL}`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.data);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    setCatagoriesInclude(["all-ladies"]);
    setCategoriesExclude(["ladies-shoes", "ladies-accessories"]);
  }, []);

  let item = [];

  if (products) {
    item = products
      .filter((item) => {
        return catagoriesInclude.some((category) =>
          item.categories.includes(category)
        );
      })
      .filter((item) => {
        return !categoriesExclude.some((category) =>
          item.categories.includes(category)
        );
      })
      .map((item, index) => <ProductCard key={index} {...item} />);
  }

  return (
    <>
      <Navbar />
      {!loading ? (
        <div className="flex justify-center">
          <div className="lg:flex lg:h-fit lg:max-w-[1600px] 2xl:justify-between px-auto pt-24">
            <div className="hidden 2xl:flex lg:flex-col lg:w-[280px] lg:min-h-max text-secondary font-semibold px-4 gap-4">
              <Accordion title="Tops">
                <p>All items</p>
                <p>T-shirt</p>
                <p>Cardigans</p>
                <p>Knitwear & Sweaters</p>
                <p>Sweatshirts & Hoodies</p>
                <p>Fleece</p>
              </Accordion>
              <Accordion title="Bottoms">{/* Content for Bottoms */}</Accordion>
              <Accordion title="Dress & Jumpsuits">
                {/* Content for Dress & Jumpsuits */}
              </Accordion>
              <Accordion title="Accessories">
                {/* Content for Accessories */}
              </Accordion>
              <Accordion title="Collections">
                {/* Content for Collections */}
              </Accordion>
            </div>
            <div className="font-poppins flex flex-col items-center w-full lg:w-fit px-[18px]">
              <header className="lg:w-full">
                <div className="my-6 mb-[22px] w-[340px] lg:flex lg:items-center lg:justify-between lg:mb-16 lg:w-full ">
                  <h1 className="text-[32px] font-bold w-full text-center mb-10 lg:my-0 lg:text-4xl lg:mr-auto lg:w-fit">
                    Woman's Cloth
                  </h1>
                  <div className="relative flex w-auto justify-end items-center">
                    <p className="font-semibold mr-2">Sort by</p>
                    <button onClick={() => setFilterOpen(!filterOpen)}>
                      <img src="../src/assets/Filter.svg" />
                    </button>
                  </div>
                </div>
                {filterOpen ? (
                  <div className="w-full py-2 px-4 bg-white">
                    <ul class="grid w-full gap-6 lg:grid-cols-3 lg:gap-y-2">
                      {[
                        "Price - Low to high",
                        "Price - High to low",
                        "Rating",
                      ].map((value, index) => (
                        <li
                          className="py-3 px-6 w-full hover:bg-primary-300 rounded-md text-center cursor-pointer"
                          key={index}
                        >
                          <input
                            type="checkbox"
                            id={value}
                            value=""
                            className="hidden"
                            required=""
                          />
                          <label for={value} className="font-semibold">
                            {value}
                          </label>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </header>
              <div className="flex w-[340px] lg:ml-auto h-10 font-bold text-xl justify-end mb-4">
                <h2>Found {item.length}</h2>
              </div>
              {item.length > 0 ? (
                <section className="lg:grid lg:grid-cols-2 xl:grid-cols-3 gap-x-10 gap-y-[60px] mb-40">
                  {item}
                </section>
              ) : (
                <div className="flex w-full h-[800px] py-auto justify-center items-center">
                  <p>No item found</p>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <>Loading</>
      )}
    </>
  );
}

export default Products;
