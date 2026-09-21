import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  headers: { 'Content-Type': 'application/json' },
});

// Attach the stored JWT (if any) to every outgoing request.
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('ty_admin_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// A 401 anywhere means the session is no longer valid — clear it and bounce
// to /login. We do this at the transport layer so every page gets it for free.
let onUnauthorized = null;
export function setUnauthorizedHandler(handler) {
  onUnauthorized = handler;
}

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('ty_admin_token');
      localStorage.removeItem('ty_admin_user');
      if (onUnauthorized) onUnauthorized();
    }
    return Promise.reject(error);
  }
);

export default api;
