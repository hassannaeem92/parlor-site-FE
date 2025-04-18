import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import { HiMiniShoppingCart } from "react-icons/hi2";
import { RxCross2 } from "react-icons/rx";
import { GiShoppingBag } from "react-icons/gi";
import "../styles/CheckOutSidebar.scss";
import image from "../assets/images/productImage.webp";
import { useDispatch, useSelector } from "react-redux";
import {
  decreaseUserCartItemQty,
  getUserCartItem,
  increaseUserCartItemQty,
  removeUserCartItem,
} from "../store/AsynMethod/CartMethod";
import { useNavigate } from "react-router-dom";

function CheckOutSidebar() {
  const [show, setShow] = useState(false);
  const { cartItem } = useSelector((state) => state.CartReducers);
  const { user } = useSelector((state) => state.AuthReducers);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [items, setItems] = useState([]);

  //   [
  //     { id: 1, title: "Dates Dates Dates", price: 8.0, quantity: 1 },
  //     { id: 2, title: "Dates Dates Dates", price: 8.0, quantity: 1 },
  //     { id: 3, title: "Dates Dates Dates", price: 8.0, quantity: 1 },
  //     { id: 4, title: "Dates Dates Dates", price: 8.0, quantity: 1 },
  //     { id: 5, title: "Dates Dates Dates", price: 8.0, quantity: 1 },
  //     // Add more items as needed
  //   ]

  useEffect(() => {
    setItems(cartItem);
  }, [cartItem]);

  useEffect(() => {
    if (user) {
      dispatch(getUserCartItem());
    }
  }, []);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const incrementQuantity = (itemId) => {
    dispatch(increaseUserCartItemQty(itemId));
  };

  const decrementQuantity = (itemId) => {
    dispatch(decreaseUserCartItemQty(itemId));
  };

  const removeItem = (itemId) => {
    debugger
    dispatch(removeUserCartItem(itemId));
  };

  // item?.variant?.discount
  const totalPrice = items.reduce(
    (total, item) =>
      total + (item?.price) * item.numberOfPerson,
    0
  );

  const increaeDealPerson = (deal) => {
    dispatch(increaseUserCartItemQty(deal));
  };

  return (
    <>
      <div className={"sideBarOffCanvasStyle"}>
        <Button
          className={"rounded cartBtn py-3"}
          variant={"primary"}
          onClick={handleShow}
          placement={"end"}
        >
          <span className={"d-flex align-items-center gap-2 pb-2"}>
            <HiMiniShoppingCart /> {items?.length} Deal
          </span>
          <span className={"bg-white rounded"}>
            RS {totalPrice.toLocaleString("en-IN")}
          </span>
        </Button>

        <Offcanvas
          show={show}
          onHide={handleClose}
          placement="end"
          className={"p-0"}
        >
          <Offcanvas.Header className={"SideHeader p-3"} closeButton>
            <Offcanvas.Title>
              <div className={"d-flex gap-2 align-items-center"}>
                <GiShoppingBag /> <span>{items?.length} Deal</span>
              </div>
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body className={"Sidebody p-0"}>
            {items.map((item) => (
              <div
                key={item.dealId}
                className="d-flex align-items-center justify-content-between singleItem p-3"
              >
                <div className={"d-flex align-items-center first gap-2"}>
                  <div>
                    <div
                      className={
                        "d-flex align-items-center flex-column justify-content-center bg-light rounded-pill px-2 gap-2"
                      }
                    >
                      <button
                        className={"border-0"}
                        onClick={() => increaeDealPerson(item)}
                      >
                        +
                      </button>
                      <span>{item?.numberOfPerson}</span>
                      <button
                        className={"border-0"}
                        onClick={() => dispatch(decreaseUserCartItemQty(item.dealId))}
                      >
                        -
                      </button>
                    </div>
                  </div>
                  {/* <div className={"image"}>
                    <img
                      className={"img-fluid"}
                      src={item?.image_path + item?.product_img?.image}
                      alt={`Deal ${item.dealId}`}
                    />
                  </div> */}
                    <div className={"dealName pe-5"}>
                       {item?.name}
                       
                  </div>
                  <div className={"mainArea"}>
                    <div className={"title pb-1"}>{item?.product?.title}</div>
                    <div className={"price pb-1"}>
                      RS {item?.price?.toLocaleString("en-IN")}
                    </div>
                    {/* <div className={"subTitle pb-1"}>
                      RS {item?.discount?.toLocaleString("en-IN")} OFF
                    </div> */}
                  </div>
                </div>
                <div className={"d-flex align-items-center gap-2 second"}>
                  <div className={"price"}>
                    RS{' '}
                    {(
                      (item?.price) *
                      // (item?.price - item?.variant?.discount) *
                      item?.numberOfPerson
                    ).toLocaleString("en-IN")}
                  </div>
                  <span
                    className={
                      "rounded-circle d-flex align-items-center justify-content-center"
                    }
                    onClick={() => removeItem(item.dealId)}
                  >
                    <RxCross2 />
                  </span>
                </div>
              </div>
            ))}
          </Offcanvas.Body>
          <div
            className={
              "position-absolute bottom-0 w-100 checkoutBtn bg-white p-3"
            }
          >
            <button
              className={
                "btn d-flex align-items-center justify-content-between w-100 rounded-pill"
              }
              onClick={() => {
                navigate("/checkout");
                window.scrollTo(0, 0);
              }}
            >
              <span>Checkout</span>
              <span className={"bg-white rounded-pill"}>
                RS {totalPrice?.toLocaleString("en-IN")}
              </span>
            </button>
          </div>
        </Offcanvas>
      </div>
    </>
  );
}

export default CheckOutSidebar;
