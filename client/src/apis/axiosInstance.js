import axios from 'axios';
import constants from '../utils/constants';
import { getBaseUrl } from '../helpers/helpers';

const axiosInstance = axios.create({
  baseURL: getBaseUrl(constants.SERVER_PORT),
  timeout: constants.REQUEST_TIMEOUT,
});

axiosInstance.interceptors.response.use((response) => response, (error) => {
  const { status } = error.response;

  if (status === 401) {
    window.history.replaceState(null, '', '/logout');
  }
  return Promise.reject(error);
});

export default axiosInstance;
