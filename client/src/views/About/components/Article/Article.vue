<template>
  <router-link class="article" :to="'/blog/' + id">
    <div class="article__inner">
      <img class="article__image" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1159990/pike-place.jpg" />
      <div class="article__details">
        <h4 class="article__category">Category</h4>
        <h1 class="article__title">{{ title }}</h1>
        <p>{{ text.substring(0, 70) }}</p>
        <p class="article__tag">Tag</p>
      </div>
    </div>
  </router-link>
</template>

<style lang="scss" scoped>
@import "Article";
</style>

<script lang="ts">
export default {
  props: {
    title: String,
    text: String,
    description: String,
    id: String
  },
}
</script>