<template>
  <div class="posts">
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

    <div v-else class="text--100 text--40 text--center text--raleway mb--10 mt--10">Упс! Записей не обнаруженно</div>
  </div>
</template>

<script lang="ts">
// Vendors
import { computed } from "vue";
import { useStore } from "vuex";

// Components
import Post from "./components/Post/Post.vue";


export default {
  name: 'Posts',

  components: {
    Post
  },

  setup() {
    const store = useStore()

    const posts = computed(() => store.getters.getAllPost)

    return {
      posts
    }
  }
}
</script>

<style scoped lang="scss">
@import "Posts";
</style>