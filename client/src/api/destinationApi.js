import api from './axios.js';

export const getDestinations = async (params = {}) => {
  const { data } = await api.get('/destinations', { params });
  return data;
};

export const getFeaturedDestinations = async () => {
  const { data } = await api.get('/destinations/featured');
  return data;
};

export const getDestinationBySlug = async (slug) => {
  const { data } = await api.get(`/destinations/${slug}`);
  return data;
};
