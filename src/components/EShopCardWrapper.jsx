import React from "react";
import EShopCard from "./EShopCard.jsx";
import ProductList from "./ProductList.jsx";

function EShopCardWrapper({ searchedProduct }) {
  return (
    <div>
      <ProductList searchedProduct={searchedProduct} />
    </div>
  );
}

export default EShopCardWrapper;
