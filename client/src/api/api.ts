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

const search = (search: string) => {
  return axios.post(`post/search`, {search});
}

export default {
  getNews,
  getOneNews,
  login,
  search
}