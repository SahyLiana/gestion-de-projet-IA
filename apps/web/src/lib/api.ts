import axios, { type AxiosInstance, type InternalAxiosRequestConfig } from 'axios';

declare module 'axios' {
  interface InternalAxiosRequestConfig {
    _retry?: boolean;
  }
}

let accessToken: string | null = null;

export function setAccessToken(token: string | null): void {
  accessToken = token;
}

export function getAccessToken(): string | null {
  return accessToken;
}

export const api: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  if (accessToken && config.headers) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

let isRefreshing = false;
let refreshPromise: Promise<string | null> | null = null;

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (!isRefreshing) {
        isRefreshing = true;
        refreshPromise = tryRefresh().finally(() => {
          isRefreshing = false;
        });
      }

      try {
        const newToken = await refreshPromise;
        if (newToken) {
          setAccessToken(newToken);
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          return api(originalRequest);
        }
      } catch {
        // refresh échoué
      }

      setAccessToken(null);
      redirectToLogin();
      return Promise.reject(error);
    }

    return Promise.reject(error);
  },
);

export async function tryRefresh(): Promise<string | null> {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/auth/refresh`,
      {},
      { withCredentials: true },
    );
    return response.data.accessToken;
  } catch {
    return null;
  }
}

function redirectToLogin(): void {
  if (window.location.pathname !== '/login') {
    window.location.href = '/login';
  }
}