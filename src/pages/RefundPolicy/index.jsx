import React, { useEffect } from "react";
import BreadCrum from "../../components/BreadCrum.jsx";
import RefundContent from "./includes/RefundContent.jsx";
import { useDispatch } from "react-redux";
import { getPolicies } from "../../store/AsynMethod/InfoPageMethod";

export default function RefundPolicy() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPolicies());
  }, []);
  return (
    <>
      <RefundContent />
    </>
  );
}
