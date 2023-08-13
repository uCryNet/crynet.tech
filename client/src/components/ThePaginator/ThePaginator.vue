<template>
  <div class="pagination">
    <div>
      <button
        :disabled="isInFirstPage"
        @click="onChangePage(1)"
        class="pagination__item pagination__item--nav"
      >
        First
      </button>

      <button
        :disabled="isInFirstPage"
        @click="onChangePage(currentPage - 1)"
        class="pagination__item pagination__item--nav"
      >
        Previous
      </button>
    </div>

    <div class="pagination__nums">
      <button
        v-for="page in pages"
        :key="page.name"
        @click="onChangePage(page.name)"
        :disabled="page.isDisabled"
        class="pagination__item"
        :class="{ 'pagination__item--active': isPageActive(page.name) }"
      >
        {{ page.name }}
      </button>
    </div>

    <div>
      <button
        :disabled="isInLastPage"
        @click="onChangePage(currentPage + 1)"
        class="pagination__item pagination__item--nav"
      >
        Next
      </button>

      <button
        :disabled="isInLastPage"
        @click="onChangePage(totalPages)"
        class="pagination__item pagination__item--nav"
      >
        Last
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
// Vendors
import { computed, defineProps, toRefs } from 'vue';


interface IPaginator {
  totalPages: number
  maxVisibleButtons: number
  currentPage: number
  onChangePage: (page: number) => void
}


const props = defineProps<IPaginator>();
const {
  totalPages,
  maxVisibleButtons,
  currentPage,
  onChangePage
} = toRefs(props)


const startPage = computed(() => {
  if (currentPage.value === 1) return 1

  if (currentPage.value === totalPages.value) {
    return totalPages.value - maxVisibleButtons.value + 1
  }

  return currentPage.value - 1
});

const endPage = computed(() => {
  return Math.min(startPage.value + maxVisibleButtons.value - 1, totalPages.value)
});

const pages = computed(() => {
  const range = []

  for (let i = startPage.value; i <= endPage.value; i += 1) {
    range.push({
      name: i,
      isDisabled: i === currentPage.value,
    })
  }

  return range
});

const isInFirstPage = computed(() => {
  return currentPage.value === 1
});

const isInLastPage = computed(() => {
  return currentPage.value === totalPages.value
});

const isPageActive = (page: number) => {
  return currentPage.value === page
};

</script>

<style lang="scss" scoped>
@import "ThePaginator";
</style>