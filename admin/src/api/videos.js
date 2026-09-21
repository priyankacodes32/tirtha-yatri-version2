import api from './axios.js';

// Admin management view needs every video, including inactive ones.
export function listVideos(params = {}) {
  return api.get('/videos', { params: { all: true, ...params } }).then((res) => res.data);
}

export function createVideo(payload) {
  return api.post('/videos', payload).then((res) => res.data);
}

export function updateVideo(id, payload) {
  return api.put(`/videos/${id}`, payload).then((res) => res.data);
}

export function deleteVideo(id) {
  return api.delete(`/videos/${id}`).then((res) => res.data);
}
