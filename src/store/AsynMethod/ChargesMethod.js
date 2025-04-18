import backendVerifiedUser from "../../api/backendVerifiedUser";
import { CLOSE_LOADER, SET_ERROR, SET_LOADER } from "../Types/AuthTypes";
import { SET_CHARGES } from "../Types/ChargesTypes";

export const getCharges = () => {
  return async (dispatch) => {
    dispatch({ type: SET_LOADER });
    try {
      const response = await backendVerifiedUser.get(`/get-charges`);

      dispatch({ type: CLOSE_LOADER });

      dispatch({ type: SET_CHARGES, payLoad: response.data });
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
