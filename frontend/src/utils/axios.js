/**
 * Axios Instance Configuration
 * Preconfigured axios instance with base URL and JWT token interceptor
 * @module utils/axios
 */

import axios from 'axios'

/**
 * Axios instance with base URL set to backend API
 * Automatically includes JWT token in Authorization header if available
 */
const axiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND}/api/v1`,
})

/**
 * Request interceptor to add JWT token to all requests
 * Retrieves token from localStorage and adds it to Authorization header
 */
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config;
})

export default axiosInstance
