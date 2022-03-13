<template>
  <div class="all-articles">
    <div class="all-articles__lists-header">
      <div class="all-articles__list-header">Название</div>
      <div class="all-articles__list-header">Дата</div>
      <div class="all-articles__list-header">Категория</div>
      <div class="all-articles__list-header">Редактировать</div>
      <div class="all-articles__list-header">Удалить</div>
    </div>

    <div class="all-articles__lists">
      <div class="all-articles__list" v-for="list in lists" :key="list.title">
        <div class="all-articles__list-title">{{ list.title }}</div>
        <div class="all-articles__list-date">{{ list.date }}</div>
        <div class="all-articles__list-category">{{ getCategory(list.category) }}</div>
        <button class="all-articles__list-nav all-articles__list-nav-edit">Редактировать</button>
        <button class="all-articles__list-nav all-articles__list-nav-del" @click="deletePost(list.id, list.title)">Удалить</button>
      </div>
    </div>
  </div>
</template>

<script lang="js">
import API from "@/api/api"
import parseResponseError from "../../../../utils/parseResponseError";

export default {
  name: 'AllArticles',

  data() {
    return {
      lists: []
    }
  },

  mounted() {
    this.getNews()
  },

  methods: {
    getCategory: function (category) {
      return category ? category : "—"
    },

    deletePost: function (id, title) {
      if (confirm(`Вы точно хотите удалить пост: "${title}"`)) {
        API.deletePost(id)
          .then(res => {
            this.list = res.data
          })
          .catch(error => console.error(parseResponseError(error)))
      }
    },

    getNews: function () {
      API.getNews()
        .then(res => {
          this.lists = res.data
        })
        .catch(error => console.error(parseResponseError(error)))
    }
  },
}
</script>

<style scoped lang="scss">
@import "AdminArticles";
</style>