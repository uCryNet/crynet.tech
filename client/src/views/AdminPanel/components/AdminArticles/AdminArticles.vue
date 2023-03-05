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
        v-for="list in lists"
        :key="list._id"
      >
        <div class="all-articles__list-title">
          {{ list.title }}
        </div>

        <div class="all-articles__list-date">
          {{ list.date }}
        </div>

        <div class="all-articles__list-category">
          {{ list.category }}
        </div>

        <button
          class="all-articles__list-nav all-articles__list-nav-edit"
          @click="editArticle(list)"
        >
          Update
        </button>

        <button
          class="all-articles__list-nav all-articles__list-nav-del"
          @click="deleteArticle(list._id, list.title)"
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
  editArticle: () => void
  deleteArticle: () => void
  lists: IArticle[]
}


defineProps<IAdminArticlesProps>()

const HEADER = ['Name', 'Date', 'Categories', 'Update', 'Delete']
</script>

<style scoped lang="scss">
@import "AdminArticles";
</style>