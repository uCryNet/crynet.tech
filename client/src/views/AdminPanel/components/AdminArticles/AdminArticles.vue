<template>
  <div class="all-articles">
    <div class="all-articles__lists-header">
      <div
        class="all-articles__list-header"
        v-for="headerTitle in HEADER"
        :key="headerTitle"
      >
        {{ headerTitle }}
      </div>
    </div>

    <div class="all-articles__lists">
      <div
        class="all-articles__list"
        v-for="article in lists"
        :key="article._id"
      >
        <div class="all-articles__list-title">
          {{ article.title }}
        </div>

        <div class="all-articles__list-date">
          {{ article.date }}
        </div>

        <div class="all-articles__list-category">
          {{ article.category }}
        </div>

        <button
          class="all-articles__list-nav all-articles__list-nav-edit"
          @click="editArticle(article)"
        >
          Update
        </button>

        <button
          class="all-articles__list-nav all-articles__list-nav-del"
          @click="deleteArticle(article._id, article.title)"
        >
          Delete
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Types
import { IArticle } from "@/interfaces/interfaces";


interface IAdminArticlesProps {
  editArticle: (article: IArticle) => void
  deleteArticle: (id: string, title: string) => void
  lists: IArticle[]
}


defineProps<IAdminArticlesProps>()

const HEADER = ['Name', 'Date', 'Categories', 'Update', 'Delete']
</script>

<style scoped lang="scss">
@import "AdminArticles";
</style>