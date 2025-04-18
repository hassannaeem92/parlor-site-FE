import React, { useState } from "react";
import classNames from "classnames";
import { CiHeart } from "react-icons/ci";
import "../../../styles/ProductDetailContent.scss";
import { FaStar } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addItemToCart,
  decreaseUserCartItemQty,
} from "../../../store/AsynMethod/CartMethod";
import { toast } from "react-toastify";

function ProductDetailContent({ product, varientId }) {
  const [quantity, setQuantity] = useState(0);
  const { cartItem } = useSelector((state) => state.CartReducers);
  const { user } = useSelector((state) => state.AuthReducers);
  const [isExpanded, setIsExpanded] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toggleReadMore = () => {
    setIsExpanded(!isExpanded);
  };

  const truncateText = (text) => {
    if (text?.length <= 60) {
      return text;
    }
    return `${text?.substring(0, 60)}...`;
  };

  const handleAdd = (productId, varientId, quantity, totalQuantity) => {
    console.log(productId, varientId, quantity, totalQuantity);
    if (productId && varientId && quantity && user?.id) {
      isProductInCart?.quantity && setQuantity(isProductInCart?.quantity);
      !isProductInCart
        ? dispatch(
            addItemToCart({
              product: productId,
              varient: varientId,
              qty: quantity,
              user: user?.id,
            })
          )
        : isProductInCart?.quantity < totalQuantity
        ? dispatch(
            addItemToCart({
              product: productId,
              varient: varientId,
              qty: quantity,
              user: user?.id,
            })
          )
        : toast.error(
            "Unfortunately it is out of stock please consider other options"
          );
    }
  };

  const renderVariantDetails = () => {
    if (product?.varients && product.varients.length > 0) {
      const variant = product.varients[varientId];
      const options = JSON.parse(variant.options);
      const variantValues = JSON.parse(variant.varient_values);

      return (
        <div className="d-flex flex-wrap">
          {options.map((option, index) => (
            <span key={option} className="me-3 mb-2">
              <strong>{capitalizeFirstLetter(option)}:</strong>{" "}
              {capitalizeFirstLetter(variantValues[index].value)}{" "}
              {/* Capitalize first letter */}
            </span>
          ))}
        </div>
      );
    }
    return null;
  };

  // Helper function to capitalize the first letter of a string
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  };

  const addToCartClasses = classNames("addToCart", {
    buttonActive: quantity >= 1,
  });

  const isProductInCart = cartItem?.find(
    (item) =>
      item?.product_id === product?.id &&
      item?.varient_id === product?.varients[varientId]?.varient_id
  );

  console.log("Product:", product);

  return (
    <div className={"ProductDetailContent"}>
      <div
        className={
          "d-flex align-items-center justify-content-between titleWrapper pb-4"
        }
      >
        <span className={"title h3 mb-0"}>{product?.title}</span>
        <span
          className={
            "wishlist rounded-circle border d-flex align-items-center justify-content-center"
          }
        >
          <CiHeart />
        </span>
      </div>

      {/* Variant details */}
      <div className="variant-details mb-3">{renderVariantDetails()}</div>

      <div
        className={
          "d-flex align-items-center justify-content-between ratingWrapper pb-4"
        }
      >
        {/* Rating content (if needed) */}
      </div>

      <div onClick={toggleReadMore} className={"content"}>
        {isExpanded ? product?.description : truncateText(product?.description)}
        <p className=" font-bold">
          {product?.description?.length >= 60
            ? isExpanded
              ? "Less"
              : "Read More"
            : null}
        </p>
      </div>

      <div className={"row mx-0 align-items-center pt-5"}>
        <div className={"col-8 px-0"}>
          <div
            className={`addToCart d-flex justify-content-between align-items-center rounded ${addToCartClasses}`}
          >
            {!isProductInCart ? (
              product?.varients[varientId]?.quantity > 0 ? (
                <div
                  onClick={() =>
                    user
                      ? handleAdd(
                          product?.id,
                          product?.varients[varientId]?.varient_id,
                          1,
                          product?.varients[varientId]?.quantity
                        )
                      : navigate("/login")
                  }
                  className={"text-center w-100 Addtext"}
                >
                  Add To Cart
                </div>
              ) : (
                <div className={"text-center w-100 Addtext"}>Out of Stock</div>
              )
            ) : (
              <React.Fragment>
                <button
                  className={"bg-transparent border-0 text-white buttonCart"}
                  onClick={() =>
                    dispatch(decreaseUserCartItemQty(isProductInCart?.id))
                  }
                >
                  -
                </button>
                <div className={`text `}>{isProductInCart?.quantity || 1}</div>
                <button
                  className={"bg-transparent border-0 text-white buttonCart"}
                  onClick={() =>
                    user
                      ? handleAdd(
                          product?.id,
                          product?.varients[varientId]?.varient_id,
                          1,
                          product?.varients[varientId]?.quantity
                        )
                      : navigate("/login")
                  }
                >
                  +
                </button>
              </React.Fragment>
            )}
          </div>
        </div>
        <div className={"col-4"}>
          <div className={"text-center"}>
            <span>
              {product?.varients[varientId]?.quantity} pieces available
            </span>
          </div>
        </div>
      </div>
      <div
        className={
          "price py-4 d-flex align-items-center justify-content-between "
        }
      >
        <div className={" d-flex align-items-center gap-2"}>
          <span className={"discountPrice h1 mb-0"}>
            RS{" "}
            {(
              product?.varients[varientId]?.price -
              (product?.varients[varientId]?.discount || 0)
            )?.toLocaleString("en-IN")}
          </span>
          {product?.varients[varientId]?.discount > 0 &&
            product?.varients[varientId]?.price !==
              product?.varients[varientId]?.price -
                product?.varients[varientId]?.discount && (
              <span className={"actualPrice"}>
                RS{" "}
                {product?.varients[varientId]?.price?.toLocaleString("en-IN")}
              </span>
            )}
        </div>
        <div className="viewCart">
          <Link to={"/checkout"} className={"w-100 py-2 btn"}>
            CheckOut
          </Link>
        </div>
        <div className="viewCart">
          <Link to="/#productList" className={"w-100 py-2 btn"}>
            Continue Shopping
          </Link>
        </div>
      </div>

      <div className={"category d-flex align-items-center gap-3 pt-4"}>
        <h6 className={"mb-0"}>Categories</h6>
        <div className={"d-flex align-items-center gap-2 flex-wrap"}>
          <span>{product?.category_name}</span>
          <span>{product?.sub_category_name}</span>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailContent;
