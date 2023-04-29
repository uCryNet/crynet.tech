<template>
  <div class="header-menu">
    <div
      class="header-menu__category"
      @click="clear"
    >
      <router-link
        class="router-link"
        :to="ROUTES_CONFIG.root.path"
      >
        Home
      </router-link>
    </div>

    <div
      v-for="categoryUnit in category"
      :key="categoryUnit.title"
      class="header-menu__category"
    >
      <div class="router-link">
        {{ categoryUnit.title }}
      </div>

      <div class="header-menu__subcategory-lists">
        <div
          v-for="subCategoriesUnit in categoryUnit.subCategories"
          :key="subCategoriesUnit.name"
          class="header-menu__subcategory-unit"
          @click="onChangeCategory(subCategoriesUnit.name)"
        >
          <router-link
            class="header-menu__subcategory-unit-link"
            :to="{ name: ROUTES_CONFIG.articles.name, params: { category: subCategoriesUnit.name } }"
          >
            {{ subCategoriesUnit.name }}
          </router-link>
        </div>
      </div>
    </div>

    <div class="header-menu__category">
      <router-link
        class="router-link"
        :to="ROUTES_CONFIG.about.path"
      >
        About
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
// Vendors
import { computed } from "vue";
import { useStore } from "vuex";

// Variables
import { ROUTES_CONFIG } from "@/router";


const store = useStore()

const category = computed(() => store.getters.getAllCategory)

const onChangeCategory = (category: string) => {
  store.dispatch("setFilters", { category })
}
</script>

<style lang="scss" scoped>
@import "HeaderMenu";
</style>