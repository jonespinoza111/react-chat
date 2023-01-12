import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = () => {
    const checkAuth = !!localStorage.getItem("currentUser");
    return checkAuth ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoutes;
