<template>
  <div>
    <TheHeader />

    <div class="container">
      <router-view />
    </div>

    <TheFooter />
  </div>
</template>


<script lang="ts">
// Vendors
import { computed, onMounted, watch } from "vue";
import { useStore } from "vuex";

// Components
import TheHeader from "@/components/TheHeader/TheHeader.vue";
import TheFooter from "@/components/TheFooter/TheFooter.vue";

// Variables
import { ROUTES_CONFIG } from "@/router";
import { useRoute, } from "vue-router";


export default {
  name: 'App',

  components: {
    TheHeader,
    TheFooter
  },

  setup() {
    const store = useStore()
    const route = useRoute()

    onMounted(() => {
      store.dispatch("getCategory")
    })

    const routes = computed(() => route.fullPath)
    const filters = computed(() => store.getters.getFilter)
    const isPending = store.getters.getIsPending

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

    return {
      isPending
    }
  }
}
</script>