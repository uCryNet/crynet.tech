<template>
  <div>
    <div class="mb--20">
      <h2 class="title text--center mb--20">ARTICLES <span>& NOTES</span></h2>
      <div class="text text--center">Sharing my experiences</div>
    </div>

    <SearchPost/>

    <Posts/>
  </div>
</template>

<script setup lang="ts">
// Vendors
import { onMounted } from "vue";

// Components
import SearchPost from "@/components/SearchPost/SearchPost.vue";
import Posts from "@/components/Posts/Posts.vue";


onMounted(() => {
  document.title = "CryNet"
})
</script>