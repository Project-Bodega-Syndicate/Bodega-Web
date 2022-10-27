import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  CHECK_STR,
  // CHECK_STR2
} from "../utils/constants";
import { NavLink } from "react-router-dom";

const Products = () => {
  const productURL = process.env.REACT_APP_PRODUCT_URL;
  const [isLoading, setIsLoading] = useState(false);
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    const fetchProducts = () => {
      const fetchProducts = async () => {
        try {
          const headers = {
            "Content-Type": "application/json",
          };
          const response = await axios.post(productURL, {
            headers: headers,
          });
          if (response) {
            // console.log("Product API Response: ", response);
            setProductList(response.data);
            setIsLoading(false);
            // if (response.data.length === 0) {
            //   setIsLoading(false);
            // } else {
            //   setData(response.data[0]);
            // }
          }
        } catch (err) {
          console.log(err.response);
        }
      };
      setIsLoading(true);
      fetchProducts();
    };
    fetchProducts();
  }, [productURL]);

  return (
    <div className="flex flex-col justify-start items-center self-center w-full h-full">
      {isLoading ? (
        <div className="loadingCont flex justify-center items-center h-screen w-full">
          <svg
            width="200"
            height="200"
            viewBox="0 0 200 200"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="animate-spin h-28 w-28"
          >
            <path
              d="M100 170C138.66 170 170 138.66 170 100C170 61.3401 138.66 30 100 30C61.3401 30 30 61.3401 30 100C30 138.66 61.3401 170 100 170Z"
              stroke="white"
              strokeWidth="20"
              strokeDasharray="329.87 113.96"
            />
          </svg>
        </div>
      ) : productList && productList !== "" ? (
        <section className="flex flex-col justify-center items-center">
          <div className="text-white mt-10">
            <p>Products</p>
          </div>
          <div className="grid grid-cols-2 gap-3 mt-8 px-6">
            {productList &&
              productList
                .filter(
                  (item) =>
                    item.product_image1 !== CHECK_STR &&
                    !item.product_image1.includes(".mp4") &&
                    !item.product_image1.includes(".heic")
                )
                .map((item, index) => {
                  return (
                    <NavLink to={`/product/${item.id}`}>
                      <img
                        className="w-40 h-56 object-cover rounded-xl cursor-pointer"
                        src={item.product_image1}
                        alt="gallery"
                        key={index}
                      ></img>
                    </NavLink>
                  );
                })}
          </div>
        </section>
      ) : (
        <div className="flex justify-center items-center h-screen w-full text-white">
          <p className="mt-10">No products at the moment</p>
        </div>
      )}
    </div>
  );
};

export default Products;
