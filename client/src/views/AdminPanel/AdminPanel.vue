<template>
  <div class="admin-panel">
    <Aside
      :switchBlock="switchBlock"
      :block="this.block"
    />

    <div>
      <AdminArticle v-if="this.block === 'article'" :category="category" />
      <AdminArticles v-else-if="this.block === 'articles'" />
      <div v-else-if="this.block === 'category'">2</div>
    </div>
  </div>


</template>

<script lang="js">
// Components
import Aside from "./components/Aside/Aside"
import AdminArticle from "./components/AdminArticle/AdminArticle";
import AdminArticles from "./components/AdminArticles/AdminArticles";

// Utils
import parseResponseError from "../../utils/parseResponseError";

// Var
import API from "@/api/api"
import {ROUTE_LINK} from "../../router";


export default {
  name: 'AdminPanel',

  components: {
    AdminArticles,
    AdminArticle,
    Aside
  },

  data() {
    return {
      isAdmin: false,
      category: [],
      block: 'article'
    }
  },

  mounted() {
    API.checkAccess()
      .then(() => {
        this.isAdmin = true
      })
      .catch(error => {
        console.error(parseResponseError(error))
        this.$router.push(ROUTE_LINK.root)
      })
  },

  methods: {
    switchBlock(block) {
      if (this.block !== block) this.block = block
    }
  },

  watch: {
    isAdmin() {
      if (!this.isAdmin) return

      API.getCategory()
        .then((res) => {
          this.category = res.data
        })
        .catch(error => {
          console.error(parseResponseError(error))
        })
    }
  }
}
</script>

<style scoped lang="scss">
@import "AdminPanel";
</style>