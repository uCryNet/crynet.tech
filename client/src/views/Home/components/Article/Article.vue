<template>
  <router-link class="article" :to="'/blog/' + id">
    <div class="article__inner">
      <img class="article__image" :src="image" />
      <div class="article__details">
        <h4 class="article__category">Category</h4>
        <h1 class="article__title">{{ title }}</h1>
        <p>{{ text.substring(0, 100) }}</p>
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
    id: String,
    image: String
  },

  mounted() {
    console.log(this)
  }
}
</script>