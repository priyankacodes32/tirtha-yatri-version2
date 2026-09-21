import api from './axios.js';

export function listFeatures() {
  return api.get('/features', { params: { all: true } }).then((res) => res.data);
}

export function createFeature(payload) {
  return api.post('/features', payload).then((res) => res.data);
}

export function updateFeature(id, payload) {
  return api.put(`/features/${id}`, payload).then((res) => res.data);
}

export function deleteFeature(id) {
  return api.delete(`/features/${id}`).then((res) => res.data);
}
