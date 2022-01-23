<template>
  <div class="articles">
    <div class="articles__lists">
      <div class="art" v-for="article in list" :key="article._id">
        <Article
          :title="article.title"
          :text="article.text"
          :id="article._id"
          :image="article.image"
          :date="article.date"
        />
      </div>
    </div>
  </div>
</template>

<script lang="js">
// Components
import Article from "./components/Article/Article";

// Utils
import parseResponseError from "../../utils/parseResponseError";

// Vars
import API from "@/api/api"

export default {
  name: 'Articles',

  components: {
    Article
  },

  data() {
    return {
      list: []
    };
  },

  mounted() {
    API.getNews()
      .then(res => {
        this.list = res.data
      })
      .catch(error => console.log(parseResponseError(error)))
  }
}
</script>

<style scoped lang="scss">
@import "Articles";
</style>