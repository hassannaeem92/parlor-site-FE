import { createStore, applyMiddleware, combineReducers } from "redux";
import { thunk } from "redux-thunk";
import { composeWithDevTools } from "@redux-devtools/extension";
import AuthReducers from "./Reducers/AuthReducers";
import ProductReducers from "./Reducers/ProductReducers";
import CartReducers from "./Reducers/CartReducers";
import OrderReducer from "./Reducers/OrderReducers";
import InfoPageReducer from "./Reducers/InfoPageReducers";
import ChargesReducer from "./Reducers/ChargesReducers";
import UserReducer from "./Reducers/UserReducer";
import ServiceReducers from "./Reducers/ServiceReducer";

const rootReducers = combineReducers({
  AuthReducers,
  ProductReducers,
  CartReducers,
  OrderReducer,
  InfoPageReducer,
  ChargesReducer,
  UserReducer,
  ServiceReducers
});

const middlewares = [thunk];

const Store = createStore(
  rootReducers,
  composeWithDevTools(applyMiddleware(...middlewares))
);
export default Store;
