/**
 * @fileoverview Root React component for Trip Explorer frontend.
 * Handles routing and layout for the application.
 *
 * Features:
 * - Defines global routes for authentication, dashboard, and trip management.
 * - Wraps private routes with authentication protection.
 * - Renders shared components like header/footer if applicable.
 */
import React from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    return <Navigate to="/" replace />;
  }
  return children;
}

export default ProtectedRoute;

