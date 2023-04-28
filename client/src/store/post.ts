// Types
import { IArticle, IGetPosts } from "@/interfaces/interfaces";
import { IFiltersStore, IPostStore } from "@/store/store.types";
import { Commit } from "vuex";

// Variables
import API from "../api/api";

// Utils
import parseResponseError from "@/utils/parseResponseError";


const state: IPostStore = {
  posts: [],
  filters: {
    search: "",
    category: ""
  },
  isPending: false
}

const getters = {
  getAllPost(state: IPostStore) {
    return state.posts
  },

  getFilter(state: IPostStore) {
    return state.filters
  },

  getIsPending(state: IPostStore) {
    return state.isPending
  }
}

const actions = {
  async getAllPosts({ commit }: { commit: Commit }, data: IGetPosts | {} = {}) {
    commit("setPending", true)

    API.getPosts(data)
      .then(res => {
        commit("setPosts", res.data)
        commit("setPending", false)
      })
      .catch(error => {
        console.error(parseResponseError(error))
        commit("setPosts", [])
        commit("setPending", false)
      })
  },

  setFilters({ commit }: { commit: Commit }, data: IFiltersStore) {
    commit("setFilters", data)
  },

  setPending({ commit }: { commit: Commit }, data: boolean) {
    commit("setPending", data)
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
  },

  setPending(state: IPostStore, data: boolean) {
    state.isPending = data;
  },
}

export default {
  state,
  getters,
  actions,
  mutations
}