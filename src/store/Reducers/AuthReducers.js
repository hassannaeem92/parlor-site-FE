import {
  CLOSE_LOADER,
  LOGOUT,
  RESET_ERROR,
  RESET_SUCCESS,
  SET_ERROR,
  SET_LOADER,
  SET_SUCCESS,
  SET_TOKEN,
} from "../Types/AuthTypes";
import { jwtDecode } from "jwt-decode";

const initialState = {
  loading: false,
  user: null,
  token: "",
  error: "",
  success: "",
};

const verifyToken = (token) => {
  const decodeToken = jwtDecode(token);
  const expireIn = new Date(decodeToken.exp * 1000);
  if (new Date() > expireIn) {
    localStorage.removeItem("nocClientToken");
    return {};
  } else {
    return decodeToken;
  }
};

const token = localStorage.getItem("nocClientToken");
if (token) {
  try {
    const decoded = verifyToken(token);
    initialState.token = token;

    if (decoded && decoded.user) {
      const { user } = decoded;
      initialState.user = user;
    }
  } catch (error) {
    console.error("Error verifying token:", error);
  }
}

const AuthReducers = (state = initialState, action) => {
  if (action.type === SET_LOADER) {
    return { ...state, loading: true };
  } else if (action.type === CLOSE_LOADER) {
    return { ...state, loading: false };
  } else if (action.type === SET_SUCCESS) {
    return { ...state, success: action.payLoad };
  } else if (action.type === RESET_SUCCESS) {
    return { ...state, success: "" };
  } else if (action.type === SET_ERROR) {
    return { ...state, error: action.payLoad };
  } else if (action.type === RESET_ERROR) {
    return { ...state, error: "" };
  } else if (action.type === SET_TOKEN) {
    const decoded = verifyToken(action.payLoad);
    const { user } = decoded;
    return { ...state, token: action.payLoad, user: user };
  } else if (action.type === LOGOUT) {
    return { ...state, token: "", user: null };
  } else {
    return state;
  }
};

export default AuthReducers;
