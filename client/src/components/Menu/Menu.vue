<template>
  <div class="menu">
    <div class="menu__category" @click="clear">
      <router-link class="router-link" :to="ROUTE_LINK.root">Home</router-link>
    </div>

    <div v-for="categoryUnit in category" :key="categoryUnit.title" class="menu__category">
      <div class="router-link">{{ categoryUnit.title }}</div>

      <div class="menu__subcategory-lists">
        <div
          v-for="subCategoriesUnit in categoryUnit.subCategories"
          :key="subCategoriesUnit.name"
          class="menu__subcategory-unit"
          @click="get(subCategoriesUnit.name)"
        >
          <router-link
            class="menu__subcategory-unit-link"
            :to="{name: 'Articles', params: {category: subCategoriesUnit.name}}"
          >
            {{ subCategoriesUnit.name }}
          </router-link>
        </div>
      </div>
    </div>

    <div class="menu__category">
      <router-link class="router-link" :to="ROUTE_LINK.about">About</router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
// Vendors
import { computed } from "vue";
import { useStore } from "vuex";

// Variables
import { ROUTE_LINK } from "@/router";


const store = useStore()

const category = computed(() => store.getters.getAllCategory)

const get = (category: string) => {
  store.dispatch("setFilters", { category })
}
</script>

<style lang="scss" scoped>
@import "Menu";
</style>