import {
  RESET_CATEGORIES_WITH_SUB_CATEGORIES,
  RESET_PRODUCTS,
  RESET_SPECIFIC_PRODUCT,
  SET_CATEGORIES_WITH_SUB_CATEGORIES,
  SET_PRODUCTS,
  SET_SPECIFIC_PRODUCT,
  SET_WORK_IMAGES,
  RESET_WORK_IMAGES,
  SET_ALL_DEALS,
  RESET_ALL_DEALS,
  SET_SERVICE_PRICES,
  RESET_SERVICE_PRICES,
  SET_SPECIFIC_DEALS,
  RESET_SPECIFIC_DEALS
} from "../Types/ProductTypes";

const initialState = {
  products: [],
  specificProduct: null,
  specificVarient: null,
  categoriesWithSub: [],
  workSectionImages: [],
  allDeals: [],
  servicePrices: [],
  specificDeal: null
};

const ProductReducers = (state = initialState, action) => {
  if (action.type === SET_PRODUCTS) {
    return { ...state, products: action.payLoad };
  } else if (action.type === RESET_PRODUCTS) {
    return { ...state, products: [] };
  } else if (action.type === SET_SPECIFIC_PRODUCT) {
    return { ...state, specificProduct: action.payLoad };
  } else if (action.type === RESET_SPECIFIC_PRODUCT) {
    return { ...state, specificProduct: null };
  } else if (action.type === SET_CATEGORIES_WITH_SUB_CATEGORIES) {
    return { ...state, categoriesWithSub: action.payLoad };
  } else if (action.type === RESET_CATEGORIES_WITH_SUB_CATEGORIES) {
    return { ...state, categoriesWithSub: [] };
  }else if (action.type === SET_WORK_IMAGES) {
    return { ...state, workSectionImages: action.payLoad };
  }else if (action.type === RESET_WORK_IMAGES) {
    return { ...state, workSectionImages: [] };
  }else if(action.type === SET_ALL_DEALS) {
    return { ...state, allDeals: action.payLoad };
  }else if(action.type === RESET_ALL_DEALS) {
    return { ...state, allDeals: [] };
  }else if (action.type === SET_SERVICE_PRICES) {
    return { ...state, servicePrices: action.payLoad };
  }else if (action.type === RESET_SERVICE_PRICES) {
    return { ...state, servicePrices: [] };
  }else if (action.type === SET_SPECIFIC_DEALS) {
    return { ...state, specificDeal: action.payLoad };
  }else if (action.type === RESET_SPECIFIC_DEALS) {
    return { ...state, specificDeal: null };
  }
   else {
    return state;
  }
};

export default ProductReducers;
