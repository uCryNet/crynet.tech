// Types
import { ICategoryStore } from "@/interfaces/store";
import { Commit } from "vuex";
import { ICategory } from "@/interfaces/category";

// Variables
import API from "../api/api";

// Utils
import parseResponseError from "@/utils/parseResponseError";


const state: ICategoryStore = {
  category: []
}

const getters = {
  getAllCategory(state: ICategoryStore) {
    return state.category
  }
}

const actions = {
  async getCategory({ commit } : {commit: Commit}) {
    API.getCategory()
      .then(res => commit("setCategory", res.data))
      .catch(error => {
        console.error(parseResponseError(error))
        commit("setCategory", [])
      })
  }
}

const mutations = {
  setCategory(state: ICategoryStore, category: ICategory[]) {
    state.category = category;
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}