import axios from "axios";
import { BACKEND_URL } from "./config";

export const api = axios.create({
  baseURL: `${BACKEND_URL}/api/v1`,
  headers: { "Content-Type": "application/json" },
  timeout: 15000,
});

api.interceptors.request.use((request) => {
  const token = localStorage.getItem("token");
  if (token) request.headers.Authorization = token;
  return request;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      localStorage.removeItem("token");
      if (window.location.pathname !== "/signin") {
        window.location.assign("/signin");
      }
    }
    return Promise.reject(error);
  },
);

export function getApiErrorMessage(error: unknown, fallback: string) {
  if (axios.isAxiosError<{ message?: string }>(error)) {
    if (error.response?.data?.message) return error.response.data.message;
    if (error.code === "ECONNABORTED") return "The server took too long to respond. Please try again.";
    if (!error.response) return "Can’t reach the server. Check that the backend is running and try again.";
  }
  return fallback;
}
