import api from './axios.js';

export const getPackages = async (params = {}) => {
  const { data } = await api.get('/packages', { params });
  return data; // { success, count, page, pages, data }
};

export const getFeaturedPackages = async () => {
  const { data } = await api.get('/packages/featured');
  return data;
};

export const getPackageBySlug = async (slug) => {
  const { data } = await api.get(`/packages/${slug}`);
  return data;
};
