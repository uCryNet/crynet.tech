// Vendors
import { Commit } from "vuex";

// Types
import { ICategoryStore } from "@/interfaces/store";
import { ICategory } from "@/interfaces/category";


const state: ICategoryStore = {
  category: []
}

const getters = {
  getAllCategory(state: ICategoryStore) {
    return state.category
  }
}

const actions = {
  async getCategory({ commit }: { commit: Commit }, data: ICategory[]) {
    commit("setCategory", data)
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