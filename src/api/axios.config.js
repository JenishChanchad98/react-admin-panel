import axios from "axios";
import store from "../store";
import { getToken } from "../utils/auth";
import { showToast } from "../utils/toast";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api",
  headers: { "Content-Type": "application/json" },
  timeout: 10000, // 10 seconds timeout
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Set default toast behavior to true if not explicitly false
    if (config.showToast === undefined) {
      config.showToast = true;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle network errors
    if (!error.response) {
      showToast.error("Network error. Please check your internet connection.");
      return Promise.reject({
        message: "Network error. Please check your internet connection.",
      });
    }

    // Handle unauthorized access
    if (error.response.status === 401) {
      store.dispatch({ type: "auth/logout" });
      showToast.error("Session expired. Please login again.");
    }

    // Show error toast for all other errors
    if (error.config?.showToast) {
      const errorMessage =
        error.response?.data?.message || "An error occurred. Please try again.";
      showToast.error(errorMessage);
    }

    return Promise.reject(error);
  }
);

export default api;
