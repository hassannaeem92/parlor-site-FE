import {
  SET_FAQS,
  SET_REFUND_POLICY,
  SET_TERMS_CONDITIONS,
} from "../Types/InfoPageTypes";
const initialState = {
  faqs: [],
  terms: [],
  policies: [],
};

const InfoPageReducer = (state = initialState, action) => {
  if (action.type === SET_FAQS) {
    return { ...state, faqs: action.payLoad };
  } else if (action.type === SET_TERMS_CONDITIONS) {
    return { ...state, terms: action.payLoad };
  } else if (action.type === SET_REFUND_POLICY) {
    return { ...state, policies: action.payLoad };
  } else {
    return state;
  }
};

export default InfoPageReducer;
