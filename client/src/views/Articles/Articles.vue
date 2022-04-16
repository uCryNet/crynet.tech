<template>
  <div class="articles">
    <div class="title text--center mb--20">
      <template v-if="!route.params.category">БЛОГ</template>

      <template v-else>{{ route.params.category }}</template>
    </div>

    <SearchPost/>

    <Posts/>
  </div>
</template>

<script lang="js">
// Vendors
import { onMounted } from "vue";
import { useRoute } from "vue-router";

// Components
import Posts from "@/components/Posts/Posts";
import SearchPost from "@/components/SearchPost/SearchPost";


export default {
  name: 'Articles',

  components: {
    Posts,
    SearchPost
  },

  setup() {
    const route = useRoute()

    onMounted(() => {
      document.title = "CryNet blog"
    })

    return {
      route
    }
  }
}
</script>

<style scoped lang="scss">
@import "Articles";
</style>