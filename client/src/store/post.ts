import API from "../api/api";
import parseResponseError from "@/utils/parseResponseError";

const state = {
  posts: [],
  filters: {
    search: ""
  }
}

const getters = {
  getAllPost(state: any) {
    return state.posts
  }
}

const actions = {
  async getAllPosts({ commit } : {commit: any}) {
    API.getPosts()
      .then(res => {
        commit("setPosts", res.data)
      })
      .catch(error => {
        console.error(parseResponseError(error))
        commit("setPosts", [])
      })
  },

  search({ commit }: any, data: string) {
    API.search(data)
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

  setSearch(state: any, text: any) {
    state.filters.search = text;
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}