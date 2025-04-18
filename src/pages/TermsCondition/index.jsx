import React, { useEffect } from "react";
import BreadCrum from "../../components/BreadCrum";
import TermsContent from "./includes/TermsContent";
import { useDispatch } from "react-redux";
import { getTerms } from "../../store/AsynMethod/InfoPageMethod";

function TermsCondition() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTerms());
  }, []);

  return (
    <>
      <TermsContent />
    </>
  );
}

export default TermsCondition;
