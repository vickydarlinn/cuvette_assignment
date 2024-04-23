import React from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Header from "../components/header";

const MainLayout = () => {
  return (
    <main>
      <Header />
      <Outlet />
      <ToastContainer />
    </main>
  );
};

export default MainLayout;
