import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";

export default function ProtectedRoute({ component, path, ...props }) {
  const { isAuthenticated } = useAuthContext();
  return isAuthenticated ? (
    <Route props={props} path={path} component={component} />
  ) : (
    <Redirect to="/login" />
  );
}
