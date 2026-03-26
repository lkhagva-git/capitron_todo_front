import axios from 'axios';

const API_BASE_URL = 'http://localhost:8004';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Save tokens to localStorage
 */
const setTokens = (access, refresh) => {
  localStorage.setItem('access', access);
  localStorage.setItem('refresh', refresh);
};

/**
 * Clear tokens from localStorage
 */
const clearTokens = () => {
  localStorage.removeItem('access');
  localStorage.removeItem('refresh');
};

/**
 * Get access token
 */
const getAccessToken = () => {
  return localStorage.getItem('access');
};

/**
 * Get refresh token
 */
const getRefreshToken = () => {
  return localStorage.getItem('refresh');
};

/**
 * Request interceptor:
 * attach access token as Bearer token
 */
api.interceptors.request.use(
  (config) => {
    const access = getAccessToken();
    if (access) {
      config.headers.Authorization = `Bearer ${access}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

/**
 * Response interceptor:
 * if access token expired, try refresh token once
 */
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      const refresh = getRefreshToken();

      if (!refresh) {
        clearTokens();
        return Promise.reject(error);
      }

      try {
        const response = await axios.post(
          `${API_BASE_URL}/api/token/refresh/`,
          { refresh },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        const newAccess = response.data.access;
        localStorage.setItem('access', newAccess);

        originalRequest.headers.Authorization = `Bearer ${newAccess}`;
        return api(originalRequest);
      } catch (refreshError) {
        clearTokens();
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

/**
 * Handles success responses
 * @param {Object} response
 * @returns {Object}
 */
const handleSuccess = (response) => {
  console.log("response =====================", response)
  return response.data;
};

/**
 * Handles error responses
 * @param {Object} error
 * @throws Error
 */
const handleError = (error) => {
  if (error.response) {
    console.error('Error Response:', error.response);
    throw new Error(
      error.response.data.detail ||
      error.response.data.message ||
      'An error occurred'
    );
  } else if (error.request) {
    console.error('No Response:', error.request);
    throw new Error('No response received from the server');
  } else {
    console.error('Error Message:', error.message);
    throw new Error(error.message || 'Request setup error');
  }
};

/**
 * Generic POST request
 * @param {string} url
 * @param {Object} data
 * @returns {Object}
 */
export const postRequest = async (url, data) => {
  try {
    const response = await api.post(url, data);
    return handleSuccess(response);
  } catch (error) {
    handleError(error);
  }
};

/**
 * Generic GET request
 * @param {string} url
 * @returns {Object}
 */
export const getRequest = async (url) => {
  try {
    const response = await api.get(url);
    return handleSuccess(response);
  } catch (error) {
    handleError(error);
  }
};

/**
 * Generic PUT request
 * @param {string} url
 * @param {Object} data
 * @returns {Object}
 */
export const putRequest = async (url, data) => {
  try {
    const response = await api.put(url, data);
    return handleSuccess(response);
  } catch (error) {
    handleError(error);
  }
};

/**
 * Generic DELETE request
 * @param {string} url
 * @returns {Object}
 */
export const deleteRequest = async (url) => {
  try {
    const response = await api.delete(url);
    return handleSuccess(response);
  } catch (error) {
    handleError(error);
  }
};

/**
 * Login user
 * data = { username: '', password: '' }
 * backend returns { access, refresh }
 */
export const loginFetch = async (data) => {
  try {
    const response = await api.post('/api/token/', data);
    const result = handleSuccess(response);

    if (result.access && result.refresh) {
      setTokens(result.access, result.refresh);
    }

    return result;
  } catch (error) {
    handleError(error);
  }
};

/**
 * Logout user
 * just clear tokens on frontend
 */
export const logoutFetch = () => {
  clearTokens();
};

/**
 * Check protected route
 */
export const testAccessFetch = async () => {
  return await getRequest('/api/test/');
};

export default api;