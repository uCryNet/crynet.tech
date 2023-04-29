// Vendors
import axios from 'axios';

// Types
import { ICreatePost, IUpdatePost } from "@/views/AdminPanel/AdminPanel.types";
import { IFiltersStore } from "@/store/store.types";


const getPosts = (data: IFiltersStore) => {
  return axios.post(`post/get-all`, data);
}

const getOnePost = (uri: string) => {
  return axios.get(`post/get-one/${ uri }`,);
}

const updatePost = (form: IUpdatePost) => {
  const formData = new FormData();

  formData.append('title', form.title);
  formData.append('text', form.text);
  formData.append('category', form.category);
  formData.append('id', form._id);
  // TODO: обновлять картинку при редактировании
  formData.append('image', form.image);

  return axios.put(`post/update/`, formData);
}

const createPost = (form: ICreatePost) => {
  const formData = new FormData();

  formData.append('title', form.title);
  formData.append('text', form.text);
  formData.append('category', form.category);
  formData.append('image', form.image);

  return axios.post(`post/create`, formData);
}

const login = (auth: { login: string, password: string }) => {
  return axios.post(`user/login/`, auth);
}

const search = (search: string) => {
  return axios.post(`post/search`, { search });
}

const checkAccess = () => {
  return axios.get(`user/check-access`);
}

const getCategory = () => {
  return axios.get(`category/get-all`);
}

const deletePost = (id: string) => {
  return axios.delete(`/post/delete/${ id }`);
}

const uploadImage = (data: FormData) => {
  return axios.post(`file/upload`, data);
}

export default {
  getPosts,
  getOnePost,
  updatePost,
  createPost,
  login,
  search,
  checkAccess,
  getCategory,
  deletePost,
  uploadImage
}