<template>
  <div class="articles">
    <div class="title text--center mb--20">
      <template v-if="!this.$route.params.category">БЛОГ</template>

      <template v-else>{{ this.$route.params.category }}</template>
    </div>

    <SearchPost />

    <Posts />
  </div>
</template>

<script lang="js">
// Components
import Posts from "@/components/Posts/Posts";
import SearchPost from "@/components/SearchPost/SearchPost";


export default {
  name: 'Articles',

  components: {
    Posts,
    SearchPost
  }
}
</script>

<style scoped lang="scss">
@import "Articles";
</style>