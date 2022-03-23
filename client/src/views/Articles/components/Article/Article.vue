<template>
  <router-link class="article" :to="'/blog/' + id">
    <img class="article__image" :src="getImageLink" />

    <div class="article__time">
      <div class="article__date">
        <strong>{{ getDate[0] }}</strong>
        {{ getDate[1] }}.{{ getDate[2] }}
      </div>
    </div>

    <div class="article__text">
      <h4 class="article__category">{{ getCategory }}</h4>
      <h1 class="article__title">{{ title }}</h1>
      <div class="article__desc" v-html="getDescription"></div>
    </div>
  </router-link>
</template>

<style lang="scss" scoped>
@import "Article";
</style>

<script lang="js">
// Vars
import {SERVER_API} from "@/config/api";


export default {
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
        ? `${SERVER_API}/${this.image}`
        : `${SERVER_API}/static/image/other/not-found-image.jpg`
    },
    getDescription() {
      return this.text.substring(0, 100)
    },
    getDate() {
      return this.date.split(".")
    },
    getCategory() {
      return this.category ? this.category : "—"
    },
  },
}
</script>