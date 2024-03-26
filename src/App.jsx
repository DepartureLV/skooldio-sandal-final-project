import { createContext, useState, useEffect } from "react";
import "./App.css";

import Homepage from "./pages/Homepage";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Mycart from "./pages/Mycart";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import axios from "axios";
import ProductsByCategories from "./pages/ProductsByCategories";

export const UserContext = createContext();

const router = createBrowserRouter([
  {
    path: "/",
    element: <Homepage />,
  },
  {
    path: "/Products",
    element: <Products />,
    children: [
      {
        path: "/Products/:Name/:Categories",
        element: <ProductsByCategories />,
      },
    ],
  },
  {
    path: "/Mycart",
    element: <Mycart />,
  },
  {
    path: "/ProductDetail/:permalink",
    element: <ProductDetail />,
  },
]);

function App() {
  const items = [];
  // const [userInfo,setUserInfo] = useState({user:""});

  const [userPurhcase, setuserPurhcase] = useState(items);
  const [categories, setCategories] = useState([]);
  const [collections, setCollections] = useState([]);

  useEffect(() => {
    getCategories();
    getCollection();
  }, []);

  const getCategories = async () => {
    try {
      await axios
        .get("https://api.storefront.wdb.skooldio.dev/categories")
        .then((res) => {
          let data = res.data;
          setCategories(data);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const getCollection = async () => {
    try {
      await axios
        .get("https://api.storefront.wdb.skooldio.dev/collections")
        .then((res) => {
          let data = res.data;
          setCollections(data);
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <UserContext.Provider
      value={{
        userPurhcase,
        setuserPurhcase,
        categories,
        setCategories,
        collections,
        setCollections,
      }}
    >
      <RouterProvider router={router} />
    </UserContext.Provider>
  );
}

export default App;
