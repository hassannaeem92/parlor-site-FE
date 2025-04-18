import React, { useEffect, useState } from "react";
import classNames from "classnames";
import image from "../assets/images/productImage.webp";
import "../styles/EShopCard.scss";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  addItemToCart,
  decreaseUserCartItemQty,
  removeUserCartItem,
} from "../store/AsynMethod/CartMethod";

const cartAnimation = (event) => {
  const getClosest = function (elem, selector) {
    for (; elem && elem !== document; elem = elem.parentNode) {
      if (elem.matches(selector)) return elem;
    }
    return null;
  };

  // start animation block
  let imgToDrag = getClosest(event.target, ".EShopCard");

  if (!imgToDrag) return;

  let viewCart = document.getElementsByClassName("sideBarOffCanvasStyle")[0];
  let imgToDragImage = imgToDrag.querySelector(".img-fluid");

  let disLeft = imgToDrag.getBoundingClientRect().left;
  let disTop = imgToDrag.getBoundingClientRect().top;
  let cartLeft = viewCart.getBoundingClientRect().left;
  let cartTop = viewCart.getBoundingClientRect().top;
  let image = imgToDragImage.cloneNode(true);
  image.style =
    "z-index: 11111; width: 100px;opacity:1; position:fixed; top:" +
    disTop +
    "px;left:" +
    disLeft +
    "px;transition: left 1s, top 1s, width 1s, opacity 1s cubic-bezier(1, 1, 1, 1);border-radius: 50px; overflow: hidden; box-shadow: 0 21px 36px rgba(0,0,0,0.1)";
  var reChange = document.body.appendChild(image);
  setTimeout(function () {
    image.style.left = cartLeft + "px";
    image.style.top = cartTop + "px";
    image.style.width = "40px";
    image.style.opacity = "0";
  }, 200);
  setTimeout(function () {
    reChange.parentNode.removeChild(reChange);
  }, 1000);
  // End Animation Block
};

function EShopCard({ product, varient }) {
  const [quantity, setQuantity] = useState(0);
  const { user } = useSelector((state) => state.AuthReducers);
  const { cartItem } = useSelector((state) => state.CartReducers);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAdd = (productId, varientId, quantity, totalQuantity, e) => {
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
          ).then((success) => success && cartAnimation(e))
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

  const addToCartClasses = classNames("addToCart", {
    buttonActive: quantity >= 1,
  });

  const isProductInCart = cartItem?.find(
    (item) =>
      item?.product_id === product?.id &&
      item?.varient_id === product?.varients[varient]?.varient_id
  );

  const renderVariantDetails = () => {
    if (product?.varients && product.varients[varient]) {
        const variant = product.varients[varient];
        const options = JSON.parse(variant.options);
        const variantValues = JSON.parse(variant.varient_values);

        return options.map((option, index) => (
            <span key={option} className="variant-detail me-3">
                {capitalizeFirstLetter(option)}: {capitalizeFirstLetter(variantValues[index].value)} {/* Capitalize first letter */}
            </span>
        ));
    }
    return null;
};

  const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
};

  console.log("Product:", product);

  return (
    <div>
      <div>
        <div className={"EShopCard"}>
          <div
            className={`bg-white p-3 rounded-2 position-relative ${addToCartClasses}`}
          >
            <Link
              to={`/product-details/${product?.id}/${varient}`}
              className={"text-decoration-none"}
              onClick={() => {
                console.log("Link clicked in EShopCard", product?.id, varient);
              }}
            >
              {product?.varients[varient]?.discount > 0 && (
                <div className={"position-absolute tag"}>
                  RS{" "}
                  {product?.varients[varient]?.discount?.toLocaleString(
                    "en-IN"
                  )}
                </div>
              )}
              <div
                className={
                  "image py-4 text-center d-flex align-items-center justify-content-center"
                }
                style={{ height: "200px" }}
              >
                <img
                  className={"img-fluid"}
                  src={
                    product?.all_images?.length > 0
                      ? product?.image_path + product?.all_images[0]?.image
                      : image
                  }
                  alt={"Product"}
                  style={{ maxHeight: "100%", objectFit: "contain" }}
                />
              </div>
              <div className={"price"}>
                {product?.varients[varient]?.discount > 0 ? (
                  <>
                    <span className={"pe-2"}>
                      RS{" "}
                      {(
                        product?.varients[varient]?.price -
                        product?.varients[varient]?.discount
                      )?.toLocaleString("en-IN")}
                    </span>
                    <span className="text-decoration-line-through">
                      RS{" "}
                      {product?.varients[varient]?.price?.toLocaleString(
                        "en-IN"
                      )}
                    </span>
                  </>
                ) : (
                  <span>
                    RS{" "}
                    {product?.varients[varient]?.price?.toLocaleString("en-IN")}
                  </span>
                )}
              </div>
              <div className={"title py-1"}>{product?.title}</div>
              <div className="variant-details mb-3">
                {renderVariantDetails()}
              </div>
            </Link>
            <div
              className={`addToCart d-flex justify-content-between align-items-center my-2 rounded ${addToCartClasses}`}
            >
              {!isProductInCart ? (
                product?.varients[varient]?.quantity > 0 ? (
                  <div
                    onClick={(e) =>
                      user
                        ? handleAdd(
                            product?.id,
                            product?.varients[varient]?.varient_id,
                            1,
                            product?.varients[varient]?.quantity,
                            e
                          )
                        : navigate("/login")
                    }
                    className={"text-center w-100 text rounded-sm py-2"}
                  >
                    Add
                  </div>
                ) : (
                  <div className={"text-center w-100 text rounded-sm py-2"}>
                    Out of Stock
                  </div>
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
                  <div className={`text `}>
                    {isProductInCart?.quantity || 1}
                  </div>
                  <button
                    className={"bg-transparent border-0 text-white buttonCart"}
                    onClick={() =>
                      user
                        ? handleAdd(
                            product?.id,
                            product?.varients[varient]?.varient_id,
                            1,
                            product?.varients[varient]?.quantity
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
        </div>
      </div>
    </div>
  );
}

export default EShopCard;
