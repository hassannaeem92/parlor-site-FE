import React from "react";
import EShopSideBar from "./EShopSideBar.jsx";
import EShopCardWrapper from "./EShopCardWrapper.jsx";
import "../styles/EShopLayout.scss";

function EShopLayout({ searchedProduct }) {
  return (
    <div className={"EShopLayout "}>
      <div className={"row mx-0"}>
        <div
          className={
            "col-lg-2 px-0 d-none d-md-none d-lg-block position-sticky top-0"
          }
        >
          <EShopSideBar />
        </div>

        <div id="productList" className={"col-lg-10 p-4"}>
          <EShopCardWrapper searchedProduct={searchedProduct} />
        </div>
      </div>
    </div>
  );
}

export default EShopLayout;
