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
      <div class="all-articles__list" v-for="list in lists" :key="list._id">
        <div class="all-articles__list-title">{{ list.title }}</div>
        <div class="all-articles__list-date">{{ list.date }}</div>
        <div class="all-articles__list-category">{{ getCategory(list.category) }}</div>
        <button class="all-articles__list-nav all-articles__list-nav-edit" @click="editArticle(list._id)">Редактировать</button>
        <button class="all-articles__list-nav all-articles__list-nav-del" @click="deleteArticle(list._id, list.title)">Удалить</button>
      </div>
    </div>
  </div>
</template>

<script lang="js">
export default {
  name: 'AllArticles',

  props: {
    editArticle: Function,
    deleteArticle: Function,
    lists: []
  },

  methods: {
    getCategory: function (category) {
      return category ? category : "—"
    },
  },
}
</script>

<style scoped lang="scss">
@import "AdminArticles";
</style>