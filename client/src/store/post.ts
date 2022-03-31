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
  },

  getFilter(state: any) {
    return state.filters
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
  },

  setSearchFilters({ commit }: { commit: any }, data: string) {
    commit("setSearchFilters", data)
  },

  setCategoryFilters({ commit }: { commit: any }, data: string) {
    commit("setCategoryFilters", data)
  }
}

const mutations = {
  setPosts(state: any, posts: any) {
    state.posts = posts;
  },

  setSearchFilters(search: string) {
    state.filters.search = search;
  },

  setCategoryFilters(search: string) {
    state.filters.search = search;
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}