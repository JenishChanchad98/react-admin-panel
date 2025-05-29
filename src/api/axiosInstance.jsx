import axios from "axios";
import { getToken } from "../utils/auth";
import { showToast } from "../utils/toast";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use((config) => {
  const tokenObj = getToken() || {};
  const { token } = tokenObj;

  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    // Show success toast for successful POST, PUT, DELETE requests
    if (response.config.method !== "get" && response.data?.message) {
      showToast.success(response.data.message);
    }
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

    // Handle API errors with messages
    const errorMessage =
      error.response?.data?.message || "An error occurred. Please try again.";
    showToast.error(errorMessage);

    return Promise.reject(error);
  }
);

export default axiosInstance;
