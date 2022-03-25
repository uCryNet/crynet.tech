// import {set} from "vue";
import API from "../api/api";
import parseResponseError from "@/utils/parseResponseError";

const state = {
  category: {}
}

const getters = {
  getAllCategory(state: any) {
    return state.category
  }
}

const actions = {
  async getCategory({ commit } : {commit: any}) {
    API.getCategory()
      .then(res => commit("setCategory", res.data))
      .catch(error => {
        console.error(parseResponseError(error))
        commit("setCategory", {})
      })
  }
}

const mutations = {
  setCategory(state: any, category: any) {
    state.category = category;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
}