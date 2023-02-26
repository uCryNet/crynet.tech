<template>
  <div class="all-articles">
    <div class="all-articles__lists-header">
      <div class="all-articles__list-header">Name</div>
      <div class="all-articles__list-header">Date</div>
      <div class="all-articles__list-header">Categories</div>
      <div class="all-articles__list-header">Update</div>
      <div class="all-articles__list-header">Delete</div>
    </div>

    <div class="all-articles__lists">
      <div class="all-articles__list" v-for="list in lists" :key="list._id">
        <div class="all-articles__list-title">{{ list.title }}</div>
        <div class="all-articles__list-date">{{ list.date }}</div>
        <div class="all-articles__list-category">{{ list.category }}</div>
        <button class="all-articles__list-nav all-articles__list-nav-edit" @click="editArticle(list)">Update</button>
        <button class="all-articles__list-nav all-articles__list-nav-del" @click="deleteArticle(list._id, list.title)">Delete</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
// Vendors
import { PropType } from "vue";

// Types
import { IArticle } from "@/interfaces/interfaces";

export default {
  name: 'AllArticles',

  props: {
    editArticle: Function,
    deleteArticle: Function,
    lists: {
      type: Object as PropType<IArticle[]>,
      required: true
    }
  }
}
</script>

<style scoped lang="scss">
@import "AdminArticles";
</style>