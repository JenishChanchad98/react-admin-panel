import axios from "axios";
import { getToken } from "../utils/auth";

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

export default axiosInstance;
