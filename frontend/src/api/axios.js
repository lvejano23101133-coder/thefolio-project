import axios from 'axios';

const instance = axios.create({
  // Pinagsama natin ang Vercel variable at ang /api path
  baseURL: `${process.env.REACT_APP_API_URL}/api` || 'http://localhost:5000/api',
});

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default instance;