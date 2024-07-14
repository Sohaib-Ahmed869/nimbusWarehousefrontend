import React from "react";
import { HashRouter, Routes, Route } from "react-router-dom";

import Home from "./Home/page";
import Login from "./Login/page";
import Signup from "./Signup/page";
import DashboardLayout from "./warehouse/dashboardLayout";
import CashierLogin from "./CashierLogin/page";
import CashierDashboardLayout from "./cashier/dashboardLayout";

const Layout = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      <Route path="/warehouseDashboard" element={<DashboardLayout />} />
      <Route path="/cashierLogin" element={<CashierLogin />} />
      <Route path="/cashierDashboard" element={<CashierDashboardLayout />} />
    </Routes>
  );
};

export default Layout;
