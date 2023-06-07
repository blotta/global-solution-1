import { createContext, useContext, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "./useLocalStorage";
import authService from '../services/auth.service'
import jwtDecode from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useLocalStorage("user", null);
  const [token, setToken] = useLocalStorage("token", null);
  const navigate = useNavigate();

  useEffect(() => {
    if (token == null) {
      return;
    }

    if (jwtDecode(token).exp * 1000 < new Date()) {
      logout();
    }
  }, [])

  const managerCheck = useMemo(() => {
    if (token == null) return false;
    const u = jwtDecode(token);

    if (!u.roles) return false;

    let _roles;

    if (typeof u.roles == "string") {
      _roles = [u.roles]
    } else {
      _roles = [...u.roles];
    }
    // const ismgr =  _roles.filter(r => ["Admin", "Manager"].includes(r)).length > 0;
    // console.log("_roles", _roles, "ismgr", ismgr);

    return _roles.filter(r => ["Admin", "Manager"].includes(r)).length > 0;
  }, [token])

  const signup = async (name, email, password) => {
    const result = await authService.signupEmailPassword(name, email, password);
    if (result == false) {
        console.log('invalid signup');
        return false;
    }
    return true;
  }

  // call this function when you want to authenticate the user
  const login = async (email, password) => {
    const result = await authService.signinEmailPassword(email, password)
    if (result == null) {
        console.log('invalid login');
        return;
    }
    setUser(result.user);
    setToken(result.token);
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
      managerCheck,
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