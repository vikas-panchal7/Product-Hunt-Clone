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
  listmyproductsReducer,
} from "./reducers/productReducer";
import { jobsCreateReducer, jobsListReducer } from "./reducers/jobsReducer";

const reducer = combineReducers({
  userRegister: userRegisterReducer,
  userLogin: userLoginReducer,
  updateProfile: userUpdateProfileReducer,
  userDetails: userDetailsReducer,
  productList: productListReducer,
  myproductList: listmyproductsReducer,
  productDetails: productDetailsReducer,
  productCreate: productCreateReducer,
  productLike: productCreateLikeReducer,
  productComment: productCommentCreateReducer,
  productgetLikes: productGetLikeReducer,
  productUpcominglist: upcomingProductReducer,
  jobCreate: jobsCreateReducer,
  jobList: jobsListReducer,
});

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const intialState = {
  userLogin: { userInfo: userInfoFromStorage },
};

const rootReducer = (state, action) => {
  if (action.type === "USER_LOGOUT") {
    return reducer(undefined, action);
  }

  return reducer(state, action);
};

const store = createStore(
  rootReducer,
  intialState,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
