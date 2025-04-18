import {
  RESET_SERVICES,
  RESET_SPECIFIC_SERVICE,
  SET_SERVICES,
  SET_SPECIFIC_SERVICE,
  
} from "../Types/ServiceTypes";

const initialState = {
  initialState : [],
  specificservice: null
};

const ServiceReducers = (state = initialState, action) => {
  if (action.type === SET_SERVICES) {
    return { ...state, services: action.payLoad };
  } else if (action.type === RESET_SERVICES) {
    return { ...state, services: [] };
  }else if (action.type === SET_SPECIFIC_SERVICE) {
    return { ...state, specificservice: action.payLoad };
  } else if (action.type === RESET_SPECIFIC_SERVICE) {
    return { ...state, specificservice: [] };
  }else {
    return state;
  }
};

export default ServiceReducers;
