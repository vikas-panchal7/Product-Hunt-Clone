import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import { userRegisterReducer, userLoginReducer } from "./reducers/userReducer";
import { productListReducer } from "./reducers/productReducer";

const reducer = combineReducers({
  userRegister: userRegisterReducer,
  userLogin: userLoginReducer,
  productList: productListReducer,
});

const store = createStore(reducer, applyMiddleware(thunk));

export default store;
