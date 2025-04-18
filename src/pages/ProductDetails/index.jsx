import React, { useEffect } from "react";
import ProductSlider from "./includes/ProductSlider.jsx";
import ProductDetailContent from "./includes/ProductDetailContent.jsx";
import ProductDescription from "./includes/ProductDescription.jsx";
import { useParams } from "react-router-dom";
import { getspecificProduct } from "../../store/AsynMethod/ProductMethod.js";
import { RESET_SPECIFIC_PRODUCT } from "../../store/Types/ProductTypes.js";
import { useDispatch, useSelector } from "react-redux";
import { ProgressSpinner } from "primereact/progressspinner";

export default function ProductDetails() {
  const { productId, varientId } = useParams();
  const { specificProduct } = useSelector((state) => state.ProductReducers);
  const dispatch = useDispatch();

  useEffect(() => {
    if (productId) {
      dispatch(getspecificProduct(productId));
    } else {
      dispatch({ type: RESET_SPECIFIC_PRODUCT });
    }
  }, [productId, varientId]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!specificProduct) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <ProgressSpinner />
      </div>
    );
  }

  return (
    <div>
      <div className={"ProductDetailLayout"}>
        <div className={"container my-5"}>
          <div className={"bg-white rounded-3 shadow p-4"}>
            <div className={"row mx-0"}>
              <div className="col-lg-6 mb-3">
                <ProductSlider
                  images={specificProduct?.all_images}
                  path={specificProduct?.image_path}
                />
              </div>
              <div className="col-lg-6 mb-3">
                <ProductDetailContent
                  varientId={varientId}
                  product={specificProduct}
                />
              </div>
            </div>
            <div className={"row mx-0"}>
              <div className={"col-lg-12"}>
                <ProductDescription product={specificProduct} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
