import { RESET_ORDERS, SET_ORDERS } from "../Types/OrderTypes";

const initialState = {
  allOrders: [],
};

const OrderReducer = (state = initialState, action) => {
  if (action.type === SET_ORDERS) {
    return { ...state, allOrders: action.payLoad };
  } else if (action.type === RESET_ORDERS) {
    return { ...state, allOrders: [] };
  } else {
    return state;
  }
};

export default OrderReducer;
