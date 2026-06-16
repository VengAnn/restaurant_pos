import { apiClient } from "./client";

// Auth Endpoints
export const login = (data) => apiClient.post("/api/user/login", data);
export const register = (data) => apiClient.post("/api/user/register", data);
export const getUserData = () => apiClient.get("/api/user");
export const logout = () => apiClient.post("/api/user/logout");

// Table Endpoints
export const addTable = (data) => apiClient.post("/api/table/", data);
export const getTables = () => apiClient.get("/api/table");
export const updateTable = ({ tableId, ...tableData }) =>
  apiClient.put(`/api/table/${tableId}`, tableData);

// Order Endpoints
export const addOrder = (data) => apiClient.post("/api/order/", data);
export const getOrders = () => apiClient.get("/api/order");
export const getPopularDishes = () => apiClient.get("/api/order/popular");
export const updateOrderStatus = ({ orderId, orderStatus }) =>
  apiClient.put(`/api/order/${orderId}`, { orderStatus });

// Menu Endpoints
export const getMenuItems = () => apiClient.get("/api/menu");
