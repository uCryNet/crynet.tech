<template>
  <!-- TODO: fix this -->
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
// Vendors
import { toRefs } from "vue";


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

  setup(props) {
    const { text, image, date } = toRefs(props)

    const getDate = date.value.split(".")
    const getDescription = text.value.substring(0, 200) + "..."
    const getImageLink = image.value ? image.value : `/media/img/post/not-found-image.jpg`

    return {
      getDate,
      getDescription,
      getImageLink
    }
  }
}
</script>