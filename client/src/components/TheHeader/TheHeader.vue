<template>
  <header class="header">
    <TheMenu />

    <div class="header__info container">
      <div class="title-think">YET ANOTHER</div>

      <h2 class="title-big-bold">BLOG</h2>

      <span>🇺🇦</span>
    </div>
  </header>
</template>

<script setup lang="ts">
// Components
import TheMenu from "@/components/TheMenu/TheMenu.vue"
</script>

<style lang="scss" scoped>
@import "TheHeader";
</style>