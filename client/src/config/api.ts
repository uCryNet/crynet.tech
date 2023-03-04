import axios from 'axios';


axios.defaults.baseURL = process.env.VUE_APP_API
// TODO: only for local dev. Del on prod
axios.defaults.withCredentials = true