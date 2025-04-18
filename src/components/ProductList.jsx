import React, { useEffect, useState } from "react";
import EShopCard from "./EShopCard";
import "../styles/ProductList.scss";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../store/AsynMethod/ProductMethod";
import { getUserCartItem } from "../store/AsynMethod/CartMethod";

// const products = [
//   { id: 1, name: "Apples", discountedPrice: "$1.60", originalPrice: "$2.00" },
//   { id: 2, name: "Apples", discountedPrice: "$1.60", originalPrice: "$2.00" },
//   { id: 3, name: "Apples", discountedPrice: "$1.60", originalPrice: "$2.00" },
//   { id: 4, name: "Apples", discountedPrice: "$1.60", originalPrice: "$2.00" },
//   { id: 5, name: "Bananas", discountedPrice: "$1.50", originalPrice: "$1.80" },
//   { id: 6, name: "Bananas", discountedPrice: "$1.50", originalPrice: "$1.80" },
//   { id: 7, name: "Bananas", discountedPrice: "$1.50", originalPrice: "$1.80" },
//   { id: 8, name: "Bananas", discountedPrice: "$1.50", originalPrice: "$1.80" },
//   { id: 9, name: "Bananas", discountedPrice: "$1.50", originalPrice: "$1.80" },
//   { id: 10, name: "Bananas", discountedPrice: "$1.50", originalPrice: "$1.80" },
//   { id: 11, name: "Bananas", discountedPrice: "$1.50", originalPrice: "$1.80" },
//   { id: 12, name: "Bananas", discountedPrice: "$1.50", originalPrice: "$1.80" },
//   // Add more products as needed
// ];

export default function ProductList({ searchedProduct }) {
  const [visibleProductsCount, setVisibleProductsCount] = useState(12);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.AuthReducers);
  const { products } = useSelector((state) => state.ProductReducers);
  const visibleProducts = products?.slice(0, visibleProductsCount);

  const filteredProducts = visibleProducts.filter((product) =>
    searchedProduct != ""
      ? product?.title.toLowerCase().includes(searchedProduct.toLowerCase())
      : true
  );
  const loadMoreProducts = () => {
    setVisibleProductsCount((prevCount) => prevCount + 12);
  };
  useEffect(() => {
    if (user) {
      dispatch(getUserCartItem());
    }
    dispatch(getProducts());
  }, []);

  return (
    <div
      key={`${searchedProduct}-${filteredProducts?.length}-${filteredProducts?.[0]?.category_name}-${filteredProducts?.[0]?.sub_category_name}`}
      className={"ProductList row mx-0"}
    >
      {filteredProducts.map((product) => {
        return product?.varients?.map((varient, index) => {
          return (
            <div key={varient?.varient_id} className={"col-lg-3 mb-3 "}>
              <EShopCard product={product} varient={index} />
            </div>
          );
        });
      })}

      <div className={"load-more text-center py-5"}>
        {visibleProducts?.length < 1 ? (
          <p>No products availabe at the moment</p>
        ) : searchedProduct != "" && filteredProducts?.length < 1 ? (
          <p>Please recheck that entered keyword have correct spell</p>
        ) : (
          visibleProductsCount <= products?.length && (
            <button className={"btn"} onClick={loadMoreProducts}>
              Load More
            </button>
          )
        )}
      </div>
    </div>
  );
}
