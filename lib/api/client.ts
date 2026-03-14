import axios from 'axios';
import { useAuthStore } from '../../store/useAuthStore';

// Create a configured Axios instance
export const apiClient = axios.create({
  baseURL: 'https://madiotech.com.ng/api/',
  timeout: 30000, // 30 seconds as per the old Retrofit config
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// Request interceptor to attach authentication tokens
apiClient.interceptors.request.use(
  (config) => {
    // We fetch the current state from our Zustand store
    const { bearerToken, apiKey } = useAuthStore.getState();

    // The API might need Bearer token or API key.
    // We attach the Bearer token as default Authorization header.
    // If an endpoint requires an apiKey instead, it will explicitly override it or pass it.
    if (bearerToken) {
      // In Retrofit it was: @Header("Authorization") String bearerToken
      // So we just pass the exact string stored as `bearerToken`
      config.headers.Authorization = bearerToken;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle global errors (e.g. 401 Unauthorized)
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      // Handle unauthorized errors (e.g., clear session and redirect)
      const logout = useAuthStore.getState().logout;
      logout();
    }
    return Promise.reject(error);
  }
);
