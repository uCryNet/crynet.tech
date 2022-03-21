<template>
  <div class="articles">
    <div class="articles__header">
      <h2 class="title mb--20">СТАТЬИ <span>И ЗАМЕТКИ</span></h2>
      <div class="text text--center">Делюсь опытом и записываю всякое</div>
    </div>

    <div class="articles__search">
      <div class="articles__search-inner">
        <input @input="send" v-model.trim="search" class="input articles__search-input" placeholder="Поиск по статьям" />

        <button @click="clear" class="articles__search-clear" v-if="search">
          <svg width="12" height="12" viewBox="0 0 352 512"><path fill="#c2b26f" d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"></path></svg>
        </button>
      </div>
    </div>

    <div class="articles__lists" v-if="list.length">
      <div class="art" v-for="article in list" :key="article._id">
        <Article
          :title="article.title"
          :text="article.text"
          :id="article._id"
          :image="article.image"
          :date="article.date"
          :category="article.category"
        />
      </div>
    </div>

    <div v-else class="text--100 text--40 text--center text--raleway mb--10 mt--10">Упс! Записей не обнаруженно</div>
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
      list: [],
      search: ""
    };
  },

  methods: {
    send() {
      const updateArticles = this.search.trim() !== ""
        ? API.search(this.search)
        : API.getPosts()

      updateArticles
        .then(res => {
            this.list = res.data
        })
        .catch(error => console.error(parseResponseError(error)))
    },

    clear() {
      this.search = ""
    }
  },

  watch: {
    search() {
      this.send()
    }
  },

  mounted() {
    API.getPosts()
      .then(res => {
        this.list = res.data
      })
      .catch(error => console.error(parseResponseError(error)))
  }
}
</script>

<style scoped lang="scss">
@import "Articles";
</style>