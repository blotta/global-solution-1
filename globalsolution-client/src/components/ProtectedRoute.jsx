import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export const ProtectedRoute = ({ children }) => {
  const { user, token } = useAuth();
  if (!token) {
    // user is not authenticated
    return <Navigate to="/signin" />;
  }
  return children;
};