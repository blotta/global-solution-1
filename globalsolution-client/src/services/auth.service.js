import axios from "axios"
import jwtDecode from "jwt-decode";

const API_URL = "/auth"

const signupEmailPassword = async (name, email, password) => {
    try
    {
        const response = await axios.post(API_URL + "/register", { name, username: email, password });
        return true;
    } catch (error) {
        if (error.response) {
            console.log("error response", error);
        } else if (error.request) {
            console.log("error request", error);
        } else {
            console.log("unknown error", error);
        }
        return false;
    }
}

const signinEmailPassword = async (email, password) => {
    try
    {
        const response = await axios.post(API_URL + "/login", { username: email, password });
        const user = jwtDecode(response.data.token)
        return {token: response.data.token, user: user};
    } catch (error) {
        if (error.response) {
            console.log("error response", error);
        } else if (error.request) {
            console.log("error request", error);
        } else {
            console.log("unknown error", error);
        }
    }
}

const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
}

const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("user"));
}

const authHeader = () => {
    const token = JSON.parse(localStorage.getItem("token"))
    if (token) {
        return { "Authorization": "Bearer " + token }
    }
    return {}
}

const authService = { signupEmailPassword, signinEmailPassword, logout, getCurrentUser, authHeader }

export default authService;