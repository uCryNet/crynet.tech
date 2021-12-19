import axios from 'axios';


const host = window.location.hostname;

const prodHosts = ['localhost'];

if (prodHosts.includes(host)) { // PROD
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