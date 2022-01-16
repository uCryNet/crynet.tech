import axios from 'axios';
import {RouteParamValue} from "vue-router";


const getNews = () => {
  return axios.get(`post/get-all`);
}

const getOneNews = (uri: string | RouteParamValue[]) => {
  return axios.get(`post/get-one/${uri}`,);
}

const login = (auth: {login: string, password: string}) => {
  return axios.post(`user/login/`, auth);
}

export default {
  getNews,
  getOneNews,
  login
}