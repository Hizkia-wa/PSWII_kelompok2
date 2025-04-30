import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8000/api",
});

export const login = (credentials) => API.post("/login", credentials);
export const getDashboardData = (token) =>
  API.get("/dashboard", { headers: { Authorization: `Bearer ${token}` } });
export const getPermohonan = (token) =>
  API.get("/permohonan", { headers: { Authorization: `Bearer ${token}` } });
export const createPermohonan = (data, token) =>
  API.post("/permohonan", data, {
    headers: { Authorization: `Bearer ${token}` },
  });
export const updatePermohonan = (id, data, token) =>
  API.put(`/permohonan/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
export const deletePermohonan = (id, token) =>
  API.delete(`/permohonan/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
