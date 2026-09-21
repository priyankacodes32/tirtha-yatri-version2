import api from './axios.js';

export function login(email, password) {
  return api.post('/auth/login', { email, password }).then((res) => res.data);
}

export function fetchProfile() {
  return api.get('/auth/profile').then((res) => res.data);
}
