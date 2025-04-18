import React, { useEffect, useState } from "react";

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/esm/Button";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { paymentVerfication } from "../store/AsynMethod/CheckoutMethod";
import { useNavigate } from "react-router-dom";

export default function PaymentVerificationModal({
  paymentVerificationShow,
  setPaymentVerificationShow,
  paymentOrderId,
  setPaymentOrderId,
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      otp: "",
      orderId: "",
    },
    validationSchema: Yup.object({
      otp: Yup.string()
        .required("OTP is required")
        .matches(/^\d{6}$/, "OTP must be a 6-digit number"),
      orderId: Yup.number().required("Order is required"),
    }),

    onSubmit: async (data) => {
      dispatch(paymentVerfication(data)).then((success) => {
        if (success) {
          setPaymentVerificationShow(false);
          setPaymentOrderId(null);
          navigate("/");
        }
      });
    },
  });

  useEffect(() => {
    if (paymentOrderId) {
      formik.setFieldValue("orderId", paymentOrderId);
    }
  }, [paymentOrderId]);

  return (
    <Modal
      show={paymentVerificationShow}
      onHide={() => setPaymentVerificationShow(false)}
      aria-labelledby="contained-modal-title-vcenter"
    >
      <Modal.Header closeButton className="p-0">
        <Modal.Title id="contained-modal-title-vcenter">
          Payment Verification
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="grid-example p-1.5">
        <div>
          <label className={"form-label mb-1"}>Enter OTP</label>
          <input
            name="otp"
            className={"form-control form-control-lg"}
            value={formik.values.otp}
            onChange={formik.handleChange}
          />
          {formik.errors?.otp && (
            <div className=" text-danger">{formik.errors?.otp}</div>
          )}
        </div>
      </Modal.Body>
      <Modal.Footer className="p-0">
        <Button
          className="bg-danger border-0"
          onClick={() => setPaymentVerificationShow(false)}
        >
          Cancel Order
        </Button>
        <Button onClick={formik.handleSubmit}>Verify OTP</Button>
      </Modal.Footer>
    </Modal>
  );
}
