<template>
  <router-link class="post" :to="'/blog/' + category + '/' + id">
    <img class="post__image" :src="getImageLink"/>

    <div class="post__time">
      <div class="post__date">
        <strong>{{ getDate[0] }}</strong>
        {{ getDate[1] }}.{{ getDate[2] }}
      </div>
    </div>

    <div class="post__text">
      <h4 class="post__category">{{ category }}</h4>
      <h1 class="post__title">{{ title }}</h1>
      <div class="post__desc" v-html="getDescription"></div>
    </div>
  </router-link>
</template>

<style lang="scss" scoped>
@import "Post";
</style>

<script lang="js">
export default {
  name: 'Post',

  props: {
    title: String,
    text: String,
    id: String,
    image: String,
    date: String,
    category: String
  },

  computed: {
    getImageLink() {
      return this.image
        ? this.image
        : `/media/img/post/not-found-image.jpg`
    },
    getDescription() {
      return this.text.substring(0, 100)
    },
    getDate() {
      return this.date.split(".")
    },
  },
}
</script>