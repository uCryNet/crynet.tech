<template>
  <div class="article">
    <h2>{{ list.title }}</h2>

    <div>{{ list.description }}</div>

    <div>{{ list.author }}</div>
  </div>
</template>

<script lang="js">
// Method
import API from "@/api/api"


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
      .catch(error => console.log(error))
  }
}

</script>
