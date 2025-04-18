import { SET_CHARGES } from "../Types/ChargesTypes";

const initialState = {
  charges: [],
};

const ChargesReducer = (state = initialState, action) => {
  if (action.type === SET_CHARGES) {
    return { ...state, charges: action.payLoad };
  } else {
    return state;
  }
};

export default ChargesReducer;
