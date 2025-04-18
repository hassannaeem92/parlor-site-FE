import { CLOSE_LOADER, SET_ERROR, SET_LOADER } from "../Types/AuthTypes";
import backendVerifiedUser from "../../api/backendVerifiedUser";
import backendVerifiedUser2 from "../../api/backendVerifiedUser";

import { SET_SERVICES, SET_SPECIFIC_SERVICE, RESET_SPECIFIC_SERVICE,  } from "../Types/ServiceTypes";

export const getServices = (id, body) => {
    
    return async (dispatch) => {
      dispatch({ type: SET_LOADER });
      try {
        const response = await backendVerifiedUser2.get(
          `/get-specific-product/${id}`
        );
  
        dispatch({ type: CLOSE_LOADER });
  
        dispatch({ type: SET_SERVICES, payLoad: response.data });
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




  export const getSpecificServiceDetails = (data) => {
    
    return async (dispatch) => {
      dispatch({ type: SET_LOADER });
      try {
        const response = await backendVerifiedUser.post("/get-service-price-by-category", data);
  
        dispatch({ type: CLOSE_LOADER });
        dispatch({ type: SET_SPECIFIC_SERVICE, payLoad: response.data });
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
  