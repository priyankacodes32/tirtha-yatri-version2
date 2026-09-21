import api from './axios.js';

export function listGallery(params = {}) {
  return api.get('/gallery', { params }).then((res) => res.data);
}

export function createGalleryImage(payload) {
  return api.post('/gallery', payload).then((res) => res.data);
}

export function updateGalleryImage(id, payload) {
  return api.put(`/gallery/${id}`, payload).then((res) => res.data);
}

export function deleteGalleryImage(id) {
  return api.delete(`/gallery/${id}`).then((res) => res.data);
}
