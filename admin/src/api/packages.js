import api from './axios.js';

export function listPackages(params = {}) {
  return api.get('/packages', { params: { includeInactive: true, ...params } }).then((res) => res.data);
}

export function getPackage(slug) {
  return api.get(`/packages/${slug}`).then((res) => res.data);
}

export function createPackage(payload) {
  return api.post('/packages', payload).then((res) => res.data);
}

export function updatePackage(id, payload) {
  return api.put(`/packages/${id}`, payload).then((res) => res.data);
}

export function deletePackage(id) {
  return api.delete(`/packages/${id}`).then((res) => res.data);
}
