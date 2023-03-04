<template>
  <div class="article">
    <h1 class="article__title title">{{ state.post.title }}</h1>

    <div class="article__info">
      <div class="article__date">{{ state.post.date }}</div>

      <div class="article__category">{{ state.post.category.toUpperCase() }}</div>
    </div>

    <div class="article__text" v-html="state.post.text"/>
  </div>
</template>

<script lang="ts">
// Vendor
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";

import { highlightAll } from "prismjs"
import 'prismjs/themes/prism.css'
import 'prismjs/themes/prism-okaidia.css'

// Variables
import API from "@/api/api"

// Utils
import parseResponseError from "../../utils/parseResponseError";


export default {
  name: 'TheArticle',

  setup() {
    const route = useRoute()

    const state = ref<{
      post: {
        title: string
        date: string
        text: string
        category: string
      }
    }>({
      post: {
        title: "",
        date: "",
        text: "",
        category: ""
      }
    })

    onMounted(async () => {
      const { id } = route.params

      await API.getOnePost(id)
        .then(res => state.value.post = res.data)
        .catch(error => console.error(parseResponseError(error)))

      await highlightAll()

      const description = state.value.post.text
        .replace(/(<([^>]+)>)/ig,'')
        .substring(0, 150)
        .trim()

      document.title = state.value.post.title
      document.querySelector('meta[property="og:description"]')?.setAttribute("content", description)
    })

    return {
      state
    }
  }
}
</script>

<style lang="scss" scoped>
@import "TheArticle";
</style>