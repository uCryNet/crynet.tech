<template>
  <footer class="footer">
    <div>
      © {{ date }}
    </div>
    <div>
      Created by

      <router-link
        class="router-link text--sandybrown"
        :to="ROUTES_CONFIG.about.path"
      >
        CryNet
      </router-link>
    </div>
  </footer>
</template>

<script setup lang="ts">
// Variables
import { ROUTES_CONFIG } from "@/router";


const date = new Date().getUTCFullYear()
</script>

<style scoped lang="scss">
@import "TheFooter";
</style>