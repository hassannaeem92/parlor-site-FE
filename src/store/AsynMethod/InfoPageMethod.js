import backendVerifiedUser from "../../api/backendVerifiedUser";
import { CLOSE_LOADER, SET_ERROR, SET_LOADER } from "../Types/AuthTypes";
import {
  SET_FAQS,
  SET_REFUND_POLICY,
  SET_TERMS_CONDITIONS,
} from "../Types/InfoPageTypes";

export const getFAQs = () => {
  return async (dispatch) => {
    dispatch({ type: SET_LOADER });
    try {
      const response = await backendVerifiedUser.get(`/get-faqs`);

      dispatch({ type: CLOSE_LOADER });

      dispatch({ type: SET_FAQS, payLoad: response.data });
    } catch (err) {
      dispatch({ type: CLOSE_LOADER });
      console.log(err);
      dispatch({
        type: SET_ERROR,
        payLoad: err.response?.data?.error?.msg,
      });
    }
  };
};
export const getTerms = () => {
  return async (dispatch) => {
    dispatch({ type: SET_LOADER });
    try {
      const response = await backendVerifiedUser.get(`/get-terms`);

      dispatch({ type: CLOSE_LOADER });

      dispatch({ type: SET_TERMS_CONDITIONS, payLoad: response.data });
    } catch (err) {
      dispatch({ type: CLOSE_LOADER });
      console.log(err);
      dispatch({
        type: SET_ERROR,
        payLoad: err.response?.data?.error?.msg,
      });
    }
  };
};
export const getPolicies = () => {
  return async (dispatch) => {
    dispatch({ type: SET_LOADER });
    try {
      const response = await backendVerifiedUser.get(`/get-policies`);

      dispatch({ type: CLOSE_LOADER });

      dispatch({ type: SET_REFUND_POLICY, payLoad: response.data });
    } catch (err) {
      dispatch({ type: CLOSE_LOADER });
      console.log(err);
      dispatch({
        type: SET_ERROR,
        payLoad: err.response?.data?.error?.msg,
      });
    }
  };
};
