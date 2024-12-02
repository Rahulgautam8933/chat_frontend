import React from "react";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";
const ProtectedRoute = ({ element }) => {
  const token = Cookies.get("chat-token");

  if (!token) {
    return <Navigate to="/login" />;  
  }

  return element;  
};

export default ProtectedRoute;
