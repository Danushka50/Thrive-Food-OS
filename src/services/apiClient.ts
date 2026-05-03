import axios, { type AxiosError, type AxiosInstance, type AxiosResponse } from 'axios';

const DEFAULT_API_BASE_URL = 'http://localhost:5000/api';
export const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || DEFAULT_API_BASE_URL).replace(/\/+$/, '');
export const API_ORIGIN = API_BASE_URL.replace(/\/api$/, '');

export const resolveApiAssetUrl = (value?: string | null) => {
  if (!value) {
    return null;
  }

  if (/^https?:\/\//i.test(value)) {
    return value;
  }

  if (value.startsWith('/')) {
    return `${API_ORIGIN}${value}`;
  }

  return `${API_ORIGIN}/${value}`;
};

const API: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Optional: Global Interceptor to handle common errors
API.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    // You can handle global 401s or 500s here
    return Promise.reject(error);
  }
);

export default API;
