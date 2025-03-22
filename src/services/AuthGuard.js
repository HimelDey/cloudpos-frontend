import React from "react";
import { Navigate, Outlet } from "react-router-dom";

// Example authentication check function (Replace with actual logic)
const isAuthenticated = () => {
  return !!localStorage.getItem("token"); // Check if token exists
};

const AuthGuard = () => {
  return isAuthenticated() ? <Outlet /> : <Navigate to="/auth/login" replace />;
};

export default AuthGuard;
