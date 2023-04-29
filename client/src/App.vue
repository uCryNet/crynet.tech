<template>
  <div>
    <TheHeader />

    <div class="container">
      <router-view />
    </div>

    <TheFooter />
  </div>
</template>


<script setup lang="ts">
// Vendors
import { computed, onMounted, watch } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";

// Components
import TheHeader from "@/components/TheHeader/TheHeader.vue";
import TheFooter from "@/components/TheFooter/TheFooter.vue";

// Variables
import { ROUTES_CONFIG } from "@/router";


const store = useStore()
const route = useRoute()

onMounted(() => {
  store.dispatch("getCategory")
})

const routes = computed(() => route.fullPath)
const filters = computed(() => store.getters.getFilter)

watch(
  () => routes,
  ({ value }) => {
    const payload = value === ROUTES_CONFIG.root.path
      ? { search: "", category: "" }
      : { category: route.params.category }

    store.dispatch("setFilters", payload)
  }, { deep: true }
)

watch(
  () => filters,
  ({ value }) => {
    store.dispatch("getAllPosts", value)
  }, {
    deep: true,
  }
)
</script>