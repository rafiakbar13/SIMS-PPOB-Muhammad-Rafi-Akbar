import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../component/Navbar";
import Dashboard from "../component/Dashboard";
const RootLayout = () => {
  return (
    <section className="px-24 max-w-7xl mx-auto">
      <Navbar />
      <Dashboard />
      <Outlet />
    </section>
  );
};

export default RootLayout;
