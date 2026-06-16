import axios from "axios";

// Default HTTP headers for payload and content negotiation
const defaultHeader = {
  "Content-Type": "application/json",
  Accept: "application/json",
};

// Global Axios instance wrapper to communicate with the Backend API
export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  // withCredentials:true Include HTTP cookies (JWT/session cookie) automatically in requests
  withCredentials: true,
  headers: { ...defaultHeader },
});
