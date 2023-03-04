<template>
  <div class="posts" v-if="!isPending">
    <div class="posts__lists" v-if="posts.length">
      <ThePost
        :title="article.title"
        :text="article.text"
        :id="article._id"
        :image="article.image"
        :date="article.date"
        :category="article.category"
        v-for="article in posts"
        :key="article._id"
      />
    </div>

    <h3 v-else class="posts__empty">
      <span>OOPS!</span>
      No records found
    </h3>
  </div>

  <ThePreloader v-else/>
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