import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('campusToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle token expiration
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('campusToken');
      localStorage.removeItem('campusUser');
      localStorage.removeItem('campusAuth');
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
};

// Announcements API
export const announcementsAPI = {
  getAll: (params = {}) => api.get('/announcements', { params }),
  getById: (id) => api.get(`/announcements/${id}`),
  create: (data) => api.post('/announcements', data),
  update: (id, data) => api.put(`/announcements/${id}`, data),
  delete: (id) => api.delete(`/announcements/${id}`),
};

// Complaints API
export const complaintsAPI = {
  getAll: (params = {}) => api.get('/complaints', { params }),
  getById: (id) => api.get(`/complaints/${id}`),
  create: (data) => api.post('/complaints', data),
  updateStatus: (id, data) => api.put(`/complaints/${id}/status`, data),
  delete: (id) => api.delete(`/complaints/${id}`),
};

// Lost and Found API
export const lostFoundAPI = {
  getAll: (params = {}) => api.get('/lostfound', { params }),
  getById: (id) => api.get(`/lostfound/${id}`),
  create: (data) => api.post('/lostfound', data),
  update: (id, data) => api.put(`/lostfound/${id}`, data),
  delete: (id) => api.delete(`/lostfound/${id}`),
};

// Timetable API
export const timetableAPI = {
  getAll: (params = {}) => api.get('/timetable', { params }),
  getById: (id) => api.get(`/timetable/${id}`),
  create: (data) => api.post('/timetable', data),
  update: (id, data) => api.put(`/timetable/${id}`, data),
  delete: (id) => api.delete(`/timetable/${id}`),
};

export default api;
