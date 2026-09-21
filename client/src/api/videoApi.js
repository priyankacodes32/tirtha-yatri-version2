import api from './axios.js';

export const getVideos = async (params = {}) => {
  const { data } = await api.get('/videos', { params });
  return data;
};
