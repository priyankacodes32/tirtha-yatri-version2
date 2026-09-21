import api from './axios.js';

export function getSettings() {
  return api.get('/settings').then((res) => res.data);
}

export function updateSettings(payload) {
  return api.put('/settings', payload).then((res) => res.data);
}
