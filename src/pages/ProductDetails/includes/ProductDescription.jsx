import React from "react";
import "../../../styles/ProductDescription.scss";

function ProductDescription({ product }) {
  console.log(product.description);
  return (
    <div className={"ProductDescription"}>
      <div className={"h4"}>Details</div>
      <div className={"description"}>{product?.description}</div>
    </div>
  );
}

export default ProductDescription;
