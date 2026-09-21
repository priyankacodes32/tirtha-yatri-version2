import api from './axios.js';

export const getFeatures = async () => {
  const { data } = await api.get('/features');
  return data;
};
