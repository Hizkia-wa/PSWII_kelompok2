
import axios from 'axios';

const API_URL = 'http://localhost:8000/api'; // Adjust this to your Laravel API URL

// Create axios instance with default headers
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// Add token to request if exists
api.interceptors.request.use(config => {
  const token = localStorage.getItem('auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const userService = {
  // Get all users
  getAllUsers: async () => {
    try {
      const response = await api.get('/users');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get user by ID
  getUserById: async (id) => {
    try {
      const response = await api.get(`/users/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Create new user
  createUser: async (userData) => {
    try {
      const response = await api.post('/users', userData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Update user
  updateUser: async (id, userData) => {
    try {
      const response = await api.put(`/users/${id}`, userData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Delete user
  deleteUser: async (id) => {
    try {
      const response = await api.delete(`/users/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

export default userService;