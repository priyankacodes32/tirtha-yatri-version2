import api from './axios.js';

export const getReviews = async (params = {}) => {
  const { data } = await api.get('/reviews', { params });
  return data;
};

export const submitReview = async (payload) => {
  const { data } = await api.post('/reviews', payload);
  return data;
};
