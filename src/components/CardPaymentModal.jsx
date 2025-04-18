import React, { useState } from "react";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Cards from "react-credit-cards-2";
import "react-credit-cards-2/dist/es/styles-compiled.css";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/esm/Button";
import { useFormik } from "formik";
import * as Yup from "yup";
import { checkoutOrder } from "../store/AsynMethod/CheckoutMethod";
import { useDispatch } from "react-redux";
import { getUserCartItem } from "../store/AsynMethod/CartMethod";

export default function CardPaymentModal({
  paymentModalShow,
  setPaymentModalShow,
  submitData,
  setPaymentVerificationShow,
  setPaymentOrderId,
}) {
  const [focusedField, setFocusedField] = useState(null);
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      cardNumber: "",
      email: "",
      cvc: "",
      expiry: "",
      nameOnCard: "",
    },
    validationSchema: Yup.object({
      cardNumber: Yup.string().label("Card number").max(16).required(),
      email: Yup.string()
        .label("Email")
        .email("Invalid email address")
        .required(),
      cvc: Yup.string().label("CVC").min(3).max(4).required(),
      nameOnCard: Yup.string().label("Name").required(),
      expiry: Yup.string()
        .label("Expiry")
        .matches(/^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/, "Invalid expiry")
        .required(),
    }),

    onSubmit: async (data) => {
      dispatch(checkoutOrder(submitData, data)).then((success) => {
        setPaymentOrderId(success?.orderId);
        if (success?.res) {
          formik.resetForm();
          dispatch(getUserCartItem());
          setPaymentModalShow(false);
          setPaymentVerificationShow(true);
        }
      });
    },
  });

  const handleFocus = (fieldName) => {
    setFocusedField(fieldName);
  };

  return (
    <Modal
      show={paymentModalShow}
      onHide={() => setPaymentModalShow(false)}
      aria-labelledby="contained-modal-title-vcenter"
      size="xl"
    >
      <Modal.Header closeButton className="p-0">
        <Modal.Title id="contained-modal-title-vcenter">Payment</Modal.Title>
      </Modal.Header>
      <Modal.Body className="grid-example p-1.5">
        <Container>
          <Row>
            <Col xs={12} md={5}>
              <div className="flex items-center justify-center">
                <Cards
                  number={formik?.values?.cardNumber}
                  expiry={formik?.values?.expiry}
                  cvc={formik?.values?.cvc}
                  name={formik?.values?.nameOnCard}
                  focused={focusedField}
                />
              </div>
            </Col>
            <Col xs={12} md={7}>
              <div className={"row mx-0"}>
                <Row>
                  <Col xs={12} md={6}>
                    <div>
                      <label className={"form-label mb-1"}>Card Name</label>
                      <input
                        type={"text"}
                        name="nameOnCard"
                        className={"form-control form-control-lg"}
                        value={formik.values.nameOnCard}
                        onChange={formik.handleChange}
                        onFocus={() => handleFocus("name")}
                      />
                      {formik.errors?.nameOnCard && (
                        <div className=" text-danger">
                          {formik.errors?.nameOnCard}
                        </div>
                      )}
                    </div>
                  </Col>

                  <Col xs={12} md={6}>
                    <div>
                      <label className={"form-label mb-1"}>Email</label>
                      <input
                        name="email"
                        className={"form-control form-control-lg"}
                        value={formik.values.email}
                        onChange={formik.handleChange}
                      />
                      {formik.errors?.email && (
                        <div className=" text-danger">
                          {formik.errors?.email}
                        </div>
                      )}
                    </div>
                  </Col>

                  <Col xs={12} md={6}>
                    <div>
                      <label className={"form-label mb-1"}>Card Number</label>
                      <input
                        name="cardNumber"
                        className={"form-control form-control-lg"}
                        value={formik.values.cardNumber}
                        onChange={formik.handleChange}
                        onFocus={() => handleFocus("number")}
                        minLength={16}
                        maxLength={16}
                      />
                      {formik.errors?.cardNumber && (
                        <div className=" text-danger">
                          {formik.errors?.cardNumber}
                        </div>
                      )}
                    </div>
                  </Col>

                  <Col xs={12} md={6}>
                    <div>
                      <label className={"form-label mb-1"}>
                        Expiry (MM/YY)
                      </label>
                      <input
                        name="expiry"
                        className={"form-control form-control-lg"}
                        value={formik.values.expiry}
                        onChange={formik.handleChange}
                        onFocus={() => handleFocus("expiry")}
                      />
                      {formik.errors?.expiry && (
                        <div className=" text-danger">
                          {formik.errors?.expiry}
                        </div>
                      )}
                    </div>
                  </Col>

                  <Col xs={12} md={6}>
                    <div>
                      <label className={"form-label mb-1"}>CVC</label>
                      <input
                        name="cvc"
                        className={"form-control form-control-lg"}
                        value={formik.values.cvc}
                        onChange={formik.handleChange}
                        onFocus={() => handleFocus("cvc")}
                        minLength={3}
                        maxLength={4}
                      />
                      {formik.errors?.cvc && (
                        <div className=" text-danger">{formik.errors?.cvc}</div>
                      )}
                    </div>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </Container>
      </Modal.Body>
      <Modal.Footer className="p-0">
        <Button
          className="bg-danger border-0"
          onClick={() => setPaymentModalShow(false)}
        >
          Close
        </Button>
        <Button onClick={formik.handleSubmit}>Submit</Button>
      </Modal.Footer>
    </Modal>
  );
}
