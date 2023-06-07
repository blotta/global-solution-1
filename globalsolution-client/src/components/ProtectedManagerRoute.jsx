import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export const ProtectedManagerRoute = ({ children }) => {
  const { token, isManager, managerCheck } = useAuth();
  if (!token) {
    // user is not authenticated
    return <Navigate to="/signin" />;
  }

  if (!managerCheck) {
    return <Navigate to="/"/>
  }

  return children;
};