import api from './axios.js';

export function listEnquiries(params = {}) {
  return api.get('/enquiries', { params }).then((res) => res.data);
}

export function updateEnquiryStatus(id, status) {
  return api.put(`/enquiries/${id}/status`, { status }).then((res) => res.data);
}

export function deleteEnquiry(id) {
  return api.delete(`/enquiries/${id}`).then((res) => res.data);
}
