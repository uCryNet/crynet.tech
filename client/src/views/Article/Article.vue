<template>
  <div class="article">
    <h1 class="article__title title">{{ post.title }}</h1>

    <div class="article__info">
      <div class="article__date">{{ post.date }}</div>
    </div>

    <div class="article__text" v-html="post.text"/>
  </div>
</template>

<script lang="js">
// Vendor
import Prism from "prismjs"
import 'prismjs/themes/prism.css'
import 'prismjs/themes/prism-okaidia.css'

// Vars
import API from "@/api/api"
import parseResponseError from "../../utils/parseResponseError";


export default {
  name: 'Article',

  data() {
    return {
      post: {}
    };
  },

  async mounted() {
    const { id } = this.$route.params

    await API.getOnePost(id)
      .then(res => this.post = res.data)
      .catch(error => console.error(parseResponseError(error)))

    await Prism.highlightAll()



    const description = this.post.text
      .substring(0, 200)
      .replace(/<\/?[a-zA-Z]+>/gi,'');

    const location = window.location.href

    document.title = this.post.title
    document.querySelector('meta[property="og:description"]').setAttribute("content", description)
    document.querySelector('meta[property="og:url"]').setAttribute("content", location)
  },
}
</script>

<style lang="scss" scoped>
@import "Article";
</style>