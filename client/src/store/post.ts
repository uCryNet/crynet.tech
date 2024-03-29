// Vendors
import { Commit } from "vuex";

// Types
import { IFiltersStore, IPostStore } from "@/interfaces/store";
import { IArticlesResponse } from "@/interfaces/article";


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

  getPending(state: IPostStore) {
    return state.isPending
  },

  getMeta(state: IPostStore) {
    return state.meta
  }
}

const actions = {
  async setPosts({ commit }: { commit: Commit }, data: IFiltersStore | {} = {}) {
    commit("setPosts", data)
  },

  async setFilters({ commit }: { commit: Commit }, data: IFiltersStore) {
    commit("setFilters", data)
  },

  async setPending({ commit }: { commit: Commit }, data: boolean) {
    commit("setPending", data)
  }
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