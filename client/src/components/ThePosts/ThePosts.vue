<template>
  <div
    class="posts"
    v-if="!isPending"
  >
    <div v-if="posts.length">
      <div class="posts__lists">
        <ThePost
          :post="article"
          :key="article._id"
          v-for="article in posts"
        />
      </div>

      <ThePaginator
        :max-visible-buttons="3"
        :total-pages="meta.total_pages"
        :current-page="filters.page"
        :on-change-page="onChangePage"
      />
    </div>

    <h3
      class="posts__empty"
      v-else
    >
      <span>OOPS!</span>

      No records found
    </h3>
  </div>

  <ThePreloader v-else />
</template>

<script setup lang="ts">
// Vendors
import { computed } from "vue";
import { useStore } from "vuex";

// Components
import ThePost from "./components/ThePost/ThePost.vue";
import ThePreloader from "@/components/ThePreloader/ThePreloader.vue";
import ThePaginator from "@/components/ThePaginator/ThePaginator.vue";


const store = useStore()

const posts = computed(() => store.getters.getAllPost)
const isPending = computed(() => store.getters.getPending)
const meta = computed(() => store.getters.getMeta)
const filters = computed(() => store.getters.getFilter)

const onChangePage = (page: number) => {
  store.dispatch("setFilters", { page })
}
</script>

<style scoped lang="scss">
@import "ThePosts";
</style>