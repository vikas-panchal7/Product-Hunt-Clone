import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import { userRegisterReducer, userLoginReducer } from "./reducers/userReducer";
import {
  productListReducer,
  productDetailsReducer,
  productCreateReducer,
  productCreateLikeReducer,
  productCommentCreateReducer,
  productGetLikeReducer,
} from "./reducers/productReducer";

const reducer = combineReducers({
  userRegister: userRegisterReducer,
  userLogin: userLoginReducer,
  productList: productListReducer,
  productDetails: productDetailsReducer,
  productCreate: productCreateReducer,
  productLike: productCreateLikeReducer,
  productComment: productCommentCreateReducer,
  productgetLikes: productGetLikeReducer,
});

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const intialState = {
  userLogin: { userInfo: userInfoFromStorage },
};
const store = createStore(
  reducer,
  intialState,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
