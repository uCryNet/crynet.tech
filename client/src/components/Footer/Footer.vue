<template>
  <footer class="footer">
    <div>© {{ date }} </div>

    <div> Created by <router-link class="router-link text--sandybrown" to="/about">CryNet</router-link></div>
  </footer>
</template>

<script lang="js">
export default {
  name: 'Footer',

  data() {
    return {
      date: new Date().getUTCFullYear()
    }
  },
}
</script>

<style scoped lang="scss">
@import "Footer";
</style>