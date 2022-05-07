<template>
  <div class="article">
    <h1 class="article__title title">{{ state.post.title }}</h1>

    <div class="article__info">
      <div class="article__date">{{ state.post.date }}</div>
    </div>


    <div class="article__text" v-html="state.post.text"/>
  </div>
</template>

<script lang="ts">
// Vendor
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
// @ts-ignore
import { highlightAll } from "prismjs"
import 'prismjs/themes/prism.css'
import 'prismjs/themes/prism-okaidia.css'

// Utils
import parseResponseError from "../../utils/parseResponseError";

// Vars
import API from "@/api/api"


export default {
  name: 'Article',

  setup() {
    const route = useRoute()

    const state = ref<{
      post: {
        title: string
        date: string
        text: string
      }
    }>({
      post: {
        title: '',
        date: '',
        text: ''
      }
    })

    onMounted(async () => {
      const { id } = route.params

      await API.getOnePost(id)
        .then(res => state.value.post = res.data)
        .catch(error => console.error(parseResponseError(error)))

      await highlightAll()

      const description = state.value.post.text
        .substring(0, 200)
        .replace(/<\/?[a-zA-Z]+>/gi, '');

      const location = window.location.href

      document.title = state.value.post.title
      document.querySelector('meta[property="og:description"]')?.setAttribute("content", description)
      document.querySelector('meta[property="og:url"]')?.setAttribute("content", location)
    })

    return {
      state
    }
  }
}
</script>

<style lang="scss" scoped>
@import "Article";
</style>