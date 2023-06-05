import axios from "axios"

const API_URL = "/users"

const getUser = (id) => {
    return axios.get(API_URL + `/${id}`);
}

const userService = {
    getUser
}