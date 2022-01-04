<template>
<!-- alt mod -->
  <div class="article">
    <div class="meta">
      <div class="photo" style="background-image: url(https://storage.googleapis.com/chydlx/codepen/blog-cards/image-1.jpg)"></div>
      <ul class="details">
        <li class="author"><a href="#">John Doe</a></li>
        <li class="date">Aug. 24, 2015</li>
        <li class="tags">
          <ul>
            <li><a href="#">Learn</a></li>
            <li><a href="#">Code</a></li>
            <li><a href="#">HTML</a></li>
            <li><a href="#">CSS</a></li>
          </ul>
        </li>
      </ul>
    </div>
    <div class="description">
      <h1><router-link :to="'/blog/' + id">{{ title }}</router-link></h1>
      <h2>{{ description }}</h2>
      <p>{{ text }}</p>
      <p class="read-more">
        <a href="#">Читать</a>
      </p>
    </div>
  </div>
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