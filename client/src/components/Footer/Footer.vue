<template>
  <footer class="footer">
    <div>© {{ date }} </div>
    <div> Created by <router-link class="router-link text--sandybrown" :to="ROUTE_LINK.about">CryNet</router-link></div>
  </footer>
</template>

<script setup lang="ts">
// Vars
import { ROUTE_LINK } from "@/router";


const date = new Date().getUTCFullYear()
</script>

<style scoped lang="scss">
@import "Footer";
</style>