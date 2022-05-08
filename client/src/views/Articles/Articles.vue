<template>
  <div class="articles">
    <div class="title text--center mb--20">
      <template v-if="!route.params.category">БЛОГ</template>

      <template v-else>{{ stringValidate(route.params.category) }}</template>
    </div>

    <SearchPost/>

    <Posts/>
  </div>
</template>

<script setup lang="ts">
// Vendors
import { onMounted } from "vue";
import { useRoute } from "vue-router";

// Components
import Posts from "@/components/Posts/Posts.vue";
import SearchPost from "@/components/SearchPost/SearchPost.vue";

// Utils
import { stringValidate } from "@/utils";


const route = useRoute()

onMounted(() => {
  document.title = "CryNet blog"
})
</script>

<style scoped lang="scss">
@import "Articles";
</style>