<template>
  <div class="article">
    <h2>{{ list.title }}</h2>

    <div v-html="list.text" />

    <div>{{ list.author }}</div>
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
    const {id} = this.$route.params

    API.getOneNews(id)
      .then(res => {
        this.list = res.data
      })
      .catch(error => console.error(parseResponseError(error)))
  }
}

</script>
