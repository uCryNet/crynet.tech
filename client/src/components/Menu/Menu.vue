<template>
  <div class="menu">
    <div class="menu__category">
      <router-link class="router-link" to="/">Home</router-link>
    </div>

    <div v-for="categoryUnit in category" :key="categoryUnit.title" class="menu__category">
      <div class="router-link">{{ categoryUnit.title }}</div>

      <div class="menu__subcategory-lists">
        <div v-for="subCategoriesUnit in categoryUnit.subCategories" :key="subCategoriesUnit.name" class="menu__subcategory-unit">
          {{ subCategoriesUnit.name }}
        </div>
      </div>
    </div>

    <div class="menu__category">
      <router-link class="router-link" to="/about">About</router-link>
    </div>
  </div>
</template>

<script lang="js">
// Var
import API from "@/api/api"


export default {
  name: 'Menu',

  data() {
    return {
      category: []
    }
  },

  mounted() {
    API.getCategory()
      .then(res => {
        this.category = res.data
      })
  }
}
</script>

<style lang="scss" scoped>
@import "Menu";
</style>