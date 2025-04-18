import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

function CashPaymentModal({ show, onHide, totalAmount, onPaymentComplete }) {
  const [paidAmount, setPaidAmount] = useState("");

  console.log("CashPaymentModal rendered, show:", show);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting cash payment");
    if (parseFloat(paidAmount) >= totalAmount) {
      onPaymentComplete();
    } else {
      alert("Please enter the full amount.");
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Cash on Delivery</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Total Amount Due</Form.Label>
            <Form.Control
              type="text"
              value={`RS ${totalAmount.toLocaleString("en-IN")}`}
              readOnly
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Enter Paid Amount</Form.Label>
            <Form.Control
              type="number"
              step="0.01"
              value={paidAmount}
              onChange={(e) => setPaidAmount(e.target.value)}
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="w-100">
            Complete Payment
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default CashPaymentModal;
