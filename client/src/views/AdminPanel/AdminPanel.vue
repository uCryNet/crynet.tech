<template>
  <div class="admin-panel">
    <Aside />


    <div class="admin-panel__wrapper">
      Контент
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

export default {
  name: 'Login',

  components: {
    Aside
  },

  mounted() {
    API.checkAccess()
      .then(() => {
        // const {isAdmin} = res.data
      })
      .catch(error => {
        console.error(parseResponseError(error))
        this.$router.push(ROUTE_LINK.root)
      })
  }
}
</script>

<style scoped lang="scss">
@import "AdminPanel";
</style>