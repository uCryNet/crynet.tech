import axios from 'axios';

const PROD_HOST = ['localhost'];
export const {hostname: HOST_NAME, host: HOST} = window.location
export const SERVER_API = PROD_HOST.includes(HOST_NAME) ? `localhost:5000/api` : `localhost:5000/api`

if (PROD_HOST.includes(HOST_NAME)) { // PROD
  axios.defaults.baseURL = '//localhost:5000/api/';
} else { // DEV
  axios.defaults.baseURL = '//localhost:5000/api/';
}

axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

axios.interceptors.response.use(
  response => {
    // Do something with response data

    return Promise.resolve(response);
  },
  error => {
    // Do something with response error

    return Promise.reject(error);
  });