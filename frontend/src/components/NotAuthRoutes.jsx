import React from "react";
import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

const NotAuthRoutes = () => {
  const isAuth = useSelector((state) => state.user.isAuth);
  console.log("NotAuthRoutes isAuth:", isAuth);
  return isAuth ? <Navigate to={"/"} /> : <Outlet />;
};

export default NotAuthRoutes;
