import axios from 'axios';


const getNews = () => {
  return axios.get(`post/get-all`);
}

export default {
  getNews
}