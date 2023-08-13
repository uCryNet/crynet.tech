<template>
  <div class="search-post">
    <div class="search-post__wrap">
      <div class="search-post__search-inner">
        <input
          v-model.trim="state.search"
          class="input search-post__search-input"
          placeholder="Search"
        />

        <button
          @click="onClearSearch"
          class="search-post__search-clear"
          v-if="state.search"
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 352 512"
          >
            <path
              fill="#c2b26f"
              d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"
            >
            </path>
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Vendors
import { useStore } from "vuex";
import { computed, reactive, watch } from "vue";

// Utils
import { debounce } from "@/utils";


const store = useStore()

const filters = computed(() => store.getters.getFilter)
const state = reactive({
  search: ''
})

const onClearSearch = () => state.search = ''

watch(
  filters,
  ({ search }) => state.search = search,
  { immediate: true }
)
watch(
  () => state.search,
  (search) => {
    debounce(() => {
      store.dispatch("setFilters", { search, page: 1 })
    }, 500)
  }
)
</script>

<style scoped lang="scss">
@import "SearchPost";
</style>