import api from './axios.js';

export function listDestinations(params = {}) {
  return api.get('/destinations', { params: { includeInactive: true, ...params } }).then((res) => res.data);
}

export function getDestination(slug) {
  return api.get(`/destinations/${slug}`).then((res) => res.data);
}

export function createDestination(payload) {
  return api.post('/destinations', payload).then((res) => res.data);
}

export function updateDestination(id, payload) {
  return api.put(`/destinations/${id}`, payload).then((res) => res.data);
}

export function deleteDestination(id) {
  return api.delete(`/destinations/${id}`).then((res) => res.data);
}
