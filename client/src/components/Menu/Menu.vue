<template>
  <div class="menu">
    <div class="menu__category">
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
          <router-link :to="`/blog/${subCategoriesUnit.name}`">{{ subCategoriesUnit.name }}</router-link>
        </div>
      </div>
    </div>

    <div class="menu__category">
      <router-link class="router-link" :to="ROUTE_LINK.about">About</router-link>
    </div>
  </div>
</template>

<script lang="js">
import { ROUTE_LINK } from "@/router";

export default {
  name: 'Menu',

  methods: {
    get(category) {
      this.$store.dispatch("getAllPosts", { category })
    }
  },

  computed: {
    category() {
      return this.$store.getters.getAllCategory;
    }
  },

  created() {
    this.ROUTE_LINK = ROUTE_LINK
  }
}
</script>

<style lang="scss" scoped>
@import "Menu";
</style>