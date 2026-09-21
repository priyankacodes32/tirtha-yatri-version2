import api from './axios.js';

export const getCategories = async (type) => {
  const { data } = await api.get('/categories', { params: { type } });
  return data;
};
