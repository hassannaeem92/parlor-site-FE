import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getOrders } from "../../../store/AsynMethod/OrderMethod";
import { Table, Alert } from "react-bootstrap";
import "../../../styles/MyOrders.css";

function MyOrders(props) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.AuthReducers);
  const { allOrders } = useSelector((state) => state.OrderReducer);
  useEffect(() => {
    dispatch(getOrders(user.id));
    console.log("user", user);
    console.log("order", allOrders);
  }, []);
  useEffect(() => {
    console.log("order", allOrders);
  }, [allOrders]);

  return (
    <div className="container py-5">
      <h1>My Orders</h1>
      <div className="order-history">
        {allOrders?.length < 0 ? (
          <Alert variant="info">Loading order history...</Alert>
        ) : (
          <Table id="table" striped bordered hover>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Date</th>
                <th>Total</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {allOrders.map((order) => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{formatDate(order.created_at)}</td>
                  <td>{order.total_amount}</td>
                  <td
                    className={
                      order.status === "proceed"
                        ? "text-success"
                        : order.status === "pending"
                        ? "text-warning"
                        : "text-danger"
                    }
                  >
                    {order.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </div>
    </div>
  );
  function formatDate(date) {
    const datetime = new Date(date);
    return datetime.toLocaleString();
  }
}

export default MyOrders;
