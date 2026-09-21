import api from './axios.js';

// Admin management view needs every blog post, including drafts — the API
// only returns published posts unless `all=true` is passed by an admin.
export function listBlogs(params = {}) {
  return api.get('/blogs', { params: { all: true, ...params } }).then((res) => res.data);
}

export function getBlogBySlug(slug) {
  return api.get(`/blogs/${slug}`).then((res) => res.data);
}

export function createBlog(payload) {
  return api.post('/blogs', payload).then((res) => res.data);
}

export function updateBlog(id, payload) {
  return api.put(`/blogs/${id}`, payload).then((res) => res.data);
}

export function deleteBlog(id) {
  return api.delete(`/blogs/${id}`).then((res) => res.data);
}
