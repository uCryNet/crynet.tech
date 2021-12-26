<template>
  <div class="article">
    <h2>{{ list.title }}</h2>

    <div>{{ list.description }}</div>

    <div>{{ list.author }}</div>
  </div>
</template>

<script lang="ts">
// Method
import API from "@/api/api"

// Type
import {IArticle} from "@/interfaces/interfaces";

export default {
  name: 'Article',

  data(): {
    list: IArticle[]
  } {
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
      .catch(error => console.log(error))
  }
}

</script>
