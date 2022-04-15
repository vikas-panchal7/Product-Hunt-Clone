import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import {
  userRegisterReducer,
  userLoginReducer,
  userUpdateProfileReducer,
  userDetailsReducer,
} from "./reducers/userReducer";
import {
  productListReducer,
  productDetailsReducer,
  productCreateReducer,
  productCreateLikeReducer,
  productCommentCreateReducer,
  productGetLikeReducer,
  upcomingProductReducer,
} from "./reducers/productReducer";

const reducer = combineReducers({
  userRegister: userRegisterReducer,
  userLogin: userLoginReducer,
  updateProfile: userUpdateProfileReducer,
  userDetails: userDetailsReducer,
  productList: productListReducer,
  productDetails: productDetailsReducer,
  productCreate: productCreateReducer,
  productLike: productCreateLikeReducer,
  productComment: productCommentCreateReducer,
  productgetLikes: productGetLikeReducer,
  productUpcominglist: upcomingProductReducer,
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
