import axios from 'axios';


const PROD_HOST = 'crynet.tech'
const DEV_HOST = 'crynet-dev.pp.ua'
export const { hostname: HOST_NAME } = window.location
export const SERVER = PROD_HOST.includes(HOST_NAME)
  ? `https://${PROD_HOST}/`
  : DEV_HOST.includes(HOST_NAME)
    ? `http://${DEV_HOST}/`
    : `http://localhost:5000/`

export const SERVER_API = SERVER + "api"

axios.defaults.baseURL = SERVER_API
axios.defaults.headers.common[ 'X-Requested-With' ] = 'XMLHttpRequest';
axios.defaults.withCredentials = true
axios.interceptors.response.use(
  response => {
    // Do something with response data
    return Promise.resolve(response);
  },
  error => {
    // Do something with response error
    return Promise.reject(error);
  });
