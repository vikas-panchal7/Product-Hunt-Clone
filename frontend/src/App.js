import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { ProductsDetails } from "../src/pages/product/productdetails";
import {
  Home,
  Products,
  About,
  Community,
  Login,
  NotFound,
  Jobs,
  SignUp,
} from "./pages/index";
import Postproduct from "./pages/product/postproduct";
const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/products' element={<Products />} />
        <Route path='/products/:id' element={<ProductsDetails />} />
        <Route path='/Community' element={<Community />} />
        <Route path='/Jobs' element={<Jobs />} />
        <Route path='/About' element={<About />} />
        <Route path='/Login' element={<Login />} />
        <Route path='/SignUp' element={<SignUp />} />
        <Route path='/products/post' element={<Postproduct />} />
        <Route path='/404' element={<NotFound />} />
        <Route path='*' element={<Navigate replace to='/404' />} />
      </Routes>
    </div>
  );
};

export default App;
