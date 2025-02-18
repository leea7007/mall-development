import React from "react";
import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

const ProtectedRoutes = () => {
  const isAuth = useSelector((state) => state.user.isAuth);
  console.log("ProtectedRouted isAuth:", isAuth);
  return isAuth ? <Outlet /> : <Navigate to={"/login"} />;
};

export default ProtectedRoutes;
