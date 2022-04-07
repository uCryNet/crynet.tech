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

<script lang="js">
// Components
import Post from "./components/Post/Post";


export default {
  name: 'Posts',

  components: {
    Post
  },

  computed: {
    posts() {
      return this.$store.getters.getAllPost
    }
  }
}
</script>

<style scoped lang="scss">
@import "Posts";
</style>