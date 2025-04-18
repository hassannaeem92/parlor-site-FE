import {
  CLOSE_LOADER,
  RESET_ERROR,
  SET_ERROR,
  SET_LOADER,
  SET_SUCCESS,
  SET_TOKEN,
} from "../Types/AuthTypes";

import backend from "../../api/backend";

export const userRegister = (data) => {
  return async (dispatch) => {
    dispatch({ type: SET_LOADER });
    try {
      const response = await backend.post("/register", data);
      console.log(response);
      dispatch({ type: CLOSE_LOADER });
      dispatch({ type: RESET_ERROR });
      dispatch({ type: SET_SUCCESS, payLoad: response.data.success.msg });
      return true;
    } catch (err) {
      console.log(err);
      dispatch({ type: CLOSE_LOADER });
      dispatch({ type: SET_ERROR, payLoad: err.response.data.error.msg });
      return false;
    }
  };
};

export const userLogin = (data) => {
  return async (dispatch) => {
    dispatch({ type: SET_LOADER });
    try {
      const response = await backend.post("/login", data);
      dispatch({ type: CLOSE_LOADER });
      dispatch({ type: RESET_ERROR });
      dispatch({ type: SET_SUCCESS, payLoad: response.data.success.msg });
      localStorage.setItem("nocClientToken", response.data.token);
      dispatch({ type: SET_TOKEN, payLoad: response.data.token });
      return true;
    } catch (err) {
      dispatch({ type: CLOSE_LOADER });
      dispatch({ type: SET_ERROR, payLoad: err.response.data.error.msg });
      return false;
    }
  };
};

export const forgotPassword = (data) => {
  return async (dispatch) => {
    dispatch({ type: SET_LOADER });
    try {
      const response = await backend.post("/forgot-password", data);
      console.log(response);
      dispatch({ type: CLOSE_LOADER });
      dispatch({ type: SET_SUCCESS, payLoad: response.data.success.msg });
      return true;
    } catch (err) {
      console.log(err);
      dispatch({ type: CLOSE_LOADER });
      dispatch({ type: SET_ERROR, payLoad: err.response.data.error.msg });
      return false;
    }
  };
};

export const resetPassword = (data, url) => {
  return async (dispatch) => {
    dispatch({ type: SET_LOADER });
    try {
      const response = await backend.post(url, data);
      console.log(response);
      dispatch({ type: CLOSE_LOADER });
      dispatch({ type: RESET_ERROR });
      dispatch({ type: SET_SUCCESS, payLoad: response.data.success.msg });
      return true;
    } catch (err) {
      console.log(err);
      dispatch({ type: CLOSE_LOADER });
      dispatch({ type: SET_ERROR, payLoad: err.response.data.error.msg });
      return false;
    }
  };
};
