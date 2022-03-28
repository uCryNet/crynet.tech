import API from "../api/api";
import parseResponseError from "@/utils/parseResponseError";
import { IGetPosts } from "@/interfaces/interfaces";

const state = {
  posts: [],
  filters: {
    search: "",
    category: ""
  }
}

const getters = {
  getAllPost(state: any) {
    return state.posts
  }
}

const actions = {
  async getAllPosts({ commit }: { commit: any }, data: IGetPosts | {} = {}) {
    API.getPosts(data)
      .then(res => {
        commit("setPosts", res.data)
      })
      .catch(error => {
        console.error(parseResponseError(error))
        commit("setPosts", [])
      })
  }
}

const mutations = {
  setPosts(state: any, posts: any) {
    state.posts = posts;
  },

  setFilters(state: any, filters: any) {
    state.posts = filters;
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}