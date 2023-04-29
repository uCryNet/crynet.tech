<template>
  <header class="header">
    <TheMenu />

    <router-link
      class="header__info container router-link text--sandybrown"
      :to="ROUTES_CONFIG.root.path"
    >
      <span class="title-think">
        YET ANOTHER
      </span>

      <span class="title-big-bold">
        DEVELOPER
      </span>

      <span>🇺🇦</span>
    </router-link>
  </header>
</template>

<script setup lang="ts">
// Components
import TheMenu from "@/components/TheHeader/components/HeaderMenu/HeaderMenu.vue"

// Constant
import { ROUTES_CONFIG } from '@/router';
</script>

<style lang="scss" scoped>
@import "TheHeader";
</style>