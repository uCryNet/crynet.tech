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

// Utils
import { ROUTES_CONFIG } from "@/router";
import API from "@/api/api";
import parseResponseError from "@/utils/parseResponseError";

// Components
import TheHeader from "@/components/TheHeader/TheHeader.vue";
import TheFooter from "@/components/TheFooter/TheFooter.vue";


const store = useStore()
const route = useRoute()

onMounted(() => {
  API.getCategory()
    .then(res => store.dispatch("getCategory", res.data))
    .catch(error => {
      console.error(parseResponseError(error))
      store.dispatch("getCategory", [])
    })
})

const routes = computed(() => route.fullPath)
const filters = computed(() => store.getters.getFilter)

watch(
  () => routes,
  ({ value }) => {
    const payload = value === ROUTES_CONFIG.root.path
      ? { search: "", category: "", page: 1 }
      : { category: route.params.category, page: 1 }

    store.dispatch("setFilters", payload)
  }, { deep: true }
)

watch(
  () => filters,
  ({ value }) => {
    const newFilters = {
      ...filters.value,
      ...value
    }

    store.dispatch("setPending", true)

    API.getPosts(newFilters)
      .then(res => {
        store.dispatch("setPosts", res.data)
        store.dispatch("setPending", false)
      })
      .catch(error => {
        console.error(parseResponseError(error))
        store.dispatch("setPosts", [])
        store.dispatch("setPending", false)
      })
  }, { deep: true }
)
</script>