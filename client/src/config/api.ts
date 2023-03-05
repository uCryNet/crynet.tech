import axios from 'axios';


axios.defaults.baseURL = process.env.VUE_APP_API
axios.defaults.withCredentials = true
axios.defaults.headers.common[ 'X-Requested-With' ] = 'XMLHttpRequest';