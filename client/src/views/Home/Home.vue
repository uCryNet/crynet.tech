<template>
  <div class="articles">
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
</template>

<script lang="js">
// Methods
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
      list: []
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

<style scoped lang="scss">
.articles {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 16px;
  padding-top: 16px;
  padding-bottom: 16px;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(2, 1fr);
  }
}

.art {
  width: 100%;
}
</style>