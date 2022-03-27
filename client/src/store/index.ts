import Vuex from "vuex"

import category from "./category"
import post from "./post"


export default new Vuex.Store({
  modules: {
    category,
    post
  }
})
