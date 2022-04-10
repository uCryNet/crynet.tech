<template>
  <footer class="footer">
    <div>© {{ date }} </div>
    <div> Created by <router-link class="router-link text--sandybrown" :to="ROUTE_LINK.about">CryNet</router-link></div>
  </footer>
</template>

<script lang="js">
// Vars
import { ROUTE_LINK } from "@/router";


export default {
  name: 'Footer',

  setup() {
    const date = new Date().getUTCFullYear()

    return {
      date,
      ROUTE_LINK
    }
  }
}
</script>

<style scoped lang="scss">
@import "Footer";
</style>