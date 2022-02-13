import axios from 'axios';
import {RouteParamValue} from "vue-router";


const getNews = () => {
  return axios.get(`post/get-all`);
}

const getOneNews = (uri: string | RouteParamValue[]) => {
  return axios.get(`post/get-one/${uri}`,);
}

const createNews = (form: any) => {
  const formData = new FormData();

  formData.append('title', form.title);
  formData.append('text', form.text);
  formData.append('category', form.category);
  formData.append('image', form.image);

  return axios.post(`post/create`, formData);
}

const login = (auth: {login: string, password: string}) => {
  return axios.post(`user/login/`, auth);
}

const search = (search: string) => {
  return axios.post(`post/search`, {search});
}

const checkAccess = () => {
  return axios.get(`user/check-access`);
}

const getCategory = () => {
  return axios.get(`category/get-all`);
}

export default {
  getNews,
  getOneNews,
  createNews,
  login,
  search,
  checkAccess,
  getCategory,
}