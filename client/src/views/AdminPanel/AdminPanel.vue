<template>
  <div class="admin-panel">
    <Aside />

    <div class="admin-panel__wrapper">
      <AddArticle :category="category" />
    </div>
  </div>
</template>

<script lang="js">
// Utils
import parseResponseError from "../../utils/parseResponseError";
// Components
import Aside from "./components/Aside/Aside"

// Var
import API from "@/api/api"
import {ROUTE_LINK} from "../../router";
import AddArticle from "./components/AddArticle/AddArticle";

export default {
  name: 'Login',

  components: {
    AddArticle,
    Aside
  },

  data() {
    return {
      isAdmin: false,
      category: []
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