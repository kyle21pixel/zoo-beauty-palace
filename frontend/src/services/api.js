// frontend/src/services/api.js
import axios from 'axios';
import {
  mockAuthAPI,
  mockServiceAPI,
  mockBookingAPI,
  mockUserAPI,
  mockProviderAPI,
  mockBeauticianAPI,
  mockReviewAPI,
} from './mockData';

// Check if we're using mock API (Vite uses import.meta.env and VITE_ prefix)
const USE_MOCK_API = import.meta.env.VITE_USE_MOCK_API === 'true';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add token to headers
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid, redirect to login
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API calls
export const authAPI = {
  login: USE_MOCK_API 
    ? mockAuthAPI.login 
    : (credentials) => api.post('/auth/login', credentials),
  register: USE_MOCK_API 
    ? mockAuthAPI.register 
    : (userData) => api.post('/auth/register', userData),
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },
  getMe: USE_MOCK_API 
    ? mockAuthAPI.getMe 
    : () => api.get('/auth/me'),
  updateProfile: USE_MOCK_API 
    ? mockAuthAPI.updateProfile 
    : (profileData) => api.put('/auth/profile', profileData),
};

// User API calls
export const userAPI = {
  getAll: USE_MOCK_API 
    ? mockUserAPI.getAll 
    : () => api.get('/users'),
  getById: USE_MOCK_API 
    ? mockUserAPI.getById 
    : (id) => api.get(`/users/${id}`),
  update: USE_MOCK_API 
    ? mockUserAPI.update 
    : (id, userData) => api.put(`/users/${id}`, userData),
  delete: USE_MOCK_API 
    ? mockUserAPI.delete 
    : (id) => api.delete(`/users/${id}`),
};

// Service API calls
export const serviceAPI = {
  getAll: USE_MOCK_API 
    ? mockServiceAPI.getAll 
    : () => api.get('/services'),
  getByCategory: USE_MOCK_API 
    ? mockServiceAPI.getByCategory 
    : (category) => api.get(`/services/category/${category}`),
  getByProvider: USE_MOCK_API 
    ? mockServiceAPI.getByProvider 
    : (providerId) => api.get(`/services/provider/${providerId}`),
  create: USE_MOCK_API 
    ? mockServiceAPI.create 
    : (serviceData) => api.post('/services', serviceData),
  update: USE_MOCK_API 
    ? mockServiceAPI.update 
    : (id, serviceData) => api.put(`/services/${id}`, serviceData),
  delete: USE_MOCK_API 
    ? mockServiceAPI.delete 
    : (id) => api.delete(`/services/${id}`),
};

// Booking API calls
export const bookingAPI = {
  getAll: USE_MOCK_API 
    ? mockBookingAPI.getAll 
    : () => api.get('/bookings'),
  getByUser: USE_MOCK_API 
    ? mockBookingAPI.getByUser 
    : (userId) => api.get(`/bookings/user/${userId}`),
  getByProvider: USE_MOCK_API 
    ? mockBookingAPI.getByProvider 
    : (providerId) => api.get(`/bookings/provider/${providerId}`),
  create: USE_MOCK_API 
    ? mockBookingAPI.create 
    : (bookingData) => api.post('/bookings', bookingData),
  update: USE_MOCK_API 
    ? mockBookingAPI.update 
    : (id, bookingData) => api.put(`/bookings/${id}`, bookingData),
  delete: USE_MOCK_API 
    ? mockBookingAPI.delete 
    : (id) => api.delete(`/bookings/${id}`),
  updateStatus: USE_MOCK_API 
    ? mockBookingAPI.updateStatus 
    : (id, status) => api.put(`/bookings/${id}/status`, { status }),
};

// Provider API calls
export const providerAPI = {
  getAll: USE_MOCK_API 
    ? mockProviderAPI.getAll 
    : () => api.get('/providers'),
  getById: USE_MOCK_API 
    ? mockProviderAPI.getById 
    : (id) => api.get(`/providers/${id}`),
  getServices: USE_MOCK_API 
    ? mockProviderAPI.getServices 
    : (providerId) => api.get(`/providers/${providerId}/services`),
  getBookings: USE_MOCK_API 
    ? mockProviderAPI.getBookings 
    : (providerId) => api.get(`/providers/${providerId}/bookings`),
  create: USE_MOCK_API 
    ? mockProviderAPI.create 
    : (providerData) => api.post('/providers', providerData),
  update: USE_MOCK_API 
    ? mockProviderAPI.update 
    : (id, providerData) => api.put(`/providers/${id}`, providerData),
};

// Beautician API calls
export const beauticianAPI = {
  getAll: USE_MOCK_API 
    ? mockBeauticianAPI.getAll 
    : () => api.get('/beauticians'),
  getById: USE_MOCK_API 
    ? mockBeauticianAPI.getById 
    : (id) => api.get(`/beauticians/${id}`),
  getServices: USE_MOCK_API 
    ? mockBeauticianAPI.getServices 
    : (beauticianId) => api.get(`/beauticians/${beauticianId}/services`),
  getBookings: USE_MOCK_API 
    ? mockBeauticianAPI.getBookings 
    : (beauticianId) => api.get(`/beauticians/${beauticianId}/bookings`),
  create: USE_MOCK_API 
    ? mockBeauticianAPI.create 
    : (beauticianData) => api.post('/beauticians', beauticianData),
  update: USE_MOCK_API 
    ? mockBeauticianAPI.update 
    : (id, beauticianData) => api.put(`/beauticians/${id}`, beauticianData),
};

// Review API calls
export const reviewAPI = {
  getAll: USE_MOCK_API 
    ? mockReviewAPI.getAll 
    : () => api.get('/reviews'),
  getByService: USE_MOCK_API 
    ? mockReviewAPI.getByService 
    : (serviceId) => api.get(`/reviews/service/${serviceId}`),
  getByProvider: USE_MOCK_API 
    ? mockReviewAPI.getByProvider 
    : (providerId) => api.get(`/reviews/provider/${providerId}`),
  getByBeautician: USE_MOCK_API 
    ? mockReviewAPI.getByBeautician 
    : (beauticianId) => api.get(`/reviews/beautician/${beauticianId}`),
  create: USE_MOCK_API 
    ? mockReviewAPI.create 
    : (reviewData) => api.post('/reviews', reviewData),
  update: USE_MOCK_API 
    ? (id, reviewData) => Promise.resolve({ data: { success: true, review: { id, ...reviewData } } })
    : (id, reviewData) => api.put(`/reviews/${id}`, reviewData),
  delete: USE_MOCK_API 
    ? (id) => Promise.resolve({ data: { success: true } })
    : (id) => api.delete(`/reviews/${id}`),
};

export default api;