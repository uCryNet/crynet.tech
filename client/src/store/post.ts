// Vendors
import { Commit } from "vuex";

// Types
import { IArticle, IArticlesResponse } from "@/interfaces/interfaces";
import { IFiltersStore, IPostStore } from "@/store/store.types";

// Variables
import API from "../api/api";

// Utils
import parseResponseError from "@/utils/parseResponseError";


const state: IPostStore = {
  posts: [],
  filters: {
    page: 1,
    limit: 9
  },
  meta: {
    total_pages: 1
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
  },

  getMeta(state: IPostStore) {
    return state.meta
  }
}

const actions = {
  async getAllPosts({ commit }: { commit: Commit }, data: IFiltersStore | {} = {}) {
    commit("setPending", true)

    const filters= {
      ...state.filters,
      ...data
    }

    API.getPosts(filters)
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
}

const mutations = {
  setPosts(state: IPostStore, data: IArticlesResponse) {
    state.posts = data.data
    state.meta = data.meta
  },

  setFilters(state: IPostStore, data: IFiltersStore) {
    const {
      search,
      category,
      page
    } = data

    if (search !== undefined) state.filters.search = search
    if (category !== undefined) state.filters.category = category
    if (page !== undefined) state.filters.page = page
  },

  setPending(state: IPostStore, data: boolean) {
    state.isPending = data
  },
}

export default {
  state,
  getters,
  actions,
  mutations
}