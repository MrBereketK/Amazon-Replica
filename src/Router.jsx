import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "../pages/Landing/Landing";
import SignUp from "../pages/Auth/SignUp";
import Payments from "../pages/Payment/Payment";
import Cart from "../pages/Cart/Cart";
import Orders from "../pages/Orders/Orders";
const Routing = () => {
  return (

    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/auth" element={<SignUp />} />
        <Route path="/payments" element={<Payments />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/orders" element={<Orders />} />
      </Routes>
    </Router>
  );
};

export default Routing;
