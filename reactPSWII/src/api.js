import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8000/api",
});


API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// AUTH
export const login = (credentials) => API.post("/login", credentials);

// DASHBOARD
export const getDashboardData = () => API.get("/dashboard");

// PERMOHONAN
export const getPermohonan = () => API.get("/permohonan");
export const createPermohonan = (data) => API.post("/permohonan", data);
export const updatePermohonan = (id, data) =>
  API.put(`/permohonan/${id}`, data);
export const deletePermohonan = (id) => API.delete(`/permohonan/${id}`);

// JENIS PERMOHONAN
export const getJenisPermohonan = () => API.get("/jenis-permohonan");
export const createJenisPermohonan = (data) => API.post("/jenis-permohonan", data);
export const updateJenisPermohonan = (id, data) => API.put(`/jenis-permohonan/${id}`, data);
export const deleteJenisPermohonan = (id) => API.delete(`/jenis-permohonan/${id}`);
