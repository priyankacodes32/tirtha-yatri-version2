import api from './axios.js';

// Admin management views (tables) need every category, including inactive ones.
export function listCategories(type) {
  return api.get('/categories', { params: { type, all: true } }).then((res) => res.data);
}

// Form <select> population — only active categories will pass validation
// when saving a package/destination, so we intentionally omit `all=true` here.
export function listActiveCategories(type) {
  return api.get('/categories', { params: { type } }).then((res) => res.data);
}

export function createCategory(payload) {
  return api.post('/categories', payload).then((res) => res.data);
}

export function updateCategory(id, payload) {
  return api.put(`/categories/${id}`, payload).then((res) => res.data);
}

export function deleteCategory(id) {
  return api.delete(`/categories/${id}`).then((res) => res.data);
}
