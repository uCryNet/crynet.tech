<template>
  <div class="article">
    <h1 class="article__title title">
      {{ state.post.title }}
    </h1>

    <div class="article__info">
      <div class="article__date">
        {{ state.post.date }}
      </div>

      <div class="article__category">
        {{ state.post.category.toUpperCase() }}
      </div>
    </div>

    <div
      class="article__text"
      v-html="state.post.text"
    />
  </div>
</template>

<script setup lang="ts">
// Vendor
import { onMounted, reactive } from "vue";
import { useRoute } from "vue-router";

import { highlightAll } from "prismjs"
import 'prismjs/themes/prism.css'
import 'prismjs/themes/prism-okaidia.css'

// Utils
import parseResponseError from "@/utils/parseResponseError";
import API from "@/api/api"


const route = useRoute()

const state = reactive<{
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

  await API.getOnePost(id as string)
    .then(res => state.post = res.data)
    .catch(error => console.error(parseResponseError(error)))

  await highlightAll()

  const description = state.post.text
    .replace(/(<([^>]+)>)/ig,'')
    .substring(0, 150)
    .trim()

  document.title = state.post.title
  document.querySelector('meta[property="og:description"]')?.setAttribute("content", description)
})
</script>

<style lang="scss" scoped>
@import "TheArticle";
</style>