<template>
  <div class="article">
    <h1 class="article__title title">{{ list.title }}</h1>

    <div class="article__text" v-html="list.text"/>

    <div class="article__info">
      <div class="article__author">Автор: <span>{{ list.author }}</span></div>
      <div class="article__date">{{ list.date }}</div>
    </div>
  </div>
</template>

<script lang="js">
// Vars
import API from "@/api/api"
import parseResponseError from "../../utils/parseResponseError";


export default {
  name: 'Article',

  data() {
    return {
      list: []
    };
  },

  mounted() {
    const { id } = this.$route.params

    API.getOnePost(id)
      .then(res => {
        this.list = res.data
      })
      .catch(error => console.error(parseResponseError(error)))
  }
}
</script>

<style lang="scss" scoped>
@import "Article";
</style>