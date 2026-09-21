import api from './axios.js';

export const createEnquiry = async (payload) => {
  const { data } = await api.post('/enquiries', payload);
  return data;
};
