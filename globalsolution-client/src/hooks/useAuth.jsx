import { createContext, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "./useLocalStorage";
import authService from '../services/auth.service'

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useLocalStorage("user", null);
  const [token, setToken] = useLocalStorage("token", null);
  const navigate = useNavigate();

  const signup = async (name, email, password) => {
    const result = await authService.signupEmailPassword(name, email, password);
    console.log("result:", result);
    if (result == false) {
        console.log('invalid signup');
        return false;
    }
    return true;
  }

  // call this function when you want to authenticate the user
  const login = async (email, password) => {
    const result = await authService.signinEmailPassword(email, password)
    console.log("result:", result);
    if (result == null) {
        console.log('invalid login');
        return;
    }
    setUser(result.user);
    setToken(result.token);
    console.log('logging in from useAuth');
    navigate("/");
  };

  // call this function to sign out logged in user
  const logout = () => {
    setUser(null);
    setToken(null);
    navigate("/signin", { replace: true });
  };

  const value = useMemo(
    () => ({
      user,
      token,
      signup,
      login,
      logout
    }),
    [user]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};