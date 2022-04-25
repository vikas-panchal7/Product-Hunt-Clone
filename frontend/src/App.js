import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Filters from "./components/filter";
import { Popup } from "./components/popup";
import {
  Home,
  Products,
  About,
  Community,
  Login,
  NotFound,
  Jobs,
  SignUp,
  Postproduct,
  ProductsDetails,
  Profile,
} from "./pages/index";
const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Products />} />
        <Route path='/Products' element={<Products />} />
        <Route path='/product/details/:id' element={<ProductsDetails />} />
        <Route path='/products/post' element={<Postproduct />} />
        <Route path='/Community' element={<Community />} />
        <Route path='/popup' element={<Popup />} />
        <Route path='/Jobs' element={<Jobs />} />
        <Route path='/About' element={<About />} />
        <Route path='/Profile' element={<Profile />} />
        <Route path='/Login' element={<Login />} />
        <Route path='/SignUp' element={<SignUp />} />
        <Route path='/filters' element={<Filters />} />

        <Route path='/404' element={<NotFound />} />
        <Route path='*' element={<Navigate replace to='/404' />} />
      </Routes>
    </div>
  );
};

export default App;
