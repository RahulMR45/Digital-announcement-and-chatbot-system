import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const getNotifications = async () => {
  const response = await axios.get(`${API_URL}/notifications`);
  return response.data;
};

export const createNotification = async (notification) => {
  const response = await axios.post(`${API_URL}/notifications`, notification);
  return response.data;
};

export const deleteNotification = async (id) => {
  await axios.delete(`${API_URL}/notifications/${id}`);
};
