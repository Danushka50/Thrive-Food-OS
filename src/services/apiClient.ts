import axios, { type AxiosError, type AxiosInstance, type AxiosResponse } from 'axios';

const LOCAL_API_PORT = '5000';

const isLocalHostname = (hostname?: string | null) => {
  if (!hostname) {
    return false;
  }

  const normalizedHostname = hostname.trim().toLowerCase();

  if (
    normalizedHostname === 'localhost' ||
    normalizedHostname === '127.0.0.1' ||
    normalizedHostname === '::1'
  ) {
    return true;
  }

  return (
    /^10(?:\.\d{1,3}){3}$/.test(normalizedHostname) ||
    /^192\.168(?:\.\d{1,3}){2}$/.test(normalizedHostname) ||
    /^172\.(1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2}$/.test(normalizedHostname)
  );
};

const getLocalApiBaseUrl = () => {
  if (typeof window !== 'undefined' && isLocalHostname(window.location.hostname)) {
    return `http://${window.location.hostname}:${LOCAL_API_PORT}/api`;
  }

  return `http://localhost:${LOCAL_API_PORT}/api`;
};

const getDefaultApiBaseUrl = () => {
  if (typeof window !== 'undefined' && isLocalHostname(window.location.hostname)) {
    return getLocalApiBaseUrl();
  }

  return import.meta.env.DEV ? getLocalApiBaseUrl() : '/api';
};

const DEFAULT_API_BASE_URL = getDefaultApiBaseUrl();

const normalizeApiBaseUrl = (value?: string) => {
  const candidate = value?.trim();

  if (!candidate) {
    return DEFAULT_API_BASE_URL;
  }

  const withoutTrailingSlashes = candidate.replace(/\/+$/, '');

  if (!withoutTrailingSlashes) {
    return DEFAULT_API_BASE_URL;
  }

  if (withoutTrailingSlashes === '/api' || /\/api$/i.test(withoutTrailingSlashes)) {
    return withoutTrailingSlashes;
  }

  return `${withoutTrailingSlashes}/api`;
};

export const API_BASE_URL = normalizeApiBaseUrl(import.meta.env.VITE_API_BASE_URL);
export const API_ORIGIN = API_BASE_URL === '/api' ? '' : API_BASE_URL.replace(/\/api$/, '');

if (!import.meta.env.DEV && !import.meta.env.VITE_API_BASE_URL && typeof window !== 'undefined' && !isLocalHostname(window.location.hostname)) {
  console.warn(
    'VITE_API_BASE_URL is not set. API requests are using /api on the current site origin.',
  );
}

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
