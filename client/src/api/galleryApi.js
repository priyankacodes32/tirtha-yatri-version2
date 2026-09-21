import api from './axios.js';

export const getGalleryImages = async (params = {}) => {
  const { data } = await api.get('/gallery', { params });
  return data;
};
