// Libraries
import axios from 'axios';

// Application
import { ApiError } from './apiError';

const apiClient = axios.create({
  baseURL: '/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

apiClient.interceptors.response.use(
  (response) => response,
  (error: unknown) => Promise.reject(ApiError.fromUnknown(error)),
);

export { apiClient };
