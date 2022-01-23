<template>
  <router-link class="article" :to="'/blog/' + id">
    <img class="article__image" :src="imageLink" />

    <div class="article__time">
      <div class="article__date">
        <strong>{{ parseDate[0] }}</strong>
        {{ parseDate[1] }}.{{ parseDate[2] }}
      </div>
    </div>

    <div class="article__text">
      <h4 class="article__category">Category</h4>
      <h1 class="article__title">{{ title }}</h1>
      <p class="article__desc">{{ text.substring(0, 100) }}</p>
    </div>
  </router-link>
</template>

<style lang="scss" scoped>
@import "Article";
</style>

<script lang="js">
import {SERVER_API} from "@/config/api"

export default {
  props: {
    title: String,
    text: String,
    id: String,
    image: String,
    date: String,
  },

  computed: {
    imageLink: function () {
      return this.image
        ? `${SERVER_API}/${this.image}`
        : `${SERVER_API}/static/image/other/not-found-image.jpg`
    },

    parseDate: function () {
      return this.date.split(".")
    }
  },
}
</script>