import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";

import Home from "./components/home";
import NotFound from "./screens/notfound";
import Products from "./components/products";
import Community from "./components/community";
import Jobs from "./components/jobs";
import About from "./components/about";
import Login from "./components/login";
import SignUp from "./components/signup";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/products' element={<Products />} />
        <Route path='/Community' element={<Community />} />
        <Route path='/Jobs' element={<Jobs />} />
        <Route path='/About' element={<About />} />
        <Route path='/Login' element={<Login />} />
        <Route path='/SignUp' element={<SignUp />} />
        <Route path='/404' element={<NotFound />} />
        <Route path='*' element={<Navigate replace to='/404' />} />
      </Routes>
    </div>
  );
};

export default App;
