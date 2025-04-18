import { CLOSE_LOADER, SET_ERROR, SET_LOADER } from "../Types/AuthTypes";
import {
  SET_CATEGORIES_WITH_SUB_CATEGORIES,
  SET_PRODUCTS,
  SET_SPECIFIC_PRODUCT,
  SET_WORK_IMAGES,
  SET_ALL_DEALS,
  SET_SPECIFIC_DEALS,
  RESET_SPECIFIC_DEALS,
  RESET_ALL_DEALS,
} from "../Types/ProductTypes";
import backendVerifiedUser from "../../api/backendVerifiedUser";

export const getProducts = (categoryId, subCategoryId) => {
  return async (dispatch) => {
    dispatch({ type: SET_LOADER });
    try {
      const response = await backendVerifiedUser.post("/get-products", {
        categoryId,
        subCategoryId,
      });

      dispatch({ type: CLOSE_LOADER });

      dispatch({ type: SET_PRODUCTS, payLoad: response.data });
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

export const getspecificProduct = (id) => {
  return async (dispatch) => {
    dispatch({ type: SET_LOADER });
    try {
      const response = await backendVerifiedUser.get(
        `/get-specific-product/${id}`
      );

      dispatch({ type: CLOSE_LOADER });

      dispatch({ type: SET_SPECIFIC_PRODUCT, payLoad: response.data });
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

export const getspecificDeal = (id) => {
  return async (dispatch) => {
    dispatch({ type: SET_LOADER });
    try {
      const response = await backendVerifiedUser.get(
        `/getSpecificDealById/${id}`
      );

      dispatch({ type: CLOSE_LOADER });

      dispatch({ type: SET_SPECIFIC_DEALS, payLoad: response.data });
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

export const getCategoriesWithSubCategories = () => {
  return async (dispatch) => {
    dispatch({ type: SET_LOADER });
    try {
      // const response = await backendVerifiedUser.get(
      //   "/get-categories-with-sub-categories"
      // );

      const response = await backendVerifiedUser.get(
        "/get-categories-with-sub-categories"
      );
      // const response = await backendVerifiedUser.get(
      //   "/get-all-service-prices"
      // );

      dispatch({ type: CLOSE_LOADER });

      dispatch({
        type: SET_CATEGORIES_WITH_SUB_CATEGORIES,
        payLoad: response.data,
      });
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

export const getServicePrices = () => {
  return async (dispatch) => {
    dispatch({ type: SET_LOADER });
    try {
      // const response = await backendVerifiedUser.get(
      //   "/get-categories-with-sub-categories"
      // );

    
      const response = await backendVerifiedUser.get(
        "/get-all-service-prices"
      );

      dispatch({ type: CLOSE_LOADER });

      dispatch({
        type: SET_SERVICE_PRICES,
        payLoad: response.data,
      });
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

export const getAllDeals = () => {
  return async (dispatch) => {
    dispatch({ type: SET_LOADER });
    try {
      // const response = await backendVerifiedUser.get(
      //   "/get-categories-with-sub-categories"
      // );

      const response = await backendVerifiedUser.get(
        "/getHomeDeals"
      );
      // const response = await backendVerifiedUser.get(
      //   "/get-all-service-prices"
      // );

      dispatch({ type: CLOSE_LOADER });

      dispatch({
        type: SET_ALL_DEALS,
        payLoad: response.data,
      });
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

export const getWorkSectionImages = () => {
  return async (dispatch) => {
    dispatch({ type: SET_LOADER });
    try {
      // const response = await backendVerifiedUser.get(
      //   "/get-categories-with-sub-categories"
      // );

      const response = await backendVerifiedUser.get(
        "/getOurWorkSection"
      );
      // const response = await backendVerifiedUser.get(
      //   "/get-all-service-prices"
      // );

      dispatch({ type: CLOSE_LOADER });

      dispatch({
        type: SET_WORK_IMAGES,
        payLoad: response.data,
      });
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
