import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:5000/api",
});

// Attach token automatically
API.interceptors.request.use((config) => {
    const user = localStorage.getItem("user");
    if (user) {
        const token = JSON.parse(user).token;
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default API;