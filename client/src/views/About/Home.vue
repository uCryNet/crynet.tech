<template>
  <div class="articles">
    <template v-for="article in list" :key="article._id">
      <Article
        :title="article.title"
        :text="article.text"
        :description="article.description"
        :id="article._id"
      />
    </template>
  </div>
</template>

<script lang="js">
// Method
import API from "@/api/api"

// Components
import Article from "./components/Article/Article";

export default {
  name: 'Home',

  components: {
    Article
  },

  data() {
    return {
      list: [],
      text: 'sdadasd'
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

<style scoped>
.articles {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 16px;
  padding-top: 16px;
  padding-bottom: 16px;
}
</style>