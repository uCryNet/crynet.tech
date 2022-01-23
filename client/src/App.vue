<template>
  <Header />

  <div class="container">
    <router-view></router-view>
  </div>
</template>

<script lang="js">
// Components
import Header from "@/components/Header/Header";

export default {
  name: 'App',

  components: {
    Header
  }
}
</script>