// Types
import { IArticle, IGetPosts } from "@/interfaces/interfaces";
import { IFiltersStore, IPostStore } from "@/store/store.types";
import { Commit } from "vuex";

// Vars
import API from "../api/api";

// Utils
import parseResponseError from "@/utils/parseResponseError";


const state: IPostStore = {
  posts: [],
  filters: {
    search: "",
    category: ""
  }
}

const getters = {
  getAllPost(state: IPostStore) {
    return state.posts
  },

  getFilter(state: IPostStore) {
    return state.filters
  }
}

const actions = {
  async getAllPosts({ commit }: { commit: Commit }, data: IGetPosts | {} = {}) {

    API.getPosts(data)
      .then(res => {
        commit("setPosts", res.data)
      })
      .catch(error => {
        console.error(parseResponseError(error))
        commit("setPosts", [])
      })
  },

  setFilters({ commit }: { commit: Commit }, data: IFiltersStore) {
    commit("setFilters", data)
  },
}

const mutations = {
  setPosts(state: IPostStore, posts: IArticle[]) {
    state.posts = posts;
  },

  setFilters(state: IPostStore, data: IFiltersStore) {
    const { search, category } = data

    if (search !== undefined) state.filters.search = search
    if (category !== undefined) state.filters.category = category
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}