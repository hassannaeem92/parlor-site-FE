import React, { useEffect } from "react";
import FaqsSingle from "./includes/FaqsSingle.jsx";
import BreadCrum from "../../components/BreadCrum.jsx";
import { useDispatch } from "react-redux";
import { getFAQs } from "../../store/AsynMethod/InfoPageMethod.js";

function Faqs() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFAQs());
  }, []);
  return (
    <>
      <FaqsSingle />
    </>
  );
}

export default Faqs;
