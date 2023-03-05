<template>
  <div
    class="posts"
    v-if="!isPending"
  >
    <div
      class="posts__lists"
      v-if="posts.length"
    >
      <ThePost
        :post="article"
        :key="article._id"
        v-for="article in posts"
      />
    </div>

    <h3
      class="posts__empty"
      v-else
    >
      <span>OOPS!</span>

      No records found
    </h3>
  </div>

  <ThePreloader v-else />
</template>

<script setup lang="ts">
// Vendors
import { computed } from "vue";
import { useStore } from "vuex";

// Components
import ThePost from "./components/ThePost/ThePost.vue";
import ThePreloader from "@/components/ThePreloader/ThePreloader.vue";


const store = useStore()

const posts = computed(() => store.getters.getAllPost)
const isPending = computed(() => store.getters.getIsPending)
</script>

<style scoped lang="scss">
@import "ThePosts";
</style>