import backendValidUser from "../../api/backendVerifiedUser";
import {
  CLOSE_LOADER,
  SET_ERROR,
  SET_LOADER,
  SET_SUCCESS,
} from "../Types/AuthTypes";

export const checkoutOrder = (data) => {
  return async (dispatch) => {
    dispatch({ type: SET_LOADER });
    try {
      const response = await backendValidUser.post(`/checkout-user-order`, {
        data,
      });
      dispatch({ type: CLOSE_LOADER });

      // Remove this line to get rid of the toast
      // dispatch({ type: SET_SUCCESS, payLoad: response.data.success.msg });

      return {
        res: true,
        orderId: response.data.success.orderId,
        paymentLinkToken: response.data.success.paymentLinkToken,
      };
    } catch (err) {
      dispatch({ type: CLOSE_LOADER });
      console.log(err);
      dispatch({
        type: SET_ERROR,
        payLoad: err.response?.data?.error?.msg,
      });
    }
    return false;
  };
};

export const paymentVerfication = (data) => {
  return async (dispatch) => {
    dispatch({ type: SET_LOADER });
    try {
      const response = await backendValidUser.post(`/verify-payment`, data);
      dispatch({ type: CLOSE_LOADER });

      dispatch({ type: SET_SUCCESS, payLoad: response.data.success.msg });

      return true;
    } catch (err) {
      dispatch({ type: CLOSE_LOADER });
      console.log(err);
      dispatch({
        type: SET_ERROR,
        payLoad: err.response?.data?.error?.msg,
      });
    }
    return false;
  };
};
