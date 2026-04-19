import axios from 'axios';

const instance = axios.create({
  // Dinudugtong natin ang /api dito para kahit anong link ang nasa Vercel, gagana ang login
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