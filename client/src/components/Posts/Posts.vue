<template>
  <div class="posts" v-if="!isPending">
    <div class="posts__lists" v-if="posts.length">
      <Post
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

  <Loader v-else/>
</template>

<script setup lang="ts">
// Vendors
import { computed } from "vue";
import { useStore } from "vuex";

// Components
import Post from "./components/Post/Post.vue";
import Loader from "@/components/Loader/Loader.vue";


const store = useStore()

const posts = computed(() => store.getters.getAllPost)
const isPending = computed(() => store.getters.getIsPending)
</script>

<style scoped lang="scss">
@import "Posts";
</style>