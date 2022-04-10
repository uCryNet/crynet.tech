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
    console.log(data)

    API.getPosts(data)
      .then(res => {
        commit("setPosts", res.data)
      })
      .catch(error => {
        console.error(parseResponseError(error))
        commit("setPosts", [])
      })
  },

  setFilters({ commit }: { commit: any }, data: {}) {
    commit("setFilters", data)
  },
}

const mutations = {
  setPosts(state: any, posts: any) {
    state.posts = posts;
  },

  setFilters(state: any, data: any) {
    const { search, category } = data

    // state.filters = {
    //   ...state.filters.prev,
    //   search: search ? search : state.filters.prev.search
    // }

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