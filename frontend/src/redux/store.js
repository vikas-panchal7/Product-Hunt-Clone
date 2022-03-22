import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import { userRegisterReducer, userLoginReducer } from "./reducers/userReducer";

const reducer = combineReducers({
  userRegister: userRegisterReducer,
  userLogin: userLoginReducer,
});

const initialState = {};

const store = createStore(reducer, applyMiddleware(thunk));

export default store;
