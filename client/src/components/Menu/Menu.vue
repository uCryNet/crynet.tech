<template>
  <div class="menu">
    <div>
      <router-link class="router-link" to="/">Home</router-link> |
      <router-link class="router-link" to="/about">About</router-link>
    </div>
  </div>
</template>

<script lang="js">
export default {
  name: 'Menu',
}
</script>

<style lang="scss" scoped>
@import "Menu";
</style>