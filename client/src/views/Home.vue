<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">

    <ul>
      <li v-for="article in list" :key="article.title">
        <h2>{{ article.title }}</h2>

        <div>{{ article.text }}</div>
      </li>
    </ul>
  </div>
</template>

<script lang="js">
import API from "../api/api"

export default {
  el: '#home',

  data() {
    return {
      list: ''
    };
  },
  mounted() {
    API.getNews()
      .then(res => {
        this.list = res.data
      })
      .catch(error => console.log(error))
  }
}

</script>
