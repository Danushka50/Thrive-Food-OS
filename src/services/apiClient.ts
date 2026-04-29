import axios, { type AxiosInstance } from 'axios';

const API: AxiosInstance = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Optional: Global Interceptor to handle common errors
API.interceptors.response.use(
  (response: any) => response,
  (error: any) => {
    // You can handle global 401s or 500s here
    return Promise.reject(error);
  }
);

export default API;