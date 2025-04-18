import backendVerifiedUser from "../../api/backendVerifiedUser";
import { CLOSE_LOADER, SET_ERROR, SET_LOADER } from "../Types/AuthTypes";
import { SET_ORDERS } from "../Types/OrderTypes";

export const getOrders = (id) => {
  return async (dispatch) => {
    dispatch({ type: SET_LOADER });
    try {
      const response = await backendVerifiedUser.get(`/get-user-orders/${id}`);

      dispatch({ type: CLOSE_LOADER });

      dispatch({ type: SET_ORDERS, payLoad: response.data });
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
