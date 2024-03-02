import axios from 'axios';
import { env } from '~/shared/config/env';
import { $accessToken } from './model';

const httpClient = axios.create({
  baseURL: env.api.baseUrl
});

httpClient.interceptors.request.use(
  (config) => {
    const accessToken = $accessToken.getState();

    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }

    return config;
  }
);

export { httpClient };
