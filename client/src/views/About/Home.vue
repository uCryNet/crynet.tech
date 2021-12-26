<template>
  <div class="home">
    <img alt="Vue logo" src="../../assets/logo.png">

    <ul>
      <li v-for="article in list" :key="article.title">
        <h2>
          <router-link :to="'/blog/' + article._id">{{ article.title }}</router-link>
        </h2>

        <div>{{ article.text }}</div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
// Method
import API from "@/api/api"

// Type
import {IArticle} from "@/interfaces/interfaces";

export default {
  name: 'Home',

  // TODO: может сделать блог на vuetify?
  // установить: npm install vuetify
  // шаблон карточки статьи: https://codesandbox.io/s/14ry9r3lll?file=/src/App.vue:829-2125

  data(): {
    list: IArticle[]
  } {
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
