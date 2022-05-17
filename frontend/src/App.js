import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { Popup } from "./components/popup";
import ViewImage from "./components/viewimage";
import {
  Home,
  Products,
  About,
  Login,
  NotFound,
  Jobs,
  SignUp,
  Postproduct,
  ProductsDetails,
  Profile,
  Register,
  Loggin,
  MyProduct,
  MyJobs,
  Mentors,
  ForgotPassword,
  ChangePassword,
} from "./pages/index";
const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/Products' element={<Products />} />
      <Route path='/product/details/:id' element={<ProductsDetails />} />
      <Route path='/products/post' element={<Postproduct />} />
      <Route path='/popup' element={<Popup />} />
      <Route path='/Jobs' element={<Jobs />} />
      <Route path='/About' element={<About />} />
      <Route path='/Profile' element={<Profile />} />
      <Route path='/Login' element={<Login />} />
      <Route path='/SignUp' element={<SignUp />} />
      <Route path='/register' element={<Register />} />
      <Route path='/loggin' element={<Loggin />} />
      <Route path='/forgot' element={<ForgotPassword />} />
      <Route path='/change/:id' element={<ChangePassword />} />
      <Route path='/MyProducts' element={<MyProduct />} />
      <Route path='/MyJobs' element={<MyJobs />} />
      <Route path='/Mentors' element={<Mentors />} />
      <Route path='/view' element={<ViewImage />} />
      <Route path='/404' element={<NotFound />} />
      <Route path='*' element={<Navigate replace to='/404' />} />
    </Routes>
  );
};

export default App;
