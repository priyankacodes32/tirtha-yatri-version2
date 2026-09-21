import api from './axios.js';

export const getSettings = async () => {
  const { data } = await api.get('/settings');
  return data;
};
