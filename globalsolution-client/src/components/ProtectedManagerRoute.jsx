import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export const ProtectedManagerRoute = ({ children }) => {
  const { token, isManager } = useAuth();
  if (!token) {
    // user is not authenticated
    return <Navigate to="/signin" />;
  }

  if (!isManager) {
    return <Navigate to="/"/>
  }

  return children;
};