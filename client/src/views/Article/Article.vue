<template>
  <div class="article">
    11111
    <h2>{{ list.title }}</h2>

    <div>{{ list.author }}</div>
  </div>
</template>

<script lang="js">
// Vars
import API from "@/api/api"


export default {
  name: 'Article',

  data() {
    return {
      list: []
    };
  },

  mounted() {
    console.log(111)
    const {id} = this.$route.params

    API.getOneNews(id)
      .then(res => {
        this.list = res.data
      })
      .catch(error => console.log(error))
  }
}

</script>
