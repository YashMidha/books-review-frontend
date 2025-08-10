import axios from "axios";
import { clearAuth } from "@/utils/authHelper";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
})

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

api.interceptors.response.use(
    res => res,
    err => {
        if (err.response && err.response.status === 401) {
            clearAuth();
        }
        return Promise.reject(err);
    }
);

export default api;