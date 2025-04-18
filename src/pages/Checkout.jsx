import "../styles/checkout.scss";
import "react-phone-number-input/style.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import React, { useEffect, useState, useRef } from "react";
import PhoneInput from "react-phone-number-input";
import { RxCross2 } from "react-icons/rx";
import CashPaymentModal from "../components/CashPaymentModal";
import { ImPencil } from "react-icons/im";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserCartItem } from "../store/AsynMethod/CartMethod";
import { useFormik } from "formik";
import * as Yup from "yup";
import { checkoutOrder } from "../store/AsynMethod/CheckoutMethod";
import CardPaymentModal from "../components/CardPaymentModal";
import PaymentVerificationModal from "../components/PaymentVerificationModal";
import { getCharges } from "../store/AsynMethod/ChargesMethod";
import { removeAllCartItems, clearCart } from "../store/AsynMethod/CartMethod";
import { toast } from "react-toastify";
import { getspecificUser } from "../store/AsynMethod/UserMethod";

function Checkout() {
  const [show, setShow] = useState(false);
  const [addressType, setAddressType] = useState("billing");
  const [name, setName] = useState(false);
  const { cartItem } = useSelector((state) => state.CartReducers);
  const { charges } = useSelector((state) => state.ChargesReducer);
  const { user } = useSelector((state) => state.AuthReducers);
  const { specificUser } = useSelector((state) => state.UserReducer);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleClose1 = () => setShow(false);
  const handleShow1 = () => setShow(true);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showCashModal, setShowCashModal] = useState(false);
  const [showPhoneModal, setShowPhoneModal] = useState(false);
  const [paymentModalShow, setPaymentModalShow] = useState(false);
  const [paymentVerificationShow, setPaymentVerificationShow] = useState(false);
  const [paymentOrderId, setPaymentOrderId] = useState(null);
  const [isPaid, setIsPaid] = useState(false);
  const [isCOD, setIsCOD] = useState(false);

  const [value, setValue] = useState("");
  const [submitData, setSubmitData] = useState(null);

  const handlePhoneClose = () => setShowPhoneModal(false);
  const handlePhoneShow = () => setShowPhoneModal(true);
  const handleNameShow = () => setName(true);

  const handleScroll = (e) => {
    e.preventDefault();
    navigate("/deals");

    setTimeout(() => {
      const elementPosition = productListRef.current.offsetTop;
      const offset = 1000;
      window.scrollTo({
        top: elementPosition + offset,
        behavior: "smooth",
      });
    }, 0);
  };

  useEffect(() => {
   
      // dispatch(getspecificUser(user?.id));
      dispatch(getUserCartItem());
      // dispatch(getCharges());
    
  }, []);
  // useEffect(() => {
  //   if (specificUser) {
  //     setValue(specificUser?.phone);
  //   }
  // }, [specificUser]);

  const totalPrice = cartItem.reduce(
    // (total, item) =>
    //   total + (item?.variant?.price - item?.variant?.discount) * item.quantity,
    (total, item) =>
      total + (item?.price) * item.numberOfPerson,
    0
  );

  const totalDiscount = cartItem.reduce(
    (total, item) => total + item?.variant?.discount,
    0
  );

  const totalSales = cartItem.reduce(
    (total, item) => total + item?.price,
    0
  );

  const totalPurchase = cartItem.reduce(
    (total, item) => total + item?.variant?.purchase_price,
    0
  );

  const handleCashPaymentComplete = () => {
    setIsCOD(true);
    formik.handleSubmit();
  };

  const renderVariantDetails = (item) => {
    if (item?.variant?.options) {
      const options = JSON.parse(item.variant.options);
      const variantValues = JSON.parse(item.variant.varient_values);

      return options.map((option, index) => (
        <span key={option} className="variant-detail me-2">
          {option}: {variantValues[index].value}
        </span>
      ));
    }
    return null;
  };

  const handlePlaceOrder = () => {
    if (cartItem.length > 0) {

      formik.submitForm();


      // console.log("Opening payment modal");
      // setShowPaymentModal(true);
    }
  };

  const handlePayWithCard = () => {
    formik.handleSubmit();
    setShowPaymentModal(false);
  };

  const handlePayWithCash = () => {
    console.log("Handling pay with cash");
    setShowPaymentModal(false);
    setShowCashModal(true);
  };

  const formik = useFormik({
    // initialValues: {
    //   orders: [],
    //   user: user?.id,
    //   totalAmount: 0,
    //   totalSales: 0,
    //   totalPurchase: 0,
    //   totalDiscount: 0,
    //   billingAddress: user?.billing_address1,
    //   name: '',
    //   shippingAddress: user?.billing_address1,
    //   phone: "",
    //   paymentMethod: "COD",
    // },


    initialValues: {
      totalAmount: 0,
      date: "",
      orders: [],
      totalSales: 0,
      billingAddress: "",  // ✅ Updated to match the form field name
      name: "",
      phone: "",
    },
    

    validationSchema: Yup.object({
      // orders: Yup.array().min(1, "No Item in cart").required("No Item in cart"),
      // user: Yup.string().required("User ID is required"),
      billingAddress: Yup.string().required("Billing address is required"),
      // shippingAddress: Yup.string().required("Shipping address is required"),
      phone: Yup.string().required("Phone number is required"),
    }),
    onSubmit: async (data) => {
      // const orderData = {
      //   ...data,
      //   orders: cartItem,
      //   totalAmount: totalPrice,
      //   totalSales: totalSales,
      //   totalPurchase: totalPurchase,
      //   totalDiscount: totalDiscount,
      //   type: isPaid ? "card" : isCOD ? "cod" : "paymob",
      //   paymentStatus: isCOD ? 0 : 1,
      // };

      const orderData = {
        ...data,
        orders: cartItem,
       
      };

      
      dispatch(checkoutOrder(orderData)).then((success) => {
        if (success?.res) {
          formik.resetForm();
          if (success?.paymentLinkToken) {
            dispatch(clearCart());
            navigate("/deals");
            // window.location.href = `https://pakistan.paymob.com/api/acceptance/iframes/182801?payment_token=${success?.paymentLinkToken}`;
          } else {
            dispatch(getUserCartItem()).then((success) => {
              if (success) {
                toast.success("Order Placed Successfully");
                console.log("toast");
                navigate("/deals");
              }
            });
          }
        }
      });
    },
  });
  // onSubmit: async (data) => {
  //   dispatch(checkoutOrder(data)).then((success) => {
  //     console.log(success);

  //     // setPaymentOrderId(success?.orderId);

  //     if (success?.res) {
  //       formik.resetForm();

  //       dispatch(getUserCartItem());

  //       window.location.href = `https://pakistan.paymob.com/api/acceptance/iframes/182801?payment_token=${success?.paymentLinkToken}`;

  //       // setPaymentModalShow(false);
  //     }
  //   });

  //   // setSubmitData(data);

  //   // setPaymentModalShow(true);
  // },
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const success = queryParams.get("success");

    if (success === "true") {
      setIsPaid(true);

      toast.success("Order Placed Successfully");
    } else if (success === "false") {
      toast.error("Something went wrong with Payment.");
    }
  }, [location]);

  useEffect(() => {
    if (cartItem?.length > 0) {
      formik.setFieldValue("orders", cartItem);
    }
  }, [cartItem]);
  useEffect(() => {
    if (isPaid) {
      const timer = setTimeout(() => {
        formik.handleSubmit();
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [isPaid]);

  useEffect(() => {
    if (value) {
      formik.setFieldValue("phone", value);
    }
  }, [value]);

  useEffect(() => {
    if (totalPrice) {
      formik.setFieldValue("totalAmount", totalPrice);
    }
  }, [totalPrice]);

  useEffect(() => {
    if (totalDiscount) {
      formik.setFieldValue("totalDiscount", totalDiscount);
    }
  }, [totalDiscount]);

  useEffect(() => {
    if (totalSales) {
      formik.setFieldValue("totalSales", totalSales);
    }
  }, [totalSales]);

  useEffect(() => {
    if (totalPurchase) {
      formik.setFieldValue("totalPurchase", totalPurchase);
    }
  }, [totalPurchase]);
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const success = queryParams.get("success");

    if (success === "true") {
      setIsPaid(true);
      toast.success("Order Placed Successfully");
    } else if (success === "false") {
      toast.error("Something went wrong with Payment.");
    }
  }, [location]);

  useEffect(() => {
    isPaid && formik.handleSubmit();
  }, [isPaid]);

  return (
    <div>
      <div className={"checkout"}>
        <div className={"container py-5"}>
          <div className={"row mx-0"}>
            {/* <div className={"col-lg-8"}>
              <div className={"bg-white p-4 mb-4"}>
                <div
                  className={
                    "d-flex align-items-center justify-content-between"
                  }
                >
                  <div className={"d-flex gap-3 align-items-center"}>
                    <span
                      className={
                        "d-flex align-items-center justify-content-center rounded-circle"
                      }
                    >
                      1
                    </span>
                    <span>Contact Number</span>
                  </div>
                  <div className={"update"}>
                    <span
                      className={"py-1 px-3 rounded"}
                      onClick={handlePhoneShow}
                    >
                      + Update Phone
                    </span>
                  </div>
                </div>
                <div
                  className={
                    "phoneNumber mt-4 border rounded disabled-phone-input"
                  }
                >
                  <PhoneInput
                    defaultCountry="US"
                    value={value}
                    onChange={setValue}
                  />
                </div>
                {formik.errors?.phone && (
                  <div className=" text-danger">{formik.errors?.phone}</div>
                )}
              </div>

              <div className={"bg-white p-4 mb-4"}>
                <div
                  className={
                    "d-flex align-items-center justify-content-between"
                  }
                >
                  <div className={"d-flex gap-3 align-items-center"}>
                    <span
                      className={
                        "d-flex align-items-center justify-content-center rounded-circle"
                      }
                    >
                      2
                    </span>
                    <span>Full Name</span>
                  </div>
                  <div className={"update"}>
                    <span
                      className={"py-1 px-3 rounded"}
                      onClick={() => {
                        setName("name");
                        handleNameShow();
                      }}
                    >
                      + Update
                    </span>
                  </div>
                </div>
                <div
                  className={
                    "mt-4 billingAddress rounded p-3 position-relative"
                  }
                >
                  <div className={"position-absolute"}>
                    <div
                      className={"editAddress d-flex align-items-center gap-2"}
                    >
                      <span
                        className={
                          "rounded-circle d-flex align-items-center justify-content-center"
                        }
                        onClick={() => {
                          setName("name");
                          handleShow1();
                        }}
                      >
                        <ImPencil />
                      </span>
                    </div>
                  </div>
                  <div className={"title pb-2"}>Name</div>
                  <div className={"text"}>{formik?.values?.name}</div>
                </div>
                {formik.errors?.name && (
                  <div className="text-danger">
                    {formik.errors?.name}
                  </div>
                )}
              </div>

              <div className={"bg-white p-4 mb-4"}>
                <div
                  className={
                    "d-flex align-items-center justify-content-between"
                  }
                >
                  <div className={"d-flex gap-3 align-items-center"}>
                    <span
                      className={
                        "d-flex align-items-center justify-content-center rounded-circle"
                      }
                    >
                      2
                    </span>
                    <span>Complete Address</span>
                  </div>
                  <div className={"update"}>
                    <span
                      className={"py-1 px-3 rounded"}
                      onClick={() => {
                        setAddressType("billing");
                        handleShow1();
                      }}
                    >
                      + Update
                    </span>
                  </div>
                </div>
                <div
                  className={
                    "mt-4 billingAddress rounded p-3 position-relative"
                  }
                >
                  <div className={"position-absolute"}>
                    <div
                      className={"editAddress d-flex align-items-center gap-2"}
                    >
                      <span
                        className={
                          "rounded-circle d-flex align-items-center justify-content-center"
                        }
                        onClick={() => {
                          setAddressType("billing");
                          handleShow1();
                        }}
                      >
                        <ImPencil />
                      </span>
                    </div>
                  </div>
                  <div className={"title pb-2"}>Billing</div>
                  <div className={"text"}>{formik?.values?.billingAddress}</div>
                </div>
                {formik.errors?.billingAddress && (
                  <div className="text-danger">
                    {formik.errors?.billingAddress}
                  </div>
                )}
              </div>
              <div className={"bg-white p-4 mb-4"}>
                <div
                  className={
                    "d-flex align-items-center justify-content-between"
                  }
                >
                  <div className={"d-flex gap-3 align-items-center"}>
                    <span
                      className={
                        "d-flex align-items-center justify-content-center rounded-circle"
                      }
                    >
                      3
                    </span>
                    <span>Shipping Address</span>
                  </div>
                  <div className={"update"}>
                    <span
                      className={"py-1 px-3 rounded"}
                      onClick={() => {
                        setAddressType("shipping");
                        handleShow1();
                      }}
                    >
                      + Update
                    </span>
                  </div>
                </div>
                <div
                  className={
                    "mt-4 billingAddress rounded p-3 position-relative"
                  }
                >
                  <div className={"position-absolute"}>
                    <div
                      className={"editAddress d-flex align-items-center gap-2"}
                    >
                      <span
                        className={
                          "rounded-circle d-flex align-items-center justify-content-center"
                        }
                        onClick={() => {
                          setAddressType("shipping");
                          handleShow1();
                        }}
                      >
                        <ImPencil />
                      </span>
                    </div>
                  </div>
                  <div className={"title pb-2"}>Shipping</div>
                  <div className={"text"}>
                    {formik?.values?.shippingAddress}
                  </div>
                </div>
                {formik.errors?.shippingAddress && (
                  <div className="text-danger">
                    {formik.errors?.shippingAddress}
                  </div>
                )}
              </div>


            </div> */}

<div className={"col-lg-8"}>
  {/* Contact Number */}
  <div className={"bg-white p-4 mb-4"}>
                <div
                  className={
                    "d-flex align-items-center justify-content-between"
                  }
                >
                  <div className={"d-flex gap-3 align-items-center"}>
                    <span
                      className={
                        "d-flex align-items-center justify-content-center rounded-circle"
                      }
                    >
                      1
                    </span>
                    <span>Contact Number</span>
                  </div>
                  <div className={"update"}>
                    <span
                      className={"py-1 px-3 rounded"}
                      onClick={handlePhoneShow}
                    >
                      + Update Phone
                    </span>
                  </div>
                </div>
                <div
                  className={
                    "phoneNumber mt-4 border rounded disabled-phone-input"
                  }
                >
                  <PhoneInput
                    defaultCountry="US"
                    value={value}
                    onChange={setValue}
                  />
                </div>
                {formik.errors?.phone && (
                  <div className=" text-danger">{formik.errors?.phone}</div>
                )}
              </div>

  {/* Full Name */}
  <div className={"bg-white p-4 mb-4"}>
    <div className={"d-flex align-items-center justify-content-between"}>
      <div className={"d-flex gap-3 align-items-center"}>
        <span className={"d-flex align-items-center justify-content-center rounded-circle"}>
          2
        </span>
        <span>Full Name</span>
      </div>
    </div>
    <div className={"mt-4 border rounded disabled-phone-input p-2"}>
      <input
        type="text"
        className="form-control border-0"
        value={formik.values.name}
        style={{ outline: "none", boxShadow: "none" }}
        onChange={formik.handleChange}
        name="name"
        placeholder="Enter your full name"
      />
    </div>
    {formik.errors?.name && <div className="text-danger">{formik.errors?.name}</div>}
  </div>

  {/* Complete Address */}
  <div className={"bg-white p-4 mb-4"}>
    <div className={"d-flex align-items-center justify-content-between"}>
      <div className={"d-flex gap-3 align-items-center"}>
        <span className={"d-flex align-items-center justify-content-center rounded-circle"}>
          3
        </span>
        <span>Complete Address</span>
      </div>
    </div>
    <div className={"mt-4 border rounded disabled-phone-input p-2"}>
      <textarea
        className="form-control border-0"
        rows="3"
        style={{ outline: "none", boxShadow: "none" }}
        value={formik.values.billingAddress}
        onChange={formik.handleChange}
        name="billingAddress"
        placeholder="Enter your complete address"
      />
    </div>
    {formik.errors?.billingAddress && <div className="text-danger">{formik.errors?.billingAddress}</div>}
  </div>

  {/* Date */}
  <div className={"bg-white p-4 mb-4"}>
    <div className={"d-flex align-items-center justify-content-between"}>
      <div className={"d-flex gap-3 align-items-center"}>
        <span className={"d-flex align-items-center justify-content-center rounded-circle"}>
          4
        </span>
        <span>Date</span>
      </div>
    </div>
    <div className={"mt-4 border rounded disabled-phone-input p-2"}>
      <input
        type="date"
        style={{ outline: "none", boxShadow: "none" }}
        className="form-control border-0"
        value={formik.values.date}
        onChange={formik.handleChange}
        name="date"
      />
    </div>
    {formik.errors?.date && <div className="text-danger">{formik.errors?.date}</div>}
  </div>
</div>




            <div className={"col-lg-4"}>
              <div className={"orderSummary"}>
                <div className="button-container">
                  <div className={"confirmPayment pb-3"}>
                    <Link
                      className={"btn w-100"}
                      to="/#deals"
                      onClick={handleScroll}
                    >
                      Continue Shopping
                    </Link>
                  </div>
                </div>
                <div className={"text-center h5"}>Your Order</div>
                {!isPaid ? (
                  <div className={"p-4"}>
                    <div className={"pb-4 border-bottom"}>
                      {cartItem && cartItem?.length > 0 ? (
                        cartItem.map((item, i) => (
                          <div key={item?.dealId} className={"productQuantity"}>
                            <span>{item?.numberOfPerson || 0}</span> x{" "}
                            <span className="product-title">
                              {item?.price}
                            </span>
                            <span className="variant-details ms-2">
                              {renderVariantDetails(item)}
                            </span>
                            <span className="product-price ms-2">
                              | RS{" "}
                              {(
                                // (item?.variant?.price -
                                //   item?.variant?.discount) *
                                (item?.price) *
                                item?.numberOfPerson
                              ).toLocaleString("en-IN")}
                            </span>
                          </div>
                        ))
                      ) : (
                        <div className="text-red-600 text-center">
                          Please add Deal in cart to continue with checkout!
                        </div>
                      )}
                    </div>
                    {formik.errors?.orders && (
                      <div className=" text-danger">
                        {formik.errors?.orders}
                      </div>
                    )}
                    <div className={"pt-4 price"}>
                      <div
                        className={
                          "total d-flex align-items-center justify-content-between pb-2"
                        }
                      >
                        <span>Sub Total</span>{" "}
                        <span>RS {totalPrice.toLocaleString("en-IN")}</span>
                      </div>
                      {/* <div
                      className={
                        "subTotal d-flex align-items-center justify-content-between pb-2"
                      }
                    >
                      <span>Tax</span>{" "}
                      <span>
                        RS{(charges?.tax_percentage / 100) * totalPrice}
                      </span>
                    </div> */}
                      {/* <div
                      className={
                        "estimated d-flex align-items-center justify-content-between pb-2"
                      }
                    >
                      <span>Estimated Shipping</span>{" "}
                      <span>RS{charges?.shipping_charges}</span>
                    </div> */}
                    </div>
                    <div
                      className={`confirmPayment pt-3 ${cartItem.length === 0 ? "disabled" : ""
                        }`}
                      onClick={handlePlaceOrder}
                    >
                      <Link
                        className={`btn w-100 ${cartItem.length === 0 ? "disabled-link" : ""
                          }`}
                      >
                        Place Order
                      </Link>
                    </div>
                  </div>
                ) : (
                  <p>Your order is placed</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal show={showPhoneModal} onHide={handlePhoneClose}>
        <Modal.Header className={"text-center border-0 mx-auto pb-0"}>
          <Modal.Title>Update Phone</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className={"row g-3"}>
            <div className={"col-md-12"}>
              <PhoneInput
                defaultCountry="US"
                value={value}
                onChange={setValue}
              />
            </div>
            <div className={"col-md-12 pt-2"}>
              <Button
                className={"btn w-100 updateBtn"}
                onClick={handlePhoneClose}
              >
                Update Phone Number
              </Button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
      <Modal
        show={showPaymentModal}
        onHide={() => setShowPaymentModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Select Payment Method</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-grid gap-2">
            <Button variant="primary" onClick={handlePayWithCard}>
              Pay with Card
            </Button>
            <Button variant="secondary" onClick={handleCashPaymentComplete}>
              Pay with Cash on Delivery
            </Button>
          </div>
        </Modal.Body>
      </Modal>
     
      <Modal
        show={show}
        onHide={handleClose1}
        centered
        className={"updateModal"}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            Update {addressType === "billing" ? "Billing" : "Shipping"} Address
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const newAddress = e.target.address.value.trim();

              if (!newAddress) {
                toast.error("Address cannot be empty");
                return;
              }

              if (addressType === "billing") {
                formik.setFieldValue("billingAddress", newAddress);
              } else {
                formik.setFieldValue("shippingAddress", newAddress);
              }
              handleClose1();
            }}
          >
            <div className="mb-3">
              <label htmlFor="address" className="form-label">
                Address
              </label>
              <input
                type="text"
                className="form-control"
                id="address"
                name="address"
                defaultValue={
                  addressType === "billing"
                    ? formik.values.billingAddress
                    : formik.values.shippingAddress
                }
                required
              />
            </div>
            <Button className="updateBtn btn" type="submit">
              Save Address
            </Button>
          </form>
        </Modal.Body>
      </Modal>

      <CardPaymentModal
        paymentModalShow={paymentModalShow}
        setPaymentModalShow={setPaymentModalShow}
        submitData={submitData}
        setSubmitData={setSubmitData}
        setPaymentVerificationShow={setPaymentVerificationShow}
        setPaymentOrderId={setPaymentOrderId}
      />

      <PaymentVerificationModal
        setPaymentVerificationShow={setPaymentVerificationShow}
        paymentVerificationShow={paymentVerificationShow}
        paymentOrderId={paymentOrderId}
        setPaymentOrderId={setPaymentOrderId}
      />

      {/* <CashPaymentModal
        show={showCashModal}
        onHide={() => setShowCashModal(false)}
        totalAmount={totalPrice}
        onPaymentComplete={handleCashPaymentComplete}
      /> */}
    </div>
  );
}

export default Checkout;
