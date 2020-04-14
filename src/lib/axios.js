import axios from 'axios';
import { API_URI } from '../config/env';

export default () => {
  const headers = {};

  if (global.AUTH_TOKEN) {
    headers['authorization'] = global.AUTH_TOKEN;
  }

  const apiAxios = axios.create({
    baseURL: API_URI,
    headers
  });

  apiAxios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

  return apiAxios;
};
