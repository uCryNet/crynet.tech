<template>
  <div>
    <div class="mb--20">
      <h2 class="title text--center mb--20">
        ARTICLES
        <span> & NOTES</span>
      </h2>
      <div class="text text--center">
        Let's try to find
      </div>
    </div>

    <SearchPost />

    <ThePosts />
  </div>
</template>

<script setup lang="ts">
// Vendors
import { onMounted } from "vue";

// Components
import SearchPost from "@/components/SearchPost/SearchPost.vue";
import ThePosts from "@/components/ThePosts/ThePosts.vue";


onMounted(() => {
  document.title = "CryNet"
})
</script>