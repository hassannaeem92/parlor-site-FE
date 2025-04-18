import { GET_USER_CART_ITEM, REMOVE_USER_CART_ITEM, UPDATE_CART, CLEAR_CART } from "../Types/CartTypes";

const initialState = {
  cartItem: [],
};

const CartReducers = (state = initialState, action) => {
  if (action.type === GET_USER_CART_ITEM) {
    
    return { ...state, cartItem: action.payLoad };
  } else if (action.type === REMOVE_USER_CART_ITEM) {
    return { ...state, cartItem: [] };
  }else if (action.type === UPDATE_CART) {  // Handle cart updates
    return { ...state, cartItem: action.payload };
  }else if (action.type === CLEAR_CART) {  // Handle cart updates
    return { ...state, cartItem: action.payload };
  } else {
    return state;
  }
};

export default CartReducers;
